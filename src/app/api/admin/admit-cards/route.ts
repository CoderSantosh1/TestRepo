import { NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/db';
import AdmitCard from '@/lib/models/AdmitCard';

export async function GET() {
  try {
    await connectToDatabase();
    const admitCards = await AdmitCard.find().sort({ createdAt: -1 });
    return NextResponse.json({ success: true, data: admitCards });
  } catch (error) {
    console.error('Error fetching admit cards:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch admit cards' },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    await connectToDatabase();

    const admitCard = new AdmitCard({
      ...body,
      status: 'published',
      createdAt: new Date(),
    });

    await admitCard.save();

    return NextResponse.json(
      { success: true, data: admitCard },
      { status: 201 }
    );
  } catch (error) {
    console.error('Error creating admit card:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to create admit card' },
      { status: 500 }
    );
  }
}

export async function PUT(request: Request) {
  try {
    const url = new URL(request.url);
    const admitCardId = url.pathname.split('/').pop();
    const body = await request.json();

    await connectToDatabase();
    const updatedAdmitCard = await AdmitCard.findByIdAndUpdate(
      admitCardId,
      { ...body, updatedAt: new Date() },
      { new: true }
    );

    if (!updatedAdmitCard) {
      return NextResponse.json(
        { success: false, error: 'Admit card not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, data: updatedAdmitCard });
  } catch (error) {
    console.error('Error updating admit card:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to update admit card' },
      { status: 500 }
    );
  }
}

export async function DELETE(request: Request) {
  try {
    const url = new URL(request.url);
    const admitCardId = url.pathname.split('/').pop();

    await connectToDatabase();
    await AdmitCard.findByIdAndDelete(admitCardId);

    return NextResponse.json(
      { success: true, message: 'Admit card deleted successfully' }
    );
  } catch (error) {
    console.error('Error deleting admit card:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to delete admit card' },
      { status: 500 }
    );
  }
}