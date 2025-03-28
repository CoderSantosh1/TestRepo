import Header from "@/components/Header";
import Footer from "@/components/Footer";

const data = {
  result: [
    "RSKMP Result 2025 (OUT)",
    "Goa hssc result 2025",
    "UP Police UPP Workshop Hand 2022 Exam PET Final Result 2025",
    "Assam Gunotsav Result 2025",
    "BSEB 12th Exam Result 2025",
    "Bihar 10th Result",
    "IBPS SO 14 Score Card Qualified for Interview",
    "Railway RRB Technician Grade III Result 2025",
    "Delhi DSSSB Assistant Engineer Civil Post Code 803/22 Result",
    "GATE 2025 Results"
  ],
  admitCard: [
    "UPSSSC Junior Assistant 2022 Document Verification DV Admit Card",
    "BPSSC ASI Steno 2024 Eligibility Test Date",
    "NVS Non Teaching Various Post Exam Date 2025",
    "NTA JEEMAIN Phase II Exam City Details 2025",
    "RPSC EO / RO 2022 Admit Card",
    "UPPSC Agriculture Services Mains Admit Card 2025",
    "SSC Junior Hindi Translator JHT Paper II Exam City 2025",
    "UPPSC RO / ARO 2023 Re Exam Date",
    "Allahabad High Court Driver Stage II Admit Card 2025",
    "NVS Class 6 Admit Card 2025 Winter Bound"
  ],
  latestJobs: [
    "Navy Agniveer SSR / MR INET 2025 Online Form",
    "Rajasthan RSSB 4th Class Employee Online Form 2025",
    "BHU Junior Clerk Online Form 2025",
    "IOCL Trade, Technical, Graduate Apprentices Online Form 2025",
    "Rajasthan RSSB Librarian Grade III Online Form 2025",
    "CSBC Bihar Police Constable Online Form 2025",
    "Allahabad High Court Research Associates Online Form 2025",
    "NCL CIL ITI / Diploma / Graduate Apprentices Online Form 2025",
    "Army Agniveer CEE Online Form 2025",
    "MPESB Middle School, Primary School Teacher Online Form 2025"
  ]
};

export default function Home() {
  return (
    <>
      <Header />
      <main className="flex flex-col items-center justify-center bg-[#FFFBD9] mt-12 w-10/14 max-w-7xl mx-auto px-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 space-y-12 ">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          <a href="results/rskmp-result" className="bg-red-600 text-white p-3 md:p-4 rounded-lg text-center hover:bg-red-700 transition-colors flex items-center justify-center min-h-[100px]">
              <div>
                <div className="text-base md:text-lg font-semibold">RSKMP Result 2025</div>
                <div className="text-xs md:text-sm">Result 2025</div>
              </div>
            </a>
          <a href="/results/goa-hssc-result" className="bg-yellow-600 text-white p-3 md:p-4 rounded-lg text-center hover:bg-yellow-700 transition-colors flex items-center justify-center min-h-[100px]">
              <div>
                <div className="text-base md:text-lg font-semibold">Goa HSSC Result 2025</div>
                <div className="text-xs md:text-sm">Class 12</div>
              </div>
            </a>
            <a href="/results/Assam-Gunotsav-Result" className="bg-blue-800 text-white p-3 md:p-4 rounded-lg text-center hover:bg-blue-900 transition-colors flex items-center justify-center min-h-[100px]">
              <div>
                <div className="text-base md:text-lg font-semibold">Assam Gunotsav Result</div>
                <div className="text-xs md:text-sm">Results</div>
              </div>
            </a>
  
           
           
            <a href="/csbc-bihar" className="bg-green-800 text-white p-3 md:p-4 rounded-lg text-center hover:bg-green-900 transition-colors flex items-center justify-center min-h-[100px]">
              <div>
                <div className="text-base md:text-lg font-semibold">CSBC Bihar Constable</div>
                <div className="text-xs md:text-sm">Apply Online</div>
              </div>
            </a>
            
            <a href="/bihar-board" className="bg-blue-500 text-white p-3 md:p-4 rounded-lg text-center hover:bg-blue-600 transition-colors flex items-center justify-center min-h-[100px]">
              <div>
                <div className="text-base md:text-lg font-semibold">Bihar Board 12th</div>
                <div className="text-xs md:text-sm">Result 2025</div>
              </div>
            </a>
            <a href="/results/bihar-10th-result" className="bg-purple-600 text-white p-3 md:p-4 rounded-lg text-center hover:bg-purple-700 transition-colors flex items-center justify-center min-h-[100px]">
              <div>
                <div className="text-base md:text-lg font-semibold">Bihar 10th Result</div>
                <div className="text-xs md:text-sm">Result 2025</div>
              </div>
            </a>
            <a href="/results/sbi-clerk" className="bg-teal-600 text-white p-3 md:p-4 rounded-lg text-center hover:bg-teal-700 transition-colors flex items-center justify-center min-h-[100px]">
              <div>
                <div className="text-base md:text-lg font-semibold">SBI Clerk Result</div>
                <div className="text-xs md:text-sm">Results</div>
              </div>
            </a>
           
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
                {Array.from({ length: Math.max(data.result.length, data.admitCard.length, data.latestJobs.length) })
                  .map((_, index) => (
                    <tr key={index} className="border-t-2 border-red-500 hover:bg-[#FFF8CC]">
                      <td className="p-2 md:p-3 shadow-sm text-sm md:text-base">
                        {data.result[index] ? (
                          <a href={index === 0 ? "/results/rskmp-result" :
                            index === 1 ? "/results/bseb-12th-result" :
                            index === 2 ? "/results/upp-workshop-hand-result" :
                            index === 3 ? "/results/Assam-Gunotsav-Result" :
                            index === 4 ? "/ibps-po-score-card" :
                            index === 5 ? "/ssc-stenographer" :
                            index === 6 ? "/ibps-so-score-card" :
                            index === 7 ? "/rrb-technician" :
                            index === 8 ? "/dsssb-ae-result" :
                            index === 9 ? "/gate-results" : "#"} className="text-[#014F59] hover:underline hover:text-blue-800">{data.result[index]}</a>
                        ) : "-"}
                      </td>
                      <td className="p-2 md:p-3 border-x text-sm md:text-base">
                        {data.admitCard[index] ? (
                          <a href="#" className="text-[#014F59] hover:underline hover:text-blue-800">{data.admitCard[index]}</a>
                        ) : "-"}
                      </td>
                      <td className="p-2 md:p-3 text-sm md:text-base">
                        {data.latestJobs[index] ? (
                          <a href="#" className="text-[#014F59] hover:underline hover:text-blue-800">{data.latestJobs[index]}</a>
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
