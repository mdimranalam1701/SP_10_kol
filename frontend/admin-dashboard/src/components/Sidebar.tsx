import Link from 'next/link';

export function Sidebar() {
  return (
    <aside className="w-64 bg-slate-900 text-white h-screen p-4 flex flex-col">
      <div className="text-2xl font-bold mb-8 text-slate-100">Gym Admin</div>
      <nav className="flex flex-col gap-4">
        <Link href="/" className="hover:bg-slate-800 p-2 rounded">Dashboard</Link>
        <Link href="/members" className="hover:bg-slate-800 p-2 rounded">Members</Link>
        <Link href="/finance" className="hover:bg-slate-800 p-2 rounded">Finance</Link>
        <Link href="/plans" className="hover:bg-slate-800 p-2 rounded">Subscription Plans</Link>
        <Link href="/trainers" className="hover:bg-slate-800 p-2 rounded">Trainers</Link>
        <Link href="/profile" className="hover:bg-slate-800 p-2 rounded">My Profile</Link>
      </nav>
    </aside>
  );
}
