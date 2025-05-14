"use client";

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useEffect, useState } from 'react';
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Analytics } from "@vercel/analytics/next";

interface Job {
  _id: string;
  title: string;
  organization: string;
  postedDate: string;
}

interface Result {
  _id: string;
  title: string;
  organization: string;
  resultDate: string;
}

interface AdmitCard {
  _id: string;
  title: string;
  organization: string;
  applicationDeadline: string;
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

        setJobs(jobsData.data.sort((a: Job, b: Job) => new Date(b.postedDate).getTime() - new Date(a.postedDate).getTime()) || []);
        setResults(resultsData.data.sort((a: Result, b: Result) => new Date(b.resultDate).getTime() - new Date(a.resultDate).getTime()) || []);
        setAdmitCards(admitCardsData.data.sort((a: AdmitCard, b: AdmitCard) => new Date(b.applicationDeadline).getTime() - new Date(a.applicationDeadline).getTime()) || []);
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
          <div className="grid grid-cols-2 gap-2">
            {results.slice(0, 2).map((item) => (
              <a 
                key={item._id}
                href={`/results/${item._id}`}
                className="bg-[#D62628] hover:bg-[#D62628] ite text-white rounded-lg text-center transition-colors flex items-center justify-center"
              >
                <div>
                  <div className="text-base md:text-lg font-semibold">{item.organization}</div>
                </div>
              </a>
            ))}
            {jobs.slice(0, 2).map((item) => (
              <a 
                key={item._id}
                href={`/jobs/${item._id}`}
                className="bg-[#059669] hover:bg-[#059669] ite text-white rounded-lg text-center transition-colors flex items-center justify-center"
              >
                <div>
                  <div className="text-base md:text-lg font-semibold">{item.organization}</div>
                </div>
              </a>
            ))}
            {admitCards.slice(0, 2).map((item) => (
              <a 
                key={item._id}
                href={`/admit-cards/${item._id}`}
                className="bg-[#2563eb] hover:bg-[#2563eb] ite text-white rounded-lg text-center transition-colors flex items-center justify-center"
              >
                <div>
                  <div className="text-base md:text-lg font-semibold">{item.organization}</div>
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
      <SpeedInsights />
      <Analytics />
    </>
  );
}

