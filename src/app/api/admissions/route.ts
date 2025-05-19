import { NextResponse } from 'next/server';
import connectDB from '@/lib/db';
import Admission from '@/lib/models/Admission';

export async function GET() {
  try {
    await connectDB();
    const admissions = await Admission.find().sort({ postedDate: -1 });
    return NextResponse.json({ data: admissions });
  } catch (error) {
    console.error('Error fetching admissions:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    await connectDB();
    const data = await request.json();
    const admission = await Admission.create(data);
    return NextResponse.json({ data: admission }, { status: 201 });
  } catch (error) {
    console.error('Error creating admission:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}