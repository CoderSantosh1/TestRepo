import { useEffect, useState } from 'react';

interface Admission {
  _id: string;
  title: string;
}

export default function AdmissionListPage() {
  const [admissions, setAdmissions] = useState<Admission[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/admissions')
      .then(res => res.json())
      .then(data => setAdmissions(data.data || []))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <div>Loading...</div>;

  return (
    <div className="max-w-2xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">All Admissions</h1>
      <ul className="space-y-2">
        {admissions.map(item => (
          <li key={item._id}>
            <a href={`/admissions/${item._id}`} className="text-blue-700 hover:underline">{item.title}</a>
          </li>
        ))}
      </ul>
    </div>
  );
} 