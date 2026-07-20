"use client";
import { useContext, useEffect, Suspense } from 'react';
import { useRouter } from 'next/navigation';
import { AuthContext } from '@/lib/AuthContext';

function DashboardContent() {
  const { role, isLoading, logout } = useContext(AuthContext);
  const router = useRouter();

  useEffect(() => {
    if (!isLoading && role === 'none') {
      router.push('/login');
    }
  }, [isLoading, role, router]);

  if (isLoading || role === 'none') {
    return <div className="text-white text-center mt-20">Loading...</div>;
  }

  if (role === 'trainer') {
    return <TrainerDashboard onLogout={logout} />;
  }
  return <CustomerDashboard onLogout={logout} />;
}

export default function AppRouter() {
  return (
    <div className="p-8">
      <Suspense fallback={<div className="text-white">Loading dashboard...</div>}>
        <DashboardContent />
      </Suspense>
    </div>
  );
}

// ----------------------------------------------------------------------
// CUSTOMER DASHBOARD
// ----------------------------------------------------------------------
function CustomerDashboard({ onLogout }: { onLogout: () => void }) {
  return (
    <div className="max-w-4xl mx-auto space-y-8 animate-in slide-in-from-bottom-4 duration-500">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Welcome, <span className="text-gradient">Customer</span></h1>
        <div className="flex gap-4">
          <button className="px-4 py-2 rounded-xl bg-white/10 text-white font-medium hover:bg-white/20 transition-colors">
            ⚙️ Settings
          </button>
          <button onClick={onLogout} className="px-4 py-2 rounded-xl bg-red-500/10 text-red-500 font-medium hover:bg-red-500/20 transition-colors">
            Logout
          </button>
        </div>
      </div>

      <div className="glass-panel p-6 rounded-2xl border border-brand-cyan/20 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-brand-cyan to-brand-purple"></div>
        <h2 className="text-xl font-bold mb-2 text-white">Active Plan</h2>
        <div className="flex justify-between items-end">
          <div>
            <p className="text-4xl font-extrabold text-white">Annual Pro</p>
            <p className="text-brand-cyan font-medium">Expires: July 20, 2027</p>
          </div>
          <div className="px-3 py-1 rounded-full bg-brand-cyan/20 text-brand-cyan font-bold text-sm">ACTIVE</div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="glass-panel p-6 rounded-2xl border border-white/5">
          <h2 className="text-xl font-bold mb-4 text-white">My Progress</h2>
          <div className="space-y-4">
            <div className="flex justify-between">
              <span className="text-zinc-400">Current Weight</span>
              <span className="text-white font-bold">185 lbs</span>
            </div>
            <div className="w-full h-2 bg-white/10 rounded-full overflow-hidden">
              <div className="h-full w-[65%] bg-brand-cyan"></div>
            </div>
            <div className="flex justify-between mt-4">
              <span className="text-zinc-400">Daily Calories</span>
              <span className="text-white font-bold">2,400 kcal</span>
            </div>
          </div>
        </div>

        <div className="glass-panel p-6 rounded-2xl border border-white/5">
          <h2 className="text-xl font-bold mb-4 text-white">My Trainer</h2>
          <div className="flex items-center gap-4 mb-4">
            <div className="w-12 h-12 rounded-full bg-brand-green/20 flex items-center justify-center font-bold text-brand-green">CM</div>
            <div>
              <p className="text-white font-bold">Coach Mike</p>
              <p className="text-zinc-400 text-sm">Next Session: Tomorrow, 2PM</p>
            </div>
          </div>
          <button className="w-full py-3 bg-white/5 hover:bg-white/10 rounded-xl transition-colors text-white font-medium">
            Message Trainer
          </button>
        </div>
      </div>
    </div>
  );
}

// ----------------------------------------------------------------------
// TRAINER DASHBOARD
// ----------------------------------------------------------------------
function TrainerDashboard({ onLogout }: { onLogout: () => void }) {
  const schedule = [
    { id: 1, time: '09:00 AM', title: 'Morning HIIT', type: 'Class', attendees: 12 },
    { id: 2, time: '11:30 AM', title: 'Personal Training', type: 'PT', client: 'John Doe' },
  ];

  return (
    <div className="max-w-4xl mx-auto space-y-8 animate-in slide-in-from-bottom-4 duration-500">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Trainer, <span className="text-gradient">Welcome</span></h1>
        <div className="flex gap-4">
          <button className="px-4 py-2 rounded-xl bg-white/10 text-white font-medium hover:bg-white/20 transition-colors">
            ⚙️ Settings
          </button>
          <button onClick={onLogout} className="px-4 py-2 rounded-xl bg-red-500/10 text-red-500 font-medium hover:bg-red-500/20 transition-colors">
            Logout
          </button>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="glass-panel p-6 rounded-2xl border border-brand-green/20">
          <p className="text-zinc-400 text-sm mb-1">Today's Payout</p>
          <p className="text-3xl font-extrabold text-white">$145.00</p>
        </div>
        <div className="glass-panel p-6 rounded-2xl border border-white/5">
          <p className="text-zinc-400 text-sm mb-1">Assigned Clients</p>
          <p className="text-3xl font-extrabold text-white">8</p>
        </div>
      </div>

      <div className="glass-panel p-6 rounded-2xl border border-white/5">
        <h2 className="text-xl font-bold mb-4 text-white">Today's Schedule</h2>
        <div className="space-y-4">
          {schedule.map(s => (
            <div key={s.id} className="flex gap-4 items-center p-4 rounded-xl bg-white/5">
              <div className="font-bold text-brand-green w-20">{s.time.split(' ')[0]}</div>
              <div className="w-px h-8 bg-white/10"></div>
              <div>
                <p className="text-white font-bold">{s.title}</p>
                <p className="text-sm text-zinc-400">{s.client ? `Client: ${s.client}` : `Attendees: ${s.attendees}`}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
