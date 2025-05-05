'use client';

import { useEffect, useState } from 'react';

interface AdmitCard {
  _id: string;
  title: string;
  organization: string;
  examDate: string;
  venue: string;
  category: string;
  downloadLink: string;
  status: string;
}

export default function AdmitCardsPage() {
  const [admitCards, setAdmitCards] = useState<AdmitCard[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchAdmitCards = async () => {
      try {
        const response = await fetch('/api/admitcards');
        if (!response.ok) {
          throw new Error('Failed to fetch admit cards');
        }
        const data = await response.json();
        setAdmitCards(data.data || []);
      } catch (err) {
        console.error('Failed to fetch admit cards:', err);
        setError('Error loading admit cards');
      } finally {
        setLoading(false);
      }
    };

    fetchAdmitCards();
  }, []);

  if (loading) {
    return <div className="flex justify-center items-center min-h-screen">Loading...</div>;
  }

  if (error) {
    return <div className="flex justify-center items-center min-h-screen text-red-500">{error}</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-7xl font-bold mb-8 text-gray-900 dark:text-white">Admit Cards</h1>
      
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {admitCards.map((admitCard) => (
          <div 
            key={admitCard._id}
            className="block bg-white  rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow duration-200"
          >
            <h2 className="text-xl font-semibold mb-2 text-gray-900 dark:text-white">{admitCard.title}</h2>
            
            <div className="mb-4">
              <p className="text-gray-600 dark:text-gray-300">{admitCard.organization}</p>
              <p className="text-gray-600 dark:text-gray-300">Exam Date: {new Date(admitCard.examDate).toLocaleDateString()}</p>
              <p className="text-gray-600 dark:text-gray-300">Venue: {admitCard.venue}</p>
            </div>
            
            <div className="flex justify-between items-end">
              <div className="text-sm text-gray-500 dark:text-gray-400">
                <p>Category: {admitCard.category}</p>
                <p>Status: {admitCard.status}</p>
              </div>
              <a 
                href={admitCard.downloadLink}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 dark:text-blue-400 font-semibold hover:underline"
              >
                Download Admit Card
              </a>
            </div>
          </div>
        ))}
      </div>

      {admitCards.length === 0 && (
        <div className="text-center text-gray-600 dark:text-gray-400 mt-8">
          No admit cards available at the moment.
        </div>
      )}
    </div>
  );
}