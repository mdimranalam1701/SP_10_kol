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
    <div>
      <h1 className="text-3xl font-bold mb-6">Financial Overview</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <Card>
          <CardHeader><CardTitle>Total Revenue</CardTitle></CardHeader>
          <CardContent><p className="text-3xl font-bold text-green-600">${stats.totalRevenue.toLocaleString()}</p></CardContent>
        </Card>
        <Card>
          <CardHeader><CardTitle>Pending Revenue</CardTitle></CardHeader>
          <CardContent><p className="text-3xl font-bold text-yellow-600">${stats.totalPending.toLocaleString()}</p></CardContent>
        </Card>
        <Card>
          <CardHeader><CardTitle>Paid Members</CardTitle></CardHeader>
          <CardContent><p className="text-3xl font-bold">{stats.paidMembersCount}</p></CardContent>
        </Card>
        <Card>
          <CardHeader><CardTitle>Unpaid Members</CardTitle></CardHeader>
          <CardContent><p className="text-3xl font-bold text-red-500">{stats.pendingMembersCount}</p></CardContent>
        </Card>
      </div>

      <h2 className="text-2xl font-bold mb-4">Payment Ledger</h2>
      <div className="bg-white rounded-md border shadow-sm">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Member</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Amount</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {payments.map((p) => (
              <TableRow key={p.id}>
                <TableCell className="font-medium">{p.user.firstName} {p.user.lastName}</TableCell>
                <TableCell>{p.user.email}</TableCell>
                <TableCell>${p.amount.toFixed(2)}</TableCell>
                <TableCell>{p.createdAt}</TableCell>
                <TableCell>
                  <Badge variant={p.status === 'PAID' ? 'default' : p.status === 'PENDING' ? 'secondary' : 'destructive'}>
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
