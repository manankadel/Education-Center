import { Poppins, Unbounded } from 'next/font/google';
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

// Ensure you have the font file at public/assets/fonts/genoa.otf or src/assets/fonts/genoa.otf
// If you do not have the custom Genoa font file, you can comment this out and remove it from the exports.
export const fontGenoa = localFont({
  src: '../assets/fonts/genoa.otf', 
  display: 'swap',
  variable: '--font-genoa', 
});