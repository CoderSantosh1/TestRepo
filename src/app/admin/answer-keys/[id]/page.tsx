'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button'; // Assuming Button component is used

// Define the structure of an AnswerKey, adjust as necessary
interface AnswerKey {
  _id: string;
  title: string;
  organization: string;
  examDate: string;
  category: string;
  downloadLink?: string;
  description?: string;
  content?: string; // Assuming content might be displayed
  status: string;
  // Add other relevant fields for AnswerKey
}

export default function AdminAnswerKeyDetail() {
  const params = useParams();
  const router = useRouter();
  const [answerKey, setAnswerKey] = useState<AnswerKey | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const answerKeyId = params?.id;

  useEffect(() => {
    if (!answerKeyId) {
      setError('Answer Key ID is missing.');
      setLoading(false);
      return;
    }

    const fetchAnswerKey = async () => {
      setLoading(true);
      try {
        if (!/^[a-f\d]{24}$/i.test(typeof answerKeyId === 'string' ? answerKeyId : answerKeyId[0])) {
          router.push('/404');
          return;
        }
        const response = await fetch(`/api/answer-keys/${answerKeyId}`);
        if (response.status === 404) {
          setError('Answer Key not found.');
          setAnswerKey(null);
          return;
        }
        if (!response.ok) {
          const errorData = await response.json().catch(() => ({ message: 'Failed to fetch answer key' }));
          throw new Error(errorData.message || 'Failed to fetch answer key');
        }
        const data = await response.json();
        setAnswerKey(data.data);
      } catch (err: any) {
        setError(err.message || 'Error fetching answer key details');
      } finally {
        setLoading(false);
      }
    };

    fetchAnswerKey();
  }, [answerKeyId]);

  const handleDelete = async () => {
    if (!answerKeyId) {
      setError('Answer Key ID is missing for deletion.');
      return;
    }
    if (!confirm('Are you sure you want to delete this answer key?')) return;

    try {
      const response = await fetch(`/api/answer-keys/${answerKeyId}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({ message: 'Failed to delete answer key' }));
        throw new Error(errorData.message || 'Failed to delete answer key');
      }
      alert('Answer key deleted successfully!');
      router.push('/admin?tab=answer-keys'); // Navigate back to the admin page, answer keys tab
    } catch (err: any) {
      setError(err.message || 'Error deleting answer key');
      alert(err.message || 'Error deleting answer key');
    }
  };

  // Navigate to an edit page (assuming it will be created at /admin/answer-keys/edit/[id])
  const handleEdit = () => {
    if (!answerKeyId) return;
    // For now, we'll log or alert, as the edit page structure isn't defined in this step
    // router.push(`/admin/answer-keys/edit/${answerKeyId}`);
    // Placeholder: In a real scenario, you'd navigate to an edit form/page.
    // For this task, the edit functionality is handled by a modal in the list view.
    // If a dedicated edit page is desired, it would be a separate feature.
    alert(`Edit functionality for ${answerKey?.title} would be here. For now, edit via the modal on the main admin page.`);
    // Or, if you want to go back to the main admin page to use the modal:
    router.push('/admin?tab=answer-keys');
  };

  if (loading) return <div className="container mx-auto p-6 text-center">Loading answer key details...</div>;
  if (error) return <div className="container mx-auto p-6 text-center text-red-500">{error}</div>;
  if (!answerKey) return <div className="container mx-auto p-6 text-center">Answer Key not found.</div>;

  return (
    <div className="container mx-auto p-6">
      <Button onClick={() => router.back()} variant="outline" className="mb-4">
        &larr; Back to List
      </Button>
      <h1 className="text-3xl font-bold mb-6">{answerKey.title}</h1>
      <div className="bg-white shadow-xl rounded-lg p-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div>
            <h2 className="text-sm font-semibold text-gray-500">Organization</h2>
            <p className="text-lg">{answerKey.organization}</p>
          </div>
          <div>
            <h2 className="text-sm font-semibold text-gray-500">Category</h2>
            <p className="text-lg">{answerKey.category}</p>
          </div>
          <div>
            <h2 className="text-sm font-semibold text-gray-500">Exam Date</h2>
            <p className="text-lg">{new Date(answerKey.examDate).toLocaleDateString()}</p>
          </div>
          <div>
            <h2 className="text-sm font-semibold text-gray-500">Status</h2>
            <p className={`text-lg font-medium ${answerKey.status === 'published' ? 'text-green-600' : 'text-yellow-600'}`}>
              {answerKey.status.charAt(0).toUpperCase() + answerKey.status.slice(1)}
            </p>
          </div>
        </div>

        {answerKey.description && (
          <div className="mb-6">
            <h2 className="text-sm font-semibold text-gray-500">Description</h2>
            <p className="text-gray-700 whitespace-pre-wrap">{answerKey.description}</p>
          </div>
        )}

        {answerKey.content && (
          <div className="mb-6">
            <h2 className="text-sm font-semibold text-gray-500">Content/Details</h2>
            <div className="prose max-w-none p-4 border rounded-md bg-gray-50">
              {/* Render HTML content safely if 'content' is HTML, or just display as text */}
              {/* For HTML: <div dangerouslySetInnerHTML={{ __html: answerKey.content }} /> */}
              <p className="whitespace-pre-wrap">{answerKey.content}</p>
            </div>
          </div>
        )}

        {answerKey.downloadLink && (
          <div className="mb-8">
            <h2 className="text-sm font-semibold text-gray-500 mb-1">Download Link</h2>
            <a 
              href={answerKey.downloadLink} 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-blue-600 hover:text-blue-800 hover:underline font-medium text-lg"
            >
              Click here to download
            </a>
          </div>
        )}

        <div className="mt-8 flex flex-col sm:flex-row gap-4 border-t pt-6">
          <Button
            onClick={handleEdit} // This will navigate back or show an alert as defined in handleEdit
            variant="outline"
            className="w-full sm:w-auto"
          >
            Edit (via Admin List)
          </Button>
          <Button
            onClick={handleDelete}
            variant="destructive"
            className="w-full sm:w-auto"
          >
            Delete
          </Button>
        </div>
      </div>
    </div>
  );
}