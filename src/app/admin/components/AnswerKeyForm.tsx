'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';

interface AnswerKeyFormData {
  _id?: string;
  title: string;
  organization: string;
  examDate: string;
  category: string;
  downloadLink: string;
  description: string;
  content: string;
  status: string;
}

interface AnswerKeyFormProps {
  initialData?: AnswerKeyFormData;
  onSubmit: (data: AnswerKeyFormData) => Promise<void>;
  onCancel?: () => void; // Optional: if the form is in a modal
  onSuccess?: () => void; // For create mode specifically
}

export default function AnswerKeyForm({ initialData, onSubmit, onCancel, onSuccess }: AnswerKeyFormProps) {
  const [formData, setFormData] = useState<AnswerKeyFormData>({
    title: '',
    organization: '',
    examDate: '',
    category: '',
    downloadLink: '',
    description: '',
    content: '',
    status: 'published',
    ...initialData,
  });

  useEffect(() => {
    if (initialData) {
      setFormData({
        ...initialData,
        examDate: initialData.examDate ? new Date(initialData.examDate).toISOString().split('T')[0] : '',
      });
    } else {
      // Reset for create mode
      setFormData({
        title: '',
        organization: '',
        examDate: '',
        category: '',
        downloadLink: '',
        description: '',
        content: '',
        status: 'published',
      });
    }
  }, [initialData]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.content.trim() && !initialData) { // Content validation might be specific to create mode or always required
      alert('Content is required.');
      return;
    }
    await onSubmit(formData);
    if (!initialData && onSuccess) { // only call onSuccess if it's create mode
        onSuccess();
         // Reset form only in create mode after successful submission
        setFormData({
            title: '',
            organization: '',
            examDate: '',
            category: '',
            downloadLink: '',
            description: '',
            content: '',
            status: 'published',
        });
    }
  };

  const isEditMode = !!initialData;

  return (
    <form onSubmit={handleSubmit} className="space-y-6 p-4 bg-white rounded-lg shadow-md max-h-[80vh] overflow-y-auto"> 
      <h2 className="text-xl font-semibold mb-4">
        {isEditMode ? 'Edit Answer Key' : 'Post New Answer Key'}
      </h2>
      <div>
        <label htmlFor="content" className="block text-sm font-medium text-gray-700">Content</label>
        <textarea
          id="content"
          name="content"
          rows={3}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          value={formData.content}
          onChange={(e) => setFormData({ ...formData, content: e.target.value })}
          required
        />
      </div>
      <div>
        <label className="block text-sm font-medium mb-2">Exam Title</label>
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
        <label className="block text-sm font-medium mb-2">Exam Date</label>
        <input
          type="date"
          value={formData.examDate}
          onChange={(e) => setFormData({...formData, examDate: e.target.value})}
          className="w-full p-2 border rounded-md"
          required
        />
      </div>
      <div>
        <label className="block text-sm font-medium mb-2">Category</label>
        <select
          value={formData.category}
          onChange={(e) => setFormData({...formData, category: e.target.value})}
          className="w-full p-2 border rounded-md"
          required
        >
          <option value="">Select a category</option>
          <option value="government">Government</option>
          <option value="private">Private</option>
          <option value="education">Education</option>
          <option value="other">Other</option>
        </select>
      </div>
      <div>
        <label className="block text-sm font-medium mb-2">Description</label>
        <textarea
          value={formData.description}
          onChange={(e) => setFormData({...formData, description: e.target.value})}
          className="w-full p-2 border rounded-md h-32"
          required
        />
      </div>
      <div>
        <label className="block text-sm font-medium mb-2">Download Link</label>
        <input
          type="url"
          value={formData.downloadLink}
          onChange={(e) => setFormData({...formData, downloadLink: e.target.value})}
          className="w-full p-2 border rounded-md"
          required
          pattern="https?://(www\.)?[\w\-\.]+\.[a-zA-Z]{2,}(/\S*)?$"
        />
      </div>
      <div className="flex justify-end space-x-2 pt-4">
        {onCancel && (
          <Button type="button" variant="outline" onClick={onCancel}>
            Cancel
          </Button>
        )}
        <Button type="submit" className="w-full md:w-auto">
          {isEditMode ? 'Save Changes' : 'Post Answer Key'}
        </Button>
      </div>
    </form>
  );
}