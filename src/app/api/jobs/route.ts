import { NextResponse } from 'next/server';
import { connectToDatabase as connectDB } from '@/lib/db';
import Job from '@/lib/models/Job';

export async function POST(request: Request) {
  try {
    console.log('Starting job creation process...');
    const body = await request.json();
    console.log('Received request body:', body);
    
    // Validate totalVacancy
    if (!body.totalVacancy || isNaN(Number(body.totalVacancy)) || Number(body.totalVacancy) <= 0) {
      console.log('Invalid totalVacancy:', body.totalVacancy);
      return NextResponse.json(
        { success: false, error: 'Total vacancy must be a positive number' },
        { status: 400 }
      );
    }

    console.log('Connecting to database...');
    await connectDB();
    console.log('Database connected successfully');

    const jobData = {
      title: body.title,
      description: body.description,
      organization: body.organization,
      location: body.location,
      salary: body.salary,
      age: body.age,
      gender: body.gender,
      qualification: body.qualification,
      requirements: body.requirements,
      applicationDeadline: new Date(body.applicationDeadline),
      category: body.category,
      applyJob: body.applyJob,
      totalVacancy: body.totalVacancy.toString(),
      status: 'published',
      applicationBeginDate: body.applicationBeginDate,
      lastDateApplyOnline: body.lastDateApplyOnline,
      formCompleteLastDate: body.formCompleteLastDate,
      correctionDate: body.correctionDate,
      examDate: body.examDate,
      admitCardDate: body.admitCardDate,
      applicationFeeGeneral: body.applicationFeeGeneral,
      applicationFeeSCST: body.applicationFeeSCST,
      paymentMethod: body.paymentMethod
    };

    console.log('Creating job with data:', jobData);
    const job = await Job.create(jobData);
    console.log('Job created successfully:', job);

    return NextResponse.json({ success: true, data: job }, { status: 201 });
  } catch (error) {
    console.error('Error in POST /api/jobs:', error);
    if (error instanceof Error) {
      return NextResponse.json(
        { success: false, error: error.message },
        { status: 400 }
      );
    }
    return NextResponse.json(
      { success: false, error: 'Failed to create job posting' },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    console.log('Fetching jobs...');
    await connectDB();
    console.log('Database connected successfully');
    
    const jobs = await Job.find({ status: 'published' })
      .sort({ createdAt: -1 });

    console.log(`Found ${jobs.length} jobs`);

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