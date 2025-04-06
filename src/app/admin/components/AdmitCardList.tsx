'use client';

import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';

interface AdmitCard {
  _id: string;
  title: string;
  organization: string;
  examDate: string;
  downloadStartDate: string;
  downloadEndDate?: string;
  category: string;
  downloadLink?: string;
  status: string;
  createdAt: string;
}

export default function AdmitCardList() {
  const [admitCards, setAdmitCards] = useState<AdmitCard[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAdmitCards();
  }, []);

  const fetchAdmitCards = async () => {
    try {
      const response = await fetch('/api/admit-cards');
      if (response.ok) {
        const data = await response.json();
        setAdmitCards(data.data);
      } else {
        console.error('Failed to fetch admit cards');
      }
    } catch (error) {
      console.error('Error fetching admit cards:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div className="text-center">Loading...</div>;
  }

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
      <h2 className="text-2xl font-semibold mb-6">Posted Admit Cards</h2>
      <div className="space-y-4">
        {admitCards.length === 0 ? (
          <p className="text-gray-500 dark:text-gray-400 text-center">No admit cards posted yet</p>
        ) : (
          admitCards.map((admitCard) => (
            <div
              key={admitCard._id}
              className="border rounded-lg p-4 hover:shadow-md transition-shadow"
            >
              <h3 className="text-lg font-semibold">{admitCard.title}</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                {admitCard.organization} • {admitCard.category}
              </p>
              <div className="mt-2 flex items-center justify-between">
                <span className="text-sm text-gray-500 dark:text-gray-400">
                  Exam Date: {new Date(admitCard.examDate).toLocaleDateString()}
                </span>
                <span
                  className={`px-2 py-1 rounded-full text-xs ${admitCard.status === 'published' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}`}
                >
                  {admitCard.status}
                </span>
              </div>
              <div className="mt-2 text-sm text-gray-600">
                <p>Download Period: {new Date(admitCard.downloadStartDate).toLocaleDateString()} - 
                   {admitCard.downloadEndDate ? new Date(admitCard.downloadEndDate).toLocaleDateString() : 'Not specified'}</p>
              </div>
              {admitCard.downloadLink && (
                <p className="text-sm text-blue-600 mt-2">
                  <a href={admitCard.downloadLink} target="_blank" rel="noopener noreferrer">
                    Download Admit Card
                  </a>
                </p>
              )}
              <div className="mt-3 flex gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    // Implement edit functionality
                  }}
                >
                  Edit
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  className="text-red-600 hover:text-red-700"
                  onClick={() => {
                    // Implement delete functionality
                  }}
                >
                  Delete
                </Button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}