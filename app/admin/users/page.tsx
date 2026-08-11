'use client';

import React from 'react';
import { Users, ShieldCheck, UserCheck, Search, Filter } from 'lucide-react';

export default function AdminUsersPage() {
  const users = [
    { id: 'u1', name: 'Vaibhav Sharma', role: 'Farmer', email: 'vaibhav@farmer.in', location: 'Mathura, UP', registered: '10 Nov 2025' },
    { id: 'u2', name: 'Dr. Sunita Verma', role: 'Expert', email: 'sunita@kvk.gov.in', location: 'IARI New Delhi', registered: '02 Aug 2025' },
    { id: 'u3', name: 'Dr. Rajesh Sharma', role: 'Expert', email: 'rajesh@kvkmathura.in', location: 'Mathura, UP', registered: '15 Aug 2025' },
    { id: 'u4', name: 'Ramesh Singh', role: 'Farmer', email: 'ramesh@farmer.in', location: 'Agra, UP', registered: '01 Dec 2025' },
  ];

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      
      <div className="bg-white p-6 sm:p-8 rounded-3xl border border-earth-300 shadow-soft space-y-4">
        <h1 className="text-2xl sm:text-3xl font-extrabold font-heading text-forest-950">
          User & Access Control
        </h1>
        <p className="text-xs sm:text-sm text-forest-800">
          Manage registered Farmers, verified Agronomy Experts, and Platform Administrators.
        </p>

        <div className="relative">
          <Search className="w-4 h-4 text-earth-600 absolute left-3 top-3" />
          <input
            type="text"
            placeholder="Search by user name, role, email, or district..."
            className="w-full pl-10 pr-4 py-2 rounded-xl border border-earth-300 text-xs bg-earth-50 text-forest-950"
          />
        </div>
      </div>

      <div className="bg-white rounded-3xl border border-earth-300 shadow-soft overflow-hidden">
        <table className="w-full text-left text-xs">
          <thead className="bg-earth-100 text-forest-900 font-bold border-b border-earth-200">
            <tr>
              <th className="p-4">User Name</th>
              <th className="p-4">Role</th>
              <th className="p-4">Email</th>
              <th className="p-4">Location</th>
              <th className="p-4">Registered Date</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-earth-200 text-forest-950">
            {users.map((user) => (
              <tr key={user.id} className="hover:bg-earth-50">
                <td className="p-4 font-bold">{user.name}</td>
                <td className="p-4">
                  <span className={`px-2.5 py-0.5 rounded-full text-[11px] font-bold ${
                    user.role === 'Expert'
                      ? 'bg-harvest-100 text-harvest-800'
                      : 'bg-forest-100 text-forest-800'
                  }`}>
                    {user.role}
                  </span>
                </td>
                <td className="p-4 text-earth-700">{user.email}</td>
                <td className="p-4">{user.location}</td>
                <td className="p-4 text-earth-700">{user.registered}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

    </div>
  );
}
