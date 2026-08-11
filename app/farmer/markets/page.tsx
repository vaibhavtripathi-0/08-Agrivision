'use client';

import React, { useState, useEffect } from 'react';
import { MarketService, MandiPrice } from '@/lib/services/market';
import { Coins, TrendingUp, MapPin, Sparkles, Truck, ArrowUpRight } from 'lucide-react';

export default function MarketsPage() {
  const [marketData, setMarketData] = useState<any>(null);
  const [selectedCrop, setSelectedCrop] = useState('Wheat');

  useEffect(() => {
    MarketService.getMandiPrices(selectedCrop, 'Mathura').then(setMarketData);
  }, [selectedCrop]);

  if (!marketData) return <div className="p-8 text-center text-sm font-semibold">Loading mandi prices...</div>;

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      
      {/* Header */}
      <div className="bg-white p-6 sm:p-8 rounded-3xl border border-earth-300 shadow-soft space-y-4">
        <div className="flex justify-between items-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-harvest-100 text-harvest-800 font-bold text-xs">
            <Coins className="w-4 h-4 text-harvest-700" />
            Net-Return Mandi Radar
          </div>
          <span className="text-xs font-bold text-harvest-700 bg-harvest-100 px-2.5 py-0.5 rounded-full">
            {marketData.isDemo ? 'DEMO MARKET DATA' : 'LIVE DATA'}
          </span>
        </div>

        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl sm:text-3xl font-extrabold font-heading text-forest-950">
              Live Mandi Prices & Transport Net-Return
            </h1>
            <p className="text-xs sm:text-sm text-forest-800">
              Calculates transportation cost per quintal for surrounding mandis to reveal true net profit.
            </p>
          </div>

          <div className="shrink-0">
            <select
              value={selectedCrop}
              onChange={(e) => setSelectedCrop(e.target.value)}
              className="px-4 py-2.5 rounded-xl border border-earth-300 font-bold text-sm bg-earth-50 text-forest-950"
            >
              <option value="Wheat">🌾 Wheat (गेहूं)</option>
              <option value="Mustard">🌼 Mustard (सरसों)</option>
              <option value="Paddy">🌾 Paddy (धान)</option>
              <option value="Potato">🥔 Potato (आलू)</option>
            </select>
          </div>
        </div>
      </div>

      {/* AI Recommendation Banner */}
      <div className="p-6 rounded-3xl bg-forest-900 text-earth-50 border border-forest-700 shadow-elevated space-y-3">
        <div className="flex items-center gap-2 text-xs font-bold text-harvest-300">
          <Sparkles className="w-4 h-4 text-harvest-400" />
          OPTIMAL MANDI RECOMMENDATION
        </div>
        <p className="text-base font-bold text-earth-100 font-heading">
          Best Option: {marketData.bestNetReturnMandi}
        </p>
        <p className="text-xs text-forest-200 leading-relaxed">
          "{marketData.aiRecommendation}"
        </p>
      </div>

      {/* Mandi Cards Grid */}
      <div className="space-y-4">
        <h2 className="text-xl font-bold font-heading text-forest-950">Surrounding Mandi Comparison</h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {marketData.prices.map((item: MandiPrice) => (
            <div
              key={item.id}
              className={`p-6 rounded-3xl bg-white border shadow-soft space-y-4 relative ${
                item.mandiName === marketData.bestNetReturnMandi
                  ? 'border-harvest-500 ring-2 ring-harvest-400/40'
                  : 'border-earth-300'
              }`}
            >
              {item.mandiName === marketData.bestNetReturnMandi && (
                <span className="absolute -top-3 right-4 px-3 py-0.5 rounded-full bg-harvest-500 text-forest-950 text-[10px] font-extrabold tracking-wider">
                  TOP NET RETURN
                </span>
              )}

              <div>
                <h3 className="font-extrabold font-heading text-lg text-forest-950">{item.mandiName}</h3>
                <p className="text-xs text-earth-700 flex items-center gap-1">
                  <MapPin className="w-3.5 h-3.5" />
                  {item.district} ({item.distanceKm} km away)
                </p>
              </div>

              <div className="space-y-2 border-y border-earth-200 py-3 text-xs">
                <div className="flex justify-between text-forest-900">
                  <span>Listed Price:</span>
                  <span className="font-bold">₹{item.modalPrice} / qtl</span>
                </div>
                <div className="flex justify-between text-earth-700">
                  <span className="flex items-center gap-1">
                    <Truck className="w-3.5 h-3.5 text-earth-600" />
                    Transport Cost:
                  </span>
                  <span>- ₹{item.estimatedTransportCostPerQtl} / qtl</span>
                </div>
              </div>

              <div className="flex justify-between items-baseline pt-1">
                <span className="text-xs font-bold text-forest-800">Net Return:</span>
                <span className="text-xl font-extrabold font-heading text-emerald-700">
                  ₹{item.netReturnPerQtl} / qtl
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}
