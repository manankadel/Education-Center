// src/types/atlas.d.ts

export type SpotCategory = 'Risky' | 'Fun' | 'Safe' | 'Chill';
export type SpotEnvironment = 'Mountain' | 'Water' | 'Urban' | 'Forest' | 'Indoor';

export interface AtlasNode {
  id: string;
  created_at: string;
  lng: number;
  lat: number;
  intel_log: string;
  author: string;
  media_vault?: string[];
  category: SpotCategory;
  environment: SpotEnvironment;
}