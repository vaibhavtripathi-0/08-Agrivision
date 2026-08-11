'use client';

import React from 'react';
import { ShieldCheck, Users, MapPin, Scan, Coins, Database, Activity } from 'lucide-react';

export default function AdminDashboardPage() {
  return (
    <div className="max-w-6xl mx-auto space-y-8">
      
      {/* Header */}
      <div className="bg-white p-6 sm:p-8 rounded-3xl border border-earth-300 shadow-soft space-y-2">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-forest-100 text-forest-800 font-bold text-xs">
          <ShieldCheck className="w-4 h-4 text-forest-700" />
          AgriVision Control Center
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold font-heading text-forest-950">
          System Overview & Analytics
        </h1>
        <p className="text-xs sm:text-sm text-forest-800">
          Monitor user growth, disease scan volumes, mandi price synchronizations, and system health.
        </p>
      </div>

      {/* Metrics Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-6 rounded-3xl bg-white border border-earth-300 shadow-soft space-y-1">
          <p className="text-xs text-earth-700 font-semibold">Total Farmers Registered</p>
          <p className="text-3xl font-extrabold font-heading text-forest-900">12,480</p>
          <p className="text-[11px] text-emerald-600 font-bold">+18.4% this month</p>
        </div>

        <div className="p-6 rounded-3xl bg-white border border-earth-300 shadow-soft space-y-1">
          <p className="text-xs text-earth-700 font-semibold">Active Farmland (Acres)</p>
          <p className="text-3xl font-extrabold font-heading text-forest-900">28,950</p>
          <p className="text-[11px] text-forest-700 font-semibold">22 UP & MP Districts</p>
        </div>

        <div className="p-6 rounded-3xl bg-white border border-earth-300 shadow-soft space-y-1">
          <p className="text-xs text-earth-700 font-semibold">AI Disease Scans Run</p>
          <p className="text-3xl font-extrabold font-heading text-harvest-600">48,210</p>
          <p className="text-[11px] text-harvest-700 font-bold">94.2% AI Accuracy</p>
        </div>

        <div className="p-6 rounded-3xl bg-white border border-earth-300 shadow-soft space-y-1">
          <p className="text-xs text-earth-700 font-semibold">Mandi API Health</p>
          <p className="text-3xl font-extrabold font-heading text-emerald-600">ONLINE</p>
          <p className="text-[11px] text-emerald-700 font-semibold">22 Mandi Sync Feeds</p>
        </div>
      </div>

      {/* Recent System Activity Log */}
      <div className="p-6 rounded-3xl bg-forest-900 text-earth-50 border border-forest-700 shadow-elevated space-y-4">
        <div className="flex justify-between items-center border-b border-forest-800 pb-3">
          <h2 className="text-lg font-bold font-heading text-earth-100 flex items-center gap-2">
            <Activity className="w-5 h-5 text-harvest-400" />
            Live Platform Audit Stream
          </h2>
          <span className="text-xs text-forest-300">Supabase PostgreSQL Logs</span>
        </div>

        <div className="space-y-2 text-xs">
          <div className="p-3 rounded-xl bg-forest-800/80 flex justify-between">
            <span className="text-earth-100">Farmer "Vaibhav Sharma" created new farm plot in Mathura (2.0 Acres).</span>
            <span className="text-forest-400">12 mins ago</span>
          </div>
          <div className="p-3 rounded-xl bg-forest-800/80 flex justify-between">
            <span className="text-earth-100">AI Scanner identified Yellow Rust with 91.4% confidence.</span>
            <span className="text-forest-400">24 mins ago</span>
          </div>
          <div className="p-3 rounded-xl bg-forest-800/80 flex justify-between">
            <span className="text-earth-100">Dr. Sunita Verma resolved Case #1084 and issued prescription.</span>
            <span className="text-forest-400">1 hr ago</span>
          </div>
        </div>
      </div>

    </div>
  );
}
