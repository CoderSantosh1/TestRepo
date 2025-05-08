'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { AdmitCard } from '@/types/admit-card';

export default function AdminAdmitCardDetail() {
  const params = useParams();
  const router = useRouter();
  const [admitCard, setAdmitCard] = useState<AdmitCard | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  if (!params || !params.id) {
    setError('Invalid parameters');
    setLoading(false);
    return;
  }

  useEffect(() => {
    const fetchAdmitCard = async () => {
      try {
        const params = useParams();
        if (!params || !params.id) {
          setError('Invalid parameters');
          setLoading(false);
          return;
        }
        const response = await fetch(`/api/admit-cards/${params.id}`);
        if (!response.ok) {
          throw new Error('Failed to fetch admit card');
        }
        const data = await response.json();
        setAdmitCard(data.data);
      } catch (err) {
        setError('Error fetching admit card details');
      } finally {
        setLoading(false);
      }
    };

    if (params && params.id) {
      fetchAdmitCard();
    }
  }, [params]);

  const handleDelete = async () => {
    try {
      const response = await fetch(`/api/admit-cards/${params?.id}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error('Failed to delete admit card');
      }

      router.push('/admin');
    } catch (err) {
      setError('Error deleting admit card');
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;
  if (!admitCard) return <div>Admit Card not found</div>;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">{admitCard.examName}</h1>
      <div className="bg-white shadow rounded-lg p-6">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <h2 className="text-gray-500">Candidate Name</h2>
            <p>{admitCard.candidateName}</p>
          </div>
          <div>
            <h2 className="text-gray-500">Roll Number</h2>
            <p>{admitCard.rollNumber}</p>
          </div>
          <div>
            <h2 className="text-gray-500">Exam Date</h2>
            <p>{new Date(admitCard.examDate).toLocaleDateString()}</p>
          </div>
          <div>
            <h2 className="text-gray-500">Exam Center</h2>
            <p>{admitCard.examCenter}</p>
          </div>
          <div>
            <h2 className="text-gray-500">Status</h2>
            <p>{admitCard.status}</p>
          </div>
        </div>
        
        <div className="mt-6">
          <h2 className="text-gray-500">Download Link</h2>
          <a 
            href={admitCard.downloadAdmitcardLink} 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-blue-600 hover:underline"
          >
            Download Admit Card
          </a>
        </div>

        <div className="mt-8 flex gap-4">
          <button
            onClick={() => router.push(`/admin/admit-cards/edit/${params?.id}`)}
            className="bg-red-500 text-white px-4 py-2 rounded hover:bg-blue-600"
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
