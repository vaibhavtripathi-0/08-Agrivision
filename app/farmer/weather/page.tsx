'use client';

import React, { useState, useEffect } from 'react';
import { WeatherService, WeatherData } from '@/lib/services/weather';
import { CloudRain, Sun, Wind, Droplets, Sparkles, MapPin } from 'lucide-react';

export default function WeatherAdvicePage() {
  const [weather, setWeather] = useState<WeatherData | null>(null);

  useEffect(() => {
    WeatherService.getDistrictWeather('Mathura').then(setWeather);
  }, []);

  if (!weather) return <div className="p-8 text-center text-sm font-semibold">Loading weather radar...</div>;

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      
      {/* Header */}
      <div className="bg-white p-6 sm:p-8 rounded-3xl border border-earth-300 shadow-soft space-y-2">
        <div className="flex justify-between items-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-forest-100 text-forest-800 font-bold text-xs">
            <CloudRain className="w-4 h-4 text-forest-700" />
            Satellite Micro-Climate Radar
          </div>
          <span className="text-xs font-bold text-harvest-700 bg-harvest-100 px-2.5 py-0.5 rounded-full">
            {weather.isDemo ? 'DEMO WEATHER DATA' : 'LIVE DATA'}
          </span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold font-heading text-forest-950">
          Weather & Irrigation Advisor
        </h1>
        <p className="text-xs sm:text-sm text-forest-800">
          Hyper-local weather forecasts translated directly into field-level irrigation decisions.
        </p>
      </div>

      {/* Main Weather Overview Card */}
      <div className="p-8 rounded-3xl bg-forest-900 text-earth-50 border border-forest-700 shadow-elevated space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 border-b border-forest-800 pb-6">
          
          <div className="space-y-1">
            <p className="text-xs text-forest-300 font-semibold uppercase tracking-wider flex items-center gap-1.5">
              <MapPin className="w-4 h-4 text-harvest-400" />
              {weather.district}, {weather.state}
            </p>
            <div className="flex items-baseline gap-3">
              <span className="text-5xl font-extrabold font-heading text-earth-100">{weather.temperatureC}°C</span>
              <span className="text-sm font-semibold text-harvest-300">{weather.condition}</span>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-4 text-center sm:text-right">
            <div>
              <p className="text-xs text-forest-300 font-medium">Humidity</p>
              <p className="text-lg font-bold font-heading text-earth-100">{weather.humidityPct}%</p>
            </div>
            <div>
              <p className="text-xs text-forest-300 font-medium">Wind Speed</p>
              <p className="text-lg font-bold font-heading text-earth-100">{weather.windKmh} km/h</p>
            </div>
            <div>
              <p className="text-xs text-forest-300 font-medium">Rain Chance</p>
              <p className="text-lg font-bold font-heading text-harvest-300">{weather.rainProbabilityPct}%</p>
            </div>
          </div>

        </div>

        {/* AI Action Box */}
        <div className="p-5 rounded-2xl bg-forest-800 border border-forest-700 space-y-2">
          <div className="flex items-center gap-2 text-xs font-bold text-harvest-300">
            <Sparkles className="w-4 h-4 text-harvest-400" />
            AI IRRIGATION RECOMMENDATION
          </div>
          <p className="text-sm text-earth-100 font-medium leading-relaxed">
            "{weather.irrigationRecommendation}"
          </p>
        </div>
      </div>

      {/* 5-Day Forecast Grid */}
      <div className="space-y-4">
        <h2 className="text-xl font-bold font-heading text-forest-950">5-Day Regional Forecast</h2>
        
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-4">
          {weather.forecast.map((day, idx) => (
            <div key={idx} className="p-4 rounded-2xl bg-white border border-earth-300 text-center space-y-2 shadow-soft">
              <p className="text-xs font-bold text-forest-900">{day.day}</p>
              <p className="text-base font-extrabold font-heading text-forest-950">{day.tempHigh}° / {day.tempLow}°</p>
              <div className="text-[11px] text-earth-700 font-semibold">🌧 {day.rainChancePct}% Rain</div>
              <p className="text-[10px] text-forest-700 truncate">{day.condition}</p>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}
