
import { NextResponse } from 'next/server';
import { connectToDatabase as connectDB } from '@/lib/db';
import Result from '@/lib/models/Result';
import mongoose from 'mongoose';

export const dynamic = 'force-dynamic';

export async function GET(
  _request: Request,
  context: { params: Promise<{ id: string }> }
) {
  try {
    await connectDB();

    const { id: resultId } = await context.params;
    if (!resultId || !mongoose.Types.ObjectId.isValid(resultId)) {
      return NextResponse.json(
        { success: false, error: 'Invalid result ID' },
        { status: 400 }
      );
    }

    const result = await Result.findById(resultId);

    if (!result) {
      return NextResponse.json(
        { success: false, error: 'Result not found' },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { success: true, data: result },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error in GET /api/results/[id]:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch result details' },
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

    const { id: resultId } = await context.params;
    if (!resultId || !mongoose.Types.ObjectId.isValid(resultId)) {
      return NextResponse.json(
        { success: false, error: 'Invalid result ID' },
        { status: 400 }
      );
    }

    const result = await Result.findByIdAndDelete(resultId);

    if (!result) {
      return NextResponse.json(
        { success: false, error: 'Result not found' },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { success: true, message: 'Result deleted successfully' },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error in DELETE /api/results/[id]:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to delete result' },
      { status: 500 }
    );
  }
}

export async function PUT(request: Request, context: { params: Promise<{ id: string }> }) {
  try {
    const body = await request.json();
    await connectDB();

    const { id: resultId } = await context.params;
    if (!resultId || !mongoose.Types.ObjectId.isValid(resultId)) {
      return NextResponse.json(
        { success: false, error: 'Invalid result ID' },
        { status: 400 }
      );
    }

    const updatedResult = await Result.findByIdAndUpdate(resultId, body, { new: true });

    if (!updatedResult) {
      return NextResponse.json(
        { success: false, error: 'Result not found' },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { success: true, data: updatedResult },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error in PUT /api/results/[id]:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to update result' },
      { status: 500 }
    );
  }
}

