'use client';

import { useEffect, useState } from 'react';

interface Result {
  _id: string;
  title: string;
  organization: string;
  resultDate: string;
  category: string;
  downloadLink: string;
  status: string;
  createdAt: string;
  updatedAt: string;
  description?: string;
}

export default function ResultsPage() {
  const [results, setResults] = useState<Result[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchResults = async () => {
      try {
        const response = await fetch('/api/results');
        if (!response.ok) {
          throw new Error('Failed to fetch results');
        }
        const data = await response.json();
        setResults(data.data || []);
      } catch (err) {
        console.error('Failed to fetch results:', err);
        setError('Error loading results');
      } finally {
        setLoading(false);
      }
    };

    fetchResults();
  }, []);

  if (loading) {
    return <div className="flex justify-center items-center min-h-screen">Loading...</div>;
  }

  if (error) {
    return <div className="flex justify-center items-center min-h-screen text-red-500">{error}</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8 text-gray-900 ">Latest Results</h1>
      
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {results.map((result) => (
          <div 
            key={result._id}
            className="block bg-white  rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow duration-200"
          >
            <h2 className="text-xl font-semibold mb-2 text-gray-900 ">{result.title}</h2>
            
            <div className="mb-4">
              <p className="text-gray-600 dark:text-gray-300">{result.organization}</p>
              <p className="text-gray-600 dark:text-gray-300">Result Date: {new Date(result.resultDate).toLocaleDateString()}</p>
              <p className="text-gray-600 dark:text-gray-300">{result.description}</p>
            </div>
            
            <div className="flex justify-between items-end">
              <div className="text-sm text-gray-500 dark:text-gray-400">
                <p>Category: {result.category}</p>
                <p>Status: {result.status}</p>
              </div>
              <a 
                href={result.downloadLink}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 dark:text-blue-400 font-semibold hover:underline"
              >
                Download Result
              </a>
            </div>
          </div>
        ))}
      </div>

      {results.length === 0 && (
        <div className="text-center text-gray-600 dark:text-gray-400 mt-8">
          No results available at the moment.
        </div>
      )}
    </div>
  );
}