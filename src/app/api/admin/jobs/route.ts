import { NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/db';
import Job from '@/lib/models/Job';
import mongoose from 'mongoose';

export async function GET() {
  try {
    await connectToDatabase();
    const jobs = await Job.find().select('+totalVacancy').sort({ createdAt: -1 });
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
      ...body, // Spread existing body to retain any other fields
      title: body.title,
      description: body.description,
      organization: body.organization,
      location: body.location,
      salary: body.salary,
      totalVacancy: body.totalVacancy,
      age: body.age,
      gender: body.gender,
      qualification: body.qualification,
      requirements: body.requirements,
      applicationDeadline: new Date(body.applicationDeadline),
      category: body.category,
      applyJob: body.applyJob,
      applicationBeginDate: body.applicationBeginDate,
      lastDateApplyOnline: body.lastDateApplyOnline,
      formCompleteLastDate: body.formCompleteLastDate,
      correctionDate: body.correctionDate,
      examDate: body.examDate,
      admitCardDate: body.admitCardDate,
      applicationFeeGeneral: body.applicationFeeGeneral,
      applicationFeeSCST: body.applicationFeeSCST,
      paymentMethod: body.paymentMethod,
      status: 'published', // Explicitly set status
      createdAt: new Date(), // Explicitly set createdAt
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

    if (!jobId || !mongoose.Types.ObjectId.isValid(jobId)) {
      return NextResponse.json(
        { success: false, error: 'Invalid job ID' },
        { status: 400 }
      );
    }

    await connectToDatabase();
    const job = await Job.findById(jobId);

    if (!job) {
      return NextResponse.json(
        { success: false, error: 'Job not found' },
        { status: 404 }
      );
    }

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