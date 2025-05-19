'use client';

import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import AdmissionForm from './AdmissionForm'; // Assuming AdmissionForm exists and is correctly typed

// Define the structure of an Admission, mirroring AdmitCard for now
// TODO: Adjust this interface based on the actual Admission data structure
interface Admission {
  _id: string;
  title: string;
  organization: string;
  applicationDeadline: string; // Or relevant date field
  category: string;
  description: string;
  applicationLink: string;
  status: string;
  createdAt: string; // Assuming createdAt is part of the data
  content: string; // Added content field
  // Add other relevant fields for Admission
}

// Define the expected props for AdmissionForm if it's different from AdmitCardForm
// For now, assuming AdmissionForm takes similar props to AdmitCardForm's onSubmit
interface AdmissionFormData {
  title: string;
  organization: string;
  applicationDeadline: string;
  category: string;
  description: string;
  applicationLink: string;
  status: string;
  content: string; // Added content field to match AdmissionForm's expectation
}

export default function AdmissionList() {
  const [admissions, setAdmissions] = useState<Admission[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingAdmission, setEditingAdmission] = useState<Admission | null>(null);
  const [refreshKey, setRefreshKey] = useState(0); // To trigger re-fetch

  useEffect(() => {
    fetchAdmissions();
  }, [refreshKey]);

  const fetchAdmissions = async () => {
    setLoading(true);
    try {
      const response = await fetch('/api/admissions'); // Ensure this API endpoint exists
      if (response.ok) {
        const data = await response.json();
        setAdmissions(data.data || []); // Adjust based on actual API response structure
      } else {
        console.error('Failed to fetch admissions');
        setAdmissions([]); // Clear admissions on error
      }
    } catch (error) {
      console.error('Error fetching admissions:', error);
      setAdmissions([]); // Clear admissions on error
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (admission: Admission) => {
    setEditingAdmission(admission);
  };

  const handleUpdate = async (data: AdmissionFormData) => {
    if (!editingAdmission) return;

    try {
      const response = await fetch(`/api/admissions/${editingAdmission._id}`, { // Ensure this API endpoint exists
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        // const updatedAdmission = await response.json(); // Optional: use response data
        setRefreshKey(prev => prev + 1); // Re-fetch to get the latest list
        setEditingAdmission(null);
        alert('Admission updated successfully');
      } else {
        const errorData = await response.json();
        alert(`Failed to update admission: ${errorData.message || 'Server error'}`);
      }
    } catch (error) {
      console.error('Error updating admission:', error);
      alert('Error updating admission');
    }
  };

  const handleDelete = async (admissionId: string) => {
    if (!confirm('Are you sure you want to delete this admission?')) return;

    try {
      const response = await fetch(`/api/admissions/${admissionId}`, { // Ensure this API endpoint exists
        method: 'DELETE',
      });

      if (response.ok) {
        setRefreshKey(prev => prev + 1); // Re-fetch to get the latest list
        alert('Admission deleted successfully');
      } else {
        const errorData = await response.json();
        alert(`Failed to delete admission: ${errorData.message || 'Server error'}`);
      }
    } catch (error) {
      console.error('Error deleting admission:', error);
      alert('Error deleting admission');
    }
  };

  if (loading) {
    return <div className="text-center p-4">Loading admissions...</div>;
  }

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-semibold">Posted Admissions</h2>
        <Button onClick={() => setRefreshKey(prev => prev + 1)}>Refresh List</Button>
      </div>
      <div className="space-y-4">
        {admissions.length === 0 ? (
          <p className="text-gray-500 dark:text-gray-400 text-center">No admissions posted yet.</p>
        ) : (
          admissions.map((admission) => (
            <div
              key={admission._id}
              className="border rounded-lg p-4 hover:shadow-md transition-shadow"
            >
              <h3 className="text-lg font-semibold">{admission.title}</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                {admission.organization} - {admission.category}
              </p>
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                Application Deadline: {new Date(admission.applicationDeadline).toLocaleDateString()}
              </p>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Status: <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${admission.status === 'published' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}`}>{admission.status}</span>
              </p>
              {admission.description && (
                <p className="text-sm text-gray-700 dark:text-gray-300 mt-2 whitespace-pre-wrap">
                  Description: {admission.description}
                </p>
              )}
              <div className="mt-3 flex gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleEdit(admission)}
                >
                  Edit
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  className="text-red-600 hover:text-red-700 border-red-600 hover:border-red-700"
                  onClick={() => handleDelete(admission._id)}
                >
                  Delete
                </Button>
              </div>
            </div>
          ))
        )}
      </div>

      {editingAdmission && (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            {/* Ensure AdmissionForm can handle initialData and onSubmit for admissions */}
            <AdmissionForm
              initialData={{
                // Map editingAdmission fields to AdmissionFormData
                // This requires AdmissionForm to accept these fields
                title: editingAdmission.title,
                organization: editingAdmission.organization,
                applicationDeadline: editingAdmission.applicationDeadline.split('T')[0], // Format date for input
                category: editingAdmission.category,
                description: editingAdmission.description,
                applicationLink: editingAdmission.applicationLink,
                status: editingAdmission.status,
                content: editingAdmission.content, // Pass content field
              }}
              onSubmit={handleUpdate}
              onCancel={() => setEditingAdmission(null)}
            />
          </div>
        </div>
      )}
    </div>
  );
}