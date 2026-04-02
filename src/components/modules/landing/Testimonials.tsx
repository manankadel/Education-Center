/* src/components/modules/landing/Testimonials.tsx */
"use client";
import { TESTIMONIALS } from "@/lib/data";

export const Testimonials = () => {
  const list = [...TESTIMONIALS, ...TESTIMONIALS];

  return (
    <section id="reviews" className="py-32 bg-background overflow-hidden">
      <div className="px-6 mb-20 text-center">
        <h2 className="text-5xl font-black tracking-tighter uppercase italic">Success Stories</h2>
      </div>

      <div className="flex animate-marquee hover:[animation-play-state:paused]">
        {list.map((t, i) => (
          <div key={i} className="w-[450px] mx-4 flex-shrink-0 glass-card p-10 rounded-[40px] relative overflow-hidden group">
            <div className="absolute top-0 right-0 p-8 text-6xl font-display text-white/5 group-hover:text-accent/20 transition-colors">
              ”
            </div>
            <p className="text-xl font-light leading-relaxed mb-10 italic">"{t.quote}"</p>
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full overflow-hidden grayscale group-hover:grayscale-0 transition-all">
                <img src={t.image} alt={t.name} className="w-full h-full object-cover" />
              </div>
              <div>
                <h4 className="font-bold uppercase tracking-widest text-sm">{t.name}</h4>
                <p className="text-accent text-xs font-bold">ALUMNI</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};