// src/app/widget/page.tsx
"use client";
import dynamic from 'next/dynamic';

const GlobalMap = dynamic(() => import('@/components/modules/atlas/GlobalMap').then((mod) => mod.GlobalMap), { ssr: false });

export default function WidgetPage() {
  return (
    <main className="w-full h-[100dvh] overflow-hidden">
      {/* 
        This renders the exact same map, but because it's a separate route, 
        users can embed <iframe src="yourdomain.com/widget"> on their own sites. 
      */}
      <GlobalMap />
    </main>
  );
}