import React from 'react';
import { Home, AlertCircle, Shirt, CreditCard, Utensils, Megaphone } from 'lucide-react';

const DashboardOverview = ({ profileData, setActiveTab }) => {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-800">Welcome back, {profileData.name.split(' ')[0]}</h2>
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

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-8">
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <h3 className="text-lg font-bold text-gray-800 mb-4">Recent Activity</h3>
          <div className="space-y-4">
            <div className="flex items-start space-x-4 pb-4 border-b border-gray-50">
              <div className="p-2 bg-yellow-50 text-yellow-600 rounded-lg"><Utensils className="w-5 h-5" /></div>
              <div>
                <p className="text-sm font-medium text-gray-900">Rated Dinner</p>
                <p className="text-xs text-gray-500">Today at 8:30 PM</p>
              </div>
            </div>
            <div className="flex items-start space-x-4 pb-4 border-b border-gray-50">
              <div className="p-2 bg-blue-50 text-blue-600 rounded-lg"><Shirt className="w-5 h-5" /></div>
              <div>
                <p className="text-sm font-medium text-gray-900">Laundry load completed</p>
                <p className="text-xs text-gray-500">Yesterday at 2:15 PM</p>
              </div>
            </div>
          </div>
        </div>

        {/* Announcements Section */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-bold text-gray-800 flex items-center gap-2">
               <Megaphone className="w-5 h-5 text-indigo-600" />
               Announcements
            </h3>
            <button onClick={() => setActiveTab('announcements')} className="text-sm text-indigo-600 hover:text-indigo-800 font-medium">View All</button>
          </div>
          <div className="space-y-4">
            <div className="p-4 border border-blue-100 bg-blue-50 rounded-lg border-l-4 border-l-blue-500">
              <div className="flex justify-between items-start">
                <h4 className="font-bold text-blue-900 leading-tight">Mandatory Hostel Meeting</h4>
                <span className="text-[10px] bg-blue-100 text-blue-700 px-2 py-0.5 rounded-full font-bold ml-2 shrink-0">NEW</span>
              </div>
              <p className="text-sm text-blue-800 mt-1">Common hall, Friday at 6:00 PM.</p>
              <p className="text-xs text-blue-600 mt-2">Posted 2 hours ago</p>
            </div>
            <div className="p-4 border border-gray-100 rounded-lg">
              <h4 className="font-bold text-gray-800">Water Supply Maintenance</h4>
              <p className="text-sm text-gray-600 mt-1">Interrupted tomorrow 10 AM to 2 PM.</p>
              <p className="text-xs text-gray-500 mt-2">Posted yesterday</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardOverview;
