// src/app/fonts.ts

import { Poppins, Unbounded, IBM_Plex_Mono } from 'next/font/google';
import localFont from 'next/font/local';

export const fontPoppins = Poppins({
  subsets: ['latin'],
  weight: ['400', '600', '700'],
  variable: '--font-poppins',
});

export const fontUnbounded = Unbounded({
    subsets: ['latin'],
    weight: ['700', '900'],
    variable: '--font-unbounded',
});

export const fontGenoa = localFont({
  src: '../assets/fonts/genoa.otf', 
  display: 'swap',
  variable: '--font-genoa', 
});

// ADD THIS FONT
export const fontMono = IBM_Plex_Mono({
  subsets: ['latin'],
  weight: ['400', '700'],
  variable: '--font-mono',
});