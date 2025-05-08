'use client';

import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import AdmitCardForm from './AdmitCardForm';
import AdmitCard from '@/lib/models/AdmitCard';

interface AdmitCard  {
  _id: string;
  title: string;
  organization: string;
  location: string;
  status: string;
  applicationDeadline: string;
  createdAt: string;
  description: string;
  ApplicationDate: string;
  downloadAdmitcardLink: string;
}

export default function AdmitCardList() {
  const [admitCards, setAdmitCards] = useState<AdmitCard[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingCard, setEditingCard] = useState<AdmitCard | null>(null);

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

  const handleEdit = async (card: AdmitCard) => {
    setEditingCard(card);
  };

  const handleUpdate = async (data: Omit<AdmitCard, '_id' | 'createdAt'>) => {
    if (!editingCard) return;

    try {
      const response = await fetch(`/api/admit-cards/${editingCard._id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        const updatedCard = await response.json();
        setAdmitCards(admitCards.map(card => 
          card._id === editingCard._id ? { ...card, ...updatedCard.data } : card
        ));
        setEditingCard(null);
        alert('Admit card updated successfully');
      } else {
        alert('Failed to update admit card');
      }
    } catch (error) {
      console.error('Error updating admit card:', error);
      alert('Error updating admit card');
    }
  };

  const handleDelete = async (admitCardId: string) => {
    if (!confirm('Are you sure you want to delete this admit card?')) return;
    
    try {
      const response = await fetch(`/api/admit-cards/${admitCardId}`, {
        method: 'DELETE',
      });
      
      if (response.ok) {
        setAdmitCards(admitCards.filter(card => card._id !== admitCardId));
        alert('Admit card deleted successfully');
      } else {
        alert('Failed to delete admit card');
      }
    } catch (error) {
      console.error('Error deleting admit card:', error);
      alert('Error deleting admit card');
    }
  };

  if (loading) {
    return <div className="text-center">Loading...</div>;
  }

  return (
    <div className="bg-white  rounded-lg shadow-lg p-6">
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
                {admitCard.organization} • {admitCard.location}
              </p>
              <div className="mt-2 flex items-center justify-between">
                <span className="text-sm text-gray-500 dark:text-gray-400">
                  Posted: {new Date(admitCard.createdAt).toLocaleDateString()}
                </span>
                <span className="text-sm text-gray-500 dark:text-gray-400">
                  Deadline: {new Date(admitCard.applicationDeadline).toLocaleDateString()}
                </span>
                <span className="text-sm text-gray-500 dark:text-gray-400">
                  Application Date: {new Date(admitCard.ApplicationDate).toLocaleDateString()}
                
                </span>
                <span
                  className={`px-2 py-1 rounded-full text-xs ${admitCard.status === 'published' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}`}
                >
                  {admitCard.status}
                </span>
              </div>
              <div className="mt-3 flex gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleEdit(admitCard)}
                >
                  Edit
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  className="text-red-600 hover:text-red-700"
                  onClick={() => handleDelete(admitCard._id)}
                >
                  Delete
                </Button>
              </div>
            </div>
          ))
        )}
      </div>

      {editingCard && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg w-full max-w-2xl">
            <AdmitCardForm
              initialData={editingCard}
              onSubmit={handleUpdate}
              onCancel={() => setEditingCard(null)}
            />
          </div>
        </div>
      )}
    </div>
  );
}