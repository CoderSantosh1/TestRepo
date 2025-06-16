import { NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import QuizAttempt from "@/lib/models/QuizAttempt";

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    await connectDB();
    const attempt = await QuizAttempt.findById(params.id);
    
    if (!attempt) {
      return NextResponse.json(
        { error: "Quiz attempt not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(attempt);
  } catch (error) {
    console.error("Error fetching quiz attempt:", error);
    return NextResponse.json(
      { error: "Failed to fetch quiz attempt" },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    await connectDB();
    const attempt = await QuizAttempt.findById(params.id);
    
    if (!attempt) {
      return NextResponse.json(
        { error: "Quiz attempt not found" },
        { status: 404 }
      );
    }

    await attempt.deleteOne();
    return NextResponse.json({ message: "Quiz attempt deleted successfully" });
  } catch (error) {
    console.error("Error deleting quiz attempt:", error);
    return NextResponse.json(
      { error: "Failed to delete quiz attempt" },
      { status: 500 }
    );
  }
} 