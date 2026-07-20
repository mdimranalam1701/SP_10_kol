import Image from "next/image";

export default function Home() {
  return (
    <div className="flex-1 w-full h-full p-8 text-foreground animate-in fade-in duration-500">
      
      <header className="mb-8">
        <h1 className="text-4xl font-bold tracking-tight text-white mb-2">
          Dashboard Overview
        </h1>
        <p className="text-zinc-400">
          Welcome back! Here's what's happening at your gym today.
        </p>
      </header>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {[
          { label: "Total Active Members", value: "1,248", trend: "+12% this month" },
          { label: "Monthly Revenue", value: "$42,500", trend: "+8% this month" },
          { label: "Active Trainers", value: "24", trend: "Stable" },
        ].map((stat, i) => (
          <div 
            key={i} 
            className="glass-panel rounded-2xl p-6 transition-transform hover:scale-[1.02] cursor-default"
          >
            <h3 className="text-sm font-medium text-zinc-400 mb-2">{stat.label}</h3>
            <p className="text-3xl font-bold text-white mb-1">{stat.value}</p>
            <span className="text-brand-green text-sm font-medium">{stat.trend}</span>
          </div>
        ))}
      </div>

      {/* Main Content Area */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Large Chart Area Placeholder */}
        <div className="glass-panel rounded-2xl p-6 lg:col-span-2 min-h-[400px] flex flex-col items-center justify-center border border-white/5 relative overflow-hidden group">
          <div className="absolute inset-0 bg-gradient-to-tr from-brand-purple/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
          <h2 className="text-xl font-semibold mb-4 text-white">Revenue Analytics</h2>
          <p className="text-zinc-500 max-w-sm text-center">
            Detailed analytics charts will appear here. Implement Recharts or Chart.js for beautiful interactive graphs!
          </p>
        </div>

        {/* Sidebar / List Area Placeholder */}
        <div className="glass-panel rounded-2xl p-6 flex flex-col">
          <h2 className="text-xl font-semibold mb-6 text-white">Recent Signups</h2>
          <div className="flex flex-col gap-4 flex-1">
            {[1, 2, 3, 4].map((item) => (
              <div key={item} className="flex items-center gap-4 p-3 rounded-xl bg-white/5 border border-white/5 hover:bg-white/10 transition-colors cursor-pointer">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-brand-green to-brand-cyan flex items-center justify-center text-black font-bold">
                  {['JD', 'AS', 'MK', 'RB'][item - 1]}
                </div>
                <div>
                  <p className="text-sm font-semibold text-white">New Member {item}</p>
                  <p className="text-xs text-zinc-400">Joined today</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

    </div>
  );
}
