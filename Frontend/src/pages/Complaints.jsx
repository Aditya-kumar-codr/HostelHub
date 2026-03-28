import React, { useState } from 'react';
import { AlertCircle, Send } from 'lucide-react';

const Complaints = () => {
  const [newComplaintTitle, setNewComplaintTitle] = useState('');
  const [newComplaintDesc, setNewComplaintDesc] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!newComplaintTitle.trim() || !newComplaintDesc.trim()) return;

    // For now, we'll just show an alert. In the next part, we'll build the UI to list these.
    alert(`Complaint Registered:\nTitle: ${newComplaintTitle}\nDescription: ${newComplaintDesc}`);
    
    setNewComplaintTitle('');
    setNewComplaintDesc('');
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <h2 className="text-2xl font-bold text-gray-800">Complaints & Issues</h2>
      
      {/* Registration Form Only */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 max-w-3xl">
        <div className="flex items-center space-x-2 mb-6">
          <AlertCircle className="w-6 h-6 text-indigo-600" />
          <h3 className="text-xl font-semibold text-gray-800">Register New Complaint</h3>
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
    </div>
  );
};

export default Complaints;
