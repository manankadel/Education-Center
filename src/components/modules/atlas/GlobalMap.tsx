// src/components/modules/atlas/GlobalMap.tsx
"use client";

import { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import Map, { Marker, NavigationControl, Source, Layer } from 'react-map-gl/maplibre';
import 'maplibre-gl/dist/maplibre-gl.css';
import { AnimatePresence } from 'framer-motion';
import { AtlasNode } from '@/types/atlas';
import { MapHUD } from './MapHUD';
import { PinDropModal } from './PinDropModal';
import { NodePanel } from './NodePanel';
import { CreatorStudio } from './CreatorStudio';
import { useTacticalAudio } from '@/hooks/useTacticalAudio';

const DARK_MATTER_STYLE = "https://basemaps.cartocdn.com/gl/dark-matter-gl-style/style.json";

// FULL 8 CITY ROSTER (Bounding Boxes for Radar)
const REGION_ZONES: Record<string, { center:[number, number], geojson: any }> = {
  BOM: { center:[72.8777, 19.0760], geojson: { type: 'Feature', geometry: { type: 'Polygon', coordinates: [[[72.7, 18.9],[73.0, 18.9],[73.0, 19.2],[72.7, 19.2],[72.7, 18.9]]] } } },
  DEL: { center:[77.2090, 28.6139], geojson: { type: 'Feature', geometry: { type: 'Polygon', coordinates: [[[76.9, 28.4],[77.4, 28.4],[77.4, 28.9],[76.9, 28.9],[76.9, 28.4]]] } } },
  BLR: { center:[77.5946, 12.9716], geojson: { type: 'Feature', geometry: { type: 'Polygon', coordinates: [[[77.4, 12.8],[77.8, 12.8],[77.8, 13.1],[77.4, 13.1],[77.4, 12.8]]] } } },
  HYD: { center:[78.4867, 17.3850], geojson: { type: 'Feature', geometry: { type: 'Polygon', coordinates: [[[78.3, 17.2],[78.6, 17.2],[78.6, 17.5],[78.3, 17.5],[78.3, 17.2]]] } } },
  CHN: { center:[80.2707, 13.0827], geojson: { type: 'Feature', geometry: { type: 'Polygon', coordinates: [[[80.1, 12.9],[80.4, 12.9],[80.4, 13.2],[80.1, 13.2],[80.1, 12.9]]] } } },
  KOL: { center:[88.3639, 22.5726], geojson: { type: 'Feature', geometry: { type: 'Polygon', coordinates: [[[88.2, 22.4],[88.5, 22.4],[88.5, 22.7],[88.2, 22.7],[88.2, 22.4]]] } } },
  PNE: { center:[73.8567, 18.5204], geojson: { type: 'Feature', geometry: { type: 'Polygon', coordinates: [[[73.7, 18.4],[74.0, 18.4],[74.0, 18.7],[73.7, 18.7],[73.7, 18.4]]] } } },
  AHM: { center:[72.5714, 23.0225], geojson: { type: 'Feature', geometry: { type: 'Polygon', coordinates: [[[72.4, 22.9],[72.7, 22.9],[72.7, 23.2],[72.4, 23.2],[72.4, 22.9]]] } } }
};

const createArc = (start: [number, number], end:[number, number]): any => {
  const points =[];
  for (let i = 0; i <= 100; i++) {
    const t = i / 100;
    const lng = start[0] + (end[0] - start[0]) * t;
    const lat = start[1] + (end[1] - start[1]) * t;
    points.push([lng, lat + Math.sin(t * Math.PI) * 0.5]);
  }
  return { type: 'Feature', geometry: { type: 'LineString', coordinates: points } };
};

const getDistanceKm = (lat1: number, lon1: number, lat2: number, lon2: number) => {
  const R = 6371; 
  const dLat = (lat2 - lat1) * (Math.PI/180);
  const dLon = (lon2 - lon1) * (Math.PI/180);
  const a = Math.sin(dLat/2) * Math.sin(dLat/2) + Math.cos(lat1 * (Math.PI/180)) * Math.cos(lat2 * (Math.PI/180)) * Math.sin(dLon/2) * Math.sin(dLon/2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
  return R * c;
};

export const GlobalMap = () => {
  const mapRef = useRef<any>(null);
  
  // Audio hook with fallback to prevent crashes if context fails
  const audio = useTacticalAudio() || { playRadar: ()=>{}, playLock: ()=>{}, playConfirm: ()=>{}, playError: ()=>{} };

  const [nodes, setNodes] = useState<AtlasNode[]>([]);
  const[userLocation, setUserLocation] = useState<{ lng: number; lat: number } | null>(null);
  const[targetLocation, setTargetLocation] = useState<{ lng: number; lat: number } | null>(null);
  
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeNode, setActiveNode] = useState<AtlasNode | null>(null);
  const [isScoutMode, setIsScoutMode] = useState(false);
  const [isAdminMode, setIsAdminMode] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  
  const [activeRegion, setActiveRegion] = useState<string | null>(null);
  const [routeLine, setRouteLine] = useState<any>(null);
  const[eit, setEit] = useState<string | null>(null);

  const[isStudioOpen, setIsStudioOpen] = useState(false);

  const fetchSpots = useCallback(async () => {
    try {
      const res = await fetch('/api/spots');
      const data = await res.json();
      if (data.success) setNodes(data.spots);
    } catch (err) {}
  },[]);

  useEffect(() => { fetchSpots(); }, [fetchSpots]);

  useEffect(() => {
    const interval = setInterval(fetchSpots, 10000); 
    return () => clearInterval(interval); 
  }, [fetchSpots]);

  useEffect(() => {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const loc = { lng: position.coords.longitude, lat: position.coords.latitude };
          setUserLocation(loc);
          if (mapRef.current && !isScoutMode && !activeRegion && !activeNode && !isStudioOpen) {
            mapRef.current.flyTo({ center: [loc.lng, loc.lat], zoom: 12, duration: 3000, pitch: 45 });
          }
        },
        () => console.warn("Location access denied")
      );
    }
  },[isScoutMode, activeRegion, activeNode, isStudioOpen]);

  const filteredNodes = useMemo(() => {
    if (!searchQuery.trim()) return nodes;
    const q = searchQuery.toLowerCase();
    return nodes.filter(node => 
      (node.author || '').toLowerCase().includes(q) || 
      (node.intel_log || '').toLowerCase().includes(q) || 
      node.tag_taxonomy?.some(tag => (tag || '').toLowerCase().includes(q))
    );
  }, [nodes, searchQuery]);

  const handleToggleScoutMode = () => { 
    setIsScoutMode(!isScoutMode); 
    setActiveNode(null); 
    setRouteLine(null); 
    setActiveRegion(null);
    setEit(null);
    if(!isScoutMode) audio.playRadar();
  };

  const handleLockCoordinates = () => {
    if (mapRef.current) {
      audio.playLock();
      const center = mapRef.current.getCenter();
      setTargetLocation({ lng: center.lng, lat: center.lat });
      setIsModalOpen(true);
    }
  };

  const handleDropPin = async (data: any) => {
    try {
      const res = await fetch('/api/spots', { 
        method: 'POST', 
        headers: { 'Content-Type': 'application/json' }, 
        body: JSON.stringify(data) 
      });
      const result = await res.json();
      if (result.success) {
        audio.playConfirm();
        setNodes(prev => [result.spot, ...prev]); 
        setIsModalOpen(false); 
        setIsScoutMode(false);
        mapRef.current?.flyTo({ center:[result.spot.lng, result.spot.lat], zoom: 15, pitch: 60 });
      } else {
        audio.playError();
      }
    } catch (err) { audio.playError(); }
  };

  const handleDeleteNode = async (id: string) => {
    if (!confirm("Delete this spot permanently from the network?")) return;
    try {
      await fetch(`/api/spots?id=${id}`, { method: 'DELETE' });
      setNodes(nodes.filter(n => n.id !== id)); 
      setActiveNode(null); 
      setRouteLine(null);
      setEit(null);
    } catch (err) { audio.playError(); }
  };

  const handleRegionSelect = (regionCode: string) => {
    const region = REGION_ZONES[regionCode];
    if (!region || !mapRef.current) return;
    setRouteLine(null); setActiveNode(null); setActiveRegion(regionCode); setEit(null);
    audio.playRadar();
    const map = mapRef.current.getMap();
    map.flyTo({ center: map.getCenter(), zoom: 4, pitch: 0, duration: 1500 });
    setTimeout(() => map.flyTo({ center: region.center, zoom: 10, pitch: 60, bearing: 45, duration: 3000 }), 1600);
  };

  const executeTraceRoute = () => {
    if (!userLocation || !activeNode || !mapRef.current) return;
    setActiveRegion(null);
    audio.playRadar();
    
    const distKm = getDistanceKm(userLocation.lat, userLocation.lng, activeNode.lat, activeNode.lng);
    const speedKmh = 25; 
    const hours = distKm / speedKmh;
    const mins = Math.round(hours * 60);
    setEit(mins > 60 ? `${Math.floor(mins/60)}H ${mins%60}M` : `${mins} MIN`);

    setRouteLine(createArc([userLocation.lng, userLocation.lat], [activeNode.lng, activeNode.lat]));
    const map = mapRef.current.getMap();
    map.flyTo({ center:[(userLocation.lng + activeNode.lng) / 2, (userLocation.lat + activeNode.lat) / 2], zoom: 5, pitch: 45, duration: 2500 });
  };

  return (
    <div className="relative w-full h-full bg-void">
      <div className="absolute inset-0 z-0">
        <Map
          ref={mapRef}
          initialViewState={{ longitude: 78.9629, latitude: 20.5937, zoom: 4, pitch: 30 }}
          mapStyle={DARK_MATTER_STYLE}
          attributionControl={false}
          interactiveLayerIds={['nodes']}
          style={{ width: '100%', height: '100%' }}
        >
          {!isStudioOpen && <NavigationControl position="bottom-right" showCompass={false} />}
          
          {activeRegion && REGION_ZONES[activeRegion] && (
            <Source type="geojson" data={REGION_ZONES[activeRegion].geojson}>
              <Layer id="region-fill" type="fill" paint={{ 'fill-color': '#FFB000', 'fill-opacity': 0.1, 'fill-outline-color': '#FFB000' }} />
              <Layer id="region-line" type="line" paint={{ 'line-color': '#FFB000', 'line-width': 2, 'line-dasharray': [2, 2] }} />
            </Source>
          )}

          {routeLine && (
            <Source type="geojson" data={routeLine}>
              <Layer id="route-line-glow" type="line" paint={{ 'line-color': '#FFB000', 'line-width': 8, 'line-opacity': 0.3, 'line-blur': 4 }} />
              <Layer id="route-line-core" type="line" paint={{ 'line-color': '#ffffff', 'line-width': 2 }} />
            </Source>
          )}

          {filteredNodes.map((node) => (
            <Marker key={node.id} longitude={node.lng} latitude={node.lat} anchor="center" onClick={(e) => {
                e.originalEvent.stopPropagation();
                if(isScoutMode || isStudioOpen) return;
                setActiveNode(node);
                setRouteLine(null); 
                setEit(null);
                audio.playLock();
                mapRef.current?.flyTo({ center: [node.lng, node.lat], zoom: 15, duration: 1000 });
              }}>
              <div className={`relative group cursor-pointer ${isStudioOpen && node.id !== activeNode?.id ? 'opacity-0' : 'opacity-100'} transition-opacity`}>
                <div className="absolute inset-0 bg-signal rounded-full opacity-40 animate-ping" style={{ transform: 'scale(2)' }} />
                <div className={`w-3 h-3 rounded-full shadow-[0_0_15px_#FFB000] border border-black ${isAdminMode ? 'bg-alert shadow-[0_0_15px_#FF3333]' : 'bg-signal'}`} />
              </div>
            </Marker>
          ))}
          
          {userLocation && !isStudioOpen && (
            <Marker longitude={userLocation.lng} latitude={userLocation.lat} anchor="center">
              <div className="w-4 h-4 border-2 border-confirm rounded-full flex items-center justify-center bg-void/50 pointer-events-none">
                <div className="w-1 h-1 bg-confirm rounded-full shadow-[0_0_10px_#00FF88]" />
              </div>
            </Marker>
          )}
        </Map>
      </div>

      <AnimatePresence>
        {activeNode && !isScoutMode && !isStudioOpen && (
          <NodePanel 
            node={activeNode} 
            isAdminMode={isAdminMode} 
            onClose={() => { setActiveNode(null); setRouteLine(null); setEit(null); }} 
            onDelete={handleDeleteNode} 
            onTraceRoute={executeTraceRoute} 
            onOpenStudio={() => setIsStudioOpen(true)} 
          />
        )}
      </AnimatePresence>

      <AnimatePresence>
        {isStudioOpen && activeNode && (
          <CreatorStudio 
            node={activeNode} 
            mapRef={mapRef} 
            onClose={() => setIsStudioOpen(false)} 
          />
        )}
      </AnimatePresence>

      <MapHUD 
        userLocation={userLocation} 
        totalNodes={filteredNodes.length} 
        isScoutMode={isScoutMode} 
        isAdminMode={isAdminMode} 
        isDirectorMode={isStudioOpen} 
        isRecording={false} 
        searchQuery={searchQuery}
        infiltrationTime={eit}
        onSearchChange={setSearchQuery} 
        onToggleAdmin={() => setIsAdminMode(!isAdminMode)} 
        onToggleScoutMode={handleToggleScoutMode} 
        onLockCoordinates={handleLockCoordinates} 
        onSelectRegion={handleRegionSelect}
      />
      
      <PinDropModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        onSubmit={handleDropPin} 
        location={targetLocation} 
      />
    </div>
  );
};