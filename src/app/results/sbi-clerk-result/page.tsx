import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default function SBIClerkResult() {
  return (
    <>
      <Header />
      <div className="flex flex-col items-center justify-center bg-[#FFFBD9] mt-12 w-10/14 max-w-7xl mx-auto px-4 min-h-screen">
        <h1 className="text-3xl font-bold mb-4">SBI Clerk Prelims Result 2025 (OUT)</h1>
        
        <div className="w-full bg-white p-6 rounded-lg shadow-md mb-6">
          <h2 className="text-2xl font-semibold mb-4 text-[#014F59]">Result Highlights</h2>
          <ul className="list-disc pl-6 space-y-2 text-gray-700">
            <li>Organization: State Bank of India (SBI)</li>
            <li>Examination: Clerk Junior Associate (JA) Prelims 2025</li>
            <li>Result Status: Released</li>
            <li>Official Website: sbi.co.in</li>
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
              <p className="text-blue-600 hover:text-blue-800"><a href="https://sbi.co.in">SBI Official Website</a></p>
              <p className="text-blue-600 hover:text-blue-800"><a href="https://ibps.sbi/crpd/">SBI Career Portal</a></p>
            </div>
          </div>
        </div>

        <div className="w-full bg-white p-6 rounded-lg shadow-md mb-6">
          <h2 className="text-2xl font-semibold mb-4 text-[#014F59]">How to Check Results</h2>
          <ol className="list-decimal pl-6 space-y-3 text-gray-700">
            <li>Visit the official SBI website (sbi.co.in)</li>
            <li>Click on 'Careers' link</li>
            <li>Look for 'Junior Associate (JA) Prelims Result 2025' link</li>
            <li>Enter your Registration Number/Roll Number</li>
            <li>Enter your Password/DOB</li>
            <li>Click on the 'Submit' button</li>
            <li>Your result will be displayed on the screen</li>
            <li>Download and take a printout for future reference</li>
          </ol>
        </div>

        <div className="w-full bg-white p-6 rounded-lg shadow-md mb-6">
          <h2 className="text-2xl font-semibold mb-4 text-[#014F59]">Important Instructions</h2>
          <ul className="list-disc pl-6 space-y-2 text-gray-700">
            <li>Keep your registration number and password ready</li>
            <li>Download and save your scorecard</li>
            <li>Qualified candidates will be eligible for the Main examination</li>
            <li>Results are provisional subject to document verification</li>
            <li>In case of any discrepancy, contact SBI officials immediately</li>
          </ul>
        </div>

        <div className="w-full bg-white p-6 rounded-lg shadow-md mb-6">
          <h2 className="text-2xl font-semibold mb-4 text-[#014F59]">Next Steps for Qualified Candidates</h2>
          <ul className="list-disc pl-6 space-y-2 text-gray-700">
            <li>Wait for SBI Clerk Mains exam date announcement</li>
            <li>Download Mains exam admit card when available</li>
            <li>Start preparation for the Main examination</li>
            <li>Keep checking official website for updates</li>
          </ul>
        </div>
      </div>
      <Footer />
    </>
  );
}