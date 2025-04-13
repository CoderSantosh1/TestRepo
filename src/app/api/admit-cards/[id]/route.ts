import { NextResponse } from 'next/server';
import connectDB from '@/lib/db';
import AdmitCard from '@/lib/models/AdmitCard';

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    await connectDB();
    
    const AdmitCardId = params.id;
    const deletedAdmitCard = await AdmitCard.findByIdAndDelete(AdmitCardId);

    if (!deletedAdmitCard) {
      return NextResponse.json(
        { success: false, error: 'AdmitCard not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, data: deletedAdmitCard });
  } catch (error) {
    console.error('Error in DELETE /api/AdmitCards/[id]:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to delete AdmitCard' },
      { status: 500 }
    );
  }
}