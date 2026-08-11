'use client';

import React, { useState, useEffect } from 'react';
import { Store, MapPin, Phone, CheckCircle2, Navigation, Filter } from 'lucide-react';

export default function ServicesPage() {
  const [services, setServices] = useState<any[]>([]);
  const [filterCategory, setFilterCategory] = useState<string>('all');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/services?district=Mathura')
      .then((res) => res.json())
      .then((data) => {
        if (data.services) setServices(data.services);
        setLoading(false);
      });
  }, []);

  const categories = [
    { key: 'all', label: 'All Services' },
    { key: 'mandi', label: 'APMC Mandis' },
    { key: 'seed_fertilizer', label: 'Seed & Fertilizer' },
    { key: 'cold_storage', label: 'Cold Storage' },
    { key: 'fpo', label: 'FPO Collectives' },
    { key: 'krishi_kendra', label: 'Krishi Kendras (KVK)' },
  ];

  const filteredServices = filterCategory === 'all'
    ? services
    : services.filter((s) => s.category === filterCategory);

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      
      {/* Header */}
      <div className="bg-white p-6 sm:p-8 rounded-3xl border border-earth-300 shadow-soft space-y-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-harvest-100 text-harvest-800 font-bold text-xs mb-2">
            <Store className="w-4 h-4 text-harvest-700" />
            Rural Agri Ecosystem Radar
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold font-heading text-forest-950">
            Nearby Agricultural Services
          </h1>
          <p className="text-xs sm:text-sm text-forest-800">
            Find verified Mandis, FPO centers, Cold Storages, Fertilizer Outlets & Krishi Vigyan Kendras near your farm.
          </p>
        </div>

        {/* Filter Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 text-xs no-scrollbar">
          {categories.map((cat) => (
            <button
              key={cat.key}
              onClick={() => setFilterCategory(cat.key)}
              className={`px-4 py-2 rounded-xl font-bold whitespace-nowrap transition-all ${
                filterCategory === cat.key
                  ? 'bg-forest-800 text-harvest-100 shadow-soft'
                  : 'bg-earth-100 text-forest-900 border border-earth-300 hover:bg-earth-200'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </div>

      {/* Main Map + List Split */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Interactive Map Simulator Box */}
        <div className="lg:col-span-6 sticky top-24 rounded-3xl bg-forest-900 text-earth-50 p-6 border border-forest-700 shadow-elevated space-y-4">
          <div className="flex justify-between items-center border-b border-forest-800 pb-3">
            <div className="flex items-center gap-2">
              <Navigation className="w-4 h-4 text-harvest-400" />
              <span className="text-xs font-bold text-earth-100">Mathura District GIS Map</span>
            </div>
            <span className="text-[10px] bg-forest-800 text-harvest-300 px-2.5 py-0.5 rounded-full font-bold">
              GPS RADAR ACTIVE
            </span>
          </div>

          <div className="relative h-72 rounded-2xl bg-forest-950 border border-forest-800 overflow-hidden flex items-center justify-center">
            {/* Visual GIS Grid Representation */}
            <div className="absolute inset-0 opacity-20 bg-[radial-gradient(#345D44_1px,transparent_1px)] [background-size:16px_16px]"></div>

            {/* Farm Pins */}
            <div className="relative z-10 text-center space-y-3 p-4">
              <div className="w-10 h-10 rounded-full bg-harvest-400 text-forest-950 font-bold flex items-center justify-center mx-auto shadow-glow-green animate-bounce">
                📍
              </div>
              <p className="text-xs font-bold text-earth-100 font-heading">
                Your Farm: Mathura Field #1
              </p>
              <p className="text-[11px] text-forest-300">
                Found {filteredServices.length} verified services within 15 km
              </p>
            </div>
          </div>
        </div>

        {/* Right Services List */}
        <div className="lg:col-span-6 space-y-4">
          {loading ? (
            <div className="p-8 text-center text-sm font-semibold">Loading nearby services...</div>
          ) : (
            filteredServices.map((service) => (
              <div
                key={service.id}
                className="p-6 rounded-3xl bg-white border border-earth-300 shadow-soft hover:shadow-elevated transition-all space-y-3"
              >
                <div className="flex justify-between items-start">
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="font-extrabold font-heading text-forest-950 text-base">{service.name}</h3>
                      {service.verified && (
                        <span title="Verified Service">
                          <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-earth-700 flex items-center gap-1 mt-0.5">
                      <MapPin className="w-3.5 h-3.5 text-earth-600" />
                      {service.address}
                    </p>
                  </div>

                  <span className="text-xs font-extrabold text-forest-900 bg-forest-100 px-3 py-1 rounded-full shrink-0">
                    {service.distanceKm} km
                  </span>
                </div>

                <div className="flex items-center justify-between border-t border-earth-200 pt-3 text-xs">
                  <div className="flex items-center gap-1.5 text-forest-800 font-semibold">
                    <Phone className="w-3.5 h-3.5" />
                    <span>{service.phone}</span>
                  </div>

                  <a
                    href={`https://maps.google.com/?q=${service.latitude},${service.longitude}`}
                    target="_blank"
                    rel="noreferrer"
                    className="text-xs font-bold text-forest-800 hover:underline flex items-center gap-1"
                  >
                    <span>Get Directions</span>
                    <Navigation className="w-3 h-3" />
                  </a>
                </div>
              </div>
            ))
          )}
        </div>

      </div>

    </div>
  );
}
