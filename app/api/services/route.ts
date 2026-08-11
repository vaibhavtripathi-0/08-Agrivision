import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const district = searchParams.get('district') || 'Mathura';

  const services = [
    {
      id: 'srv-1',
      name: 'Mathura Principal APMC Mandi',
      category: 'mandi',
      address: 'Near Highway, Mathura, UP',
      district: 'Mathura',
      phone: '+91 98370 11223',
      latitude: 27.4924,
      longitude: 77.6737,
      distanceKm: 8,
      verified: true,
    },
    {
      id: 'srv-2',
      name: 'Raya Kisan Fertilizer & Seed Kendra',
      category: 'seed_fertilizer',
      address: 'Main Market, Raya, Mathura',
      district: 'Mathura',
      phone: '+91 94122 33445',
      latitude: 27.556,
      longitude: 77.789,
      distanceKm: 3.5,
      verified: true,
    },
    {
      id: 'srv-3',
      name: 'Braj Cold Storage & Logistics',
      category: 'cold_storage',
      address: 'Industrial Area, Mathura',
      district: 'Mathura',
      phone: '+91 98971 88990',
      latitude: 27.46,
      longitude: 77.69,
      distanceKm: 12,
      verified: true,
    },
    {
      id: 'srv-4',
      name: 'Yamuna Farmer Producer Organization (FPO)',
      category: 'fpo',
      address: 'Vrindavan Road, Mathura',
      district: 'Mathura',
      phone: '+91 97600 55443',
      latitude: 27.52,
      longitude: 77.68,
      distanceKm: 6.2,
      verified: true,
    },
    {
      id: 'srv-5',
      name: 'Krishi Vigyan Kendra (KVK) Mathura',
      category: 'krishi_kendra',
      address: 'Veterinary University Campus, Mathura',
      district: 'Mathura',
      phone: '+91 565 240011',
      latitude: 27.48,
      longitude: 77.66,
      distanceKm: 9.4,
      verified: true,
    },
  ];

  return NextResponse.json({
    success: true,
    services,
  });
}
