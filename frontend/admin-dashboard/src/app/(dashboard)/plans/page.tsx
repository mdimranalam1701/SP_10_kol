"use client";
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";

export default function PlansPage() {
  const [plans, setPlans] = useState([
    { id: '1', name: 'Monthly Basic', price: 49.99, durationDays: 30 },
    { id: '2', name: 'Annual Pro', price: 499.99, durationDays: 365 },
  ]);

  const updatePrice = (id: string) => {
    const newPrice = prompt("Enter new price:");
    if (newPrice && !isNaN(Number(newPrice))) {
      setPlans(plans.map(p => p.id === id ? { ...p, price: Number(newPrice) } : p));
      // In production, this sends PUT /api/plans/:id
      alert("Plan price updated!");
    }
  };

  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
      <h1 className="text-4xl font-extrabold mb-8 text-white">Subscription <span className="text-gradient">Plans</span></h1>
      <Card className="glass-panel border-0 overflow-hidden">
        <CardHeader className="bg-white/5 border-b border-white/5">
          <CardTitle className="text-white">Active Plans</CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <Table>
            <TableHeader className="bg-white/5">
              <TableRow className="border-white/10 hover:bg-transparent">
                <TableHead className="text-zinc-300 font-medium">Plan Name</TableHead>
                <TableHead className="text-zinc-300 font-medium">Duration (Days)</TableHead>
                <TableHead className="text-zinc-300 font-medium">Price ($)</TableHead>
                <TableHead className="text-zinc-300 font-medium text-right pr-6">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {plans.map((p) => (
                <TableRow key={p.id} className="border-white/10 hover:bg-white/5 transition-colors">
                  <TableCell className="font-bold text-white text-lg">{p.name}</TableCell>
                  <TableCell className="text-zinc-400">{p.durationDays}</TableCell>
                  <TableCell className="text-brand-green font-semibold text-lg">${p.price.toFixed(2)}</TableCell>
                  <TableCell className="text-right pr-6">
                    <Button variant="outline" size="sm" onClick={() => updatePrice(p.id)} className="border-brand-cyan/50 text-brand-cyan hover:bg-brand-cyan hover:text-black transition-all">
                      Edit Price
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
