import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Clock, Users, FileText } from 'lucide-react';

interface QuizTileProps {
  quiz: {
    _id: string;
    title: string;
    description: string;
    timeLimit: number;
    questions: Array<{
      _id: string;
      question: string;
      options: string[];
      correctAnswer: string;
    }>;
  };
}

export default function QuizTile({ quiz }: QuizTileProps) {
  return (
    <Card className="hover:shadow-lg transition-shadow">
      <CardHeader>
        <CardTitle className="text-xl font-bold text-gray-800">{quiz.title}</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-gray-600 mb-4 line-clamp-2">{quiz.description}</p>
        <div className="flex items-center gap-4 text-sm text-gray-500 mb-4">
          <div className="flex items-center gap-1">
            <Clock className="w-4 h-4" />
            <span>{quiz.timeLimit} minutes</span>
          </div>
          <div className="flex items-center gap-1">
            <FileText className="w-4 h-4" />
            <span>{quiz.questions.length} questions</span>
          </div>
        </div>
        <div className="flex justify-between items-center">
          <Link href={`/quizzes/${quiz._id}`}>
            <Button variant="default">Start Quiz</Button>
          </Link>
          <Link href={`/quizzes/${quiz._id}/preview`}>
            <Button variant="outline">Preview</Button>
          </Link>
        </div>
      </CardContent>
    </Card>
  );
} 