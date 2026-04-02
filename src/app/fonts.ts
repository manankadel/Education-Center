import { Playfair_Display, Manrope } from 'next/font/google';

export const fontPlayfair = Playfair_Display({
  subsets: ['latin'],
  weight:['400', '500', '600', '700', '800', '900'],
  style: ['normal', 'italic'],
  variable: '--font-playfair',
});

export const fontManrope = Manrope({
    subsets: ['latin'],
    weight:['300', '400', '500', '700', '800'],
    variable: '--font-manrope',
});