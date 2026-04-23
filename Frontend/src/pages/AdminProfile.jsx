import React, { useState } from 'react';
import { User, Mail, Phone, Shield, Key, Save, Edit2, Building, Calendar, Clock, LogOut } from 'lucide-react';
import { auth } from '../firebase';
import { useNavigate } from 'react-router-dom';

const AdminProfile = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [activeTab, setActiveTab] = useState('personal');
  const navigate = useNavigate();

  const [profileData, setProfileData] = useState({
    name: 'Admin User',
    email: 'admin@hostelhub.com',
    phone: '+91 9876543210',
    role: 'Hostel Manager',
    department: 'Hostel Administration',
    employeeId: 'ADM-2024-001',
    joinDate: 'Jan 15, 2022',
  });

  const handleSave = () => {
    setIsEditing(false);
    alert('Profile updated successfully!');
  };

  const handleLogout = async () => {
    try {
      localStorage.removeItem('adminAuth');
      await auth.signOut();
      navigate('/');
    } catch (err) {
      console.error('Logout failed:', err);
    }
  };

  const tabs = [
    { id: 'personal', label: 'Profile Info', icon: User },
  ];

  const renderContent = () => {
    switch (activeTab) {
      case 'personal':
        return (
          <div className="space-y-6">
            {/* Admin Info Card */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 md:p-8">
              <h3 className="text-lg font-semibold text-gray-900 flex items-center mb-6 pb-2 border-b border-gray-50">
                <User className="w-5 h-5 mr-2 text-indigo-500" /> Personal Information
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                  <input
                    type="text"
                    disabled={!isEditing}
                    className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-lg focus:bg-white focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 outline-none transition-all disabled:opacity-70 disabled:cursor-not-allowed text-gray-900 font-medium"
                    value={profileData.name}
                    onChange={(e) => setProfileData({ ...profileData, name: e.target.value })}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
                  <input
                    type="email"
                    disabled={!isEditing}
                    className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-lg focus:bg-white focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 outline-none transition-all disabled:opacity-70 disabled:cursor-not-allowed text-gray-900 font-medium"
                    value={profileData.email}
                    onChange={(e) => setProfileData({ ...profileData, email: e.target.value })}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
                  <input
                    type="tel"
                    disabled={!isEditing}
                    className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-lg focus:bg-white focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 outline-none transition-all disabled:opacity-70 disabled:cursor-not-allowed text-gray-900 font-medium"
                    value={profileData.phone}
                    onChange={(e) => setProfileData({ ...profileData, phone: e.target.value })}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Role</label>
                  <input
                    type="text"
                    disabled={!isEditing}
                    className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-lg focus:bg-white focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 outline-none transition-all disabled:opacity-70 disabled:cursor-not-allowed text-gray-900 font-medium"
                    value={profileData.role}
                    onChange={(e) => setProfileData({ ...profileData, role: e.target.value })}
                  />
                </div>
              </div>
            </div>

            {/* Work Info Card */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 md:p-8">
              <h3 className="text-lg font-semibold text-gray-900 flex items-center mb-6 pb-2 border-b border-gray-50">
                <Building className="w-5 h-5 mr-2 text-indigo-500" /> Work Information
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Department</label>
                  <input
                    type="text"
                    disabled={!isEditing}
                    className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-lg focus:bg-white focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 outline-none transition-all disabled:opacity-70 disabled:cursor-not-allowed text-gray-900 font-medium"
                    value={profileData.department}
                    onChange={(e) => setProfileData({ ...profileData, department: e.target.value })}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Employee ID</label>
                  <input
                    type="text"
                    disabled={!isEditing}
                    className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-lg focus:bg-white focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 outline-none transition-all disabled:opacity-70 disabled:cursor-not-allowed text-gray-900 font-medium"
                    value={profileData.employeeId}
                    onChange={(e) => setProfileData({ ...profileData, employeeId: e.target.value })}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Date of Joining</label>
                  <input
                    type="text"
                    disabled={!isEditing}
                    className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-lg focus:bg-white focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 outline-none transition-all disabled:opacity-70 disabled:cursor-not-allowed text-gray-900 font-medium"
                    value={profileData.joinDate}
                    onChange={(e) => setProfileData({ ...profileData, joinDate: e.target.value })}
                  />
                </div>
              </div>
            </div>

            {/* Logout */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 md:p-8">
              <h3 className="text-lg font-semibold text-gray-900 flex items-center mb-4 pb-2 border-b border-gray-50">
                <Shield className="w-5 h-5 mr-2 text-red-500" /> Account
              </h3>
              <p className="text-sm text-gray-500 mb-4">Sign out of your admin account on this device.</p>
              <button
                onClick={handleLogout}
                className="flex items-center gap-2 bg-red-50 text-red-600 font-bold text-sm px-5 py-2.5 rounded-xl border border-red-200 hover:bg-red-100 transition-colors"
              >
                <LogOut size={16} />
                Sign Out
              </button>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="max-w-5xl mx-auto space-y-6">
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Admin Profile</h1>
          <p className="text-gray-500 mt-1 text-sm">Manage your admin account and settings.</p>
        </div>
        {activeTab === 'personal' && (
          !isEditing ? (
            <button
              onClick={() => setIsEditing(true)}
              className="flex items-center space-x-2 bg-white border border-gray-200 text-gray-700 hover:bg-gray-50 px-4 py-2 rounded-lg transition-colors shadow-sm"
            >
              <Edit2 className="w-4 h-4" />
              <span className="text-sm font-medium">Edit Profile</span>
            </button>
          ) : (
            <button
              onClick={handleSave}
              className="flex items-center space-x-2 bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg transition-colors shadow-sm"
            >
              <Save className="w-4 h-4" />
              <span className="text-sm font-medium">Save Changes</span>
            </button>
          )
        )}
      </div>

      {/* Layout */}
      <div className="flex flex-col lg:flex-row gap-6">
        {/* Left Sidebar */}
        <div className="lg:w-1/3 flex flex-col gap-6">
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden text-center relative pb-6">
            <div className="h-28 bg-gradient-to-r from-indigo-600 via-violet-600 to-purple-600"></div>
            <div className="relative -mt-14 inline-block mb-3">
              <div className="w-28 h-28 rounded-full border-4 border-white shadow-sm bg-gradient-to-tr from-indigo-600 to-purple-600 flex items-center justify-center text-white text-4xl font-black mx-auto">
                {profileData.name.charAt(0)}
              </div>
            </div>
            <h2 className="text-xl font-bold text-gray-900">{profileData.name}</h2>
            <p className="text-gray-500 text-sm mt-1">{profileData.email}</p>
            <div className="inline-flex items-center justify-center mt-3 bg-indigo-50 text-indigo-700 px-3 py-1 rounded-full text-xs font-semibold gap-1">
              <Shield size={12} />
              {profileData.role}
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
            <div className="p-2 space-y-1">
              {tabs.map((tab) => {
                const Icon = tab.icon;
                const isActive = activeTab === tab.id;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`w-full flex items-center px-4 py-3 rounded-xl transition-all text-sm font-medium ${isActive
                        ? 'bg-indigo-50 text-indigo-600'
                        : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                      }`}
                  >
                    <Icon className={`w-5 h-5 mr-3 ${isActive ? 'text-indigo-600' : 'text-gray-400'}`} />
                    {tab.label}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Quick Info */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5">
            <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3">Quick Info</h4>
            <div className="space-y-3">
              <div className="flex items-center gap-3 text-sm">
                <Mail size={16} className="text-gray-400" />
                <span className="text-gray-700 font-medium truncate">{profileData.email}</span>
              </div>
              <div className="flex items-center gap-3 text-sm">
                <Phone size={16} className="text-gray-400" />
                <span className="text-gray-700 font-medium">{profileData.phone}</span>
              </div>
              <div className="flex items-center gap-3 text-sm">
                <Building size={16} className="text-gray-400" />
                <span className="text-gray-700 font-medium">{profileData.department}</span>
              </div>
              <div className="flex items-center gap-3 text-sm">
                <Calendar size={16} className="text-gray-400" />
                <span className="text-gray-700 font-medium">Joined {profileData.joinDate}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Content */}
        <div className="lg:w-2/3">
          {renderContent()}
        </div>
      </div>
    </div>
  );
};

export default AdminProfile;
