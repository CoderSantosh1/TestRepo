'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';


interface Job {
  _id: string;
  title: string;
  organization: string; 
  location: string;
  salary?: string; 
  totalVacancy: string; 
  age?: string; 
  gender?: string; 
  qualification?: string; 
  applicationDeadline: string;
  status: string;
  category?: string;
  applyJob?: string;
  description?: string;
  requirements?: string[];
  applicationBeginDate?: string;
  lastDateApplyOnline?: string;
  formCompleteLastDate?: string;
  correctionDate?: string;
  examDate?: string;
  admitCardDate?: string;
  applicationFeeGeneral?: string;
  applicationFeeSCST?: string;
  paymentMethod?: string;
  createdAt: string; // Added createdAt for posted date
}

export default function JobsPage() {
  const router = useRouter();
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const validateJobForm = (job: Job) => {
      const errors: string[] = [];
      if (!job.totalVacancy || isNaN(Number(job.totalVacancy))) {
        errors.push('Total Vacancy must be a valid number');
      }
      return errors;
    };

    const fetchJobs = async () => {
      try {
        const response = await fetch('/api/jobs');
        if (!response.ok) {
          throw new Error('Failed to fetch jobs');
        }
        const data = await response.json();
        const validatedJobs = data.data.map((job: Job) => {
          const errors = validateJobForm(job);
          if (errors.length > 0) {
            console.error('Validation errors:', errors);
            return null;
          }
          return job;
        }).filter(Boolean);
        setJobs(validatedJobs);
      } catch (err) {
        console.error('Failed to fetch jobs:', err);
        setError('Error loading jobs');
      } finally {
        setLoading(false);
      }
    };

    fetchJobs();
  }, []);

  if (loading) {
    return <div className="flex justify-center items-center min-h-screen">Loading...</div>;
  }

  if (error) {
    return <div className="flex justify-center items-center min-h-screen text-red-500">{error}</div>;
  }

  return (
    <>
  
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8 text-gray-900">Available Jobs</h1>
      
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {jobs.map((job) => (
          <div 
            key={job._id}
            onClick={() => router.push(`/jobs/${job._id}`)}
            className="cursor-pointer bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow duration-200"
          >
            <h2 className="text-xl font-semibold mb-2 text-gray-900">{job.title}</h2>
            
            <div className="mb-4">
              <p className="text-gray-700 font-medium">{job.organization}</p>
              <p className="text-gray-600">{job.location}</p>
              {job.category && <p className="text-sm text-blue-600 mt-1">Category: {job.category}</p>}
            </div>
            <div className="mb-4">
              <p className="text-gray-600">Total Seats: {job.totalVacancy}</p>
            </div>
            
            <div className="space-y-2 text-sm text-gray-600">
              {job.applicationBeginDate && <p><strong>Application Starts:</strong> {new Date(job.applicationBeginDate).toLocaleDateString()}</p>}
              {job.lastDateApplyOnline && <p><strong>Apply By:</strong> {new Date(job.lastDateApplyOnline).toLocaleDateString()}</p>}
              {job.examDate && <p><strong>Exam Date:</strong> {job.examDate}</p>}
            </div>

            <div className="flex justify-between items-center mt-4">
              <div className="text-sm text-gray-500">
                {job.salary && <p>Salary: {job.salary}</p>}
                <p>Posted: {new Date(job.createdAt).toLocaleDateString()}</p>
              </div>
              <span 
                className={`px-3 py-1 rounded-full text-xs ${job.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}`}
              >
                {job.status}
              </span>
            </div>
          </div>
        ))}
      </div>

      {jobs.length === 0 && (
        <div className="text-center text-gray-600 mt-8">
          No jobs available at the moment.
        </div>
      )}
    </div>
    </>
  );
}