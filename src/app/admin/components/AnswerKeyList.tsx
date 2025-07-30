'use client';

import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import AnswerKeyForm from './AnswerKeyForm';

interface AnswerKey {
  _id: string;
  title: string;
  organization: string;
  category: string;
  downloadLink: string;
  description: string;
  content: string;
  status: string;
  createdAt: string;
}

export default function AnswerKeyList() {
  const [answerKeys, setAnswerKeys] = useState<AnswerKey[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingAnswerKey, setEditingAnswerKey] = useState<AnswerKey | null>(null);

  useEffect(() => {
    fetchAnswerKeys();
  }, []);

  const fetchAnswerKeys = async () => {
    setLoading(true);
    try {
      const response = await fetch('/api/answer-keys');
      const data = await response.json();
      setAnswerKeys(response.ok ? data.data || [] : []);
      if (!response.ok) {
        console.error('Failed to fetch answer keys:', data.message || 'Unknown error');
      }
    } catch (error) {
      console.error('Error fetching answer keys:', error);
      setAnswerKeys([]);
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (answerKey: AnswerKey) => {
    setEditingAnswerKey(answerKey);
  };

  const handleUpdate = async (data: Omit<AnswerKey, '_id' | 'createdAt'>) => {
    if (!editingAnswerKey) return;

    const updateData = {
      ...data,
      content: data.content || editingAnswerKey.content,
    };

    try {
      const response = await fetch(`/api/answer-keys/${editingAnswerKey._id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updateData),
      });

      if (response.ok) {
        const updatedAnswerKey = await response.json();
        setAnswerKeys(answerKeys.map(ak =>
          ak._id === editingAnswerKey._id ? { ...ak, ...updatedAnswerKey.data } : ak
        ));
        setEditingAnswerKey(null);
        alert('Answer key updated successfully');
        fetchAnswerKeys(); // Optionally refetch if the list is affected by external changes
      } else {
        const errorData = await response.json().catch(() => ({}));
        alert(`Failed to update answer key: ${errorData.message || response.statusText}`);
      }
    } catch (error) {
      console.error('Error updating answer key:', error);
      alert('Error updating answer key');
    }
  };

  const handleDelete = async (answerKeyId: string) => {
    if (!confirm('Are you sure you want to delete this answer key?')) return;

    try {
      const response = await fetch(`/api/answer-keys/${answerKeyId}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        setAnswerKeys(answerKeys.filter(ak => ak._id !== answerKeyId));
        alert('Answer key deleted successfully');
      } else {
        alert('Failed to delete answer key');
      }
    } catch (error) {
      console.error('Error deleting answer key:', error);
      alert('Error deleting answer key');
    }
  };

  if (loading) {
    return <div className="text-center">Loading answer keys...</div>;
  }

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-semibold">Posted Answer Keys</h2>
        <Button onClick={fetchAnswerKeys} variant="outline" size="sm">Refresh List</Button>
      </div>
      <div className="space-y-4">
        {answerKeys.length === 0 ? (
          <p className="text-gray-500 dark:text-gray-400 text-center">No answer keys posted yet</p>
        ) : (
          answerKeys.map((answerKey) => (
            <Link href={`/admin/answer-keys/${answerKey._id}`} key={answerKey._id} className="block border rounded-lg p-4 hover:shadow-md transition-shadow cursor-pointer">
              <h3 className="text-lg font-semibold text-blue-600 hover:text-blue-800">{answerKey.title}</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                {answerKey.organization} - Category: {answerKey.category}
              </p>
              <p className="text-sm text-gray-700 mt-1 truncate">Description: {answerKey.description}</p>
              {answerKey.downloadLink && (
                <p className="text-sm text-blue-600 hover:underline mt-1">
                  <span>Download Link</span>
                </p>
              )}
              <div className="mt-2 flex items-center justify-between">
                <span className="text-xs text-gray-500 dark:text-gray-400">
                  Posted: {new Date(answerKey.createdAt).toLocaleDateString()}
                </span>
                <span
                  className={`px-2 py-1 rounded-full text-xs ${answerKey.status === 'published' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}`}
                >
                  {answerKey.status}
                </span>
              </div>
              <div className="mt-3 flex gap-2">
                <Button variant="outline" size="sm" onClick={(e) => { e.preventDefault(); handleEdit(answerKey); }}>
                  Edit
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  className="text-red-600 hover:text-red-700"
                  onClick={(e) => { e.preventDefault(); handleDelete(answerKey._id); }}
                >
                  Delete
                </Button>
              </div>
            </Link>
          ))
        )}
      </div>

      {editingAnswerKey && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl">
            <AnswerKeyForm
              initialData={editingAnswerKey}
              onSubmit={async (data) => {
                await handleUpdate(data);
              }}
              onCancel={() => setEditingAnswerKey(null)}
            />
          </div>
        </div>
      )}
    </div>
  );
}
