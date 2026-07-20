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
    <div>
      <h1 className="text-3xl font-bold mb-6">CRM: Subscription Plans</h1>
      <Card>
        <CardHeader>
          <CardTitle>Active Plans</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Plan Name</TableHead>
                <TableHead>Duration (Days)</TableHead>
                <TableHead>Price ($)</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {plans.map((p) => (
                <TableRow key={p.id}>
                  <TableCell className="font-medium">{p.name}</TableCell>
                  <TableCell>{p.durationDays}</TableCell>
                  <TableCell>${p.price.toFixed(2)}</TableCell>
                  <TableCell>
                    <Button variant="outline" size="sm" onClick={() => updatePrice(p.id)}>Edit Price</Button>
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
