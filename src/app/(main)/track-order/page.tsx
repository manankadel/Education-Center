// src/app/(main)/track-order/page.tsx

"use client";

import { useState } from 'react';
import { motion } from 'framer-motion';

export default function TrackOrderPage() {
  const [orderName, setOrderName] = useState('');
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [orderData, setOrderData] = useState<any>(null);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');
    setOrderData(null);

    // Normalize order name (ensure it has #)
    const normalizedName = orderName.startsWith('#') ? orderName : `#${orderName}`;

    try {
        const res = await fetch('/api/order/track', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ orderName: normalizedName, email }),
        });
        const data = await res.json();
        
        if (res.ok) {
            setOrderData(data.order);
        } else {
            setError(data.error || 'Could not find order.');
        }
    } catch (err) {
        setError('Connection error.');
    } finally {
        setIsLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-white flex items-center justify-center p-4 pt-32">
        <div className="w-full max-w-lg bg-white border border-gray-200 shadow-xl p-8 md:p-12">
            <h1 className="font-display text-3xl font-black uppercase text-center mb-2 text-black">Track Order</h1>
            <p className="font-sans text-xs text-gray-500 uppercase tracking-widest text-center mb-8">Enter details to view status</p>

            <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                    <label className="font-sans text-xs font-bold uppercase tracking-widest text-black mb-2 block">Order Number</label>
                    <input 
                        type="text" 
                        value={orderName} 
                        onChange={(e) => setOrderName(e.target.value)} 
                        placeholder="#1001" 
                        required 
                        className="w-full px-4 py-3 bg-white text-black border border-black focus:outline-none focus:ring-2 focus:ring-black font-sans"
                    />
                </div>
                <div>
                    <label className="font-sans text-xs font-bold uppercase tracking-widest text-black mb-2 block">Email Address</label>
                    <input 
                        type="email" 
                        value={email} 
                        onChange={(e) => setEmail(e.target.value)} 
                        placeholder="email@example.com" 
                        required 
                        className="w-full px-4 py-3 bg-white text-black border border-black focus:outline-none focus:ring-2 focus:ring-black font-sans"
                    />
                </div>
                <button type="submit" disabled={isLoading} className="w-full py-4 bg-black text-white font-sans font-bold uppercase tracking-widest hover:bg-gray-800 disabled:opacity-50">
                    {isLoading ? 'Searching...' : 'Track'}
                </button>
            </form>

            {error && <p className="mt-6 text-center text-red-600 font-bold font-sans text-sm">{error}</p>}

            {orderData && (
                <motion.div 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mt-8 p-6 bg-gray-50 border border-black/10"
                >
                    <div className="flex justify-between items-center mb-4 border-b border-gray-200 pb-2">
                        <span className="font-display text-xl font-bold">{orderData.name}</span>
                        <span className="font-sans text-xs uppercase font-bold bg-black text-white px-2 py-1">{orderData.status}</span>
                    </div>
                    <div className="space-y-2 mb-4">
                        {orderData.items.map((item: any, i: number) => (
                            <div key={i} className="flex justify-between text-sm font-sans">
                                <span>{item.title}</span>
                                <span className="text-gray-500">x{item.quantity}</span>
                            </div>
                        ))}
                    </div>
                    <div className="text-right font-sans font-bold pt-2 border-t border-gray-200">
                        Total: {orderData.currency} {orderData.total}
                    </div>
                </motion.div>
            )}
        </div>
    </main>
  );
}