"use client"
import Header from "@/components/Header";
import Footer from "@/components/Footer";

import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { useEffect, useState } from "react"
import {
  CheckCircle2,
  Flag,
  Clock,
  Brain,
  Zap,
  ArrowRight,
  Hexagon,
  Target,
  AlertTriangle,
  Save,
  RotateCcw,
  Navigation,
  ArrowLeft,
  FileText,
} from "lucide-react"
import { instructions } from "./lang"
import AuthModal from '@/components/AuthModal'

const statusLegend = {
  en: [
    { color: "bg-gray-400", label: "You have not visited the question yet." },
    { color: "bg-red-500", label: "You have not answered the question." },
    { color: "bg-green-500", label: "You have answered the question." },
    { color: "bg-purple-400", label: "You have NOT answered the question, but have marked the question for review." },
    { color: "bg-purple-700", label: "You have answered the question, but marked it for review." },
  ],
  hi: [
    { color: "bg-gray-400", label: "आपने अभी तक प्रश्न नहीं देखा है।" },
    { color: "bg-red-500", label: "आपने प्रश्न का उत्तर नहीं दिया है।" },
    { color: "bg-green-500", label: "आपने प्रश्न का उत्तर दिया है।" },
    { color: "bg-purple-400", label: "आपने प्रश्न का उत्तर नहीं दिया है, लेकिन समीक्षा के लिए चिह्नित किया है।" },
    { color: "bg-purple-700", label: "आपने प्रश्न का उत्तर दिया है, लेकिन समीक्षा के लिए चिह्नित किया है।" },
  ]
};

