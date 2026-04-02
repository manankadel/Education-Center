"use client";

import { CONTACT_INFO } from '@/lib/data';
import { MapPin, Phone, Mail, ArrowRight } from 'lucide-react';

export const Contact = () => {
    return (
        <footer id="contact" className="bg-brand-blue text-white pt-20 md:pt-24 pb-12 px-5 md:px-12 border-t-[8px] md:border-t-[12px] border-brand-accent">
            <div className="max-w-[1400px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16">
                
                <div className="flex flex-col">
                    <h2 className="font-display text-4xl md:text-7xl font-bold leading-[1.1] mb-6">
                        Ready to <br/><span className="text-brand-accent">Think Beyond?</span>
                    </h2>
                    <p className="text-gray-300 text-base md:text-lg max-w-md font-light mb-12">
                        Join the institution that has nurtured destinies for over a decade. Reach out to our expert counselors today.
                    </p>
                    
                    <div className="space-y-6 mt-auto">
                        <div className="flex items-start gap-4">
                            <MapPin className="text-brand-accent mt-1 flex-shrink-0" size={20} />
                            <p className="text-gray-300 text-sm md:text-base font-light">{CONTACT_INFO.address}</p>
                        </div>
                        <div className="flex items-center gap-4">
                            <Phone className="text-brand-accent flex-shrink-0" size={20} />
                            <p className="text-gray-300 text-sm md:text-base font-light">{CONTACT_INFO.phones.join('  •  ')}</p>
                        </div>
                        <div className="flex items-center gap-4">
                            <Mail className="text-brand-accent flex-shrink-0" size={20} />
                            <a href={`mailto:${CONTACT_INFO.email}`} className="text-gray-300 text-sm md:text-base font-light hover:text-white transition-colors">{CONTACT_INFO.email}</a>
                        </div>
                    </div>
                </div>

                <div className="bg-white rounded-2xl p-6 md:p-12 text-brand-blue shadow-2xl relative">
                    <h3 className="font-display text-2xl md:text-3xl font-bold mb-8">Inquiry Form</h3>
                    <form className="space-y-5 md:space-y-6" onSubmit={(e) => e.preventDefault()}>
                        <div className="space-y-1.5 md:space-y-2">
                            <label className="text-[10px] md:text-xs font-bold text-gray-400 uppercase tracking-widest">Full Name</label>
                            <input type="text" className="w-full border-b border-gray-200 py-2.5 md:py-3 focus:outline-none focus:border-brand-accent transition-colors bg-transparent text-sm md:text-base" placeholder="John Doe" />
                        </div>
                        <div className="space-y-1.5 md:space-y-2">
                            <label className="text-[10px] md:text-xs font-bold text-gray-400 uppercase tracking-widest">Contact Number</label>
                            <input type="tel" className="w-full border-b border-gray-200 py-2.5 md:py-3 focus:outline-none focus:border-brand-accent transition-colors bg-transparent text-sm md:text-base" placeholder="+91 XXXXX XXXXX" />
                        </div>
                        <div className="space-y-1.5 md:space-y-2">
                            <label className="text-[10px] md:text-xs font-bold text-gray-400 uppercase tracking-widest">Preferred Stream</label>
                            <select className="w-full border-b border-gray-200 py-2.5 md:py-3 focus:outline-none focus:border-brand-accent transition-colors bg-transparent text-gray-600 text-sm md:text-base cursor-pointer">
                                <option>General Inquiry</option>
                                <option>Engineering / IT</option>
                                <option>Commerce / Management</option>
                                <option>Distance Education</option>
                                <option>Industry Training (ISTP)</option>
                            </select>
                        </div>
                        <button className="w-full mt-4 flex items-center justify-center gap-3 bg-brand-blue text-white py-4 rounded-xl font-bold text-base md:text-lg hover:bg-brand-light transition-all">
                            Submit Request <ArrowRight size={20} />
                        </button>
                    </form>
                </div>
            </div>

            <div className="max-w-[1400px] mx-auto mt-20 pt-8 border-t border-white/10 flex flex-col md:flex-row items-center justify-between text-[10px] md:text-xs text-gray-400 font-medium">
                <p>© {new Date().getFullYear()} Education Centre, Jaipur.</p>
                <div className="flex gap-6 mt-4 md:mt-0 uppercase tracking-widest">
                    <Link href="#" className="hover:text-white transition-colors">Privacy</Link>
                    <Link href="#" className="hover:text-white transition-colors">Terms</Link>
                </div>
            </div>
        </footer>
    );
};