// src/app/(main)/reach-out/page.tsx
"use client";

import { useState } from 'react';

export default function ReachOutPage() {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [formStatus, setFormStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [statusMessage, setStatusMessage] = useState('');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      setFormStatus('loading');
      try {
          const response = await fetch('/api/contact', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify(formData),
          });
          const result = await response.json();
          if (!response.ok) throw new Error(result.error);
          setFormStatus('success');
          setStatusMessage("Message sent.");
          setFormData({ name: '', email: '', message: '' });
      } catch (error: any) {
          setFormStatus('error');
          setStatusMessage(error.message);
      }
  };

  return (
    <main className="min-h-screen bg-white flex items-center justify-center p-4 pt-32">
      <div className="w-full max-w-md bg-white border border-gray-200 shadow-xl p-8 md:p-12">
            <h1 className="font-display text-3xl md:text-4xl font-black uppercase text-center mb-2 text-black">Reach Out</h1>
            <p className="font-sans text-xs text-gray-500 uppercase tracking-widest text-center mb-8">Inquiries & Support</p>
            
            <form className="space-y-6" onSubmit={handleSubmit}>
                <div className="flex flex-col">
                  <label htmlFor="name" className="font-sans text-xs font-bold uppercase tracking-widest text-black mb-2">Name</label>
                  <input type="text" id="name" name="name" value={formData.name} onChange={handleInputChange} required className="w-full px-4 py-3 bg-white text-black border border-black focus:outline-none focus:ring-2 focus:ring-black transition-all font-sans" />
                </div>
                <div className="flex flex-col">
                  <label htmlFor="email" className="font-sans text-xs font-bold uppercase tracking-widest text-black mb-2">Email</label>
                  <input type="email" id="email" name="email" value={formData.email} onChange={handleInputChange} required className="w-full px-4 py-3 bg-white text-black border border-black focus:outline-none focus:ring-2 focus:ring-black transition-all font-sans" />
                </div>
                <div className="flex flex-col">
                  <label htmlFor="message" className="font-sans text-xs font-bold uppercase tracking-widest text-black mb-2">Message</label>
                  <textarea id="message" name="message" value={formData.message} onChange={handleInputChange} required rows={4} className="w-full px-4 py-3 bg-white text-black border border-black focus:outline-none focus:ring-2 focus:ring-black transition-all font-sans resize-none"></textarea>
                </div>
                
                <button type="submit" disabled={formStatus === 'loading'} className="w-full mt-2 py-4 bg-black text-white font-sans font-bold uppercase tracking-widest hover:bg-gray-800 transition-colors disabled:opacity-50">
                    {formStatus === 'loading' ? 'Sending...' : 'Send Message'}
                </button>
            </form>
             {statusMessage && (
                <p className={`mt-4 text-center text-sm font-bold ${formStatus === 'error' ? 'text-red-600' : 'text-green-600'}`}>
                    {statusMessage}
                </p>
            )}
            
            <div className="mt-8 pt-8 border-t border-gray-100 flex justify-between text-xs font-sans uppercase tracking-widest text-gray-500">
                <a href="mailto:info@wantsandneeds.com" className="hover:text-black">Email Us</a>
                {/* Updated to a generic placeholder or remove if no phone */}
                <a href="#" className="hover:text-black">Customer Support</a>
            </div>
      </div>
    </main>
  );
}