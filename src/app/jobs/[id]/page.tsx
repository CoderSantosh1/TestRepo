'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Navbar from "../../../components/Header"
import Footer from '@/components/Footer';

interface Job {
  _id: string;
  title: string;
  company: string;
  location: string;
  description: string;
  requirements: string[];
  salary: string;
  postedDate: string;
  deadline: string;
  status: string;
  applyJob: string;
}

export default function JobDetail() {
  const params = useParams();
  const router = useRouter();
  const [job, setJob] = useState<Job | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [retryCount, setRetryCount] = useState(0);
  const maxRetries = 3;

  useEffect(() => {
    const fetchJob = async () => {
      try {
        setLoading(true);
        setError('');
        
        // Remove the duplicate declaration of `params` inside the `fetchJob` function
        if (!params || !params.id) {
          setError('Invalid parameters');
          setLoading(false);
          return;
        }

        const response = await fetch(`/api/jobs/${params.id}`);
        if (!response.ok) {
          const errorText = await response.text();
          throw new Error(response.status === 404 ? 'Job not found' : errorText || 'Failed to fetch job details');
        }
        
        const data = await response.json();
        if (!data.data) {
          throw new Error('Job data is missing');
        }
        
        setJob(data.data);
        setRetryCount(0); // Reset retry count on successful fetch
      } catch (err) {
        console.error('Error fetching job:', err);
        const errorMessage = err instanceof Error ? err.message : 'Error fetching job details';
        setError(errorMessage);
        
        // Implement retry logic
        if (retryCount < maxRetries) {
          setRetryCount(prev => prev + 1);
          setTimeout(() => fetchJob(), 1000 * (retryCount + 1)); // Exponential backoff
          return;
        }
      } finally {
        setLoading(false);
      }
    };

    if (params?.id) {
      fetchJob();
    }
  }, [params?.id, retryCount, maxRetries]);

  if (loading) {
    return (
      
      <div className="flex flex-col justify-center items-center min-h-screen">
        <div className="mb-2">Loading...</div>
        {retryCount > 0 && (
          <div className="text-sm text-gray-500">
            Retry attempt {retryCount} of {maxRetries}...
          </div>
        )}
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col justify-center items-center min-h-screen">
        <div className="text-red-500 mb-4">{error}</div>
        {retryCount < maxRetries && (
          <button
            onClick={() => setRetryCount(prev => prev + 1)}
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
          >
            Retry
          </button>
        )}
        <button
          onClick={() => router.back()}
          className="mt-4 text-gray-600 hover:text-gray-900"
        >
          ← Back to Jobs
        </button>
      </div>
    );
  }

  if (!job) {
    return (
      <div className="flex flex-col justify-center items-center min-h-screen">
        <div className="text-gray-700 mb-4">Job not found</div>
        <button
          onClick={() => router.back()}
          className="text-gray-600 hover:text-gray-900"
        >
          ← Back to Jobs
        </button>
      </div>
    );
  }

  return (
    <>
        <Navbar/>
        <div className="container mx-auto px-4 py-8">
          <div className="max-w-7xl mx-auto bg-white rounded-lg shadow-lg overflow-hidden">
            <div className="p-8">
              <h1 className="text-3xl font-bold text-[#00000] mb-4">{job.title}</h1>  
              <div className="flex items-center text-[#00000] mb-6">
                <span className="mr-4">{job.company}</span>
                <span className="mr-4">•</span>
                <span>{job.location}</span>
              </div>
    
              <div className="mb-8">
                <h2 className="text-xl font-semibold text-gray-900 mb-3">Job Description</h2>
                <p className="text-gray-700 whitespace-pre-line">{job.description}</p>
              </div>
    
              <div className="mb-8">
                <h2 className="text-xl font-semibold text-gray-900 mb-3">Requirements</h2>
                <ul className="list-disc list-inside text-gray-700">
                  {job.requirements.map((requirement, index) => (
                    <li key={index} className="mb-2">{requirement}</li>
                  ))}
                </ul>
              </div>
    
              <div className="grid grid-cols-2 gap-6 mb-8">
                <div>
                  <h3 className="font-semibold text-gray-900">Salary</h3>
                  <p className="text-gray-700">{job.salary}</p>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">Application Deadline</h3>
                  <p className="text-gray-700">{new Date(job.deadline).toLocaleDateString()}</p>
                </div>
              </div>
    
              <div className="flex justify-between items-center">
                <button
                  onClick={() => router.back()}
                  className="text-gray-600 hover:text-gray-900"
                >
                  ← Back to Home
                </button>
                <button
                  onClick={() => router.push(job.applyJob)}
                  className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Apply Now
                </button>
              </div>
            </div>
          </div>
        </div>
        <Footer/>
      </>
  );
}