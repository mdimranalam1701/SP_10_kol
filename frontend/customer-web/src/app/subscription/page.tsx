"use client";
import { useState } from 'react';

export default function SubscriptionPage() {
  const [activePlanId, setActivePlanId] = useState('1');
  const [loading, setLoading] = useState(false);

  const availablePlans = [
    { id: '1', name: 'Monthly Basic', price: 49.99, durationDays: 30, features: ['Gym Access', 'Locker Room'] },
    { id: '2', name: 'Annual Pro', price: 499.99, durationDays: 365, features: ['Gym Access', 'Locker Room', 'Group Classes', '1 PT Session/mo'] },
  ];

  const handleUpgrade = (planId: string) => {
    setLoading(true);
    // In production, sends PUT /api/memberships/upgrade
    setTimeout(() => {
      setActivePlanId(planId);
      alert("Plan upgraded successfully! Your new features are now active.");
      setLoading(false);
    }, 1000);
  };

  return (
    <div className="max-w-5xl mx-auto p-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="text-center mb-12">
        <h1 className="text-5xl font-extrabold mb-4 text-white">Choose Your <span className="text-gradient">Evolution</span></h1>
        <p className="text-zinc-400 text-lg">Manage your membership plan and unlock new limits.</p>
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        {availablePlans.map(plan => {
          const isActive = plan.id === activePlanId;
          return (
            <div key={plan.id} className={`glass-panel rounded-2xl p-8 flex flex-col relative overflow-hidden transition-all duration-500 hover:scale-[1.02] ${isActive ? 'border-brand-cyan shadow-[0_0_30px_-5px_rgba(0,210,255,0.3)]' : 'border-white/10'}`}>
              {isActive && <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-brand-cyan to-brand-purple"></div>}
              
              <div className="flex justify-between items-start mb-6">
                <h3 className="text-2xl font-extrabold text-white">{plan.name}</h3>
                {isActive && <span className="bg-brand-cyan/20 text-brand-cyan border border-brand-cyan/50 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">Active</span>}
              </div>
              <p className="text-5xl font-bold mb-8 text-white">${plan.price} <span className="text-lg font-normal text-zinc-500">/ {plan.durationDays}d</span></p>
              
              <ul className="mb-10 space-y-4 flex-1">
                {plan.features.map((f, i) => (
                  <li key={i} className="flex items-center text-zinc-300 font-medium">
                    <svg className="w-5 h-5 mr-3 text-brand-cyan" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7"></path></svg>
                    {f}
                  </li>
                ))}
              </ul>

              {!isActive && (
                <button 
                  onClick={() => handleUpgrade(plan.id)}
                  disabled={loading}
                  className="w-full bg-gradient-to-r from-brand-cyan to-brand-purple hover:opacity-90 text-white font-bold py-3 rounded-xl transition-all shadow-lg"
                >
                  Upgrade to {plan.name}
                </button>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
