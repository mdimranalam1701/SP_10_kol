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
    <div className="max-w-4xl mx-auto p-8">
      <h1 className="text-3xl font-bold mb-2">My Subscription</h1>
      <p className="text-slate-500 mb-8">Manage your membership plan and billing.</p>

      <div className="grid md:grid-cols-2 gap-6">
        {availablePlans.map(plan => {
          const isActive = plan.id === activePlanId;
          return (
            <div key={plan.id} className={`rounded-xl border p-6 flex flex-col ${isActive ? 'border-indigo-600 ring-2 ring-indigo-600 ring-opacity-20 bg-indigo-50/30' : 'bg-white'}`}>
              <div className="flex justify-between items-start mb-4">
                <h3 className="text-xl font-bold">{plan.name}</h3>
                {isActive && <span className="bg-indigo-100 text-indigo-800 text-xs font-bold px-2.5 py-0.5 rounded uppercase">Current Plan</span>}
              </div>
              <p className="text-3xl font-bold mb-6">${plan.price} <span className="text-sm font-normal text-slate-500">/ {plan.durationDays} days</span></p>
              
              <ul className="mb-8 space-y-2 flex-1">
                {plan.features.map((f, i) => (
                  <li key={i} className="flex items-center text-sm">
                    <svg className="w-4 h-4 mr-2 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
                    {f}
                  </li>
                ))}
              </ul>

              {!isActive && (
                <button 
                  onClick={() => handleUpgrade(plan.id)}
                  disabled={loading}
                  className="w-full bg-slate-900 hover:bg-slate-800 text-white font-medium py-2 rounded-md transition-colors"
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
