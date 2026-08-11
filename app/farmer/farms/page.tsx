'use client';

import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { MapPin, Plus, Sprout, Droplets, FlaskConical, Check, X, Building2 } from 'lucide-react';

const farmFormSchema = z.object({
  name: z.string().min(2, 'Farm name must be at least 2 characters'),
  state: z.string().min(2, 'State is required'),
  district: z.string().min(2, 'District is required'),
  village: z.string().optional(),
  totalAreaAcres: z.number().positive('Area must be greater than 0'),
  surveyNumber: z.string().optional(),
});

type FarmFormData = z.infer<typeof farmFormSchema>;

export default function FarmerFarmsPage() {
  const [farms, setFarms] = useState<any[]>([]);
  const [fields, setFields] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [isAddFarmOpen, setIsAddFarmOpen] = useState(false);
  const [isAddFieldOpen, setIsAddFieldOpen] = useState(false);
  const [selectedFarmId, setSelectedFarmId] = useState<string>('');

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<FarmFormData>({
    resolver: zodResolver(farmFormSchema),
    defaultValues: {
      name: '',
      state: 'Uttar Pradesh',
      district: 'Mathura',
      village: 'Raya Village',
      totalAreaAcres: 2.0,
      surveyNumber: '',
    },
  });

  const fetchFarmsAndFields = async () => {
    setLoading(true);
    try {
      const resFarms = await fetch('/api/farms');
      const dataFarms = await resFarms.json();
      if (dataFarms.farms) setFarms(dataFarms.farms);

      const resFields = await fetch('/api/fields');
      const dataFields = await resFields.json();
      if (dataFields.fields) setFields(dataFields.fields);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFarmsAndFields();
  }, []);

  const onAddFarmSubmit = async (data: FarmFormData) => {
    try {
      const res = await fetch('/api/farms', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      const result = await res.json();
      if (result.success) {
        setIsAddFarmOpen(false);
        reset();
        fetchFarmsAndFields();
      }
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div className="max-w-5xl mx-auto space-y-8">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 sm:p-8 rounded-3xl border border-earth-300 shadow-soft">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-forest-100 text-forest-800 font-bold text-xs mb-2">
            <Building2 className="w-4 h-4 text-forest-700" />
            Land & Soil Registry
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold font-heading text-forest-950">
            My Farms & Fields
          </h1>
          <p className="text-xs sm:text-sm text-forest-800">
            Manage your agricultural land boundaries, soil pH, NPK levels, and crop cycles.
          </p>
        </div>

        <button
          onClick={() => setIsAddFarmOpen(true)}
          className="px-6 py-3.5 rounded-2xl bg-forest-800 text-harvest-100 font-bold text-sm hover:bg-forest-900 shadow-soft transition-all flex items-center justify-center gap-2 shrink-0"
        >
          <Plus className="w-5 h-5" />
          <span>Add New Farm</span>
        </button>
      </div>

      {/* Farms List */}
      <div className="space-y-6">
        {loading ? (
          <div className="p-8 text-center text-sm font-semibold text-earth-700">Loading farm records...</div>
        ) : farms.length === 0 ? (
          <div className="p-12 text-center bg-white rounded-3xl border border-earth-300 space-y-4">
            <Sprout className="w-12 h-12 text-forest-600 mx-auto" />
            <h3 className="text-lg font-bold text-forest-950">No Farms Registered Yet</h3>
            <p className="text-xs text-earth-700 max-w-sm mx-auto">
              Add your first farm to unlock personalized weather advice, disease diagnostics, and mandi price recommendations.
            </p>
            <button
              onClick={() => setIsAddFarmOpen(true)}
              className="px-6 py-3 rounded-2xl bg-forest-800 text-harvest-100 font-bold text-xs"
            >
              + Add First Farm
            </button>
          </div>
        ) : (
          farms.map((farm) => {
            const farmFields = fields.filter((f) => f.farmId === farm.id || farm.id === 'farm-101');

            return (
              <div key={farm.id} className="p-6 sm:p-8 rounded-3xl bg-white border border-earth-300 shadow-soft space-y-6">
                
                {/* Farm Info */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-earth-200 pb-4">
                  <div className="space-y-1">
                    <h2 className="text-xl font-bold font-heading text-forest-950 flex items-center gap-2">
                      {farm.name}
                      <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-forest-100 text-forest-800">
                        {farm.totalAreaAcres} Acres
                      </span>
                    </h2>
                    <p className="text-xs text-earth-700 flex items-center gap-1">
                      <MapPin className="w-3.5 h-3.5" />
                      {farm.village ? `${farm.village}, ` : ''}{farm.district}, {farm.state}
                      {farm.surveyNumber && <span className="ml-2 font-mono">({farm.surveyNumber})</span>}
                    </p>
                  </div>

                  <button
                    onClick={() => {
                      setSelectedFarmId(farm.id);
                      setIsAddFieldOpen(true);
                    }}
                    className="px-4 py-2 rounded-xl bg-earth-100 hover:bg-earth-200 text-forest-900 font-bold text-xs border border-earth-300 shrink-0"
                  >
                    + Add Field Plot
                  </button>
                </div>

                {/* Sub-Fields Grid */}
                <div className="space-y-3">
                  <h3 className="text-xs font-bold text-forest-800 uppercase tracking-wider">
                    Associated Field Plots ({farmFields.length})
                  </h3>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {farmFields.map((field) => (
                      <div key={field.id} className="p-4 rounded-2xl bg-earth-50 border border-earth-300 space-y-3">
                        <div className="flex justify-between items-center">
                          <h4 className="font-bold font-heading text-forest-950 text-sm">{field.name}</h4>
                          <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-harvest-100 text-harvest-800">
                            {field.areaAcres} Acres
                          </span>
                        </div>

                        <div className="grid grid-cols-2 gap-2 text-xs text-forest-900 border-y border-earth-200 py-2">
                          <div>
                            <span className="text-earth-700">Soil Type:</span> <span className="font-bold">{field.soilType}</span>
                          </div>
                          <div>
                            <span className="text-earth-700">pH Level:</span> <span className="font-bold">{field.soilPh}</span>
                          </div>
                          <div>
                            <span className="text-earth-700">Irrigation:</span> <span className="font-bold">{field.irrigationType}</span>
                          </div>
                          <div>
                            <span className="text-earth-700">NPK:</span> <span className="font-bold">{field.nitrogenPpm}/{field.phosphorusPpm}/{field.potassiumPpm}</span>
                          </div>
                        </div>

                      </div>
                    ))}
                  </div>
                </div>

              </div>
            );
          })
        )}
      </div>

      {/* Add Farm Modal Dialog */}
      {isAddFarmOpen && (
        <div className="fixed inset-0 bg-forest-950/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="w-full max-w-md bg-white rounded-3xl p-6 sm:p-8 border border-earth-300 shadow-elevated space-y-6">
            
            <div className="flex justify-between items-center border-b border-earth-200 pb-3">
              <h3 className="text-lg font-bold font-heading text-forest-950">Add New Farm Profile</h3>
              <button onClick={() => setIsAddFarmOpen(false)} className="p-1 rounded-lg text-earth-700 hover:bg-earth-100">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSubmit(onAddFarmSubmit)} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-forest-900 mb-1">Farm Name</label>
                <input
                  {...register('name')}
                  placeholder="e.g. Mathura South Field"
                  className="w-full px-3 py-2.5 rounded-xl border border-earth-300 text-sm focus:outline-none focus:ring-2 focus:ring-forest-600 bg-earth-50/50"
                />
                {errors.name && <p className="text-[11px] text-red-600 mt-1">{errors.name.message}</p>}
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-forest-900 mb-1">State</label>
                  <input
                    {...register('state')}
                    className="w-full px-3 py-2.5 rounded-xl border border-earth-300 text-sm bg-earth-50/50"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-forest-900 mb-1">District</label>
                  <input
                    {...register('district')}
                    className="w-full px-3 py-2.5 rounded-xl border border-earth-300 text-sm bg-earth-50/50"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-forest-900 mb-1">Village / City</label>
                  <input
                    {...register('village')}
                    placeholder="Raya"
                    className="w-full px-3 py-2.5 rounded-xl border border-earth-300 text-sm bg-earth-50/50"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-forest-900 mb-1">Total Area (Acres)</label>
                  <input
                    type="number"
                    step="0.1"
                    {...register('totalAreaAcres', { valueAsNumber: true })}
                    className="w-full px-3 py-2.5 rounded-xl border border-earth-300 text-sm bg-earth-50/50"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-forest-900 mb-1">Survey / Khasra Number (Optional)</label>
                <input
                  {...register('surveyNumber')}
                  placeholder="Khasra 442/A"
                  className="w-full px-3 py-2.5 rounded-xl border border-earth-300 text-sm bg-earth-50/50"
                />
              </div>

              <div className="pt-2 flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setIsAddFarmOpen(false)}
                  className="px-4 py-2.5 rounded-xl border border-earth-300 text-forest-900 font-semibold text-xs"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="px-5 py-2.5 rounded-xl bg-forest-800 text-harvest-100 font-bold text-xs shadow-soft"
                >
                  {isSubmitting ? 'Saving...' : 'Save Farm'}
                </button>
              </div>
            </form>

          </div>
        </div>
      )}

    </div>
  );
}
