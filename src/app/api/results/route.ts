import { NextResponse } from 'next/server';
import { connectToDatabase as connectDB } from '@/lib/db';
import Result from '@/lib/models/Result';
import mongoose from 'mongoose';


interface ValidationError {
  name: string;
  errors: {
    [key: string]: {
      message: string;
    };
  };
}

export async function POST(request: Request) {
  try {
    await connectDB();
    
    const body = await request.json();
    
    // Validate required fields
    const requiredFields = ['title', 'organization', 'resultDate', 'category', 'downloadLink', 'description'];
    const missingFields = requiredFields.filter(field => !body[field]);
    
    if (missingFields.length > 0) {
      return NextResponse.json(
        { 
          success: false, 
          error: 'Missing required fields', 
          details: missingFields.map(field => `${field} is required`)
        },
        { status: 400 }
      );
    }

    // Validate title
    const title = body.title.trim();
    if (title.length < 3 || title.length > 2000) {
      return NextResponse.json(
        { success: false, error: 'Title must be between 3 and 200 characters' },
        { status: 400 }
      );
    }
   

    // Validate organization
    const organization = body.organization.trim();
    if (organization.length < 2 || organization.length > 1000) {
      return NextResponse.json(
        { success: false, error: 'Organization name must be between 2 and 100 characters' },
        { status: 400 }
      );
    }
   

    // Validate category
    const validCategories = ['government', 'private', 'education', 'other'];
    if (!validCategories.includes(body.category)) {
      return NextResponse.json(
        { success: false, error: 'Invalid category. Must be one of: government, private, education, other' },
        { status: 400 }
      );
    }

    // Validate download link format
    if (!/^(http|https):\/\/[^ "]+$/.test(body.downloadLink)) {
      return NextResponse.json(
        { success: false, error: 'Invalid download link format. Must be a valid URL' },
        { status: 400 }
      );
    }
    
    // Validate date
    const resultDate = new Date(body.resultDate);
    if (isNaN(resultDate.getTime())) {
      return NextResponse.json(
        { success: false, error: 'Invalid result date format' },
        { status: 400 }
      );
    }

    // Validate date is not in future
    if (resultDate > new Date()) {
      return NextResponse.json(
        { success: false, error: 'Result date cannot be in the future' },
        { status: 400 }
      );
    }

    // Validate description
    const description = body.description.trim();
    if (description.length < 10 || description.length > 10000) {
      return NextResponse.json(
        { success: false, error: 'Description must be between 10 and 1000 characters' },
        { status: 400 }
      );
    }
   
    
    const result = await Result.create({
      title: body.title,
      description: body.description,
      organization: body.organization,
      resultDate: resultDate,
      category: body.category,
      downloadLink: body.downloadLink,
      status: body.status || 'draft',
      createdAt: new Date()
    });
   
    // Ensure all fields, including description, are present in the response
    return NextResponse.json({ success: true, data: {
      _id: result._id,
      title: result.title,
      description: result.description,
      organization: result.organization,
      resultDate: result.resultDate,
      category: result.category,
      downloadLink: result.downloadLink,
      status: result.status,
      createdAt: result.createdAt,
      updatedAt: result.updatedAt,
      __v: result.__v
    } }, { status: 201 });
  } catch (error) {
    console.error('Error in POST /api/results:', error);
    
    // Handle validation errors
    if ((error as ValidationError).name === 'ValidationError') {
      const validationError = error as ValidationError;
      const validationErrors = Object.values(validationError.errors).map(err => err.message);
      return NextResponse.json(
        { success: false, error: 'Validation failed', details: validationErrors },
        { status: 400 }
      );
    }

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

    // Map results to ensure all required fields are present in each object
    const formattedResults = results.map(result => ({
      _id: result._id,
      title: result.title,
      description: result.description,
      organization: result.organization,
      resultDate: result.resultDate,
      category: result.category,
      downloadLink: result.downloadLink,
      status: result.status,
      createdAt: result.createdAt,
      updatedAt: result.updatedAt,
      __v: result.__v
    }));

    return NextResponse.json({ success: true, data: formattedResults });
  } catch (error) {
    console.error('Error in GET /api/results:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch results' },
      { status: 500 }
    );
  }
}

export async function PUT(request: Request, context: { params: Promise<{ id: string }> }) {
  try {
    const body = await request.json();
    await connectDB();

    const { id: resultId } = await context.params;
    if (!resultId || !mongoose.Types.ObjectId.isValid(resultId)) {
      return NextResponse.json(
        { success: false, error: 'Invalid result ID' },
        { status: 400 }
      );
    }

    const updatedResult = await Result.findByIdAndUpdate( resultId, { ...body, updatedAt: new Date() }, { new: true } );

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
