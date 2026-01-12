// src/app/layout.tsx

import type { Metadata } from 'next'
import './globals.css'
import { fontPoppins, fontUnbounded, fontGenoa } from './fonts';
import { AppHeightProvider } from '@/components/core/AppHeightProvider'; 
import { Analytics } from "@vercel/analytics/next"

export const metadata = {
  title: 'WANTS AND NEEDS',
  description: 'Luxury Essentials. Take Action.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={[
        fontPoppins.variable, 
        fontUnbounded.variable, 
        fontGenoa.variable, 
      ].join(' ')}>
      <body className="bg-white text-black">
        <Analytics/>
        <AppHeightProvider>
            {children}
        </AppHeightProvider>
      </body>
    </html>
  )
}