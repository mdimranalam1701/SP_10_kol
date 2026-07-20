"use client";
import { useState } from 'react';

export default function CustomerProfilePage() {
  const [loading, setLoading] = useState(false);
  
  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    // In production, uses FormData and POSTs to /api/profile
    setTimeout(() => {
      alert("Profile updated successfully!");
      setLoading(false);
    }, 1000);
  };

  return (
    <div className="max-w-2xl mx-auto p-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <h1 className="text-4xl font-extrabold mb-8 text-white">Member <span className="text-gradient">Profile</span></h1>
      <div className="glass-panel rounded-2xl p-8 relative overflow-hidden border border-white/10">
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-brand-cyan to-brand-purple"></div>
        <form onSubmit={handleUpdate} className="flex flex-col gap-6">
          <div>
            <label className="block text-sm font-bold mb-2 text-zinc-300 uppercase tracking-wide">Avatar Upload</label>
            <input type="file" accept="image/*" className="border border-white/10 bg-white/5 text-white p-3 w-full rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-cyan/50" />
          </div>
          <div className="grid grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-bold mb-2 text-zinc-300 uppercase tracking-wide">First Name</label>
              <input type="text" defaultValue="John" className="border border-white/10 bg-white/5 text-white p-3 w-full rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-cyan/50" />
            </div>
            <div>
              <label className="block text-sm font-bold mb-2 text-zinc-300 uppercase tracking-wide">Last Name</label>
              <input type="text" defaultValue="Doe" className="border border-white/10 bg-white/5 text-white p-3 w-full rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-cyan/50" />
            </div>
          </div>
          <div>
            <label className="block text-sm font-bold mb-2 text-zinc-300 uppercase tracking-wide">Email Address</label>
            <input type="email" defaultValue="john@example.com" className="border border-white/10 bg-white/5 text-white p-3 w-full rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-cyan/50" />
          </div>
          <div>
            <label className="block text-sm font-bold mb-2 text-zinc-300 uppercase tracking-wide">Phone Number</label>
            <input type="tel" defaultValue="+1987654321" className="border border-white/10 bg-white/5 text-white p-3 w-full rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-cyan/50" />
          </div>
          <div className="border-t border-white/10 pt-6 mt-2">
            <label className="block text-sm font-bold mb-2 text-zinc-300 uppercase tracking-wide">Change Password</label>
            <input type="password" placeholder="Enter new password" className="border border-white/10 bg-white/5 text-white p-3 w-full rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-cyan/50 placeholder:text-zinc-600" />
          </div>
          <button type="submit" disabled={loading} className="mt-6 bg-gradient-to-r from-brand-cyan to-brand-purple hover:opacity-90 text-white font-bold py-3 px-4 rounded-xl transition-all shadow-lg">
            {loading ? "Authenticating..." : "Save Identity Parameters"}
          </button>
        </form>
      </div>
    </div>
  );
}
