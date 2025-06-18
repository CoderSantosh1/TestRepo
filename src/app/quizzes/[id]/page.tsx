"use client";

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button, type ButtonProps } from '@/components/ui/button';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { toast } from 'sonner';
import { Progress } from '@/components/ui/progress';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { AlertCircle, Clock, CheckCircle2, Flag, ArrowRight, Zap, Star, Hexagon, Brain, ArrowLeft } from 'lucide-react';
import Link from "next/link"

enum QuestionStatus {
  NotViewed = 'not-viewed',
  Viewed = 'viewed',
  Attempted = 'attempted',
  ToReview = 'to-review',
  AttemptedAndMarkedForReview = 'attempted-review',
}

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
  questions: Question[];
}

const getStatusColor = (status: QuestionStatus): string => {
  switch (status) {
    case QuestionStatus.Attempted:
      return "from-lime-400 to-lime-600";
    case QuestionStatus.Viewed:
      return "from-red-400 to-red-600";
    case QuestionStatus.NotViewed:
      return "from-gray-500 to-gray-700";
    case QuestionStatus.ToReview:
      return "from-cyan-400 to-cyan-600";
    case QuestionStatus.AttemptedAndMarkedForReview:
      return "from-red-400 to-red-600";
    default:
      return "from-gray-500 to-gray-700";
  }
};

