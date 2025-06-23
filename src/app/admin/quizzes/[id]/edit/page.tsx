'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { toast } from 'sonner';

interface Question {
  _id?: string;
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

export default function EditQuiz({ params }: { params: { id: string } }) {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [quiz, setQuiz] = useState<Quiz | null>(null);

  useEffect(() => {
    fetchQuiz();
  }, [params.id]);

  const fetchQuiz = async () => {
    try {
      const response = await fetch(`/api/quizzes/${params.id}`);
      if (!response.ok) {
        throw new Error('Failed to fetch quiz');
      }
      const data = await response.json();
      setQuiz(data);
    } catch (error) {
      console.error('Error fetching quiz:', error);
      toast.error('Failed to fetch quiz');
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    setQuiz(prev => prev ? { ...prev, [name]: type === 'number' ? Number(value) : value } : null);
  };

  const handleQuestionChange = (index: number, field: string, value: string) => {
    setQuiz(prev => {
      if (!prev) return null;
      const questions = [...prev.questions];
      questions[index] = { ...questions[index], [field]: value };
      return { ...prev, questions };
    });
  };

  const handleOptionChange = (questionIndex: number, optionIndex: number, value: string) => {
    setQuiz(prev => {
      if (!prev) return null;
      const questions = [...prev.questions];
      questions[questionIndex].options[optionIndex] = value;
      return { ...prev, questions };
    });
  };

  const handleCorrectAnswerChange = (questionIndex: number, value: number) => {
    setQuiz(prev => {
      if (!prev) return null;
      const questions = [...prev.questions];
      questions[questionIndex].correctAnswer = value;
      return { ...prev, questions };
    });
  };

  const addQuestion = () => {
    setQuiz(prev => {
      if (!prev) return null;
      return {
        ...prev,
        questions: [
          ...prev.questions,
          {
            text: '',
            options: ['', '', '', ''],
            correctAnswer: 0
          }
        ]
      };
    });
  };

  const removeQuestion = (index: number) => {
    setQuiz(prev => {
      if (!prev) return null;
      const questions = [...prev.questions];
      questions.splice(index, 1);
      return { ...prev, questions };
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!quiz) return;

    if (!quiz.title.trim()) {
      toast.error('Title is required');
      return;
    }
    if (!quiz.description.trim()) {
      toast.error('Description is required');
      return;
    }
    if (quiz.questions.length === 0) {
      toast.error('At least one question is required');
      return;
    }

    try {
      setSaving(true);
      const response = await fetch(`/api/quizzes/${params.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(quiz),
      });

      if (!response.ok) {
        throw new Error('Failed to update quiz');
      }

      toast.success('Quiz updated successfully');
      router.push('/admin/quizzes');
    } catch (error) {
      console.error('Error updating quiz:', error);
      toast.error('Failed to update quiz');
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="container mx-auto py-8">
        <div className="text-center">Loading...</div>
      </div>
    );
  }

  if (!quiz) {
    return (
      <div className="container mx-auto py-8">
        <div className="text-center text-red-500">Quiz not found</div>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-8">
      <Card>
        <CardHeader>
          <CardTitle>Edit Quiz</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-4">
              <div>
                <Label htmlFor="title">Title</Label>
                <Input
                  id="title"
                  name="title"
                  value={quiz.title}
                  onChange={handleInputChange}
                  placeholder="Enter quiz title"
                  required
                />
              </div>

              <div>
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  name="description"
                  value={quiz.description}
                  onChange={handleInputChange}
                  placeholder="Enter quiz description"
                  required
                />
              </div>

              <div>
                <Label htmlFor="timeLimit">Time Limit (minutes)</Label>
                <Input
                  id="timeLimit"
                  name="timeLimit"
                  type="number"
                  value={quiz.timeLimit}
                  onChange={handleInputChange}
                  min="1"
                  required
                />
              </div>

              <div>
                <Label htmlFor="totalMarks">Total Marks</Label>
                <Input
                  id="totalMarks"
                  name="totalMarks"
                  type="number"
                  value={quiz.totalMarks}
                  onChange={handleInputChange}
                  min="0"
                  required
                />
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-medium">Questions</h3>
                <Button
                  type="button"
                  onClick={addQuestion}
                  variant="outline"
                >
                  Add Question
                </Button>
              </div>

              {quiz.questions.map((question, questionIndex) => (
                <div key={questionIndex} className="p-4 border rounded-lg space-y-4">
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <Label>Question {questionIndex + 1}</Label>
                      <Textarea
                        value={question.text}
                        onChange={(e) => handleQuestionChange(questionIndex, 'text', e.target.value)}
                        placeholder="Enter question"
                        className="mt-1"
                      />
                    </div>
                    <Button
                      type="button"
                      variant="destructive"
                      size="sm"
                      onClick={() => removeQuestion(questionIndex)}
                      className="ml-4"
                    >
                      Remove
                    </Button>
                  </div>

                  <div className="space-y-2">
                    <Label>Options</Label>
                    {question.options.map((option, optionIndex) => (
                      <div key={optionIndex} className="flex items-center gap-2">
                        <Input
                          value={option}
                          onChange={(e) => handleOptionChange(questionIndex, optionIndex, e.target.value)}
                          placeholder={`Option ${optionIndex + 1}`}
                        />
                        <input
                          type="radio"
                          name={`correctAnswer-${questionIndex}`}
                          checked={question.correctAnswer === optionIndex}
                          onChange={() => handleCorrectAnswerChange(questionIndex, optionIndex)}
                          className="w-4 h-4"
                        />
                        <Label>Correct</Label>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            <div className="flex justify-end gap-4">
              <Button
                type="button"
                variant="outline"
                onClick={() => router.back()}
              >
                Cancel
              </Button>
              <Button type="submit" disabled={saving}>
                {saving ? 'Saving...' : 'Save Changes'}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
} 