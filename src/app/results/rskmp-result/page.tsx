import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function RSKMPResult() {
  return (
    <>
      <Header />
      <div className="flex flex-col items-center justify-center bg-[#FFFBD9] mt-12 w-10/14 max-w-7xl mx-auto px-4 min-h-screen">
        <h1 className="text-3xl font-bold mb-4">RSKMP Result 2025 (OUT)</h1>
        
        <div className="w-full bg-white p-6 rounded-lg shadow-md mb-6">
          <h2 className="text-2xl font-semibold mb-4 text-[#014F59]">Result Highlights</h2>
          <ul className="list-disc pl-6 space-y-2 text-gray-700">
            <li>Board: MP Board (RSKMP)</li>
            <li>Class 5th Pass Percentage: 92.70%</li>
            <li>Class 8th Pass Percentage: 90.02%</li>
            <li>Official Website: rskmp.in</li>
          </ul>
        </div>

        <div className="w-full bg-white p-6 rounded-lg shadow-md mb-6">
          <h2 className="text-2xl font-semibold mb-4 text-[#014F59]">Important Links</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="border-b md:border-r p-4">
              <h3 className="font-semibold text-red-600">Check your results</h3>
              <p>Results are now available</p>
            </div>
            <div className="border-b p-4">
              <h3 className="font-semibold text-red-600">Official Links</h3>
              <p className="text-blue-600 hover:text-blue-800"><a href="https://rskmp.in">RSKMP Official Website</a></p>
              <p className="text-blue-600 hover:text-blue-800"><a href="https://rskmp.in/results">Results Portal</a></p>
            </div>
          </div>
        </div>

        <div className="w-full bg-white p-6 rounded-lg shadow-md mb-6">
          <h2 className="text-2xl font-semibold mb-4 text-[#014F59]">How to Check Results</h2>
          <ol className="list-decimal pl-6 space-y-3 text-gray-700">
            <li>Visit the official RSKMP website (rskmp.in)</li>
            <li>Click on the respective result link (Class 5th or Class 8th)</li>
            <li>Enter your Roll Number</li>
            <li>Enter other required details if asked</li>
            <li>Click on the &quot;Submit&quot; button</li>
            <li>Your result will be displayed on the screen</li>
            <li>Download and take a printout for future reference</li>
          </ol>
        </div>

        <div className="w-full bg-white p-6 rounded-lg shadow-md mb-6">
          <h2 className="text-2xl font-semibold mb-4 text-[#014F59]">Important Instructions</h2>
          <ul className="list-disc pl-6 space-y-2 text-gray-700">
            <li>Keep your roll number and other credentials ready before checking the result</li>
            <li>Take a screenshot or download the result page</li>
            <li>In case of any discrepancy, contact your school or RSKMP officials</li>
            <li>Results are provisional until the original mark sheet is issued</li>
          </ul>
        </div>

        <div className="w-full bg-white p-6 rounded-lg shadow-md mb-6">
          <h2 className="text-2xl font-semibold mb-4 text-[#014F59]">Performance Statistics</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-4 bg-blue-50 rounded-lg">
              <h3 className="text-xl font-semibold text-blue-800 mb-3">Class 5th Results</h3>
              <p className="text-lg font-bold text-green-600">Pass Percentage: 92.70%</p>
            </div>
            <div className="p-4 bg-green-50 rounded-lg">
              <h3 className="text-xl font-semibold text-green-800 mb-3">Class 8th Results</h3>
              <p className="text-lg font-bold text-green-600">Pass Percentage: 90.02%</p>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}