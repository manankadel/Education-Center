"use client";
import { CONTACT_INFO } from "@/lib/data";
import { ArrowUpRight, MapPin, Mail, Phone } from "lucide-react";

export const Contact = () => {
  return (
    <footer id="contact" className="bg-background pt-24 md:pt-40 pb-8 md:pb-12 border-t border-white/10">
      <div className="max-w-[1400px] mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 mb-24 md:mb-40">
          <div>
            <h2 className="text-6xl md:text-[8rem] font-display font-black tracking-tighter leading-[0.85] uppercase mb-12">
              Let's <br /> <span className="text-accent italic">Talk.</span>
            </h2>
            <div className="space-y-10">
              <div className="flex gap-4 items-start">
                <MapPin className="text-accent flex-shrink-0 mt-1" size={24} />
                <div>
                    <p className="text-muted uppercase text-xs font-bold tracking-[0.2em] mb-3">Headquarters</p>
                    <p className="text-lg md:text-xl text-white max-w-sm font-light leading-relaxed">{CONTACT_INFO.address}</p>
                </div>
              </div>
              <div className="flex gap-4 items-start">
                <Phone className="text-accent flex-shrink-0 mt-1" size={24} />
                <div>
                    <p className="text-muted uppercase text-xs font-bold tracking-[0.2em] mb-3">Direct Contact</p>
                    {CONTACT_INFO.phones.map(p => <p key={p} className="text-lg md:text-xl text-white font-light">{p}</p>)}
                </div>
              </div>
              <div className="flex gap-4 items-start">
                <Mail className="text-accent flex-shrink-0 mt-1" size={24} />
                <div>
                    <p className="text-muted uppercase text-xs font-bold tracking-[0.2em] mb-3">Electronic Mail</p>
                    <a href={`mailto:${CONTACT_INFO.email}`} className="text-lg md:text-xl text-accent hover:text-white transition-colors font-light">
                        {CONTACT_INFO.email}
                    </a>
                </div>
              </div>
            </div>
          </div>

          <div className="glass-card p-8 md:p-16 rounded-[2rem] md:rounded-[3rem] shadow-2xl relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-accent/10 blur-[100px] rounded-full pointer-events-none" />
            <h3 className="text-2xl md:text-3xl font-display font-bold mb-10">Request Counselling</h3>
            <form className="space-y-8 md:space-y-12 relative z-10" onSubmit={(e) => e.preventDefault()}>
              <div className="relative">
                <input type="text" placeholder="Student Name" className="w-full bg-transparent border-b border-white/20 py-3 md:py-4 text-lg md:text-2xl focus:outline-none focus:border-accent transition-colors peer placeholder-white/30" />
                <div className="absolute bottom-0 left-0 h-[2px] w-0 bg-accent transition-all duration-300 peer-focus:w-full" />
              </div>
              <div className="relative">
                <input type="tel" placeholder="Phone Number" className="w-full bg-transparent border-b border-white/20 py-3 md:py-4 text-lg md:text-2xl focus:outline-none focus:border-accent transition-colors peer placeholder-white/30" />
                <div className="absolute bottom-0 left-0 h-[2px] w-0 bg-accent transition-all duration-300 peer-focus:w-full" />
              </div>
              <div className="relative">
                <select className="w-full bg-transparent border-b border-white/20 py-3 md:py-4 text-lg md:text-2xl focus:outline-none focus:border-accent transition-colors appearance-none cursor-pointer text-white/70">
                  <option className="bg-[#0f172a] text-white">Select Interest</option>
                  <option className="bg-[#0f172a] text-white">College Admission Counselling</option>
                  <option className="bg-[#0f172a] text-white">Distance Education</option>
                  <option className="bg-[#0f172a] text-white">Regular Coaching Classes</option>
                  <option className="bg-[#0f172a] text-white">Industry Specific Training (ISTP)</option>
                </select>
              </div>
              
              <button className="group mt-4 flex items-center gap-6 text-xl md:text-3xl font-display font-black uppercase text-white hover:text-accent transition-colors w-full md:w-auto">
                Submit Request
                <div className="w-16 h-16 md:w-20 md:h-20 rounded-full bg-accent flex items-center justify-center text-white -rotate-45 group-hover:rotate-0 transition-transform duration-500 shadow-lg shadow-accent/20 flex-shrink-0">
                  <ArrowUpRight size={32} />
                </div>
              </button>
            </form>
          </div>
        </div>

        <div className="flex flex-col md:flex-row justify-between items-center pt-8 md:pt-12 border-t border-white/10 text-muted text-xs md:text-sm uppercase tracking-widest font-bold">
          <p className="mb-4 md:mb-0 text-center md:text-left">© {new Date().getFullYear()} EDUCATION CENTRE JAIPUR. All Rights Reserved.</p>
          <div className="flex gap-6 md:gap-8">
            <a href="#" className="hover:text-accent transition-colors">Privacy</a>
            <a href="#" className="hover:text-accent transition-colors">Terms</a>
            <a href="#" className="hover:text-accent transition-colors">Instagram</a>
          </div>
        </div>
      </div>
    </footer>
  );
};