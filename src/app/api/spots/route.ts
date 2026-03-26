// src/app/api/spots/route.ts
import { NextResponse } from 'next/server';
import { supabase, hasRealDatabase } from '@/lib/supabaseClient';

export async function GET() {
  if (!hasRealDatabase) return NextResponse.json({ success: true, spots: [] });
  try {
    const { data, error } = await supabase.from('spots').select('*').order('created_at', { ascending: false });
    if (error) throw error;
    return NextResponse.json({ success: true, spots: data });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch spots' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  if (!hasRealDatabase) return NextResponse.json({ error: 'Database not configured' }, { status: 500 });
  try {
    const spotData = await request.json();
    const { data, error } = await supabase.from('spots').insert([spotData]).select().single();
    if (error) throw error;
    return NextResponse.json({ success: true, spot: data }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to create spot' }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  if (!hasRealDatabase) return NextResponse.json({ error: 'Database not configured' }, { status: 500 });
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');
    if (!id) return NextResponse.json({ error: 'ID required' }, { status: 400 });
    const { error } = await supabase.from('spots').delete().eq('id', id);
    if (error) throw error;
    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to delete spot' }, { status: 500 });
  }
}