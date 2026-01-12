"use client";
import { useState } from 'react';
import { motion } from 'framer-motion';
import { useSound } from '@/hooks/useSound';

export const WaitlistForm = () => {
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [message, setMessage] = useState('');
  const playHoverSound = useSound('/audio/hover.mp3', 0.3);

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
      const data = await response.json(); // Handle JSON response safely

      if (response.ok) {
        setStatus('success');
        setMessage("You're on the list. We'll be in touch.");
        setEmail('');
        setPhone('');
      } else {
        setStatus('error');
        setMessage(data?.error || `Server error: ${response.status}`);
      }
    } catch (error) {
      setStatus('error');
      setMessage('Network error. Please try again.');
    }
  };

  return (
    <div className="w-full max-w-sm mt-4 text-center">
      <form onSubmit={handleSubmit} className="flex flex-col items-stretch gap-4">
        <div className='flex flex-row gap-4'>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email"
              required
              // Changed: bg-black/5, border-black/20, placeholder-black/50
              className="h-11 w-1/2 flex-grow px-4 bg-black/5 border border-black/20 backdrop-blur-sm rounded-3xl focus:outline-none focus:border-black/50 transition-all duration-300 placeholder-black/50 font-sans text-black"
              disabled={status === 'loading' || status === 'success'}
            />
            <input
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="Phone"
              // Changed: bg-black/5, border-black/20, placeholder-black/50
              className="h-11 w-1/2 flex-grow px-4 bg-black/5 border border-black/20 backdrop-blur-sm rounded-3xl focus:outline-none focus:border-black/50 transition-all duration-300 placeholder-black/50 font-sans text-black"
              disabled={status === 'loading' || status === 'success'}
            />
        </div>

        <motion.button
          type="submit"
          disabled={status === 'loading' || status === 'success'}
          // Changed: bg-black/10, text-black
          className="h-11 px-6 bg-black/10 border border-black/20 backdrop-blur-sm rounded-3xl font-sans font-semibold text-black transition-all duration-300 disabled:opacity-50 hover:border-black/40 hover:shadow-[0_0_20px_rgba(0,0,0,0.15)]"
          whileTap={{ scale: status !== 'loading' ? 0.95 : 1 }}
          onMouseEnter={playHoverSound}
        >
          {status === 'loading' ? '...' : 'Join The Waitlist'}
        </motion.button>
      </form>
      
      {message && (
        <p className={`mt-3 text-sm ${status === 'error' ? 'text-red-500' : 'text-green-600'}`}>
          {message}
        </p>
      )}
    </div>
  );
};