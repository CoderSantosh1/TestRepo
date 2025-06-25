"use client";

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useEffect, useState } from 'react';
import { toast } from "sonner";
import AnnouncementBar from "@/components/ui/AnnouncementBar";
import Quiz from "@/lib/models/Quiz";

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
        const responses = await Promise.all([
          fetch('/api/jobs'),
          fetch('/api/results'),
          fetch('/api/admit-cards'),
          fetch('/api/news'),
          fetch('/api/answer-keys'),
          fetch('/api/admissions'),
          fetch('/api/quizzes'),
        ]);

        const dataPromises = responses.map(res => res.ok ? res.json() : Promise.resolve({ data: [] }));
        const allData = await Promise.all(dataPromises);

        const [jobsData, resultsData, admitCardsData, newsData, answerKeysData, admissionsData, quizzesData] = allData;

        setJobs(jobsData.data?.sort((a: Job, b: Job) => new Date(b.postedDate).getTime() - new Date(a.postedDate).getTime()) || []);
        setResults(resultsData.data?.sort((a: Result, b: Result) => new Date(b.resultDate).getTime() - new Date(a.resultDate).getTime()) || []);
        setAdmitCards(admitCardsData.data?.sort((a: AdmitCard, b: AdmitCard) => new Date(b.applicationDeadline).getTime() - new Date(a.applicationDeadline).getTime()) || []);
        setNews(newsData.data?.sort((a: News, b: News) => new Date(b.postedDate).getTime() - new Date(a.postedDate).getTime()) || []);
        setAnswerKeys(answerKeysData.data?.sort((a: AnswerKey, b: AnswerKey) => new Date(b.postedDate).getTime() - new Date(a.postedDate).getTime()) || []);
        setAdmissions(admissionsData.data?.sort((a: Admission, b: Admission) => new Date(b.postedDate).getTime() - new Date(a.postedDate).getTime()) || []);
        setQuizzes(quizzesData.data?.sort((a: Quiz, b: Quiz) => {
            const dateA = a.createdAt ? new Date(a.createdAt).getTime() : 0;
            const dateB = b.createdAt ? new Date(b.createdAt).getTime() : 0;
            return dateB - dateA;
          }) || []);

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
      <div className="flex items-center justify-center min-h-screen ">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-500 bg-[#1a124d]"></div>
      </div>
    );
  }

  console.log('Rendering with quizzes:', quizzes);

  return (
    <>
      <Header />
      
      <div className="bg-[#1a124d]">
      <main className="flex flex-col items-center justify-center bg-[#FFFBD9] w-full max-w-7xl mx-auto px-2 sm:px-4">
        <div className="max-w-7xl mx-auto sm:px-6 py-2 space-y-6">
         
          <div className="w-full overflow-x-auto">
            <table className="min-w-full table-auto border-collapse border border-orange-500 text-xs sm:text-sm md:text-base">
              <thead>
                <tr className="bg-red-600 text-[#FCFCD8] font-bold">
                  <th className="p-1 sm:p-2 md:p-3 text-center">Result</th>
                  <th className="p-1 sm:p-2 md:p-3 text-center">Latest Jobs</th>
                  <th className="p-1 sm:p-2 md:p-3 text-center">Latest News</th>
                </tr>
              </thead>
              <tbody>
                {Array.from({ length: Math.max(results.length, admitCards.length, jobs.length) })
                  .map((_, index) => (
                    <tr key={index} className="border-t-2 border-red-500 hover:bg-[#FFF8CC]">
                      <td className="p-1 sm:p-2 md:p-3 border-x text-xs sm:text-sm md:text-base">
                        {results[index] ? (
                          <a href={`/results/${results[index]._id}`} className="text-[#014F59] hover:underline hover:text-blue-800">
                            {results[index].title}
                          </a>
                        ) : "-"}
                      </td>
                     
                      <td className="p-1 sm:p-2 md:p-3 border-x text-xs sm:text-sm md:text-base">
                        {jobs[index] ? (
                          <a href={`/jobs/${jobs[index]._id}`} className="text-[#014F59] hover:underline hover:text-blue-800">
                            {jobs[index].title}
                          </a>
                        ) : "-"}
                      </td>
                      <td className="p-1 sm:p-2 md:p-3 text-xs sm:text-sm md:text-base">
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
        <div className="w-full overflow-x-auto mt-4">
            <table className="min-w-full table-auto border-collapse border border-orange-500 text-xs sm:text-sm md:text-base">
              <thead>
                <tr className="bg-red-600 text-[#FCFCD8] font-bold">
                  <th className="p-1 sm:p-2 md:p-3 text-center">Admit Card</th>
                  <th className="p-1 sm:p-2 md:p-3 text-center">Answer key</th>
                  <th className="p-1 sm:p-2 md:p-3 text-center">Admission</th>
                </tr>
              </thead>
              <tbody>
                {Array.from({ length: Math.max(admitCards.length) })
                  .map((_, index) => (
                    <tr key={index} className="border-t-2 border-red-500 hover:bg-[#FFF8CC]">
                      <td className="p-1 sm:p-2 md:p-3 border-x text-xs sm:text-sm md:text-base">
                        {admitCards[index] ? (
                          <a href={`/admit-cards/${admitCards[index]._id}`} className="text-[#014F59] hover:underline hover:text-blue-800">
                            {admitCards[index].title}
                          </a>
                        ) : "-"}
                      </td>
                      <td className="p-1 sm:p-2 md:p-3 border-x text-xs sm:text-sm md:text-base">
                        {answerKeys[index] ? (
                          <a href={`/answer-keys/${answerKeys[index]._id}`} className="text-[#014F59] hover:underline hover:text-blue-800">
                            {answerKeys[index].title}
                          </a>
                        ) : "-"}
                      </td>
                      <td className="p-1 sm:p-2 md:p-3 border-x text-xs sm:text-sm md:text-base">
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

          
         
         
        </div>
      </main>
      </div>
       {/* Announcement Bars */}
       <div className="bg-[#1a124d]">
      <div className="flex flex-col items-center  justify-center bg-[#FFFBD9]  w-10/14 max-w-7xl mx-auto px-4 ">
        <AnnouncementBar title="Sarkari Results 10+2 Latest Job">
          Most Recent Sarkari Work, Sarkari Test Result, Most Recent On The Web And Disconnected Structure, Concede Card, Prospectus, Affirmation, Ansawer Key, Grant, Notice Etc.If You Need To Get Refreshes Connected With Sarkari Occupations On Sarkari Result.Com.Cm Like Concede Warning Like Govt. Test, Sarkari Result, Most Recent Bord Result, Bihar Result Tenth And So On You Could Sarkari Result 10+2 Most Recent Occupation At Any Point Website Page Consistently.
        </AnnouncementBar>
        <AnnouncementBar title="Sarkari Results">
          <b>Sarkari Results:</b> Sarkari Results Is A Famous Site In India That Gives Data About Sarkari Work Tests, Sarkari Result 2025, And Other Related Refreshes. It Is One Of The Notable Entries That Many Work Searchers Use To Secure Data About Government Position Opening, Concede Cards, Test Dates, And Results.
        </AnnouncementBar>
        <AnnouncementBar title="Sarkari Result Bihar">
          Each Data Connected With Sarkari Test Result In Bihar Can Be Seen As Here Like: OFSS Bihar, Bihar Board Tenth Outcome, Sarkari Result Bihar Board 2025, Bihar Board Matric 2025, Bihar Police 2025, Bihar Board Tenth, Bihar Ssc, Bihar Je, Bihar Common Court, Sarkari Result Bihar Board Result, Bihar Work, Bihar Result, Bihar 10+2 Most Recent Work, Bihar Sarkari Result , Bihar Sarkari Test, Bihar Govt Work, Concede Card, Bihar Sarkari Result, Eleventh Affirmation And So Forth.
        </AnnouncementBar>
        <AnnouncementBar title="Sarkari Result Hindi">
          Uttar Pradesh (Sarkariresult.Com.Cm UP Board) Is A State Where Lakhs Of Young People Give Sarkari Test Consistently To Land Government Positions, So Here UP Board Plays A Significant Part, So Here You Will Get Sarkari Result Up Board 2024, Up Barricade Result , Board 2025,Up Board Test Result, Sarkari Result Up Board Class Tenth, Up Board Result Date, Sarkari Result Up Board 2024 In Hindi And So On. Will Continue To Get Refreshes.
        </AnnouncementBar>
        <AnnouncementBar title="Sarkariresult">
          Sarkariresult: Data Presents To You All The Most Recent News Like Outcome, Online Structure, Naukri, Test Result 2025, Work Result, Information Hindi Test, Government Work Data, And Updates, Notice And Output Gives.
        </AnnouncementBar>
      </div>
      </div>
      <Footer />
     
    </>
  );
}

