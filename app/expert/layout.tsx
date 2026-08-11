'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Sprout, FileCheck, Stethoscope, BookOpen, LogOut, UserCheck } from 'lucide-react';

export default function ExpertLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  return (
    <div className="min-h-screen bg-earth-50 text-forest-950 flex flex-col md:flex-row">
      <aside className="w-full md:w-64 bg-forest-950 text-earth-100 p-6 shrink-0 border-r border-forest-800 flex flex-col justify-between">
        <div className="space-y-8">
          <Link href="/" className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-harvest-500 text-forest-950 flex items-center justify-center font-bold">
              <Stethoscope className="w-5 h-5" />
            </div>
            <div>
              <span className="text-xl font-bold font-heading text-earth-100">AgriVision</span>
              <p className="text-[10px] text-harvest-300 font-semibold uppercase tracking-wider">Expert Advisory Portal</p>
            </div>
          </Link>

          <nav className="space-y-2">
            <Link
              href="/expert/dashboard"
              className={`flex items-center gap-3 px-4 py-3 rounded-2xl text-sm font-semibold transition-all ${
                pathname === '/expert/dashboard' ? 'bg-harvest-500 text-forest-950 font-bold' : 'text-forest-200 hover:bg-forest-900'
              }`}
            >
              <FileCheck className="w-5 h-5 text-harvest-400" />
              <span>Expert Dashboard</span>
            </Link>

            <Link
              href="/expert/cases"
              className={`flex items-center gap-3 px-4 py-3 rounded-2xl text-sm font-semibold transition-all ${
                pathname === '/expert/cases' ? 'bg-harvest-500 text-forest-950 font-bold' : 'text-forest-200 hover:bg-forest-900'
              }`}
            >
              <Stethoscope className="w-5 h-5 text-harvest-400" />
              <span>Review Disease Cases</span>
            </Link>
          </nav>
        </div>

        <div className="pt-6 border-t border-forest-900 space-y-2">
          <div className="flex items-center gap-3 text-xs text-forest-300">
            <UserCheck className="w-4 h-4 text-emerald-400" />
            <span>Verified: Dr. Sunita Verma</span>
          </div>
          <Link href="/" className="block text-xs font-semibold text-earth-300 hover:underline pt-2">
            ← Return to Landing Page
          </Link>
        </div>
      </aside>

      <main className="flex-1 p-6 sm:p-8 min-w-0">
        {children}
      </main>
    </div>
  );
}
