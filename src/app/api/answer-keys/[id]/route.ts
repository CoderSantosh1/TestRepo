import { NextResponse } from 'next/server';
import { connectToDatabase as connectDB } from '@/lib/db';
import Job from '@/lib/models/AnswerKey';

export const dynamic = 'force-dynamic';

export async function GET(
  _request: Request,
  context: { params: Promise<{ id: string }> }
) {
  try {
    await connectDB();

    const { id: answerKeyId } = await context.params;
    if (!answerKeyId) {
      return NextResponse.json(
        { success: false, error: 'answer key id is required' },
        { status: 400 }
      );
    }

    const answerKey = await Job.findById(answerKeyId);

    if (!answerKey) {
      return NextResponse.json(
        { success: false, error: 'answer key not  found' },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { success: true, data: answerKey},
      { status: 200 }
    );
  } catch (error) {
    console.error('Error in GET /api/answer-keys/[id]:', error);
    
    if (error instanceof Error && error.name === 'CastError') {
      return NextResponse.json(
        { success: false, error: 'Invalid answerkey ID format' },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { success: false, error: 'Failed to fetch answerkey details' },
      { status: 500 }
    );
  }
}

export async function PUT(
  request: Request,
  context: { params: Promise<{ id: string }> }
) {
  try {
    await connectDB();

    const { id: answerKeyId } = await context.params;
    if (!answerKeyId) {
      return NextResponse.json(
        { success: false, error: 'Job ID is required' },
        { status: 400 }
      );
    }

    const data = await request.json();
    const answerKey = await Job.findByIdAndUpdate(answerKeyId, data, { new: true });

    if (!answerKey) {
      return NextResponse.json(
        { success: false, error: 'answer key  not found' },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { success: true, data: answerKey },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error in PUT /api/answer-keys/[id]::', error);
    return NextResponse.json(
      { success: false, error: 'Failed to update answer key' },
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

    const { id: answerKeyId } = await context.params;
    if (!answerKeyId) {
      return NextResponse.json(
        { success: false, error: 'answerkey ID is required' },
        { status: 400 }
      );
    }

    const answerKey = await Job.findByIdAndDelete(answerKeyId);

    if (!answerKey) {
      return NextResponse.json(
        { success: false, error: 'answerkey not found' },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { success: true, message: 'Answerkey deleted successfully' },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error in DELETE /api/answer-key/[id]:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to delete answerkey' },
      { status: 500 }
    );
  }
}