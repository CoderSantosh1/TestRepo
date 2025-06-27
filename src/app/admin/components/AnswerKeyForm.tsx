'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select } from '@/components/ui/select';

interface AnswerKeyFormData {
  _id?: string;
  title: string;
  organization: string;
  category: string;
  downloadLink: string;
  description: string;
  content: string;
  status: string;
}

interface AnswerKeyFormProps {
  initialData?: AnswerKeyFormData;
  onSubmit: (data: AnswerKeyFormData) => Promise<void>;
  onCancel?: () => void;
  onSuccess?: () => void;
}

export default function AnswerKeyForm({
  initialData,
  onSubmit,
  onCancel,
  onSuccess,
}: AnswerKeyFormProps) {
  const [formData, setFormData] = useState<AnswerKeyFormData>({
    title: '',
    organization: '',
    category: '',
    downloadLink: '',
    description: '',
    content: '',
    status: 'published',
    ...initialData,
  });

  const [errors, setErrors] = useState<Partial<AnswerKeyFormData>>({});

  useEffect(() => {
    if (initialData) {
      setFormData({
        ...initialData,
      });
    }
  }, [initialData]);

  const validateForm = () => {
    const newErrors: Partial<AnswerKeyFormData> = {};
    if (!formData.title.trim()) newErrors.title = 'Title is required';
    if (!formData.organization.trim()) newErrors.organization = 'Organization is required';
    if (!formData.category.trim()) newErrors.category = 'Category is required';
    if (!formData.downloadLink.trim()) newErrors.downloadLink = 'Download link is required';
    if (!/^https?:\/\/[\w\-\.]+\.\w+(\/\S*)?$/.test(formData.downloadLink))
      newErrors.downloadLink = 'Download link must be a valid URL';
    if (!formData.description.trim()) newErrors.description = 'Description is required';
    if (!formData.content.trim()) newErrors.content = 'Content is required';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name as keyof AnswerKeyFormData]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    await onSubmit(formData);
    if (!initialData && onSuccess) {
      onSuccess();
      setFormData({
        title: '',
        organization: '',
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
    <div className="h-screen overflow-y-auto p-4 bg-gray-50">
      <form
        onSubmit={handleSubmit}
        className="space-y-4 bg-white rounded-lg shadow p-6 max-w-xl mx-auto"
      >
        <h2 className="text-xl font-semibold mb-4">
          {isEditMode ? 'Edit Answer Key' : 'Post New Answer Key'}
        </h2>

        <div>
          <label htmlFor="title" className="block text-sm font-medium text-gray-700">
            Exam Title
          </label>
          <Input id="title" name="title" value={formData.title} onChange={handleChange} />
          {errors.title && <p className="text-red-500 text-sm mt-1">{errors.title}</p>}
        </div>

        <div>
          <label htmlFor="organization" className="block text-sm font-medium text-gray-700">
            Organization
          </label>
          <Input id="organization" name="organization" value={formData.organization} onChange={handleChange} />
          {errors.organization && <p className="text-red-500 text-sm mt-1">{errors.organization}</p>}
        </div>

        <div>
          <label htmlFor="category" className="block text-sm font-medium text-gray-700">
            Category
          </label>
          <Select id="category" name="category" value={formData.category} onChange={handleChange}>
            <option value="">Select a category</option>
            <option value="government">Government</option>
            <option value="private">Private</option>
            <option value="education">Education</option>
            <option value="other">Other</option>
          </Select>
          {errors.category && <p className="text-red-500 text-sm mt-1">{errors.category}</p>}
        </div>

        <div>
          <label htmlFor="description" className="block text-sm font-medium text-gray-700">
            Description
          </label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            className="mt-1 p-2 border rounded-md w-full"
          />
          {errors.description && <p className="text-red-500 text-sm mt-1">{errors.description}</p>}
        </div>

        <div>
          <label htmlFor="downloadLink" className="block text-sm font-medium text-gray-700">
            Download Link
          </label>
          <Input
            id="downloadLink"
            name="downloadLink"
            type="url"
            value={formData.downloadLink}
            onChange={handleChange}
          />
          {errors.downloadLink && <p className="text-red-500 text-sm mt-1">{errors.downloadLink}</p>}
        </div>

        <div>
          <label htmlFor="content" className="block text-sm font-medium text-gray-700">
            Content
          </label>
          <textarea
            id="content"
            name="content"
            value={formData.content}
            onChange={handleChange}
            className="mt-1 p-2 border rounded-md w-full"
            rows={3}
          />
          {errors.content && <p className="text-red-500 text-sm mt-1">{errors.content}</p>}
        </div>

        <div>
          <label htmlFor="status" className="block text-sm font-medium text-gray-700">
            Status
          </label>
          <Select id="status" name="status" value={formData.status} onChange={handleChange}>
            <option value="published">Published</option>
            <option value="draft">Draft</option>
          </Select>
        </div>

        <div className="flex justify-end space-x-2 pt-4">
          {onCancel && (
            <Button type="button" variant="outline" onClick={onCancel}>
              Cancel
            </Button>
          )}
          <Button type="submit">{isEditMode ? 'Save Changes' : 'Post Answer Key'}</Button>
        </div>
      </form>
    </div>
  );
}
