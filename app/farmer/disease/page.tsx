'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useTranslation } from '@/lib/i18n/context';
import { Scan, Upload, Camera, Sparkles, CheckCircle2, ShieldAlert, ArrowRight, UserCheck } from 'lucide-react';

export default function DiseaseScannerPage() {
  const { t } = useTranslation();
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [analyzing, setAnalyzing] = useState(false);
  const [scanResult, setScanResult] = useState<any>(null);

  const handleDemoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const url = URL.createObjectURL(file);
      setImagePreview(url);
      runAnalysis();
    }
  };

  const triggerSampleScan = () => {
    setImagePreview('https://images.unsplash.com/photo-1574943320219-553eb213f72d?auto=format&fit=crop&q=80&w=800');
    runAnalysis();
  };

  const runAnalysis = () => {
    setAnalyzing(true);
    setScanResult(null);

    setTimeout(() => {
      setAnalyzing(false);
      setScanResult({
        disease: 'Yellow Leaf Rust (Puccinia striiformis)',
        confidence: 91.4,
        severity: 'Moderate',
        affectedAreaPct: 24,
        organicRemedies: [
          'Spray Neem Kernel Powder extract (5%) early in the morning.',
          'Remove severely yellowed lower leaves to reduce spore multiplication.',
          'Avoid overhead sprinkler irrigation for the next 7 days.'
        ],
        chemicalRemedies: [
          'Propiconazole 25% EC @ 1ml/L water if infection spreads to upper flag leaf.'
        ],
        expertVerified: true,
        expertName: 'Dr. Sunita Verma (IARI Plant Pathologist)'
      });
    }, 1800);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      
      {/* Header */}
      <div className="bg-white p-6 sm:p-8 rounded-3xl border border-earth-300 shadow-soft space-y-2">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-forest-100 text-forest-800 font-bold text-xs">
          <Scan className="w-4 h-4 text-forest-700" />
          AI Vision Disease Radar
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold font-heading text-forest-950">
          Crop Disease Scanner
        </h1>
        <p className="text-xs sm:text-sm text-forest-800">
          Upload or take a photo of infected crop leaves for instant AI symptom detection & verified remedies.
        </p>
      </div>

      {/* Upload & Scanner Box */}
      <div className="p-8 rounded-3xl bg-forest-900 text-earth-50 border border-forest-700 shadow-elevated space-y-6 text-center">
        
        {!imagePreview ? (
          <div className="space-y-6">
            <div className="w-20 h-20 rounded-3xl bg-forest-800 text-harvest-400 flex items-center justify-center mx-auto shadow-glow-green border border-forest-700">
              <Camera className="w-10 h-10" />
            </div>

            <div className="space-y-2">
              <h3 className="text-xl font-bold font-heading text-earth-100">
                Take a Photo of Your Crop Leaf
              </h3>
              <p className="text-xs text-forest-300 max-w-md mx-auto">
                Ensure leaf is well-lit and symptoms are clearly visible.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row justify-center gap-4 pt-2">
              <label className="cursor-pointer px-6 py-3.5 rounded-2xl bg-harvest-400 text-forest-950 font-bold text-sm hover:bg-harvest-300 transition-all shadow-glow-green inline-flex items-center justify-center gap-2">
                <Upload className="w-4 h-4" />
                <span>Upload Leaf Image</span>
                <input type="file" accept="image/*" onChange={handleDemoUpload} className="hidden" />
              </label>

              <button
                onClick={triggerSampleScan}
                className="px-6 py-3.5 rounded-2xl bg-forest-800 text-earth-100 border border-forest-700 font-semibold text-sm hover:bg-forest-700 transition-all"
              >
                Use Sample Wheat Leaf Photo
              </button>
            </div>
          </div>
        ) : (
          <div className="space-y-6">
            <div className="relative max-w-md mx-auto rounded-2xl overflow-hidden border-2 border-harvest-400 shadow-elevated">
              <img src={imagePreview} alt="Leaf Preview" className="w-full h-64 object-cover" />
              {analyzing && (
                <div className="absolute inset-0 bg-forest-950/80 backdrop-blur-sm flex flex-col items-center justify-center space-y-3">
                  <div className="w-12 h-12 border-4 border-harvest-400 border-t-transparent rounded-full animate-spin"></div>
                  <p className="text-xs font-bold text-harvest-300">Analyzing crop leaf symptoms...</p>
                </div>
              )}
            </div>

            <button
              onClick={() => {
                setImagePreview(null);
                setScanResult(null);
              }}
              className="text-xs text-forest-300 hover:text-earth-100 underline font-semibold"
            >
              Upload Different Photo
            </button>
          </div>
        )}

      </div>

      {/* Diagnosis Result */}
      {scanResult && (
        <div className="p-6 sm:p-8 rounded-3xl bg-white border border-earth-300 shadow-soft space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-earth-200 pb-4">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-harvest-700 bg-harvest-100 px-3 py-1 rounded-full">
                DEMO AI ANALYSIS
              </span>
              <h2 className="text-2xl font-extrabold font-heading text-forest-950 pt-2">
                {scanResult.disease}
              </h2>
            </div>
            <div className="text-right">
              <span className="text-2xl font-extrabold font-heading text-forest-900">{scanResult.confidence}%</span>
              <p className="text-xs text-forest-700 font-semibold">Confidence Score</p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            
            {/* Organic Remedies */}
            <div className="p-5 rounded-2xl bg-earth-50 border border-earth-300 space-y-3">
              <h3 className="text-sm font-bold font-heading text-forest-950 flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                Organic Treatment Steps
              </h3>
              <ul className="space-y-2 text-xs text-forest-900">
                {scanResult.organicRemedies.map((step: string, idx: number) => (
                  <li key={idx} className="leading-relaxed font-medium">• {step}</li>
                ))}
              </ul>
            </div>

            {/* Chemical Remedial Precaution */}
            <div className="p-5 rounded-2xl bg-earth-50 border border-earth-300 space-y-3">
              <h3 className="text-sm font-bold font-heading text-forest-950 flex items-center gap-2">
                <ShieldAlert className="w-4 h-4 text-amber-600" />
                Targeted Fungicide (If Spreading)
              </h3>
              <ul className="space-y-2 text-xs text-forest-900">
                {scanResult.chemicalRemedies.map((step: string, idx: number) => (
                  <li key={idx} className="leading-relaxed font-medium">• {step}</li>
                ))}
              </ul>
            </div>

          </div>

          {/* Expert Escalation Callout */}
          <div className="p-4 rounded-2xl bg-forest-900 text-earth-100 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <UserCheck className="w-6 h-6 text-harvest-300 shrink-0" />
              <div>
                <p className="text-xs font-bold text-harvest-300">Verified Expert Backup</p>
                <p className="text-xs text-forest-200">Recommended by {scanResult.expertName}</p>
              </div>
            </div>
            <Link
              href="/farmer/assistant"
              className="px-4 py-2 rounded-xl bg-harvest-400 text-forest-950 text-xs font-bold hover:bg-harvest-300 transition-all shrink-0"
            >
              Ask KrishiMitra for Escalation
            </Link>
          </div>

        </div>
      )}

    </div>
  );
}
