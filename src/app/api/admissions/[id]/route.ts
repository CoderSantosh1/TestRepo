import { NextResponse } from 'next/server';
import connectDB from '@/lib/db';
import Admission from '@/lib/models/Admission';

export async function GET(request: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    await connectDB();
    const resolvedParams = await params;
    const admission = await Admission.findById(resolvedParams.id);
    if (!admission) {
      return NextResponse.json({ error: 'Admission not found' }, { status: 404 });
    }
    return NextResponse.json({ data: admission });
  } catch (error) {
    console.error('Error fetching admission:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

export async function PUT(request: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    await connectDB();
    const resolvedParams = await params;
    const data = await request.json();
    const admission = await Admission.findByIdAndUpdate(resolvedParams.id, data, { new: true });
    if (!admission) {
      return NextResponse.json({ error: 'Admission not found' }, { status: 404 });
    }
    return NextResponse.json({ data: admission });
  } catch (error) {
    console.error('Error updating admission:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

export async function DELETE(request: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    await connectDB();
    const resolvedParams = await params;
    const admission = await Admission.findByIdAndDelete(resolvedParams.id);
    if (!admission) {
      return NextResponse.json({ error: 'Admission not found' }, { status: 404 });
    }
    return NextResponse.json({ data: admission });
  } catch (error) {
    console.error('Error deleting admission:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}