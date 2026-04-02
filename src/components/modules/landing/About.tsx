"use client";
import { ABOUT_DATA } from '@/lib/data';
import Image from 'next/image';

export const About = () => {
  return (
    <section id="about" className="py-32 bg-[#020617]">
      <div className="max-w-[1400px] mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
        <div className="relative h-[600px] rounded-3xl overflow-hidden border border-white/10">
          <Image src={ABOUT_DATA.image} alt="Academic" fill className="object-cover opacity-60 grayscale hover:grayscale-0 transition-all duration-700" />
        </div>
        <div>
          <h2 className="font-display text-4xl md:text-6xl font-bold text-white mb-8 tracking-tighter">
            OVER 10 YEARS OF <br/> <span className="text-[#fbbf24]">EXCELLENCE</span>
          </h2>
          <div className="space-y-6 text-gray-400 text-lg font-light leading-relaxed">
            <p className="text-white font-medium text-xl italic border-l-4 border-[#fbbf24] pl-6">
              "{ABOUT_DATA.proverb.split('-')[0]}"
            </p>
            <p>{ABOUT_DATA.text1}</p>
            <p>{ABOUT_DATA.text2}</p>
          </div>
        </div>
      </div>
    </section>
  );
};