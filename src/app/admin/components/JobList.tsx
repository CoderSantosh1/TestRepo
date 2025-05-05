



'use client';

import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import JobForm from './JobForm';

interface Job {
  _id: string;
  title: string;
  organization: string;
  location: string;
  status: string;
  applicationDeadline: string;
  createdAt: string;
}

export default function JobList() {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingJob, setEditingJob] = useState<Job | null>(null);

  useEffect(() => {
    fetchJobs();
  }, []);

  const fetchJobs = async () => {
    try {
      const response = await fetch('/api/jobs');
      if (response.ok) {
        const data = await response.json();
        setJobs(data.data);
      } else {
        console.error('Failed to fetch jobs');
      }
    } catch (error) {
      console.error('Error fetching jobs:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = async (job: Job) => {
    setEditingJob(job);
  };

  const handleUpdate = async (data: Omit<Job, '_id' | 'createdAt'>) => {
    if (!editingJob) return;

    try {
      const response = await fetch(`/api/jobs/${editingJob._id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        const updatedJob = await response.json();
        setJobs(jobs.map(job => 
          job._id === editingJob._id ? { ...job, ...updatedJob.data } : job
        ));
        setEditingJob(null);
        alert('Job updated successfully');
      } else {
        alert('Failed to update job');
      }
    } catch (error) {
      console.error('Error updating job:', error);
      alert('Error updating job');
    }
  };

  const handleDelete = async (jobId: string) => {
    if (!confirm('Are you sure you want to delete this job?')) return;
    
    try {
      const response = await fetch(`/api/jobs/${jobId}`, {
        method: 'DELETE',
      });
      
      if (response.ok) {
        setJobs(jobs.filter(job => job._id !== jobId));
        alert('Job deleted successfully');
      } else {
        alert('Failed to delete job');
      }
    } catch (error) {
      console.error('Error deleting job:', error);
      alert('Error deleting job');
    }
  };

  if (loading) {
    return <div className="text-center">Loading...</div>;
  }

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h2 className="text-2xl font-semibold mb-6">Posted Jobs</h2>
      <div className="space-y-4">
        {jobs.length === 0 ? (
          <p className="text-gray-500 dark:text-gray-400 text-center">No jobs posted yet</p>
        ) : (
          jobs.map((job) => (
            <div
              key={job._id}
              className="border rounded-lg p-4 hover:shadow-md transition-shadow"
            >
              <h3 className="text-lg font-semibold">{job.title}</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                {job.organization} • {job.location}
              </p>
              <div className="mt-2 flex items-center justify-between">
                <span className="text-sm text-gray-500 dark:text-gray-400">
                  Posted: {new Date(job.createdAt).toLocaleDateString()}
                </span>
                <span
                  className={`px-2 py-1 rounded-full text-xs ${job.status === 'published' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}`}
                >
                  {job.status}
                </span>
              </div>
              <div className="mt-3 flex gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleEdit(job)}
                >
                  Edit
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  className="text-red-600 hover:text-red-700"
                  onClick={() => handleDelete(job._id)}
                >
                  Delete
                </Button>
              </div>
            </div>
          ))
        )}
      </div>

      {editingJob && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg w-full max-w-2xl">
            <JobForm
              initialData={editingJob}
              onSubmit={handleUpdate}
              onCancel={() => setEditingJob(null)}
            />
          </div>
        </div>
      )}
    </div>
  );
}