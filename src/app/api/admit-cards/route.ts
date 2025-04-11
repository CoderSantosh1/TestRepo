import { NextResponse } from 'next/server';
import connectDB from '@/lib/db';
import AdmitCard from '@/lib/models/AdmitCard';

interface IAdmitCard {
  title: string;
  description: string;
  organization: string;
  location: string;
  salary?: string;
  requirements?: string[];
  applicationDeadline: Date;
  category: string;
  status: 'draft' | 'published' | 'closed';
  createdAt: Date;
  updatedAt: Date;
}

interface IAdmitCardRequest extends Omit<IAdmitCard, 'status' | 'createdAt' | 'updatedAt'> {}

export async function POST(request: Request) {
  try {
    await connectDB();
    
    const body = await request.json() as IAdmitCardRequest;
    
    const admitCard: IAdmitCard = await AdmitCard.create({
      title: body.title,
      description: body.description,
      organization: body.organization,
      location: body.location,
      salary: body.salary,
      requirements: body.requirements || [],
      applicationDeadline: new Date(body.applicationDeadline),
      category: body.category,
      status: 'published',
      createdAt: new Date(),
      updatedAt: new Date()
    });

    return NextResponse.json({ success: true, data: admitCard }, { status: 201 });
  } catch (error) {
    console.error('Error in POST /api/admit-cards:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to create admit card posting' },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    await connectDB();
    
    const admitCards = await AdmitCard.find({ status: 'published' })
      .sort({ downloadStartDate: -1 });

    return NextResponse.json({ success: true, data: admitCards });
  } catch (error) {
    console.error('Error in GET /api/admit-cards:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch admit cards' },
      { status: 500 }
    );
  }

}

export async function DELETE(request: Request) {
  try {
    await connectDB();
    
    const segments = request.url.split('/');
    const id = segments[segments.length - 1];
    
    if (!id.match(/^[0-9a-fA-F]{24}$/)) {
      return NextResponse.json(
        { success: false, error: 'Invalid admit card ID format' },
        { status: 400 }
      );
    }
    
    if (!id) {
      return NextResponse.json(
        { success: false, error: 'Admit card ID is required' },
        { status: 400 }
      );
    }

    const admitCard = await AdmitCard.findById(id);
    
    if (!admitCard) {
      return NextResponse.json(
        { success: false, error: 'Admit card not found' },
        { status: 404 }
      );
    }

    await AdmitCard.findByIdAndDelete(id);

    return NextResponse.json({ success: true, data: null }, { status: 200 });
  } catch (error) {
    console.error('Error in DELETE /api/admit-cards:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to delete admit card' },
      { status: 500 }
    );
  }
}