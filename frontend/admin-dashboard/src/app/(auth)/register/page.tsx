"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function RegisterPage() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [gymName, setGymName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const [firstName, ...lastNameParts] = name.trim().split(" ");
      const lastName = lastNameParts.length > 0 ? lastNameParts.join(" ") : " ";

      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000'}/auth/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email,
          password,
          firstName,
          lastName,
          role: 'OWNER',
          gymName
        })
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || 'Registration failed');
      }

      localStorage.setItem('token', data.token);
      router.push("/");
    } catch (err: any) {
      setError(err.message);
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
            Create an Account
          </h1>
          <p className="text-zinc-400 text-sm">Join GymSaaS today to manage your gym</p>
        </div>

        {error && (
          <div className="mb-4 p-3 bg-red-500/10 border border-red-500/50 rounded-xl text-red-500 text-sm text-center">
            {error}
          </div>
        )}

        <form onSubmit={handleRegister} className="space-y-4">
          <div>
            <label className="block text-xs font-medium text-zinc-400 mb-1 ml-1" htmlFor="name">Full Name</label>
            <input 
              id="name"
              type="text" 
              placeholder="John Doe" 
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full bg-zinc-900/50 border border-zinc-800 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-brand-cyan/50 transition-all placeholder:text-zinc-600"
              required
            />
          </div>
          
          <div>
            <label className="block text-xs font-medium text-zinc-400 mb-1 ml-1" htmlFor="gymName">Gym Name</label>
            <input 
              id="gymName"
              type="text" 
              placeholder="Elite Fitness Center" 
              value={gymName}
              onChange={(e) => setGymName(e.target.value)}
              className="w-full bg-zinc-900/50 border border-zinc-800 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-brand-cyan/50 transition-all placeholder:text-zinc-600"
              required
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-zinc-400 mb-1 ml-1" htmlFor="email">Email</label>
            <input 
              id="email"
              type="email" 
              placeholder="admin@gym.com" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-zinc-900/50 border border-zinc-800 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-brand-cyan/50 transition-all placeholder:text-zinc-600"
              required
            />
          </div>
          
          <div>
            <label className="block text-xs font-medium text-zinc-400 mb-1 ml-1" htmlFor="password">Password</label>
            <input 
              id="password"
              type="password" 
              placeholder="••••••••" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-zinc-900/50 border border-zinc-800 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-brand-cyan/50 transition-all placeholder:text-zinc-600"
              required
            />
          </div>

          <button 
            type="submit" 
            disabled={loading}
            className="w-full mt-8 bg-gradient-to-r from-brand-cyan to-brand-purple hover:opacity-90 text-white font-bold py-3 px-4 rounded-xl transition-all shadow-[0_0_20px_rgba(0,210,255,0.2)] hover:shadow-[0_0_25px_rgba(0,210,255,0.4)] disabled:opacity-50"
          >
            {loading ? "Signing up..." : "Sign Up"}
          </button>
        </form>

        <div className="mt-8 text-center text-sm text-zinc-500">
          Already have an account?{" "}
          <Link href="/login" className="text-white hover:text-brand-cyan transition-colors font-medium">
            Sign in instead
          </Link>
        </div>
      </div>
    </div>
  );
}
