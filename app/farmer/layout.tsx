'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useTranslation } from '@/lib/i18n/context';
import { useAuth } from '@/lib/auth/context';
import {
  Sprout,
  LayoutDashboard,
  Sparkles,
  Scan,
  CloudRain,
  Coins,
  MapPin,
  Globe,
  LogOut,
  Menu,
  X
} from 'lucide-react';

export default function FarmerLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const { language, setLanguage, t } = useTranslation();
  const { user, logout } = useAuth();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const toggleLanguage = () => {
    setLanguage(language === 'en' ? 'hi' : 'en');
  };

  const navItems = [
    { label: t('common.dashboard'), href: '/farmer/dashboard', icon: LayoutDashboard },
    { label: 'KrishiMitra AI', href: '/farmer/assistant', icon: Sparkles, badge: 'AI' },
    { label: t('common.disease'), href: '/farmer/disease', icon: Scan },
    { label: t('common.weather'), href: '/farmer/weather', icon: CloudRain },
    { label: t('common.market'), href: '/farmer/markets', icon: Coins },
  ];

  return (
    <div className="min-h-screen bg-earth-50 text-forest-950 flex flex-col md:flex-row">
      
      {/* Sidebar (Desktop) */}
      <aside className="hidden md:flex flex-col w-64 bg-forest-900 text-earth-100 border-r border-forest-800 p-6 shrink-0 justify-between min-h-screen sticky top-0">
        <div className="space-y-8">
          
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-forest-800 flex items-center justify-center text-harvest-300">
              <Sprout className="w-5 h-5" />
            </div>
            <div>
              <span className="text-xl font-bold font-heading text-earth-100">AgriVision</span>
              <p className="text-[10px] text-harvest-300 font-semibold uppercase tracking-wider">Farmer Portal</p>
            </div>
          </Link>

          {/* Navigation Links */}
          <nav className="space-y-2">
            {navItems.map((item) => {
              const active = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`flex items-center justify-between px-4 py-3 rounded-2xl text-sm font-semibold transition-all ${
                    active
                      ? 'bg-harvest-500 text-forest-950 shadow-soft font-bold'
                      : 'text-forest-200 hover:bg-forest-800 hover:text-earth-100'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <item.icon className={`w-5 h-5 ${active ? 'text-forest-950' : 'text-harvest-400'}`} />
                    <span>{item.label}</span>
                  </div>
                  {item.badge && (
                    <span className={`text-[10px] px-2 py-0.5 rounded-full font-extrabold ${active ? 'bg-forest-950 text-harvest-300' : 'bg-harvest-500 text-forest-950'}`}>
                      {item.badge}
                    </span>
                  )}
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Sidebar Footer Controls */}
        <div className="space-y-4 pt-6 border-t border-forest-800">
          {user && (
            <div className="px-4 py-3 rounded-2xl bg-forest-800/60 border border-forest-700/50 space-y-1">
              <div className="flex items-center justify-between">
                <span className="text-[10px] uppercase font-bold text-harvest-400 tracking-wider">Logged In As</span>
                <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
              </div>
              <p className="text-sm font-extrabold text-earth-100 truncate">{user.fullName}</p>
              <p className="text-[11px] text-forest-300 truncate">{user.district || 'Mathura'}, {user.state || 'UP'}</p>
            </div>
          )}

          <button
            onClick={toggleLanguage}
            className="w-full flex items-center justify-between px-4 py-2.5 rounded-xl bg-forest-800 text-xs font-bold text-earth-100 hover:bg-forest-700 transition-colors"
          >
            <div className="flex items-center gap-2">
              <Globe className="w-4 h-4 text-harvest-400" />
              <span>Language / भाषा</span>
            </div>
            <span className="text-harvest-300">{t('common.switchLang')}</span>
          </button>

          <button
            onClick={() => logout()}
            className="w-full flex items-center gap-3 px-4 py-2.5 rounded-xl border border-forest-700 text-xs font-semibold text-forest-200 hover:bg-forest-800 hover:text-earth-100 transition-colors"
          >
            <LogOut className="w-4 h-4 text-harvest-400" />
            <span>{t('common.logout')}</span>
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0">
        
        {/* Mobile Topbar */}
        <header className="md:hidden glass-panel border-b border-earth-300 px-4 py-3 flex items-center justify-between sticky top-0 z-40">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-forest-800 flex items-center justify-center text-harvest-300">
              <Sprout className="w-4 h-4" />
            </div>
            <span className="font-heading font-bold text-base text-forest-950">AgriVision</span>
          </Link>

          <div className="flex items-center gap-2">
            <button
              onClick={toggleLanguage}
              className="px-2.5 py-1 rounded-lg bg-earth-200 text-forest-950 font-bold text-xs"
            >
              {t('common.switchLang')}
            </button>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 p-4 sm:p-8 pb-24 md:pb-8">
          {children}
        </main>

        {/* Mobile Bottom Navigation Bar (Low connectivity & Rural optimized) */}
        <nav className="md:hidden fixed bottom-0 left-0 right-0 glass-panel border-t border-earth-300 z-50 px-2 py-2 flex justify-around items-center">
          {navItems.map((item) => {
            const active = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex flex-col items-center gap-1 p-2 rounded-xl text-[11px] font-semibold transition-all ${
                  active ? 'text-forest-900 font-extrabold' : 'text-earth-700'
                }`}
              >
                <item.icon className={`w-5 h-5 ${active ? 'text-forest-800 scale-110' : 'text-earth-600'}`} />
                <span>{item.label}</span>
              </Link>
            );
          })}
        </nav>

      </div>
    </div>
  );
}
