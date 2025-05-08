import { NextResponse } from 'next/server';
import { connectToDatabase as connectDB } from '@/lib/db';
import AdmitCard from '@/lib/models/AdmitCard';
import mongoose from 'mongoose';
import { log } from 'console';

export const dynamic = 'force-dynamic';

export async function GET(
  _request: Request,
  context: { params: Promise<{ id: string }> }
) {
  try {
    await connectDB();

    const { id: admitCardId } = await context.params;
    if (!admitCardId || !mongoose.Types.ObjectId.isValid(admitCardId)) {
      return NextResponse.json(
        { success: false, error: 'Invalid admit card ID' },
        { status: 400 }
      );
    }
    
    const admitCard = await AdmitCard.findById(admitCardId);
   
    if (!admitCard) {
      return NextResponse.json(
        { success: false, error: 'Admit card not found' },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { success: true, data: admitCard },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error in GET /api/admit-cards/[id]:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch admit card' },
      { status: 500 }
    );
  }
}

export async function DELETE(
  _request: Request,
  context: { params: Promise<{ id: string }> }
) {
  try {
    await connectDB();

    const { id: admitCardId } = await context.params;
    if (!admitCardId || !mongoose.Types.ObjectId.isValid(admitCardId)) {
      return NextResponse.json(
        { success: false, error: 'Invalid admit card ID' },
        { status: 400 }
      );
    }

    const admitCard = await AdmitCard.findByIdAndDelete(admitCardId);
    
    if (!admitCard) {
      return NextResponse.json(
        { success: false, error: 'Admit card not found' },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { success: true, message: 'Admit card deleted successfully' },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error in DELETE /api/admit-cards/[id]:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to delete admit card' },
      { status: 500 }
    );
  }
}

export async function PUT(request: Request, context: { params: Promise<{ id: string }> }) {
  try {
    const body = await request.json();
    await connectDB();

    const { id: admitCardId } = await context.params;
    if (!admitCardId || !mongoose.Types.ObjectId.isValid(admitCardId)) {
      return NextResponse.json(
        { success: false, error: 'Invalid admit card ID as it is' },
        { status: 400 }
      );
    }

    const updatedAdmitCard = await AdmitCard.findByIdAndUpdate(admitCardId, body, { new: true });

    if (!updatedAdmitCard) {
      return NextResponse.json(
        { success: false, error: 'Admit card not found' },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { success: true, data: updatedAdmitCard },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error in PUT /api/admit-cards/[id]:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to update admit card' },
      { status: 500 }
    );
  }
}