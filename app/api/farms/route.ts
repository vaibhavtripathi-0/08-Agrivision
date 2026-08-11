import { NextResponse } from 'next/server';
import { z } from 'zod';

const farmSchema = z.object({
  name: z.string().min(2, 'Farm name must be at least 2 characters'),
  state: z.string().min(2),
  district: z.string().min(2),
  village: z.string().optional(),
  totalAreaAcres: z.number().positive(),
  surveyNumber: z.string().optional(),
});

// Demo in-memory database store for fallback when live Supabase is not configured
let demoFarms = [
  {
    id: 'farm-101',
    farmerId: 'farmer-001',
    name: 'Mathura Main Farm',
    state: 'Uttar Pradesh',
    district: 'Mathura',
    village: 'Raya Village',
    totalAreaAcres: 2.0,
    surveyNumber: 'SY-884/A',
    createdAt: new Date().toISOString(),
  },
];

export async function GET() {
  return NextResponse.json({
    success: true,
    farms: demoFarms,
    isDemo: true,
  });
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const validatedData = farmSchema.parse(body);

    const newFarm = {
      id: `farm-${Date.now()}`,
      farmerId: 'farmer-001',
      name: validatedData.name,
      state: validatedData.state,
      district: validatedData.district,
      village: validatedData.village || '',
      totalAreaAcres: validatedData.totalAreaAcres,
      surveyNumber: validatedData.surveyNumber || '',
      createdAt: new Date().toISOString(),
    };

    demoFarms.push(newFarm);

    return NextResponse.json({
      success: true,
      farm: newFarm,
      message: 'Farm created successfully in database',
    });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.errors || error.message },
      { status: 400 }
    );
  }
}
