import React from "react";

const CarouselDetailHolder = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-center items-center">
      {/* Skeleton for image slider */}
      <div className="w-1/2 p-4">
        <div className="h-96 bg-gray-300 animate-pulse"></div>
      </div>

      {/* Skeleton for card with list of text */}
      <div className="w-1/2 p-4">
        <div className="bg-white border border-gray-200 p-4 rounded-lg w-full">
          <div className="flex items-center mb-4">
            <div className="h-10 w-10 bg-gray-300 rounded-full mr-4"></div>
            <div className="h-4 w-1/2 bg-gray-300 rounded"></div>
          </div>
          <div className="mb-4">
            <div className="h-4 w-full bg-gray-300 rounded mb-2"></div>
            <div className="h-4 w-full bg-gray-300 rounded mb-2"></div>
            <div className="h-4 w-3/4 bg-gray-300 rounded mb-2"></div>
          </div>
          <div>
            <div className="h-4 w-full bg-gray-300 rounded mb-2"></div>
            <div className="h-4 w-full bg-gray-300 rounded mb-2"></div>
            <div className="h-4 w-3/4 bg-gray-300 rounded mb-2"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CarouselDetailHolder;
