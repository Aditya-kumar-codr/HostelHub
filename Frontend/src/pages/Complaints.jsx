import React, { useState } from 'react';
import { AlertCircle, Send, CheckCircle } from 'lucide-react';

const Complaints = () => {
  const [complaints, setComplaints] = useState([]);
  const [isAdding, setIsAdding] = useState(false);
  const [newComplaintTitle, setNewComplaintTitle] = useState('');
  const [newComplaintDesc, setNewComplaintDesc] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!newComplaintTitle.trim() || !newComplaintDesc.trim()) return;

    const newComplaint = {
      id: Date.now(),
      title: newComplaintTitle,
      description: newComplaintDesc,
      status: 'In Progress', // Using the status style you provided
      date: 'Just now',
    };

    setComplaints([newComplaint, ...complaints]);
    setNewComplaintTitle('');
    setNewComplaintDesc('');
    setIsAdding(false);
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-800">Complaints</h2>
        {!isAdding && (
          <button 
            onClick={() => setIsAdding(true)}
            className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors cursor-pointer"
          >
            New Complaint
          </button>
        )}
      </div>

      {isAdding ? (
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 max-w-3xl">
          <div className="flex justify-between items-center mb-6">
            <div className="flex items-center space-x-2">
              <AlertCircle className="w-5 h-5 text-indigo-600" />
              <h3 className="text-lg font-semibold text-gray-800">Register New Complaint</h3>
            </div>
            <button 
              onClick={() => setIsAdding(false)}
              className="text-gray-400 hover:text-gray-600 text-sm font-medium cursor-pointer"
            >
              Cancel
            </button>
          </div>
          
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Issue Title</label>
              <input
                type="text"
                value={newComplaintTitle}
                onChange={(e) => setNewComplaintTitle(e.target.value)}
                placeholder="e.g., Broken fan in Room 302"
                className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors"
                required
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
              <textarea
                value={newComplaintDesc}
                onChange={(e) => setNewComplaintDesc(e.target.value)}
                placeholder="Please provide details about the issue..."
                rows="4"
                className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors resize-none"
                required
              ></textarea>
            </div>
            
            <div className="flex justify-end pt-2">
              <button
                type="submit"
                className="flex items-center space-x-2 bg-indigo-600 hover:bg-indigo-700 text-white px-8 py-3 rounded-lg font-medium transition-colors cursor-pointer"
              >
                <span>Submit Complaint</span>
                <Send className="w-4 h-4 ml-2" />
              </button>
            </div>
          </form>
        </div>
      ) : (
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          {complaints.length === 0 ? (
             <div className="text-center py-10 text-gray-500">
               <CheckCircle className="w-12 h-12 text-gray-200 mx-auto mb-3" />
               <p className="text-base font-medium text-gray-600">No complaints registered yet.</p>
               <p className="text-sm mt-1 text-gray-400">Click "New Complaint" to log an issue.</p>
             </div>
          ) : (
            <div className="space-y-4">
              {complaints.map((complaint) => (
                <div key={complaint.id} className="p-4 border border-gray-100 rounded-lg justify-between items-center hover:shadow-sm transition-shadow">
                  <div className="flex justify-between items-start">
                    <div>
                      <h4 className="font-semibold text-gray-800">{complaint.title}</h4>
                      <p className="text-sm text-gray-500 mt-1">Submitted {complaint.date}</p>
                    </div>
                    <span className="px-3 py-1 bg-yellow-100 text-yellow-800 rounded-full text-xs font-medium">
                      {complaint.status}
                    </span>
                  </div>
                  <p className="text-sm text-gray-700 mt-3">{complaint.description}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Complaints;
