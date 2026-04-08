import React, { useState } from 'react';
import { Camera, Edit2, Save, MapPin } from 'lucide-react';

const Profile = () => {
  const [isEditing, setIsEditing] = useState(false);

  const [profileData, setProfileData] = useState({
    name: 'Aditya Kumar',
    email: 'aditya.kumar@example.com',
    phone: '+91 98765 43210',
    room: 'A-302',
    course: 'B.Tech Computer Science'
  });

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">My Profile</h1>
          <p className="text-gray-500 mt-1 text-sm">Manage your personal information and preferences.</p>
        </div>
        {!isEditing ? (
          <button 
            onClick={() => setIsEditing(true)}
            className="flex items-center space-x-2 bg-white border border-gray-200 text-gray-700 hover:bg-gray-50 px-4 py-2 rounded-lg transition-colors"
          >
            <Edit2 className="w-4 h-4" />
            <span className="text-sm font-medium">Edit Profile</span>
          </button>
        ) : (
          <button 
            onClick={() => setIsEditing(false)}
            className="flex items-center space-x-2 bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg transition-colors shadow-sm"
          >
            <Save className="w-4 h-4" />
            <span className="text-sm font-medium">Save Changes</span>
          </button>
        )}
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden relative">
        {/* Profile Header Background */}
        <div className="h-36 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500"></div>
        
        <div className="px-8 pb-10">
          {/* Avatar Section */}
          <div className="relative -mt-16 mb-8 flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4">
            <div className="flex gap-6 items-end">
              <div className="relative inline-block">
                <img 
                  src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&q=80&w=150&h=150" 
                  alt="Profile Avatar" 
                  className="w-32 h-32 rounded-full border-4 border-white shadow-md object-cover bg-white"
                />
                <button className="absolute bottom-1 right-1 p-2 bg-indigo-600 text-white rounded-full hover:bg-indigo-700 transition shadow-sm border-2 border-white">
                  <Camera className="w-4 h-4" />
                </button>
              </div>
              <div className="pb-2">
                <h2 className="text-2xl font-bold text-gray-900">{profileData.name}</h2>
                <div className="flex items-center text-gray-500 text-sm mt-1">
                  <MapPin className="w-4 h-4 mr-1 text-indigo-500" />
                  Room {profileData.room}
                </div>
              </div>
            </div>
          </div>

          {/* User Info Form */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
            <div className="col-span-1 md:col-span-2">
              <h3 className="text-lg font-semibold text-gray-900 border-b border-gray-100 pb-2">Personal Information</h3>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
              <input 
                type="text" 
                disabled={!isEditing}
                className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-lg focus:bg-white focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 outline-none transition-all disabled:opacity-70 disabled:cursor-not-allowed text-gray-900 font-medium"
                value={profileData.name}
                onChange={(e) => setProfileData({...profileData, name: e.target.value})}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
              <input 
                type="email" 
                disabled={!isEditing}
                className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-lg focus:bg-white focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 outline-none transition-all disabled:opacity-70 disabled:cursor-not-allowed text-gray-900 font-medium"
                value={profileData.email}
                onChange={(e) => setProfileData({...profileData, email: e.target.value})}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
              <input 
                type="tel" 
                disabled={!isEditing}
                className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-lg focus:bg-white focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 outline-none transition-all disabled:opacity-70 disabled:cursor-not-allowed text-gray-900 font-medium"
                value={profileData.phone}
                onChange={(e) => setProfileData({...profileData, phone: e.target.value})}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Course & Batch</label>
              <input 
                type="text" 
                disabled={!isEditing}
                className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-lg focus:bg-white focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 outline-none transition-all disabled:opacity-70 disabled:cursor-not-allowed text-gray-900 font-medium"
                value={profileData.course}
                onChange={(e) => setProfileData({...profileData, course: e.target.value})}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
