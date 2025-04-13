import { NextResponse } from 'next/server';
import { connectToDatabase as connectDB } from '@/lib/db';
import Result from '@/lib/models/Result';

export async function POST(request: Request) {
  try {
    await connectDB();
    
    const body = await request.json();
    
    // Validate required fields
    const requiredFields = ['title', 'organization', 'resultDate', 'category', 'downloadLink'];
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
    if (title.length < 3 || title.length > 200) {
      return NextResponse.json(
        { success: false, error: 'Title must be between 3 and 200 characters' },
        { status: 400 }
      );
    }
    if (!/^[\w\s\-.,()&]+$/.test(title)) {
      return NextResponse.json(
        { success: false, error: 'Title contains invalid characters' },
        { status: 400 }
      );
    }

    // Validate organization
    const organization = body.organization.trim();
    if (organization.length < 2 || organization.length > 100) {
      return NextResponse.json(
        { success: false, error: 'Organization name must be between 2 and 100 characters' },
        { status: 400 }
      );
    }
    if (!/^[\w\s\-.,()&]+$/.test(organization)) {
      return NextResponse.json(
        { success: false, error: 'Organization name contains invalid characters' },
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

    const result = await Result.create({
      title: body.title,
      organization: body.organization,
      resultDate: resultDate,
      category: body.category,
      downloadLink: body.downloadLink,
      status: body.status || 'draft'
    });

    return NextResponse.json({ success: true, data: result }, { status: 201 });
  } catch (error: any) {
    console.error('Error in POST /api/results:', error);
    
    // Handle validation errors
    if (error.name === 'ValidationError') {
      const validationErrors = Object.values(error.errors).map((err: any) => err.message);
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

    return NextResponse.json({ success: true, data: results });
  } catch (error) {
    console.error('Error in GET /api/results:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch results' },
      { status: 500 }
    );
  }
}