import React, { useState, useEffect } from 'react';
import { AlertCircle, Send, CheckCircle, Clock, Info, Bell, AlertTriangle } from 'lucide-react';
import { API_URL } from '../config';

const importanceConfig = {
  low: { label: 'Low', icon: Info, color: 'text-gray-600', bg: 'bg-gray-50', border: 'border-gray-200', dot: 'bg-gray-400', badge: 'bg-gray-100 text-gray-600' },
  normal: { label: 'Normal', icon: Bell, color: 'text-blue-600', bg: 'bg-blue-50', border: 'border-blue-200', dot: 'bg-blue-500', badge: 'bg-blue-100 text-blue-700' },
  important: { label: 'Important', icon: AlertCircle, color: 'text-orange-600', bg: 'bg-orange-50', border: 'border-orange-200', dot: 'bg-orange-500', badge: 'bg-orange-100 text-orange-700' },
  urgent: { label: 'Urgent', icon: AlertTriangle, color: 'text-red-600', bg: 'bg-red-50', border: 'border-red-200', dot: 'bg-red-500', badge: 'bg-red-100 text-red-700' }
};

const Complaints = ({ profileData }) => {
  const [complaints, setComplaints] = useState([]);
  const [isAdding, setIsAdding] = useState(false);
  const [newComplaintTitle, setNewComplaintTitle] = useState('');
  const [newComplaintDesc, setNewComplaintDesc] = useState('');
  const [newComplaintImportance, setNewComplaintImportance] = useState('normal');
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  const studentName = profileData?.name || 'Student';

  useEffect(() => {
    if (profileData?.name) {
      fetchComplaints(profileData.name);
    }
  }, [profileData]);

  const fetchComplaints = async (nameToFetch) => {
    try {
      const name = nameToFetch || studentName;
      const res = await fetch(`${API_URL}/api/complaints?studentName=${encodeURIComponent(name)}`);
      if (res.ok) {
        const data = await res.json();
        setComplaints(data);
      }
    } catch (err) {
      console.error('Failed to fetch complaints:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!newComplaintTitle.trim() || !newComplaintDesc.trim()) return;
    
    setSubmitting(true);
    try {
      const res = await fetch(`${API_URL}/api/complaints`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          studentName,
          title: newComplaintTitle,
          description: newComplaintDesc,
          importance: newComplaintImportance
        })
      });

      if (res.ok) {
        await fetchComplaints();
        setNewComplaintTitle('');
        setNewComplaintDesc('');
        setNewComplaintImportance('normal');
        setIsAdding(false);
      } else {
        alert('Failed to register complaint');
      }
    } catch (err) {
      console.error('Error submitting complaint:', err);
      alert('Error connecting to the server');
    } finally {
      setSubmitting(false);
    }
  };

  const formatDate = (dateStr) => {
    const date = new Date(dateStr);
    const now = new Date();
    const diffMs = now - date;
    const diffMins = Math.floor(diffMs / 60000);
    const diffHrs = Math.floor(diffMins / 60);

    if (diffMins < 1) return 'Just now';
    if (diffMins < 60) return `${diffMins} min ago`;
    if (diffHrs < 24) return `${diffHrs} hours ago`;
    return date.toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' });
  };

  const renderStatusBadge = (status) => {
    switch (status) {
      case 'Pending':
        return (
           <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-red-50 text-red-700 rounded-full text-xs font-bold border border-red-100">
              <Clock size={12} /> Pending
           </span>
        );
      case 'Received':
        return (
           <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-yellow-50 text-yellow-700 rounded-full text-xs font-bold border border-yellow-100">
              <AlertCircle size={12} /> Received
           </span>
        );
      case 'Resolved':
        return (
           <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-green-50 text-green-700 rounded-full text-xs font-bold border border-green-100">
              <CheckCircle size={12} /> Resolved
           </span>
        );
      default:
        return null;
    }
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex justify-between items-center">
        <div>
           <h2 className="text-2xl font-bold text-gray-800">My Complaints</h2>
           <p className="text-sm text-gray-500 mt-1">Track and manage your hostel issues</p>
        </div>
        {!isAdding && (
          <button 
            onClick={() => setIsAdding(true)}
            className="bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-2.5 rounded-lg text-sm font-bold transition-colors cursor-pointer shadow-sm"
          >
            New Complaint
          </button>
        )}
      </div>

      {isAdding ? (
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 max-w-3xl">
          <div className="flex justify-between items-center mb-6 border-b border-gray-100 pb-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-indigo-50 text-indigo-600 rounded-lg">
                 <AlertCircle size={20} />
              </div>
              <h3 className="text-lg font-black text-gray-900">Register New Complaint</h3>
            </div>
            <button 
              onClick={() => setIsAdding(false)}
              className="px-4 py-2 text-gray-500 hover:text-gray-700 hover:bg-gray-50 rounded-lg text-sm font-bold transition-colors cursor-pointer border border-transparent"
            >
              Cancel
            </button>
          </div>
          
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-1.5">Issue Title</label>
              <input
                type="text"
                value={newComplaintTitle}
                onChange={(e) => setNewComplaintTitle(e.target.value)}
                placeholder="e.g., Broken fan in Room 302"
                className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-lg text-sm font-medium focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-400 focus:bg-white transition-all text-gray-900"
                required
              />
            </div>
            
            <div>
               <div className="flex justify-between items-center mb-1.5">
                  <label className="block text-sm font-bold text-gray-700">Description</label>
                  <span className="text-xs font-medium text-gray-400">{newComplaintDesc.length}/500</span>
               </div>
              <textarea
                value={newComplaintDesc}
                onChange={(e) => setNewComplaintDesc(e.target.value)}
                placeholder="Please provide specific details about the issue so we can resolve it quickly..."
                rows="5"
                maxLength={500}
                className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-lg text-sm font-medium focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-400 focus:bg-white transition-all resize-none text-gray-900"
                required
              ></textarea>
            </div>
            
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">Importance Level</label>
              <div className="flex flex-wrap gap-2">
                {Object.entries(importanceConfig).map(([key, cfg]) => {
                  const isSelected = newComplaintImportance === key;
                  return (
                    <button
                      key={key}
                      onClick={(e) => { e.preventDefault(); setNewComplaintImportance(key); }}
                      className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-bold border transition-all ${
                        isSelected
                          ? cfg.bg + ' ' + cfg.color + ' border-' + cfg.color.split('-')[1] + '-200 ring-2 ring-offset-1 ring-indigo-400'
                          : 'bg-white border-gray-200 text-gray-500 hover:bg-gray-50'
                      }`}
                    >
                      <span className={`w-2 h-2 rounded-full ${cfg.dot}`}></span>
                      {cfg.label}
                    </button>
                  );
                })}
              </div>
            </div>
            
            <div className="flex justify-end pt-2">
              <button
                type="submit"
                disabled={submitting}
                className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-2.5 rounded-lg font-bold text-sm transition-colors cursor-pointer shadow-sm disabled:opacity-50"
              >
                <span>{submitting ? 'Submitting...' : 'Submit Complaint'}</span>
                {!submitting && <Send size={16} />}
              </button>
            </div>
          </form>
        </div>
      ) : (
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
          {loading ? (
             <div className="p-12 text-center">
                <div className="animate-spin w-8 h-8 border-3 border-indigo-600 border-t-transparent rounded-full mx-auto mb-3"></div>
                <p className="text-gray-500 font-medium">Loading complaints...</p>
             </div>
          ) : complaints.length === 0 ? (
             <div className="p-12 text-center">
               <CheckCircle className="w-12 h-12 text-gray-200 mx-auto mb-3" />
               <p className="text-base font-bold text-gray-600">No complaints registered yet.</p>
               <p className="text-sm mt-1 text-gray-400">Click "New Complaint" if you're experiencing any issues.</p>
             </div>
          ) : (
            <div className="divide-y divide-gray-100">
              {complaints.map((complaint) => {
                const impCfg = importanceConfig[complaint.importance || 'normal'];
                return (
                <div key={complaint.id} className="p-6 hover:bg-gray-50/50 transition-colors group">
                  <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-4">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-3 mb-1">
                         <h4 className="text-lg font-black text-gray-900 truncate">{complaint.title}</h4>
                      </div>
                      <div className="flex items-center gap-2 mb-3">
                         <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">Submitted {formatDate(complaint.createdAt)}</span>
                         <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-[10px] font-bold ${impCfg.badge}`}>
                            <span className={`w-1.5 h-1.5 rounded-full ${impCfg.dot}`}></span>
                            {impCfg.label}
                         </span>
                      </div>
                      <p className="text-sm text-gray-600 leading-relaxed max-w-3xl whitespace-pre-wrap">{complaint.description}</p>
                    </div>
                    <div className="flex-shrink-0">
                       {renderStatusBadge(complaint.status)}
                    </div>
                  </div>
                </div>
              )})}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Complaints;
