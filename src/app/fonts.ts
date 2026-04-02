// src/app/fonts.ts

import { Inter, Syne } from 'next/font/google';

export const fontInter = Inter({
  subsets: ['latin'],
  weight: ['300', '400', '500', '700'],
  variable: '--font-inter',
});

export const fontSyne = Syne({
    subsets: ['latin'],
    weight: ['700', '800'],
    variable: '--font-syne',
});