// src/app/layout.tsx
import type { Metadata } from 'next'
import './globals.css'
import { fontBebas, fontBarlow, fontIBM, fontShareTech } from './fonts';
import { AppHeightProvider } from '@/components/core/AppHeightProvider'; 
import { Analytics } from "@vercel/analytics/next"

export const metadata = {
  title: 'SPOTTED // Tactical Urban Intelligence Network',
  description: 'The World\'s First Tactical Urban Intelligence Network.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={[
        fontBebas.variable, 
        fontBarlow.variable, 
        fontIBM.variable, 
        fontShareTech.variable
      ].join(' ')}>
      <body className="bg-void text-text-primary">
        <Analytics/>
        <AppHeightProvider>
            {children}
        </AppHeightProvider>
      </body>
    </html>
  )
}