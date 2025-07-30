import { NextResponse } from 'next/server';
import { connectToDatabase as connectDB } from '@/lib/db';
import Admission from '@/lib/models/Admission'; // Assuming Admission model exists

export async function GET() {
  try {
    await connectDB();
    console.log('GET /api/admissions hit');
    const admissions = await Admission.find({}).sort({ createdAt: -1 });
    console.log('Fetched admissions:', admissions.length);
    return NextResponse.json({ success: true, data: admissions });
  } catch (error) {
    console.error('Error in GET /api/admissions:', error);
    return NextResponse.json(
      { success: false, error: error instanceof Error ? error.message : 'Failed to fetch admissions' },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    await connectDB();
    console.log('POST /api/admissions hit');
    const body = await request.json();
    console.log('Request body:', body);
    const admission = await Admission.create({
      ...body,
      status: body.status || 'published', // Default status to published if not provided
      createdAt: new Date(),
    });
    console.log('Created admission:', admission);
   
    return NextResponse.json({ success: true, data: admission }, { status: 201 });
  } catch (error) {
    console.error('Error in POST /api/admissions:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to create admission posting' },
      { status: 500 }
    );
  }
}