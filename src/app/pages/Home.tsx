"use client";

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useEffect, useState } from 'react';

interface Job {
  _id: string;
  title: string;
  organization: string;
}

interface Result {
  _id: string;
  title: string;
  organization: string;
}

interface AdmitCard {
  _id: string;
  title: string;
  organization: string;
}

export default function Home() {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [results, setResults] = useState<Result[]>([]);
  const [admitCards, setAdmitCards] = useState<AdmitCard[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [jobsRes, resultsRes, admitCardsRes] = await Promise.all([
          fetch('/api/jobs'),
          fetch('/api/results'),
          fetch('/api/admit-cards')
        ]);

        const [jobsData, resultsData, admitCardsData] = await Promise.all([
          jobsRes.json(),
          resultsRes.json(),
          admitCardsRes.json()
        ]);

        setJobs(jobsData.data || []);
        setResults(resultsData.data || []);
        setAdmitCards(admitCardsData.data || []);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-500"></div>
      </div>
    );
  }

  return (
    <>
      <Header />
      <main className="flex flex-col items-center justify-center bg-[#FFFBD9] mt-2 w-10/14 max-w-7xl mx-auto px-4">
        <div className="max-w-7xl mx-auto  sm:px-6 py-2 space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2">
            {[...results.slice(0, 4), ...jobs.slice(0, 4), ...admitCards.slice(0, 4)].map((item) => (
              <a 
                key={item._id}
                href={`/${item.hasOwnProperty('resultDate') ? 'results' : item.hasOwnProperty('examDate') ? 'admit-cards' : 'jobs'}/${item._id}`}
                className={`${item.hasOwnProperty('resultDate') ? 'bg-[#014F59] hover:bg-[#014F59]' : item.hasOwnProperty('examDate') ? 'bg-pink-500 hover:bg-pink-500' : 'bg-[#D62628] hover:bg-[#D62628]'}
                ite text-white rounded-lg w-[280px] h-[70px] text-center transition-colors flex items-center justify-center min-h-[75px]`}
              >
                <div>
                  <div className="text-base md:text-lg font-semibold">{item.title}</div>
                </div>
              </a>
            ))}
            
          </div>

          <div className="overflow-x-auto">
            <table className="min-w-full table-auto border-collapse border border-orange-500">
              <thead>
                <tr className="bg-red-600 text-[#FCFCD8] font-bold text-sm md:text-base">
                  <th className="p-2 md:p-3 text-center">Result</th>
                  <th className="p-2 md:p-3 text-center">Admit Card</th>
                  <th className="p-2 md:p-3 text-center">Latest Jobs</th>
                </tr>
              </thead>
              <tbody>
                {Array.from({ length: Math.max(results.length, admitCards.length, jobs.length) })
                  .map((_, index) => (
                    <tr key={index} className="border-t-2 border-red-500 hover:bg-[#FFF8CC]">
                      <td className="p-2 md:p-3 shadow-sm text-sm md:text-base">
                        {results[index] ? (
                          <a href={`/results/${results[index]._id}`} className="text-[#014F59] hover:underline hover:text-blue-800">
                            {results[index].title}
                          </a>
                        ) : "-"}
                      </td>
                      <td className="p-2 md:p-3 border-x text-sm md:text-base">
                        {admitCards[index] ? (
                          <a href={`/admit-cards/${admitCards[index]._id}`} className="text-[#014F59] hover:underline hover:text-blue-800">
                            {admitCards[index].title}
                          </a>
                        ) : "-"}
                      </td>
                      <td className="p-2 md:p-3 text-sm md:text-base">
                        {jobs[index] ? (
                          <a href={`/jobs/${jobs[index]._id}`} className="text-[#014F59] hover:underline hover:text-blue-800">
                            {jobs[index].title}
                          </a>
                        ) : "-"}
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}

