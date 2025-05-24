import { NextResponse } from 'next/server';
import connectDB from '@/lib/db';
import AnswerKey from '@/lib/models/AnswerKey';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    await connectDB();

    const answerKeys = await AnswerKey.find()
      .sort({ postedDate: -1 });

    if (!answerKeys || answerKeys.length === 0) {
      return NextResponse.json(
        { success: false, error: 'No answer keys found' },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { success: true, data: answerKeys },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error in GET /api/answer-keys:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch answer keys' },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    await connectDB();

    const body = await request.json();

    if (!body.content || typeof body.content !== 'string') {
      return NextResponse.json(
        { success: false, error: 'Content is required and must be a string' },
        { status: 400 }
      );
    }

    const answerKey = await AnswerKey.create(body);

    return NextResponse.json(
      { success: true, data: answerKey },
      { status: 201 }
    );
  } catch (error) {
    console.error('Error in POST /api/answer-keys:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to create answer key' },
      { status: 500 }
    );
  }
}
