import { NextResponse } from 'next/server';

export async function GET() {
  const cropCatalog = [
    {
      id: 'crop-1',
      nameEn: 'Wheat',
      nameHi: 'गेहूं',
      category: 'Cereal',
      durationDays: 120,
      idealSoilPhMin: 6.0,
      idealSoilPhMax: 7.5,
      waterReqMm: 450,
      suitabilityScore: 92,
      reasoning: [
        'Soil pH (6.8) is in optimal range',
        'Nitrogen level (140 ppm) supports strong vegetative growth',
        'High local demand in Mathura & Agra Mandis',
      ],
    },
    {
      id: 'crop-2',
      nameEn: 'Mustard',
      nameHi: 'सरसों',
      category: 'Oilseed',
      durationDays: 110,
      idealSoilPhMin: 6.0,
      idealSoilPhMax: 8.0,
      waterReqMm: 300,
      suitabilityScore: 88,
      reasoning: [
        'Low water requirement saves irrigation costs',
        'Suitable for winter sowing in North India',
      ],
    },
    {
      id: 'crop-3',
      nameEn: 'Potato',
      nameHi: 'आलू',
      category: 'Tuber',
      durationDays: 90,
      idealSoilPhMin: 5.5,
      idealSoilPhMax: 6.5,
      waterReqMm: 500,
      suitabilityScore: 75,
      reasoning: [
        'High return potential but requires well-drained soil & cold storage access',
      ],
    },
  ];

  return NextResponse.json({
    success: true,
    crops: cropCatalog,
  });
}
