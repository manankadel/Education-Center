// src/app/fonts.ts
import { Bebas_Neue, Barlow_Condensed, IBM_Plex_Mono, Share_Tech_Mono } from 'next/font/google';

export const fontBebas = Bebas_Neue({
  subsets: ['latin'],
  weight: ['400'],
  variable: '--font-bebas',
});

export const fontBarlow = Barlow_Condensed({
  subsets: ['latin'],
  weight: ['300', '400', '700', '900'],
  variable: '--font-barlow',
});

export const fontIBM = IBM_Plex_Mono({
  subsets: ['latin'],
  weight: ['300', '400', '500', '700'],
  variable: '--font-ibm',
});

export const fontShareTech = Share_Tech_Mono({
    subsets: ['latin'],
    weight: ['400'],
    variable: '--font-share-tech',
});