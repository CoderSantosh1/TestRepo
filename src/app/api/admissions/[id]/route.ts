import { NextResponse } from 'next/server';
import { connectToDatabase as connectDB } from '@/lib/db';
import Admission from '@/lib/models/Admission'; // Assuming Admission model exists
import mongoose from 'mongoose';

export async function GET(request: Request, context: { params: Promise<{ id: string }> }) {
  try {
    await connectDB();
    const { id } = await context.params;
    console.log(`GET /api/admissions/${id} hit`);

    if (!id || !mongoose.Types.ObjectId.isValid(id)) {
      console.log(`Invalid admission ID: ${id}`);
      return NextResponse.json(
        { success: false, error: 'Invalid admission ID' },
        { status: 400 }
      );
    }

    const admission = await Admission.findById(id);

    if (!admission) {
      console.log(`Admission with ID ${id} not found`);
      return NextResponse.json(
        { success: false, error: 'Admission not found' },
        { status: 404 }
      );
    }

    console.log('Fetched admission:', admission);
    return NextResponse.json({ success: true, data: admission });
  } catch (error) {
    console.error(`Error in GET /api/admissions/:id:`, error);
    return NextResponse.json(
      { success: false, error: error instanceof Error ? error.message : 'Failed to fetch admission' },
      { status: 500 }
    );
  }
}


export async function PUT(request: Request, context: { params: Promise<{ id: string }> }) {
  try {
    const body = await request.json();
    await connectDB();

    const { id: admissionId } = await context.params;
    if (!admissionId || !mongoose.Types.ObjectId.isValid(admissionId)) {
      return NextResponse.json(
        { success: false, error: 'Invalid admission ID' },
        { status: 400 }
      );
    }

    const updatedAdmission = await Admission.findByIdAndUpdate(admissionId, body, { new: true });

    if (!updatedAdmission) {
      return NextResponse.json(
        { success: false, error: 'Admission not found' },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { success: true, data: updatedAdmission },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error in PUT /api/admissions/[id]:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to update admission' },
      { status: 500 }
    );
  }
}

export async function DELETE(_request: Request, context: { params: Promise<{ id: string }> }) {
  try {
    await connectDB();

    const { id: admissionId } = await context.params;
    if (!admissionId || !mongoose.Types.ObjectId.isValid(admissionId)) {
      return NextResponse.json(
        { success: false, error: 'Invalid admission ID' },
        { status: 400 }
      );
    }

    const deletedAdmission = await Admission.findByIdAndDelete(admissionId);

    if (!deletedAdmission) {
      return NextResponse.json(
        { success: false, error: 'Admission not found' },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { success: true, data: deletedAdmission },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error in DELETE /api/admissions/[id]:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to delete admission' },
      { status: 500 }
    );
  }
}