"use client"

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

const instructions = {
  en: {
    title: "General Instructions",
    sections: [
      "The clock will be set at the server. The countdown timer at the top right corner of screen will display the remaining time available for you to complete the examination. When the timer reaches zero, the examination will end by itself. You need not terminate the examination or submit your paper.",
      "The Question Palette displayed on the right side of screen will show the status of each question using one of the following symbols:",
    ],
    markForReview: "The Mark For Review status for a question simply indicates that you would like to look at that question again. If a question is answered, but marked for review, then the answer will be considered for evaluation unless the status is modified by the candidate.",
    navTitle: "Navigating to a Question :",
    navList: [
      "Click on the question number in the Question Palette at the right of your screen to go to that numbered question directly. Note that using this option does NOT save your answer to the current question.",
      "Click on Save & Next to save your answer for the current question and then go to the next question.",
      "Click on Mark for Review & Next to save your answer for the current question and also mark it for review, and then go to the next question."
    ],
    navNote: "Note that your answer for the current question will not be saved, if you navigate to another question directly by clicking on a question number without saving the answer to the previous question.",
    navPaper: "You can view all the questions by clicking on the Question Paper button. This feature is provided, so that if you want you can just see the entire question paper at a glance.",
    ansTitle: "Answering a Question :",
    ansList: [
      "Choose one answer from the 4 options (A,B,C,D) given below the question, click on the bubble placed before the chosen option.",
      "To deselect your chosen answer, click on the bubble of the chosen option again or click on the Clear Response button."
    ],
    previous: "Previous",
    start: "Start Test",
    lang: "हिंदी"
  },
  hi: {
    title: "सामान्य निर्देश",
    sections: [
      "घड़ी सर्वर पर सेट की जाएगी। स्क्रीन के शीर्ष दाएँ कोने में काउंटडाउन टाइमर आपके लिए शेष समय दिखाएगा। जब टाइमर शून्य पर पहुँच जाएगा, परीक्षा अपने आप समाप्त हो जाएगी। आपको परीक्षा समाप्त करने या पेपर सबमिट करने की आवश्यकता नहीं है।",
      "स्क्रीन के दाएँ ओर प्रदर्शित प्रश्न पैलेट प्रत्येक प्रश्न की स्थिति निम्नलिखित प्रतीकों में से एक का उपयोग करके दिखाएगा:",
    ],
    markForReview: "समीक्षा के लिए चिह्नित (Mark For Review) स्थिति का अर्थ है कि आप उस प्रश्न को फिर से देखना चाहते हैं। यदि कोई प्रश्न उत्तरित है लेकिन समीक्षा के लिए चिह्नित है, तो उत्तर को मूल्यांकन के लिए माना जाएगा जब तक कि स्थिति उम्मीदवार द्वारा संशोधित न की जाए।",
    navTitle: "प्रश्न पर नेविगेट करना:",
    navList: [
      "प्रश्न पैलेट में प्रश्न संख्या पर क्लिक करें ताकि आप सीधे उस प्रश्न पर जा सकें। ध्यान दें कि इस विकल्प का उपयोग करने से आपके वर्तमान प्रश्न का उत्तर सहेजा नहीं जाएगा।",
      "Save & Next पर क्लिक करें ताकि आपके वर्तमान प्रश्न का उत्तर सहेजकर अगले प्रश्न पर जा सकें।",
      "Mark for Review & Next पर क्लिक करें ताकि आपके वर्तमान प्रश्न का उत्तर सहेजकर उसे समीक्षा के लिए चिह्नित कर सकें, और फिर अगले प्रश्न पर जा सकें।"
    ],
    navNote: "ध्यान दें कि यदि आप बिना उत्तर सहेजे सीधे किसी अन्य प्रश्न पर जाते हैं, तो आपके वर्तमान प्रश्न का उत्तर सहेजा नहीं जाएगा।",
    navPaper: "आप सभी प्रश्नों को Question Paper बटन पर क्लिक करके देख सकते हैं। यह सुविधा दी गई है ताकि आप चाहें तो पूरे प्रश्न पत्र को एक साथ देख सकें।",
    ansTitle: "प्रश्न का उत्तर देना:",
    ansList: [
      "प्रश्न के नीचे दिए गए 4 विकल्पों (A,B,C,D) में से एक उत्तर चुनें, चुने गए विकल्प के आगे वाले बबल पर क्लिक करें।",
      "अपना चयनित उत्तर हटाने के लिए, चुने गए विकल्प के बबल पर फिर से क्लिक करें या Clear Response बटन पर क्लिक करें।"
    ],
    previous: "पिछला",
    start: "परीक्षा शुरू करें",
    lang: "English"
  }
};

