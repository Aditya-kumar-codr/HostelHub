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
    <div className="min-h-screen flex bg-gradient-to-br from-slate-50 via-indigo-50 to-purple-100">
      
      <aside
        className={`${isSidebarOpen ? 'w-64' : 'w-20'} bg-white/70 backdrop-blur-xl border-r border-white/30 shadow-xl shadow-indigo-100 transition-all duration-300 ease-in-out fixed md:relative z-20 h-full hidden md:block`}
      >
        <div className="h-full flex flex-col">
          <div className="h-16 flex items-center justify-between px-4 border-b border-white/20">
            <Link to="/" className={`font-bold text-xl text-indigo-600 ${!isSidebarOpen && 'hidden'}`}>
              HostelHub
            </Link>
            <button
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
              className="p-2 rounded-lg hover:bg-white/50 text-gray-500 transition-all"
            >
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
                  className={`w-full flex items-center px-3 py-3 rounded-xl transition-all duration-300 ${
                    isActive
                      ? 'bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white shadow-lg shadow-indigo-300 scale-[1.05]'
                      : 'text-gray-600 hover:bg-white/60 hover:backdrop-blur-md hover:scale-[1.02] hover:shadow-md hover:text-gray-900'
                  }`}
                  title={!isSidebarOpen ? item.name : ""}
                >
                  <Icon className={`w-5 h-5 ${isActive ? 'text-white' : 'text-gray-400'}`} />
                  {isSidebarOpen && (
                    <span className="ml-3 font-medium text-sm">{item.name}</span>
                  )}
                </button>
              );
            })}
          </nav>

          <div className="p-4 border-t border-white/20">
            <div
              className={`flex items-center px-3 py-3 rounded-xl text-gray-600 hover:bg-white/60 hover:shadow-md transition-all cursor-pointer ${
                !isSidebarOpen && 'justify-center'
              }`}
            >
              <User className="w-5 h-5 text-gray-400" />
              {isSidebarOpen && (
                <span className="ml-3 font-medium text-sm">My Profile</span>
              )}
            </div>
          </div>
        </div>
      </aside>

      <main className="flex-1 flex flex-col min-w-0">
        
        <header className="h-16 bg-white/70 backdrop-blur-xl border-b border-white/30 shadow-sm shadow-indigo-100 flex items-center justify-between px-4 md:px-8">
          
          <div className="flex items-center md:hidden">
            <button className="p-2 -ml-2 mr-2 text-gray-500 rounded-md">
              <Menu className="h-6 w-6" />
            </button>
            <Link to="/" className="font-bold text-lg text-indigo-600">
              HostelHub
            </Link>
          </div>

          <div className="flex-1" />

          <div className="flex items-center space-x-6 mr-2">
            
            <button className="flex flex-col items-center text-gray-500 hover:text-indigo-600 transition-all duration-300 bg-white/60 backdrop-blur-md px-3 py-2 rounded-xl shadow-sm hover:shadow-lg hover:scale-110 hover:-translate-y-1">
              <Bell className="h-6 w-6" />
              <span className="text-[10px] font-medium mt-0.5">Notification</span>
            </button>

            <div className="flex flex-col items-center cursor-pointer text-gray-500 hover:text-pink-500 transition-all duration-300 bg-white/60 backdrop-blur-md px-3 py-2 rounded-xl shadow-sm hover:shadow-lg hover:scale-110 hover:-translate-y-1">
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
