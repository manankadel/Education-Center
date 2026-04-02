"use client";
import { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import Map, { Marker, Source, Layer } from 'react-map-gl/maplibre';
import 'maplibre-gl/dist/maplibre-gl.css';
import { AnimatePresence } from 'framer-motion';
import { AtlasNode } from '@/types/atlas';
import { MapHUD } from './MapHUD';
import { PinDropModal } from './PinDropModal';
import { NodePanel } from './NodePanel';

const MAP_STYLES = {
  dark: "https://basemaps.cartocdn.com/gl/dark-matter-gl-style/style.json",
  satellite: {
    version: 8,
    sources: { 'satellite-tiles': { type: 'raster', tiles:['https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}'], tileSize: 256 } },
    layers:[{ id: 'satellite', type: 'raster', source: 'satellite-tiles', minzoom: 0, maxzoom: 22 }]
  }
};

// Math for intelligent routing
const getDistanceKm = (lat1: number, lon1: number, lat2: number, lon2: number) => {
  const R = 6371; 
  const dLat = (lat2 - lat1) * (Math.PI/180);
  const dLon = (lon2 - lon1) * (Math.PI/180);
  const a = Math.sin(dLat/2) * Math.sin(dLat/2) + Math.cos(lat1 * (Math.PI/180)) * Math.cos(lat2 * (Math.PI/180)) * Math.sin(dLon/2) * Math.sin(dLon/2);
  return R * (2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)));
};

const createArc = (start: [number, number], end:[number, number]) => {
  const points =[];
  for (let i = 0; i <= 100; i++) {
    const t = i / 100;
    points.push([start[0] + (end[0] - start[0]) * t, (start[1] + (end[1] - start[1]) * t) + Math.sin(t * Math.PI) * 0.1]);
  }
  return { type: 'Feature', geometry: { type: 'LineString', coordinates: points } };
};

