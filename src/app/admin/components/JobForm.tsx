'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select } from '@/components/ui/select';

interface JobFormData {
  title: string;
  organization: string;
  location: string;
  status: string;
  applicationDeadline: string;
  totalVacancy: string;
  applyJob: string;
  description?: string;
  category?: string;
  salary?: string;
  minimumAge?: string;
  maximumAge?: string;
  gender?: string;
  qualification?: string;
  requirements?: string[] | string; // Allow both array and comma-separated string
  applicationBeginDate?: string;
  lastDateApplyOnline?: string;
  formCompleteLastDate?: string;
  correctionDate?: string;
  examDate?: string;
  admitCardDate?: string;
  applicationFeeGeneral?: string;
  applicationFeeSCST?: string;
  paymentMethod?: string;
}

interface JobFormProps {
  initialData?: JobFormData; // This will now correctly accept requirements as string[] from JobList
  onSubmit: (data: Omit<JobFormData, 'requirements'> & { requirements?: string[] }) => void; // Ensure onSubmit gets requirements as string[]
  onCancel: () => void;
}

export default function JobForm({ initialData, onSubmit, onCancel }: JobFormProps) {
  const [formData, setFormData] = useState<JobFormData>({
    title: initialData?.title || '',
    organization: initialData?.organization || '',
    applyJob: initialData?.applyJob || '',
    location: initialData?.location || '',
    description: initialData?.description || '',
    status: initialData?.status || 'draft',
    applicationDeadline: initialData?.applicationDeadline || '',
    category: initialData?.category || '',
    salary: initialData?.salary || '',
    totalVacancy: initialData?.totalVacancy || '',
    minimumAge: initialData?.minimumAge || '',
    maximumAge: initialData?.maximumAge || '',
    gender: initialData?.gender || '',
    qualification: initialData?.qualification || '',
    requirements: initialData?.requirements ? (Array.isArray(initialData.requirements) ? initialData.requirements.join(', ') : initialData.requirements as string) : '',
    applicationBeginDate: initialData?.applicationBeginDate || '',
    lastDateApplyOnline: initialData?.lastDateApplyOnline || '',
    formCompleteLastDate: initialData?.formCompleteLastDate || '',
    correctionDate: initialData?.correctionDate || '',
    examDate: initialData?.examDate || '',
    admitCardDate: initialData?.admitCardDate || '',
    applicationFeeGeneral: initialData?.applicationFeeGeneral || '',
    applicationFeeSCST: initialData?.applicationFeeSCST || '',
    paymentMethod: initialData?.paymentMethod || '',
  });

  const [errors, setErrors] = useState<Partial<JobFormData>>({});

  const validateForm = () => {
    const newErrors: Partial<JobFormData> = {};
    if (!formData.title.trim()) newErrors.title = 'Title is required';
    if (!formData.organization.trim()) newErrors.organization = 'Organization is required';
    if (!formData.location.trim()) newErrors.location = 'Location is required';
    if(!formData.applyJob.trim()) newErrors.applyJob = 'Apply Job is required';
    if (!formData.applicationDeadline) newErrors.applicationDeadline = 'Application deadline is required';
    if(formData.description && !formData.description.trim()) newErrors.description = 'Description is required';
    
    // Validate minimum age
    if (formData.minimumAge) {
      const minAge = parseInt(formData.minimumAge);
      if (isNaN(minAge) || minAge < 18 || minAge > 100) {
        newErrors.minimumAge = 'Minimum age must be between 18 and 100';
      }
    }

    // Validate maximum age
    if (formData.maximumAge) {
      const maxAge = parseInt(formData.maximumAge);
      if (isNaN(maxAge) || maxAge < 18 || maxAge > 100) {
        newErrors.maximumAge = 'Maximum age must be between 18 and 100';
      }
    }

    // Validate that minimum age is not greater than maximum age
    if (formData.minimumAge && formData.maximumAge) {
      const minAge = parseInt(formData.minimumAge);
      const maxAge = parseInt(formData.maximumAge);
      if (!isNaN(minAge) && !isNaN(maxAge) && minAge > maxAge) {
        newErrors.maximumAge = 'Maximum age must be greater than minimum age';
      }
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      const dataToSubmit = {
        ...formData,
        totalVacancy: formData.totalVacancy.trim(),
        requirements: typeof formData.requirements === 'string' ? formData.requirements.split(',').map(req => req.trim()) : (Array.isArray(formData.requirements) ? formData.requirements : []),
      };
      console.log('Submitting data:', dataToSubmit);
      onSubmit(dataToSubmit);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    // Special handling for totalVacancy to ensure it's a valid number
    if (name === 'totalVacancy') {
      const numValue = value.replace(/[^0-9]/g, '');
      setFormData(prev => ({ ...prev, [name]: numValue }));
    } 
    // Special handling for age fields to ensure they're valid numbers
    else if (name === 'minimumAge' || name === 'maximumAge') {
      const numValue = value.replace(/[^0-9]/g, '');
      setFormData(prev => ({ ...prev, [name]: numValue }));
    }
    else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
    if (errors[name as keyof JobFormData]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  return (
    <div className="h-screen overflow-y-auto p-4 bg-gray-50">
      <form onSubmit={handleSubmit} className="space-y-4 bg-white rounded-lg shadow p-6 max-w-xl mx-auto">
        <h2 className="text-xl font-semibold mb-4">{initialData ? 'Edit Job' : 'Post New Job'}</h2>

        <div>
          <label htmlFor="title" className="block text-sm bg-white font-medium text-gray-700">Title</label>
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
          <label htmlFor="applyJob" className="block text-sm font-medium text-gray-700">Apply jobs link</label>
          <Input
            id="applyJob"
            name="applyJob"
            value={formData.applyJob}
            onChange={handleChange}
            className={errors.applyJob ? 'border-red-500' : ''}
          />
          {errors.applyJob && <p className="text-red-500 text-sm mt-1">{errors.applyJob}</p>}
        </div>

        <div>
          <label htmlFor="description" className="block text-sm font-medium text-gray-700">Description</label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            
            className="mt-1 p-2 border rounded-md w-full"
          />
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

        {/* Fields formerly conditional, now always shown */}
        <>

        <div>
          <label htmlFor="category" className="block text-sm font-medium text-gray-700">Category</label>
          <Input id="category" name="category" value={formData.category} onChange={handleChange} />
        </div>

        <div>
          <label htmlFor="salary" className="block text-sm font-medium text-gray-700">Salary</label>
          <Input id="salary" name="salary" value={formData.salary} onChange={handleChange} />
        </div>
        <div>
          <label htmlFor="totalVacancy" className="block text-sm font-medium text-gray-700">Total seats</label>
          <Input 
            id="totalVacancy" 
            name="totalVacancy" 
            value={formData.totalVacancy} 
            onChange={handleChange}
            className={errors.totalVacancy ? 'border-red-500' : ''}
            type="number"
            min="1"
            required
            placeholder="Enter number of seats"
          />
          {errors.totalVacancy && <p className="text-red-500 text-sm mt-1">{errors.totalVacancy}</p>}
        </div>
        

        <div>
          <label htmlFor="requirements" className="block text-sm font-medium text-gray-700">Requirements (comma-separated)</label>
          <Input id="requirements" name="requirements" value={formData.requirements} onChange={handleChange} />
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label htmlFor="applicationBeginDate" className="block text-sm font-medium text-gray-700">Application Begin Date</label>
            <Input id="applicationBeginDate" name="applicationBeginDate" type="date" value={formData.applicationBeginDate} onChange={handleChange} />
          </div>
          <div>
            <label htmlFor="lastDateApplyOnline" className="block text-sm font-medium text-gray-700">Last Date to Apply Online</label>
            <Input id="lastDateApplyOnline" name="lastDateApplyOnline" type="date" value={formData.lastDateApplyOnline} onChange={handleChange} />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label htmlFor="minimumAge" className="block text-sm font-medium text-gray-700">Minimum Age</label>
            <Input 
              id="minimumAge" 
              name="minimumAge" 
              type="text" 
              value={formData.minimumAge} 
              onChange={handleChange}
              className={errors.minimumAge ? 'border-red-500' : ''}
              placeholder="Enter minimum age"
            />
            {errors.minimumAge && <p className="text-red-500 text-sm mt-1">{errors.minimumAge}</p>}
          </div>
          <div>
            <label htmlFor="maximumAge" className="block text-sm font-medium text-gray-700">Maximum Age</label>
            <Input 
              id="maximumAge" 
              name="maximumAge" 
              type="text" 
              value={formData.maximumAge} 
              onChange={handleChange}
              className={errors.maximumAge ? 'border-red-500' : ''}
              placeholder="Enter maximum age"
            />
            {errors.maximumAge && <p className="text-red-500 text-sm mt-1">{errors.maximumAge}</p>}
          </div>
         
          <div>
            <label htmlFor="gender" className="block text-sm font-medium text-gray-700">Gender</label>
            <Input id="gender" name="gender" type="text" value={formData.gender} onChange={handleChange} />
          </div>
          <div>
            <label htmlFor="qualification" className="block text-sm font-medium text-gray-700">Qualification</label>
            <Input id="qualification" name="qualification" type="text" value={formData.qualification} onChange={handleChange} />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label htmlFor="formCompleteLastDate" className="block text-sm font-medium text-gray-700">Form Complete Last Date</label>
            <Input id="formCompleteLastDate" name="formCompleteLastDate" type="date" value={formData.formCompleteLastDate} onChange={handleChange} />
          </div>
          <div>
            <label htmlFor="correctionDate" className="block text-sm font-medium text-gray-700">Correction Date</label>
            <Input id="correctionDate" name="correctionDate" value={formData.correctionDate} onChange={handleChange} placeholder="e.g., May 2025" />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label htmlFor="examDate" className="block text-sm font-medium text-gray-700">Exam Date</label>
            <Input id="examDate" name="examDate" value={formData.examDate} onChange={handleChange} placeholder="e.g., June / July"/>
          </div>
          <div>
            <label htmlFor="admitCardDate" className="block text-sm font-medium text-gray-700">Admit Card Available</label>
            <Input id="admitCardDate" name="admitCardDate" value={formData.admitCardDate} onChange={handleChange} placeholder="e.g., Before Exam" />
          </div>
        </div>

        <div>
          <label htmlFor="applicationFeeGeneral" className="block text-sm font-medium text-gray-700">Application Fee (General/OBC/EWS)</label>
          <Input id="applicationFeeGeneral" name="applicationFeeGeneral" value={formData.applicationFeeGeneral} onChange={handleChange} placeholder="e.g., 600/-" />
        </div>

        <div>
          <label htmlFor="applicationFeeSCST" className="block text-sm font-medium text-gray-700">Application Fee (SC/ST)</label>
          <Input id="applicationFeeSCST" name="applicationFeeSCST" value={formData.applicationFeeSCST} onChange={handleChange} placeholder="e.g., 400/-" />
        </div>

        <div>
          <label htmlFor="paymentMethod" className="block text-sm font-medium text-gray-700">Payment Method</label>
          <Input id="paymentMethod" name="paymentMethod" value={formData.paymentMethod} onChange={handleChange} />
        </div>
        </>
        {/* Fields formerly conditional, now always shown */}

        <div className="flex justify-end space-x-2 pt-4">
          <Button type="button" variant="outline" onClick={onCancel}>
            Cancel
          </Button>
          <Button type="submit">
            {initialData ? 'Update Job' : 'Post Job'}
          </Button>
        </div>
      </form>
    </div>
  );
}
