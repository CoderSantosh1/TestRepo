import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function BSEB12thResult() {
  return (
    <>
      <Header />
      <div className="flex flex-col items-center justify-center mt-12 w-10/14 max-w-7xl mx-auto px-4">
        <h1 className="text-3xl font-bold mb-4">BSEB 12th Exam Result 2025</h1>
        
        <div className="w-full bg-black  rounded-lg shadow-md p-6 mb-8">
          <h2 className="text-2xl font-semibold mb-4 text-red-600">Important Details</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-blue-500 mb-6">
            <div className="border p-4 rounded">
              <h3 className="font-bold mb-2">Board Name</h3>
              <p>Bihar School Examination Board (BSEB)</p>
            </div>
            <div className="border p-4 rounded">
              <h3 className="font-bold mb-2">Exam Name</h3>
              <p>Intermediate (12th) Annual Examination 2025</p>
            </div>
            <div className="border p-4 rounded">
              <h3 className="font-bold mb-2">Result Status</h3>
              <p className="text-green-600 font-semibold">Available</p>
            </div>
            <div className="border p-4 rounded">
              <h3 className="font-bold mb-2">Official Website</h3>
              <a href="https://results.biharboardonline.com/Seniorsecondary24" className="text-blue-500 hover:text-blue-700" target="_blank" rel="noopener noreferrer">
                biharboardonline.bihar.gov.in
              </a>
            </div>
          </div>

          <div className="mb-8">
            <h2 className="text-xl font-semibold mb-4">How to Check BSEB 12th Result 2025</h2>
            <ol className="list-decimal list-inside space-y-2 ">
              <li>Visit the official website of BSEB</li>
              <li>Click on the &quot;12th Result 2025&quot; link</li>
              <li>Enter your Roll Code and Roll Number</li>
              <li>Click on Submit button</li>
              <li>Your result will be displayed on the screen</li>
              <li>Download and take a printout for future reference</li>
            </ol>
          </div>

          <div className="bg-gray-50 p-4 rounded">
            <h2 className="text-xl font-semibold mb-4">Important Notice</h2>
            <p className="text-gray-700">
              The Bihar School Examination Board (BSEB) will announce the Bihar Board 12th Result 2025 soon. 
              Students who appeared for the examination can check their results using their roll number 
              and roll code on the official website.
            </p>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}