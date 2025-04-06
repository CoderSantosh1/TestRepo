'use client';

import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';

interface Result {
  _id: string;
  title: string;
  organization: string;
  resultDate: string;
  category: string;
  resultLink?: string;
  description?: string;
  status: string;
  createdAt: string;
}

import ResultForm from './ResultForm';

export default function ResultList() {
  const [results, setResults] = useState<Result[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingResult, setEditingResult] = useState<Result | null>(null);

  useEffect(() => {
    fetchResults();
  }, []);

  const fetchResults = async () => {
    try {
      const response = await fetch('/api/results');
      if (response.ok) {
        const data = await response.json();
        setResults(data.data);
      } else {
        console.error('Failed to fetch results');
      }
    } catch (error) {
      console.error('Error fetching results:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this result?')) return;
    
    try {
      const response = await fetch(`/api/results/${id}`, {
        method: 'DELETE',
      });
      
      if (response.ok) {
        setResults(results.filter(result => result._id !== id));
      } else {
        console.error('Failed to delete result');
      }
    } catch (error) {
      console.error('Error deleting result:', error);
    }
  };

  const handleEdit = (result: Result) => {
    setEditingResult(result);
  };

  const handleUpdate = async (updatedResult: Result) => {
    try {
      const response = await fetch(`/api/results/${updatedResult._id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedResult),
      });

      if (response.ok) {
        setResults(results.map(result => 
          result._id === updatedResult._id ? updatedResult : result
        ));
        setEditingResult(null);
      } else {
        console.error('Failed to update result');
      }
    } catch (error) {
      console.error('Error updating result:', error);
    }
  };

  if (loading) {
    return <div className="text-center">Loading...</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
        <div className="w-full">
          <ResultForm 
            initialData={editingResult}
            onSubmit={async (data) => {
              if (editingResult) {
                await handleUpdate({ ...editingResult, ...data });
              } else {
                try {
                  const response = await fetch('/api/results', {
                    method: 'POST',
                    headers: {
                      'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(data),
                  });
  
                  if (response.ok) {
                    const newResult = await response.json();
                    setResults([...results, newResult.data]);
                  }
                } catch (error) {
                  console.error('Error creating result:', error);
                }
              }
            }}
            onCancel={() => setEditingResult(null)}
          />
        </div>
        <div className="w-full bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 h-fit">
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
                  <div className="mt-2 flex items-center justify-between">
                    <span className="text-sm text-gray-500 dark:text-gray-400">
                      Result Date: {new Date(result.resultDate).toLocaleDateString()}
                    </span>
                    <span
                      className={`px-2 py-1 rounded-full text-xs ${result.status === 'published' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}`}
                    >
                      {result.status}
                    </span>
                  </div>
                  {result.resultLink && (
                    <p className="text-sm text-blue-600 mt-2">
                      <a href={result.resultLink} target="_blank" rel="noopener noreferrer">
                        View Result
                      </a>
                    </p>
                  )}
                  <div className="mt-3 flex gap-2">
                    <Button
                      variant="outline"
                      size="sm"
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
        </div>
      </div>
    </div>
  );
}