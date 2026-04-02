/* src/components/modules/landing/Contact.tsx */
"use client";
import { CONTACT_INFO } from "@/lib/data";
import { ArrowUpRight } from "lucide-react";

export const Contact = () => {
  return (
    <footer id="contact" className="bg-[#0a0a0a] pt-32 pb-12 border-t border-white/5">
      <div className="max-w-[1400px] mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 mb-32">
          <div>
            <h2 className="text-7xl md:text-9xl font-black tracking-tighter leading-none mb-12">
              LET'S <br /> <span className="text-accent italic">TALK.</span>
            </h2>
            <div className="space-y-8">
              <div>
                <p className="text-muted uppercase text-xs font-bold tracking-[0.2em] mb-2">Location</p>
                <p className="text-xl max-w-sm">{CONTACT_INFO.address}</p>
              </div>
              <div>
                <p className="text-muted uppercase text-xs font-bold tracking-[0.2em] mb-2">Direct Contact</p>
                {CONTACT_INFO.phones.map(p => <p key={p} className="text-xl">{p}</p>)}
                <p className="text-accent text-xl mt-2">{CONTACT_INFO.email}</p>
              </div>
            </div>
          </div>

          <div className="glass-card p-8 md:p-16 rounded-[40px]">
            <form className="space-y-12">
              <div className="relative">
                <input type="text" placeholder="Your Name" className="w-full bg-transparent border-b border-white/20 py-4 text-2xl focus:outline-none focus:border-accent transition-colors peer" />
                <div className="absolute bottom-0 left-0 h-[2px] w-0 bg-accent transition-all peer-focus:w-full" />
              </div>
              <div className="relative">
                <input type="email" placeholder="Your Email" className="w-full bg-transparent border-b border-white/20 py-4 text-2xl focus:outline-none focus:border-accent transition-colors peer" />
                <div className="absolute bottom-0 left-0 h-[2px] w-0 bg-accent transition-all peer-focus:w-full" />
              </div>
              <div className="relative">
                <select className="w-full bg-transparent border-b border-white/20 py-4 text-2xl focus:outline-none focus:border-accent transition-colors appearance-none cursor-pointer">
                  <option className="bg-background">General Inquiry</option>
                  <option className="bg-background">Admission</option>
                  <option className="bg-background">ISTP Training</option>
                </select>
              </div>
              
              <button className="group flex items-center gap-6 text-3xl font-display font-black uppercase">
                Send Request
                <div className="w-20 h-20 rounded-full bg-accent flex items-center justify-center text-black -rotate-45 group-hover:rotate-0 transition-transform">
                  <ArrowUpRight size={40} />
                </div>
              </button>
            </form>
          </div>
        </div>

        <div className="flex flex-col md:flex-row justify-between items-center pt-12 border-t border-white/5 text-muted text-sm uppercase tracking-widest font-bold">
          <p>© {new Date().getFullYear()} EDUCATION CENTRE JAIPUR</p>
          <div className="flex gap-8 mt-4 md:mt-0">
            <a href="#" className="hover:text-accent transition-colors">Instagram</a>
            <a href="#" className="hover:text-accent transition-colors">LinkedIn</a>
            <a href="#" className="hover:text-accent transition-colors">Legal</a>
          </div>
        </div>
      </div>
    </footer>
  );
};