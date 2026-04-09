import React, { useState } from 'react';
import { Camera, Edit2, Save, MapPin, Shield, Phone, User, Key, Utensils, BookOpen } from 'lucide-react';

const Profile = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [activeTab, setActiveTab] = useState('personal');

  const [profileData, setProfileData] = useState({
    name: 'Aditya Kumar',
    email: 'aditya.kumar@example.com',
    phone: '+91 98765 43210',
    course: 'B.Tech Computer Science',
    enrollment: 'CS2023-445',
    bloodGroup: 'O+',
    dob: '2001-08-15'
  });

  const [emergencyData, setEmergencyData] = useState({
    contactName: 'Ramesh Kumar',
    relation: 'Father',
    contactNumber: '+91 91234 56789'
  });

  const [hostelData, setHostelData] = useState({
    hostelName: 'Boys Hostel A',
    room: 'A-302',
    roomType: 'Double Occupancy',
    joinDate: 'Aug 10, 2023',
    dietPreference: 'Vegetarian'
  });

  const handleSave = () => {
    setIsEditing(false);
    alert("Profile updated successfully!");
  };

  const tabs = [
    { id: 'personal', label: 'Personal details', icon: User },
    { id: 'hostel', label: 'Hostel & Food', icon: MapPin },
    { id: 'security', label: 'Security', icon: Key }
  ];

  const renderContent = () => {
    switch (activeTab) {
      case 'personal':
        return (
          <div className="space-y-6">
            {/* Personal Info Card */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 md:p-8">
               <h3 className="text-lg font-semibold text-gray-900 flex items-center mb-6 pb-2 border-b border-gray-50">
                  <User className="w-5 h-5 mr-2 text-indigo-500"/> Personal Information
               </h3>
               <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                    <input type="text" disabled={!isEditing} className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-lg focus:bg-white focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 outline-none transition-all disabled:opacity-70 disabled:cursor-not-allowed text-gray-900 font-medium" value={profileData.name} onChange={(e) => setProfileData({...profileData, name: e.target.value})} />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
                    <input type="email" disabled={!isEditing} className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-lg focus:bg-white focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 outline-none transition-all disabled:opacity-70 disabled:cursor-not-allowed text-gray-900 font-medium" value={profileData.email} onChange={(e) => setProfileData({...profileData, email: e.target.value})} />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
                    <input type="tel" disabled={!isEditing} className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-lg focus:bg-white focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 outline-none transition-all disabled:opacity-70 disabled:cursor-not-allowed text-gray-900 font-medium" value={profileData.phone} onChange={(e) => setProfileData({...profileData, phone: e.target.value})} />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Date of Birth</label>
                    <input type="date" disabled={!isEditing} className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-lg focus:bg-white focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 outline-none transition-all disabled:opacity-70 disabled:cursor-not-allowed text-gray-900 font-medium" value={profileData.dob} onChange={(e) => setProfileData({...profileData, dob: e.target.value})} />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Blood Group</label>
                    <select disabled={!isEditing} className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-lg focus:bg-white focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 outline-none transition-all disabled:opacity-70 disabled:cursor-not-allowed text-gray-900 font-medium" value={profileData.bloodGroup} onChange={(e) => setProfileData({...profileData, bloodGroup: e.target.value})}>
                      <option>A+</option><option>A-</option><option>B+</option><option>B-</option><option>O+</option><option>O-</option><option>AB+</option><option>AB-</option>
                    </select>
                  </div>
               </div>
            </div>

            {/* Academic Info Card */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 md:p-8">
               <h3 className="text-lg font-semibold text-gray-900 flex items-center mb-6 pb-2 border-b border-gray-50">
                  <BookOpen className="w-5 h-5 mr-2 text-indigo-500"/> Academic Information
               </h3>
               <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Course & Branch</label>
                    <input type="text" disabled className="w-full px-4 py-2.5 bg-gray-100 border border-gray-200 rounded-lg text-gray-500 cursor-not-allowed font-medium" value={profileData.course} />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Enrollment ID</label>
                    <input type="text" disabled className="w-full px-4 py-2.5 bg-gray-100 border border-gray-200 rounded-lg text-gray-500 cursor-not-allowed font-medium" value={profileData.enrollment} />
                  </div>
               </div>
            </div>

            {/* Emergency Contact Card */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 md:p-8">
               <h3 className="text-lg font-semibold text-gray-900 flex items-center mb-6 pb-2 border-b border-gray-50">
                  <Phone className="w-5 h-5 mr-2 text-indigo-500"/> Emergency Contact
               </h3>
               <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Contact Name</label>
                    <input type="text" disabled={!isEditing} className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-lg focus:bg-white focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 outline-none transition-all disabled:opacity-70 disabled:cursor-not-allowed text-gray-900 font-medium" value={emergencyData.contactName} onChange={(e) => setEmergencyData({...emergencyData, contactName: e.target.value})} />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Relationship</label>
                    <input type="text" disabled={!isEditing} className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-lg focus:bg-white focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 outline-none transition-all disabled:opacity-70 disabled:cursor-not-allowed text-gray-900 font-medium" value={emergencyData.relation} onChange={(e) => setEmergencyData({...emergencyData, relation: e.target.value})} />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Contact Number</label>
                    <input type="tel" disabled={!isEditing} className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-lg focus:bg-white focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 outline-none transition-all disabled:opacity-70 disabled:cursor-not-allowed text-gray-900 font-medium" value={emergencyData.contactNumber} onChange={(e) => setEmergencyData({...emergencyData, contactNumber: e.target.value})} />
                  </div>
               </div>
            </div>
          </div>
        );
      case 'hostel':
        return (
          <div className="space-y-6">
             <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 md:p-8">
               <h3 className="text-lg font-semibold text-gray-900 flex items-center mb-6 pb-2 border-b border-gray-50">
                  <MapPin className="w-5 h-5 mr-2 text-indigo-500"/> Hostel Details
               </h3>
               <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Hostel Block</label>
                    <input type="text" disabled className="w-full px-4 py-2.5 bg-gray-100 border border-gray-200 rounded-lg text-gray-500 cursor-not-allowed font-medium" value={hostelData.hostelName} />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Room Number</label>
                    <input type="text" disabled className="w-full px-4 py-2.5 bg-gray-100 border border-gray-200 rounded-lg text-gray-500 cursor-not-allowed font-medium" value={hostelData.room} />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Room Type</label>
                    <input type="text" disabled className="w-full px-4 py-2.5 bg-gray-100 border border-gray-200 rounded-lg text-gray-500 cursor-not-allowed font-medium" value={hostelData.roomType} />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Date of Joining</label>
                    <input type="text" disabled className="w-full px-4 py-2.5 bg-gray-100 border border-gray-200 rounded-lg text-gray-500 cursor-not-allowed font-medium" value={hostelData.joinDate} />
                  </div>
                  <div className="col-span-1 md:col-span-2">
                     <p className="text-xs text-orange-500 flex items-center mt-1 bg-orange-50 p-2 rounded-lg border border-orange-100">
                       <Shield className="w-4 h-4 mr-2" />
                       Hostel allocations and room details are managed by the administration and cannot be directly edited.
                     </p>
                  </div>
               </div>
            </div>

            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 md:p-8">
               <h3 className="text-lg font-semibold text-gray-900 flex items-center mb-6 pb-2 border-b border-gray-50">
                  <Utensils className="w-5 h-5 mr-2 text-indigo-500"/> Preferences
               </h3>
               <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Mess / Dietary Preference</label>
                  <select disabled={!isEditing} className="w-full md:w-1/2 px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-lg focus:bg-white focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 outline-none transition-all disabled:opacity-70 disabled:cursor-not-allowed text-gray-900 font-medium" value={hostelData.dietPreference} onChange={(e) => setHostelData({...hostelData, dietPreference: e.target.value})}>
                    <option>Vegetarian</option>
                    <option>Non-Vegetarian</option>
                    <option>Vegan</option>
                  </select>
               </div>
            </div>
          </div>
        );
      case 'security':
        return (
          <div className="space-y-6">
             <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 md:p-8">
               <h3 className="text-lg font-semibold text-gray-900 flex items-center mb-6 pb-2 border-b border-gray-50">
                  <Key className="w-5 h-5 mr-2 text-indigo-500"/> Change Password
               </h3>
               <form className="max-w-md space-y-5" onSubmit={(e) => { e.preventDefault(); alert("Password updated successfully!"); }}>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Current Password</label>
                    <input type="password" required className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-lg focus:bg-white focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 outline-none transition-all" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">New Password</label>
                    <input type="password" required className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-lg focus:bg-white focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 outline-none transition-all" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Confirm New Password</label>
                    <input type="password" required className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-lg focus:bg-white focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 outline-none transition-all" />
                  </div>
                  <button type="submit" className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-2.5 rounded-lg font-medium transition-colors shadow-sm mt-2">
                    Update Password
                  </button>
               </form>
             </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="max-w-5xl mx-auto space-y-6 pb-12">
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">My Profile</h1>
          <p className="text-gray-500 mt-1 text-sm">Manage your personal information and account settings.</p>
        </div>
        {activeTab !== 'security' && (
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

      {/* Main Profile Layout */}
      <div className="flex flex-col lg:flex-row gap-6">
        
        {/* Left Sidebar - Profile & Nav */}
        <div className="lg:w-1/3 flex flex-col gap-6">
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden text-center relative pb-6">
            <div className="h-28 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500"></div>
            <div className="relative -mt-14 inline-block mb-3">
              <img 
                src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&q=80&w=150&h=150" 
                alt="Profile Avatar" 
                className="w-28 h-28 rounded-full border-4 border-white shadow-sm object-cover bg-white mx-auto"
              />
              <button className="absolute bottom-1 right-1 p-2 bg-indigo-600 text-white rounded-full hover:bg-indigo-700 transition shadow-sm border-2 border-white">
                <Camera className="w-4 h-4" />
              </button>
            </div>
            <h2 className="text-xl font-bold text-gray-900">{profileData.name}</h2>
            <p className="text-gray-500 text-sm mt-1">{profileData.enrollment}</p>
            <div className="inline-flex items-center justify-center mt-3 bg-indigo-50 text-indigo-700 px-3 py-1 rounded-full text-xs font-semibold">
              Room {hostelData.room}
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
                    className={`w-full flex items-center px-4 py-3 rounded-xl transition-all text-sm font-medium ${
                      isActive 
                        ? 'bg-indigo-50 text-indigo-600' 
                        : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                    }`}
                  >
                    <Icon className={`w-5 h-5 mr-3 ${isActive ? 'text-indigo-600' : 'text-gray-400'}`} />
                    {tab.label}
                  </button>
                )
              })}
            </div>
          </div>
        </div>

        {/* Right Content Area */}
        <div className="lg:w-2/3">
          {renderContent()}
        </div>
      </div>
    </div>
  );
};

export default Profile;
