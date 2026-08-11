'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useTranslation } from '@/lib/i18n/context';
import { createClient } from '@/lib/supabase/client';
import { useAuth } from '@/lib/auth/context';
import { Sprout, Mail, Lock, ArrowRight, AlertCircle } from 'lucide-react';

export default function LoginPage() {
  const { t } = useTranslation();
  const router = useRouter();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const { setUser } = useAuth();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg('');

    try {
      const supabase = createClient();
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        if (email && password) {
          // Extract name from email if demo login
          const derivedName = email.split('@')[0].replace(/[._-]/g, ' ');
          const formattedName = derivedName.charAt(0).toUpperCase() + derivedName.slice(1);
          setUser({
            fullName: formattedName || 'Farmer User',
            email: email,
            role: 'farmer',
            district: 'Mathura',
            state: 'Uttar Pradesh'
          });
          router.push('/farmer/dashboard');
          return;
        }
        setErrorMsg(error.message);
      } else if (data.user) {
        const meta = data.user.user_metadata || {};
        setUser({
          id: data.user.id,
          fullName: meta.full_name || data.user.email?.split('@')[0] || 'Farmer User',
          email: data.user.email || email,
          phone: meta.phone,
          role: meta.role || 'farmer',
          state: meta.state || 'Uttar Pradesh',
          district: meta.district || 'Mathura',
          villageCity: meta.village_city || 'Raya Village',
        });
        router.push('/farmer/dashboard');
      }
    } catch (err: any) {
      const derivedName = email.split('@')[0].replace(/[._-]/g, ' ');
      const formattedName = derivedName.charAt(0).toUpperCase() + derivedName.slice(1);
      setUser({
        fullName: formattedName || 'Farmer User',
        email: email,
        role: 'farmer',
        district: 'Mathura',
        state: 'Uttar Pradesh'
      });
      router.push('/farmer/dashboard');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-earth-100 flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-white rounded-3xl p-8 border border-earth-300 shadow-elevated space-y-6">
        
        {/* Header */}
        <div className="text-center space-y-2">
          <Link href="/" className="inline-flex items-center gap-2 mb-2">
            <div className="w-10 h-10 rounded-2xl bg-forest-800 flex items-center justify-center text-harvest-300">
              <Sprout className="w-5 h-5" />
            </div>
            <span className="text-xl font-bold font-heading text-forest-950">AgriVision</span>
          </Link>
          <h1 className="text-2xl font-extrabold font-heading text-forest-950">Welcome Back</h1>
          <p className="text-xs text-earth-700">Access your farm intelligence dashboard</p>
        </div>

        {/* Demo Notification Banner */}
        <div className="p-3 rounded-xl bg-forest-50 border border-forest-200 text-xs text-forest-800 font-medium text-center">
          💡 Demo Mode Active: You can click "Sign In" with any test credentials to enter the Farmer Dashboard.
        </div>

        {errorMsg && (
          <div className="p-3 rounded-xl bg-red-50 border border-red-200 text-xs text-red-700 flex items-center gap-2">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>{errorMsg}</span>
          </div>
        )}

        {/* Login Form */}
        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-forest-900 mb-1">Email Address</label>
            <div className="relative">
              <Mail className="w-4 h-4 text-earth-600 absolute left-3 top-3.5" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="farmer@agrivision.in"
                className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-earth-300 text-sm focus:outline-none focus:ring-2 focus:ring-forest-600 bg-earth-50/50 text-forest-950"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-forest-900 mb-1">Password</label>
            <div className="relative">
              <Lock className="w-4 h-4 text-earth-600 absolute left-3 top-3.5" />
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-earth-300 text-sm focus:outline-none focus:ring-2 focus:ring-forest-600 bg-earth-50/50 text-forest-950"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 rounded-xl bg-forest-800 text-harvest-100 font-bold text-sm hover:bg-forest-900 shadow-soft transition-all flex items-center justify-center gap-2"
          >
            <span>{loading ? 'Authenticating...' : 'Sign In to Farm'}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>

        <div className="pt-4 border-t border-earth-200 text-center text-xs text-earth-700">
          New to AgriVision?{' '}
          <Link href="/register" className="font-bold text-forest-800 hover:underline">
            Register New Farm Profile
          </Link>
        </div>

      </div>
    </div>
  );
}
