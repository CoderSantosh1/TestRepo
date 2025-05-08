import { NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/db';
import AdmitCard from '@/lib/models/AdmitCard';

export async function GET() {
  try {
    await connectToDatabase();
    const AdmitCards = await AdmitCard.find().sort({ createdAt: -1 });
    return NextResponse.json({ success: true, data: AdmitCards });
  } catch (error) {
    console.error('Error fetching AdmitCards:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch AdmitCards' },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    await connectToDatabase();

    const newAdmitCard = new AdmitCard({
      ...body,
      status: 'published',
      createdAt: new Date(),
    });
    console.log(body.downloadAdmitcardLink)
    await newAdmitCard.save();

    return NextResponse.json(
      { success: true, data: newAdmitCard },
      { status: 201 }
    );
  } catch (error) {
    console.error('Error creating AdmitCard:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to create AdmitCard' },
      { status: 500 }
    );
  }
}