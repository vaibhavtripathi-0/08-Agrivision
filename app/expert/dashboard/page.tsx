'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Stethoscope, CheckCircle2, Clock, AlertTriangle, FileText, Send, Sparkles } from 'lucide-react';

export default function ExpertDashboardPage() {
  const [advisoryTitle, setAdvisoryTitle] = useState('');
  const [advisoryContent, setAdvisoryContent] = useState('');
  const [published, setPublished] = useState(false);

  const handlePublishAdvisory = (e: React.FormEvent) => {
    e.preventDefault();
    setPublished(true);
    setTimeout(() => {
      setPublished(false);
      setAdvisoryTitle('');
      setAdvisoryContent('');
    }, 2500);
  };

  return (
    <div className="max-w-5xl mx-auto space-y-8">
      
      {/* Header */}
      <div className="bg-white p-6 sm:p-8 rounded-3xl border border-earth-300 shadow-soft space-y-2">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-forest-100 text-forest-800 font-bold text-xs">
          <Stethoscope className="w-4 h-4 text-forest-700" />
          Certified Agronomist Workspace
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold font-heading text-forest-950">
          Expert Advisory Panel
        </h1>
        <p className="text-xs sm:text-sm text-forest-800">
          Review escalated farmer disease diagnostics, issue official regional advisories, and verify KrishiMitra AI suggestions.
        </p>
      </div>

      {/* Metrics Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
        <div className="p-5 rounded-3xl bg-white border border-earth-300 shadow-soft">
          <p className="text-xs text-earth-700 font-semibold">Pending Reviews</p>
          <p className="text-2xl font-extrabold font-heading text-amber-600">3 Cases</p>
        </div>
        <div className="p-5 rounded-3xl bg-white border border-earth-300 shadow-soft">
          <p className="text-xs text-earth-700 font-semibold">Urgent Escalations</p>
          <p className="text-2xl font-extrabold font-heading text-red-600">1 Critical</p>
        </div>
        <div className="p-5 rounded-3xl bg-white border border-earth-300 shadow-soft">
          <p className="text-xs text-earth-700 font-semibold">Resolved This Month</p>
          <p className="text-2xl font-extrabold font-heading text-forest-800">42 Cases</p>
        </div>
        <div className="p-5 rounded-3xl bg-white border border-earth-300 shadow-soft">
          <p className="text-xs text-earth-700 font-semibold">Expert Rating</p>
          <p className="text-2xl font-extrabold font-heading text-harvest-600">⭐ 4.98 / 5.0</p>
        </div>
      </div>

      {/* Pending Cases Quick Action */}
      <div className="p-6 rounded-3xl bg-forest-900 text-earth-50 border border-forest-700 shadow-elevated space-y-4">
        <div className="flex justify-between items-center border-b border-forest-800 pb-3">
          <h2 className="text-lg font-bold font-heading text-earth-100 flex items-center gap-2">
            <AlertTriangle className="w-5 h-5 text-harvest-400" />
            High Priority Farmer Cases Requiring Review
          </h2>
          <Link href="/expert/cases" className="text-xs font-bold text-harvest-300 hover:underline">
            View All Cases →
          </Link>
        </div>

        <div className="p-4 rounded-2xl bg-forest-800/90 border border-forest-700 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs text-harvest-300 font-semibold mb-1">
              <span>Farmer: Vaibhav Sharma (Mathura)</span>
              <span>•</span>
              <span>Crop: Wheat</span>
            </div>
            <p className="text-sm font-bold text-earth-100">Suspected Yellow Rust (Puccinia striiformis) — 91% AI Confidence</p>
          </div>

          <Link
            href="/expert/cases"
            className="px-4 py-2 rounded-xl bg-harvest-400 text-forest-950 font-bold text-xs hover:bg-harvest-300 transition-all shrink-0 text-center"
          >
            Review Case & Approve Remedy
          </Link>
        </div>
      </div>

      {/* Broadcast Regional Advisory Form */}
      <div className="p-6 sm:p-8 rounded-3xl bg-white border border-earth-300 shadow-soft space-y-4">
        <h2 className="text-xl font-bold font-heading text-forest-950 flex items-center gap-2">
          <FileText className="w-5 h-5 text-forest-700" />
          Broadcast Regional Agricultural Advisory
        </h2>

        {published && (
          <div className="p-3 rounded-xl bg-emerald-50 border border-emerald-200 text-xs font-bold text-emerald-800 flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4" />
            Advisory published successfully to Mathura & Agra regional farmer dashboards!
          </div>
        )}

        <form onSubmit={handlePublishAdvisory} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-forest-900 mb-1">Advisory Title (English / Hindi)</label>
            <input
              type="text"
              required
              value={advisoryTitle}
              onChange={(e) => setAdvisoryTitle(e.target.value)}
              placeholder="e.g. Yellow Rust Protection Advisory for Wheat Farmers in Mathura"
              className="w-full px-3 py-2.5 rounded-xl border border-earth-300 text-sm focus:outline-none focus:ring-2 focus:ring-forest-600 bg-earth-50/50"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-forest-900 mb-1">Advisory Content & Guidelines</label>
            <textarea
              required
              rows={4}
              value={advisoryContent}
              onChange={(e) => setAdvisoryContent(e.target.value)}
              placeholder="Detailed treatment steps, recommended bio-fungicides, and weather precautions..."
              className="w-full px-3 py-2.5 rounded-xl border border-earth-300 text-sm focus:outline-none focus:ring-2 focus:ring-forest-600 bg-earth-50/50"
            ></textarea>
          </div>

          <button
            type="submit"
            className="px-6 py-3 rounded-xl bg-forest-800 text-harvest-100 font-bold text-xs shadow-soft hover:bg-forest-900 transition-all flex items-center gap-2"
          >
            <Send className="w-4 h-4" />
            <span>Broadcast Regional Advisory</span>
          </button>
        </form>
      </div>

    </div>
  );
}
