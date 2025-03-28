import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function SBIClerkResult() {
  return (
    <>
      <Header />
      <div className="flex flex-col items-center justify-center bg-[#FFFBD9] mt-12 w-10/14 max-w-7xl mx-auto px-4 min-h-screen">
        <h1 className="text-3xl font-bold mb-4">SBI Clerk Result 2025</h1>
        
        <div className="w-full bg-white p-6 rounded-lg shadow-md mb-6">
          <h2 className="text-2xl font-semibold mb-4 text-[#014F59]">Result Highlights</h2>
          <ul className="list-disc pl-6 space-y-2 text-gray-700">
            <li>Organization: State Bank of India (SBI)</li>
            <li>Post: Junior Associates (Clerk)</li>
            <li>Result Status: Coming Soon</li>
            <li>Official Website: sbi.co.in/careers</li>
          </ul>
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
              <p className="text-blue-600 hover:text-blue-800"><a href="https://sbi.co.in/careers">SBI Careers Portal</a></p>
              <p className="text-blue-600 hover:text-blue-800"><a href="https://ibpsonline.ibps.in/">IBPS Online Portal</a></p>
            </div>
          </div>
        </div>

        <div className="w-full bg-white p-6 rounded-lg shadow-md mb-6">
          <h2 className="text-2xl font-semibold mb-4 text-[#014F59]">How to Check Results</h2>
          <ol className="list-decimal pl-6 space-y-3 text-gray-700">
            <li>Visit the official SBI website or careers portal</li>
            <li>Click on the &quot;Clerk Results 2025&quot; link</li>
            <li>Enter your Registration/Roll Number</li>
            <li>Enter your Password/DOB</li>
            <li>Click on &quot;Submit&quot; button</li>
            <li>Your result will be displayed on the screen</li>
            <li>Download and save the result for future reference</li>
          </ol>
        </div>

        <div className="w-full bg-white p-6 rounded-lg shadow-md mb-6">
          <h2 className="text-2xl font-semibold mb-4 text-[#014F59]">Important Instructions</h2>
          <ul className="list-disc pl-6 space-y-2 text-gray-700">
            <li>Keep your registration number and password ready</li>
            <li>Take a screenshot or download the result page</li>
            <li>Check all details carefully in the result</li>
            <li>Results are provisional subject to document verification</li>
          </ul>
        </div>

        <div className="w-full bg-white p-6 rounded-lg shadow-md mb-6">
          <h2 className="text-2xl font-semibold mb-4 text-[#014F59]">Selection Process</h2>
          <ul className="list-disc pl-6 space-y-2 text-gray-700">
            <li>Preliminary Examination</li>
            <li>Main Examination</li>
            <li>Local Language Test</li>
            <li>Document Verification</li>
          </ul>
        </div>
      </div>
      <Footer />
    </>
  );
}