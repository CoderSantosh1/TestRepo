import Header from "@/components/Header";
import Footer from "@/components/Footer";

const data = {
  result: [
    "BSEB 12th Exam Result 2025",
    "UP Police UPP Workshop Hand 2022 Exam PET Final Result 2025",
    "Assam Gunotsav Result 2025",
    "IBPS PO 14th Score Card (Qualified for Interview)",
    "SSC Stenographer 2024 Marks, Final Answer Key",
    "IBPS SO 14 Score Card Qualified for Interview",
    "Railway RRB Technician Grade III Result 2025",
    "Delhi DSSSB Assistant Engineer Civil Post Code 803/22 Result",
    "GATE 2025 Results",
    "IIT JAM 2025 Result",
    "Bihar Nyay Mitra Merit List 2025"
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
      <main className="bg-[#FFFBD9] min-h-screen lex items-center justify-center">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 space-y-12">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            <a href="/Assam-Gunotsav-Result" className="bg-blue-800 text-white p-3 md:p-4 rounded-lg text-center hover:bg-blue-900 transition-colors flex items-center justify-center min-h-[100px]">
              <div>
                <div className="text-base md:text-lg font-semibold">Assam Gunotsav Result</div>
                <div className="text-xs md:text-sm">Results</div>
              </div>
            </a>
            <a href="/upp-workshop-hand-result" className="bg-[#8B8000] text-white p-3 md:p-4 rounded-lg text-center hover:bg-[#6B6000] transition-colors flex items-center justify-center min-h-[100px]">
              <div>
                <div className="text-base md:text-lg font-semibold">UP Police UPP Workshop</div>
                <div className="text-xs md:text-sm">PET Final Result</div>
              </div>
            </a>
            <a href="/bseb-12th-result" className="bg-orange-600 text-white p-3 md:p-4 rounded-lg text-center hover:bg-orange-700 transition-colors flex items-center justify-center min-h-[100px]">
              <div>
                <div className="text-base md:text-lg font-semibold">BSEB 12th Result</div>
                <div className="text-xs md:text-sm">Server II</div>
              </div>
            </a>
            <a href="/army-agniveer" className="bg-red-800 text-white p-3 md:p-4 rounded-lg text-center hover:bg-red-900 transition-colors flex items-center justify-center min-h-[100px]">
              <div>
                <div className="text-base md:text-lg font-semibold">Army Agniveer 2025</div>
                <div className="text-xs md:text-sm">Apply Online</div>
              </div>
            </a>
            <a href="/rrb-technician" className="bg-red-600 text-white p-3 md:p-4 rounded-lg text-center hover:bg-red-700 transition-colors flex items-center justify-center min-h-[100px]">
              <div>
                <div className="text-base md:text-lg font-semibold">RRB Technician III</div>
                <div className="text-xs md:text-sm">Result 2025</div>
              </div>
            </a>
            <a href="/csbc-bihar" className="bg-green-800 text-white p-3 md:p-4 rounded-lg text-center hover:bg-green-900 transition-colors flex items-center justify-center min-h-[100px]">
              <div>
                <div className="text-base md:text-lg font-semibold">CSBC Bihar Constable</div>
                <div className="text-xs md:text-sm">Apply Online</div>
              </div>
            </a>
            <a href="/uppsc-pre" className="bg-pink-500 text-white p-3 md:p-4 rounded-lg text-center hover:bg-pink-600 transition-colors flex items-center justify-center min-h-[100px]">
              <div>
                <div className="text-base md:text-lg font-semibold">UPPSC Pre 2025</div>
                <div className="text-xs md:text-sm">Apply Online</div>
              </div>
            </a>
            <a href="/bihar-board" className="bg-blue-500 text-white p-3 md:p-4 rounded-lg text-center hover:bg-blue-600 transition-colors flex items-center justify-center min-h-[100px]">
              <div>
                <div className="text-base md:text-lg font-semibold">Bihar Board 12th</div>
                <div className="text-xs md:text-sm">Result 2025</div>
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
                          <a href={index === 0 ? "/bseb-12th-result" :
                            index === 1 ? "/upp-workshop-hand-result" :
                            index === 2 ? "/Assam-Gunotsav-Result" :
                            index === 3 ? "/ibps-po-score-card" :
                            index === 4 ? "/ssc-stenographer" :
                            index === 5 ? "/ibps-so-score-card" :
                            index === 6 ? "/rrb-technician" :
                            index === 7 ? "/dsssb-ae-result" :
                            index === 8 ? "/gate-results" :
                            index === 9 ? "/iit-jam-result" :
                            index === 10 ? "/bihar-nyay-mitra" : "#"} className="text-[#014F59] hover:underline hover:text-blue-800">{data.result[index]}</a>
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
