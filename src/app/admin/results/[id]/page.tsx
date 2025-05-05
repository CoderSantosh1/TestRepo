'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { Result } from '../../../../types/result';

export default function AdminResultDetail() {
  const params = useParams();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const router = useRouter();
  const [result, setResult] = useState<Result | null>(null);

  useEffect(() => {
    const fetchResult = async () => {
      try {
        const response = await fetch(`/api/results/${params?.id}`);
        if (!response.ok) {
          throw new Error('Failed to fetch result');
        }
        const data = await response.json();
        setResult(data.data);
      } catch (err) {
        setError('Error fetching result details');
      } finally {
        setLoading(false);
      }
    };

    if (params?.id) {
      fetchResult();
    }
  }, [params?.id]);

  const handleDelete = async () => {
    try {
      const response = await fetch(`/api/results/${params?.id}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error('Failed to delete result');
      }

      router.push('/admin');
    } catch (err) {
      setError('Error deleting result');
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;
  if (!result) return <div>Result not found</div>;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">{result.title}</h1>
      <div className="bg-white shadow rounded-lg p-6">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <h2 className="text-gray-500">Organization</h2>
            <p>{result.organization}</p>
          </div>
          <div>
            <h2 className="text-gray-500">Category</h2>
            <p>{result.category}</p>
          </div>
          <div>
            <h2 className="text-gray-500">Result Date</h2>
            <p>{new Date(result.resultDate).toLocaleDateString()}</p>
          </div>
          <div>
            <h2 className="text-gray-500">Status</h2>
            <p>{result.status}</p>
          </div>
        </div>
        
        <div className="mt-6">
          <h2 className="text-gray-500">Download Link</h2>
          <a 
            href={result.downloadLink} 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-blue-600 hover:underline"
          >
            View Result
          </a>
        </div>

        <div className="mt-8 flex gap-4">
          <button
            onClick={() => router.push(`/admin/results/edit/${params?.id}`)}
            className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
          >
            Edit
          </button>
          <button
            onClick={handleDelete}
            className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}