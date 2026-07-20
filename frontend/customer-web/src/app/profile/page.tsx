"use client";
import { useState } from 'react';

export default function CustomerProfilePage() {
  const [loading, setLoading] = useState(false);
  
  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    // In production, uses FormData and POSTs to /api/profile
    setTimeout(() => {
      alert("Profile updated successfully!");
      setLoading(false);
    }, 1000);
  };

  return (
    <div className="max-w-2xl mx-auto p-8">
      <h1 className="text-3xl font-bold mb-6">My Profile</h1>
      <div className="bg-white rounded-xl shadow border p-6">
        <form onSubmit={handleUpdate} className="flex flex-col gap-5">
          <div>
            <label className="block text-sm font-medium mb-1 text-slate-700">Profile Picture</label>
            <input type="file" accept="image/*" className="border p-2 w-full rounded-md text-slate-600" />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1 text-slate-700">First Name</label>
              <input type="text" defaultValue="John" className="border p-2 w-full rounded-md" />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1 text-slate-700">Last Name</label>
              <input type="text" defaultValue="Doe" className="border p-2 w-full rounded-md" />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium mb-1 text-slate-700">Email Address</label>
            <input type="email" defaultValue="john@example.com" className="border p-2 w-full rounded-md" />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1 text-slate-700">Phone Number</label>
            <input type="tel" defaultValue="+1987654321" className="border p-2 w-full rounded-md" />
          </div>
          <div className="border-t pt-4 mt-2">
            <label className="block text-sm font-medium mb-1 text-slate-700">Change Password</label>
            <input type="password" placeholder="Enter new password" className="border p-2 w-full rounded-md" />
          </div>
          <button type="submit" disabled={loading} className="mt-4 bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-2 px-4 rounded-md transition-colors">
            {loading ? "Saving Changes..." : "Save Profile Settings"}
          </button>
        </form>
      </div>
    </div>
  );
}
