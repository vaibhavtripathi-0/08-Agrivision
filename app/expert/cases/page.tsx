'use client';

import React, { useState } from 'react';
import { Stethoscope, CheckCircle2, User, MapPin, Sparkles, Send } from 'lucide-react';

export default function ExpertCasesPage() {
  const [resolutionNotes, setResolutionNotes] = useState('');
  const [isResolved, setIsResolved] = useState(false);

  const handleResolveCase = (e: React.FormEvent) => {
    e.preventDefault();
    setIsResolved(true);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      
      {/* Header */}
      <div className="bg-white p-6 sm:p-8 rounded-3xl border border-earth-300 shadow-soft space-y-2">
        <h1 className="text-2xl sm:text-3xl font-extrabold font-heading text-forest-950">
          Farmer Disease Scan Review Case #1084
        </h1>
        <p className="text-xs sm:text-sm text-forest-800">
          Escalated case verification by Dr. Sunita Verma (Plant Pathologist).
        </p>
      </div>

      {/* Case Details Card */}
      <div className="p-6 sm:p-8 rounded-3xl bg-white border border-earth-300 shadow-soft space-y-6">
        
        <div className="flex justify-between items-center border-b border-earth-200 pb-4">
          <div>
            <span className="text-xs font-bold text-red-700 bg-red-100 px-3 py-1 rounded-full">
              URGENT REVIEW
            </span>
            <h2 className="text-xl font-bold font-heading text-forest-950 pt-2">
              Yellow Rust Symptom Verification
            </h2>
          </div>

          <span className="text-xs font-bold text-forest-800 bg-forest-100 px-3 py-1 rounded-full">
            Submitted 2 hrs ago
          </span>
        </div>

        {/* Farmer Context Summary */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 p-4 rounded-2xl bg-earth-50 border border-earth-300 text-xs text-forest-900">
          <div>
            <span className="text-earth-700 block">Farmer Name:</span>
            <span className="font-bold">Vaibhav Sharma</span>
          </div>
          <div>
            <span className="text-earth-700 block">Location:</span>
            <span className="font-bold">Mathura, UP</span>
          </div>
          <div>
            <span className="text-earth-700 block">Crop & Age:</span>
            <span className="font-bold">Wheat (34 Days)</span>
          </div>
          <div>
            <span className="text-earth-700 block">AI Confidence:</span>
            <span className="font-bold text-emerald-700">91.4%</span>
          </div>
        </div>

        {/* Image Preview & AI Pre-Diagnosis */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="rounded-2xl overflow-hidden border border-earth-300">
            <img
              src="https://images.unsplash.com/photo-1574943320219-553eb213f72d?auto=format&fit=crop&q=80&w=800"
              alt="Infected Leaf"
              className="w-full h-48 object-cover"
            />
          </div>

          <div className="p-4 rounded-2xl bg-forest-900 text-earth-50 border border-forest-700 space-y-2 text-xs">
            <p className="font-bold text-harvest-300 flex items-center gap-1">
              <Sparkles className="w-4 h-4" />
              KrishiMitra AI Symptom Extraction
            </p>
            <p className="leading-relaxed text-forest-200">
              "Distinct yellow pustules arranged in linear stripes parallel to leaf veins. High probability of Puccinia striiformis infection exacerbated by recent 74% humidity."
            </p>
          </div>
        </div>

        {/* Resolution Form */}
        {!isResolved ? (
          <form onSubmit={handleResolveCase} className="space-y-4 border-t border-earth-200 pt-4">
            <div>
              <label className="block text-xs font-semibold text-forest-900 mb-1">
                Expert Prescription & Verified Action Plan
              </label>
              <textarea
                required
                rows={4}
                value={resolutionNotes}
                onChange={(e) => setResolutionNotes(e.target.value)}
                placeholder="Prescribe exact chemical dosage (e.g. Propiconazole 25% EC @ 1ml/L), spray timing, and safety advice..."
                className="w-full px-3 py-2.5 rounded-xl border border-earth-300 text-sm focus:outline-none focus:ring-2 focus:ring-forest-600 bg-earth-50/50"
              ></textarea>
            </div>

            <button
              type="submit"
              className="px-6 py-3 rounded-xl bg-forest-800 text-harvest-100 font-bold text-xs shadow-soft hover:bg-forest-900 transition-all flex items-center gap-2"
            >
              <Send className="w-4 h-4" />
              <span>Approve & Send Prescription to Farmer</span>
            </button>
          </form>
        ) : (
          <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-300 text-xs font-bold text-emerald-900 flex items-center gap-2">
            <CheckCircle2 className="w-5 h-5 text-emerald-700 shrink-0" />
            <span>Prescription verified & dispatched directly to Vaibhav Sharma's KrishiMitra Assistant!</span>
          </div>
        )}

      </div>

    </div>
  );
}
