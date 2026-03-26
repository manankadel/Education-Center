// src/types/atlas.d.ts
export interface VibeSignal {
  solitude: number;
  danger: number;
  complexity: number;
  history: number;
  cinematic: number;
}

export interface AccessIntel {
  type: 'Public' | 'Semi-Public' | 'Restricted';
  bestTime: string;
  guard: 'Yes' | 'No' | 'Unknown';
}

export interface AtlasNode {
  id: string;
  created_at: string;
  lng: number;
  lat: number;
  intel_log: string;
  author: string;
  media_vault?: string[];
  tag_taxonomy?: string[];
  access_intel?: AccessIntel;
  vibe_signal?: VibeSignal;
}