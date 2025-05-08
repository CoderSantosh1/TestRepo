'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select } from '@/components/ui/select';

interface AdmitCardFormData {
  title: string;
  organization: string;
  location: string;
  status: string;
  applicationDeadline: string;
  description: string;
  ApplicationDate: string;
  downloadAdmitcardLink: string;
}

interface AdmitCardFormProps {
  initialData?: AdmitCardFormData;
  onSubmit: (data: AdmitCardFormData) => void;
  onCancel: () => void;
}

export default function AdmitCardForm({ initialData, onSubmit, onCancel }: AdmitCardFormProps) {
  const [formData, setFormData] = useState<AdmitCardFormData>({
    title: initialData?.title || '',
    organization: initialData?.organization || '',
    downloadAdmitcardLink: initialData?.downloadAdmitcardLink || '',
    location: initialData?.location || '',
    status: initialData?.status || 'draft',
    applicationDeadline: initialData?.applicationDeadline || '',
    description: initialData?.description || '',
    ApplicationDate: initialData?.ApplicationDate || '',
  });

  const [errors, setErrors] = useState<Partial<AdmitCardFormData>>({});

  const validateForm = () => {
    const newErrors: Partial<AdmitCardFormData> = {};
    if (!formData.title.trim()) newErrors.title = 'Title is required';
    if (!formData.organization.trim()) newErrors.organization = 'Organization is required';
    if (!formData.downloadAdmitcardLink.trim()) newErrors.downloadAdmitcardLink = 'Download Admit Card Link is required';
    if (!formData.location.trim()) newErrors.location = 'Location is required';
    if (!formData.applicationDeadline) newErrors.applicationDeadline = 'Application deadline is required';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      onSubmit(formData);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name as keyof AdmitCardFormData]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  return (
    <div className="h-screen overflow-y-auto bg-gray-50 p-4">
      <form onSubmit={handleSubmit} className="space-y-4 bg-white p-6 rounded-lg shadow max-w-xl mx-auto">
        <h2 className="text-xl font-semibold mb-4">
          {initialData ? 'Edit Admit Card' : 'Create Admit Card'}
        </h2>

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
          <label htmlFor="downloadAdmitcardLink" className=" block text-sm font-medium text-gray-700">Download Admit Card </label>
          <Input
            id="downloadAdmitcardLink"
            name="downloadAdmitcardLink"
            value={formData.downloadAdmitcardLink}
            onChange={handleChange}
            className={errors.downloadAdmitcardLink ? 'border-red-500' : ''}
          />
          {errors.downloadAdmitcardLink && <p className="text-red-500 text-sm mt-1">{errors.downloadAdmitcardLink}</p>}
        </div>
        <div>
          <label htmlFor="description" className="block text-sm font-medium text-gray-700">Description</label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            rows={4}
            className="w-full p-2 border rounded-md"
          ></textarea>
        </div>
        <div>
          <label htmlFor="ApplicationDate" className="block text-sm font-medium text-gray-700">Application Date</label>
          <Input
            id="ApplicationDate"
            name="ApplicationDate"
            type="date"
            value={formData.ApplicationDate}
            onChange={handleChange}
            className={errors.ApplicationDate? 'border-red-500' : ''}
          />
          {errors.ApplicationDate && <p className="text-red-500 text-sm mt-1">{errors.ApplicationDate}</p>}
        </div>
        <div>
          <label htmlFor="location" className="block text-sm font-medium text-gray-700">Location</label>
          <Input
            id="location"
            name="location"
            value={formData.location}
            onChange={handleChange}
            className={errors.location ? 'border-red-500' : ''}
          />
          {errors.location && <p className="text-red-500 text-sm mt-1">{errors.location}</p>}
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

        <div>
          <label htmlFor="applicationDeadline" className="block text-sm font-medium text-gray-700">
            Application Deadline
          </label>
          <Input
            id="applicationDeadline"
            name="applicationDeadline"
            type="date"
            value={formData.applicationDeadline}
            onChange={handleChange}
            className={errors.applicationDeadline ? 'border-red-500' : ''}
          />
          {errors.applicationDeadline && (
            <p className="text-red-500 text-sm mt-1">{errors.applicationDeadline}</p>
          )}
        </div>

        <div className="flex justify-end space-x-2 pt-4">
          <Button type="button" variant="outline" onClick={onCancel}>Cancel</Button>
          <Button type="submit">Save Changes</Button>
        </div>
      </form>
    </div>
  );
}
