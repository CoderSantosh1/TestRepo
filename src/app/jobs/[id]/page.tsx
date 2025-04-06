'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';

interface Job {
  _id: string;
  title: string;
  description: string;
  organization: string;
  location: string;
  salary: string;
  requirements: string[];
  applicationDeadline: string;
  category: string;
  status: string;
}

export default function JobDetails() {
  const { id } = useParams();
  const [job, setJob] = useState<Job | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchJobDetails = async () => {
      try {
        const response = await fetch(`/api/jobs/${id}`);
        if (!response.ok) {
          throw new Error('Failed to fetch job details');
        }
        const data = await response.json();
        setJob(data.data);
      } catch (err) {
        setError('Error loading job details');
      } finally {
        setLoading(false);
      }
    };

    fetchJobDetails();
  }, [id]);

  if (loading) {
    return <div className="flex justify-center items-center min-h-screen">Loading...</div>;
  }

  if (error) {
    return <div className="flex justify-center items-center min-h-screen text-red-500">{error}</div>;
  }

  if (!job) {
    return <div className="flex justify-center items-center min-h-screen">Job not found</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
        <h1 className="text-3xl font-bold mb-4 text-gray-900 dark:text-white">{job.title}</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div>
            <h2 className="text-xl font-semibold mb-2 text-gray-800 dark:text-gray-200">Organization</h2>
            <p className="text-gray-600 dark:text-gray-300">{job.organization}</p>
          </div>
          <div>
            <h2 className="text-xl font-semibold mb-2 text-gray-800 dark:text-gray-200">Location</h2>
            <p className="text-gray-600 dark:text-gray-300">{job.location}</p>
          </div>
        </div>

        <div className="mb-6">
          <h2 className="text-xl font-semibold mb-2 text-gray-800 dark:text-gray-200">Description</h2>
          <p className="text-gray-600 dark:text-gray-300 whitespace-pre-line">{job.description}</p>
        </div>

        <div className="mb-6">
          <h2 className="text-xl font-semibold mb-2 text-gray-800 dark:text-gray-200">Salary</h2>
          <p className="text-gray-600 dark:text-gray-300">{job.salary}</p>
        </div>

        <div className="mb-6">
          <h2 className="text-xl font-semibold mb-2 text-gray-800 dark:text-gray-200">Requirements</h2>
          <ul className="list-disc list-inside text-gray-600 dark:text-gray-300">
            {job.requirements.map((requirement, index) => (
              <li key={index}>{requirement}</li>
            ))}
          </ul>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h2 className="text-xl font-semibold mb-2 text-gray-800 dark:text-gray-200">Category</h2>
            <p className="text-gray-600 dark:text-gray-300">{job.category}</p>
          </div>
          <div>
            <h2 className="text-xl font-semibold mb-2 text-gray-800 dark:text-gray-200">Application Deadline</h2>
            <p className="text-gray-600 dark:text-gray-300">
              {new Date(job.applicationDeadline).toLocaleDateString()}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}