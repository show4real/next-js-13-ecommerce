import Link from "next/link";

export default function ProductMiss() {
  return (
    <div className="flex items-center justify-center min-h-[60vh] px-4">
      <div className="text-center max-w-md mx-auto">
        <div className="mb-8">
          <div className="w-24 h-24 mx-auto bg-gradient-to-br from-indigo-100 to-indigo-200 rounded-full flex items-center justify-center mb-6">
            <svg 
              className="w-12 h-12 text-indigo-600" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth="2" 
                d="M9.172 16.172a4 4 0 015.656 0M9 12h6m-6-4h6m2 5.291A7.962 7.962 0 0112 15c-2.34 0-4.467-.881-6.08-2.33"
              />
            </svg>
          </div>
          
          <h1 className="text-6xl font-black text-gray-200 mb-4 select-none">
            404
          </h1>
          
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            Product Not Found
          </h2>
          
          <p className="text-gray-600 mb-8 leading-relaxed">
            Sorry, we could not find the product you are looking for. It might have been moved or is no longer available.
          </p>
        </div>

        <div className="space-y-4">
          <Link
            href="/products"
            className="inline-flex items-center justify-center px-6 py-3 text-base font-medium text-white bg-gradient-to-r from-indigo-600 to-indigo-700 rounded-lg shadow-lg hover:from-indigo-700 hover:to-indigo-800 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transform transition-all duration-200 hover:scale-105"
          >
            <svg 
              className="w-5 h-5 mr-2" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth="2" 
                d="M19 11H5m0 0l4-4m-4 4l4 4"
              />
            </svg>
            Browse All Products
          </Link>
          
          <Link
            href="/"
            className="block px-6 py-3 text-base font-medium text-gray-700 bg-white border border-gray-300 rounded-lg shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition-all duration-200"
          >
            Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
}