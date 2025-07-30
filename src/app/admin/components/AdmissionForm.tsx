'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';

// Define the structure for form data
export interface AdmissionFormData {
  title: string;
  organization: string;
  applicationDeadline: string; // Expected format: YYYY-MM-DD
  category: string;
  description: string;
  content: string; 
  applicationLink: string;
  status: string;
}

interface AdmissionFormProps {
  initialData?: Partial<AdmissionFormData>; // Use Partial if not all fields are provided for initial state
  onSubmit: (data: AdmissionFormData) => Promise<void>;
  onCancel?: () => void;
  isSubmitting?: boolean;
  submitButtonText?: string;
  formTitle?: string;
}

const defaultFormData: AdmissionFormData = {
  title: '',
  organization: '',
  applicationDeadline: '',
  category: '',
  description: '',
  content: '',
  applicationLink: '',
  status: 'published',
};

export default function AdmissionForm({
  initialData,
  onSubmit,
  onCancel,
  isSubmitting = false,
  submitButtonText = initialData ? 'Update Admission' : 'Post Admission',
  formTitle = initialData ? 'Edit Admission' : 'Create New Admission',
}: AdmissionFormProps) {
  const [formData, setFormData] = useState<AdmissionFormData>(defaultFormData);

  useEffect(() => {
    if (initialData) {
      // Ensure date is formatted correctly for input type='date'
      const formattedInitialData = {
        ...initialData,
        applicationDeadline: initialData.applicationDeadline
          ? initialData.applicationDeadline.split('T')[0]
          : '',
      };
      setFormData({ ...defaultFormData, ...formattedInitialData });
    } else {
      setFormData(defaultFormData); // Reset to default for creation mode or if initialData is cleared
    }
  }, [initialData]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await onSubmit(formData);
    // Form reset for 'create' mode can be handled by the parent by clearing initialData or re-keying the component
    // Or, if it's purely a 'create' form (no initialData ever passed), reset here.
    if (!initialData) { // Simple check: if it was a create form from the start
        setFormData(defaultFormData);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 p-4 md:p-6">
      {formTitle && <h2 className="text-xl font-semibold mb-4">{formTitle}</h2>}
      
      <div>
        <label htmlFor="title" className="block text-sm font-medium mb-1">Admission Title</label>
        <input
          id="title"
          name="title"
          type="text"
          value={formData.title}
          onChange={handleChange}
          className="w-full p-2 border rounded-md"
          required
        />
      </div>

      <div>
        <label htmlFor="organization" className="block text-sm font-medium mb-1">Organization</label>
        <input
          id="organization"
          name="organization"
          type="text"
          value={formData.organization}
          onChange={handleChange}
          className="w-full p-2 border rounded-md"
          required
        />
      </div>

      <div>
        <label htmlFor="applicationDeadline" className="block text-sm font-medium mb-1">Application Deadline</label>
        <input
          id="applicationDeadline"
          name="applicationDeadline"
          type="date"
          value={formData.applicationDeadline}
          onChange={handleChange}
          className="w-full p-2 border rounded-md"
          required
        />
      </div>

      <div>
        <label htmlFor="category" className="block text-sm font-medium mb-1">Category</label>
        <select
          id="category"
          name="category"
          value={formData.category}
          onChange={handleChange}
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
        <label htmlFor="description" className="block text-sm font-medium mb-1">Description</label>
        <textarea
          id="description"
          name="description"
          value={formData.description}
          onChange={handleChange}
          className="w-full p-2 border rounded-md h-24"
          required
        />
      </div>

      <div>
        <label htmlFor="content" className="block text-sm font-medium mb-1">Content (Detailed Information)</label>
        <textarea
          id="content"
          name="content"
          value={formData.content}
          onChange={handleChange}
          className="w-full p-2 border rounded-md h-40"
          required
        />
      </div>

      <div>
        <label htmlFor="applicationLink" className="block text-sm font-medium mb-1">Application Link</label>
        <input
          id="applicationLink"
          name="applicationLink"
          type="url"
          value={formData.applicationLink}
          onChange={handleChange}
          className="w-full p-2 border rounded-md"
          required
          pattern="https?://(www\.)?[\w\-\.]+\.[a-zA-Z]{2,}(/\S*)?$"
        />
      </div>

      <div>
        <label htmlFor="status" className="block text-sm font-medium mb-1">Status</label>
        <select
          id="status"
          name="status"
          value={formData.status}
          onChange={handleChange}
          className="w-full p-2 border rounded-md"
          required
        >
          <option value="published">Published</option>
          <option value="draft">Draft</option>
          <option value="archived">Archived</option>
        </select>
      </div>

      <div className="flex items-center gap-4 pt-2">
        <Button type="submit" className="flex-grow" disabled={isSubmitting}>
          {isSubmitting ? 'Submitting...' : submitButtonText}
        </Button>
        {onCancel && (
          <Button type="button" variant="outline" onClick={onCancel} className="flex-grow" disabled={isSubmitting}>
            Cancel
          </Button>
        )}
      </div>
    </form>
  );
}