"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
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
  totalMarks: number;
  questions: Array<{
    _id: string;
    text: string;
    options: string[];
    correctAnswer: number;
  }>;
  attempts?: Array<{
    _id: string;
    userId: string;
    score: number;
    completedAt: string;
  }>;
  createdAt?: string;
  updatedAt?: string;
}

export default function QuizList() {
  const [quizzes, setQuizzes] = useState<Quiz[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchQuizzes = async () => {
      try {
        const response = await fetch("/api/quizzes");
        if (!response.ok) {
          throw new Error("Failed to fetch quizzes");
        }
        const data = await response.json();
        console.log("Fetched quizzes data:", data);
        setQuizzes(data);
      } catch (error) {
        console.error("Error fetching quizzes:", error);
        toast.error("Failed to load quizzes");
      } finally {
        setLoading(false);
      }
    };

    fetchQuizzes();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-500"></div>
      </div>
    );
  }

  if (quizzes.length === 0) {
    return (
      <div className="container mx-auto py-8">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4 text-[#014F59]">No Quizzes Available</h1>
          <p className="text-muted-foreground mb-8">
            There are no quizzes available at the moment.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-6">
      <h1 className="text-2xl font-bold mb-8 text-[#014F59] flex justify-center">Available Test</h1>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {quizzes.map((quiz) => (
          <Card key={quiz._id} className="rounded-xl shadow-md border p-4 bg-white hover:shadow-lg transition-shadow">
            <CardHeader className="text-center">
              <CardTitle className="text-lg font-semibold text-black">
                {quiz.description}
                {/* {quiz.title} ({quiz.questions.length} Test Series) */}
              </CardTitle>
              <hr className="my-2 border-gray-300" />
            </CardHeader>

            <CardContent>
              <div className="grid grid-cols-3 gap-4 text-center mb-6">
                <div>
                  <p className="text-2xl font-bold text-[#014F59]">{quiz.questions.length}</p>
                  <p className="text-gray-500 text-sm">Questions</p>
                </div>
                <div>
                  <p className="text-2xl font-bold text-[#014F59]">{quiz.totalMarks}</p>
                  <p className="text-gray-500 text-sm">Marks</p>
                </div>
                <div>
                  <p className="text-2xl font-bold text-[#014F59]">{quiz.timeLimit}</p>
                  <p className="text-gray-500 text-sm">Minutes</p>
                </div>
              </div>
              <div className="flex justify-center">
                <Link href={`/quizzes/${quiz._id}`}>
                  <Button className="bg-blue-600 hover:bg-blue-700 text-white text-lg px-8 py-3 rounded-lg shadow-md transition-colors">
                    Attempt
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
} 