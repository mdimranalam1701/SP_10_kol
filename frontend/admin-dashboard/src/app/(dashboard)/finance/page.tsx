"use client";
import { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";

const DEMO_GYM_ID = "gym-123";

export default function FinancePage() {
  const [stats, setStats] = useState({ totalRevenue: 0, totalPending: 0, paidMembersCount: 0, pendingMembersCount: 0 });
  const [payments, setPayments] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // In a real app, this would fetch from http://localhost:5000/api/finance/stats
    // For now, we mock the data for MVP UI testing
    setTimeout(() => {
      setStats({
        totalRevenue: 12500,
        totalPending: 3200,
        paidMembersCount: 145,
        pendingMembersCount: 12
      });
      setPayments([
        { id: '1', amount: 199.99, status: 'PAID', user: { firstName: 'John', lastName: 'Doe', email: 'john@example.com' }, createdAt: '2026-07-20' },
        { id: '2', amount: 149.99, status: 'PENDING', user: { firstName: 'Sarah', lastName: 'Connor', email: 'sarah@example.com' }, createdAt: '2026-07-19' },
        { id: '3', amount: 299.99, status: 'PAID', user: { firstName: 'Mike', lastName: 'Tyson', email: 'mike@example.com' }, createdAt: '2026-07-18' },
        { id: '4', amount: 50.00, status: 'OVERDUE', user: { firstName: 'Alice', lastName: 'Smith', email: 'alice@example.com' }, createdAt: '2026-07-10' },
      ]);
      setLoading(false);
    }, 500);
  }, []);

  if (loading) return <div>Loading financial data...</div>;

  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
      <h1 className="text-4xl font-extrabold mb-8 text-white">Financial <span className="text-gradient">Overview</span></h1>
      
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-10">
        <Card className="glass-panel border-0 hover:scale-[1.02] transition-transform duration-300">
          <CardHeader className="pb-2"><CardTitle className="text-zinc-400 font-medium">Total Revenue</CardTitle></CardHeader>
          <CardContent><p className="text-4xl font-bold text-brand-green">${stats.totalRevenue.toLocaleString()}</p></CardContent>
        </Card>
        <Card className="glass-panel border-0 hover:scale-[1.02] transition-transform duration-300">
          <CardHeader className="pb-2"><CardTitle className="text-zinc-400 font-medium">Pending Revenue</CardTitle></CardHeader>
          <CardContent><p className="text-4xl font-bold text-brand-cyan">${stats.totalPending.toLocaleString()}</p></CardContent>
        </Card>
        <Card className="glass-panel border-0 hover:scale-[1.02] transition-transform duration-300">
          <CardHeader className="pb-2"><CardTitle className="text-zinc-400 font-medium">Paid Members</CardTitle></CardHeader>
          <CardContent><p className="text-4xl font-bold text-white">{stats.paidMembersCount}</p></CardContent>
        </Card>
        <Card className="glass-panel border-0 hover:scale-[1.02] transition-transform duration-300">
          <CardHeader className="pb-2"><CardTitle className="text-zinc-400 font-medium">Unpaid Members</CardTitle></CardHeader>
          <CardContent><p className="text-4xl font-bold text-red-500">{stats.pendingMembersCount}</p></CardContent>
        </Card>
      </div>

      <h2 className="text-2xl font-bold mb-6 text-white">Payment Ledger</h2>
      <div className="glass-panel rounded-xl border border-white/10 overflow-hidden">
        <Table>
          <TableHeader className="bg-white/5">
            <TableRow className="border-white/10 hover:bg-white/5">
              <TableHead className="text-zinc-300 font-medium">Member</TableHead>
              <TableHead className="text-zinc-300 font-medium">Email</TableHead>
              <TableHead className="text-zinc-300 font-medium">Amount</TableHead>
              <TableHead className="text-zinc-300 font-medium">Date</TableHead>
              <TableHead className="text-zinc-300 font-medium">Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {payments.map((p) => (
              <TableRow key={p.id} className="border-white/10 hover:bg-white/5 transition-colors">
                <TableCell className="font-semibold text-white">{p.user.firstName} {p.user.lastName}</TableCell>
                <TableCell className="text-zinc-400">{p.user.email}</TableCell>
                <TableCell className="text-white font-medium">${p.amount.toFixed(2)}</TableCell>
                <TableCell className="text-zinc-400">{p.createdAt}</TableCell>
                <TableCell>
                  <Badge className={p.status === 'PAID' ? 'bg-brand-green/20 text-brand-green border border-brand-green/30' : p.status === 'PENDING' ? 'bg-brand-cyan/20 text-brand-cyan border border-brand-cyan/30' : 'bg-red-500/20 text-red-400 border border-red-500/30'}>
                    {p.status}
                  </Badge>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
