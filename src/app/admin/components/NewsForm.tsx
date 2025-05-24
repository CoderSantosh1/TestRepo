'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select } from '@/components/ui/select';

interface NewsFormData {
  title: string;
  content: string;
  organization: string;
  category: string;
  status: string;
}

interface NewsFormProps {
  initialData?: NewsFormData;
  onSubmit: (data: NewsFormData) => void;
  onCancel: () => void;
}

export default function NewsForm({ initialData, onSubmit, onCancel }: NewsFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState<NewsFormData>({
    title: initialData?.title || '',
    content: initialData?.content || '',
    organization: initialData?.organization || '',
    category: initialData?.category || '',
    status: initialData?.status || 'draft',
  });

  const [errors, setErrors] = useState<Partial<NewsFormData>>({});
  const [isFormValid, setIsFormValid] = useState(false);

  useEffect(() => {
    validateForm();
  }, [formData]);

  const validateForm = () => {
    const newErrors: Partial<NewsFormData> = {};
    if (!formData.title.trim()) newErrors.title = 'Title is required';
    else if (formData.title.trim().length < 3) newErrors.title = 'Title must be at least 3 characters';

    if (!formData.content.trim()) newErrors.content = 'Content is required';
    else if (formData.content.trim().length < 10) newErrors.content = 'Content must be at least 10 characters';

    if (!formData.organization.trim()) newErrors.organization = 'Organization is required';
    if (!formData.category.trim()) newErrors.category = 'Category is required';

    setErrors(newErrors);
    setIsFormValid(Object.keys(newErrors).length === 0);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isSubmitting || !validateForm()) return;

    setIsSubmitting(true);
    try {
      await onSubmit(formData);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="p-6">
      <form onSubmit={handleSubmit} className="space-y-4">
        <h2 className="text-xl font-semibold mb-4">{initialData ? 'Edit News' : 'Post New News'}</h2>

        <div>
          <label htmlFor="title" className="block text-sm font-medium text-gray-700">Title</label>
          <Input
            id="title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            className={errors.title ? 'border-red-500' : ''}
          />
          {errors.title && <p className="text-red-500 text-sm mt-1">{errors.title}</p>}
        </div>

        <div>
          <label htmlFor="organization" className="block text-sm font-medium text-gray-700">Organization</label>
          <Input
            id="organization"
            name="organization"
            value={formData.organization}
            onChange={handleChange}
            className={errors.organization ? 'border-red-500' : ''}
          />
          {errors.organization && <p className="text-red-500 text-sm mt-1">{errors.organization}</p>}
        </div>

        <div>
          <label htmlFor="content" className="block text-sm font-medium text-gray-700">Content</label>
          <textarea
            id="content"
            name="content"
            value={formData.content}
            onChange={handleChange}
            rows={6}
            className={`mt-1 p-2 border rounded-md w-full ${errors.content ? 'border-red-500' : ''}`}
          />
          {errors.content && <p className="text-red-500 text-sm mt-1">{errors.content}</p>}
        </div>

        <div>
          <label htmlFor="category" className="block text-sm font-medium text-gray-700">Category</label>
          <Input
            id="category"
            name="category"
            value={formData.category}
            onChange={handleChange}
            className={errors.category ? 'border-red-500' : ''}
          />
          {errors.category && <p className="text-red-500 text-sm mt-1">{errors.category}</p>}
        </div>

        <div>
          <label htmlFor="status" className="block text-sm font-medium text-gray-700">Status</label>
          <Select
            id="status"
            name="status"
            value={formData.status}
            onChange={handleChange}
            className="w-full"
          >
            <option value="draft">Draft</option>
            <option value="published">Published</option>
          </Select>
        </div>

        <div className="flex justify-end space-x-2 pt-4 border-t mt-6">
          <Button type="button" variant="outline" onClick={onCancel} disabled={isSubmitting}>
            Cancel
          </Button>
          <Button type="submit" variant="default" disabled={isSubmitting || !isFormValid}>
            {isSubmitting ? 'Processing...' : initialData ? 'Update News' : 'Post News'}
          </Button>
        </div>
      </form>
    </div>
  );
}