export const GlobalMap = () => {
  const mapRef = useRef<any>(null);
  const [nodes, setNodes] = useState<AtlasNode[]>([]);
  const [userLocation, setUserLocation] = useState<{ lng: number; lat: number } | null>(null);
  const[targetLocation, setTargetLocation] = useState<{ lng: number; lat: number } | null>(null);
  
  const [mapStyle, setMapStyle] = useState<'dark' | 'satellite'>('dark');
  const[activeFilter, setActiveFilter] = useState<string | null>(null);
  const[searchQuery, setSearchQuery] = useState('');
  
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeNode, setActiveNode] = useState<AtlasNode | null>(null);
  const[isScoutMode, setIsScoutMode] = useState(false);
  
  // Navigation states
  const [routeLine, setRouteLine] = useState<any>(null);
  const[eit, setEit] = useState<string | null>(null);
  const [dist, setDist] = useState<string | null>(null);

  const fetchSpots = useCallback(async () => {
    try { 
      const res = await fetch('/api/spots'); 
      const data = await res.json(); 
      if (data.success) setNodes(data.spots); 
    } catch (err) { console.error("Fetch failed", err); }
  },[]);

  useEffect(() => { fetchSpots(); }, [fetchSpots]);

  useEffect(() => {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          const loc = { lng: pos.coords.longitude, lat: pos.coords.latitude };
          setUserLocation(loc);
          if (mapRef.current && !isScoutMode && !activeNode) {
            mapRef.current.flyTo({ center: [loc.lng, loc.lat], zoom: 12, duration: 2000 });
          }
        },
        () => console.warn("Location denied")
      );
    }
  }, [isScoutMode, activeNode]);

  const filteredNodes = useMemo(() => {
    let filtered = nodes;
    if (activeFilter) {
      filtered = filtered.filter(n => n.category === activeFilter || n.environment === activeFilter);
    }
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      filtered = filtered.filter(n => 
        n.author.toLowerCase().includes(q) || 
        n.intel_log.toLowerCase().includes(q)
      );
    }
    return filtered;
  }, [nodes, activeFilter, searchQuery]);

  // Intelligent Navigation: Framing the route
  const handleTraceRoute = () => {
    if (!userLocation || !activeNode || !mapRef.current) return;
    
    const distanceKm = getDistanceKm(userLocation.lat, userLocation.lng, activeNode.lat, activeNode.lng);
    setDist(distanceKm.toFixed(1));
    
    // Assume 40km/h urban speed
    const mins = Math.round((distanceKm / 40) * 60); 
    setEit(mins > 60 ? `${Math.floor(mins/60)}H ${mins%60}M` : `${mins} MIN`);
    
    setRouteLine(createArc([userLocation.lng, userLocation.lat], [activeNode.lng, activeNode.lat]));
    
    // Calculate Bounding Box to fit both points on screen
    const minLng = Math.min(userLocation.lng, activeNode.lng);
    const minLat = Math.min(userLocation.lat, activeNode.lat);
    const maxLng = Math.max(userLocation.lng, activeNode.lng);
    const maxLat = Math.max(userLocation.lat, activeNode.lat);

    mapRef.current.fitBounds(
      [[minLng, minLat], [maxLng, maxLat]],
      { padding: 100, duration: 2000, pitch: 45 }
    );
  };

  const handleLockCoordinates = () => {
    if (mapRef.current) {
      const center = mapRef.current.getCenter();
      setTargetLocation({ lng: center.lng, lat: center.lat });
      setIsModalOpen(true);
    }
  };

  const handleDropPin = async (data: any) => {
    if (!targetLocation) return;
    try {
      // Ensure we merge the exact map coordinates with the form data
      const payload = { ...data, lat: targetLocation.lat, lng: targetLocation.lng };
      const res = await fetch('/api/spots', { 
        method: 'POST', 
        headers: { 'Content-Type': 'application/json' }, 
        body: JSON.stringify(payload) 
      });
      const result = await res.json();
      
      if (result.success) {
        setNodes(prev => [result.spot, ...prev]); 
        setIsModalOpen(false); 
        setIsScoutMode(false);
        mapRef.current?.flyTo({ center: [result.spot.lng, result.spot.lat], zoom: 15, duration: 1500 });
      } else {
        alert("Failed to drop spot: " + result.error);
      }
    } catch (err) {
      alert("Network error while dropping spot.");
    }
  };

  return (
    <div className="relative w-full h-full bg-void">
      <div className="absolute inset-0 z-0">
        <Map 
          ref={mapRef} 
          initialViewState={{ longitude: 78.96, latitude: 20.59, zoom: 4 }} 
          mapStyle={MAP_STYLES[mapStyle] as any} 
          attributionControl={false} 
          style={{ width: '100%', height: '100%' }}
        >
          {routeLine && (
            <Source type="geojson" data={routeLine}>
              {/* Glowing tracer line */}
              <Layer id="route-glow" type="line" paint={{ 'line-color': '#0088FF', 'line-width': 6, 'line-opacity': 0.4, 'line-blur': 3 }} />
              <Layer id="route-core" type="line" paint={{ 'line-color': '#00FF88', 'line-width': 2 }} />
            </Source>
          )}

          {filteredNodes.map(node => (
            <Marker key={node.id} longitude={node.lng} latitude={node.lat} onClick={(e) => { 
                e.originalEvent.stopPropagation(); 
                if(isScoutMode) return; 
                setActiveNode(node); 
                setRouteLine(null); 
                setEit(null); 
                mapRef.current?.flyTo({ center:[node.lng, node.lat], zoom: 15, duration: 1000 }); 
              }}>
              <div className={`w-3 h-3 rounded-full border border-void shadow-[0_0_10px_rgba(0,0,0,0.5)] transition-transform hover:scale-150 ${node.category === 'Risky' ? 'bg-alert' : node.category === 'Fun' ? 'bg-signal' : 'bg-confirm'}`} />
            </Marker>
          ))}
          
          {userLocation && (
            <Marker longitude={userLocation.lng} latitude={userLocation.lat}>
              <div className="w-4 h-4 bg-white rounded-full border-4 border-intel shadow-[0_0_15px_#0088FF] animate-pulse" />
            </Marker>
          )}
        </Map>
      </div>

      <AnimatePresence>
        <NodePanel node={activeNode} onClose={() => {setActiveNode(null); setRouteLine(null); setEit(null);}} onTraceRoute={handleTraceRoute} />
      </AnimatePresence>

      <MapHUD 
        totalNodes={nodes.length} isScoutMode={isScoutMode} mapStyle={mapStyle} activeFilter={activeFilter} 
        infiltrationTime={eit} distance={dist} searchQuery={searchQuery}
        setMapStyle={setMapStyle} setActiveFilter={setActiveFilter} onSearchChange={setSearchQuery}
        onToggleScoutMode={() => {setIsScoutMode(!isScoutMode); setActiveNode(null); setRouteLine(null); setEit(null);}} 
        onLockCoordinates={handleLockCoordinates}
      />

      <PinDropModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} onSubmit={handleDropPin} location={targetLocation} />
    </div>
  );
};