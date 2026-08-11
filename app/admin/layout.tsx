'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ShieldCheck, Users, BarChart3, Database, LogOut, Settings } from 'lucide-react';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  return (
    <div className="min-h-screen bg-earth-50 text-forest-950 flex flex-col md:flex-row">
      <aside className="w-full md:w-64 bg-slateDark-900 text-earth-100 p-6 shrink-0 border-r border-slateDark-800 flex flex-col justify-between">
        <div className="space-y-8">
          <Link href="/" className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-forest-700 text-harvest-300 flex items-center justify-center font-bold">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <span className="text-xl font-bold font-heading text-earth-100">AgriVision</span>
              <p className="text-[10px] text-harvest-400 font-semibold uppercase tracking-wider">Super Admin Console</p>
            </div>
          </Link>

          <nav className="space-y-2">
            <Link
              href="/admin/dashboard"
              className={`flex items-center gap-3 px-4 py-3 rounded-2xl text-sm font-semibold transition-all ${
                pathname === '/admin/dashboard' ? 'bg-forest-800 text-harvest-300 font-bold' : 'text-earth-300 hover:bg-slateDark-800'
              }`}
            >
              <BarChart3 className="w-5 h-5 text-harvest-400" />
              <span>Admin Overview</span>
            </Link>

            <Link
              href="/admin/users"
              className={`flex items-center gap-3 px-4 py-3 rounded-2xl text-sm font-semibold transition-all ${
                pathname === '/admin/users' ? 'bg-forest-800 text-harvest-300 font-bold' : 'text-earth-300 hover:bg-slateDark-800'
              }`}
            >
              <Users className="w-5 h-5 text-harvest-400" />
              <span>User & Role Control</span>
            </Link>
          </nav>
        </div>

        <div className="pt-6 border-t border-slateDark-800">
          <Link href="/" className="block text-xs font-semibold text-earth-400 hover:underline">
            ← Return to Main Platform
          </Link>
        </div>
      </aside>

      <main className="flex-1 p-6 sm:p-8 min-w-0">
        {children}
      </main>
    </div>
  );
}
