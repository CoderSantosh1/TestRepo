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

interface News {
  _id: string;
  title: string;
  organization: string;
  content: string;
  postedDate: string;
}

interface AnswerKey {
  _id: string;
  title: string;
  organization: string;
  content: string;
  postedDate: string;
}

interface Admission {
  _id: string;
  title: string;
  organization: string;
  content: string;
  postedDate: string;
}

export default function Home() {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [results, setResults] = useState<Result[]>([]);
  const [admitCards, setAdmitCards] = useState<AdmitCard[]>([]);
  const [news, setNews] = useState<News[]>([]);
  const [answerKeys, setAnswerKeys] = useState<AnswerKey[]>([]);
  const [admissions, setAdmissions] = useState<Admission[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [jobsRes, resultsRes, admitCardsRes, newsRes, answerKeysRes, admissionsRes] = await Promise.all([
          fetch('/api/jobs'),
          fetch('/api/results'),
          fetch('/api/admit-cards'),
          fetch('/api/news'),
          fetch('/api/answer-keys'),
          fetch('/api/admissions'),
        ]);

        const [jobsData, resultsData, admitCardsData, newsData, answerKeysData, admissionsData] = await Promise.all([
          jobsRes.json(),
          resultsRes.json(),
          admitCardsRes.json(),
          newsRes.json(),
          answerKeysRes.json(),
          admissionsRes.json()
        ]);

        // Declare newsData before using it
        // Remove the duplicate declaration of newsData
        // let newsData: any;
        
        // Use the existing newsData from the Promise.all result
        setNews(newsData.data.sort((a: News, b: News) => new Date(b.postedDate).getTime() - new Date(a.postedDate).getTime()) || []);
        setAnswerKeys(answerKeysData.data.sort((a: AnswerKey, b: AnswerKey) => new Date(b.postedDate).getTime() - new Date(a.postedDate).getTime()) || []);
        setAdmissions(admissionsData.data.sort((a: Admission, b: Admission) => new Date(b.postedDate).getTime() - new Date(a.postedDate).getTime()) || []);

        setJobs(jobsData.data.sort((a: Job, b: Job) => new Date(b.postedDate).getTime() - new Date(a.postedDate).getTime()) || []);
        setResults(resultsData.data.sort((a: Result, b: Result) => new Date(b.resultDate).getTime() - new Date(a.resultDate).getTime()) || []);
        setAdmitCards(admitCardsData.data.sort((a: AdmitCard, b: AdmitCard) => new Date(b.applicationDeadline).getTime() - new Date(a.applicationDeadline).getTime()) || []);
        setNews(newsData.data.sort((a: News, b: News) => new Date(b.postedDate).getTime() - new Date(a.postedDate).getTime()) || []);
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
            {news.slice(0, 2).map((item) => (
              <a 
                key={item._id}
                href={`/news/${item._id}`}
                className="bg-[#9333ea] hover:bg-[#9333ea] ite text-white rounded-lg text-center transition-colors flex items-center justify-center"
              >
               
              </a>
            ))}            
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full table-auto border-collapse border border-orange-500">
              <thead>
                <tr className="bg-red-600 text-[#FCFCD8] font-bold text-sm md:text-base">
                  <th className="p-2 md:p-3 text-center">Result</th>
                  <th className="p-2 md:p-3 text-center">Latest Jobs</th>
                  <th className="p-2 md:p-3 text-center">Latest News</th>
                </tr>
              </thead>
              <tbody>
                {Array.from({ length: Math.max(results.length, admitCards.length, jobs.length) })
                  .map((_, index) => (
                    <tr key={index} className="border-t-2 border-red-500 hover:bg-[#FFF8CC]">
                      <td className="p-2 md:p-3 border-x text-sm md:text-base">
                        {results[index] ? (
                          <a href={`/results/${results[index]._id}`} className="text-[#014F59] hover:underline hover:text-blue-800">
                            {results[index].title}
                          </a>
                        ) : "-"}
                      </td>
                     
                      <td className="p-2 md:p-3 border-x text-sm md:text-base">
                        {jobs[index] ? (
                          <a href={`/jobs/${jobs[index]._id}`} className="text-[#014F59] hover:underline hover:text-blue-800">
                            {jobs[index].title}
                          </a>
                        ) : "-"}
                      </td>
                      <td className="p-2 md:p-3 text-sm md:text-base">
                        {news[index] ? (
                          <a href={`/news/${news[index]._id}`} className="text-[#014F59] hover:underline hover:text-blue-800">
                            {news[index].title}
                          </a>
                        ) : "-"}
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full table-auto border-collapse border border-orange-500">
              <thead>
                <tr className="bg-red-600 text-[#FCFCD8] font-bold text-sm md:text-base">
                <th className="p-2 md:p-3 text-center">Admit Card</th>
                  <th className="p-2 md:p-3 text-center">Answer key</th>
                  <th className="p-2 md:p-3 text-center">Admission</th>
                 
                </tr>
              </thead>
              <tbody>
                {Array.from({ length: Math.max(admitCards.length) })
                  .map((_, index) => (
                    <tr key={index} className="border-t-2 border-red-500 hover:bg-[#FFF8CC]">
                    
                      <td className="p-2 md:p-3 border-x text-sm md:text-base">
                        {admitCards[index] ? (
                          <a href={`/admit-cards/${admitCards[index]._id}`} className="text-[#014F59] hover:underline hover:text-blue-800">
                            {admitCards[index].title}
                          </a>
                        ) : "-"}
                      </td>
                      <td className="p-2 md:p-3 border-x text-sm md:text-base">
                        {answerKeys[index] ? (
                          <a href={`/answer-keys/${answerKeys[index]._id}`} className="text-[#014F59] hover:underline hover:text-blue-800">
                            {answerKeys[index].title}
                          </a>
                        ) : "-"}
                      </td>
                      <td className="p-2 md:p-3 border-x text-sm md:text-base">
                        {admissions[index] ? (
                          <a href={`/admissions/${admissions[index]._id}`} className="text-[#014F59] hover:underline hover:text-blue-800">
                            {admissions[index].title}
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

