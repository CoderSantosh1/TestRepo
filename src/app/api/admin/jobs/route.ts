import { NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/db';
import Job from '@/lib/models/Job';

export async function GET() {
  try {
    await connectToDatabase();
    const jobs = await Job.find().sort({ createdAt: -1 });
    return NextResponse.json({ success: true, data: jobs });
  } catch (error) {
    console.error('Error fetching jobs:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch jobs' },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    await connectToDatabase();

    const job = new Job({
      ...body,
      status: 'published',
      createdAt: new Date(),
    });

    await job.save();

    return NextResponse.json(
      { success: true, data: job },
      { status: 201 }
    );
  } catch (error) {
    console.error('Error creating job:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to create job' },
      { status: 500 }
    );
  }
}

export async function DELETE(request: Request) {
  try {
    const url = new URL(request.url);
    const jobId = url.pathname.split('/').pop();

    await connectToDatabase();
    await Job.findByIdAndDelete(jobId);

    return NextResponse.json(
      { success: true, message: 'Job deleted successfully' }
    );
  } catch (error) {
    console.error('Error deleting job:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to delete job' },
      { status: 500 }
    );
  }
}