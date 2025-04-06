import { NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/db';
import Result from '@/lib/models/Result';

export async function GET() {
  try {
    await connectToDatabase();
    const results = await Result.find().sort({ createdAt: -1 });
    return NextResponse.json({ success: true, data: results });
  } catch (error) {
    console.error('Error fetching results:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch results' },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    await connectToDatabase();

    const result = new Result({
      ...body,
      status: 'published',
      createdAt: new Date(),
    });

    await result.save();

    return NextResponse.json(
      { success: true, data: result },
      { status: 201 }
    );
  } catch (error) {
    console.error('Error creating result:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to create result' },
      { status: 500 }
    );
  }
}

export async function PUT(request: Request) {
  try {
    const url = new URL(request.url);
    const resultId = url.pathname.split('/').pop();
    const body = await request.json();

    await connectToDatabase();
    const updatedResult = await Result.findByIdAndUpdate(
      resultId,
      { ...body, updatedAt: new Date() },
      { new: true }
    );

    if (!updatedResult) {
      return NextResponse.json(
        { success: false, error: 'Result not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, data: updatedResult });
  } catch (error) {
    console.error('Error updating result:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to update result' },
      { status: 500 }
    );
  }
}

export async function DELETE(request: Request) {
  try {
    const url = new URL(request.url);
    const resultId = url.pathname.split('/').pop();

    await connectToDatabase();
    await Result.findByIdAndDelete(resultId);

    return NextResponse.json(
      { success: true, message: 'Result deleted successfully' }
    );
  } catch (error) {
    console.error('Error deleting result:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to delete result' },
      { status: 500 }
    );
  }
}