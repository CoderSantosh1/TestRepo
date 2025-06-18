"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CheckCircle2, XCircle } from "lucide-react";
import { toast } from "sonner";

interface Question {
  _id: string;
  text: string;
  options: string[];
  correctAnswer: number;
}

interface Quiz {
  _id: string;
  title: string;
  description: string;
  timeLimit: number;
  questions: Question[];
  totalMarks: number;
}

export default function QuizPreview({ params }: { params: { id: string } }) {
  const router = useRouter();
  const [quiz, setQuiz] = useState<Quiz | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchQuiz = async () => {
      try {
        const response = await fetch(`/api/quizzes/${params.id}`);
        if (!response.ok) {
          throw new Error("Failed to fetch quiz");
        }
        const data = await response.json();
        setQuiz(data);
      } catch (error) {
        console.error("Error fetching quiz:", error);
        toast.error("Failed to load quiz");
        router.push("/quizzes");
      } finally {
        setLoading(false);
      }
    };

    fetchQuiz();
  }, [params.id, router]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-500"></div>
      </div>
    );
  }

  if (!quiz) {
    return (
      <div className="container mx-auto py-8">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4 text-[#014F59]">Quiz Not Found</h1>
          <Button
            onClick={() => router.push("/quizzes")}
            className="border-2 border-[#014F59] text-[#014F59] hover:bg-[#014F59] hover:text-white transition-colors"
          >
            Back to Quizzes
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-8">
      <Card className="mb-8 bg-white">
        <CardHeader>
          <CardTitle className="text-[#014F59]">{quiz.title}</CardTitle>
          <p className="text-muted-foreground">{quiz.description}</p>
          <div className="flex items-center gap-4 text-sm text-muted-foreground">
            <span>Time Limit: {quiz.timeLimit} minutes</span>
            <span>Questions: {quiz.questions.length}</span>
            <span>Total Marks: {quiz.totalMarks}</span>
          </div>
        </CardHeader>
      </Card>

      <div className="space-y-8">
        {quiz.questions.map((question, index) => (
          <Card key={question._id} className="bg-white">
            <CardHeader>
              <CardTitle className="text-lg text-[#014F59]">
                Question {index + 1}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="mb-4 text-[#014F59]">{question.text}</p>
              <div className="space-y-2">
                {question.options.map((option, optionIndex) => (
                  <div
                    key={optionIndex}
                    className={`flex items-center gap-2 p-2 rounded ${
                      optionIndex === question.correctAnswer
                        ? "bg-green-50 dark:bg-green-950"
                        : ""
                    }`}
                  >
                    {optionIndex === question.correctAnswer ? (
                      <CheckCircle2 className="h-5 w-5 text-green-500" />
                    ) : (
                      <XCircle className="h-5 w-5 text-red-500" />
                    )}
                    <span className="text-[#014F59]">{option}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="mt-8 flex justify-center gap-4">
        <Button
          onClick={() => router.push("/quizzes")}
          className="border-2 border-[#014F59] text-[#014F59] hover:bg-[#014F59] hover:text-white transition-colors"
        >
          Back to Quizzes
        </Button>
        <Button
          onClick={() => router.push(`/quizzes/${quiz._id}`)}
          className="bg-[#059669] hover:bg-[#059669]/90 text-white transition-colors"
        >
          Take Quiz
        </Button>
      </div>
    </div>
  );
} 