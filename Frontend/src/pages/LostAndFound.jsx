import React from 'react';
import { Search, PlusCircle } from 'lucide-react';

const LostAndFound = () => {
  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Lost & Found</h1>
          <p className="text-gray-500 mt-1 text-sm">Report lost items or find what you've misplaced.</p>
        </div>
        <button className="flex items-center space-x-2 bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg transition-colors">
          <PlusCircle className="w-4 h-4" />
          <span className="text-sm font-medium">Report Item</span>
        </button>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-8 text-center min-h-[400px] flex flex-col items-center justify-center">
        <div className="bg-indigo-50 w-16 h-16 rounded-full flex items-center justify-center mb-4">
          <Search className="w-8 h-8 text-indigo-600" />
        </div>
        <h3 className="text-lg font-medium text-gray-900">No items reported yet</h3>
        <p className="text-gray-500 mt-2 max-w-sm">
          Lost something? Check back later or report a new lost item. Found items will also appear here.
        </p>
      </div>
    </div>
  );
};

export default LostAndFound;
