"use client";
import { useState } from 'react';
import { motion } from 'framer-motion';

export const WaitlistForm = () => {
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus('loading');
    setMessage('');

    try {
      const response = await fetch('/api/waitlist', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, phone }),
      });
      const data = await response.json();

      if (response.ok) {
        setStatus('success');
        setMessage("YOU ARE ON THE LIST.");
        setEmail('');
        setPhone('');
      } else {
        setStatus('error');
        setMessage(data?.error || "SERVER ERROR");
      }
    } catch (error) {
      setStatus('error');
      setMessage("CONNECTION FAILED");
    }
  };

  return (
    <div className="w-full">
        <div className="mb-8 text-center">
            <h2 className="font-display text-2xl font-black uppercase tracking-tight">The List</h2>
            <p className="font-mono text-[9px] uppercase tracking-[0.2em] text-gray-400 mt-2">
                Limited Access Drops
            </p>
        </div>

      {status === 'success' ? (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="py-8 text-center border border-black p-6">
            <p className="font-sans text-sm font-bold uppercase tracking-widest text-black">Welcome.</p>
            <p className="font-mono text-[10px] text-gray-500 mt-2 tracking-widest uppercase">We will be in touch.</p>
        </motion.div>
      ) : (
        <form onSubmit={handleSubmit} className="flex flex-col gap-6">
            <div className="space-y-6">
                <div className="group relative">
                    <label className="font-mono text-[9px] uppercase tracking-[0.3em] text-gray-400 absolute -top-4 left-0">
                        Email Address
                    </label>
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        className="w-full bg-transparent border-b border-gray-200 py-2 text-sm font-sans text-black focus:outline-none focus:border-black transition-colors uppercase tracking-wider"
                        disabled={status === 'loading'}
                    />
                </div>
                
                <div className="group relative">
                    <label className="font-mono text-[9px] uppercase tracking-[0.3em] text-gray-400 absolute -top-4 left-0">
                        Phone Number
                    </label>
                    <input
                        type="tel"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        className="w-full bg-transparent border-b border-gray-200 py-2 text-sm font-sans text-black focus:outline-none focus:border-black transition-colors uppercase tracking-wider"
                        disabled={status === 'loading'}
                    />
                </div>
            </div>

            <button
                type="submit"
                disabled={status === 'loading'}
                className="w-full mt-4 py-4 bg-black text-white font-sans text-xs font-bold uppercase tracking-[0.25em] hover:bg-zinc-800 transition-colors disabled:opacity-50"
            >
                {status === 'loading' ? 'PROCESSING...' : 'JOIN NOW'}
            </button>
            
            {message && (
                <p className={`mt-2 text-center text-[10px] font-mono uppercase tracking-widest ${status === 'error' ? 'text-red-500' : 'text-black'}`}>
                {message}
                </p>
            )}
        </form>
      )}
    </div>
  );
};