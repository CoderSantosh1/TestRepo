import { NextResponse } from 'next/server';
import connectDB from '@/lib/db';
import AdmitCard from '@/lib/models/AdmitCard';

export async function POST(request: Request) {
  try {
    await connectDB();
    
    const body = await request.json();
    
    const admitCard = await AdmitCard.create({
      title: body.title,
      organization: body.organization,
      examDate: new Date(body.examDate),
      downloadStartDate: new Date(body.downloadStartDate),
      downloadEndDate: body.downloadEndDate ? new Date(body.downloadEndDate) : undefined,
      category: body.category,
      downloadLink: body.downloadLink,
      instructions: body.instructions,
      status: 'published'
    });

    return NextResponse.json({ success: true, data: admitCard }, { status: 201 });
  } catch (error) {
    console.error('Error in POST /api/admit-cards:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to create admit card posting' },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    await connectDB();
    
    const admitCards = await AdmitCard.find({ status: 'published' })
      .sort({ downloadStartDate: -1 });

    return NextResponse.json({ success: true, data: admitCards });
  } catch (error) {
    console.error('Error in GET /api/admit-cards:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch admit cards' },
      { status: 500 }
    );
  }
}