'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';

interface Job {
  _id: string;
  title: string;
  organization: string;
  location: string;
  salary: string;
  applicationDeadline: string;
  category: string;
}

export default function JobsPage() {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const response = await fetch('/api/jobs');
        if (!response.ok) {
          throw new Error('Failed to fetch jobs');
        }
        const data = await response.json();
        setJobs(data.data || []);
      } catch (err) {
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
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8 text-gray-900 dark:text-white">Latest Jobs</h1>
      
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {jobs.map((job) => (
          <Link 
            href={`/jobs/${job._id}`} 
            key={job._id}
            className="block bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow duration-200"
          >
            <h2 className="text-xl font-semibold mb-2 text-gray-900 dark:text-white">{job.title}</h2>
            
            <div className="mb-4">
              <p className="text-gray-600 dark:text-gray-300">{job.organization}</p>
              <p className="text-gray-600 dark:text-gray-300">{job.location}</p>
            </div>
            
            <div className="flex justify-between items-end">
              <div className="text-sm text-gray-500 dark:text-gray-400">
                <p>Category: {job.category}</p>
                <p>Deadline: {new Date(job.applicationDeadline).toLocaleDateString()}</p>
              </div>
              <div className="text-blue-600 dark:text-blue-400 font-semibold">
                {job.salary}
              </div>
            </div>
          </Link>
        ))}
      </div>

      {jobs.length === 0 && (
        <div className="text-center text-gray-600 dark:text-gray-400 mt-8">
          No jobs available at the moment.
        </div>
      )}
    </div>
  );
}