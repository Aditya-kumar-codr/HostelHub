import React from 'react';
import { Home, AlertCircle, Shirt, CreditCard } from 'lucide-react';

const DashboardOverview = ({ profileData, setActiveTab }) => {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-800">
        Welcome back, {profileData?.name ? profileData.name.split(' ')[0] : 'Student'}
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Summary Cards */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500">Room Status</p>
              <p className="text-xl font-bold text-gray-900 mt-1">Room 514, Block B</p>
            </div>
            <div className="p-3 bg-blue-50 text-blue-600 rounded-lg">
              <Home className="w-6 h-6" />
            </div>
          </div>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500">Open Complaints</p>
              <p className="text-2xl font-bold text-gray-900 mt-1">0</p>
            </div>
            <div className="p-3 bg-red-50 text-red-600 rounded-lg">
              <AlertCircle className="w-6 h-6" />
            </div>
          </div>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500">Laundry used</p>
              <p className="text-2xl font-bold text-gray-900 mt-1">5 Times</p>
            </div>
            <div className="p-3 bg-purple-50 text-purple-600 rounded-lg">
              <Shirt className="w-6 h-6" />
            </div>
          </div>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500">Your Current due</p>
              <p className="text-2xl font-bold text-gray-900 mt-1">50000</p>
            </div>
            <div className="p-3 bg-green-50 text-green-600 rounded-lg">
              <CreditCard className="w-6 h-6" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardOverview;
