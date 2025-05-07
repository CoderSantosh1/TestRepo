import { NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/db';
import Result from '@/lib/models/Result';

interface ValidationError {
  name: string;
  errors: {
    [key: string]: {
      message: string;
    };
  };
}

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

    // Validate date format
    const resultDate = new Date(body.resultDate);
    if (isNaN(resultDate.getTime())) {
      return NextResponse.json(
        { success: false, error: 'Invalid result date format' },
        { status: 400 }
      );
    }

    // Validate category
    const validCategories = ['government', 'private', 'education', 'other'];
    if (!validCategories.includes(body.category)) {
      return NextResponse.json(
        { 
          success: false, 
          error: `Invalid category. Must be one of: ${validCategories.join(', ')}` 
        },
        { status: 400 }
      );
    }

    const result = new Result({
      ...body,
      resultDate,
      status: 'published',
      createdAt: new Date(),
    });

    await result.save();
  } catch (error) {
    console.error('Error creating result:', error);
    
    // Handle mongoose validation errors
    if (error && (error as ValidationError).name === 'ValidationError') {
      const validationError = error as ValidationError;
      const validationErrors = Object.values(validationError.errors).map(
        (err) => err.message
      );
      return NextResponse.json(
        { success: false, error: validationErrors.join(', ') },
        { status: 400 }
      );
    }

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
      { ...body, description: body.description, updatedAt: new Date() },
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