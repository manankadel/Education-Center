"use client";
import { SERVICES_DATA } from "@/lib/data";
import { motion } from "framer-motion";

export const Services = () => {
  return (
    <section id="services" className="py-24 md:py-32 bg-[#02040A]">
      <div className="max-w-[1400px] mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-16 md:mb-24 gap-8">
          <h2 className="text-5xl md:text-8xl font-display font-black tracking-tighter uppercase leading-[0.9]">
            Strategic <br /> <span className="text-accent">Offerings</span>
          </h2>
          <p className="text-muted max-w-sm text-base md:text-lg font-light">
            Comprehensive programs designed to advance knowledge and disseminate truth.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
          {SERVICES_DATA.map((service, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className="group glass-card p-8 md:p-12 rounded-[2rem] flex flex-col justify-between min-h-[400px] transition-all duration-500 hover:border-accent/40 hover:bg-accent/[0.02] relative overflow-hidden"
            >
              <div className="absolute -right-12 -top-12 opacity-5 group-hover:opacity-10 transition-opacity duration-700 text-accent">
                <service.icon size={280} strokeWidth={1} />
              </div>
              
              <div className="relative z-10">
                <div className="w-16 h-16 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-accent mb-8 group-hover:bg-accent group-hover:text-white transition-all duration-300">
                  <service.icon size={28} />
                </div>
                <h3 className="text-3xl font-display font-bold mb-4 tracking-tight">{service.title}</h3>
                <p className="text-muted font-light leading-relaxed mb-8">{service.desc}</p>
                
                <ul className="space-y-3">
                    {service.details.map((detail, i) => (
                        <li key={i} className="flex items-start gap-3 text-sm md:text-base text-gray-300">
                            <span className="text-accent mt-1">●</span>
                            {detail}
                        </li>
                    ))}
                </ul>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};