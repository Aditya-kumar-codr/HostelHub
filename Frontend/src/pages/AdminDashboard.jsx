import React, { useState, useEffect } from 'react';
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
  ShieldCheck,
  Phone,
  Mail,
  CheckCircle,
  XCircle,
  ArrowLeft,
  ChevronRight,
  Save,
  MapPin,
  Home,
  Edit2
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { API_URL } from '../config';

// Import our new separate page component
import AdminFoodAndMeals from './AdminFoodAndMeals';

const AdminStudentsData = () => {
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingHostel, setEditingHostel] = useState(false);
  const [hostelForm, setHostelForm] = useState({ hostelName: '', room: '', roomType: '', joinDate: '', dietPreference: '' });
  const [savingHostel, setSavingHostel] = useState(false);

  useEffect(() => {
    fetchStudents();
  }, []);

  const fetchStudents = async () => {
    try {
      const res = await fetch(`${API_URL}/api/profile/all`);
      if (res.ok) {
        const data = await res.json();
        const formattedStudents = data.map((s, index) => ({
          id: s.firebaseUid || index,
          name: s.displayName || s.name || 'Unnamed Student',
          room: s.room || 'Unassigned',
          feesPending: false,
          phone: s.phone || 'N/A',
          email: s.email || 'N/A',
          fatherName: s.contactName || 'N/A',
          fatherPhone: s.contactNumber || 'N/A',
          address: 'Hostel Campus',
          hostelName: s.hostelName || '',
          roomType: s.roomType || '',
          joinDate: s.joinDate || '',
          dietPreference: s.dietPreference || ''
        }));
        setStudents(formattedStudents);
      }
    } catch (err) {
      console.error('Failed to fetch students:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleSelectStudent = (student) => {
    setSelectedStudent(student);
    setHostelForm({
      hostelName: student.hostelName || '',
      room: student.room || '',
      roomType: student.roomType || '',
      joinDate: student.joinDate || '',
      dietPreference: student.dietPreference || ''
    });
    setEditingHostel(false);
  };

  const handleSaveHostel = async () => {
    if (!selectedStudent) return;
    setSavingHostel(true);
    try {
      const res = await fetch(`${API_URL}/api/profile`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          firebaseUid: selectedStudent.id,
          hostelName: hostelForm.hostelName,
          room: hostelForm.room,
          roomType: hostelForm.roomType,
          joinDate: hostelForm.joinDate,
          dietPreference: hostelForm.dietPreference
        })
      });
      if (res.ok) {
        // Update local state so the UI reflects immediately
        const updatedStudent = { ...selectedStudent, ...hostelForm };
        setSelectedStudent(updatedStudent);
        setStudents(prev => prev.map(s => s.id === selectedStudent.id ? updatedStudent : s));
        setEditingHostel(false);
        alert('Hostel details updated successfully!');
      } else {
        alert('Failed to update hostel details.');
      }
    } catch (err) {
      console.error('Failed to save hostel details:', err);
      alert('Error saving hostel details.');
    } finally {
      setSavingHostel(false);
    }
  };

  if (selectedStudent) {
    return (
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden min-h-[500px]">
        <div className="p-6 border-b border-gray-100 flex items-center gap-4 bg-gray-50/50">
          <button 
            onClick={() => { setSelectedStudent(null); setEditingHostel(false); }}
            className="p-2 bg-white border border-gray-200 text-gray-600 rounded-lg hover:bg-gray-50 transition-colors shadow-sm"
          >
            <ArrowLeft size={18} />
          </button>
          <div>
            <h2 className="text-xl font-bold text-gray-800">Student Profile</h2>
            <p className="text-sm text-gray-500">Detailed information</p>
          </div>
        </div>
        <div className="p-6 md:p-8">
          <div className="flex flex-col md:flex-row gap-8">
            <div className="flex-shrink-0">
              <div className="w-24 h-24 bg-indigo-100 text-indigo-600 rounded-2xl flex items-center justify-center text-4xl font-black shadow-sm">
                {selectedStudent.name.charAt(0)}
              </div>
            </div>
            
            <div className="flex-1 grid grid-cols-1 gap-y-6">
              <div>
                <h3 className="text-3xl font-black text-gray-900">{selectedStudent.name}</h3>
                <div className="mt-3 flex flex-wrap items-center gap-3">
                  <span className="px-3 py-1.5 bg-gray-100 text-gray-700 text-sm font-bold rounded-lg border border-gray-200">
                    Room {selectedStudent.room}
                  </span>
                  {selectedStudent.feesPending ? (
                     <span className="px-3 py-1.5 bg-red-50 text-red-700 text-sm font-bold rounded-lg flex items-center gap-1.5 border border-red-100">
                       <XCircle size={16} /> Fees Pending
                     </span>
                  ) : (
                    <span className="px-3 py-1.5 bg-green-50 text-green-700 text-sm font-bold rounded-lg flex items-center gap-1.5 border border-green-100">
                      <CheckCircle size={16} /> Fees Cleared
                    </span>
                  )}
                </div>
              </div>

               <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-4">
                 {/* Contact Info */}
                 <div className="space-y-4 pt-6 border-t border-gray-100">
                    <h4 className="text-sm font-black text-gray-400 uppercase tracking-wider flex items-center gap-2 mb-4">
                      <User size={16} /> Personal Contact
                    </h4>
                    <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl border border-gray-100">
                      <div className="bg-white p-2.5 text-gray-500 rounded-lg shadow-sm border border-gray-100"><Phone size={18} /></div>
                      <div>
                        <p className="text-[11px] text-gray-500 font-bold uppercase tracking-wide">Student Mobile</p>
                        <p className="text-sm font-bold text-gray-900">{selectedStudent.phone}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl border border-gray-100">
                      <div className="bg-white p-2.5 text-gray-500 rounded-lg shadow-sm border border-gray-100"><Mail size={18} /></div>
                      <div>
                        <p className="text-[11px] text-gray-500 font-bold uppercase tracking-wide">Email Address</p>
                        <p className="text-sm font-bold text-gray-900">{selectedStudent.email}</p>
                      </div>
                    </div>
                 </div>

                 {/* Parent Info */}
                 <div className="space-y-4 pt-6 border-t border-gray-100">
                    <h4 className="text-sm font-black text-gray-400 uppercase tracking-wider flex items-center gap-2 mb-4">
                      <Users size={16} /> Guardian Details
                    </h4>
                    <div className="p-4 border border-gray-200 rounded-xl shadow-sm bg-white relative overflow-hidden">
                       <div className="absolute top-0 left-0 w-1 h-full bg-indigo-500"></div>
                       <p className="text-[11px] text-gray-400 font-bold uppercase tracking-wider mb-1">Father's Name</p>
                       <p className="text-gray-900 font-black text-lg mb-4">{selectedStudent.fatherName}</p>
                       
                       <p className="text-[11px] text-gray-400 font-bold uppercase tracking-wider mb-1 flex items-center gap-1"><Phone size={12}/> Contact Number</p>
                       <p className="text-gray-900 font-bold mb-4">{selectedStudent.fatherPhone}</p>

                       <p className="text-[11px] text-gray-400 font-bold uppercase tracking-wider mb-1">Permanent Address</p>
                       <p className="text-gray-700 font-medium text-sm leading-relaxed">{selectedStudent.address}</p>
                    </div>
                 </div>
               </div>

               {/* Hostel Details - Admin Editable */}
               <div className="pt-6 border-t border-gray-100 mt-2">
                 <div className="flex items-center justify-between mb-4">
                   <h4 className="text-sm font-black text-gray-400 uppercase tracking-wider flex items-center gap-2">
                     <Home size={16} /> Hostel Details
                   </h4>
                   {!editingHostel ? (
                     <button
                       onClick={() => setEditingHostel(true)}
                       className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold text-indigo-600 bg-indigo-50 border border-indigo-100 rounded-lg hover:bg-indigo-100 transition-colors"
                     >
                       <Edit2 size={12} /> Edit
                     </button>
                   ) : (
                     <div className="flex gap-2">
                       <button
                         onClick={handleSaveHostel}
                         disabled={savingHostel}
                         className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold text-white bg-indigo-600 rounded-lg hover:bg-indigo-700 transition-colors disabled:opacity-50"
                       >
                         <Save size={12} /> {savingHostel ? 'Saving...' : 'Save'}
                       </button>
                       <button
                         onClick={() => { setEditingHostel(false); setHostelForm({ hostelName: selectedStudent.hostelName || '', room: selectedStudent.room || '', roomType: selectedStudent.roomType || '', joinDate: selectedStudent.joinDate || '', dietPreference: selectedStudent.dietPreference || '' }); }}
                         className="px-3 py-1.5 text-xs font-bold text-gray-600 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
                       >
                         Cancel
                       </button>
                     </div>
                   )}
                 </div>
                 <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                   <div>
                     <label className="block text-[11px] text-gray-500 font-bold uppercase tracking-wide mb-1">Hostel Block</label>
                     <input
                       type="text"
                       disabled={!editingHostel}
                       value={hostelForm.hostelName}
                       onChange={(e) => setHostelForm({ ...hostelForm, hostelName: e.target.value })}
                       placeholder="e.g. Boys Hostel A"
                       className="w-full px-3 py-2.5 bg-gray-50 border border-gray-200 rounded-lg text-sm font-medium text-gray-900 outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-400 focus:bg-white disabled:opacity-70 disabled:cursor-not-allowed transition-all"
                     />
                   </div>
                   <div>
                     <label className="block text-[11px] text-gray-500 font-bold uppercase tracking-wide mb-1">Room Number</label>
                     <input
                       type="text"
                       disabled={!editingHostel}
                       value={hostelForm.room}
                       onChange={(e) => setHostelForm({ ...hostelForm, room: e.target.value })}
                       placeholder="e.g. A-302"
                       className="w-full px-3 py-2.5 bg-gray-50 border border-gray-200 rounded-lg text-sm font-medium text-gray-900 outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-400 focus:bg-white disabled:opacity-70 disabled:cursor-not-allowed transition-all"
                     />
                   </div>
                   <div>
                     <label className="block text-[11px] text-gray-500 font-bold uppercase tracking-wide mb-1">Room Type</label>
                     <select
                       disabled={!editingHostel}
                       value={hostelForm.roomType}
                       onChange={(e) => setHostelForm({ ...hostelForm, roomType: e.target.value })}
                       className="w-full px-3 py-2.5 bg-gray-50 border border-gray-200 rounded-lg text-sm font-medium text-gray-900 outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-400 focus:bg-white disabled:opacity-70 disabled:cursor-not-allowed transition-all"
                     >
                       <option value="">Select type</option>
                       <option value="Single Occupancy">Single Occupancy</option>
                       <option value="Double Occupancy">Double Occupancy</option>
                       <option value="Triple Occupancy">Triple Occupancy</option>
                     </select>
                   </div>
                   <div>
                     <label className="block text-[11px] text-gray-500 font-bold uppercase tracking-wide mb-1">Date of Joining</label>
                     <input
                       type="text"
                       disabled={!editingHostel}
                       value={hostelForm.joinDate}
                       onChange={(e) => setHostelForm({ ...hostelForm, joinDate: e.target.value })}
                       placeholder="e.g. Aug 10, 2023"
                       className="w-full px-3 py-2.5 bg-gray-50 border border-gray-200 rounded-lg text-sm font-medium text-gray-900 outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-400 focus:bg-white disabled:opacity-70 disabled:cursor-not-allowed transition-all"
                     />
                   </div>
                   <div>
                     <label className="block text-[11px] text-gray-500 font-bold uppercase tracking-wide mb-1">Diet Preference</label>
                     <select
                       disabled={!editingHostel}
                       value={hostelForm.dietPreference}
                       onChange={(e) => setHostelForm({ ...hostelForm, dietPreference: e.target.value })}
                       className="w-full px-3 py-2.5 bg-gray-50 border border-gray-200 rounded-lg text-sm font-medium text-gray-900 outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-400 focus:bg-white disabled:opacity-70 disabled:cursor-not-allowed transition-all"
                     >
                       <option value="">Select preference</option>
                       <option value="Vegetarian">Vegetarian</option>
                       <option value="Non-Vegetarian">Non-Vegetarian</option>
                       <option value="Vegan">Vegan</option>
                     </select>
                   </div>
                 </div>
                 <p className="text-xs text-orange-500 flex items-center mt-4 bg-orange-50 p-2.5 rounded-lg border border-orange-100">
                   <ShieldCheck className="w-4 h-4 mr-2 flex-shrink-0" />
                   Changes saved here will be reflected in the student's profile instantly.
                 </p>
               </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
      <div className="p-6 border-b border-gray-100 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-gray-800">Students Directory</h2>
          <p className="text-sm text-gray-500 mt-1">Manage all {students.length} registered students</p>
        </div>
        <div className="relative">
          <Search className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
          <input 
            type="text" 
            placeholder="Search students..." 
            className="pl-10 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm font-medium focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:bg-white transition-all w-full sm:w-64"
          />
        </div>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-gray-50/80 text-gray-500 text-xs uppercase tracking-wider border-b border-gray-100">
              <th className="px-6 py-4 font-bold">Student Name</th>
              <th className="px-6 py-4 font-bold">Room</th>
              <th className="px-6 py-4 font-bold">Contact</th>
              <th className="px-6 py-4 font-bold">Fee Status</th>
              <th className="px-6 py-4 font-bold text-right">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {students.map((student) => (
              <tr key={student.id} className="hover:bg-gray-50/80 transition-colors group">
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-indigo-50 text-indigo-700 flex items-center justify-center font-black text-lg border border-indigo-100/50">
                      {student.name.charAt(0)}
                    </div>
                    <span className="font-bold text-gray-900 group-hover:text-indigo-600 transition-colors">{student.name}</span>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <span className="text-gray-600 font-bold bg-white px-2.5 py-1 rounded-md border border-gray-200 shadow-sm">{student.room}</span>
                </td>
                <td className="px-6 py-4">
                   <div className="text-sm">
                     <p className="text-gray-900 font-bold">{student.phone}</p>
                     <p className="text-gray-500 text-xs font-medium mt-0.5">{student.email}</p>
                   </div>
                </td>
                <td className="px-6 py-4">
                  {student.feesPending ? (
                     <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold bg-red-50 text-red-700 border border-red-100 shadow-sm">
                        <span className="w-1.5 h-1.5 rounded-full bg-red-600"></span> Pending
                     </span>
                  ) : (
                     <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold bg-green-50 text-green-700 border border-green-100 shadow-sm">
                        <span className="w-1.5 h-1.5 rounded-full bg-green-600"></span> Cleared
                     </span>
                  )}
                </td>
                <td className="px-6 py-4 text-right">
                  <button 
                    onClick={() => handleSelectStudent(student)}
                    className="inline-flex items-center gap-1 bg-white border border-gray-200 text-gray-700 hover:text-indigo-600 hover:border-indigo-200 hover:bg-indigo-50 px-3 py-1.5 rounded-lg font-bold text-sm transition-all shadow-sm group-hover:shadow-md"
                  >
                    View <ChevronRight size={16} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

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

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard': return <AdminStudentsData />;
      case 'food': return <AdminFoodAndMeals />;
      case 'announcements': return <AdminAnnouncements />;
      case 'complaints': return <AdminComplaints />;
      case 'expenses': return <AdminExpenses />;
      case 'lost-found': return <AdminLostAndFound />;
      default: return <AdminStudentsData />;
    }
  };

  const navigation = [
    { id: 'dashboard', name: 'Students Directory', icon: Users },
    { id: 'food', name: 'Food & Meals', icon: Utensils },
    { id: 'announcements', name: 'Announcements', icon: Megaphone },
    { id: 'complaints', name: 'Complaints', icon: AlertCircle },
    { id: 'expenses', name: 'Expenses', icon: CreditCard },
    { id: 'lost-found', name: 'Lost & Found', icon: Search },
  ];

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col font-sans">
      {/* Top Navbar */}
      <header className="bg-white h-16 border-b border-gray-200 flex items-center justify-between px-4 md:px-6 shadow-sm z-20 sticky top-0">
        <div className="flex items-center gap-8">
            {/* Logo */}
            <Link to="/" className="flex items-center gap-2 cursor-pointer hover:opacity-90 transition-opacity">
                <div className="bg-indigo-600 p-1.5 rounded-lg text-white shadow-sm">
                    <ShieldCheck size={20} />
                </div>
                <span className="text-lg font-bold text-gray-900 tracking-tight whitespace-nowrap">
                    HostelHub Admin
                </span>
            </Link>
            
            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center gap-1.5 ml-4">
              {navigation.map((item) => {
                const Icon = item.icon;
                const isActive = activeTab === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => setActiveTab(item.id)}
                    className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-semibold transition-all duration-200 ${
                      isActive 
                        ? 'bg-indigo-50 text-indigo-700 shadow-sm border border-indigo-100/50' 
                        : 'text-gray-500 hover:bg-gray-50 hover:text-gray-900 border border-transparent'
                    }`}
                  >
                    <Icon size={16} className={isActive ? 'text-indigo-600' : 'text-gray-400'} />
                    {item.name}
                  </button>
                )
              })}
            </nav>
        </div>

        {/* Right side Profile & Actions */}
        <div className="flex items-center space-x-4">
          <button className="relative p-2 text-gray-400 hover:text-gray-600 transition-colors rounded-full hover:bg-gray-100 hidden sm:block">
            <Bell className="h-5 w-5" />
            <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
          </button>
          
          <div className="flex items-center gap-3 pl-0 sm:pl-4 sm:border-l border-gray-200 cursor-pointer group">
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

      {/* Mobile/Tablet Navigation (Scrollable horizontal bar) */}
      <div className="lg:hidden bg-white border-b border-gray-100 overflow-x-auto no-scrollbar shadow-sm sticky top-16 z-10">
        <nav className="flex items-center p-2 gap-2 w-max px-4">
           {navigation.map((item) => {
                const Icon = item.icon;
                const isActive = activeTab === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => setActiveTab(item.id)}
                    className={`flex items-center gap-2 px-3.5 py-2 rounded-lg text-sm font-bold transition-all whitespace-nowrap ${
                      isActive 
                        ? 'bg-indigo-50 text-indigo-700 border border-indigo-100' 
                        : 'text-gray-500 hover:bg-gray-50 hover:text-gray-900 border border-transparent'
                    }`}
                  >
                    <Icon size={16} className={isActive ? 'text-indigo-600' : 'text-gray-400'} />
                    {item.name}
                  </button>
                )
              })}
        </nav>
      </div>

      {/* Dashboard Main Content Area */}
      <main className="flex-1 overflow-auto p-4 md:p-6 lg:p-8">
        <div className="max-w-7xl mx-auto">
           {renderContent()}
        </div>
      </main>
    </div>
  );
};

export default AdminDashboard;