export default function QuizInstructions({ params }: { params: { id: string } }) {
  const router = useRouter()
  const [isMobile, setIsMobile] = useState(false)
  const [lang, setLang] = useState<'en' | 'hi'>('en')

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }

    checkMobile()
    window.addEventListener("resize", checkMobile)

    return () => window.removeEventListener("resize", checkMobile)
  }, [])

  const handleStart = () => {
    router.push(`/quizzes/${params.id}`)
  }

  const handlePrevious = () => {
    router.back()
  }

  const toggleLang = () => {
    setLang((prev) => (prev === 'en' ? 'hi' : 'en'))
  }

  const t = instructions[lang]

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-black p-3 sm:p-4 md:p-6 lg:p-8">
      {/* Floating particles background - Reduced for mobile */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        {[...Array(isMobile ? 8 : 20)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-cyan-400 rounded-full opacity-30"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animation: `float ${4 + Math.random() * 3}s ease-in-out infinite ${Math.random() * 2}s`,
              boxShadow: "0 0 4px currentColor",
            }}
          />
        ))}
      </div>

      <div className="container mx-auto py-4 sm:py-6 md:py-4 px-2 sm:px-4 md:px-6 relative z-10 max-w-6xl">
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
                Test Instructions
              </h1>
              
            </CardTitle>
            <p className="text-cyan-300 font-semibold text-sm sm:text-base flex items-center justify-center">Please read carefully before starting</p>
          </CardHeader>

          <CardContent className="p-4 sm:p-6 md:p-8">
            <div className="space-y-4 sm:space-y-6 md:space-y-8">
              {/* Instruction 1 - Timer Protocol - Mobile Optimized */}
              

              {/* Instruction 2 - Question Palette - Mobile Optimized */}
              <Card className="border-0 bg-gradient-to-br from-cyan-500/20 to-blue-500/20 backdrop-blur-sm shadow-xl">
                <CardContent className="p-4 sm:p-6">
                  <div className="flex flex-col sm:flex-row items-start gap-3 sm:gap-4">
                    
                    <div className="flex-1">
                      <h3 className="text-base sm:text-lg md:text-xl font-black text-cyan-400 mb-2 sm:mb-3">
                         Question Status Guide
                      </h3>
                      <p className="text-gray-200 leading-relaxed mb-4 sm:mb-6 text-sm sm:text-base">
                        The Question Palette displayed on the right side of screen will show the status of each question
                        using one of the following symbols:
                      </p>

                      {/* Status Grid - Mobile Optimized */}
                      <div className="grid grid-cols-1 gap-2 sm:gap-3 md:gap-4">
                        {statusLegend[lang].map((status, index) => (
                          <div
                            key={index}
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
              <Card className="border-0 bg-gradient-to-br from-purple-500/20 to-pink-500/20 backdrop-blur-sm shadow-xl">
                <CardContent className="p-4 sm:p-6">
                  <div className="flex flex-col sm:flex-row items-start gap-3 sm:gap-4">
                    <div className="flex-1">
                      <h3 className="text-base sm:text-lg md:text-xl font-black text-purple-400 mb-2 sm:mb-3">
                        Mark For Review Status
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
              </Card>

              {/* Navigation Instructions - Mobile Optimized */}
              <Card className="border-0 bg-gradient-to-br from-lime-500/20 to-emerald-500/20 backdrop-blur-sm shadow-xl">
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
              </Card>

              {/* Question Paper View - Mobile Optimized */}
              <Card className="border-0 bg-gradient-to-br from-indigo-500/20 to-purple-500/20 backdrop-blur-sm shadow-xl">
                <CardContent className="p-4 sm:p-6">
                  <div className="flex flex-col sm:flex-row items-start gap-3 sm:gap-4">
                    <div className="flex-1">
                      <h3 className="text-base sm:text-lg md:text-xl font-black text-indigo-400 mb-2 sm:mb-3">
                        Question Paper View
                      </h3>
                      <p className="text-gray-200 leading-relaxed text-sm sm:text-base">
                        You can view all the questions by clicking on the{" "}
                        <span className="text-indigo-300 font-bold">Question Paper</span> button.{" "}
                        <span className="text-red-400 font-semibold">
                          This feature is provided, so that if you want you can just see the entire question paper at a
                          glance.
                        </span>
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Answering Instructions - Mobile Optimized */}
              <Card className="border-0 bg-gradient-to-br from-yellow-500/20 to-orange-500/20 backdrop-blur-sm shadow-xl">
                <CardContent className="p-4 sm:p-6">
                  <div className="flex flex-col sm:flex-row items-start gap-3 sm:gap-4">
                    <div className="flex-1">
                      <h3 className="text-base sm:text-lg md:text-xl font-black text-yellow-400 mb-2 sm:mb-3">
                        Answering a Question
                      </h3>
                      <div className="space-y-3 sm:space-y-4">
                        <div className="flex items-start gap-2 sm:gap-3">
                          <div className="w-6 h-6 sm:w-8 sm:h-8 bg-gradient-to-br from-cyan-400 to-blue-500 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                            <span className="text-[10px] sm:text-xs font-black text-white">A</span>
                          </div>
                          <p className="text-gray-200 text-xs sm:text-base">
                            Choose one answer from the 4 options (A, B, C, D) given below the question, click on the
                            bubble placed before the chosen option.
                          </p>
                        </div>
                        <div className="flex items-start gap-2 sm:gap-3">
                          <div className="w-6 h-6 sm:w-8 sm:h-8 bg-gradient-to-br from-red-400 to-pink-500 rounded flex items-center justify-center flex-shrink-0 mt-1">
                            <RotateCcw className="w-3 h-3 sm:w-4 sm:h-4 text-white" />
                          </div>
                          <p className="text-gray-200 text-xs sm:text-base">
                            To deselect your chosen answer, click on the bubble of the chosen option again or click on
                            the <span className="text-red-400 font-bold">Clear Response</span> button.
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
  )
}
