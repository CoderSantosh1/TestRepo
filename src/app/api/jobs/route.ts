import { NextResponse } from 'next/server';
import { connectToDatabase as connectDB } from '@/lib/db';
import Job from '@/lib/models/Job';

export async function POST(request: Request) {
  try {
    console.log('Starting job creation process...');
    const body = await request.json();
    console.log('Received request body:', JSON.stringify(body, null, 2));
    
    // Validate totalVacancy
    if (!body.totalVacancy || isNaN(Number(body.totalVacancy)) || Number(body.totalVacancy) <= 0) {
      console.log('Invalid totalVacancy:', body.totalVacancy);
      return NextResponse.json(
        { success: false, error: 'Total vacancy must be a positive number' },
        { status: 400 }
      );
    }

    // Validate age fields
    if (body.minimumAge) {
      const minAge = Number(body.minimumAge);
      if (isNaN(minAge) || minAge < 0) {
        console.log('Invalid minimumAge:', body.minimumAge);
        return NextResponse.json(
          { success: false, error: 'Minimum age must be a valid positive number' },
          { status: 400 }
        );
      }
    }

    if (body.maximumAge) {
      const maxAge = Number(body.maximumAge);
      if (isNaN(maxAge) || maxAge < 0) {
        console.log('Invalid maximumAge:', body.maximumAge);
        return NextResponse.json(
          { success: false, error: 'Maximum age must be a valid positive number' },
          { status: 400 }
        );
      }
    }

    if (body.minimumAge && body.maximumAge) {
      const minAge = Number(body.minimumAge);
      const maxAge = Number(body.maximumAge);
      if (minAge >= maxAge) {
        console.log('Invalid age range:', { minAge, maxAge });
        return NextResponse.json(
          { success: false, error: 'Minimum age must be less than maximum age' },
          { status: 400 }
        );
      }
    }

    console.log('Connecting to database...');
    await connectDB();
    console.log('Database connected successfully');

    // Create job data exactly as received, only converting necessary fields
    const jobData = {
      ...body,
      applicationDeadline: new Date(body.applicationDeadline),
      status: 'published'
    };

    console.log('Creating job with data:', JSON.stringify(jobData, null, 2));
    
    const job = await Job.create(jobData);
    console.log('Job created successfully. Full job data:', JSON.stringify(job.toObject(), null, 2));

    // Fetch the complete job data including all fields
    const savedJob = await Job.findById(job._id)
      .select('+minimumAge +maximumAge')
      .lean();

    if (!savedJob) {
      throw new Error('Failed to retrieve created job');
    }

    console.log('Verified saved job data:', JSON.stringify(savedJob, null, 2));

    return NextResponse.json({ 
      success: true, 
      data: savedJob
    }, { status: 201 });
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
      .select('+minimumAge +maximumAge')
      .lean()
      .sort({ createdAt: -1 });

    console.log(`Found ${jobs.length} jobs`);

    if (!jobs || jobs.length === 0) {
      return NextResponse.json(
        { success: false, error: 'No published jobs found' },
        { status: 404 }
      );
    }

    return NextResponse.json({ 
      success: true, 
      data: jobs 
    });
  } catch (error) {
    console.error('Error in GET /api/jobs:', error);
    return NextResponse.json(
      { success: false, error: error instanceof Error ? error.message : 'Failed to fetch jobs' },
      { status: 500 }
    );
  }
}