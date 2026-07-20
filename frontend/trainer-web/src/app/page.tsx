"use client";
import { useState } from 'react';

export default function TrainerDashboard() {
  const [schedule] = useState([
    { id: 1, time: '09:00 AM', title: 'Morning HIIT', type: 'Class', attendees: 12 },
    { id: 2, time: '11:30 AM', title: 'Personal Training', type: 'PT', attendees: 1, client: 'John Doe' },
    { id: 3, time: '02:00 PM', title: 'Personal Training', type: 'PT', attendees: 1, client: 'Sarah Connor' },
    { id: 4, time: '05:00 PM', title: 'Core Crusher', type: 'Class', attendees: 18 },
  ]);

  return (
    <div className="max-w-6xl mx-auto animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex justify-between items-end mb-10">
        <div>
          <h1 className="text-4xl font-extrabold text-white mb-2">Today's <span className="text-gradient">Schedule</span></h1>
          <p className="text-zinc-400 text-lg">Thursday, July 20, 2026</p>
        </div>
        <button className="bg-gradient-to-r from-brand-green to-brand-cyan hover:opacity-90 text-black font-bold py-3 px-6 rounded-xl transition-all shadow-lg">
          + Book Session
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Left Col: Roster */}
        <div className="lg:col-span-2 space-y-4">
          {schedule.map(session => (
            <div key={session.id} className="glass-panel rounded-2xl p-6 flex items-center gap-6 hover:scale-[1.01] transition-transform duration-300 border border-white/5">
              <div className="text-center min-w-[100px]">
                <p className="text-2xl font-bold text-white">{session.time.split(' ')[0]}</p>
                <p className="text-brand-green font-semibold">{session.time.split(' ')[1]}</p>
              </div>
              <div className="w-px h-12 bg-white/10"></div>
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-1">
                  <h3 className="text-xl font-bold text-white">{session.title}</h3>
                  <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase ${session.type === 'Class' ? 'bg-brand-cyan/20 text-brand-cyan border border-brand-cyan/30' : 'bg-brand-purple/20 text-brand-purple border border-brand-purple/30'}`}>
                    {session.type}
                  </span>
                </div>
                <p className="text-zinc-400">
                  {session.type === 'Class' ? `${session.attendees} Attendees Registered` : `Client: ${session.client}`}
                </p>
              </div>
              <button className="p-3 bg-white/5 hover:bg-white/10 rounded-xl transition-colors border border-white/10 text-white font-medium">
                View Details
              </button>
            </div>
          ))}
        </div>

        {/* Right Col: Stats */}
        <div className="space-y-6">
          <div className="glass-panel rounded-2xl p-8 border border-white/5 text-center relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-brand-green to-brand-cyan"></div>
            <h3 className="text-zinc-400 font-medium mb-2">Total Classes Today</h3>
            <p className="text-6xl font-extrabold text-white">2</p>
          </div>
          
          <div className="glass-panel rounded-2xl p-8 border border-white/5 text-center relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-brand-cyan to-brand-purple"></div>
            <h3 className="text-zinc-400 font-medium mb-2">PT Sessions Today</h3>
            <p className="text-6xl font-extrabold text-white">2</p>
          </div>

          <div className="glass-panel rounded-2xl p-6 border border-white/5">
            <h3 className="text-white font-bold text-lg mb-4">Quick Actions</h3>
            <div className="space-y-3">
              <button className="w-full text-left p-4 bg-white/5 hover:bg-white/10 rounded-xl transition-colors text-zinc-300 font-medium">
                ⏱ Log Working Hours
              </button>
              <button className="w-full text-left p-4 bg-white/5 hover:bg-white/10 rounded-xl transition-colors text-zinc-300 font-medium">
                📝 Review Client Goals
              </button>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
