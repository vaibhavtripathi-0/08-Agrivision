'use client';

import React from 'react';
import Link from 'next/link';
import { useTranslation } from '@/lib/i18n/context';
import {
  Sparkles,
  CloudRain,
  Droplets,
  Bug,
  TrendingUp,
  MapPin,
  Plus,
  Scan,
  Coins,
  ArrowUpRight,
  ShieldCheck,
  Zap,
  ChevronRight
} from 'lucide-react';

export default function FarmerDashboardPage() {
  const { t } = useTranslation();

  return (
    <div className="space-y-8 max-w-7xl mx-auto">
      
      {/* 1. PERSONALIZED HEADER */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 sm:p-8 rounded-3xl border border-earth-300 shadow-soft">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-full bg-forest-100 text-forest-800 font-bold text-xs">
              Mathura District, UP
            </span>
            <span className="px-2.5 py-0.5 rounded-full bg-harvest-100 text-harvest-800 font-bold text-xs">
              LIVE RADAR ACTIVE
            </span>
          </div>
          <h1 className="text-2xl sm:text-4xl font-extrabold font-heading text-forest-950">
            {t('dashboard.greeting')}
          </h1>
          <p className="text-xs sm:text-sm text-forest-800">
            {t('dashboard.subGreeting')}
          </p>
        </div>

        <Link
          href="/farmer/assistant"
          className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-2xl bg-forest-800 text-harvest-100 font-bold text-sm hover:bg-forest-900 shadow-soft transition-all shrink-0"
        >
          <Sparkles className="w-4 h-4 text-harvest-400 fill-harvest-400" />
          <span>Ask KrishiMitra AI</span>
        </Link>
      </div>

      {/* 2. TODAY'S FARM BRIEF (HIGH PRIORITY ACTION CARDS) */}
      <div className="p-6 sm:p-8 rounded-3xl bg-forest-900 text-earth-50 border border-forest-700 shadow-elevated space-y-6">
        <div className="flex items-center justify-between border-b border-forest-800 pb-4">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-harvest-400 animate-ping"></div>
            <h2 className="text-base sm:text-lg font-bold font-heading text-earth-100 tracking-wide">
              {t('dashboard.todaysBrief')}
            </h2>
          </div>
          <span className="text-xs text-forest-300 font-medium">Updated 10 mins ago</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          
          {/* Brief Card 1: Rain */}
          <div className="p-4 rounded-2xl bg-forest-800/80 border border-forest-700 space-y-2">
            <div className="flex items-center justify-between text-xs text-harvest-300 font-semibold">
              <span className="flex items-center gap-1">
                <CloudRain className="w-4 h-4 text-harvest-400" />
                Rain Alert
              </span>
              <span>78%</span>
            </div>
            <p className="text-sm font-bold text-earth-100">{t('dashboard.rainAlert')}</p>
            <p className="text-xs text-forest-300">Expected tomorrow afternoon</p>
          </div>

          {/* Brief Card 2: Irrigation */}
          <div className="p-4 rounded-2xl bg-forest-800/80 border border-forest-700 space-y-2">
            <div className="flex items-center justify-between text-xs text-emerald-400 font-semibold">
              <span className="flex items-center gap-1">
                <Droplets className="w-4 h-4 text-emerald-400" />
                Water Action
              </span>
              <span>Skip</span>
            </div>
            <p className="text-sm font-bold text-earth-100">{t('dashboard.irrigationAdvice')}</p>
            <p className="text-xs text-forest-300">Saves ~15,000L water today</p>
          </div>

          {/* Brief Card 3: Pest */}
          <div className="p-4 rounded-2xl bg-forest-800/80 border border-forest-700 space-y-2">
            <div className="flex items-center justify-between text-xs text-amber-400 font-semibold">
              <span className="flex items-center gap-1">
                <Bug className="w-4 h-4 text-amber-400" />
                Pest Risk
              </span>
              <span>Moderate</span>
            </div>
            <p className="text-sm font-bold text-earth-100">{t('dashboard.pestRisk')}</p>
            <p className="text-xs text-forest-300">Inspect lower leaf blades</p>
          </div>

          {/* Brief Card 4: Market */}
          <div className="p-4 rounded-2xl bg-forest-800/80 border border-forest-700 space-y-2">
            <div className="flex items-center justify-between text-xs text-emerald-300 font-semibold">
              <span className="flex items-center gap-1">
                <TrendingUp className="w-4 h-4 text-emerald-300" />
                Mandi Surge
              </span>
              <span>+4.2%</span>
            </div>
            <p className="text-sm font-bold text-earth-100">{t('dashboard.mandiAlert')}</p>
            <p className="text-xs text-forest-300">Net gain after transport</p>
          </div>

        </div>
      </div>

      {/* 3. FARM HEALTH METRICS */}
      <div className="space-y-4">
        <h2 className="text-xl font-bold font-heading text-forest-950">
          Farm Health Index (Mathura Field #1)
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          
          {/* Health Box 1 */}
          <div className="p-6 rounded-3xl bg-white border border-earth-300 shadow-soft space-y-3">
            <div className="flex items-center justify-between text-xs text-earth-700 font-semibold">
              <span>{t('dashboard.cropHealth')}</span>
              <span className="text-forest-800 font-extrabold">82%</span>
            </div>
            <div className="w-full bg-earth-200 rounded-full h-2.5 overflow-hidden">
              <div className="bg-forest-600 h-2.5 rounded-full" style={{ width: '82%' }}></div>
            </div>
            <p className="text-xs text-forest-800">Wheat crop sowing age: 34 Days (Good Vigor)</p>
          </div>

          {/* Health Box 2 */}
          <div className="p-6 rounded-3xl bg-white border border-earth-300 shadow-soft space-y-3">
            <div className="flex items-center justify-between text-xs text-earth-700 font-semibold">
              <span>{t('dashboard.soilHealth')}</span>
              <span className="text-harvest-700 font-extrabold">71%</span>
            </div>
            <div className="w-full bg-earth-200 rounded-full h-2.5 overflow-hidden">
              <div className="bg-harvest-500 h-2.5 rounded-full" style={{ width: '71%' }}></div>
            </div>
            <p className="text-xs text-forest-800">pH 6.8 • N 140ppm • P 35ppm • K 180ppm</p>
          </div>

          {/* Health Box 3 */}
          <div className="p-6 rounded-3xl bg-white border border-earth-300 shadow-soft space-y-3">
            <div className="flex items-center justify-between text-xs text-earth-700 font-semibold">
              <span>{t('dashboard.waterStatus')}</span>
              <span className="text-blue-700 font-extrabold">90%</span>
            </div>
            <div className="w-full bg-earth-200 rounded-full h-2.5 overflow-hidden">
              <div className="bg-blue-600 h-2.5 rounded-full" style={{ width: '90%' }}></div>
            </div>
            <p className="text-xs text-forest-800">Soil moisture adequate for 3+ days</p>
          </div>

          {/* Health Box 4 */}
          <div className="p-6 rounded-3xl bg-white border border-earth-300 shadow-soft space-y-3">
            <div className="flex items-center justify-between text-xs text-earth-700 font-semibold">
              <span>{t('dashboard.riskLevel')}</span>
              <span className="text-emerald-700 font-extrabold">Low</span>
            </div>
            <div className="w-full bg-earth-200 rounded-full h-2.5 overflow-hidden">
              <div className="bg-emerald-500 h-2.5 rounded-full" style={{ width: '20%' }}></div>
            </div>
            <p className="text-xs text-forest-800">No immediate frost or flood warning</p>
          </div>

        </div>
      </div>

      {/* 4. QUICK ACTIONS & FIELD SUMMARY */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Quick Action Grid */}
        <div className="lg:col-span-7 space-y-4">
          <h2 className="text-xl font-bold font-heading text-forest-950">Quick Actions</h2>
          
          <div className="grid grid-cols-2 gap-4">
            <Link
              href="/farmer/disease"
              className="p-5 rounded-3xl bg-white border border-earth-300 hover:border-forest-600 shadow-soft hover:shadow-elevated transition-all space-y-3 group"
            >
              <div className="w-10 h-10 rounded-2xl bg-forest-100 text-forest-800 flex items-center justify-center group-hover:scale-110 transition-transform">
                <Scan className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-bold text-sm text-forest-950 font-heading">Disease Scan</h3>
                <p className="text-xs text-earth-700">Take leaf photo for instant AI analysis</p>
              </div>
            </Link>

            <Link
              href="/farmer/markets"
              className="p-5 rounded-3xl bg-white border border-earth-300 hover:border-forest-600 shadow-soft hover:shadow-elevated transition-all space-y-3 group"
            >
              <div className="w-10 h-10 rounded-2xl bg-harvest-100 text-harvest-800 flex items-center justify-center group-hover:scale-110 transition-transform">
                <Coins className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-bold text-sm text-forest-950 font-heading">Mandi Radar</h3>
                <p className="text-xs text-earth-700">Compare Agra, Mathura & Aligarh rates</p>
              </div>
            </Link>
          </div>
        </div>

        {/* My Fields Card */}
        <div className="lg:col-span-5 space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold font-heading text-forest-950">My Fields</h2>
            <button className="text-xs font-bold text-forest-800 hover:underline flex items-center gap-1">
              <Plus className="w-4 h-4" /> Add Field
            </button>
          </div>

          <div className="p-6 rounded-3xl bg-white border border-earth-300 shadow-soft space-y-4">
            <div className="flex items-center justify-between border-b border-earth-200 pb-3">
              <div>
                <h3 className="font-bold text-base font-heading text-forest-950">Field #1 - Wheat</h3>
                <p className="text-xs text-earth-700">2.0 Acres • Loamy Soil • Raya, Mathura</p>
              </div>
              <span className="px-2.5 py-1 rounded-full bg-forest-100 text-forest-800 text-xs font-bold">
                Growing
              </span>
            </div>

            <div className="text-xs text-forest-900 space-y-1">
              <p><span className="font-semibold">Sowing Date:</span> 10 Nov 2025</p>
              <p><span className="font-semibold">Expected Harvest:</span> 25 Mar 2026</p>
              <p><span className="font-semibold">Estimated Yield:</span> 2.8 - 3.2 Tonnes/Acre</p>
            </div>
          </div>
        </div>

      </div>

    </div>
  );
}
