import React, { useState } from 'react';
import {
  LayoutDashboard,
  AlertCircle,
  Shirt,
  Utensils,
  CreditCard,
  Menu,
  Bell,
  User,
  Megaphone,
  Search
} from 'lucide-react';
import { Link } from 'react-router-dom';
import DashboardOverview from './DashboardOverview';
import Announcements from './Announcements';
import Complaints from './Complaints';
import Laundry from './Laundry';
import FoodReviews from './FoodReviews';
import LostAndFound from './LostAndFound';

const StudentDashboard = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const dummyProfileData = {
    name: 'Student Name',
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return <DashboardOverview profileData={dummyProfileData} setActiveTab={setActiveTab} />;
      case 'announcements':
        return <Announcements />;
      case 'complaints':
        return <Complaints />;
      case 'laundry':
        return <Laundry />;
      case 'lost-found':
        return <LostAndFound />;
      case 'food':
        return <FoodReviews />;
      default:
        return null;
    }
  };

  const navigation = [
    { id: 'dashboard', name: 'Dashboard', icon: LayoutDashboard },
    { id: 'announcements', name: 'Announcements', icon: Megaphone },
    { id: 'complaints', name: 'Complaints', icon: AlertCircle },
    { id: 'laundry', name: 'Laundry', icon: Shirt },
    { id: 'lost-found', name: 'Lost & Found', icon: Search },
    { id: 'food', name: 'Food Reviews', icon: Utensils },
    { id: 'expenses', name: 'Expenses', icon: CreditCard },
  ];


  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar */}
      <aside
        className={`${isSidebarOpen ? 'w-64' : 'w-20'} bg-white border-r border-gray-200 transition-all duration-300 ease-in-out fixed md:relative z-20 h-full hidden md:block`}
      >
        <div className="h-full flex flex-col">
          <div className="h-16 flex items-center justify-between px-4 border-b border-gray-100">
            <Link to="/" className={`font-bold text-xl text-indigo-600 ${!isSidebarOpen && 'hidden'}`}>HostelHub</Link>
            <button onClick={() => setIsSidebarOpen(!isSidebarOpen)} className="p-2 rounded-lg hover:bg-gray-100 text-gray-500">
              <Menu className="w-5 h-5" />
            </button>
          </div>
          <nav className="flex-1 px-3 py-6 space-y-2">
            {navigation.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  className={`w-full flex items-center px-3 py-3 rounded-xl transition-colors ${isActive
                    ? 'bg-indigo-50 text-indigo-600'
                    : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                    }`}
                  title={!isSidebarOpen ? item.name : ""}
                >
                  <Icon className={`w-5 h-5 ${isActive ? 'text-indigo-600' : 'text-gray-400'}`} />
                  {isSidebarOpen && <span className="ml-3 font-medium text-sm">{item.name}</span>}
                </button>
              );
            })}
          </nav>
          <div className="p-4 border-t border-gray-100">
            <div className={`flex items-center px-3 py-3 rounded-xl text-gray-600 hover:bg-gray-50 transition-colors cursor-pointer ${!isSidebarOpen && 'justify-center'}`}>
              <User className="w-5 h-5 text-gray-400" />
              {isSidebarOpen && <span className="ml-3 font-medium text-sm">My Profile</span>}
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col min-w-0">
        {/* Mobile Header */}
        <header className="bg-white h-16 border-b border-gray-200 flex items-center justify-between px-4 md:px-8">
          <div className="flex items-center md:hidden">
            <button className="p-2 -ml-2 mr-2 text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500 rounded-md">
              <Menu className="h-6 w-6" aria-hidden="true" />
            </button>
            <Link to="/" className="font-bold text-lg text-indigo-600">HostelHub</Link>
          </div>
          <div className="flex-1" />
          <div className="flex items-center space-x-6 mr-2">
            <button className="flex flex-col items-center text-gray-400 hover:text-gray-600 transition-colors">
              <Bell className="h-6 w-6" />
              <span className="text-[10px] font-medium mt-0.5">Notification</span>
            </button>
            <div className="flex flex-col items-center cursor-pointer text-gray-400 hover:text-gray-600 transition-colors">
              <User className="h-6 w-6" />
              <span className="text-[10px] font-medium mt-0.5">Profile</span>
            </div>
          </div>
        </header>

        <div className="flex-1 overflow-auto p-4 md:p-8">
          {renderContent()}
        </div>
      </main>
    </div>
  );
};

export default StudentDashboard;
