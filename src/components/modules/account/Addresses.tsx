"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ShopifyAddress, NewAddressInput } from "@/types/shopify";

// AddressCard component
const AddressCard = ({ address }: { address: ShopifyAddress }) => (
  <div className="p-6 border border-white/10 rounded-lg">
    <p className="font-sans">
      {address.address1}<br />
      {address.address2 && <>{address.address2}<br /></>}
      {address.city}, {address.province} {address.zip}<br />
      {address.country}
    </p>
    {address.phone && (
        <p className="font-mono text-sm text-white/50 mt-2">{address.phone}</p>
    )}
    <div className="mt-4 flex gap-4 font-sans text-xs uppercase tracking-wider">
      <button className="hover:text-white">Edit</button>
      <button className="hover:text-red-400">Delete</button>
    </div>
  </div>
);

interface AddressFormProps {
    onCancel: () => void;
    onFormSubmit: (addressData: NewAddressInput) => void;
}

const AddressForm = ({ onCancel, onFormSubmit }: AddressFormProps) => {
    const [address1, setAddress1] = useState('');
    const [address2, setAddress2] = useState('');
    const [city, setCity] = useState('');
    const [province, setProvince] = useState('');
    const [country, setCountry] = useState('');
    const [zip, setZip] = useState('');
    const [phone, setPhone] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onFormSubmit({ address1, address2, city, province, country, zip, phone });
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4 p-6 border border-white/10 rounded-lg">
             <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                     <label className="block text-xs uppercase text-white/50 mb-1">Address 1 *</label>
                     <input type="text" value={address1} onChange={e => setAddress1(e.target.value)} required className="w-full px-3 py-2 bg-white/5 border border-white/20 rounded font-sans focus:outline-none focus:border-white/50 transition-colors" />
                </div>
                <div>
                     <label className="block text-xs uppercase text-white/50 mb-1">Address 2</label>
                     <input type="text" value={address2} onChange={e => setAddress2(e.target.value)} className="w-full px-3 py-2 bg-white/5 border border-white/20 rounded font-sans focus:outline-none focus:border-white/50 transition-colors" />
                </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
                 <div>
                     <label className="block text-xs uppercase text-white/50 mb-1">City *</label>
                     <input type="text" value={city} onChange={e => setCity(e.target.value)} required className="w-full px-3 py-2 bg-white/5 border border-white/20 rounded font-sans focus:outline-none focus:border-white/50 transition-colors" />
                </div>
                 <div>
                     <label className="block text-xs uppercase text-white/50 mb-1">State/Province *</label>
                     <input type="text" value={province} onChange={e => setProvince(e.target.value)} required className="w-full px-3 py-2 bg-white/5 border border-white/20 rounded font-sans focus:outline-none focus:border-white/50 transition-colors" />
                </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
                 <div>
                     <label className="block text-xs uppercase text-white/50 mb-1">Country *</label>
                     <input type="text" value={country} onChange={e => setCountry(e.target.value)} required className="w-full px-3 py-2 bg-white/5 border border-white/20 rounded font-sans focus:outline-none focus:border-white/50 transition-colors" />
                </div>
                 <div>
                     <label className="block text-xs uppercase text-white/50 mb-1">Zip/Postal *</label>
                     <input type="text" value={zip} onChange={e => setZip(e.target.value)} required className="w-full px-3 py-2 bg-white/5 border border-white/20 rounded font-sans focus:outline-none focus:border-white/50 transition-colors" />
                </div>
            </div>
            
            {/* PHONE INPUT - MANDATORY */}
            <div>
                 <label className="block text-xs uppercase text-white/50 mb-1">Phone Number *</label>
                 <input 
                    type="tel" 
                    value={phone} 
                    onChange={e => setPhone(e.target.value)} 
                    required 
                    minLength={10}
                    pattern="[0-9+ ]{10,}"
                    title="Please enter a valid phone number (at least 10 digits)"
                    className="w-full px-3 py-2 bg-white/5 border border-white/20 rounded font-sans focus:outline-none focus:border-white/50 transition-colors" 
                />
            </div>

            <div className="flex gap-4 pt-4">
                <button type="submit" className="px-6 py-2 bg-white text-black font-bold uppercase text-sm rounded hover:bg-white/90 transition-colors">Save Address</button>
                <button type="button" onClick={onCancel} className="px-6 py-2 border border-white/20 text-white uppercase text-sm rounded hover:bg-white/10 transition-colors">Cancel</button>
            </div>
        </form>
    );
}

interface AddressesProps {
  addresses: ShopifyAddress[];
}

const Addresses = ({ addresses }: AddressesProps) => {
  const router = useRouter();
  const [isAdding, setIsAdding] = useState(false);
  const [error, setError] = useState('');

  const handleAddNewAddress = async (addressData: NewAddressInput) => {
    setError('');
    const response = await fetch('/api/account/addAddress', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(addressData),
    });

    if (response.ok) {
        setIsAdding(false);
        router.refresh();
    } else {
        const result = await response.json();
        setError(result.error || 'Failed to add address.');
    }
  };

  return (
    <div className="max-w-lg space-y-8">
        <div className="flex justify-between items-end">
            <h2 className="font-display text-3xl font-bold">Saved Addresses</h2>
            {!isAdding && (
                <button 
                    onClick={() => setIsAdding(true)}
                    className="text-sm font-sans uppercase tracking-wider hover:text-white text-white/70 transition-colors"
                >
                    + Add New
                </button>
            )}
        </div>

        {error && (
            <div className="p-4 bg-red-900/20 border border-red-500/50 text-red-400 rounded-lg text-sm">
                {error}
            </div>
        )}

        {isAdding ? (
            <AddressForm 
                onCancel={() => setIsAdding(false)} 
                onFormSubmit={handleAddNewAddress} 
            />
        ) : (
            <div className="space-y-4">
                {addresses.length === 0 ? (
                    <p className="text-white/50 font-sans">No addresses saved yet.</p>
                ) : (
                    addresses.map(address => (
                        <AddressCard key={address.id} address={address} />
                    ))
                )}
            </div>
        )}
    </div>
  );
};

export default Addresses;