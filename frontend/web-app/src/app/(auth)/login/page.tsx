"use client";

import Link from "next/link";
import { useContext, useState } from "react";
import { AuthContext } from "@/lib/AuthContext";

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const { login } = useContext(AuthContext);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg('');

    try {
      const response = await fetch('http://localhost:5000/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });
      
      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.error || 'Login failed');
      }

      const userRole = data.user.role === 'TRAINER' ? 'trainer' : 'customer';
      login(data.token, userRole);
      
    } catch (error: any) {
      setErrorMsg(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center p-4 bg-background bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-zinc-900 via-background to-background animate-in fade-in duration-700 relative">
      <div className="absolute inset-0 bg-grid-white/[0.02] bg-[size:50px_50px]" />
      
      <div className="glass-panel w-full max-w-md p-8 rounded-2xl relative z-10 border border-white/5 shadow-2xl">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-extrabold text-white mb-2">
            Login to Gym<span className="text-brand-purple">SaaS</span>
          </h1>
          <p className="text-zinc-400 text-sm">Access your personalized portal</p>
        </div>

        <form onSubmit={handleLogin} className="space-y-4">
          {errorMsg ? (
            <div className="bg-red-500/10 border border-red-500/50 text-red-500 text-sm p-3 rounded-xl mb-4">
              {errorMsg}
            </div>
          ) : null}

          <div>
            <label className="block text-xs font-medium text-zinc-400 mb-1 ml-1" htmlFor="identifier">Email</label>
            <input 
              id="identifier"
              type="email" 
              placeholder="john@example.com" 
              className="w-full bg-zinc-900/50 border border-zinc-800 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-brand-purple/50 transition-all placeholder:text-zinc-600"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          
          <div>
            <label className="block text-xs font-medium text-zinc-400 mb-1 ml-1" htmlFor="password">Password</label>
            <input 
              id="password"
              type="password" 
              placeholder="••••••••" 
              className="w-full bg-zinc-900/50 border border-zinc-800 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-brand-purple/50 transition-all placeholder:text-zinc-600"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <div className="flex items-center justify-between mt-2">
            <label className="flex items-center gap-2 text-sm text-zinc-400 cursor-pointer hover:text-zinc-300">
              <input type="checkbox" className="rounded bg-zinc-900 border-zinc-800 text-brand-purple focus:ring-brand-purple focus:ring-offset-background" />
              Remember me
            </label>
            <a href="#" className="text-sm text-brand-cyan hover:text-brand-cyan/80 transition-colors">Forgot password?</a>
          </div>

          <button 
            type="submit" 
            disabled={loading}
            className="w-full mt-6 bg-gradient-to-r from-brand-cyan to-brand-purple hover:opacity-90 text-white font-bold py-3 px-4 rounded-xl transition-all shadow-[0_0_20px_rgba(139,92,246,0.2)] hover:shadow-[0_0_25px_rgba(139,92,246,0.4)] disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? 'Signing in...' : 'Sign In'}
          </button>
        </form>

        <div className="mt-8 text-center text-sm text-zinc-500">
          Don't have an account?{" "}
          <Link href="/register" className="text-white hover:text-brand-purple transition-colors font-medium">
            Create an account
          </Link>
        </div>
      </div>
    </div>
  );
}
