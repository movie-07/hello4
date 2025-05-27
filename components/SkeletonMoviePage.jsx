// components/SkeletonMoviePage.js
import React from 'react';

const SkeletonMoviePage = () => (
  <div className="w-8/12 mx-auto mt-8 space-y-4 animate-pulse">
    <div className="h-8 bg-gray-300 rounded w-1/2"></div>
    <div className="h-64 bg-gray-300 rounded"></div>
    <div className="h-4 bg-gray-300 rounded w-3/4"></div>
    <div className="h-4 bg-gray-300 rounded w-1/2"></div>
    <div className="h-4 bg-gray-300 rounded w-1/3"></div>
    <div className="h-10 bg-gray-300 rounded w-1/4"></div>
    <div className="mt-10">
      <div className="h-6 bg-gray-300 rounded w-1/3 mb-4"></div>
      <div className="grid grid-cols-2 gap-4">
        {[...Array(4)].map((_, i) => (
          <div key={i} className="border rounded-md p-2">
            <div className="h-36 bg-gray-300 rounded"></div>
            <div className="h-4 bg-gray-300 rounded w-3/4 mt-2"></div>
          </div>
        ))}
      </div>
    </div>
  </div>
);

export default SkeletonMoviePage;