export default function QuizInstructions({ params }: { params: { id: string } }) {
  const router = useRouter()
  const [lang, setLang] = useState<'en' | 'hi' | null>(null)
  const [isMobile, setIsMobile] = useState<boolean | null>(null)
  const [showRegister, setShowRegister] = useState(false);
  const [user, setUser] = useState<{ name: string; mobile: string } | null>(null);

  useEffect(() => {
    // Set language from localStorage or default to 'en'
    const stored = typeof window !== "undefined" ? localStorage.getItem("lang") : null;
    if (stored === "hi" || stored === "en") setLang(stored);
    else setLang("en");

    // Detect mobile
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, [])

  // Registration check
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const userData = localStorage.getItem('user');
      if (!userData) {
        setShowRegister(true);
      } else {
        try {
          setUser(JSON.parse(userData));
        } catch {
          setShowRegister(true);
        }
      }
    }
  }, []);

  const handleRegister = (user: { name: string; mobile: string }) => {
    localStorage.setItem('user', JSON.stringify(user));
    setUser(user);
    setShowRegister(false);
  };

  // Only generate particles on client
  const [particles, setParticles] = useState<{left: number, top: number, duration: number, delay: number}[]>([]);
  useEffect(() => {
    if (typeof window !== "undefined") {
      setParticles(Array.from({ length: isMobile ? 8 : 20 }).map(() => ({
        left: Math.random() * 100,
        top: Math.random() * 100,
        duration: 4 + Math.random() * 3,
        delay: Math.random() * 2,
      })));
    }
  }, [isMobile]);

  if (lang === null || isMobile === null) return null;
  const t = instructions[lang]

  const handleStart = () => {
    if (typeof window !== 'undefined') {
      localStorage.setItem(`quiz-instructions-acknowledged-${params.id}`, 'true');
    }
    router.push(`/quizzes/${params.id}`);
  }

  const handlePrevious = () => {
    router.back()
  }

  const toggleLang = () => {
    setLang((prev) => (prev === 'en' ? 'hi' : 'en'))
  }

  if (showRegister) {
    return <AuthModal onSuccess={handleRegister} />;
  }

  return (
    <>
    <Header />
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-black p-2">
      {/* Floating particles background - Reduced for mobile */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        {particles.map((p, i) => (
          <div
            key={i}
            className="absolute bg-cyan-400 rounded-full opacity-30"
            style={{
              left: `${p.left}%`,
              top: `${p.top}%`,
              animation: `float ${p.duration}s ease-in-out infinite ${p.delay}s`,
              boxShadow: "0 0 4px currentColor",
            }}
          />
        ))}
      </div>

      <div className="container mx-auto max-w-8xl">
        <div
          className="relative overflow-hidden border-0 bg-black/80 backdrop-blur-sm shadow-2xl mb-6 sm:mb-8"
          style={{
            clipPath: "polygon(0% 0%, 95% 0%, 100% 5%, 100% 100%, 5% 100%, 0% 95%)",
            background:
              "linear-gradient(135deg, rgba(0,0,0,0.9) 0%, rgba(26,10,46,0.9) 25%, rgba(22,33,62,0.9) 50%, rgba(15,52,96,0.9) 75%, rgba(0,0,0,0.9) 100%)",
          }}
        >
          {/* Language Toggle Button */}
          <div className="absolute top-4 right-4 z-20">
            <button
              onClick={toggleLang}
              className="text-blue-600 font-semibold border border-blue-200 rounded px-3 py-1 bg-white/80 hover:bg-blue-50 transition-colors"
            >
              {t.lang}
            </button>
          </div>

          {/* Animated border */}
          <div className="absolute top-0 left-0 w-full h-0.5 bg-gradient-to-r from-cyan-400 via-magenta-400 to-lime-400 opacity-50 animate-pulse" />
          <div className="absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-lime-400 via-cyan-400 to-magenta-400 opacity-50 animate-pulse" />

          <CardHeader className="border-b border-cyan-400/30 bg-gradient-to-r from-black/50 to-purple-900/30 backdrop-blur-sm p-3 sm:p-4 md:p-6">
            <CardTitle className="text-lg sm:text-xl md:text-2xl font-black text-center flex items-center justify-center gap-2 sm:gap-3">
              <AlertTriangle className="w-6 h-6 sm:w-8 sm:h-8 text-yellow-400 animate-pulse" />
             <h1 className="text-xl sm:text-3xl md:text-3xl font-black bg-gradient-to-r from-cyan-400 via-magenta-400 to-lime-400 bg-clip-text text-transparent">
                {t.title}
              </h1>
              
            </CardTitle>
            <p className="text-cyan-300 font-semibold text-sm sm:text-base flex items-center justify-center">{t.subtitle}</p>
          </CardHeader>

          <CardContent className="p-2 sm:p-4 md:p-6">
            <div className="space-y-4 sm:space-y-6 md:space-y-8">
              {/* Instruction 1 - Timer Protocol - Mobile Optimized */} 

              {/* Instruction 2 - Question Palette - Mobile Optimized */}
              <Card className="border-0 bg-gradient-to-br from-cyan-500/20 to-blue-500/20 backdrop-blur-sm shadow-xl">
                <CardContent className="p-4 sm:p-6">
                  <div className="flex flex-col sm:flex-row items-start gap-3 sm:gap-4">
                    
                    <div className="flex-1">
                      <h3 className="text-base sm:text-lg md:text-xl font-black text-cyan-400 mb-2 sm:mb-3">
                      {t.statusGuide}
                      </h3>
                      <p className="text-gray-200 leading-relaxed mb-4 sm:mb-6 text-sm sm:text-base">
                        {t.instructions}
                      </p>

                      {/* Status Grid - Mobile Optimized */}
                      <div className="grid grid-cols-1 gap-2 sm:gap-3 md:gap-4">
                        {statusLegend[lang].map((status: { color: string; label: string }) => (
                          <div
                            key={status.label}
                            className={`p-3 sm:p-4 bg-gradient-to-br ${status.color}/20 backdrop-blur-sm border border-current/30 rounded-lg transition-all duration-300 hover:scale-105`}
                          >
                            <div className="flex items-center gap-2 sm:gap-3 mb-1 sm:mb-2">
                              <div className={`w-4 h-4 sm:w-5 sm:h-5 rounded-full ${status.color}`} />
                              <span className="font-bold text-white text-xs sm:text-sm">{status.label}</span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Mark for Review Info - Mobile Optimized */}
              {/* <Card className="border-0 bg-gradient-to-br from-purple-500/20 to-pink-500/20 backdrop-blur-sm shadow-xl">
                <CardContent className="p-4 sm:p-6">
                  <div className="flex flex-col sm:flex-row items-start gap-3 sm:gap-4">
                    <div className="flex-1">
                      <h3 className="text-base sm:text-lg md:text-xl font-black text-purple-400 mb-2 sm:mb-3">
                        {t.MarkForReviewStatus}
                      </h3>
                      <p className="text-gray-200 leading-relaxed text-sm sm:text-base">
                        The <span className="text-purple-300 font-bold">Mark For Review</span> status for a question
                        simply indicates that you would like to look at that question again. If a question is answered,
                        but marked for review, then the answer will be considered for evaluation unless the status is
                        modified by the candidate.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card> */}

              {/* Navigation Instructions - Mobile Optimized */}
              {/* <Card className="border-0 bg-gradient-to-br from-lime-500/20 to-emerald-500/20 backdrop-blur-sm shadow-xl">
                <CardContent className="p-4 sm:p-6">
                  <div className="flex flex-col sm:flex-row items-start gap-3 sm:gap-4">
                    
                    <div className="flex-1">
                      <h3 className="text-base sm:text-lg md:text-xl font-black text-lime-400 mb-2 sm:mb-3">
                        Navigating to a Question
                      </h3>
                      <div className="space-y-3 sm:space-y-4">
                        <div className="flex items-start gap-2 sm:gap-3">
                          <div className="w-6 h-6 sm:w-8 sm:h-8 bg-gradient-to-br from-cyan-400 to-blue-500 rounded flex items-center justify-center flex-shrink-0 mt-1">
                            <span className="text-[10px] sm:text-xs font-black text-white">1</span>
                          </div>
                          <p className="text-gray-200 text-xs sm:text-base">
                            Click on the question number in the Question Palette at the right of your screen to go to
                            that numbered question directly. Note that using this option does NOT save your answer to
                            the current question.
                          </p>
                        </div>
                        <div className="flex items-start gap-2 sm:gap-3">
                          <div className="w-6 h-6 sm:w-8 sm:h-8 bg-gradient-to-br from-lime-400 to-emerald-500 rounded flex items-center justify-center flex-shrink-0 mt-1">
                            <Save className="w-3 h-3 sm:w-4 sm:h-4 text-white" />
                          </div>
                          <p className="text-gray-200 text-xs sm:text-base">
                            Click on <span className="text-lime-400 font-bold">Save & Next</span> to save your answer
                            for the current question and then go to the next question.
                          </p>
                        </div>
                        <div className="flex items-start gap-2 sm:gap-3">
                          <div className="w-6 h-6 sm:w-8 sm:h-8 bg-gradient-to-br from-magenta-400 to-purple-500 rounded flex items-center justify-center flex-shrink-0 mt-1">
                            <Flag className="w-3 h-3 sm:w-4 sm:h-4 text-white" />
                          </div>
                          <p className="text-gray-200 text-xs sm:text-base">
                            Click on <span className="text-magenta-400 font-bold">Mark for Review & Next</span> to save
                            your answer for the current question and also mark it for review, and then go to the next
                            question.
                          </p>
                        </div>
                      </div>
                      <div className="mt-3 sm:mt-4 p-3 sm:p-4 bg-yellow-500/20 border border-yellow-400/30 rounded-lg">
                        <p className="text-yellow-200 text-xs sm:text-sm">
                          <span className="font-bold">Important:</span> Your answer for the current question will not be
                          saved, if you navigate to another question directly by clicking on a question number without
                          saving the answer to the previous question.
                        </p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card> */}

              {/* Question Paper View - Mobile Optimized */}
              <Card className="border-0 bg-gradient-to-br from-indigo-500/20 to-purple-500/20 backdrop-blur-sm shadow-xl">
                <CardContent className="p-4 sm:p-6">
                  <div className="flex flex-col sm:flex-row items-start ">
                    <div className="flex-1">
                      <h3 className="text-base sm:text-lg md:text-xl font-black text-indigo-400 ">
                       {t.QuestionPaperView}
                      </h3>
                      <p className="text-gray-200 leading-relaxed text-sm sm:text-base">
                      {t.QuestionPaperViewall}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Answering Instructions - Mobile Optimized */}
              <Card className="border-0 bg-gradient-to-br from-yellow-500/20 to-orange-500/20 backdrop-blur-sm shadow-xl">
                <CardContent className="p-4 sm:p-6">
                  <div className="flex flex-col sm:flex-row items-start">
                    <div className="flex-1">
                      <h4 className="text-base sm:text-lg md:text-xl font-black text-yellow-400 mb-2 sm:mb-3">
                         {t.AnsweringaQuestion}
                      </h4>
                      <div className="space-y-3 sm:space-y-4">
                        <div className="flex items-start gap-2 sm:gap-3">
                          <div className="w-6 h-6 sm:w-8 sm:h-8 bg-gradient-to-br from-cyan-400 to-blue-500 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                            <span className="text-[10px] sm:text-xs font-black text-white">A</span>
                          </div>
                          <p className="text-gray-200 text-xs sm:text-base">
                           {t.ChooseAnswer}
                          </p>
                        </div>
                        <div className="flex items-start gap-2 sm:gap-3">
                          <div className="w-6 h-6 sm:w-8 sm:h-8 bg-gradient-to-br from-red-400 to-pink-500 rounded flex items-center justify-center flex-shrink-0 mt-1">
                            <RotateCcw className="w-3 h-3 sm:w-4 sm:h-4 text-white" />
                          </div>
                          <p className="text-gray-200 text-xs sm:text-base">
                          {t.NotchooseAnswer}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </CardContent>
        </div>

        {/* Action Buttons - Mobile Optimized */}
        <div className="flex flex-col sm:flex-row justify-between gap-4 sm:gap-6">
          <Button
            onClick={handlePrevious}
            className="border-2 border-cyan-400 text-cyan-400 bg-transparent hover:bg-cyan-400/10 font-bold px-6 sm:px-8 py-3 sm:py-4 text-sm sm:text-base transition-all duration-300 hover:shadow-lg hover:shadow-cyan-400/20 w-full sm:w-auto touch-manipulation"
          >
            <ArrowLeft className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
            {t.previous}
          </Button>

          <Button
            onClick={handleStart}
            className="relative bg-gradient-to-r from-cyan-400 via-magenta-400 to-lime-400 hover:from-cyan-500 hover:via-magenta-500 hover:to-lime-500 text-black font-black px-8 sm:px-12 py-3 sm:py-4 text-sm sm:text-lg transition-all duration-300 hover:shadow-lg hover:shadow-cyan-400/30 overflow-hidden group w-full sm:w-auto touch-manipulation"
            style={{
              clipPath: "polygon(0% 0%, 90% 0%, 100% 30%, 100% 100%, 10% 100%, 0% 70%)",
            }}
          >
            {/* Button background animation */}
            <div className="absolute inset-0 bg-gradient-to-r from-lime-400/20 via-cyan-400/20 to-magenta-400/20 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700" />

            <span className="relative flex items-center justify-center gap-2 sm:gap-3 z-10">
              <Zap className="w-4 h-4 sm:w-6 sm:h-6 animate-pulse" />
              {t.start}
              <ArrowRight className="w-4 h-4 sm:w-6 sm:h-6 group-hover:translate-x-2 group-hover:scale-125 transition-all duration-300" />
              <Hexagon className="w-4 h-4 sm:w-6 sm:h-6 animate-spin" />
            </span>

            {/* Glitch effect on button */}
            <div className="absolute inset-0 bg-gradient-to-r from-magenta-400/30 to-cyan-400/30 opacity-0 group-hover:opacity-100 transition-opacity duration-200 animate-pulse" />
          </Button>
        </div>
      </div>
    </div>
    <Footer />
    </>
  )
}
