"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';

const FormInput = ({ 
  label, 
  type, 
  id, 
  value, 
  onChange, 
  required = false,
  pattern,
  minLength,
  title
}: { 
  label: string; 
  type: string; 
  id: string; 
  value: string; 
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void; 
  required?: boolean;
  pattern?: string;
  minLength?: number;
  title?: string;
}) => (
  <div>
    <label htmlFor={id} className="font-sans text-xs uppercase tracking-wider text-white/50">
      {label} {required && <span className="text-red-400">*</span>}
    </label>
    <input
      type={type}
      id={id}
      name={id}
      value={value}
      onChange={onChange}
      required={required}
      pattern={pattern}
      minLength={minLength}
      title={title}
      autoComplete={type === 'password' ? (id === 'password' ? 'current-password' : 'new-password') : (id === 'phone' ? 'tel' : 'email')}
      className="mt-2 w-full px-4 py-3 bg-white/5 border border-white/20 rounded-md focus:outline-none focus:border-white/50 transition-colors font-sans"
    />
  </div>
);

const LoginRegister = () => {
  const [isLoginView, setIsLoginView] = useState(true);
  const [formData, setFormData] = useState({ firstName: '', lastName: '', email: '', password: '', phone: '' });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError(null);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    const endpoint = isLoginView ? '/api/auth/login' : '/api/auth/register';
    
    try {
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || 'Something went wrong');
      }

      if (isLoginView) {
        router.push('/account');
      } else {
        setIsLoginView(true);
        setError("Account created successfully. Please sign in.");
      }

    } catch (err: any) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto">
      <h1 className="font-display text-4xl md:text-5xl font-bold mb-8 text-center">
        {isLoginView ? 'Sign In' : 'Create Account'}
      </h1>

      <form onSubmit={handleSubmit} className="space-y-6">
        <motion.div
          key={isLoginView ? 'login' : 'register'}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="space-y-6"
        >
          {!isLoginView && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormInput label="First Name" type="text" id="firstName" value={formData.firstName} onChange={handleInputChange} required />
              <FormInput label="Last Name" type="text" id="lastName" value={formData.lastName} onChange={handleInputChange} required />
            </div>
          )}
          
          {/* MANDATORY PHONE INPUT */}
          {!isLoginView && (
             <FormInput 
                label="Phone Number" 
                type="tel" 
                id="phone" 
                value={formData.phone} 
                onChange={handleInputChange} 
                required={true}
                minLength={10}
                pattern="[0-9+ ]{10,}"
                title="Please enter a valid phone number"
             />
          )}

          <FormInput label="Email Address" type="email" id="email" value={formData.email} onChange={handleInputChange} required />
          <FormInput label="Password" type="password" id="password" value={formData.password} onChange={handleInputChange} required />
        </motion.div>

        {error && (
            <p className={`text-sm text-center ${error.includes('successfully') ? 'text-green-400' : 'text-red-400'}`}>{error}</p>
        )}

        <div>
          <button
            type="submit"
            disabled={isLoading}
            className="w-full mt-4 px-8 py-3 bg-white text-black font-sans font-bold uppercase tracking-widest disabled:opacity-50 transition-opacity"
          >
            {isLoading ? 'Processing...' : (isLoginView ? 'Sign In' : 'Create Account')}
          </button>
        </div>
      </form>

      <div className="mt-8 text-center">
        <button onClick={() => { setIsLoginView(!isLoginView); setError(null); }} className="font-sans text-sm text-white/50 hover:text-white transition-colors">
          {isLoginView ? 'Need an account? Create one.' : 'Already have an account? Sign in.'}
        </button>
      </div>
    </div>
  );
};

export default LoginRegister;