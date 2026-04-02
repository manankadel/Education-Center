"use client";

import { CONTACT_INFO } from '@/lib/data';
import { MapPin, Phone, Mail, ArrowRight } from 'lucide-react';

export const Contact = () => {
    return (
        <footer id="contact" className="bg-brand-blue text-white pt-24 pb-12 px-6 md:px-12 border-t-[12px] border-brand-accent">
            <div className="max-w-[1400px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16">
                
                <div className="flex flex-col justify-between">
                    <div>
                        <h2 className="font-display text-5xl md:text-7xl font-bold leading-[1.1] mb-6">
                            Ready to <br/><span className="text-brand-accent">Think Beyond?</span>
                        </h2>
                        <p className="text-gray-300 text-lg max-w-md font-light">
                            Join the institution that has nurtured destinies for over a decade. Reach out to our expert counselors today.
                        </p>
                    </div>
                    
                    <div className="mt-16 space-y-6">
                        <div className="flex items-start gap-4">
                            <MapPin className="text-brand-accent mt-1 flex-shrink-0" />
                            <p className="text-gray-300 font-light">{CONTACT_INFO.address}</p>
                        </div>
                        <div className="flex items-center gap-4">
                            <Phone className="text-brand-accent flex-shrink-0" />
                            <p className="text-gray-300 font-light">{CONTACT_INFO.phones.join('  •  ')}</p>
                        </div>
                        <div className="flex items-center gap-4">
                            <Mail className="text-brand-accent flex-shrink-0" />
                            <a href={`mailto:${CONTACT_INFO.email}`} className="text-gray-300 font-light hover:text-white transition-colors">{CONTACT_INFO.email}</a>
                        </div>
                    </div>
                </div>

                <div className="bg-white rounded-2xl p-8 md:p-12 text-brand-blue shadow-2xl">
                    <h3 className="font-display text-2xl font-bold mb-8">Request a Callback</h3>
                    <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
                        <div className="space-y-2">
                            <label className="text-sm font-semibold text-gray-600 uppercase tracking-wider">Student Name</label>
                            <input type="text" className="w-full border-b-2 border-gray-200 py-3 focus:outline-none focus:border-brand-accent transition-colors bg-transparent" placeholder="Enter your full name" />
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm font-semibold text-gray-600 uppercase tracking-wider">Phone Number</label>
                            <input type="tel" className="w-full border-b-2 border-gray-200 py-3 focus:outline-none focus:border-brand-accent transition-colors bg-transparent" placeholder="+91 XXXXX XXXXX" />
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm font-semibold text-gray-600 uppercase tracking-wider">Interested Course</label>
                            <select className="w-full border-b-2 border-gray-200 py-3 focus:outline-none focus:border-brand-accent transition-colors bg-transparent text-gray-600 cursor-pointer">
                                <option>College Admission Counselling</option>
                                <option>Distance Education</option>
                                <option>Industry Training (ISTP)</option>
                                <option>Regular Coaching</option>
                            </select>
                        </div>
                        <button className="w-full mt-8 flex items-center justify-center gap-3 bg-brand-blue text-white py-4 rounded-xl font-bold hover:bg-brand-light transition-all hover:shadow-lg hover:shadow-brand-blue/30">
                            Submit Inquiry <ArrowRight size={20} />
                        </button>
                    </form>
                </div>
            </div>

            <div className="max-w-[1400px] mx-auto mt-24 pt-8 border-t border-white/10 flex flex-col md:flex-row items-center justify-between text-xs text-gray-400 font-medium">
                <p>© {new Date().getFullYear()} Education Centre, Jaipur. All rights reserved.</p>
                <div className="flex gap-6 mt-4 md:mt-0">
                    <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
                    <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
                </div>
            </div>
        </footer>
    );
};