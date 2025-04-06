import { NextResponse } from 'next/server';
import { connectToDatabase as connectDB } from '@/lib/db';
import Result from '@/lib/models/Result';

export async function POST(request: Request) {
  try {
    await connectDB();
    
    const body = await request.json();
    
    const result = await Result.create({
      title: body.title,
      organization: body.organization,
      resultDate: new Date(body.resultDate),
      category: body.category,
      resultLink: body.resultLink,
      description: body.description,
      status: 'published'
    });

    return NextResponse.json({ success: true, data: result }, { status: 201 });
  } catch (error) {
    console.error('Error in POST /api/results:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to create result posting' },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    await connectDB();
    
    const results = await Result.find({ status: 'published' })
      .sort({ resultDate: -1 });

    return NextResponse.json({ success: true, data: results });
  } catch (error) {
    console.error('Error in GET /api/results:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch results' },
      { status: 500 }
    );
  }
}