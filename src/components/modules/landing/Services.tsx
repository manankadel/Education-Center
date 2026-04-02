/* src/components/modules/landing/Services.tsx */
"use client";
import { SERVICES_DATA } from "@/lib/data";
import { motion } from "framer-motion";

export const Services = () => {
  return (
    <section id="services" className="py-32 bg-background">
      <div className="max-w-[1400px] mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-end mb-20 gap-8">
          <h2 className="text-6xl md:text-8xl font-black tracking-tighter">
            CORE <br /> <span className="text-accent italic">PILLARS</span>
          </h2>
          <p className="text-muted max-w-sm mb-4">
            Specialized training ecosystems designed for the modern professional landscape.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
          {SERVICES_DATA.map((service, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className={`group glass-card p-10 flex flex-col justify-between min-h-[400px] transition-all hover:bg-accent/5 overflow-hidden relative ${
                idx === 0 || idx === 3 ? "md:col-span-7" : "md:col-span-5"
              }`}
            >
              <div className="absolute -right-10 -top-10 opacity-5 group-hover:opacity-10 transition-opacity">
                <service.icon size={250} />
              </div>
              
              <div className="relative z-10">
                <div className="w-14 h-14 rounded-full border border-accent/30 flex items-center justify-center text-accent mb-8 group-hover:bg-accent group-hover:text-black transition-all">
                  <service.icon size={24} />
                </div>
                <h3 className="text-3xl font-bold mb-4 tracking-tighter">{service.title}</h3>
                <p className="text-muted text-lg font-light leading-relaxed max-w-xs">{service.desc}</p>
              </div>

              <div className="mt-8 flex items-center gap-2 text-sm font-bold uppercase tracking-widest text-accent opacity-0 group-hover:opacity-100 transition-all transform translate-y-4 group-hover:translate-y-0">
                Learn More <span>→</span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};