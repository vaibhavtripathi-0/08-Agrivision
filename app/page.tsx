'use client';

import React from 'react';
import Link from 'next/link';
import { Navbar } from '@/components/shared/Navbar';
import { useTranslation } from '@/lib/i18n/context';
import {
  Sprout,
  Sparkles,
  CloudRain,
  TrendingUp,
  MapPin,
  ShieldCheck,
  Zap,
  Droplets,
  Scan,
  Coins,
  Store,
  Users,
  CheckCircle2,
  ArrowRight,
  SunMedium,
  Award,
  BookOpen
} from 'lucide-react';

export default function LandingPage() {
  const { t } = useTranslation();

  return (
    <div className="min-h-screen bg-earth-50 text-forest-950">
      <Navbar />

      {/* 1. HERO SECTION */}
      <section className="relative overflow-hidden pt-12 pb-24 lg:pt-20 lg:pb-32 bg-gradient-to-b from-earth-100/60 via-earth-50 to-earth-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Left Content */}
            <div className="lg:col-span-7 space-y-8">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-forest-100 border border-forest-200 text-forest-800 text-xs font-semibold tracking-wide">
                <Sparkles className="w-4 h-4 text-harvest-500 fill-harvest-400" />
                <span>Smart India Hackathon 2026 Innovation</span>
              </div>

              <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight font-heading leading-tight text-forest-950">
                {t('landing.heroTitle')}
              </h1>

              <p className="text-lg sm:text-xl text-forest-800 max-w-2xl font-normal leading-relaxed">
                {t('landing.heroSub')}
              </p>

              <div className="flex flex-col sm:flex-row gap-4 pt-2">
                <Link
                  href="/register"
                  className="flex items-center justify-center gap-2 px-8 py-4 rounded-2xl bg-forest-800 text-harvest-100 font-bold text-base hover:bg-forest-900 shadow-elevated hover:scale-[1.02] transition-all"
                >
                  <span>{t('landing.ctaStart')}</span>
                  <ArrowRight className="w-5 h-5" />
                </Link>

                <Link
                  href="/farmer/dashboard"
                  className="flex items-center justify-center gap-2 px-8 py-4 rounded-2xl bg-white text-forest-900 border border-earth-300 font-semibold text-base hover:bg-earth-100 transition-all shadow-soft"
                >
                  <Sprout className="w-5 h-5 text-forest-600" />
                  <span>{t('landing.ctaExplore')}</span>
                </Link>
              </div>

              {/* Hero Stats */}
              <div className="grid grid-cols-3 gap-6 pt-6 border-t border-earth-300/80">
                <div>
                  <p className="text-2xl font-extrabold font-heading text-forest-900">94.2%</p>
                  <p className="text-xs text-earth-700 font-medium">Disease Accuracy</p>
                </div>
                <div>
                  <p className="text-2xl font-extrabold font-heading text-forest-900">₹14,500</p>
                  <p className="text-xs text-earth-700 font-medium">Avg Savings / Acre</p>
                </div>
                <div>
                  <p className="text-2xl font-extrabold font-heading text-forest-900">22+ Mandis</p>
                  <p className="text-xs text-earth-700 font-medium">Realtime Price Radar</p>
                </div>
              </div>
            </div>

            {/* Right Interactive Mockup Card */}
            <div className="lg:col-span-5 relative">
              <div className="absolute -inset-4 bg-gradient-to-r from-forest-500 to-harvest-400 rounded-3xl opacity-20 blur-2xl"></div>
              
              <div className="relative rounded-3xl bg-forest-900 text-earth-50 p-6 sm:p-8 shadow-elevated border border-forest-700 space-y-6">
                
                {/* Live Header Card */}
                <div className="flex items-center justify-between border-b border-forest-800 pb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-forest-800 flex items-center justify-center text-harvest-300">
                      <MapPin className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="font-heading font-bold text-earth-100 text-sm">Mathura Field #1</h4>
                      <p className="text-xs text-forest-300">2.0 Acres • Loamy Soil • Wheat</p>
                    </div>
                  </div>
                  <span className="px-2.5 py-1 rounded-full bg-forest-800 text-harvest-300 text-[10px] font-bold tracking-wider">
                    LIVE RADAR
                  </span>
                </div>

                {/* AI Brief Box */}
                <div className="p-4 rounded-2xl bg-forest-800/80 border border-forest-700 space-y-3">
                  <div className="flex items-center justify-between text-xs font-semibold text-harvest-300">
                    <span className="flex items-center gap-1.5">
                      <Sparkles className="w-4 h-4 text-harvest-400" />
                      TODAY'S AI FARM BRIEF
                    </span>
                    <span>12 Aug 2026</span>
                  </div>

                  <p className="text-sm text-earth-100 leading-relaxed font-sans">
                    "Rain expected tomorrow (78%). Skip irrigation today to prevent root fungus & save ₹1,200 diesel cost. Agra Mandi offers +₹40/qtl higher net yield."
                  </p>
                </div>

                {/* Micro Widgets */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="p-3.5 rounded-xl bg-forest-950/60 border border-forest-800">
                    <div className="flex items-center gap-2 text-xs text-forest-300 mb-1">
                      <CloudRain className="w-4 h-4 text-harvest-400" />
                      Weather Alert
                    </div>
                    <p className="text-base font-bold text-earth-100 font-heading">🌧 78% Rain</p>
                    <p className="text-[11px] text-forest-400">Delay Irrigation</p>
                  </div>

                  <div className="p-3.5 rounded-xl bg-forest-950/60 border border-forest-800">
                    <div className="flex items-center gap-2 text-xs text-forest-300 mb-1">
                      <TrendingUp className="w-4 h-4 text-emerald-400" />
                      Best Mandi Price
                    </div>
                    <p className="text-base font-bold text-emerald-300 font-heading">₹2,520 / qtl</p>
                    <p className="text-[11px] text-forest-400">Agra Mandi (+4.2%)</p>
                  </div>
                </div>

                {/* KrishiMitra Chat Simulation */}
                <div className="p-4 rounded-2xl bg-forest-950 border border-forest-800 flex items-start gap-3">
                  <div className="w-8 h-8 rounded-full bg-harvest-500 text-forest-950 font-bold flex items-center justify-center text-xs shrink-0">
                    KM
                  </div>
                  <div>
                    <p className="text-xs font-bold text-harvest-300 mb-0.5">KrishiMitra AI</p>
                    <p className="text-xs text-earth-200">"Samajh gaya! 📸 Leaf photo bhejo, main yellow rust check karta hoon."</p>
                  </div>
                </div>

              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 2. FARMER PROBLEM SECTION */}
      <section className="py-20 bg-white border-y border-earth-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
            <span className="text-xs font-bold uppercase tracking-widest text-harvest-600 bg-harvest-100 px-3 py-1 rounded-full">
              THE RURAL CHALLENGE
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold font-heading text-forest-950">
              {t('landing.problemTitle')}
            </h2>
            <p className="text-base text-forest-800 leading-relaxed">
              {t('landing.problemDesc')}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-8 rounded-3xl bg-earth-50 border border-earth-300 space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-red-100 text-red-700 flex items-center justify-center font-bold">
                01
              </div>
              <h3 className="text-xl font-bold font-heading text-forest-900">Fragmented Data Sources</h3>
              <p className="text-sm text-forest-700 leading-relaxed">
                Farmers must check different apps or call local dealers separately for weather, seeds, pesticides, and mandi rates.
              </p>
            </div>

            <div className="p-8 rounded-3xl bg-earth-50 border border-earth-300 space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-amber-100 text-amber-700 flex items-center justify-center font-bold">
                02
              </div>
              <h3 className="text-xl font-bold font-heading text-forest-900">Uncertain Disease Diagnosis</h3>
              <p className="text-sm text-forest-700 leading-relaxed">
                Misdiagnosing leaf yellowing leads to wrong chemical usage, wasting money and reducing crop yield.
              </p>
            </div>

            <div className="p-8 rounded-3xl bg-earth-50 border border-earth-300 space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-orange-100 text-orange-700 flex items-center justify-center font-bold">
                03
              </div>
              <h3 className="text-xl font-bold font-heading text-forest-900">Unfair Middlemen Prices</h3>
              <p className="text-sm text-forest-700 leading-relaxed">
                Without real-time nearby mandi price visibility and transport cost calculations, farmers sell below market value.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 3. AGRIVISION SOLUTION & FARM CONTEXT ENGINE */}
      <section id="features" className="py-20 bg-earth-100/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
            <span className="text-xs font-bold uppercase tracking-widest text-forest-800 bg-forest-200 px-3 py-1 rounded-full">
              CONNECTED INTELLIGENCE
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold font-heading text-forest-950">
              {t('landing.solutionTitle')}
            </h2>
            <p className="text-base text-forest-800 leading-relaxed">
              {t('landing.solutionDesc')}
            </p>
          </div>

          {/* Context Flow Architecture diagram */}
          <div className="p-8 sm:p-12 rounded-3xl bg-forest-900 text-earth-50 shadow-elevated border border-forest-700">
            <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 gap-4 text-center">
              {[
                { label: 'Farmer', icon: Users },
                { label: 'Farm & Field', icon: MapPin },
                { label: 'Soil pH / NPK', icon: Droplets },
                { label: 'Crop Age', icon: Sprout },
                { label: 'Weather Radar', icon: CloudRain },
                { label: 'Mandi Price', icon: Coins },
              ].map((item, idx) => (
                <div key={idx} className="p-4 rounded-2xl bg-forest-800/70 border border-forest-700 flex flex-col items-center justify-center space-y-2">
                  <item.icon className="w-6 h-6 text-harvest-300" />
                  <span className="text-xs font-bold font-heading text-earth-100">{item.label}</span>
                </div>
              ))}
            </div>

            <div className="my-8 text-center">
              <div className="inline-flex items-center gap-3 px-6 py-3 rounded-full bg-harvest-500 text-forest-950 font-bold text-sm shadow-glow-green">
                <Sparkles className="w-5 h-5 fill-forest-950" />
                AgriVision AI Context Fusion Engine
              </div>
            </div>

            <div className="p-6 rounded-2xl bg-forest-950 border border-forest-800 text-center max-w-2xl mx-auto">
              <p className="text-sm text-harvest-200 font-medium">
                Output: Simple, personalized action — "Skip irrigation today, treat leaf rust with organic spray, sell Wheat at Agra Mandi on Friday."
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 4. FEATURE GRID PREVIEWS (Crop, Disease, Weather, Irrigation, Yield, Mandi) */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
          
          {/* Feature 1: Crop & Disease */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <div className="w-12 h-12 rounded-2xl bg-forest-100 text-forest-800 flex items-center justify-center">
                <Scan className="w-6 h-6" />
              </div>
              <h3 className="text-2xl sm:text-3xl font-bold font-heading text-forest-950">
                AI Crop Disease Scanner & Recommendations
              </h3>
              <p className="text-base text-forest-800 leading-relaxed">
                Take a simple smartphone leaf photo. Our AI identifies diseases such as Yellow Rust or Blight in seconds with 94%+ accuracy, providing organic remedies and expert verification.
              </p>
              <ul className="space-y-2 text-sm text-forest-900 font-medium">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-forest-600" />
                  Instant leaf disease diagnosis with treatment recommendations
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-forest-600" />
                  Soil NPK & pH based crop suitability match score
                </li>
              </ul>
              <Link href="/farmer/disease" className="inline-flex items-center gap-2 text-forest-700 font-bold hover:text-forest-900">
                <span>Try Disease Scanner</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>

            <div className="p-8 rounded-3xl bg-earth-50 border border-earth-300 shadow-soft space-y-4">
              <div className="flex justify-between items-center border-b border-earth-200 pb-3">
                <span className="text-xs font-bold text-forest-800 uppercase tracking-wider">AI Scan Result</span>
                <span className="px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold">91% Confidence</span>
              </div>
              <div className="space-y-2">
                <h4 className="text-xl font-bold text-forest-900">Yellow Leaf Rust (Puccinia striiformis)</h4>
                <p className="text-xs text-earth-700">Severity: Moderate • Action Required within 48 Hours</p>
              </div>
              <div className="p-4 rounded-xl bg-white border border-earth-300 text-xs text-forest-900 space-y-1">
                <p className="font-bold text-forest-950">Organic Treatment:</p>
                <p>1. Spray Neem oil (5ml/L water) early morning.</p>
                <p>2. Avoid overhead sprinkler irrigation during high humidity.</p>
              </div>
            </div>
          </div>

          {/* Feature 2: Mandi Market Intelligence */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="order-2 lg:order-1 p-8 rounded-3xl bg-forest-900 text-earth-50 border border-forest-700 space-y-4">
              <div className="flex justify-between items-center border-b border-forest-800 pb-3">
                <span className="text-xs font-bold text-harvest-300 uppercase tracking-wider">Mandi Price Radar</span>
                <span className="px-2.5 py-0.5 rounded-full bg-forest-800 text-harvest-300 text-xs font-bold">Mathura / Agra</span>
              </div>
              <div className="space-y-3 text-sm">
                <div className="flex justify-between items-center p-3 rounded-xl bg-forest-800/80">
                  <div>
                    <p className="font-bold text-earth-100">Agra Mandi (42 km)</p>
                    <p className="text-xs text-forest-300">Transport: ₹45/qtl</p>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-emerald-400 text-base font-heading">₹2,520 / qtl</p>
                    <p className="text-[11px] text-emerald-300">Net Return: ₹2,475</p>
                  </div>
                </div>

                <div className="flex justify-between items-center p-3 rounded-xl bg-forest-800/80">
                  <div>
                    <p className="font-bold text-earth-100">Mathura Mandi (8 km)</p>
                    <p className="text-xs text-forest-300">Transport: ₹15/qtl</p>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-earth-100 text-base font-heading">₹2,450 / qtl</p>
                    <p className="text-[11px] text-forest-300">Net Return: ₹2,435</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="order-1 lg:order-2 space-y-6">
              <div className="w-12 h-12 rounded-2xl bg-harvest-100 text-harvest-800 flex items-center justify-center">
                <Coins className="w-6 h-6" />
              </div>
              <h3 className="text-2xl sm:text-3xl font-bold font-heading text-forest-950">
                Net-Return Mandi Price Intelligence
              </h3>
              <p className="text-base text-forest-800 leading-relaxed">
                AgriVision automatically calculates transportation expenses per quintal for surrounding mandis, showing you true net returns so you never sell at a loss.
              </p>
              <Link href="/farmer/markets" className="inline-flex items-center gap-2 text-forest-700 font-bold hover:text-forest-900">
                <span>View Live Mandi Rates</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>

        </div>
      </section>

      {/* 5. KRISHIMITRA AI COMPANION SECTION */}
      <section className="py-20 bg-forest-900 text-earth-50 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            <div className="lg:col-span-6 space-y-6">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-forest-800 border border-forest-700 text-harvest-300 text-xs font-semibold">
                <Sparkles className="w-4 h-4" />
                KRISHIMITRA AI ASSISTANT
              </div>

              <h2 className="text-3xl sm:text-5xl font-extrabold font-heading text-earth-100 leading-tight">
                Your Intelligent Farming Companion
              </h2>

              <p className="text-base sm:text-lg text-forest-200 leading-relaxed">
                KrishiMitra speaks your language natively — Hinglish, Hindi, or English. Ask questions via voice or text and receive empathetic, farm-aware recommendations.
              </p>

              <div className="flex items-center gap-4 pt-2">
                <Link
                  href="/farmer/assistant"
                  className="px-6 py-3.5 rounded-2xl bg-harvest-400 text-forest-950 font-bold text-sm hover:bg-harvest-300 transition-all shadow-glow-green"
                >
                  Chat with KrishiMitra
                </Link>
              </div>
            </div>

            <div className="lg:col-span-6">
              <div className="p-6 rounded-3xl bg-forest-950 border border-forest-800 space-y-4 shadow-elevated">
                <div className="flex items-center justify-between border-b border-forest-800 pb-3">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-emerald-500 animate-ping"></div>
                    <span className="text-xs font-bold text-earth-100">KrishiMitra AI Active</span>
                  </div>
                  <span className="text-[11px] text-forest-400">Hindi • Hinglish • English</span>
                </div>

                <div className="space-y-3">
                  <div className="p-3 rounded-2xl bg-forest-900/90 text-earth-100 text-xs max-w-[85%] border border-forest-800">
                    <p className="font-bold text-forest-300 mb-1">Farmer (Mathura):</p>
                    <p>"Bhai meri गेहूं ki leaves yellow ho rahi hain, kya karun?"</p>
                  </div>

                  <div className="p-3.5 rounded-2xl bg-forest-800 text-earth-100 text-xs max-w-[90%] ml-auto border border-forest-700 space-y-2">
                    <p className="font-bold text-harvest-300">KrishiMitra AI:</p>
                    <p>"Samajh gaya 👍 Yellow leaves ke possible reasons nitrogen deficiency ya yellow rust ho sakte hain. Leaf ki clear photo 📸 bhejo, main check karunga!"</p>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 6. EXPERT ECOSYSTEM */}
      <section id="experts" className="py-20 bg-earth-50 border-b border-earth-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-12">
          <div className="max-w-2xl mx-auto space-y-4">
            <span className="text-xs font-bold uppercase tracking-widest text-forest-800 bg-forest-200 px-3 py-1 rounded-full">
              VERIFIED ADVISORY
            </span>
            <h2 className="text-3xl font-extrabold font-heading text-forest-950">
              Human Experts When You Need Them
            </h2>
            <p className="text-base text-forest-800">
              For complex crop conditions, KrishiMitra seamlessly escalates your case to certified agricultural scientists from local KVKs and universities.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
            <div className="p-6 rounded-3xl bg-white border border-earth-300 text-left space-y-3 shadow-soft">
              <div className="w-12 h-12 rounded-full bg-forest-100 text-forest-900 font-bold flex items-center justify-center">
                DR
              </div>
              <h4 className="font-bold font-heading text-lg text-forest-950">Dr. Rajesh Sharma</h4>
              <p className="text-xs text-forest-700">Agronomist • KVK Mathura</p>
              <p className="text-xs text-earth-700">14+ Years Experience • 1,240 Cases Resolved</p>
            </div>

            <div className="p-6 rounded-3xl bg-white border border-earth-300 text-left space-y-3 shadow-soft">
              <div className="w-12 h-12 rounded-full bg-forest-100 text-forest-900 font-bold flex items-center justify-center">
                DR
              </div>
              <h4 className="font-bold font-heading text-lg text-forest-950">Dr. Sunita Verma</h4>
              <p className="text-xs text-forest-700">Plant Pathologist • IARI</p>
              <p className="text-xs text-earth-700">10+ Years Experience • Wheat & Mustard Specialist</p>
            </div>

            <div className="p-6 rounded-3xl bg-white border border-earth-300 text-left space-y-3 shadow-soft">
              <div className="w-12 h-12 rounded-full bg-forest-100 text-forest-900 font-bold flex items-center justify-center">
                AP
              </div>
              <h4 className="font-bold font-heading text-lg text-forest-950">Er. Amit Singh</h4>
              <p className="text-xs text-forest-700">Irrigation Scientist</p>
              <p className="text-xs text-earth-700">Micro-irrigation & Drip Optimization Expert</p>
            </div>
          </div>
        </div>
      </section>

      {/* 7. FINAL CTA */}
      <section className="py-20 bg-gradient-to-br from-forest-900 to-forest-950 text-earth-50">
        <div className="max-w-4xl mx-auto px-4 text-center space-y-8">
          <h2 className="text-3xl sm:text-5xl font-extrabold font-heading text-earth-100">
            Ready to Transform Your Farming Yield?
          </h2>
          <p className="text-base sm:text-lg text-forest-200">
            Join thousands of Indian farmers using AgriVision to make smarter, data-driven farming decisions every day.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4 pt-4">
            <Link
              href="/register"
              className="px-8 py-4 rounded-2xl bg-harvest-400 text-forest-950 font-bold text-base hover:bg-harvest-300 transition-all shadow-glow-green"
            >
              {t('landing.ctaStart')}
            </Link>
            <Link
              href="/login"
              className="px-8 py-4 rounded-2xl border border-forest-600 text-earth-100 font-semibold text-base hover:bg-forest-800 transition-all"
            >
              Sign In to Your Farm
            </Link>
          </div>
        </div>
      </section>

      {/* 8. FOOTER */}
      <footer className="bg-forest-950 text-forest-300 border-t border-forest-900 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-6 text-xs">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-xl bg-forest-800 flex items-center justify-center text-harvest-300">
              <Sprout className="w-4 h-4" />
            </div>
            <span className="font-heading font-bold text-sm text-earth-100">AgriVision Platform</span>
          </div>
          <p>© 2026 AgriVision. "AI-powered intelligence for smarter farming." Smart India Hackathon Prototype.</p>
          <div className="flex gap-4 text-forest-400">
            <Link href="/login">Farmer Auth</Link>
            <Link href="/farmer/dashboard">Dashboard</Link>
            <Link href="/farmer/assistant">KrishiMitra AI</Link>
          </div>
        </div>
      </footer>

    </div>
  );
}
