"use client";
import { useEffect, useState } from 'react';
import Header from "../../components/Header";
import Footer from "../../components/Footer";


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
    <>
    <Header />
    <div className="max-w-7xl mx-auto px-2 sm:px-4 py-8 w-full">
      <h1 className="text-3xl font-bold mb-8 text-gray-900">Latest Results</h1>
      <div className="w-full overflow-x-auto hide-scrollbar">
        <table className="w-full table-fixed border-collapse border border-orange-500 text-xs sm:text-sm md:text-base">
          <thead>
            <tr className="bg-red-600 text-[#FCFCD8] font-bold">
              <th className="p-2 text-center break-words whitespace-normal">Title</th>
            </tr>
          </thead>
          <tbody>
            {results.map((result) => (
              <tr key={result._id} className="border-t-2 border-red-500 bg-[#FFF8CC]">
                <td className="p-2 border-x text-left align-top break-words whitespace-pre-wrap flex justify-center">
                  <a href={`/results/${result._id}`} className="text-[#014F59] hover:underline hover:text-blue-800">
                    {result.title}
                  </a>
                </td>
               
              </tr>
            ))}
          </tbody>
        </table>
        {results.length === 0 && (
          <div className="text-center text-gray-600 dark:text-gray-400 mt-8">
            No results available at the moment.
          </div>
        )}
      </div>
    </div>
    <Footer />
    </>
  );
}