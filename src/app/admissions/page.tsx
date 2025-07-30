"use client";
import Head from "next/head";
import { useEffect, useState } from 'react';
import Header from "../../components/Header";
import Footer from "../../components/Footer";

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
    <>
      <Head>
        <title>Sarkariresultsnow - Admissions</title>
        <meta name="description" content="All Admissions - Sarkariresultsnow" />
      </Head>
      <Header />
      <div className="max-w-7xl mx-auto px-2 sm:px-4 py-8 w-full">
        <h1 className="text-3xl font-bold mb-8 text-gray-900">Admissions</h1>
        <div className="w-full overflow-x-auto hide-scrollbar">
          <table className="w-full table-fixed border-collapse border border-orange-500 text-xs sm:text-sm md:text-base">
            <thead>
              <tr className="bg-red-600 text-[#FCFCD8] font-bold">
                <th className="p-2 text-center break-words whitespace-normal">Admission Available</th>
              </tr>
            </thead>
            <tbody>
              {admissions.map((item) => (
                <tr key={item._id} className="border-t-2 border-red-500 bg-[#FFF8CC] ">
                  <td className="p-2 border-x text-left align-top break-words whitespace-pre-wrap flex justify-center">
                    <a href={`/admissions/${item._id}`} className="text-[#014F59] hover:underline hover:text-blue-800">
                      {item.title}
                    </a>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {admissions.length === 0 && (
            <div className="text-center text-gray-600 dark:text-gray-400 mt-8">
              No admissions available at the moment.
            </div>
          )}
        </div>
      </div>
      <Footer />
    </>
  );
} 