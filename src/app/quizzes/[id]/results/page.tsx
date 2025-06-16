"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
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
  questions: Question[];
  totalMarks?: number;
}

interface QuizAttempt {
  _id: string;
  quizId: string;
  userId: string;
  answers: number[];
  score: number;
  completedAt: string;
}

export default function QuizResults({ params }: { params: { id: string } }) {
  const searchParams = useSearchParams();
  const [quiz, setQuiz] = useState<Quiz | null>(null);
  const [attempt, setAttempt] = useState<QuizAttempt | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const attemptId = searchParams?.get('attemptId');
        if (!attemptId) {
          toast.error('No attempt ID provided');
          return;
        }

        const [quizRes, attemptRes] = await Promise.all([
          fetch(`/api/quizzes/${params.id}`),
          fetch(`/api/quiz-attempts/${attemptId}`)
        ]);

        if (!quizRes.ok || !attemptRes.ok) {
          throw new Error('Failed to fetch data');
        }

        const [quizData, attemptData] = await Promise.all([
          quizRes.json(),
          attemptRes.json()
        ]);

        setQuiz(quizData);
        setAttempt(attemptData);
      } catch (error) {
        console.error('Error fetching quiz results:', error);
        toast.error('Failed to load quiz results');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [params.id, searchParams]);

  if (loading) {
    return (
      <div className="container mx-auto py-8">
        <div className="text-center">Loading results...</div>
      </div>
    );
  }

  if (!quiz || !attempt) {
    return (
      <div className="container mx-auto py-8">
        <div className="text-center text-red-500">Failed to load quiz results</div>
      </div>
    );
  }

  const calculateScore = () => {
    let correctAnswers = 0;
    quiz.questions.forEach((question, index) => {
      if (question.correctAnswer === attempt.answers[index]) {
        correctAnswers++;
      }
    });
    return (correctAnswers / quiz.questions.length) * 100;
  };

  return (
    <div className="container mx-auto py-8">
      <Card className="mb-8">
        <CardHeader>
          <CardTitle>{quiz.title} - Results</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="text-center">
              <h2 className="text-2xl font-bold">
                Score: {calculateScore().toFixed(1)}%
              </h2>
              <p className="text-gray-500">
                Total Marks: {quiz.totalMarks || 0}
              </p>
              <p className="text-gray-500">
                Completed on {new Date(attempt.completedAt).toLocaleString()}
              </p>
            </div>

            <div className="space-y-6">
              {quiz.questions.map((question, index) => (
                <Card key={question._id}>
                  <CardContent className="pt-6">
                    <div className="space-y-4">
                      <h3 className="font-medium">
                        Question {index + 1}: {question.text}
                      </h3>
                      <div className="space-y-2">
                        {question.options.map((option, optionIndex) => (
                          <div
                            key={optionIndex}
                            className={`p-2 rounded ${
                              optionIndex === question.correctAnswer
                                ? 'bg-green-50 text-green-700'
                                : optionIndex === attempt.answers[index] &&
                                  optionIndex !== question.correctAnswer
                                ? 'bg-red-50 text-red-700'
                                : ''
                            }`}
                          >
                            {option}
                          </div>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            <div className="flex justify-center mt-8">
              <Button
                onClick={() => window.location.href = '/quizzes'}
              >
                Back to Quizzes
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
} 