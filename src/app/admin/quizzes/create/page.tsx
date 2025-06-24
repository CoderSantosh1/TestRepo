'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { toast } from 'sonner';

interface Question {
  text: string;
  options: string[];
  correctAnswer: string;
}

export default function CreateQuiz() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    timeLimit: 30,
    totalMarks: 0,
    questions: [] as Question[]
  });

  const [currentQuestion, setCurrentQuestion] = useState<Question>({
    text: '',
    options: ['', '', '', ''],
    correctAnswer: ''
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'number' ? Number(value) : value
    }));
  };

  const handleQuestionChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setCurrentQuestion(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleOptionChange = (index: number, value: string) => {
    setCurrentQuestion(prev => {
      const wasCorrect = prev.correctAnswer === prev.options[index];
      const newOptions = prev.options.map((opt, i) => i === index ? value : opt);
      return {
        ...prev,
        options: newOptions,
        correctAnswer: wasCorrect ? value : prev.correctAnswer
      };
    });
  };

  const handleCorrectAnswerChange = (value: string) => {
    setCurrentQuestion(prev => ({
      ...prev,
      correctAnswer: value
    }));
  };

  const addQuestion = () => {
    if (!currentQuestion.text.trim()) {
      toast.error('Question text is required');
      return;
    }
    if (currentQuestion.options.some(opt => !opt.trim())) {
      toast.error('All options must be filled');
      return;
    }
    if (!currentQuestion.correctAnswer) {
      toast.error('Please select a correct answer');
      return;
    }

    setFormData(prev => ({
      ...prev,
      questions: [...prev.questions, currentQuestion]
    }));

    setCurrentQuestion({
      text: '',
      options: ['', '', '', ''],
      correctAnswer: ''
    });
  };

  const removeQuestion = (index: number) => {
    setFormData(prev => ({
      ...prev,
      questions: prev.questions.filter((_, i) => i !== index)
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log('[DEBUG] handleSubmit called');
    console.log('[DEBUG] formData:', formData);
    if (!formData.title.trim()) {
      toast.error('Title is required');
      return;
    }
    if (!formData.description.trim()) {
      toast.error('Description is required');
      return;
    }
    if (formData.questions.length === 0) {
      toast.error('At least one question is required');
      return;
    }

    try {
      setLoading(true);
      const response = await fetch('/api/quizzes', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      console.log('[DEBUG] API response status:', response.status);
      if (!response.ok) {
        throw new Error('Failed to create quiz');
      }

      toast.success('Quiz created successfully');
      router.push('/admin/quizzes');
    } catch (error) {
      console.error('[DEBUG] Error creating quiz:', error);
      toast.error('Failed to create quiz');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto py-8">
      <Card>
        <CardHeader>
          <CardTitle>Create New Quiz</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-4">
              <div>
                <Label htmlFor="title">Title</Label>
                <Input
                  id="title"
                  name="title"
                  value={formData.title}
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
                  value={formData.description}
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
                  value={formData.timeLimit}
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
                  value={formData.totalMarks}
                  onChange={handleInputChange}
  
                  min=""
                  required
                />
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="text-lg font-medium">Add Question</h3>
              <div>
                <Label htmlFor="text">Question</Label>
                <Textarea
                  id="text"
                  name="text"
                  value={currentQuestion.text}
                  onChange={handleQuestionChange}
                  placeholder="Enter question"
                />
              </div>

              <div className="space-y-2">
                <Label>Options</Label>
                {currentQuestion.options.map((option, index) => (
                  <div key={index} className="flex items-center gap-2">
                    <Input
                      value={option}
                      onChange={(e) => handleOptionChange(index, e.target.value)}
                      placeholder={`Option ${index + 1}`}
                    />
                    <input
                      type="radio"
                      name="correctAnswer"
                      checked={currentQuestion.correctAnswer === option}
                      onChange={() => handleCorrectAnswerChange(option)}
                      className="w-4 h-4"
                    />
                    <Label>Correct</Label>
                  </div>
                ))}
              </div>

              <Button
                type="button"
                onClick={addQuestion}
                variant="outline"
              >
                Add Question
              </Button>
            </div>

            {formData.questions.length > 0 && (
              <div className="space-y-4">
                <h3 className="text-lg font-medium">Added Questions</h3>
                {formData.questions.map((q, index) => (
                  <div key={index} className="p-4 border rounded-lg">
                    <div className="flex justify-between items-start">
                      <div>
                        <p className="font-medium">{q.text}</p>
                        <ul className="mt-2 space-y-1">
                          {q.options.map((opt, optIndex) => (
                            <li key={optIndex} className="flex items-center gap-2">
                              {opt}
                              {opt === q.correctAnswer && (
                                <span className="text-green-500">✓</span>
                              )}
                            </li>
                          ))}
                        </ul>
                      </div>
                      <Button
                        type="button"
                        variant="destructive"
                        size="sm"
                        onClick={() => removeQuestion(index)}
                      >
                        Remove
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            )}

            <div className="flex justify-end gap-4">
              <Button
                type="button"
                variant="outline"
                onClick={() => router.back()}
              >
                Cancel
              </Button>
              <Button type="submit" disabled={loading}>
                {loading ? 'Creating...' : 'Create Quiz'}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
} 