import Header from "@/components/Header";
import Footer from "@/components/Footer";

const data = {
  result: [
    "AIBE 19th Exam Result 2025",
    "India Post GDS 2025 First Merit List",
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
   <Header /> {/* ✅ Added Header component */}
   
      <div className="flex flex-col items-center justify-center mt-12 w-10/14 max-w-7xl mx-auto px-4">
        <h1 className="text-3xl font-bold mb-4">Welcome to JobsPlatform</h1>
        <table className="min-w-full table-auto border-collapse border border-orange-500 ">
          <thead>
            <tr className="bg-red-600 text-[#FCFCD8] font-bold">
              <th className="p-3  text-center">Result</th>
              <th className="p-3 text-center">Admit Card</th>
              <th className="p-3 text-center">Latest Jobs</th>
            </tr>
          </thead>
          <tbody>
            {Array.from({ length: Math.max(data.result.length, data.admitCard.length, data.latestJobs.length) })
              .map((_, index) => (
                <tr key={index} className="border-t-2 border-red-500 bg-red-1- ">
                  <td className="p-3 shadow-sm">
                    {data.result[index] ? (
                      <a href="#" className="text-[#014F59] hover:underline hover:text-blue-800">{data.result[index]}</a>
                    ) : "-"}
                  </td>
                  <td className="p-3 border-r">
                    {data.admitCard[index] ? (
                      <a href="#" className="text-[#014F59] hover:underline hover:text-blue-800">{data.admitCard[index]}</a>
                    ) : "-"}
                  </td>
                  <td className="p-3">
                    {data.latestJobs[index] ? (
                      <a href="#" className="text-[#014F59] hover:underline hover:text-blue-800">{data.latestJobs[index]}</a>
                    ) : "-"}
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
      <Footer /> {/* ✅ Added Footer component */}
    </>
  );
}
