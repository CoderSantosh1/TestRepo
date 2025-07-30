import { NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import Quiz from "@/lib/models/Quiz";
import QuizAttempt from "@/lib/models/QuizAttempt";

export async function POST(request: Request) {
  try {
    await connectDB();
    const body = await request.json();
    const { quizId, userId, answers } = body;

    // Fetch the quiz to get the correct answers
    const quiz = await Quiz.findById(quizId).populate("questions");
    if (!quiz) {
      return NextResponse.json(
        { error: "Quiz not found" },
        { status: 404 }
      );
    }

    // Calculate score
    let score = 0;
    quiz.questions.forEach((question: any, index: number) => {
      if (answers[index] === question.correctAnswer) {
        score++;
      }
    });

    // Create quiz attempt
    const attempt = await QuizAttempt.create({
      quizId,
      userId,
      answers,
      score,
    });

    return NextResponse.json(attempt);
  } catch (error) {
    console.error("Error submitting quiz attempt:", error);
    return NextResponse.json(
      { error: "Failed to submit quiz attempt" },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    await connectDB();
    const attempts = await QuizAttempt.find().populate('quizId');
    return NextResponse.json(attempts);
  } catch (error) {
    console.error("Error fetching quiz attempts:", error);
    return NextResponse.json(
      { error: "Failed to fetch quiz attempts" },
      { status: 500 }
    );
  }
} 