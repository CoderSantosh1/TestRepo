import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function BiharBoard() {
  return (
    <>
      <Header />
      <div className="flex flex-col items-center justify-center bg-red-300 mt-12 w-10/14 max-w-7xl mx-auto px-4 min-h-screen">
        <h1 className="text-3xl font-bold mb-4">Bihar Board  10th Results  2025</h1>
        
        <div className="w-full bg-white p-6 rounded-lg shadow-md mb-6">
          <h2 className="text-2xl font-semibold mb-4 text-[#014F59]">Result Highlights</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-xl font-semibold mb-3 text-[#014F59]">Class 10th (Matric)</h3>
              <ul className="list-disc pl-6 space-y-2 text-gray-700">
                <li>Board: Bihar School Examination 1oth Board (BSEB)</li>
                <li>Examination: Matric Annual Exam 2025</li>
                <li>Result Status: Coming Soon</li>
                <li>Official Website: biharboardonline.bihar.gov.in</li>
              </ul>
            </div>
          </div>
        </div>

        <div className="w-full bg-white p-6 rounded-lg shadow-md mb-6">
          <h2 className="text-2xl font-semibold mb-4 text-[#014F59]">Important Links</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="border-b md:border-r p-4">
              <h3 className="font-semibold text-red-600">Check your results</h3>
              <p>Results will be available soon</p>
            </div>
            <div className="border-b p-4">
              <h3 className="font-semibold text-red-600">Official Links</h3>
              <p className="text-blue-600 hover:text-blue-800"><a href="https://biharboardonline.bihar.gov.in/">BSEB Official Website</a></p>
              <p className="text-blue-600 hover:text-blue-800"><a href="https://results.biharboardonline.com/">BSEB Results Portal</a></p>
            </div>
          </div>
        </div>

        <div className="w-full bg-white p-6 rounded-lg shadow-md mb-6">
          <h2 className="text-2xl font-semibold mb-4 text-[#014F59]">How to Check Results</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            <div>
              <h3 className="text-xl font-semibold mb-3 text-[#014F59]">Class 10th Results</h3>
              <ol className="list-decimal pl-6 space-y-3 text-gray-700">
                <li>Visit biharboardonline.bihar.gov.in</li>
                <li>Click on &quot;Class X Result 2025&quot; link</li>
                <li>Enter your Roll Code and Roll Number</li>
                <li>Click on &quot;Submit&quot; button</li>
                <li>View and download your result</li>
              </ol>
            </div>
          </div>
        </div>

        <div className="w-full bg-white p-6 rounded-lg shadow-md mb-6">
          <h2 className="text-2xl font-semibold mb-4 text-[#014F59]">Important Instructions</h2>
          <ul className="list-disc pl-6 space-y-2 text-gray-700">
            <li>Keep your roll number and registration number handy</li>
            <li>Take a screenshot or download the result page</li>
            <li>In case of any discrepancy, contact your school or BSEB officials</li>
            <li>Results are provisional until the original mark sheet is issued</li>
          </ul>
        </div>

        <div className="w-full bg-white p-6 rounded-lg shadow-md mb-6">
          <h2 className="text-2xl font-semibold mb-4 text-[#014F59]">Performance Statistics</h2>
          <p className="text-gray-700 mb-4">Statistics will be updated once results are declared</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 bg-blue-50 rounded-lg">
              <h3 className="text-xl font-semibold text-blue-800 mb-3">Overall Pass Percentage</h3>
              <p className="text-lg">To be announced</p>
            </div>
            <div className="p-4 bg-green-50 rounded-lg">
              <h3 className="text-xl font-semibold text-green-800 mb-3">Total Students Appeared</h3>
              <p className="text-lg">To be announced</p>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}