"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { Trophy, Target, Clock, CheckCircle2, XCircle, ArrowLeft, Brain, Hexagon } from "lucide-react";

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
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-black flex items-center justify-center">
        <div className="relative">
          {/* Multi-layered loading spinner */}
          <div className="w-20 h-20 border-4 border-cyan-400/30 rounded-full animate-spin">
            <div
              className="absolute inset-2 border-4 border-magenta-400/50 rounded-full animate-spin"
              style={{ animationDirection: "reverse" }}
            >
              <div className="absolute inset-2 border-4 border-lime-400/70 rounded-full animate-spin">
                <div className="absolute inset-2 bg-gradient-to-br from-cyan-400 to-magenta-400 rounded-full animate-pulse" />
              </div>
            </div>
          </div>
          <div className="absolute inset-0 bg-cyan-400/20 rounded-full blur-xl animate-pulse" />
          <p className="text-cyan-400 font-bold text-lg mt-8 text-center animate-pulse">
            Processing Neural Results...
          </p>
        </div>
      </div>
    );
  }

  if (!quiz || !attempt) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-black flex items-center justify-center p-4">
        <Card
          className="border-0 bg-black/80 backdrop-blur-sm shadow-2xl p-8 text-center"
          style={{
            clipPath: "polygon(0% 0%, 95% 0%, 100% 5%, 100% 100%, 5% 100%, 0% 95%)",
            background: "linear-gradient(135deg, rgba(0,0,0,0.9) 0%, rgba(26,10,46,0.9) 50%, rgba(0,0,0,0.9) 100%)",
          }}
        >
          <div className="w-16 h-16 mx-auto mb-6 bg-gradient-to-br from-red-400 to-pink-600 rounded-lg flex items-center justify-center">
            <XCircle className="w-8 h-8 text-white animate-pulse" />
          </div>
          <h1 className="text-3xl font-black mb-4 bg-gradient-to-r from-red-400 to-pink-400 bg-clip-text text-transparent">
            Neural Data Corrupted
          </h1>
          <Button
            onClick={() => (window.location.href = "/quizzes")}
            className="bg-gradient-to-r from-cyan-400 to-blue-500 hover:from-cyan-500 hover:to-blue-600 text-black font-bold px-8 py-3"
          >
            Return to Hub
          </Button>
        </Card>
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

  const score = calculateScore();
  const correctAnswers = quiz.questions.filter((q, i) => q.correctAnswer === attempt.answers[i]).length;

  const getScoreColor = (score: number) => {
    if (score >= 80) return "from-lime-400 to-emerald-500";
    if (score >= 60) return "from-yellow-400 to-orange-500";
    return "from-red-400 to-pink-500";
  };

  const getScoreGrade = (score: number) => {
    if (score >= 90) return "EXCELLENT";
    if (score >= 80) return "VERY GOOD";
    if (score >= 70) return "GOOD";
    if (score >= 60) return "AVERAGE";
    return "NEEDS IMPROVEMENT";
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-black p-2 sm:p-4">
      {/* Floating particles background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        {[...Array(25)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-cyan-400 rounded-full opacity-30"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animation: `float ${4 + Math.random() * 3}s ease-in-out infinite ${Math.random() * 2}s`,
              boxShadow: "0 0 4px currentColor",
            }}
          />
        ))}
      </div>

      <div className="container mx-auto py-4 sm:py-8 px-2 sm:px-4 relative z-10">
        {/* Main Results Container */}
        <div
          className="relative overflow-hidden border-0 bg-black/80 backdrop-blur-sm shadow-2xl mb-4 sm:mb-8"
          style={{
            clipPath: "polygon(0% 0%, 95% 0%, 100% 5%, 100% 100%, 5% 100%, 0% 95%)",
            background:
              "linear-gradient(135deg, rgba(0,0,0,0.9) 0%, rgba(26,10,46,0.9) 25%, rgba(22,33,62,0.9) 50%, rgba(15,52,96,0.9) 75%, rgba(0,0,0,0.9) 100%)",
          }}
        >
          <CardHeader className="border-b border-cyan-400/30 bg-gradient-to-r from-black/50 to-purple-900/30 backdrop-blur-sm p-4 sm:p-6">
            <div className="text-center">
              <CardTitle className="text-2xl sm:text-4xl font-black mb-2">
                <span className="bg-gradient-to-r from-cyan-400 via-magenta-400 to-lime-400 bg-clip-text text-transparent animate-pulse">
                  {quiz.title}
                </span>
              </CardTitle>
              <p className="text-cyan-300 text-base sm:text-lg font-semibold">{quiz.description}</p>
            </div>
          </CardHeader>

          <CardContent className="p-4 sm:p-8">
            {/* Score Display - Futuristic Design */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-8 mb-8 sm:mb-12">
              {/* Main Score */}
              <div className="lg:col-span-2 relative">
                <div
                  className="p-4 sm:p-8 bg-gradient-to-br from-black/60 to-purple-900/30 backdrop-blur-sm border border-cyan-400/30 text-center"
                  style={{ clipPath: "polygon(0% 0%, 90% 0%, 100% 25%, 100% 100%, 10% 100%, 0% 75%)" }}
                >
                  <div className="flex items-center justify-center gap-3 sm:gap-4 mb-4 sm:mb-6">
                    <div className="w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-br from-cyan-400 to-magenta-500 rounded-lg flex items-center justify-center">
                      <Trophy className="w-6 h-6 sm:w-8 sm:h-8 text-white animate-pulse" />
                    </div>
                    <div>
                      <div
                        className={`text-4xl sm:text-6xl font-black bg-gradient-to-r ${getScoreColor(score)} bg-clip-text text-transparent`}
                      >
                        {score.toFixed(1)}%
                      </div>
                      <div className="text-xs sm:text-sm font-bold text-cyan-400 uppercase tracking-wider">
                        {getScoreGrade(score)}
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4 sm:gap-6 mt-6 sm:mt-8">
                    <div className="text-center">
                      <div className="text-xl sm:text-2xl font-black text-lime-400">{correctAnswers}</div>
                      <div className="text-[10px] sm:text-xs font-bold text-lime-300 uppercase tracking-wider">Correct</div>
                    </div>
                    <div className="text-center">
                      <div className="text-xl sm:text-2xl font-black text-red-400">{quiz.questions.length - correctAnswers}</div>
                      <div className="text-[10px] sm:text-xs font-bold text-red-300 uppercase tracking-wider">Incorrect</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Stats Sidebar */}
              <div className="space-y-4 sm:space-y-6">
                {/* Total Marks */}
                <div className="relative group">
                  <div
                    className="p-3 sm:p-4 bg-gradient-to-br from-magenta-500/20 to-purple-500/20 backdrop-blur-sm border border-magenta-400/30 transform group-hover:scale-105 transition-transform duration-300"
                    style={{ clipPath: "polygon(10% 0%, 100% 0%, 100% 75%, 90% 100%, 0% 100%, 0% 25%)" }}
                  >
                    <div className="flex items-center gap-2 sm:gap-3">
                      <Target className="h-5 w-5 sm:h-6 sm:w-6 text-magenta-400 animate-pulse" />
                      <div>
                        <div className="text-xl sm:text-2xl font-black text-magenta-400">{quiz.totalMarks || 100}</div>
                        <div className="text-[10px] sm:text-xs font-bold text-magenta-300 uppercase tracking-wider">Total Points</div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Time Limit */}
                <div className="relative group">
                  <div
                    className="p-3 sm:p-4 bg-gradient-to-br from-yellow-500/20 to-orange-500/20 backdrop-blur-sm border border-yellow-400/30 transform group-hover:scale-105 transition-transform duration-300"
                    style={{ clipPath: "polygon(0% 0%, 90% 0%, 100% 25%, 100% 100%, 10% 100%, 0% 75%)" }}
                  >
                    <div className="flex items-center gap-2 sm:gap-3">
                      <Clock className="h-5 w-5 sm:h-6 sm:w-6 text-yellow-400 animate-pulse" />
                      <div>
                        <div className="text-xl sm:text-2xl font-black text-yellow-400">{quiz.timeLimit}</div>
                        <div className="text-[10px] sm:text-xs font-bold text-yellow-300 uppercase tracking-wider">Minutes</div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Completion Time */}
                <div className="relative group">
                  <div
                    className="p-3 sm:p-4 bg-gradient-to-br from-cyan-500/20 to-blue-500/20 backdrop-blur-sm border border-cyan-400/30 transform group-hover:scale-105 transition-transform duration-300"
                    style={{ clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)" }}
                  >
                    <div className="flex items-center gap-2 sm:gap-3">
                      <CheckCircle2 className="h-5 w-5 sm:h-6 sm:w-6 text-cyan-400 animate-pulse" />
                      <div>
                        <div className="text-xs sm:text-sm font-black text-cyan-400">
                          {new Date(attempt.completedAt).toLocaleDateString()}
                        </div>
                        <div className="text-[10px] sm:text-xs font-bold text-cyan-300 uppercase tracking-wider">Completed</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Questions Review */}
            <div className="space-y-4 sm:space-y-6">
              <h2 className="text-xl sm:text-2xl font-black text-center mb-6 sm:mb-8 flex items-center justify-center gap-2 sm:gap-3">
                <Brain className="w-6 h-6 sm:w-8 sm:h-8 text-magenta-400 animate-pulse" />
                <span className="bg-gradient-to-r from-magenta-400 to-purple-400 bg-clip-text text-transparent">
                  {quiz.title}
                </span>
              </h2>

              {quiz.questions.map((question, index) => {
                const userAnswer = attempt.answers[index]
                const isCorrect = question.correctAnswer === userAnswer
                const wasAnswered = userAnswer !== -1

                return (
                  <Card
                    key={question._id}
                    className="border-0 bg-gradient-to-br from-black/60 to-purple-900/30 backdrop-blur-sm shadow-xl"
                  >
                    <CardContent className="p-4 sm:p-6">
                      <div className="space-y-3 sm:space-y-4">
                        {/* Question Header */}
                        <div className="flex items-start gap-3 sm:gap-4">
                          <div
                            className={`w-10 h-10 sm:w-12 sm:h-12 rounded-lg flex items-center justify-center font-black text-white ${
                              isCorrect
                                ? "bg-gradient-to-br from-lime-400 to-emerald-500"
                                : wasAnswered
                                  ? "bg-gradient-to-br from-red-400 to-pink-500"
                                  : "bg-gradient-to-br from-gray-400 to-gray-600"
                            }`}
                            style={{
                              clipPath:
                                index % 2 === 0
                                  ? "polygon(0% 0%, 100% 0%, 100% 75%, 75% 100%, 0% 100%)"
                                  : "polygon(25% 0%, 100% 0%, 100% 100%, 0% 100%, 0% 25%)",
                            }}
                          >
                            {index + 1}
                          </div>
                          <div className="flex-1">
                            <h3 className="font-bold text-white text-base sm:text-lg leading-relaxed">{question.text}</h3>
                            <div className="flex items-center gap-2 mt-2">
                              {isCorrect ? (
                                <CheckCircle2 className="w-4 h-4 sm:w-5 sm:h-5 text-lime-400" />
                              ) : wasAnswered ? (
                                <XCircle className="w-4 h-4 sm:w-5 sm:h-5 text-red-400" />
                              ) : (
                                <div className="w-4 h-4 sm:w-5 sm:h-5 rounded-full bg-gray-400" />
                              )}
                              <span
                                className={`text-xs sm:text-sm font-bold uppercase tracking-wider ${
                                  isCorrect ? "text-lime-400" : wasAnswered ? "text-red-400" : "text-gray-400"
                                }`}
                              >
                                {isCorrect ? "Correct" : wasAnswered ? "Incorrect" : "Not Answered"}
                              </span>
                            </div>
                          </div>
                        </div>

                        {/* Answer Options */}
                        <div className="space-y-2 sm:space-y-3 ml-12 sm:ml-16">
                          {question.options.map((option, optionIndex) => {
                            const isUserAnswer = optionIndex === userAnswer
                            const isCorrectAnswer = optionIndex === question.correctAnswer

                            return (
                              <div
                                key={optionIndex}
                                className={`p-3 sm:p-4 rounded-lg border transition-all duration-300 ${
                                  isCorrectAnswer
                                    ? "border-lime-400 bg-lime-400/10 shadow-lg shadow-lime-400/20"
                                    : isUserAnswer && !isCorrectAnswer
                                      ? "border-red-400 bg-red-400/10 shadow-lg shadow-red-400/20"
                                      : "border-gray-600/50 bg-black/20"
                                }`}
                              >
                                <div className="flex items-center gap-2 sm:gap-3">
                                  <div
                                    className={`w-5 h-5 sm:w-6 sm:h-6 rounded-full flex items-center justify-center text-xs sm:text-sm font-bold ${
                                      isCorrectAnswer
                                        ? "bg-lime-400 text-black"
                                        : isUserAnswer && !isCorrectAnswer
                                          ? "bg-red-400 text-white"
                                          : "bg-gray-600 text-gray-300"
                                    }`}
                                  >
                                    {String.fromCharCode(65 + optionIndex)}
                                  </div>
                                  <span
                                    className={`text-sm sm:text-base font-medium ${
                                      isCorrectAnswer
                                        ? "text-lime-300"
                                        : isUserAnswer && !isCorrectAnswer
                                          ? "text-red-300"
                                          : "text-gray-300"
                                    }`}
                                  >
                                    {option}
                                  </span>
                                  {isCorrectAnswer && <CheckCircle2 className="w-4 h-4 sm:w-5 sm:h-5 text-lime-400 ml-auto" />}
                                  {isUserAnswer && !isCorrectAnswer && (
                                    <XCircle className="w-4 h-4 sm:w-5 sm:h-5 text-red-400 ml-auto" />
                                  )}
                                </div>
                              </div>
                            )
                          })}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                )
              })}
            </div>

            {/* Action Button */}
            <div className="flex justify-center mt-8 sm:mt-12">
              <Button
                onClick={() => (window.location.href = "/quizzes")}
                className="relative bg-gradient-to-r from-cyan-400 via-magenta-400 to-lime-400 hover:from-cyan-500 hover:via-magenta-500 hover:to-lime-500 text-black font-black px-8 sm:px-12 py-3 sm:py-4 text-base sm:text-lg transition-all duration-300 hover:shadow-lg hover:shadow-cyan-400/30 overflow-hidden"
                style={{
                  clipPath: "polygon(0% 0%, 90% 0%, 100% 30%, 100% 100%, 10% 100%, 0% 70%)",
                }}
              >
                <span className="relative flex items-center gap-2 sm:gap-3 z-10">
                  <ArrowLeft className="w-5 h-5 sm:w-6 sm:h-6" />
                  Return to Neural Hub
                  <Hexagon className="w-5 h-5 sm:w-6 sm:h-6 animate-spin" />
                </span>
              </Button>
            </div>
          </CardContent>
        </div>
      </div>
    </div>
  );
} 