// src/lib/supabaseClient.ts
import { createClient } from '@supabase/supabase-js'

// We provide fallback placeholder strings so the app doesn't crash on boot
// if you haven't set up your .env.local file yet.
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://placeholder.supabase.co';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'placeholder_key';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// We export a flag so the API knows whether to use the real DB or fake memory
export const hasRealDatabase = !!process.env.NEXT_PUBLIC_SUPABASE_URL;