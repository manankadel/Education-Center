import { NextResponse } from 'next/server';
import { supabase, hasRealDatabase } from '@/lib/supabaseClient';
import { AtlasNode } from '@/types/atlas';

// In-memory fallback
let memorySpots: AtlasNode[] =[
  { id: '1', lat: 19.0760, lng: 72.8777, intel_log: "Midnight sea link drive. Completely empty.", author: "Agent_K", category: 'Chill', environment: 'Water', created_at: new Date().toISOString() },
  { id: '2', lat: 28.6139, lng: 77.2090, intel_log: "Abandoned rooftop. Great view, no guards.", author: "Anon_99", category: 'Risky', environment: 'Urban', created_at: new Date().toISOString() },
];

export async function GET() {
  try {
    if (hasRealDatabase) {
      const { data: spots, error } = await supabase.from('spots').select('*').order('created_at', { ascending: false });
      if (!error && spots) return NextResponse.json({ success: true, spots }, { status: 200 });
    }
    return NextResponse.json({ success: true, spots: memorySpots }, { status: 200 });
  } catch (error) {
    // Silent fallback to memory if DB fails
    return NextResponse.json({ success: true, spots: memorySpots }, { status: 200 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { lat, lng, intel_log, author, media_vault, category, environment } = body;
    
    // Strict validation to prevent 500 crashes
    if (lat === undefined || lng === undefined || !intel_log) {
      return NextResponse.json({ error: 'Missing coordinates or log' }, { status: 400 });
    }

    const newSpot: AtlasNode = { 
      id: Date.now().toString(), 
      lat, lng, intel_log, author, media_vault: media_vault ||[], 
      category: category || 'Fun', environment: environment || 'Urban', 
      created_at: new Date().toISOString() 
    };

    if (hasRealDatabase) {
      const { error } = await supabase.from('spots').insert([{ 
        lat, lng, intel_log, author, media_vault, category, environment 
      }]);
      
      // If Supabase fails, don't crash. Fall through to memory storage.
      if (!error) return NextResponse.json({ success: true, spot: newSpot }, { status: 201 });
      console.warn("Supabase insert failed, falling back to memory:", error);
    }

    // Fallback: Save to memory
    memorySpots.unshift(newSpot);
    return NextResponse.json({ success: true, spot: newSpot }, { status: 201 });

  } catch (error) {
    console.error("Critical POST Error:", error);
    return NextResponse.json({ error: 'Failed to process request' }, { status: 500 });
  }
}