'use client';
import { useEffect, useState } from 'react';

interface AdmitCard {
  _id: string;
  title: string;
}

export default function AdmitCardListPage() {
  const [admitCards, setAdmitCards] = useState<AdmitCard[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/admit-cards')
      .then(res => res.json())
      .then(data => setAdmitCards(data.data || []))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <div>Loading...</div>;

  return (
    <div className="max-w-2xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">All Admit Cards</h1>
      <ul className="space-y-2">
        {admitCards.map(item => (
          <li key={item._id}>
            <a href={`/admit-cards/${item._id}`} className="text-blue-700 hover:underline">{item.title}</a>
          </li>
        ))}
      </ul>
    </div>
  );
} 