

'use client'

import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import ResultForm from './ResultForm';

interface Result {
  _id: string;
  title: string;
  organization: string;
  resultDate: string;
  category: string;
  downloadLink: string;
  status: string;
  createdAt: string;
  description: string;
}

export default function ResultList() {
  const [results, setResults] = useState<Result[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [editingResult, setEditingResult] = useState<Result | null>(null);

  useEffect(() => {
    fetchResults();
    
  }, []);

  const fetchResults = async () => {
    try {
      setError(null);
      const response = await fetch('/api/results');
      if (response.ok) {
        const data = await response.json();
        // Sort results in descending order based on createdAt
        const sortedResults = data.data.sort((a: Result, b: Result) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
        setResults(sortedResults);
      } else {
        const errorData = await response.json().catch(() => ({}));
        setError(errorData.message || 'Failed to fetch results');
      }
    } catch (err) {
      console.error('Failed to fetch results:', err);
      setError('Error loading results. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = async (result: Result) => {
    setEditingResult(result);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleUpdate = async (data: Omit<Result, '_id' | 'createdAt'>) => {
    if (!editingResult) return;

    try {
      const response = await fetch(`/api/results/${editingResult._id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        const updatedResult = await response.json();
        setResults(results.map(result => 
          result._id === editingResult._id ? { ...result, ...updatedResult.data } : result
        ));
        setEditingResult(null);
        alert('Result updated successfully');
      } else {
        alert('Failed to update result');
      }
    } catch (error) {
      console.error('Error updating result:', error);
      alert('Error updating result');
    }
  };

  const handleDelete = async (resultId: string) => {
    if (!confirm('Are you sure you want to delete this result?')) return;
    
    try {
      const response = await fetch(`/api/results/${resultId}`, {
        method: 'DELETE',
      });
      
      if (response.ok) {
        setResults(results.filter(result => result._id !== resultId));
        alert('Result deleted successfully');
      } else {
        alert('Failed to delete result');
      }
    } catch (error) {
      console.error('Error deleting result:', error);
      alert('Error deleting result');
    }
  };

  if (loading) {
    return <div className="text-center">Loading...</div>;
  }

  if (error) {
    return (
      <div className="bg-white  rounded-lg shadow-lg p-6">
        <h2 className="font-bold">Not Posted the results</h2>
      </div>
    );
  }

  return (
    <div className="bg-white  rounded-lg shadow-lg p-6">
      <h2 className="text-2xl font-semibold mb-6">Posted Results</h2>
      <div className="space-y-4">
        {results.length === 0 ? (
          <p className="text-gray-500 dark:text-gray-400 text-center">No results posted yet</p>
        ) : (
          results.map((result) => (
            <div
              key={result._id}
              className="border rounded-lg p-4 hover:shadow-md transition-shadow"
            >
              <h3 className="text-lg font-semibold">{result.title}</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                {result.organization} • {result.category}
              </p>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                {result.description}
              </p>
              <div className="mt-2 flex items-center justify-between">
                <span className="text-sm text-gray-500 dark:text-gray-400">
                  Posted: {new Date(result.resultDate).toLocaleDateString()}
                </span>
                <span
                  className={`px-2 py-1 rounded-full text-xs ${result.status === 'published' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}`}
                >
                  {result.status}
                </span>
              </div>
              <div className="mt-3 flex gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  className="text-red-600 hover:text-red-700"
                  onClick={() => handleEdit(result)}
                >
                  Edit
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  className="text-red-600 hover:text-red-700"
                  onClick={() => handleDelete(result._id)}
                >
                  Delete
                </Button>
              </div>
            </div>
          ))
        )}
      </div>

      {editingResult && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg w-full max-w-2xl">
            <ResultForm
              initialData={editingResult}
              onSubmit={handleUpdate}
              onCancel={() => setEditingResult(null)}
            />
          </div>
        </div>
      )}
    </div>
  );
}