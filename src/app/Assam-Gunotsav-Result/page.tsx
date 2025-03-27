import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function BSEB12thResult() {
  return (
    <>
      <Header />
      <div className="flex flex-col items-center justify-center bg-[#FFFBD9] mt-12 w-10/14 max-w-7xl mx-auto px-4 min-h-screen">
        <h1 className="text-3xl font-bold mb-4">Assam Gunotsav Result 2025 OUT at gunotsav2025.in, </h1>
        
        <div className="w-full bg-white p-6 rounded-lg shadow-md mb-6">
          <h2 className="text-2xl font-semibold mb-4 text-[#014F59]">Result Highlights</h2>
          <ul className="list-disc pl-6 space-y-2 text-gray-700">
            <li>Check Steps to Download Result PDF Direct Link Here</li>
            {/* <li>Examination: Intermediate (12th) Annual Examination 2025</li>
            <li>Result Status: Coming Soon</li>
            <li>Official Website: biharboardonline.bihar.gov.in</li> */}
          </ul>
        </div>

        <div className="w-full bg-white p-6 rounded-lg shadow-md mb-6">
          <h2 className="text-2xl font-semibold mb-4 text-[#014F59]">Important Dates</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="border-b md:border-r p-4">
              <h3 className="font-semibold text-red-600">Check yours results </h3>
              <p>Results</p>
            </div>
            <div className="border-b p-4">
              <h3 className="font-semibold text-red-600">Click here</h3>
              <p className="text-blue-600 hover:text-blue-800"><a href="https://result9.gunotsav2025.in/login/school">LINK-I</a></p>
              <p className="text-blue-600 hover:text-blue-800"><a href="https://result9.gunotsav2025.in/login/school">LINK-II</a></p>
              <p className="text-blue-600 hover:text-blue-800"><a href="https://result9.gunotsav2025.in/login/school">LINK-III</a></p>
            </div>
          </div>
        </div>
        

        <div className="w-full bg-white p-6 rounded-lg shadow-md mb-6">
          <h2 className="text-2xl font-semibold mb-4 text-[#014F59]">How to Check Results</h2>
          <ol className="list-decimal pl-6 space-y-3 text-gray-700">
            {/* <li>Visit the official BSEB website: biharboardonline.bihar.gov.in</li>
            <li>Click on the &quot;Class XII Result 2025&quot; link</li>
            <li>Enter your Roll Code and Roll Number</li>
            <li>Click on &quot;Submit&quot; button</li>
            <li>Your result will be displayed on the screen</li>
            <li>Download and take a printout for future reference</li> */}
          </ol>
        </div>

        <div className="w-full bg-white p-6 rounded-lg shadow-md mb-6">
          <h2 className="text-2xl font-semibold mb-4 text-[#014F59]">Required Documents</h2>
          <ul className="list-disc pl-6 space-y-2 text-gray-700">
            {/* <li>Roll Code</li>
            <li>Roll Number</li>
            <li>Registration Number (if applicable)</li>
            <li>Date of Birth (for verification)</li> */}
          </ul>
        </div>
        </div>
      <Footer />
    </>
  );
}