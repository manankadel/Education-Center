// src/components/modules/auth/AuthForm.tsx

"use client";

import { useState } from 'react';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';

interface FormInputProps { id: string; label: string; type?: string; value: string; onChange: (e: React.ChangeEvent<HTMLInputElement>) => void; required?: boolean; disabled?: boolean; }

const FormInput = ({ id, label, type = "text", value, onChange, required = true, disabled = false }: FormInputProps) => (
    <div className="relative w-full">
        <label htmlFor={id} className="font-sans text-xs font-bold uppercase tracking-widest text-black mb-2 block">{label}</label>
        <input 
            type={type} 
            id={id} 
            name={id} 
            value={value} 
            onChange={onChange} 
            required={required} 
            disabled={disabled} 
            autoComplete={type === 'password' ? 'current-password' : 'email'} 
            className="w-full px-4 py-3 bg-white text-black border border-black focus:outline-none focus:ring-2 focus:ring-black transition-all font-sans placeholder:text-gray-400" 
        />
    </div>
);

export const AuthForm = () => {
    const router = useRouter();
    const [formType, setFormType] = useState<'login' | 'register'>('login');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');
    const [loginEmail, setLoginEmail] = useState(''); const [loginPassword, setLoginPassword] = useState('');
    const [regFirstName, setRegFirstName] = useState(''); const [regLastName, setRegLastName] = useState('');
    const [regEmail, setRegEmail] = useState(''); const [regPassword, setRegPassword] = useState('');

    const handleApiSubmit = async (endpoint: string, body: Record<string, unknown>) => { 
        setIsLoading(true); setError(''); 
        try { 
            const response = await fetch(endpoint, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(body) }); 
            const data = await response.json(); 
            if (!response.ok) throw new Error(data.error || 'Something went wrong'); 
            router.push('/home'); router.refresh(); 
        } catch (err: any) { setError(err.message); } finally { setIsLoading(false); } 
    };

    const handleLoginSubmit = (e: React.FormEvent) => { e.preventDefault(); handleApiSubmit('/api/auth/login', { email: loginEmail, password: loginPassword }); };
    const handleRegisterSubmit = (e: React.FormEvent) => { e.preventDefault(); handleApiSubmit('/api/auth/register', { firstName: regFirstName, lastName: regLastName, email: regEmail, password: regPassword }); };
    const toggleFormType = (type: 'login' | 'register') => { if(!isLoading) { setFormType(type); setError(''); } };

    return (
        <div className="w-full max-w-md mx-auto flex flex-col items-center pointer-events-auto p-6">
            <div className="w-full bg-white border border-gray-200 shadow-xl p-8 md:p-12">
                {formType === 'login' ? (
                    <form onSubmit={handleLoginSubmit} className="flex flex-col space-y-6">
                        <h2 className="font-display text-3xl font-black text-black text-center mb-4 uppercase">Login</h2>
                        <FormInput id="login-email" label="Email" type="email" value={loginEmail} onChange={(e) => setLoginEmail(e.target.value)} disabled={isLoading} />
                        <FormInput id="login-password" label="Password" type="password" value={loginPassword} onChange={(e) => setLoginPassword(e.target.value)} disabled={isLoading} />
                        
                        <button type="submit" disabled={isLoading} className="w-full mt-4 px-8 py-4 bg-black text-white font-sans font-bold uppercase tracking-widest hover:bg-gray-800 transition-colors disabled:opacity-50">
                            {isLoading ? 'Processing...' : 'Sign In'}
                        </button>
                        
                        <div className="text-center pt-4 border-t border-gray-100">
                            <span className="text-xs text-gray-500 font-sans uppercase tracking-wide">New Client? </span>
                            <button type='button' onClick={() => toggleFormType('register')} className="text-xs font-bold uppercase tracking-wide text-black border-b border-black ml-2 hover:opacity-60">Create Account</button>
                        </div>
                    </form>
                ) : (
                    <form onSubmit={handleRegisterSubmit} className="flex flex-col space-y-6">
                        <h2 className="font-display text-3xl font-black text-black text-center mb-4 uppercase">Register</h2>
                        <div className="grid grid-cols-2 gap-4">
                            <FormInput id="reg-firstName" label="First Name" value={regFirstName} onChange={(e) => setRegFirstName(e.target.value)} disabled={isLoading} />
                            <FormInput id="reg-lastName" label="Last Name" value={regLastName} onChange={(e) => setRegLastName(e.target.value)} disabled={isLoading} />
                        </div>
                        <FormInput id="reg-email" label="Email" type="email" value={regEmail} onChange={(e) => setRegEmail(e.target.value)} disabled={isLoading} />
                        <FormInput id="reg-password" label="Password" type="password" value={regPassword} onChange={(e) => setRegPassword(e.target.value)} disabled={isLoading} />
                        
                        <button type="submit" disabled={isLoading} className="w-full mt-4 px-8 py-4 bg-black text-white font-sans font-bold uppercase tracking-widest hover:bg-gray-800 transition-colors disabled:opacity-50">
                            {isLoading ? 'Processing...' : 'Create Account'}
                        </button>
                        
                        <div className="text-center pt-4 border-t border-gray-100">
                            <span className="text-xs text-gray-500 font-sans uppercase tracking-wide">Have an account? </span>
                            <button type='button' onClick={() => toggleFormType('login')} className="text-xs font-bold uppercase tracking-wide text-black border-b border-black ml-2 hover:opacity-60">Sign In</button>
                        </div>
                    </form>
                )}
            </div>
             
             <div className="h-6 mt-6 text-center">
                {error && <p className="text-sm font-sans text-red-600 font-medium" role="alert">{error}</p>}
            </div>
        </div>
    );
};