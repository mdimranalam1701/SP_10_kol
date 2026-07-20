"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate login redirect to dashboard
    router.push("/");
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center p-4 bg-background bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-zinc-900 via-background to-background animate-in fade-in duration-700 relative">
      <div className="absolute inset-0 bg-grid-white/[0.02] bg-[size:50px_50px]" />
      
      <div className="glass-panel w-full max-w-md p-8 rounded-2xl relative z-10 border border-white/5 shadow-2xl">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-extrabold text-white mb-2">
            Gym<span className="text-brand-green">SaaS</span> Admin
          </h1>
          <p className="text-zinc-400 text-sm">Sign in to manage your gym</p>
        </div>

        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block text-xs font-medium text-zinc-400 mb-1 ml-1" htmlFor="email">Email</label>
            <input 
              id="email"
              type="email" 
              placeholder="admin@gym.com" 
              className="w-full bg-zinc-900/50 border border-zinc-800 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-brand-green/50 transition-all placeholder:text-zinc-600"
              required
            />
          </div>
          
          <div>
            <label className="block text-xs font-medium text-zinc-400 mb-1 ml-1" htmlFor="password">Password</label>
            <input 
              id="password"
              type="password" 
              placeholder="••••••••" 
              className="w-full bg-zinc-900/50 border border-zinc-800 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-brand-green/50 transition-all placeholder:text-zinc-600"
              required
            />
          </div>

          <div className="flex items-center justify-between mt-2">
            <label className="flex items-center gap-2 text-sm text-zinc-400 cursor-pointer hover:text-zinc-300">
              <input type="checkbox" className="rounded bg-zinc-900 border-zinc-800 text-brand-green focus:ring-brand-green focus:ring-offset-background" />
              Remember me
            </label>
            <a href="#" className="text-sm text-brand-cyan hover:text-brand-cyan/80 transition-colors">Forgot password?</a>
          </div>

          <button 
            type="submit" 
            className="w-full mt-6 bg-gradient-to-r from-brand-green to-brand-cyan hover:opacity-90 text-black font-bold py-3 px-4 rounded-xl transition-all shadow-[0_0_20px_rgba(0,255,136,0.2)] hover:shadow-[0_0_25px_rgba(0,255,136,0.4)]"
          >
            Sign In
          </button>
        </form>

        <div className="mt-8 text-center text-sm text-zinc-500">
          Don't have an account?{" "}
          <Link href="/register" className="text-white hover:text-brand-green transition-colors font-medium">
            Create an account
          </Link>
        </div>
      </div>
    </div>
  );
}
