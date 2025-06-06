'use client';

import React, { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Navbar from "../../../components/Header"
import Footer from '@/components/Footer';
import BackImages from "@/assists/back.png"
import Image from 'next/image';
import GoogleAdsense from '@/components/GoogleAdsense';

interface Job {
  _id: string;
  title: string;
  organization: string; 
  location: string;
  description: string;
  requirements: string[];
  salary?: string; 
  totalVacancy: string; 
  applicationDeadline: string; 
  status: string;
  minimumAge?: string;
  maximumAge?: string;
  gender?: string;
  qualification?: string;
  applyJob: string;
  category?: string;
  applicationBeginDate?: string;
  lastDateApplyOnline?: string;
  formCompleteLastDate?: string;
  correctionDate?: string;
  examDate?: string;
  admitCardDate?: string;
  applicationFeeGeneral?: string;
  applicationFeeSCST?: string;
  paymentMethod?: string;
  createdAt: string; // Added for posted date
}

export default function JobDetail() {
  const params = useParams();
  const router = useRouter();
  const [job, setJob] = useState<Job | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [retryCount, setRetryCount] = useState(0);
  const maxRetries = 3;

  useEffect(() => {
    const fetchJob = async () => {
      try {
        setLoading(true);
        setError('');
        
        // Remove the duplicate declaration of `params` inside the `fetchJob` function
        if (!params || !params.id) {
          setError('Invalid parameters');
          setLoading(false);
          return;
        }

        const response = await fetch(`/api/jobs/${params.id}`);
        if (!response.ok) {
          const errorText = await response.text();
          throw new Error(response.status === 404 ? 'Job not found' : errorText || 'Failed to fetch job details');
        }
        
        const data = await response.json();
        if (!data.data) {
          throw new Error('Job data is missing');
        }
        
        setJob(data.data);
        setRetryCount(0); // Reset retry count on successful fetch
      } catch (err) {
        console.error('Error fetching job:', err);
        const errorMessage = err instanceof Error ? err.message : 'Error fetching job details';
        setError(errorMessage);
        
        // Implement retry logic
        if (retryCount < maxRetries) {
          setRetryCount(prev => prev + 1);
          setTimeout(() => fetchJob(), 1000 * (retryCount + 1)); // Exponential backoff
          return;
        }
      } finally {
        setLoading(false);
      }
    };

    if (params?.id) {
      fetchJob();
    }
  }, [params?.id, retryCount, maxRetries]);

  if (loading) {
    return (
      
      <div className="flex flex-col justify-center items-center min-h-screen">
        <div className="mb-2">Loading...</div>
        {retryCount > 0 && (
          <div className="text-sm text-gray-500">
            Retry attempt {retryCount} of {maxRetries}...
          </div>
        )}
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col justify-center items-center min-h-screen">
        <div className="text-black-500 mb-4">{error}</div>
        {retryCount < maxRetries && (
          <button
            onClick={() => setRetryCount(prev => prev + 1)}
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
          >
            Retry
          </button>
        )}
        <button
          onClick={() => router.back()}
          className="mt-4 text-gray-600 hover:text-gray-900"
        >
          ← Back to Jobs
        </button>
      </div>
    );
  }

  if (!job) {
    return (
      <div className="flex flex-col justify-center items-center min-h-screen">
        <div className="text-gray-700 mb-4">Job not found</div>
        <button
          onClick={() => router.back()}
          className="text-gray-600 hover:text-gray-900"
        >
          ← Back to Jobs
        </button>
      </div>
    );
  }

  return (
    <React.Fragment>
        <Navbar/>
        <div className="container mx-auto px-4 py-8">
          <div className="max-w-7xl mx-auto bg-white shadow-lg overflow-hidden">
            <div className="p-2">
              <h1 className="text-3xl font-bold text-red-800 ">{job.title}</h1>
              
              {/* Ad placement at the top of the content */}
              <div className="my-4">
                <GoogleAdsense
                  adSlot="YOUR_AD_SLOT_ID_HERE"
                  style={{ display: 'block' }}
                  className="w-full"
                />
              </div>

              <div className="col-mb-12">
                
                <p className="text-black-700 whitespace-pre-line">{job.description}</p>
              </div>
              <div className="row">
              {/* <div className="col-md-6 ">
             
                    {/* Job Details Section */}
                    <div className="col-md-6 ">
                      <div className="border border-blue-600 w-full ">
                        <table className="w-full table-fixed">
                          <tbody className="bg-white divide-y divide-blue-500">
                          {job.requirements && (
                            <tr>
                              <td className="px-6 py-2 text-sm text-black-600 break-words whitespace-pre-wrap w-full text-center">
                                <p className="font-bold text-lg text-red-900 ">{job.requirements}</p>
                                {job.organization &&(
                                    <p className="font-bold text-lg text-pink-700 ">{job.organization}</p>
                                )}
                                {job.location && job.category && (
                                  <p className="font-bold text-lg text-blue-700">{job.location} {job.category && `• ${job.category}`}</p>
                                )}
                                {job.totalVacancy && (
                                  <p className="font-bold text-lg text-green-700">Total Vacancy: {job.totalVacancy}</p>
                                )}
                              </td>
                            </tr>
                          )}
                          </tbody>
                        </table>
                      </div>
                    </div>
                    <div className="grid grid-cols-2 md:grid-cols-2  ">
                    {/* Important Dates Section */}
                    <div className="border border-blue-700 overflow-hidden w-full">
                      <div className="bg-white p-2">
                        <h2 className="text-sm font-semibold text-red-900 mb-3">Important Dates</h2>
                        <div className="text-sm text-black-700 space-y-1">
                          {job.applicationBeginDate && (
                            <div>
                              <span className='font-bold text-[8px]'>Application Begin:</span>{' '}
                              <span className="font-semibold  text-[8px]">{new Date(job.applicationBeginDate).toLocaleDateString()}</span>
                            </div>
                          )}
                          {job.lastDateApplyOnline && (
                            <div>
                              <span className='font-bold text-[8px]'>Last Date for Apply Online:</span>{' '}
                              <span className="text-red-600 font-semibold  text-[8px]">{new Date(job.lastDateApplyOnline).toLocaleDateString()}</span>
                            </div>
                          )}
                          {job.formCompleteLastDate && (
                            <div>
                              <span className='font-bold text-[8px]'>Pay Exam Fee Last Date:</span>{' '}
                              <span className="text-blue-500 font-bold text-[10px]">{new Date(job.formCompleteLastDate).toLocaleDateString()}</span>
                            </div>
                          )}
                          {job.correctionDate && (
                            <div>
                              <span className='font-bold text-[10px]'>Correction Date:</span>{' '}
                              <span className="text-blue-500 font-bold text-[10px]">{job.correctionDate}</span>
                            </div>
                          )}
                          {job.examDate && (
                            <div>
                              <span className='font-bold text-[10px]'>Exam Date:</span>{' '}
                              <span className="text-blue-500 font-bold text-[10px]">{job.examDate}</span>
                            </div>
                          )}
                          {job.admitCardDate && (
                             <div>
                               <span className='font-bold text-[10px]'>Admit Card Available:</span>{' '}
                               <span className="text-blue-500 font-bold text-[10px]">{job.admitCardDate}</span>
                            </div>
                           )}
                        </div>
                      </div>
                    </div>

                        {/* Application Fee Section */}
                       
                                {(job.applicationFeeGeneral || job.applicationFeeSCST || job.paymentMethod) && (
                                  <div className="border border-blue-700 overflow-hidden w-full">
                                    <div className="bg-white p-4">
                                      <h2 className="text-sm font-semibold text-red-900 mb-3">Application Fee</h2>
                                      <div className="text-sm text-black-700 space-y-1">
                                        {job.applicationFeeGeneral && (
                                          <div>
                                            <span className='font-bold text-[8px]'>General / OBC / EWS:</span> <span className="text-blue-500 font-bold text-[10px]">{job.applicationFeeGeneral}/-</span>
                                          </div>
                                        )}
                                        {job.applicationFeeSCST && (
                                          <div>
                                            <span className='font-bold text-[10px]'>SC / ST / Female:</span> <span className="text-blue-500 font-bold text-[10px]">{job.applicationFeeSCST}/-</span>
                                          </div>
                                        )}
                                        {job.paymentMethod && (
                                          <div>
                                            <span className='font-bold text-[10px]'>Pay the Exam Fee: </span>
                                            <span className="text-blue-500 font-bold text-[10px]">{job.paymentMethod}</span>
                                          </div>
                                        )}
                                      </div>
                                    </div>
                                  </div>
                                )}
                              </div>


                                {/* Salary Section (optional display below) */}
                                <div className="grid grid-cols-2 md:grid-cols-2  ">
                                <div className="border border-blue-700 overflow-hidden w-full">
                                <div className="bg-white p-4">
                                    {job.minimumAge && (
                                    <div>
                                      <span className='font-bold text-[10px]'>Minimum Age: </span>
                                      <span className='text-blue-700 font-bold text-[10px] '> {job.minimumAge} Years</span> 
                                    </div>                                   
                                    )}
                                    {
                                      job.maximumAge && (
                                        <div>
                                          <span className='font-bold text-[10px]'>Maximum Age: </span>
                                          <span className='text-blue-700 font-bold text-[10px]'> {job.maximumAge} Years</span>
                                        </div>
                                      )
                                    }
                                    
                                    {job.gender && (
                                    <div>
                                      <span className='font-bold text-[10px]'>Gender: </span>
                                      <span className='text-blue-700 font-bold text-[10px]'> {job.gender}</span>
                                    </div>
                                    )}
                                   </div>
                                  </div>
                                <div className="border border-blue-700 overflow-hidden w-full">
                                <div className="bg-white p-4">
                                   
                                {job.qualification && (
                                    <div>
                                      <span className='font-bold text-[10px]'>Qualification:- </span>
                                    <span className='text-blue-700  text-[10px]'> {job.qualification}</span>
                                    </div>
                                    )}
                                    
                                    {job.salary && (
                                    <div>
                                      <span className='font-bold text-[10px]'>Salary:- </span>
                                    <span className='text-blue-700 font-bold text-[10px]'> {job.salary}</span>
                                    </div>
                                    )}

                                    {job.totalVacancy && (
                                    <div>
                                      <span className='font-bold text-[10px]'>Total Seats:- </span>
                                    <span className='text-blue-700 font-bold text-[10px]'> {job.totalVacancy}</span>
                                    </div>
                                    )}
                                   </div>
                                  </div>
                                  </div>
                              {job.applyJob && (
                                  <div className="mt-4 p-4 border border-blue-700  bg-white">
                                    <span className="text-sm font-medium text-gray-800 mr-2">Click Now to Apply:</span>
                                    <a
                                      onClick={() => router.push(job.applyJob)}
                                      className="text-red-500 hover:underline cursor-pointer transition-colors duration-200 hover:text-blue-700 font-semibold"
                                    >
                                      Apply Now
                                    </a>
                                  </div>
                              )}
                    
                                </div>

                                <div className="flex items-center justify-between">
                              <button
                                onClick={() => router.push('/')}
                                className="flex items-center text-gray-600 hover:text-gray-900 transition-colors"
                              >
                              <Image src={BackImages} alt="Back" width={20} height={20} className="mr-2 mt-4" />
                              </button>
                            </div>
                          </div>
                      </div>
                    </div>
                    <Footer/>
                  </React.Fragment>
              );
          }