export default function TakeQuiz({ params }: { params: { id: string } }) {
  const router = useRouter();
  const [quiz, setQuiz] = useState<Quiz | null>(null);
  const [loading, setLoading] = useState(true);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<number[]>([]);
  const [timeLeft, setTimeLeft] = useState(0);
  const [submitting, setSubmitting] = useState(false);
  const [showWarning, setShowWarning] = useState(false);
  const [questionStatuses, setQuestionStatuses] = useState<QuestionStatus[]>([]);

  useEffect(() => {
    const fetchQuiz = async () => {
      try {
        const response = await fetch(`/api/quizzes/${params.id}`);
        if (!response.ok) {
          throw new Error('Failed to fetch quiz');
        }
        const data = await response.json();
        setQuiz(data);
        setTimeLeft(data.timeLimit * 60); // Convert minutes to seconds
        setAnswers(new Array(data.questions.length).fill(-1));
        setQuestionStatuses(new Array(data.questions.length).fill(QuestionStatus.NotViewed));
      } catch (error) {
        console.error('Error fetching quiz:', error);
        toast.error('Failed to load quiz');
        router.push('/quizzes');
      } finally {
        setLoading(false);
      }
    };

    fetchQuiz();
  }, [params.id, router]);

  useEffect(() => {
    if (timeLeft <= 0) {
      handleSubmit();
      return;
    }

    const timer = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft]);

  // Show warning when time is running low
  useEffect(() => {
    if (timeLeft <= 300) { // 5 minutes
      setShowWarning(true);
    }
  }, [timeLeft]);

  const handleAnswerChange = (value: string) => {
    const newAnswers = [...answers];
    newAnswers[currentQuestion] = parseInt(value);
    setAnswers(newAnswers);

    const newStatuses = [...questionStatuses];
    newStatuses[currentQuestion] = QuestionStatus.Attempted;
    setQuestionStatuses(newStatuses);
  };

  const handleNext = () => {
    if (currentQuestion < (quiz?.questions.length || 0) - 1) {
      setCurrentQuestion((prev) => {
        const newStatuses = [...questionStatuses];
        if (newStatuses[prev] === QuestionStatus.NotViewed) {
          newStatuses[prev] = QuestionStatus.Viewed;
        }
        setQuestionStatuses(newStatuses);
        return prev + 1;
      });
    }
  };

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion((prev) => {
        const newStatuses = [...questionStatuses];
        if (newStatuses[prev] === QuestionStatus.NotViewed) {
          newStatuses[prev] = QuestionStatus.Viewed;
        }
        setQuestionStatuses(newStatuses);
        return prev - 1;
      });
    }
  };

  const handleQuestionNavigation = (index: number) => {
    setCurrentQuestion(index);
    const newStatuses = [...questionStatuses];
    if (newStatuses[index] === QuestionStatus.NotViewed) {
      newStatuses[index] = QuestionStatus.Viewed;
    }
    setQuestionStatuses(newStatuses);
  };

  const handleMarkForReview = () => {
    const newStatuses = [...questionStatuses];
    if (newStatuses[currentQuestion] === QuestionStatus.Attempted) {
      newStatuses[currentQuestion] = QuestionStatus.AttemptedAndMarkedForReview;
    } else {
      newStatuses[currentQuestion] = QuestionStatus.ToReview;
    }
    setQuestionStatuses(newStatuses);
  };

  const handleClearResponse = () => {
    const newAnswers = [...answers];
    newAnswers[currentQuestion] = -1;
    setAnswers(newAnswers);

    const newStatuses = [...questionStatuses];
    if (newStatuses[currentQuestion] === QuestionStatus.Attempted) {
      newStatuses[currentQuestion] = QuestionStatus.Viewed;
    } else if (newStatuses[currentQuestion] === QuestionStatus.AttemptedAndMarkedForReview) {
      newStatuses[currentQuestion] = QuestionStatus.ToReview;
    } else if (newStatuses[currentQuestion] === QuestionStatus.ToReview) {
      newStatuses[currentQuestion] = QuestionStatus.Viewed;
    }
    setQuestionStatuses(newStatuses);
  };

  const handleSubmit = async () => {
    if (submitting) return;

    const unanswered = answers.filter((answer) => answer === -1).length;
    if (unanswered > 0) {
      const confirm = window.confirm(
        `You have ${unanswered} unanswered questions. Are you sure you want to submit?`
      );
      if (!confirm) return;
    }

    setSubmitting(true);
    try {
      const response = await fetch('/api/quiz-attempts', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          quizId: quiz?._id,
          userId: 'user123', // Replace with actual user ID
          answers,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to submit quiz');
      }

      const attempt = await response.json();
      toast.success('Quiz submitted successfully!');
      router.push(`/quizzes/${params.id}/results?attemptId=${attempt._id}`);
    } catch (error) {
      console.error('Error submitting quiz:', error);
      toast.error('Failed to submit quiz');
      setSubmitting(false);
    }
  };

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
            Initializing Neural Interface...
          </p>
        </div>
      </div>
    );
  }

  if (!quiz || !quiz.questions || quiz.questions.length === 0) {
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
            <AlertCircle className="w-8 h-8 text-white animate-pulse" />
          </div>
          <h1 className="text-3xl font-black mb-4 bg-gradient-to-r from-red-400 to-pink-400 bg-clip-text text-transparent">
            Neural Interface Not Found
          </h1>
          <Button
            onClick={() => router.push("/quizzes")}
            className="bg-gradient-to-r from-cyan-400 to-blue-500 hover:from-cyan-500 hover:to-blue-600 text-black font-bold px-8 py-3"
          >
            Return to Hub
          </Button>
        </Card>
      </div>
    );
  }

  const currentQuestionData = quiz.questions[currentQuestion];
  const progress = ((currentQuestion + 1) / quiz.questions.length) * 100;
  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;
  const answeredQuestions = answers.filter((answer) => answer !== -1).length;

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-black p-4">
      {/* Floating particles background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        {Array.from({ length: 20 }).map((_, i) => (
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

      <div className="container mx-auto py-8 px-4 relative z-10">
        {/* Warning Alert - Cyberpunk Style */}
        {/* {showWarning && (
          <Alert className="mb-6 border-0 bg-gradient-to-r from-red-500/20 to-orange-500/20 backdrop-blur-sm animate-pulse">
            <div className="absolute inset-0 bg-gradient-to-r from-red-500/10 to-orange-500/10 animate-pulse" />
            <AlertCircle className="h-5 w-5 text-red-400 animate-spin" />
            <AlertDescription className="flex items-center gap-2 text-red-300 font-bold">
              <span className="text-red-400">⚠️ CRITICAL:</span>
              <span>Time quantum depleting rapidly!</span>
            </AlertDescription>
          </Alert>
        )} */}

        {/* Main Interface Container */}
        <div
          className="relative overflow-hidden border-0 bg-black/80 backdrop-blur-sm shadow-2xl"
          style={{
            clipPath: "polygon(0% 0%, 95% 0%, 100% 5%, 100% 100%, 5% 100%, 0% 95%)",
            background:
              "linear-gradient(135deg, rgba(0,0,0,0.9) 0%, rgba(26,10,46,0.9) 25%, rgba(22,33,62,0.9) 50%, rgba(15,52,96,0.9) 75%, rgba(0,0,0,0.9) 100%)",
          }}
        >
          {/* Animated border */}
          <div className="absolute top-0 left-0 w-full h-0.5 bg-gradient-to-r from-cyan-400 via-magenta-400 to-lime-400 opacity-50 animate-pulse" />
          <div className="absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-lime-400 via-cyan-400 to-magenta-400 opacity-50 animate-pulse" />

          {/* Header Section */}
          <CardHeader className="border-b border-cyan-400/30 bg-gradient-to-r from-black/50 to-purple-900/30 backdrop-blur-sm">
            <div className="text-center mb-6">
              <CardTitle className="text-4xl font-black mb-2">
                <span className="bg-gradient-to-r from-cyan-400 via-magenta-400 to-lime-400 bg-clip-text text-transparent animate-pulse">
                  {quiz.title}
                </span>
              </CardTitle>
              <p className="text-cyan-300 text-lg font-semibold">{quiz.description}</p>
            </div>

            {/* Stats Grid - Futuristic Design */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
              {/* Time Left */}
              <div className="relative group">
                <div
                  className="p-4 bg-gradient-to-br from-red-500/20 to-orange-500/20 backdrop-blur-sm border border-red-400/30 transform group-hover:scale-105 transition-transform duration-300"
                  style={{ clipPath: "polygon(0% 0%, 90% 0%, 100% 25%, 100% 100%, 10% 100%, 0% 75%)" }}
                >
                  <div className="flex items-center justify-center gap-3">
                    <Clock className="h-6 w-6 text-red-400 animate-pulse" />
                    <div className="text-center">
                      <div className="text-2xl font-black text-red-400">
                        {minutes}:{seconds.toString().padStart(2, "0")}
                      </div>
                      <div className="text-xs font-bold text-red-300 uppercase tracking-wider">Time Quantum</div>
                    </div>
                  </div>
                </div>
                <div className="absolute inset-0 bg-red-400/20 blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10" />
              </div>

              {/* Answered Questions */}
              <div className="relative group">
                <div
                  className="p-4 bg-gradient-to-br from-lime-500/20 to-emerald-500/20 backdrop-blur-sm border border-lime-400/30 transform group-hover:scale-105 transition-transform duration-300"
                  style={{ clipPath: "polygon(10% 0%, 100% 0%, 100% 75%, 90% 100%, 0% 100%, 0% 25%)" }}
                >
                  <div className="flex items-center justify-center gap-3">
                    <CheckCircle2 className="h-6 w-6 text-lime-400 animate-pulse" />
                    <div className="text-center">
                      <div className="text-2xl font-black text-lime-400">
                        {answeredQuestions}/{quiz.questions.length}
                      </div>
                      <div className="text-xs font-bold text-lime-300 uppercase tracking-wider">Completed</div>
                    </div>
                  </div>
                </div>
                <div className="absolute inset-0 bg-lime-400/20 blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10" />
              </div>

              {/* Current Question */}
              <div className="relative group">
                <div
                  className="p-4 bg-gradient-to-br from-cyan-500/20 to-blue-500/20 backdrop-blur-sm border border-cyan-400/30 transform group-hover:scale-105 transition-transform duration-300"
                  style={{ clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)" }}
                >
                  <div className="flex items-center justify-center gap-3">
                    <Brain className="h-6 w-6 text-cyan-400 animate-spin" />
                    <div className="text-center">
                      <div className="text-2xl font-black text-cyan-400">
                        {currentQuestion + 1}/{quiz.questions.length}
                      </div>
                      <div className="text-xs font-bold text-cyan-300 uppercase tracking-wider">Current Node</div>
                    </div>
                  </div>
                </div>
                <div className="absolute inset-0 bg-cyan-400/20 blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10" />
              </div>
            </div>

            {/* Progress Bar - Holographic Style */}
            <div className="relative">
              <div className="h-3 bg-black/50 rounded-full border border-cyan-400/30 overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-cyan-400 via-magenta-400 to-lime-400 transition-all duration-500 relative"
                  style={{ width: `${progress}%` }}
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-pulse" />
                </div>
              </div>
              <div className="absolute inset-0 bg-gradient-to-r from-cyan-400/20 via-magenta-400/20 to-lime-400/20 blur-sm animate-pulse" />
            </div>
          </CardHeader>

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 p-8">
            {/* Question Section */}
            <div className="lg:col-span-3">
              <Card className="border-0 bg-gradient-to-br from-black/60 to-purple-900/30 backdrop-blur-sm shadow-2xl">
                <CardHeader className="border-b border-magenta-400/30">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-magenta-400 to-purple-600 rounded-lg flex items-center justify-center">
                      <Brain className="w-6 h-6 text-white animate-pulse" />
                    </div>
                    <div className="text-sm font-bold text-magenta-400 uppercase tracking-wider">Neural Query</div>
                  </div>
                  <CardTitle className="text-xl font-bold text-white leading-relaxed">
                    {currentQuestionData.text}
                  </CardTitle>
                </CardHeader>

                <CardContent className="pt-6">
                  <RadioGroup
                    value={answers[currentQuestion]?.toString() || ""}
                    onValueChange={handleAnswerChange}
                    className="space-y-4"
                  >
                    {currentQuestionData.options.map((option, index) => (
                      <div
                        key={index}
                        className={`group relative p-4 rounded-lg border transition-all duration-300 cursor-pointer hover:scale-[1.02] ${answers[currentQuestion] === index
                            ? "border-cyan-400 bg-cyan-400/10 shadow-lg shadow-cyan-400/20"
                            : "border-gray-600/50 bg-black/20 hover:border-magenta-400/50 hover:bg-magenta-400/5"
                          }`}
                        onClick={() => handleAnswerChange(index.toString())}
                      >
                        <div className="flex items-center space-x-4">
                          <div className="relative">
                            <RadioGroupItem
                              value={index.toString()}
                              id={`option-${index}`}
                              className="h-6 w-6 border-2 border-cyan-400 text-cyan-400"
                            />
                            {answers[currentQuestion] === index && (
                              <div className="absolute inset-0 bg-cyan-400/20 rounded-full blur-sm animate-pulse" />
                            )}
                          </div>
                          <Label
                            htmlFor={`option-${index}`}
                            className="text-gray-200 cursor-pointer flex-1 font-medium text-lg"
                          >
                            {option}
                          </Label>
                        </div>

                        {/* Hover effect */}
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-magenta-400/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-lg" />
                      </div>
                    ))}
                  </RadioGroup>
                </CardContent>
              </Card>

              {/* Action Buttons */}
              <div className="mt-8 flex flex-wrap justify-between gap-4">
                <div className="flex gap-4">
                  <Button
                    onClick={handleClearResponse}
                    className="border-2 border-red-400 text-red-400 bg-transparent hover:bg-red-400/10 font-bold px-6 py-3 transition-all duration-300 hover:shadow-lg hover:shadow-red-400/20"
                  >
                    Clear Response
                  </Button>
                  <Button
                    onClick={handleMarkForReview}
                    className="border-2 border-yellow-400 text-yellow-400 bg-transparent hover:bg-yellow-400/10 font-bold px-6 py-3 transition-all duration-300 hover:shadow-lg hover:shadow-yellow-400/20"
                  >
                    <Flag className="h-4 w-4 mr-2" />
                    Mark for Review
                  </Button>
                </div>

                <div className="flex gap-4">
                  <Button
                    onClick={handlePrevious}
                    disabled={currentQuestion === 0}
                    className="border-2 border-cyan-400 text-cyan-400 bg-transparent hover:bg-cyan-400/10 font-bold px-6 py-3 transition-all duration-300 hover:shadow-lg hover:shadow-cyan-400/20 disabled:opacity-50"
                  >
                    <ArrowLeft className="h-4 w-4 mr-2" />
                    Previous
                  </Button>

                  {currentQuestion === quiz.questions.length - 1 ? (
                    <Button
                      onClick={handleSubmit}
                      disabled={submitting}
                      className="bg-gradient-to-r from-lime-400 to-emerald-500 hover:from-lime-500 hover:to-emerald-600 text-black font-black px-8 py-3 transition-all duration-300 hover:shadow-lg hover:shadow-lime-400/30"
                    >
                      {submitting ? (
                        <span className="flex items-center gap-2">
                          <div className="h-4 w-4 animate-spin rounded-full border-2 border-black border-t-transparent"></div>
                          Submitting...
                        </span>
                      ) : (
                        <>
                          <Zap className="h-4 w-4 mr-2" />
                          Submit Quiz
                        </>
                      )}
                    </Button>
                  ) : (
                    <Button
                      onClick={handleNext}
                      className="bg-gradient-to-r from-magenta-400 to-purple-500 hover:from-magenta-500 hover:to-purple-600 text-white font-black px-8 py-3 transition-all duration-300 hover:shadow-lg hover:shadow-magenta-400/30"
                    >
                      Next
                      <ArrowRight className="h-4 w-4 ml-2" />
                    </Button>
                  )}
                </div>
              </div>
            </div>

            {/* Question Overview Sidebar */}
            <div className="lg:col-span-1">
              <div
                className="p-6 bg-gradient-to-br from-black/80 to-purple-900/40 backdrop-blur-sm border border-cyan-400/30 shadow-2xl"
                style={{ clipPath: "polygon(0% 0%, 100% 0%, 100% 95%, 95% 100%, 0% 100%)" }}
              >
              <h3 className="text-xl font-black text-cyan-400 mb-6 flex items-center justify-between">
                    {/* Left: Spinning Hexagon */}
                    <div className="flex items-center gap-2">
                      <Hexagon className="w-5 h-5 animate-spin" />
                     
                    </div>

                    {/* Right: Ping and Active */}
                    <div className="flex items-center gap-2">
                      <span className="relative flex h-3 w-3">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
                      </span>
                      <span className="text-green-400 animate-pulse text-sm font-semibold">Active</span>
                    </div>
                  </h3>

                

                {/* Question Grid */}
                <div className="grid grid-cols-5 gap-2 mb-8">
                  {quiz.questions.map((_, index) => {
                    const status = questionStatuses[index] || QuestionStatus.NotViewed;
                    const isActive = currentQuestion === index;

                    return (
                      <Button
                        key={index}
                        onClick={() => handleQuestionNavigation(index)}
                        className={`
                          relative w-12 h-12 rounded-lg font-black text-white transition-all duration-300 hover:scale-110
                          ${isActive ? "ring-2 ring-cyan-400 ring-offset-2 ring-offset-black" : ""}
                          bg-gradient-to-br ${getStatusColor(status)}
                          hover:shadow-lg hover:shadow-current/30
                        `}
                        style={{
                          clipPath:
                            index % 2 === 0
                              ? "polygon(0% 0%, 100% 0%, 100% 75%, 75% 100%, 0% 100%)"
                              : "polygon(25% 0%, 100% 0%, 100% 100%, 0% 100%, 0% 25%)",
                        }}
                      >
                        {index + 1}
                        {isActive && (
                          <div className="absolute inset-0 bg-cyan-400/20 blur-sm animate-pulse rounded-lg" />
                        )}
                      </Button>
                    );
                  })}
                </div>

                {/* Status Legend */}
                <div className="space-y-4">
                  <h4 className="text-sm font-bold text-pink-400 uppercase tracking-wider">Status Questions</h4>
                  {[
                    {
                      status: QuestionStatus.Attempted,
                      label: "Completed",
                      color: "bg-gradient-to-r from-lime-400 to-lime-600",
                    },
                    {
                      status: QuestionStatus.Viewed,
                      label: "Incomplete",
                      color: "bg-gradient-to-r from-red-400 to-red-600",
                    },
                    {
                      status: QuestionStatus.NotViewed,
                      label: "Unvisited",
                      color: "bg-gradient-to-r from-gray-500 to-gray-700",
                    },
                    {
                      status: QuestionStatus.ToReview,
                      label: "Review Queue",
                      color: "bg-gradient-to-r from-cyan-400 to-cyan-600",
                    },
                  ].map(({ label, color }) => (
                    <div key={label} className="flex items-center gap-3">
                      <div className={`w-4 h-4 rounded-full ${color} shadow-lg`} />
                      <span className="text-gray-300 text-sm font-medium">{label}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 