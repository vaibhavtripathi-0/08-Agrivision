import { NextResponse } from 'next/server';
import { z } from 'zod';

const fieldSchema = z.object({
  farmId: z.string(),
  name: z.string().min(2),
  areaAcres: z.number().positive(),
  soilType: z.string(),
  soilPh: z.number().min(3).max(11),
  nitrogenPpm: z.number(),
  phosphorusPpm: z.number(),
  potassiumPpm: z.number(),
  irrigationType: z.string(),
});

let demoFields = [
  {
    id: 'field-201',
    farmId: 'farm-101',
    name: 'Wheat Plot #1',
    areaAcres: 2.0,
    soilType: 'Loamy',
    soilPh: 6.8,
    nitrogenPpm: 140.0,
    phosphorusPpm: 35.0,
    potassiumPpm: 180.0,
    irrigationType: 'Canal / Drip',
    createdAt: new Date().toISOString(),
  },
];

export async function GET() {
  return NextResponse.json({
    success: true,
    fields: demoFields,
    isDemo: true,
  });
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const validatedData = fieldSchema.parse(body);

    const newField = {
      id: `field-${Date.now()}`,
      ...validatedData,
      createdAt: new Date().toISOString(),
    };

    demoFields.push(newField);

    return NextResponse.json({
      success: true,
      field: newField,
      message: 'Field added successfully to farm',
    });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.errors || error.message },
      { status: 400 }
    );
  }
}
