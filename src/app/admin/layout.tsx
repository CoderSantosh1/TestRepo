'use client';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen  ">
      <nav className="bg-white  shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex">
              <div className="flex-shrink-0 flex items-center">
                <span className="text-xl font-bold text-gray-900 dark:text-white">Admin Panel</span>
              </div>
              <div className="hidden sm:ml-6 sm:flex sm:space-x-8 mt-4">
                <a
                  href="/admin"
                  className="text-gray-900 dark:text-white hover:text-blue-500 px-3 py-2 rounded-md text-sm font-medium"
                >
                  Admit Cards
                </a>
                <a
                  href="/admin"
                  className="text-gray-900 dark:text-white hover:text-blue-500 px-3 py-2 rounded-md text-sm font-medium"
                >
                  Jobs
                </a>
                <a
                  href="/admin"
                  className="text-gray-900 dark:text-white hover:text-blue-500 px-3 py-2 rounded-md text-sm font-medium"
                >
                  Results
                </a>
                <a
                  href="/admin"
                  className="text-gray-900 dark:text-white hover:text-blue-500 px-3 py-2 rounded-md text-sm font-medium"
                >
                  News
                </a>
              </div>
            </div>
          </div>
        </div>
      </nav>
      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">{children}</main>
    </div>
  );
}

export const dynamic = 'force-dynamic';