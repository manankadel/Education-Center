"use client";
import { TESTIMONIALS } from "@/lib/data";

export const Testimonials = () => {
  const list =[...TESTIMONIALS, ...TESTIMONIALS]; // Duplicate for seamless infinite scroll

  return (
    <section id="reviews" className="py-24 md:py-40 bg-[#02040A] overflow-hidden">
      <div className="px-6 mb-16 md:mb-24 text-center max-w-4xl mx-auto">
        <h2 className="text-3xl md:text-6xl font-display font-black tracking-tighter uppercase mb-6 leading-tight">
          "We All Have Ability. The Difference Is <span className="text-accent italic">How We Use It.</span>"
        </h2>
        <p className="text-muted font-bold tracking-[0.2em] uppercase text-sm">— Stevie Wonder</p>
      </div>

      <div className="flex animate-marquee hover:[animation-play-state:paused] py-10">
        {list.map((t, i) => (
          <div key={i} className="w-[300px] md:w-[450px] mx-4 flex-shrink-0 glass-card p-8 md:p-10 rounded-[2rem] md:rounded-[3rem] relative overflow-hidden group">
            <div className="absolute top-0 right-0 p-6 md:p-8 text-6xl md:text-8xl font-display text-white/5 group-hover:text-accent/10 transition-colors duration-500">
              ”
            </div>
            <div className="flex mb-6 space-x-1">
                {[1,2,3,4,5].map(star => <span key={star} className="text-accent text-sm md:text-base">★</span>)}
            </div>
            <p className="text-base md:text-xl text-gray-300 font-light leading-relaxed mb-8 md:mb-12 relative z-10">
              "{t.quote}"
            </p>
            <div className="flex items-center gap-4 border-t border-white/10 pt-6 mt-auto">
              <div className="w-10 h-10 md:w-14 md:h-14 rounded-full overflow-hidden grayscale group-hover:grayscale-0 transition-all duration-500 border-2 border-transparent group-hover:border-accent">
                <img src={t.image} alt={t.name} className="w-full h-full object-cover" />
              </div>
              <div>
                <h4 className="font-bold uppercase tracking-wider text-xs md:text-sm text-white">{t.name}</h4>
                <p className="text-accent text-[10px] md:text-xs font-bold uppercase tracking-widest mt-1">ALUMNI</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};