'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Header from "../../components/Header";
import Footer from "../../components/Footer";


interface Job {
  _id: string;
  title: string;
  organization: string; 
  location: string;
  salary?: string; 
  totalVacancy: string; 
  minimumAge?: string;
  maximumAge?: string;
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
    <Header />
    <div className="max-w-7xl mx-auto px-2 sm:px-4 py-8 w-full">
      <h1 className="text-3xl font-bold mb-8 text-gray-900 text-3xl">Latest Jobs</h1>
      <div className="w-full overflow-x-auto hide-scrollbar">
        <table className="w-full table-fixed border-collapse border border-orange-500 text-xs sm:text-sm md:text-base">
          <thead>
            <tr className="bg-red-600 text-[#FCFCD8] font-bold text-2xl">
              <th className="p-2 text-center break-words whitespace-normal">Latest Jobs</th>
            </tr>
          </thead>
          <tbody>
            {jobs.map((job) => (
              <tr key={job._id} className="border-t-2 border-red-500 bg-[#FFF8CC] ">
                <td className="p-2 border-x text-left align-top break-words whitespace-pre-wrap flex justify-center">
                  <a href={`/jobs/${job._id}`} className="text-[#014F59] hover:underline hover:text-blue-800">
                    {job.title}
                  </a>
                </td>
                
              </tr>
            ))}
          </tbody>
        </table>
        {jobs.length === 0 && (
          <div className="text-center text-gray-600 dark:text-gray-400 mt-8">
            No jobs available at the moment.
          </div>
        )}
      </div>
    </div>
    <Footer />
    </>
  );
}