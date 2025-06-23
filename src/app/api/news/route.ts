import { NextResponse } from 'next/server';
import connectDB from '@/lib/db';
import News from '@/lib/models/News';

export async function GET() {
  try {
    await connectDB();
    const news = await News.find({ status: 'published' }).sort({ postedDate: -1 });
    return NextResponse.json({ success: true, data: news });
  } catch (error) {
    console.error('Error fetching news:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch news' },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    await connectDB();
    const news = await News.create(body);
    return NextResponse.json({ success: true, data: news }, { status: 201 });
  } catch (error) {
    console.error('Error creating news:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to create news' },
      { status: 500 }
    );
  }
}