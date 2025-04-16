import { NextResponse, type NextRequest } from 'next/server';
import { connectToDatabase as connectDB } from '@/lib/db';
import AdmitCard from '@/lib/models/AdmitCard';

export async function DELETE(
  request: NextRequest,
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
    console.error('Error in DELETE /api/admit-cards/[id]:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to delete AdmitCard' },
      { status: 500 }
    );
  }
}
