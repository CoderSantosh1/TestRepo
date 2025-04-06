'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import JobList from './components/JobList';
import ResultList from './components/ResultList';

interface JobFormData {
  title: string;
  description: string;
  organization: string;
  location: string;
  salary: string;
  requirements: string[];
  applicationDeadline: string;
  category: string;
}

type TabType = 'jobs' | 'results' | 'admit-cards';

export default function AdminDashboard() {
  const [formData, setFormData] = useState<JobFormData>({    title: '',
    description: '',
    organization: '',
    location: '',
    salary: '',
    requirements: [],
    applicationDeadline: '',
    category: ''
  });
  const [activeTab, setActiveTab] = useState<TabType>('jobs');
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch('/api/jobs', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        alert('Job posted successfully!');
        setFormData({
          title: '',
          description: '',
          organization: '',
          location: '',
          salary: '',
          requirements: [],
          applicationDeadline: '',
          category: ''
        });
      } else {
        alert('Failed to post job');
      }
    } catch (error) {
      console.error('Error posting job:', error);
      alert('Error posting job');
    }
  };

  const tabs = [
    { id: 'jobs' as TabType, label: 'Jobs' },
    { id: 'results' as TabType, label: 'Results' },
    { id: 'admit-cards' as TabType, label: 'Admit Cards' },
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Admin Dashboard</h1>
      
      <div className="mb-6">
        <div className="border-b border-gray-200">
          <nav className="-mb-px flex space-x-8" aria-label="Tabs">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`
                  whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm
                  ${activeTab === tab.id
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'}
                `}
              >
                {tab.label}
              </button>
            ))}
          </nav>
        </div>
      </div>

      {activeTab === 'jobs' && (
        <>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
          <h2 className="text-2xl font-semibold mb-6">Post New Job</h2>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium mb-2">Job Title</label>
              <input
                type="text"
                value={formData.title}
                onChange={(e) => setFormData({...formData, title: e.target.value})}
                className="w-full p-2 border rounded-md"
                required
              />
            </div>
  
            <div>
              <label className="block text-sm font-medium mb-2">Organization</label>
              <input
                type="text"
                value={formData.organization}
                onChange={(e) => setFormData({...formData, organization: e.target.value})}
                className="w-full p-2 border rounded-md"
                required
              />
            </div>
  
            <div>
              <label className="block text-sm font-medium mb-2">Description</label>
              <textarea
                value={formData.description}
                onChange={(e) => setFormData({...formData, description: e.target.value})}
                className="w-full p-2 border rounded-md h-32"
                required
              />
            </div>
  
            <div>
              <label className="block text-sm font-medium mb-2">Location</label>
              <input
                type="text"
                value={formData.location}
                onChange={(e) => setFormData({...formData, location: e.target.value})}
                className="w-full p-2 border rounded-md"
                required
              />
            </div>
  
            <div>
              <label className="block text-sm font-medium mb-2">Salary (Optional)</label>
              <input
                type="text"
                value={formData.salary}
                onChange={(e) => setFormData({...formData, salary: e.target.value})}
                className="w-full p-2 border rounded-md"
              />
            </div>
  
            <div>
              <label className="block text-sm font-medium mb-2">Category</label>
              <input
                type="text"
                value={formData.category}
                onChange={(e) => setFormData({...formData, category: e.target.value})}
                className="w-full p-2 border rounded-md"
                required
              />
            </div>
  
            <div>
              <label className="block text-sm font-medium mb-2">Application Deadline</label>
              <input
                type="date"
                value={formData.applicationDeadline}
                onChange={(e) => setFormData({...formData, applicationDeadline: e.target.value})}
                className="w-full p-2 border rounded-md"
                required
              />
            </div>
  
            <Button type="submit" className="w-full">Post Job</Button>
          </form>
        </div>
          <JobList />
          </div>
        </>
      )}

      {activeTab === 'results' && (
        <ResultList />
      )}

      {activeTab === 'admit-cards' && (
        <div className="text-center text-gray-500">
          Admit Cards section coming soon...
        </div>
      )}

    </div>
  );
}