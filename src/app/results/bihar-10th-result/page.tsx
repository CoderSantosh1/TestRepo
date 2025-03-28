import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default function Bihar10thResult() {
  return (
    <>
      <Header />
      <div className="flex flex-col items-center justify-center bg-red-500 mt-12 w-10/14 max-w-7xl mx-auto px-4 min-h-screen">
        <h1 className="text-3xl font-bold mb-4">बिहार बोर्ड 10वीं रिजल्ट 2025</h1>
        
        <div className="w-full bg-white p-6 rounded-lg shadow-md mb-6">
          <h2 className="text-2xl font-semibold mb-4 text-[#014F59]">BSEB 10th रिजल्ट हाइलाइट्स 12PM </h2>
          <ul className="list-disc pl-6 space-y-2 text-gray-700">
            <li>बोर्ड: बिहार स्कूल एग्जामिनेशन बोर्ड (BSEB)</li>
            <li>परीक्षा: मैट्रिक (10वीं) वार्षिक परीक्षा 2025</li>
            <li>रिजल्ट स्टेटस: Comming Soon</li>
            <li>ऑफिशियल वेबसाइट: biharboardonline.bihar.gov.in</li>
          </ul>
        </div>

        <div className="w-full bg-white p-6 rounded-lg shadow-md mb-6">
          <h2 className="text-2xl font-semibold mb-4 text-[#014F59]">महत्वपूर्ण लिंक्स</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="border-b md:border-r p-4">
              <h3 className="font-semibold text-red-600">अपना रिजल्ट चेक करें</h3>
              <p>रिजल्ट जल्द उपलब्ध होगा</p>
            </div>
            <div className="border-b p-4">
              <h3 className="font-semibold text-red-600">ऑफिशियल लिंक्स</h3>
              <p className="text-blue-600 hover:text-blue-800"><a href="https://biharboardonline.bihar.gov.in/">LINK-I</a></p>
              <p className="text-blue-600 hover:text-blue-800"><a href="https://results.biharboardonline.com/">LINK-II</a></p>
            </div>
          </div>
        </div>

        <div className="w-full bg-white p-6 rounded-lg shadow-md mb-6">
          <h2 className="text-2xl font-semibold mb-4 text-[#014F59]">BSEB 10th रिजल्ट  कैसे चेक करें</h2>
          <ol className="list-decimal pl-6 space-y-3 text-gray-700">
            <li>BSEB की ऑफिशियल वेबसाइट पर जाएं</li>
            <li>&quot;मैट्रिक रिजल्ट 2025&quot; लिंक पर क्लिक करें</li>
            <li>अपना रोल कोड और रोल नंबर दर्ज करें</li>
            <li>&quot;सबमिट&quot; बटन पर क्लिक करें</li>
            <li>आपका रिजल्ट स्क्रीन पर दिखाई देगा</li>
            <li>भविष्य के लिए रिजल्ट का प्रिंटआउट लें</li>
          </ol>
        </div>

        <div className="w-full bg-white p-6 rounded-lg shadow-md mb-6">
          <h2 className="text-2xl font-semibold mb-4 text-[#014F59]">महत्वपूर्ण निर्देश</h2>
          <ul className="list-disc pl-6 space-y-2 text-gray-700">
            <li>अपना रोल नंबर और रजिस्ट्रेशन नंबर तैयार रखें</li>
            <li>रिजल्ट पेज का स्क्रीनशॉट या डाउनलोड करें</li>
            <li>किसी भी विसंगति के मामले में, अपने स्कूल या BSEB अधिकारियों से संपर्क करें</li>
            <li>रिजल्ट अस्थायी है जब तक कि मूल मार्कशीट जारी नहीं की जाती</li>
          </ul>
        </div>

        <div className="w-full bg-white p-6 rounded-lg shadow-md mb-6">
          <h2 className="text-2xl font-semibold mb-4 text-[#014F59]">टॉपर्स लिस्ट</h2>
          <p className="text-gray-700 mb-4">टॉपर्स लिस्ट रिजल्ट के साथ जारी की जाएगी</p>
          <ul className="list-disc pl-6 space-y-2 text-gray-700">
            <li>प्रथम स्थान: जल्द घोषित किया जाएगा</li>
            <li>द्वितीय स्थान: जल्द घोषित किया जाएगा</li>
            <li>तृतीय स्थान: जल्द घोषित किया जाएगा</li>
          </ul>
        </div>
      </div>
      <Footer />
    </>
  );
}