"use client";

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useEffect, useState } from 'react';
import { toast } from "sonner";

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

interface Quiz {
  _id: string;
  title: string;
  description: string;
  totalMarks: number;
  timeLimit: number;
  questions: Array<{
    _id: string;
    text: string;
    options: string[];
    correctAnswer: number;
  }>;
  attempts?: Array<{
    _id: string;
    userId: string;
    score: number;
    completedAt: string;
  }>;
  createdAt?: string;
  updatedAt?: string;
}

export default function Home() {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [results, setResults] = useState<Result[]>([]);
  const [admitCards, setAdmitCards] = useState<AdmitCard[]>([]);
  const [news, setNews] = useState<News[]>([]);
  const [answerKeys, setAnswerKeys] = useState<AnswerKey[]>([]);
  const [admissions, setAdmissions] = useState<Admission[]>([]);
  const [quizzes, setQuizzes] = useState<Quiz[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [jobsRes, resultsRes, admitCardsRes, newsRes, answerKeysRes, admissionsRes, quizzesRes] = await Promise.all([
          fetch('/api/jobs'),
          fetch('/api/results'),
          fetch('/api/admit-cards'),
          fetch('/api/news'),
          fetch('/api/answer-keys'),
          fetch('/api/admissions'),
          fetch('/api/quizzes'),
        ]);

        // Check if quizzes response is ok
        if (!quizzesRes.ok) {
          console.error('Failed to fetch quizzes:', quizzesRes.status);
          toast.error('Failed to load quizzes');
          setQuizzes([]);
        }

        const [jobsData, resultsData, admitCardsData, newsData, answerKeysData, admissionsData, quizzesData] = await Promise.all([
          jobsRes.json(),
          resultsRes.json(),
          admitCardsRes.json(),
          newsRes.json(),
          answerKeysRes.json(),
          admissionsRes.json(),
          quizzesRes.json()
        ]);

        console.log('Quizzes Data:', quizzesData);

        setNews(newsData.data.sort((a: News, b: News) => new Date(b.postedDate).getTime() - new Date(a.postedDate).getTime()) || []);
        setAnswerKeys(answerKeysData.data.sort((a: AnswerKey, b: AnswerKey) => new Date(b.postedDate).getTime() - new Date(a.postedDate).getTime()) || []);
        setAdmissions(admissionsData.data.sort((a: Admission, b: Admission) => new Date(b.postedDate).getTime() - new Date(a.postedDate).getTime()) || []);
        
        // Validate and set quizzes data
        if (Array.isArray(quizzesData)) {
          console.log('Setting quizzes:', quizzesData);
          setQuizzes(quizzesData.sort((a: Quiz, b: Quiz) => {
            const dateA = a.createdAt ? new Date(a.createdAt).getTime() : 0;
            const dateB = b.createdAt ? new Date(b.createdAt).getTime() : 0;
            return dateB - dateA;
          }));
        } else {
          console.error('Invalid quizzes data format:', quizzesData);
          setQuizzes([]);
        }

        setJobs(jobsData.data.sort((a: Job, b: Job) => new Date(b.postedDate).getTime() - new Date(a.postedDate).getTime()) || []);
        setResults(resultsData.data.sort((a: Result, b: Result) => new Date(b.resultDate).getTime() - new Date(a.resultDate).getTime()) || []);
        setAdmitCards(admitCardsData.data.sort((a: AdmitCard, b: AdmitCard) => new Date(b.applicationDeadline).getTime() - new Date(a.applicationDeadline).getTime()) || []);
      } catch (error) {
        console.error('Error fetching data:', error);
        toast.error('Failed to load data');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    console.log('Current quizzes state:', quizzes);
  }, [quizzes]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-500"></div>
      </div>
    );
  }

  console.log('Rendering with quizzes:', quizzes);

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
                          <a href={`/admissions/${admissions[index]._id}`} target="_blank" rel="noopener noreferrer" className="text-[#014F59] hover:underline hover:text-blue-800">
                            {admissions[index].title}
                          </a>
                        ) : "-"}
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>

          {/* Quiz Section */}
          <div className="mt-8">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-[#014F59]">Free Mock Tests for All Government Exams</h2>
              <a 
                href="/quizzes" 
                className="text-[#014F59] hover:text-[#014F59]/80 font-medium"
              >
                View All Quizzes →
              </a>
            </div>
            
            {!quizzes || quizzes.length === 0 ? (
              <div className="text-center py-8 bg-white rounded-lg shadow-sm">
                <p className="text-gray-500">No quizzes available at the moment.</p>
                <p className="text-sm text-gray-400 mt-2">Check back later for new quizzes!</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {quizzes.slice(0, 6).map((quiz) => {
                  console.log('Rendering quiz:', quiz);
                  return (
                    <div 
                      key={quiz._id} 
                      className="  duration-200 overflow-hidden h"
                    >
                        <table className="min-w-full table-auto border-collapse border border-orange-500">
                        <tr className="border-t-2 border-red-500 hover:bg-[#FFF8CC]">
                        <td className="text-base font-semibold text-[#014F59] mb-2 line-clamp-1 hover:text-blue-500">
                          <li className="m-4">
                        <a href="/quizzes">
                       
                          {quiz.title}
                         </a>
                         </li>
                        </td> 
                        </tr>
                        {/* <p className="text-gray-600 mb-4 line-clamp-2 min-h-[3rem]">
                          {quiz.description}
                        </p> */}
                        {/* <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                          <div className="flex items-center gap-1">
                            <svg 
                              className="w-4 h-4" 
                              fill="none" 
                              stroke="currentColor" 
                              viewBox="0 0 24 24"
                            >
                              <path 
                                strokeLinecap="round" 
                                strokeLinejoin="round" 
                                strokeWidth={2} 
                                d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" 
                              />
                            </svg>
                            <span>{quiz.timeLimit} minutes</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <svg 
                              className="w-4 h-4" 
                              fill="none" 
                              stroke="currentColor" 
                              viewBox="0 0 24 24"
                            >
                              <path 
                                strokeLinecap="round" 
                                strokeLinejoin="round" 
                                strokeWidth={2} 
                                d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" 
                              />
                            </svg>
                            <span>{quiz.questions.length} questions</span>
                          </div>
                        </div>
                        <div className="flex justify-between items-center">
                          <a
                            href={`/quizzes/${quiz._id}`}
                            className="bg-[#059669] text-white px-4 py-2 rounded hover:bg-[#047857] transition-colors text-sm font-medium"
                          >
                            Start Quiz
                          </a>
                          <a
                            href={`/quizzes/${quiz._id}/preview`}
                            className="text-[#014F59] hover:text-[#014F59]/80 text-sm font-medium"
                          >
                            Preview
                          </a>
                        </div> */}
                      </table>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      </main>
      <Footer />
     
    </>
  );
}

