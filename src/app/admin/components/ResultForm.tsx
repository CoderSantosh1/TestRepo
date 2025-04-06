'use client';

import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';

interface ResultFormData {
  title: string;
  organization: string;
  resultDate: string;
  category: string;
  resultLink?: string;
  description?: string;
  status?: string;
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
    category: '',
    resultLink: '',
    description: '',
    status: 'draft'
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
        resultLink: '',
        description: '',
        status: 'draft'
      });
    }
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
      <h2 className="text-2xl font-semibold mb-6">{initialData ? 'Edit Result' : 'Post New Result'}</h2>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-sm font-medium mb-2">Result Title</label>
          <input
            type="text"
            value={formData.title}
            onChange={(e) => setFormData({...formData, title: e.target.value})}
            className="w-full p-2 border rounded-md"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">Organization</label>
          <input
            type="text"
            value={formData.organization}
            onChange={(e) => setFormData({...formData, organization: e.target.value})}
            className="w-full p-2 border rounded-md"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">Category</label>
          <input
            type="text"
            value={formData.category}
            onChange={(e) => setFormData({...formData, category: e.target.value})}
            className="w-full p-2 border rounded-md"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">Result Date</label>
          <input
            type="date"
            value={formData.resultDate}
            onChange={(e) => setFormData({...formData, resultDate: e.target.value})}
            className="w-full p-2 border rounded-md"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">Result Link</label>
          <input
            type="url"
            value={formData.resultLink}
            onChange={(e) => setFormData({...formData, resultLink: e.target.value})}
            className="w-full p-2 border rounded-md"
            placeholder="https://example.com/result"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">Description (Optional)</label>
          <textarea
            value={formData.description}
            onChange={(e) => setFormData({...formData, description: e.target.value})}
            className="w-full p-2 border rounded-md h-32"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">Status</label>
          <select
            value={formData.status}
            onChange={(e) => setFormData({...formData, status: e.target.value})}
            className="w-full p-2 border rounded-md"
            required
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
  );
}