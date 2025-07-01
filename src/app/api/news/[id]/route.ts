import { NextResponse } from 'next/server';
import { connectToDatabase as connectDB } from '@/lib/db';
import Job from '@/lib/models/News';

export const dynamic = 'force-dynamic';

export async function GET(
  _request: Request,
  context: { params: Promise<{ id: string }> }
) {
  try {
    await connectDB();

    const { id: newsId } = await context.params;
    if (!newsId) {
      return NextResponse.json(
        { success: false, error: 'newskey id is required' },
        { status: 400 }
      );
    }

    const news = await Job.findById(newsId);

    if (!news) {
      return NextResponse.json(
        { success: false, error: 'news not  found' },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { success: true, data: news},
      { status: 200 }
    );
  } catch (error) {
    console.error('Error in GET /api/news/[id]:', error);
    
    if (error instanceof Error && error.name === 'CastError') {
      return NextResponse.json(
        { success: false, error: 'Invalid news ID format' },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { success: false, error: 'Failed to fetch news details' },
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

    const { id: newsId } = await context.params;
    if (!newsId) {
      return NextResponse.json(
        { success: false, error: 'News ID is required' },
        { status: 400 }
      );
    }

    const data = await request.json();
    // Ensure image is always a string
    if (typeof data.image !== 'string') {
      data.image = '';
    }
    const news = await Job.findByIdAndUpdate(newsId, data, { new: true });

    if (!news) {
      return NextResponse.json(
        { success: false, error: 'News  not found' },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { success: true, data: news },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error in PUT /api/news/[id]::', error);
    return NextResponse.json(
      { success: false, error: 'Failed to update news' },
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

    const { id: newsId } = await context.params;
    if (!newsId) {
      return NextResponse.json(
        { success: false, error: 'news ID is required' },
        { status: 400 }
      );
    }

    const news = await Job.findByIdAndDelete(newsId);

    if (!news) {
      return NextResponse.json(
        { success: false, error: 'news not found' },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { success: true, message: 'news deleted successfully' },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error in DELETE /api/news/[id]:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to delete news' },
      { status: 500 }
    );
  }
}