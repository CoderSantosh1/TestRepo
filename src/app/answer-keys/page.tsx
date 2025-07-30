"use client";
import Head from "next/head";
import { useEffect, useState } from 'react';
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import Link from "next/link";

interface AnswerKey {
  _id: string;
  title: string;
}

export default function AnswerKeyListPage() {
  const [answerKeys, setAnswerKeys] = useState<AnswerKey[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/answer-keys')
      .then(res => res.json())
      .then(data => setAnswerKeys(data.data || []))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <div>Loading...</div>;

  return (
    <>
      <Head>
        <title>Sarkariresultsnow - Answer Keys</title>
        <meta name="description" content="All Answer Keys - Sarkariresultsnow" />
      </Head>
      <Header />
      <div className="max-w-7xl mx-auto px-2 sm:px-4 py-8 w-full">
        <h1 className="text-3xl font-bold mb-8 text-gray-900">Answer Keys</h1>
        <div className="w-full overflow-x-auto hide-scrollbar">
          <table className="w-full table-fixed border-collapse border border-orange-500 text-xs sm:text-sm md:text-base">
            <thead>
              <tr className="bg-red-600 text-[#FCFCD8] font-bold">
                <th className="p-2 text-center break-words whitespace-normal">Answer Key Available</th>
              </tr>
            </thead>
            <tbody>
              {answerKeys.map((item) => (
                <tr key={item._id} className="border-t-2 border-red-500 bg-[#FFF8CC] ">
                  <td className="p-2 border-x text-left align-top break-words whitespace-pre-wrap flex justify-center">
                    <a href={`/answer-keys/${item._id}`} className="text-[#014F59] hover:underline hover:text-blue-800">
                      {item.title}
                    </a>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {answerKeys.length === 0 && (
            <div className="text-center text-gray-600 dark:text-gray-400 mt-8">
              No answer keys available at the moment.
            </div>
          )}
        </div>
        <Link href="/">BACK TO HOME </Link>
      </div>
      <Footer />
    </>
  );
} 