'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import JobList from './components/JobList';
import ResultList from './components/ResultList';
import AdmitCard from './components/AdmitCardList';
import NewsList from './components/NewsList';
import AnswerKeyForm from './components/AnswerKeyForm';
import AnswerKeyList from './components/AnswerKeyList'; // Import the new list component
import AdmissionForm, { AdmissionFormData as AdmissionFormDataType } from './components/AdmissionForm';
import AdmissionList from './components/AdmissionList'; // Import AdmissionList

interface NewsFormData {
  title: string;
  content: string;
  organization: string;
  category: string;
  status: string;
  publishDate: string;
}

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
  applyJob: string;
}

interface AdmitCardFormData {
  title: string;
  description: string;
  organization: string;
  subtitle: string;
  category: string;
  applicationDeadline: string;
  location: string;
  downloadAdmitcardLink: string;
}
interface ResultFormData {
  title: string;
  organization: string;
  resultDate: string;
  category: string;
  downloadLink: string;
  description: string;
  status: string;
}

type TabType = 'jobs' | 'results' | 'admit-cards' | 'news' | 'answer-keys' | 'admissions';

export default function AdminDashboard() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem('adminToken');
    if (!token) {
      router.push('/admin/login');
    } else {
      setIsLoggedIn(true);
    }
  }, []);

  const handleLogout = async () => {
    try {
      await fetch('/api/admin/logout', {
        method: 'POST'
      });
      localStorage.removeItem('adminToken');
      router.push('/admin/login');
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

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
    applyJob: '',
    status: 'published'
  });

  const [admitCardFormData, setAdmitCardFormData] = useState<AdmitCardFormData>({
    title: '',
    description: '',
    organization: '',
    location: '',
    subtitle: '',
    applicationDeadline: '',
    category: '',
    downloadAdmitcardLink: '',
  });

  const [newsFormData, setNewsFormData] = useState<NewsFormData>({
    title: '',
    content: '',
    organization: '',
    category: '',
    status: 'published',
    publishDate: new Date().toISOString().split('T')[0]
  });

  const [resultsFormData, setResultsFormData] = useState<ResultFormData>({
    title: '',
    organization: '',
    resultDate: '',
    category: '',
    downloadLink: '',
    description: '',
    status: 'published'
  });

  const [answerKeyFormData, setAnswerKeyFormData] = useState({
    title: '',
    organization: '',
    examDate: '',
    category: '',
    downloadLink: '',
    description: '',
    content: '', // Added content field
    status: 'published'
  });

  const [answerKeyListRefreshKey, setAnswerKeyListRefreshKey] = useState(0);
  const [admissionListRefreshKey, setAdmissionListRefreshKey] = useState(0); // Added for admissions list

  const [admissionFormData, setAdmissionFormData] = useState<AdmissionFormDataType>({
    title: '',
    organization: '',
    applicationDeadline: '', // Changed from admissionDate and ensured it's present
    category: '',
    description: '',
    content: '', // Added missing content field
    applicationLink: '',
    status: 'published'
  });

  if (!isLoggedIn) {
    return null;
  }

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
          applyJob: '',
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
          category: '',
          downloadAdmitcardLink: '',
        });
      } else {
        alert('Failed to post admit card');
      }
    } catch (error) {
      console.error('Error posting admit card:', error);
      alert('Error posting admit card');
    }
  };



  const handleNewsSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch('/api/news', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newsFormData),
      });

      if (response.ok) {
        alert('News posted successfully!');
        setNewsFormData({
          title: '',
          content: '',
          organization: '',
          category: '',
          status: 'published',
          publishDate: new Date().toISOString().split('T')[0]
        });
      } else {
        alert('Failed to post news');
      }
    } catch (error) {
      console.error('Error posting news:', error);
      alert('Error posting news');
    }
  };

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

  const handleAnswerKeyFormSuccess = () => {
    setAnswerKeyListRefreshKey(prev => prev + 1); // Trigger list refresh
    // The form itself now handles resetting its state on successful creation via its own internal logic triggered by onSubmit completing without initialData
  };

  // This function will be passed as the onSubmit prop to AnswerKeyForm for creating new entries
  const handleCreateAnswerKey = async (data: any) => { // 'data' comes from AnswerKeyForm
    try {
      const response = await fetch('/api/answer-keys', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data), // Use data from the form
      });

      if (response.ok) {
        alert('Answer key posted successfully!');
        // No need to reset answerKeyFormData here, AnswerKeyForm handles its own state reset on success for create mode
        // onSuccess (handleAnswerKeyFormSuccess) will be called by AnswerKeyForm to refresh the list
      } else {
        const errorData = await response.json().catch(() => ({}));
        alert(`Failed to post answer key: ${errorData.message || response.statusText}`);
      }
    } catch (error) {
      console.error('Error posting answer key:', error);
      alert('Error posting answer key');
    }
  };

  const handleAdmissionSubmit = async (data: AdmissionFormDataType) => {
    try {
      const response = await fetch('/api/admissions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        alert('Admission posted successfully!');
        setAdmissionFormData({
          title: '',
          organization: '',
          applicationDeadline: '', // Corrected from admissionDate
          category: '',
          description: '',
          content: '', // Added content field
          applicationLink: '',
          status: 'published'
        });
      } else {
        alert('Failed to post admission');
      }
    } catch (error) {
      console.error('Error posting admission:', error);
      alert('Error posting admission');
    }
  };

  const tabs = [
    { id: 'jobs' as TabType, label: 'Jobs' },
    { id: 'results' as TabType, label: 'Results' },
    { id: 'admit-cards' as TabType, label: 'Admit Cards' },
    { id: 'news' as TabType, label: 'News' },
    { id: 'answer-keys' as TabType, label: 'Answer Keys' },
    { id: 'admissions' as TabType, label: 'Admissions' },
  ];

  return (
    <div className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">Admin Dashboard</h1>
          <Button onClick={handleLogout} variant="outline">
            Logout
          </Button>
        </div>
      
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
            <div className="bg-white  rounded-lg shadow-lg p-6">
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
                  <label className="block text-sm font-medium mb-2">Applay online link</label>
                  <input
                    type="text"
                    value={jobFormData.applyJob}
                    onChange={(e) => setJobFormData({...jobFormData, applyJob: e.target.value})}
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
            <div className="bg-white  rounded-lg shadow-lg p-6">
              <h2 className="text-2xl font-semibold mb-6">Post New Results</h2>
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
                  <label className="block text-sm font-medium mb-2">Description</label>
                  <textarea
                    value={resultsFormData.description}
                    onChange={(e) => setResultsFormData({...resultsFormData,description: e.target.value})}
                    className="w-full p-2 border rounded-md h-32"
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

      {activeTab === 'news' && (
        <>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="bg-white rounded-lg shadow-lg p-6">
              <h2 className="text-2xl font-semibold mb-6">Post News</h2>
              <form onSubmit={handleNewsSubmit} className="space-y-6">
                <div>
                  <label className="block text-sm font-medium mb-2">Title</label>
                  <input
                    type="text"
                    value={newsFormData.title}
                    onChange={(e) => setNewsFormData({...newsFormData, title: e.target.value})}
                    className="w-full p-2 border rounded-md"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Organization</label>
                  <input
                    type="text"
                    value={newsFormData.organization}
                    onChange={(e) => setNewsFormData({...newsFormData, organization: e.target.value})}
                    className="w-full p-2 border rounded-md"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Content</label>
                  <textarea
                    value={newsFormData.content}
                    onChange={(e) => setNewsFormData({...newsFormData, content: e.target.value})}
                    className="w-full p-2 border rounded-md h-32"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Category</label>
                  <select
                    value={newsFormData.category}
                    onChange={(e) => setNewsFormData({...newsFormData, category: e.target.value})}
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
                  <label className="block text-sm font-medium mb-2">Publish Date</label>
                  <input
                    type="date"
                    value={newsFormData.publishDate}
                    onChange={(e) => setNewsFormData({...newsFormData, publishDate: e.target.value})}
                    className="w-full p-2 border rounded-md"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Status</label>
                  <select
                    className="w-full p-2 border rounded-md"
                    value={newsFormData.status}
                    onChange={(e) => setNewsFormData({...newsFormData, status: e.target.value})}
                    required
                  >
                    <option value="published">Published</option>
                    <option value="draft">Draft</option>
                  </select>
                </div>

                <Button type="submit" className="w-full">Post News</Button>
              </form>
            </div>
            <NewsList />
          </div>
        </>
      )}

      {activeTab === 'admit-cards' && (
        <>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="bg-white rounded-lg shadow-lg p-6">
              <h2 className="text-2xl font-semibold mb-6">Post New Admit Card</h2>
              <form onSubmit={handleAdmitCardSubmit} className="space-y-6">
                <div>
                  <label className="block text-sm font-medium mb-2">Title</label>
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
                  <label className="block text-sm font-medium mb-2">Download Link</label>
                  <input
                    type="text"
                    value={admitCardFormData.downloadAdmitcardLink}
                    onChange={(e) => setAdmitCardFormData({...admitCardFormData, downloadAdmitcardLink: e.target.value})}
                    className="w-full p-2 border rounded-md"
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
                  <label className="block text-sm font-medium mb-2">Subtitle</label>
                  <input
                    type="text"
                    value={admitCardFormData.subtitle}
                    onChange={(e) => setAdmitCardFormData({...admitCardFormData, subtitle: e.target.value})}
                    className="w-full p-2 border rounded-md"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Category</label>
                  <select
                    value={admitCardFormData.category}
                    onChange={(e) => setAdmitCardFormData({...admitCardFormData, category: e.target.value})}
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
                  <label className="block text-sm font-medium mb-2">Application Deadline</label>
                  <input
                    type="date"
                    value={admitCardFormData.applicationDeadline}
                    onChange={(e) => setAdmitCardFormData({...admitCardFormData, applicationDeadline: e.target.value})}
                    className="w-full p-2 border rounded-md"
                    required
                  />
                </div>

                <Button type="submit" className="w-full">Post Admit Card</Button>
              </form>
            </div>
            <AdmitCard />
          </div>
        </>
      )}
      {activeTab === 'answer-keys' && (
        <>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="bg-white rounded-lg shadow-lg p-6">
              {/* AnswerKeyForm is now used for creating new answer keys */}
              {/* It handles its own state and submission logic */}
              {/* We pass handleCreateAnswerKey as onSubmit and handleAnswerKeyFormSuccess as onSuccess */}
              <AnswerKeyForm 
                onSubmit={handleCreateAnswerKey} 
                onSuccess={handleAnswerKeyFormSuccess} 
              />
            </div>
            <AnswerKeyList key={answerKeyListRefreshKey} /> {/* Refresh key ensures list updates */}
          </div>
        </>
      )}
      {activeTab === 'admissions' && (
        <>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="bg-white rounded-lg shadow-lg p-6">
              <h2 className="text-2xl font-semibold mb-6">Post New Admission</h2>
              {/* AdmissionForm for creating new admissions */}
              {/* We pass handleAdmissionSubmit for creation, and a key to reset the form if needed */}
              {/* The form itself should handle its state, including resetting after successful submission */}
              <AdmissionForm 
                onSubmit={handleAdmissionSubmit} 
                initialData={admissionFormData} // This is for the create form's initial state
                onCancel={() => { 
                  // Reset form data if cancellation means clearing the form
                  setAdmissionFormData({
                    title: '',
                    organization: '',
                    applicationDeadline: '',
                    category: '',
                    description: '',
                    content: '',
                    applicationLink: '',
                    status: 'published'
                  });
                }}
              />
            </div>
            {/* AdmissionList to display existing admissions */}
            <AdmissionList key={admissionListRefreshKey} />
          </div>
        </>
      )}
    </div>
  );
}

