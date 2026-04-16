import React, { useState } from 'react';
import {
  LayoutDashboard,
  Users,
  Utensils,
  Megaphone,
  AlertCircle,
  CreditCard,
  Search,
  Menu,
  Bell,
  User,
  ShieldCheck
} from 'lucide-react';
import { Link } from 'react-router-dom';

// Stub components for Admin
const AdminDashboardOverview = () => (
  <div className="p-6 bg-white rounded-xl shadow-sm border border-gray-100">
    <h2 className="text-xl font-bold text-gray-800 mb-4">Admin Overview</h2>
    <p className="text-gray-600">Welcome to the Admin Dashboard. Select a tab from the sidebar to manage hostel operations.</p>
  </div>
);

const AdminStudentsData = () => (
  <div className="p-6 bg-white rounded-xl shadow-sm border border-gray-100">
    <h2 className="text-xl font-bold text-gray-800 mb-4">Students Data</h2>
    <p className="text-gray-600">View and manage all registered students in the hostel.</p>
  </div>
);

const AdminFoodAndMeals = () => (
  <div className="p-6 bg-white rounded-xl shadow-sm border border-gray-100">
    <h2 className="text-xl font-bold text-gray-800 mb-4">Food and Meals</h2>
    <p className="text-gray-600">Manage daily menus, view food reviews, and monitor mess operations.</p>
  </div>
);

const AdminAnnouncements = () => (
  <div className="p-6 bg-white rounded-xl shadow-sm border border-gray-100">
    <h2 className="text-xl font-bold text-gray-800 mb-4">Announcements</h2>
    <p className="text-gray-600">Post new announcements to all students.</p>
  </div>
);

const AdminComplaints = () => (
  <div className="p-6 bg-white rounded-xl shadow-sm border border-gray-100">
    <h2 className="text-xl font-bold text-gray-800 mb-4">Complaints Resolve</h2>
    <p className="text-gray-600">Review and resolve student complaints regarding room, electricity, plumbing, etc.</p>
  </div>
);

const AdminExpenses = () => (
  <div className="p-6 bg-white rounded-xl shadow-sm border border-gray-100">
    <h2 className="text-xl font-bold text-gray-800 mb-4">Expense of Students</h2>
    <p className="text-gray-600">Track fee deposits, pending dues, and overall student expenses.</p>
  </div>
);

const AdminLostAndFound = () => (
  <div className="p-6 bg-white rounded-xl shadow-sm border border-gray-100">
    <h2 className="text-xl font-bold text-gray-800 mb-4">Lost and Found</h2>
    <p className="text-gray-600">Manage reported lost items and update found item statuses.</p>
  </div>
);


const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard': return <AdminDashboardOverview />;
      case 'students': return <AdminStudentsData />;
      case 'food': return <AdminFoodAndMeals />;
      case 'announcements': return <AdminAnnouncements />;
      case 'complaints': return <AdminComplaints />;
      case 'expenses': return <AdminExpenses />;
      case 'lost-found': return <AdminLostAndFound />;
      default: return <AdminDashboardOverview />;
    }
  };

  const navigation = [
    { id: 'dashboard', name: 'Dashboard', icon: LayoutDashboard },
    { id: 'students', name: 'Students Data', icon: Users },
    { id: 'food', name: 'Food & Meals', icon: Utensils },
    { id: 'announcements', name: 'Announcements', icon: Megaphone },
    { id: 'complaints', name: 'Complaints Resolve', icon: AlertCircle },
    { id: 'expenses', name: 'Student Expenses', icon: CreditCard },
    { id: 'lost-found', name: 'Lost & Found', icon: Search },
  ];

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar Navigation */}
      <aside
        className={`${isSidebarOpen ? 'w-64' : 'w-20'} bg-gray-900 text-white transition-all duration-300 ease-in-out fixed md:relative z-20 h-full hidden md:block shadow-xl`}
      >
        <div className="h-full flex flex-col">
          <div className="h-16 flex items-center justify-between px-4 border-b border-gray-800">
            <Link to="/" className={`font-bold text-xl text-indigo-400 ${!isSidebarOpen && 'hidden'}`}>Admin Panel</Link>
            <button onClick={() => setIsSidebarOpen(!isSidebarOpen)} className="p-2 rounded-lg hover:bg-gray-800 text-gray-400">
              <Menu className="w-5 h-5" />
            </button>
          </div>
          <nav className="flex-1 px-3 py-6 space-y-2 overflow-y-auto">
            {navigation.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  className={`w-full flex items-center px-3 py-3 rounded-xl transition-colors ${isActive
                    ? 'bg-indigo-600 text-white'
                    : 'text-gray-400 hover:bg-gray-800 hover:text-white'
                    }`}
                  title={!isSidebarOpen ? item.name : ""}
                >
                  <Icon className={`w-5 h-5 ${isActive ? 'text-white' : 'text-gray-400'}`} />
                  {isSidebarOpen && <span className="ml-3 font-medium text-sm">{item.name}</span>}
                </button>
              );
            })}
          </nav>
          <div className="p-4 border-t border-gray-800">
            <div className={`flex items-center px-3 py-3 rounded-xl text-gray-400 hover:bg-gray-800 transition-colors cursor-pointer ${!isSidebarOpen && 'justify-center'}`}>
              <User className="w-5 h-5" />
              {isSidebarOpen && <span className="ml-3 font-medium text-sm">Admin Profile</span>}
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col min-w-0">
        {/* Top Navbar */}
        <header className="bg-white h-16 border-b border-gray-200 flex items-center justify-between px-4 md:px-8 relative shadow-sm z-10">
          <div className="flex items-center md:hidden">
            <button className="p-2 -ml-2 mr-2 text-gray-500 hover:bg-gray-100 rounded-md">
              <Menu className="h-6 w-6" aria-hidden="true" />
            </button>
          </div>
          
          <div className="absolute left-1/2 transform -translate-x-1/2 flex items-center gap-2">
              <div className="bg-indigo-600 p-1.5 rounded-lg text-white shadow-sm">
                  <ShieldCheck size={18} />
              </div>
              <span className="text-lg font-bold text-gray-900 tracking-tight">
                  HostelHub Admin
              </span>
          </div>

          <div className="flex-1" />
          <div className="flex items-center space-x-4 md:space-x-6 mr-2">
            <button className="relative p-2 text-gray-400 hover:text-gray-600 transition-colors rounded-full hover:bg-gray-100">
              <Bell className="h-5 w-5" />
              <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
            </button>
            <div className="flex items-center gap-3 cursor-pointer pl-4 border-l border-gray-200">
              <div className="w-8 h-8 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600 font-bold">
                A
              </div>
              <div className="hidden md:block text-sm">
                <p className="font-medium text-gray-900">Admin User</p>
                <p className="text-xs text-gray-500">Manager</p>
              </div>
            </div>
          </div>
        </header>

        {/* Dashboard Content */}
        <div className="flex-1 overflow-auto p-4 md:p-8 bg-gray-50">
          {renderContent()}
        </div>
      </main>
    </div>
  );
};

export default AdminDashboard;
