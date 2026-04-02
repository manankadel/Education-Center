"use client";
import { CONTACT_INFO } from "@/lib/data";

export const ContactBrutal = () => {
  return (
    <footer id="contact" className="w-full bg-background pt-32 pb-12 flex flex-col items-center justify-center overflow-hidden border-t border-foreground/10">
      
      <div className="w-full px-6 flex flex-col items-center text-center">
        <h2 className="font-sans font-bold uppercase tracking-[0.3em] text-accent text-sm md:text-base mb-8">
            Initiate Contact
        </h2>
        
        <a 
            href={`mailto:${CONTACT_INFO.email}`}
            className="group relative inline-block text-[6vw] md:text-[5vw] font-serif font-black uppercase tracking-tighter leading-none hover:italic transition-all duration-300"
        >
            educationcentre
            <br />
            jaipur@gmail.com
            <span className="absolute -bottom-4 left-0 w-full h-[2px] bg-accent transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
        </a>

        <div className="mt-24 grid grid-cols-1 md:grid-cols-2 gap-12 w-full max-w-4xl text-left font-sans border-t border-foreground/20 pt-12">
            <div>
                <p className="text-xs font-bold uppercase tracking-widest text-muted mb-4">Location</p>
                <p className="text-lg md:text-xl font-light leading-relaxed max-w-sm">
                    {CONTACT_INFO.address}
                </p>
            </div>
            <div>
                <p className="text-xs font-bold uppercase tracking-widest text-muted mb-4">Direct Lines</p>
                {CONTACT_INFO.phones.map(p => (
                    <p key={p} className="text-lg md:text-xl font-light mb-2">{p}</p>
                ))}
            </div>
        </div>
      </div>

      <div className="w-full max-w-[1400px] px-6 mt-32 flex flex-col md:flex-row items-center justify-between font-sans text-xs font-bold uppercase tracking-widest text-muted">
        <p>© {new Date().getFullYear()} Education Centre. All Rights Reserved.</p>
        <div className="flex gap-8 mt-4 md:mt-0">
            <a href="#" className="hover:text-foreground transition-colors">Instagram</a>
            <a href="#" className="hover:text-foreground transition-colors">LinkedIn</a>
        </div>
      </div>

    </footer>
  );
};