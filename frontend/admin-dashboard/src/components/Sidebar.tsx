import Link from "next/link";

export function Sidebar() {
  return (
    <aside className="w-64 glass-panel m-4 rounded-2xl flex flex-col p-6 z-20 border border-white/5 relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-brand-green to-brand-cyan"></div>
      <h2 className="text-2xl font-extrabold mb-8 text-transparent bg-clip-text bg-gradient-to-r from-brand-green to-brand-cyan">GymSaaS Admin</h2>
      <nav className="flex flex-col gap-2">
        <Link href="/" className="hover:bg-white/10 hover:translate-x-1 transition-all duration-300 p-3 rounded-xl text-zinc-300 hover:text-white font-medium">Dashboard</Link>
        <Link href="/members" className="hover:bg-white/10 hover:translate-x-1 transition-all duration-300 p-3 rounded-xl text-zinc-300 hover:text-white font-medium">Members</Link>
        <Link href="/finance" className="hover:bg-white/10 hover:translate-x-1 transition-all duration-300 p-3 rounded-xl text-zinc-300 hover:text-white font-medium">Finance</Link>
        <Link href="/plans" className="hover:bg-white/10 hover:translate-x-1 transition-all duration-300 p-3 rounded-xl text-zinc-300 hover:text-white font-medium">Subscription Plans</Link>
        <Link href="/trainers" className="hover:bg-white/10 hover:translate-x-1 transition-all duration-300 p-3 rounded-xl text-zinc-300 hover:text-white font-medium">Trainers</Link>
        <Link href="/profile" className="hover:bg-white/10 hover:translate-x-1 transition-all duration-300 p-3 rounded-xl text-zinc-300 hover:text-white font-medium mt-auto">My Profile</Link>
      </nav>
    </aside>
  );
}
