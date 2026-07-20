"use client";
import React, { useState, useEffect } from 'react';

export default function CustomersPage() {
  const [customers, setCustomers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  // Modal states
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [currentId, setCurrentId] = useState<string | null>(null);

  // Form State
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    password: '',
    planId: '',
    paymentStatus: 'PAID'
  });

  const fetchCustomers = async (pageNumber: number) => {
    setLoading(true);
    try {
      const res = await fetch(`http://localhost:5000/api/customers?page=${pageNumber}&limit=10`);
      if (res.ok) {
        const data = await res.json();
        setCustomers(data.customers || []);
        setTotalPages(data.pagination?.totalPages || 1);
        setPage(data.pagination?.page || 1);
      }
    } catch (error) {
      console.error("Error fetching customers. Backend might not be running.", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCustomers(page);
  }, [page]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const url = isEditMode 
        ? `http://localhost:5000/api/customers/${currentId}`
        : 'http://localhost:5000/api/customers';
      const method = isEditMode ? 'PUT' : 'POST';

      await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      setIsModalOpen(false);
      fetchCustomers(page);
    } catch (error) {
      console.error(error);
    }
  };

  const handleDelete = async (id: string) => {
    if (confirm('Are you sure you want to delete this customer?')) {
      try {
        await fetch(`http://localhost:5000/api/customers/${id}`, {
          method: 'DELETE'
        });
        fetchCustomers(page);
      } catch (error) {
        console.error(error);
      }
    }
  };

  const openAddModal = () => {
    setIsEditMode(false);
    setFormData({ firstName: '', lastName: '', email: '', phone: '', password: '', planId: '', paymentStatus: 'PAID' });
    setIsModalOpen(true);
  };

  const openEditModal = (customer: any) => {
    setIsEditMode(true);
    setCurrentId(customer.id);
    setFormData({
      firstName: customer.firstName,
      lastName: customer.lastName,
      email: customer.email,
      phone: customer.phone || '',
      password: '', // blank for security, only updated if typed
      planId: '', // Usually editing plans requires a different flow, but kept here for simplicity
      paymentStatus: 'PAID'
    });
    setIsModalOpen(true);
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-brand-cyan to-brand-green">Customers CRM</h1>
          <p className="text-zinc-400 mt-2">Manage your gym members, plans, and payments.</p>
        </div>
        <button onClick={openAddModal} className="bg-brand-cyan hover:bg-brand-cyan/80 text-black font-bold py-3 px-6 rounded-xl transition-all shadow-lg shadow-brand-cyan/20">
          + Add Customer
        </button>
      </div>

      {/* Customer Table */}
      <div className="glass-panel rounded-2xl overflow-hidden border border-white/5">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-white/5 border-b border-white/5">
                <th className="p-4 text-zinc-400 font-medium">Name</th>
                <th className="p-4 text-zinc-400 font-medium">Contact</th>
                <th className="p-4 text-zinc-400 font-medium">Plan & Payment</th>
                <th className="p-4 text-zinc-400 font-medium">Joined</th>
                <th className="p-4 text-right text-zinc-400 font-medium">Actions</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr><td colSpan={5} className="p-8 text-center text-zinc-500">Loading customers...</td></tr>
              ) : customers.length === 0 ? (
                <tr><td colSpan={5} className="p-8 text-center text-zinc-500">No customers found.</td></tr>
              ) : (
                customers.map(c => (
                  <tr key={c.id} className="border-b border-white/5 hover:bg-white/5 transition-colors">
                    <td className="p-4">
                      <p className="text-white font-bold">{c.firstName} {c.lastName}</p>
                    </td>
                    <td className="p-4">
                      <p className="text-zinc-300 text-sm">{c.email}</p>
                      <p className="text-zinc-500 text-sm">{c.phone}</p>
                    </td>
                    <td className="p-4">
                      {c.memberships && c.memberships.length > 0 ? (
                        <>
                          <p className="text-brand-cyan text-sm font-bold">{c.memberships[0].plan?.name || 'Custom Plan'}</p>
                          <span className="inline-block px-2 py-1 mt-1 rounded text-xs font-bold bg-brand-green/20 text-brand-green">PAID</span>
                        </>
                      ) : (
                        <span className="text-zinc-500 text-sm italic">No active plan</span>
                      )}
                    </td>
                    <td className="p-4 text-zinc-400 text-sm">
                      {new Date(c.createdAt).toLocaleDateString()}
                    </td>
                    <td className="p-4 text-right space-x-2">
                      <button onClick={() => openEditModal(c)} className="text-brand-cyan hover:text-white font-medium text-sm">Edit</button>
                      <button onClick={() => handleDelete(c.id)} className="text-red-400 hover:text-red-300 font-medium text-sm">Delete</button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
        
        {/* Pagination Controls */}
        <div className="p-4 border-t border-white/5 flex justify-between items-center bg-black/20">
          <button 
            disabled={page === 1} 
            onClick={() => setPage(page - 1)}
            className="px-4 py-2 rounded-lg bg-white/5 text-white disabled:opacity-30 hover:bg-white/10"
          >
            Previous
          </button>
          <span className="text-zinc-400 text-sm">Page {page} of {totalPages}</span>
          <button 
            disabled={page === totalPages} 
            onClick={() => setPage(page + 1)}
            className="px-4 py-2 rounded-lg bg-white/5 text-white disabled:opacity-30 hover:bg-white/10"
          >
            Next
          </button>
        </div>
      </div>

      {/* Modal Overlay */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
          <div className="glass-panel w-full max-w-xl rounded-2xl border border-white/10 overflow-hidden shadow-2xl animate-in zoom-in-95 duration-200">
            <div className="p-6 border-b border-white/10 flex justify-between items-center">
              <h2 className="text-2xl font-bold text-white">{isEditMode ? 'Edit Customer' : 'Add New Customer'}</h2>
              <button onClick={() => setIsModalOpen(false)} className="text-zinc-400 hover:text-white">✕</button>
            </div>
            
            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm text-zinc-400 mb-1">First Name</label>
                  <input required value={formData.firstName} onChange={e => setFormData({...formData, firstName: e.target.value})} className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-2.5 text-white focus:outline-none focus:border-brand-cyan" />
                </div>
                <div>
                  <label className="block text-sm text-zinc-400 mb-1">Last Name</label>
                  <input required value={formData.lastName} onChange={e => setFormData({...formData, lastName: e.target.value})} className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-2.5 text-white focus:outline-none focus:border-brand-cyan" />
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm text-zinc-400 mb-1">Email</label>
                  <input required type="email" value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-2.5 text-white focus:outline-none focus:border-brand-cyan" />
                </div>
                <div>
                  <label className="block text-sm text-zinc-400 mb-1">Phone Number</label>
                  <input value={formData.phone} onChange={e => setFormData({...formData, phone: e.target.value})} className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-2.5 text-white focus:outline-none focus:border-brand-cyan" />
                </div>
              </div>

              <div>
                <label className="block text-sm text-zinc-400 mb-1">
                  {isEditMode ? 'New Password (leave blank to keep current)' : 'Password'}
                </label>
                <input required={!isEditMode} type="password" value={formData.password} onChange={e => setFormData({...formData, password: e.target.value})} className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-2.5 text-white focus:outline-none focus:border-brand-cyan" />
              </div>

              {!isEditMode && (
                <div className="p-4 border border-brand-cyan/20 rounded-xl bg-brand-cyan/5 space-y-4">
                  <h3 className="text-brand-cyan font-bold mb-2">Initial Assignment</h3>
                  <div>
                    <label className="block text-sm text-zinc-400 mb-1">Assign Plan (Optional ID)</label>
                    <input placeholder="Enter Plan UUID" value={formData.planId} onChange={e => setFormData({...formData, planId: e.target.value})} className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-2.5 text-white focus:outline-none focus:border-brand-cyan" />
                  </div>
                  <div>
                    <label className="block text-sm text-zinc-400 mb-1">Payment Status</label>
                    <select value={formData.paymentStatus} onChange={e => setFormData({...formData, paymentStatus: e.target.value})} className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-2.5 text-white focus:outline-none focus:border-brand-cyan">
                      <option value="PAID">Paid</option>
                      <option value="PENDING">Pending</option>
                    </select>
                  </div>
                </div>
              )}

              <div className="pt-4 flex justify-end gap-3">
                <button type="button" onClick={() => setIsModalOpen(false)} className="px-5 py-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-white font-medium">Cancel</button>
                <button type="submit" className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-brand-cyan to-brand-green text-black font-bold shadow-lg">
                  {isEditMode ? 'Save Changes' : 'Create Customer'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
