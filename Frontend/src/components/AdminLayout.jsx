import React, { useState } from 'react';
import {
  Users,
  Utensils,
  Megaphone,
  AlertCircle,
  CreditCard,
  Search,
  Menu,
  Bell,
  ShieldCheck,
  User
} from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';

const AdminLayout = ({ children, title }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const location = useLocation();

  const navigation = [
    { path: '/admin-dashboard', name: 'Students Directory', icon: Users },
    { path: '/admin-food', name: 'Food & Meals', icon: Utensils },
    { path: '/admin-announcements', name: 'Announcements', icon: Megaphone },
    { path: '/admin-complaints', name: 'Complaints Resolve', icon: AlertCircle },
    { path: '/admin-expenses', name: 'Student Expenses', icon: CreditCard },
    { path: '/admin-lost-found', name: 'Lost & Found', icon: Search },
  ];

  return (
    <div className="min-h-screen bg-gray-50 flex font-sans">
      {/* Sidebar Navigation */}
      <aside
        className={`${isSidebarOpen ? 'w-64' : 'w-20'} bg-gray-900 text-white transition-all duration-300 ease-in-out fixed md:relative z-30 h-full hidden md:block shadow-xl`}
      >
        <div className="h-full flex flex-col">
          <div className="h-16 flex items-center justify-between px-4 border-b border-gray-800">
            <Link to="/" className={`font-bold text-xl text-indigo-400 flex items-center gap-2 ${!isSidebarOpen && 'hidden'}`}>
              <ShieldCheck size={20} className="text-indigo-400" /> Admin
            </Link>
            <button onClick={() => setIsSidebarOpen(!isSidebarOpen)} className="p-2 rounded-lg hover:bg-gray-800 text-gray-400 transition-colors">
              <Menu className="w-5 h-5" />
            </button>
          </div>
          <nav className="flex-1 px-3 py-6 space-y-2 overflow-y-auto">
            {navigation.map((item) => {
              const Icon = item.icon;
              const isActive = location.pathname === item.path;
              return (
                <Link
                  to={item.path}
                  key={item.path}
                  className={`w-full flex items-center px-3 py-3 rounded-xl transition-colors ${isActive
                    ? 'bg-indigo-600 text-white shadow-md'
                    : 'text-gray-400 hover:bg-gray-800 hover:text-white'
                    }`}
                  title={!isSidebarOpen ? item.name : ""}
                >
                  <Icon className={`w-5 h-5 ${isActive ? 'text-white' : 'text-gray-400'}`} />
                  {isSidebarOpen && <span className="ml-3 font-medium text-sm whitespace-nowrap">{item.name}</span>}
                </Link>
              );
            })}
          </nav>
          <div className="p-4 border-t border-gray-800">
            <div className={`flex items-center px-3 py-3 rounded-xl text-gray-400 hover:bg-gray-800 transition-colors cursor-pointer ${!isSidebarOpen && 'justify-center'}`}>
              <User className="w-5 h-5" />
              {isSidebarOpen && <span className="ml-3 font-medium text-sm whitespace-nowrap">Admin Profile</span>}
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col min-w-0">
        {/* Top Navbar */}
        <header className="bg-white h-16 border-b border-gray-200 flex items-center justify-between px-4 md:px-8 relative shadow-sm z-20">
          <div className="flex items-center md:hidden">
            <button className="p-2 -ml-2 mr-2 text-gray-500 hover:bg-gray-100 rounded-md">
              <Menu className="h-6 w-6" aria-hidden="true" />
            </button>
          </div>

          <div className="absolute left-1/2 transform -translate-x-1/2 flex items-center gap-2 md:hidden">
            <div className="bg-indigo-600 p-1.5 rounded-lg text-white shadow-sm">
              <ShieldCheck size={18} />
            </div>
            <span className="text-lg font-bold text-gray-900 tracking-tight">
              HostelHub Admin
            </span>
          </div>

          <div className="hidden md:block">
            {title && <h1 className="text-xl font-bold text-gray-800">{title}</h1>}
          </div>

          <div className="flex-1 md:hidden" />
          <div className="flex items-center space-x-4 md:space-x-6 mr-2">
            <button className="relative p-2 text-gray-400 hover:text-gray-600 transition-colors rounded-full hover:bg-gray-100">
              <Bell className="h-5 w-5" />
              <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
            </button>
            <div className="flex items-center gap-3 cursor-pointer pl-4 border-l border-gray-200 group">
              <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-indigo-600 to-purple-600 flex items-center justify-center text-white font-bold shadow-sm group-hover:scale-105 transition-transform">
                A
              </div>
              <div className="hidden md:block text-sm">
                <p className="font-bold text-gray-900 leading-tight">Admin User</p>
                <p className="text-[11px] font-medium text-gray-500">Manager</p>
              </div>
            </div>
          </div>
        </header>

        {/* Dashboard Content */}
        <div className="flex-1 overflow-auto p-4 md:p-6 lg:p-8 bg-gray-50">
          <div className="max-w-7xl mx-auto space-y-6">
            <div className="md:hidden mb-4">
              {title && <h1 className="text-2xl font-bold text-gray-800">{title}</h1>}
            </div>
            {children}
          </div>
        </div>
      </main>
    </div>
  );
};

export default AdminLayout;
