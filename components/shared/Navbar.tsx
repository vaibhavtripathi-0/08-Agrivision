'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useTranslation } from '@/lib/i18n/context';
import { useAuth } from '@/lib/auth/context';
import { Sprout, Globe, Menu, X, User, ChevronRight, Sparkles } from 'lucide-react';

export function Navbar() {
  const { language, setLanguage, t } = useTranslation();
  const { user, logout } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const toggleLanguage = () => {
    setLanguage(language === 'en' ? 'hi' : 'en');
  };

  return (
    <header className="sticky top-0 z-50 glass-panel border-b border-earth-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Brand Logo */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="w-11 h-11 rounded-2xl bg-gradient-to-br from-forest-800 to-forest-600 flex items-center justify-center text-harvest-300 shadow-soft group-hover:scale-105 transition-transform">
              <Sprout className="w-6 h-6" />
            </div>
            <div>
              <span className="text-2xl font-bold font-heading tracking-tight text-forest-900 flex items-center gap-1.5">
                AgriVision
                <span className="text-[10px] uppercase tracking-widest px-2 py-0.5 rounded-full bg-forest-100 text-forest-800 font-semibold border border-forest-200">
                  AI Startup
                </span>
              </span>
              <p className="text-xs text-earth-600 font-medium hidden sm:block">
                {t('common.tagline')}
              </p>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-forest-900">
            <Link href="/" className="hover:text-forest-600 transition-colors">
              Home
            </Link>
            <Link href="#features" className="hover:text-forest-600 transition-colors">
              Platform Features
            </Link>

            <Link href="/farmer/dashboard" className="hover:text-forest-600 transition-colors flex items-center gap-1">
              Farmer App
            </Link>
            <Link href="/farmer/assistant" className="hover:text-forest-600 transition-colors flex items-center gap-1 text-forest-700 font-semibold">
              <Sparkles className="w-4 h-4 text-harvest-500 fill-harvest-400" />
              KrishiMitra AI
            </Link>

            <Link href="#experts" className="hover:text-forest-600 transition-colors">
              Experts
            </Link>
          </nav>

          {/* Right Action Controls */}
          <div className="hidden md:flex items-center gap-4">
            
            {/* Language Switcher */}
            <button
              onClick={toggleLanguage}
              className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-earth-100 text-forest-900 hover:bg-earth-200 font-medium text-xs border border-earth-300 transition-all"
              title="Switch Language"
            >
              <Globe className="w-4 h-4 text-forest-700" />
              <span className="font-bold">{t('common.switchLang')}</span>
            </button>

            {user ? (
              <div className="flex items-center gap-3">
                <Link
                  href="/farmer/dashboard"
                  className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-forest-100 text-forest-900 font-semibold text-xs border border-forest-300 hover:bg-forest-200 transition-colors"
                >
                  <User className="w-4 h-4 text-forest-700" />
                  <span>{user.fullName}</span>
                </Link>
                <button
                  onClick={() => logout()}
                  className="px-3 py-2 text-xs font-semibold text-earth-700 hover:text-red-700 transition-colors"
                >
                  {t('common.logout')}
                </button>
              </div>
            ) : (
              <>
                {/* Auth Login Link */}
                <Link
                  href="/login"
                  className="flex items-center gap-2 px-4 py-2 rounded-xl text-forest-800 font-medium text-sm hover:text-forest-950 transition-colors"
                >
                  <User className="w-4 h-4" />
                  {t('common.login')}
                </Link>

                {/* Main CTA */}
                <Link
                  href="/register"
                  className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-forest-800 text-harvest-100 font-semibold text-sm hover:bg-forest-900 shadow-soft hover:shadow-elevated transition-all"
                >
                  <span>{t('common.register')}</span>
                  <ChevronRight className="w-4 h-4" />
                </Link>
              </>
            )}
          </div>

          {/* Mobile Menu Toggle */}
          <div className="flex md:hidden items-center gap-2">
            <button
              onClick={toggleLanguage}
              className="px-2.5 py-1.5 rounded-lg bg-earth-100 text-forest-900 text-xs font-bold border border-earth-300"
            >
              {t('common.switchLang')}
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-xl text-forest-900 hover:bg-earth-100"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden glass-panel border-b border-earth-300 px-6 py-6 space-y-4">
          <Link
            href="/"
            onClick={() => setMobileMenuOpen(false)}
            className="block text-base font-semibold text-forest-900"
          >
            Home
          </Link>
          <Link
            href="/farmer/dashboard"
            onClick={() => setMobileMenuOpen(false)}
            className="block text-base font-semibold text-forest-900"
          >
            Farmer Dashboard
          </Link>
          <Link
            href="/farmer/assistant"
            onClick={() => setMobileMenuOpen(false)}
            className="block text-base font-semibold text-forest-800 flex items-center gap-2"
          >
            <Sparkles className="w-4 h-4 text-harvest-500" />
            KrishiMitra AI Assistant
          </Link>
          <div className="pt-4 border-t border-earth-200 flex flex-col gap-3">
            <Link
              href="/login"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full text-center py-2.5 rounded-xl border border-forest-800 text-forest-900 font-semibold"
            >
              {t('common.login')}
            </Link>
            <Link
              href="/register"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full text-center py-2.5 rounded-xl bg-forest-800 text-harvest-100 font-semibold shadow-soft"
            >
              {t('common.register')}
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
