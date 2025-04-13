'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import JobList from './components/JobList';
import ResultList from './components/ResultList';
import AdmitCard from './components/AdmitCardList';

interface JobFormData {
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

interface AdmitCardFormData {
  title: string;
  description: string;
  organization: string;
  subtitle: string;
  category: string;
  applicationDeadline: string;
  location: string;
}
interface ResultFormData {
  title: string;
  organization: string;
  resultDate: string;
  category: string;
  downloadLink: string;
  description?: string;
  status: string;
}

type TabType = 'jobs' | 'results' | 'admit-cards';

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState<TabType>('jobs');
  const [jobFormData, setJobFormData] = useState<JobFormData>({
    title: '',
    description: '',
    organization: '',
    location: '',
    salary: '',
    requirements: [],
    applicationDeadline: '',
    category: '',
    status: 'published'
  });

  const [admitCardFormData, setAdmitCardFormData] = useState<AdmitCardFormData>({
    title: '',
    description: '',
    organization: '',
    location: '',
    subtitle: '',
    applicationDeadline: '',
    category: ''
  });

  const handleJobSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch('/api/jobs', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(jobFormData),
      });

      if (response.ok) {
        alert('Job posted successfully!');
        setJobFormData({
          title: '',
          description: '',
          organization: '',
          location: '',
          salary: '',
          requirements: [],
          applicationDeadline: '',
          category: '',
          status: 'published'
        });
      } else {
        alert('Failed to post job');
      }
    } catch (error) {
      console.error('Error posting job:', error);
      alert('Error posting job');
    }
  };

  const handleAdmitCardSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch('/api/admit-cards', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(admitCardFormData),
      });

      if (response.ok) {
        alert('Admit card posted successfully!');
        setAdmitCardFormData({
          title: '',
          description: '',
          organization: '',
          location: '',
          subtitle: '',
          applicationDeadline: '',
          category: ''
        });
      } else {
        alert('Failed to post admit card');
      }
    } catch (error) {
      console.error('Error posting admit card:', error);
      alert('Error posting admit card');
    }
  };

  //results section 
  const [resultsFormData, setResultsFormData] = useState<ResultFormData>({
    title: '',
    organization: '',
    resultDate: '',
    category: '',
    downloadLink: '',
    description: '',
    status: 'published'
  });

  const handleResultSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch('/api/results', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(resultsFormData),
      });

      if (response.ok) {
        alert('Results posted successfully!');
        setResultsFormData({
          title: '',
          organization: '',
          resultDate: '',
          category: '',
          downloadLink: '',
          description: '',
          status: 'draft'
        });
      } else {
        alert('Failed to post results');
      }
    } catch (error) {
      console.error('Error posting results:', error);
      alert('Error posting results');
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
              <form onSubmit={handleJobSubmit} className="space-y-6">
                <div>
                  <label className="block text-sm font-medium mb-2">Job Title</label>
                  <input
                    type="text"
                    value={jobFormData.title}
                    onChange={(e) => setJobFormData({...jobFormData, title: e.target.value})}
                    className="w-full p-2 border rounded-md"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Organization</label>
                  <input
                    type="text"
                    value={jobFormData.organization}
                    onChange={(e) => setJobFormData({...jobFormData, organization: e.target.value})}
                    className="w-full p-2 border rounded-md"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Description</label>
                  <textarea
                    value={jobFormData.description}
                    onChange={(e) => setJobFormData({...jobFormData, description: e.target.value})}
                    className="w-full p-2 border rounded-md h-32"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Location</label>
                  <input
                    type="text"
                    value={jobFormData.location}
                    onChange={(e) => setJobFormData({...jobFormData, location: e.target.value})}
                    className="w-full p-2 border rounded-md"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Salary (Optional)</label>
                  <input
                    type="text"
                    value={jobFormData.salary}
                    onChange={(e) => setJobFormData({...jobFormData, salary: e.target.value})}
                    className="w-full p-2 border rounded-md"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Category</label>
                  <input
                    type="text"
                    value={jobFormData.category}
                    onChange={(e) => setJobFormData({...jobFormData, category: e.target.value})}
                    className="w-full p-2 border rounded-md"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Application Deadline</label>
                  <input
                    type="date"
                    value={jobFormData.applicationDeadline}
                    onChange={(e) => setJobFormData({...jobFormData, applicationDeadline: e.target.value})}
                    className="w-full p-2 border rounded-md"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Publication Status</label>
                  <select
                    className="w-full p-2 border rounded-md"
                    value={jobFormData.status}
                    onChange={(e) => setJobFormData({...jobFormData, status: e.target.value})}
                    required
                  >
                    <option value="published">Published</option>
                    <option value="unpublished">Draft</option>
                  </select>
                </div>
                <Button type="submit" className="w-full">Post Job</Button>
              </form>
            </div>
            <JobList />
          </div>
        </>
      )}

      {activeTab === 'results' && (
       <>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
              <h2 className="text-2xl font-semibold mb-6">Post New Job</h2>
           <form onSubmit={handleResultSubmit} className="space-y-6">
             <div>
               <label className="block text-sm font-medium mb-2">Exam Name</label>
               <input
                 type="text"
                 value={resultsFormData.title}
                 onChange={(e) => setResultsFormData({...resultsFormData,title: e.target.value})}
                 className="w-full p-2 border rounded-md"
                 required
                 minLength={3}
               />
             </div>

             <div>
               <label className="block text-sm font-medium mb-2">Organization</label>
               <input
                 type="text"
                 value={resultsFormData.organization}
                 onChange={(e) => setResultsFormData({...resultsFormData, organization: e.target.value})}
                 className="w-full p-2 border rounded-md"
                 required
               />
             </div>

             <div>
               <label className="block text-sm font-medium mb-2">Result Date</label>
               <input
                 type="date"
                 value={resultsFormData.resultDate}
                 onChange={(e) => setResultsFormData({...resultsFormData, resultDate: e.target.value})}
                 className="w-full p-2 border rounded-md"
                 required
                 max={new Date().toISOString().split('T')[0]}
               />
             </div>

             <div>
               <label className="block text-sm font-medium mb-2">Category</label>
               <select
                 value={resultsFormData.category}
                 onChange={(e) => setResultsFormData({...resultsFormData, category: e.target.value})}
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
               <label className="block text-sm font-medium mb-2">Download Link</label>
               <input
                 type="url"
                 value={resultsFormData.downloadLink}
                 onChange={(e) => setResultsFormData({...resultsFormData, downloadLink: e.target.value})}
                 className="w-full p-2 border rounded-md"
                 required
                 pattern="https?:\/\/(www\.)?[\w\-\.]+\.[a-zA-Z]{2,}(\/\S*)?$"
               />
             </div>

             <Button type="submit" className="w-full">Post Result</Button>
           </form>
         </div>
         <ResultList />
       </div>
     </>
      )}

      {activeTab === 'admit-cards' && (
        <>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
              <h2 className="text-2xl font-semibold mb-6">Post Latest News</h2>
              <form onSubmit={handleResultSubmit} className="space-y-6">
                <div>
                  <label className="block text-sm font-medium mb-2">News Title</label>
                  <input
                    type="text"
                    value={admitCardFormData.title}
                    onChange={(e) => setAdmitCardFormData({...admitCardFormData, title: e.target.value})}
                    className="w-full p-2 border rounded-md"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Organization</label>
                  <input
                    type="text"
                    value={admitCardFormData.organization}
                    onChange={(e) => setAdmitCardFormData({...admitCardFormData, organization: e.target.value})}
                    className="w-full p-2 border rounded-md"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Description</label>
                  <textarea
                    value={admitCardFormData.description}
                    onChange={(e) => setAdmitCardFormData({...admitCardFormData, description: e.target.value})}
                    className="w-full p-2 border rounded-md h-32"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Location</label>
                  <input
                    type="text"
                    value={admitCardFormData.location}
                    onChange={(e) => setAdmitCardFormData({...admitCardFormData, location: e.target.value})}
                    className="w-full p-2 border rounded-md"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Subtitle (Optional)</label>
                  <input
                    type="text"
                    value={admitCardFormData.subtitle}
                    onChange={(e) => setAdmitCardFormData({...admitCardFormData, subtitle: e.target.value})}
                    className="w-full p-2 border rounded-md"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Category</label>
                  <input
                    type="text"
                    value={admitCardFormData.category}
                    onChange={(e) => setAdmitCardFormData({...admitCardFormData, category: e.target.value})}
                    className="w-full p-2 border rounded-md"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Application Deadline</label>
                  <input
                    type="date"
                    value={admitCardFormData.applicationDeadline}
                    onChange={(e) => setAdmitCardFormData({...admitCardFormData, applicationDeadline: e.target.value})}
                    className="w-full p-2 border rounded-md"
                    required
                  />
                </div>

                <Button type="submit" className="w-full">Post Result</Button>
              </form>
            </div>
            <AdmitCard />
          </div>
        </>
      )}
    </div>
  );
}
