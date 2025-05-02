


import { NextResponse } from 'next/server';
import { connectToDatabase as connectDB } from '@/lib/db';
import Job from '@/lib/models/Job';

export async function POST(request: Request) {
  try {
    await connectDB();
    
    const body = await request.json();
    
    const job = await Job.create({
      title: body.title,
      description: body.description,
      organization: body.organization,
      location: body.location,
      salary: body.salary,
      requirements: body.requirements,
      applicationDeadline: new Date(body.applicationDeadline),
      category: body.category,
      status: 'published'
    });

    return NextResponse.json({ success: true, data: job }, { status: 201 });
  } catch (error) {
    console.error('Error in POST /api/jobs:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to create job posting' },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    await connectDB();
    
    const jobs = await Job.find({ status: 'published' })
      .sort({ createdAt: -1 });

    if (!jobs || jobs.length === 0) {
      return NextResponse.json(
        { success: false, error: 'No published jobs found' },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, data: jobs });
  } catch (error) {
    console.error('Error in GET /api/jobs:', error);
    return NextResponse.json(
      { success: false, error: error instanceof Error ? error.message : 'Failed to fetch jobs' },
      { status: 500 }
    );
  }
}