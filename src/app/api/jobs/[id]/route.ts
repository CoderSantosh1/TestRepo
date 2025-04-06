import { NextResponse } from 'next/server';
import connectDB from '@/lib/db';
import Job from '@/lib/models/Job';

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    await connectDB();
    
    const jobId = params.id;
    const deletedJob = await Job.findByIdAndDelete(jobId);

    if (!deletedJob) {
      return NextResponse.json(
        { success: false, error: 'Job not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, data: deletedJob });
  } catch (error) {
    console.error('Error in DELETE /api/jobs/[id]:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to delete job' },
      { status: 500 }
    );
  }
}