'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { createClient } from '@/lib/supabase/client';
import { useAuth } from '@/lib/auth/context';
import { Sprout, User, Mail, Phone, Lock, MapPin, Globe, ArrowRight } from 'lucide-react';

export default function RegisterPage() {
  const router = useRouter();

  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    password: '',
    role: 'farmer',
    preferredLanguage: 'en',
    state: 'Uttar Pradesh',
    district: 'Mathura',
    villageCity: 'Raya Village',
  });

  const [loading, setLoading] = useState(false);

  const { setUser } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const newProfile = {
      fullName: formData.fullName || 'Farmer User',
      email: formData.email,
      phone: formData.phone,
      role: formData.role,
      state: formData.state,
      district: formData.district,
      villageCity: formData.villageCity,
    };

    try {
      const supabase = createClient();
      const { data, error } = await supabase.auth.signUp({
        email: formData.email,
        password: formData.password,
        options: {
          data: {
            full_name: formData.fullName,
            phone: formData.phone,
            role: formData.role,
            state: formData.state,
            district: formData.district,
            village_city: formData.villageCity,
            preferred_language: formData.preferredLanguage,
          },
        },
      });

      setUser(newProfile);
      router.push('/farmer/dashboard');
    } catch (err) {
      setUser(newProfile);
      router.push('/farmer/dashboard');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-earth-100 flex items-center justify-center p-4 py-12">
      <div className="w-full max-w-lg bg-white rounded-3xl p-8 border border-earth-300 shadow-elevated space-y-6">
        
        {/* Header */}
        <div className="text-center space-y-2">
          <Link href="/" className="inline-flex items-center gap-2 mb-2">
            <div className="w-10 h-10 rounded-2xl bg-forest-800 flex items-center justify-center text-harvest-300">
              <Sprout className="w-5 h-5" />
            </div>
            <span className="text-xl font-bold font-heading text-forest-950">AgriVision</span>
          </Link>
          <h1 className="text-2xl font-extrabold font-heading text-forest-950">Create Farmer Account</h1>
          <p className="text-xs text-earth-700">Join the AI-powered smart farming platform</p>
        </div>

        {/* Registration Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-forest-900 mb-1">Select Role</label>
              <select
                value={formData.role}
                onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                className="w-full px-3 py-2.5 rounded-xl border border-earth-300 text-xs font-medium bg-earth-50 text-forest-950"
              >
                <option value="farmer">Farmer (किसान)</option>
                <option value="expert">Agronomy Expert</option>
                <option value="admin">Platform Admin</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-forest-900 mb-1">Preferred Language</label>
              <select
                value={formData.preferredLanguage}
                onChange={(e) => setFormData({ ...formData, preferredLanguage: e.target.value })}
                className="w-full px-3 py-2.5 rounded-xl border border-earth-300 text-xs font-medium bg-earth-50 text-forest-950"
              >
                <option value="en">English</option>
                <option value="hi">हिन्दी (Hindi)</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-forest-900 mb-1">Full Name</label>
            <div className="relative">
              <User className="w-4 h-4 text-earth-600 absolute left-3 top-3.5" />
              <input
                type="text"
                required
                value={formData.fullName}
                onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                placeholder="Vaibhav Sharma"
                className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-earth-300 text-sm focus:outline-none focus:ring-2 focus:ring-forest-600 bg-earth-50/50 text-forest-950"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-forest-900 mb-1">Email</label>
              <input
                type="email"
                required
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                placeholder="vaibhav@farmer.in"
                className="w-full px-3 py-2.5 rounded-xl border border-earth-300 text-sm focus:outline-none focus:ring-2 focus:ring-forest-600 bg-earth-50/50 text-forest-950"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-forest-900 mb-1">Mobile Phone</label>
              <input
                type="tel"
                required
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                placeholder="+91 98765 43210"
                className="w-full px-3 py-2.5 rounded-xl border border-earth-300 text-sm focus:outline-none focus:ring-2 focus:ring-forest-600 bg-earth-50/50 text-forest-950"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-forest-900 mb-1">State</label>
              <input
                type="text"
                required
                value={formData.state}
                onChange={(e) => setFormData({ ...formData, state: e.target.value })}
                className="w-full px-3 py-2.5 rounded-xl border border-earth-300 text-sm bg-earth-50/50 text-forest-950"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-forest-900 mb-1">District</label>
              <input
                type="text"
                required
                value={formData.district}
                onChange={(e) => setFormData({ ...formData, district: e.target.value })}
                className="w-full px-3 py-2.5 rounded-xl border border-earth-300 text-sm bg-earth-50/50 text-forest-950"
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
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                placeholder="••••••••"
                className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-earth-300 text-sm focus:outline-none focus:ring-2 focus:ring-forest-600 bg-earth-50/50 text-forest-950"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3.5 rounded-xl bg-forest-800 text-harvest-100 font-bold text-sm hover:bg-forest-900 shadow-soft transition-all flex items-center justify-center gap-2"
          >
            <span>{loading ? 'Creating Farm Profile...' : 'Complete Registration'}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>

        <div className="pt-4 border-t border-earth-200 text-center text-xs text-earth-700">
          Already registered?{' '}
          <Link href="/login" className="font-bold text-forest-800 hover:underline">
            Sign In Here
          </Link>
        </div>

      </div>
    </div>
  );
}
