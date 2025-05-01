
import { NextResponse } from 'next/server';
import { connectToDatabase as connectDB } from '@/lib/db';
import Result from '@/lib/models/Result';
import mongoose from 'mongoose';

export async function POST(request: Request) {
  try {
    await connectDB();
    
    const body = await request.json();
    
    const result = await Result.create({
      title: body.title,
      organization: body.organization,
      resultDate: new Date(body.resultDate),
      category: body.category,
      downloadLink: body.downloadLink,
      status: 'published'
    });

    return NextResponse.json({ success: true, data: result }, { status: 201 });
  } catch (error) {
    console.error('Error in POST /api/results:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to create Result posting' },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    await connectDB();
    
    const results = await Result.find()
      .sort({ resultDate: -1 });

    return NextResponse.json({ success: true, data: results });
  } catch (error) {
    console.error('Error in GET /api/results:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch Results' },
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

