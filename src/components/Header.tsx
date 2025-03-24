import Link from "next/link";

export default function Header() {
  return (
    <header className="bg-white shadow-md">
      <div className="container mx-auto px-4 py-2">
        {/* Top Section with Logo */}
        <div className="flex flex-col items-center py-2 border-b border-gray-200">
          <h1 className="text-3xl font-bold text-red-600">SARKARI RESULT</h1>
          <p className="text-sm text-gray-600">WWW.SARKARIRESULT.COM</p>
        </div>

        {/* Navigation Menu */}
        <nav className="flex flex-wrap justify-center gap-4 py-3">
          <Link href="/" className="text-blue-600 hover:text-blue-800 font-medium">Home</Link>
          <Link href="/latest-jobs" className="text-blue-600 hover:text-blue-800 font-medium">Latest Jobs</Link>
          <Link href="/results" className="text-blue-600 hover:text-blue-800 font-medium">Results</Link>
          <Link href="/admit-card" className="text-blue-600 hover:text-blue-800 font-medium">Admit Card</Link>
          <Link href="/answer-key" className="text-blue-600 hover:text-blue-800 font-medium">Answer Key</Link>
          <Link href="/syllabus" className="text-blue-600 hover:text-blue-800 font-medium">Syllabus</Link>
          <Link href="/search" className="text-blue-600 hover:text-blue-800 font-medium">Search</Link>
          <Link href="/contact-us" className="text-blue-600 hover:text-blue-800 font-medium">Contact Us</Link>
        </nav>
      </div>
    </header>
  );
}
