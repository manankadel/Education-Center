"use client";
import { UNIVERSITIES } from "@/lib/data";

export const UniversitiesMarquee = () => {
  const list = [...UNIVERSITIES, ...UNIVERSITIES, ...UNIVERSITIES];

  return (
    <section id="universities" className="py-20 bg-foreground text-background overflow-hidden border-y border-background/10">
        <div className="flex animate-marquee items-center">
            {list.map((uni, idx) => (
                <div key={idx} className="flex items-center">
                    <span className="text-4xl md:text-7xl font-serif font-black uppercase whitespace-nowrap tracking-tighter px-8 hover:text-accent transition-colors cursor-default">
                        {uni}
                    </span>
                    <span className="text-3xl text-background/30 font-sans">✦</span>
                </div>
            ))}
        </div>
    </section>
  );
};