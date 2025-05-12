'use client';

import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';

interface ResultFormData {
  title: string;
  organization: string;
  resultDate: string;
  category: string;
  downloadLink: string;
  description: string;
  status: string;
}

interface ResultFormProps {
  initialData?: ResultFormData | null;
  onSubmit: (data: ResultFormData) => void;
  onCancel?: () => void;
}

export default function ResultForm({ initialData, onSubmit, onCancel }: ResultFormProps) {
  const [formData, setFormData] = useState<ResultFormData>({
    title: '',
    organization: '',
    resultDate: '',
    category: 'other',
    downloadLink: '',
    description: initialData?.description || '',
    status: 'draft',
  });

  useEffect(() => {
    if (initialData) {
      setFormData(initialData);
    }
  }, [initialData]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);

    if (!initialData) {
      setFormData({
        title: '',
        organization: '',
        resultDate: '',
        category: '',
        downloadLink: '',
        description: '',
        status: 'draft',
      });
    }
  };

  return (
    <div className="h-screen overflow-auto p-4 bg-gray-100">
      <div className="bg-white rounded-lg shadow-lg p-6 max-w-2xl mx-auto">
        <h2 className="text-2xl font-semibold mb-6">{initialData ? 'Edit Result' : 'Post New Result'}</h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium mb-2">Exam Name</label>
            <input
              type="text"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              className="w-full p-2 border rounded-md"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Organization</label>
            <input
              type="text"
              value={formData.organization}
              onChange={(e) => setFormData({ ...formData, organization: e.target.value })}
              className="w-full p-2 border rounded-md"
            />
          </div>
               
          <div>
            <label className="block text-sm font-medium mb-2">Category</label>
            <select
              value={formData.category}
              onChange={(e) => setFormData({ ...formData, category: e.target.value })}
              className="w-full p-2 border rounded-md"
            >
              <option value="government">Government</option>
              <option value="private">Private</option>
              <option value="education">Education</option>
              <option value="other">Other</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Result Date</label>
            <input
              type="date"
              value={formData.resultDate}
              onChange={(e) => setFormData({ ...formData, resultDate: e.target.value })}
              className="w-full p-2 border rounded-md"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Download Link</label>
            <input
              type="url"
              value={formData.downloadLink}
              onChange={(e) => setFormData({ ...formData, downloadLink: e.target.value })}
              className="w-full p-2 border rounded-md"
              placeholder="https://example.com/result"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Description (Optional)</label>
            <textarea
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              className="w-full p-2 border rounded-md h-32"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Status</label>
            <select
              value={formData.status}
              onChange={(e) => setFormData({ ...formData, status: e.target.value })}
              className="w-full p-2 border rounded-md"
            >
              <option value="draft">Draft</option>
              <option value="published">Published</option>
            </select>
          </div>

          <div className="flex gap-4">
            <Button type="submit" className="flex-1">
              {initialData ? 'Update Result' : 'Post Result'}
            </Button>
            {onCancel && (
              <Button type="button" variant="outline" onClick={onCancel} className="flex-1">
                Cancel
              </Button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
}
