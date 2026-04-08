import React, { useState } from 'react';
import { Search, PlusCircle, MapPin, Calendar, CheckCircle2, AlertCircle, X } from 'lucide-react';

const LostAndFound = () => {
  const [activeTab, setActiveTab] = useState('lost');
  const [showReportModal, setShowReportModal] = useState(false);
  
  const [reportForm, setReportForm] = useState({
    type: 'lost',
    name: '',
    description: '',
    location: '',
    date: ''
  });

  const [lostItems, setLostItems] = useState([
    { id: 1, name: 'Blue Water Bottle', description: 'Milton 1L bottle, metallic blue color.', location: 'Study Area', date: 'Oct 24, 2023' },
    { id: 2, name: 'Scientific Calculator', description: 'Casio fx-991EX, has a small scratch on the back.', location: 'Room 302', date: 'Oct 25, 2023' }
  ]);

  const [foundItems, setFoundItems] = useState([
    { id: 3, name: 'Room Keys', description: 'Set of 2 keys with a Spiderman keychain.', location: 'Cafeteria', date: 'Oct 26, 2023' },
    { id: 4, name: 'Wireless Earbuds', description: 'White Apple AirPods, generating a low beep.', location: 'Gym', date: 'Oct 27, 2023' }
  ]);

  const handleReportSubmit = (e) => {
    e.preventDefault();
    const newItem = {
      id: Date.now(),
      name: reportForm.name,
      description: reportForm.description,
      location: reportForm.location,
      date: reportForm.date || new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
    };

    if (reportForm.type === 'lost') {
      setLostItems([newItem, ...lostItems]);
    } else {
      setFoundItems([newItem, ...foundItems]);
    }

    setShowReportModal(false);
    setReportForm({ type: 'lost', name: '', description: '', location: '', date: '' });
  };

  const handleActionClick = (type) => {
    alert(type === 'lost' ? 'Thank you! The person who lost this item will be notified.' : 'Claim request submitted! We will verify and contact you.');
  };

  const renderItems = (items, type) => {
    if (items.length === 0) {
      return (
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-8 text-center min-h-[300px] flex flex-col items-center justify-center col-span-full">
          <div className="bg-indigo-50 w-16 h-16 rounded-full flex items-center justify-center mb-4">
            <Search className="w-8 h-8 text-indigo-600" />
          </div>
          <h3 className="text-lg font-medium text-gray-900">No {type} items reported yet</h3>
          <p className="text-gray-500 mt-2 max-w-sm">
            Check back later if you're looking for something.
          </p>
        </div>
      );
    }

    return items.map((item) => (
      <div key={item.id} className="bg-white rounded-xl shadow-sm border border-gray-100 p-5 hover:shadow-md transition-shadow">
        <div className="flex justify-between items-start mb-3">
          <h3 className="font-semibold text-gray-900 text-lg">{item.name}</h3>
          <span className={`px-3 py-1 rounded-full text-xs font-medium ${type === 'lost' ? 'bg-red-50 text-red-600' : 'bg-green-50 text-green-600'}`}>
            {type === 'lost' ? 'Lost' : 'Found'}
          </span>
        </div>
        <p className="text-gray-600 text-sm mb-4 line-clamp-2">{item.description}</p>
        <div className="space-y-2">
          <div className="flex items-center text-sm text-gray-500">
            <MapPin className="w-4 h-4 mr-2" />
            {item.location}
          </div>
          <div className="flex items-center text-sm text-gray-500">
            <Calendar className="w-4 h-4 mr-2" />
            {item.date}
          </div>
        </div>
        <div className="mt-5 flex gap-2">
           <button 
             onClick={() => handleActionClick(type)}
             className="flex-1 bg-indigo-50 text-indigo-600 font-medium py-2 rounded-lg text-sm hover:bg-indigo-100 transition-colors"
           >
              {type === 'lost' ? 'I found this' : 'This is mine !'}
           </button>
        </div>
      </div>
    ));
  };

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Lost & Found</h1>
          <p className="text-gray-500 mt-1 text-sm">Report lost items or claim what you've found.</p>
        </div>
        <button 
          onClick={() => setShowReportModal(true)}
          className="flex items-center space-x-2 bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg transition-colors whitespace-nowrap"
        >
          <PlusCircle className="w-4 h-4" />
          <span className="text-sm font-medium">Report Item</span>
        </button>
      </div>

      <div className="flex space-x-1 bg-gray-200/50 p-1 rounded-xl w-full max-w-md">
        <button
          onClick={() => setActiveTab('lost')}
          className={`flex-1 flex items-center justify-center space-x-2 py-2.5 rounded-lg text-sm font-medium transition-all ${
            activeTab === 'lost'
              ? 'bg-white text-gray-900 shadow-sm'
              : 'text-gray-600 hover:text-gray-900 hover:bg-gray-200/50'
          }`}
        >
          <AlertCircle className="w-4 h-4" />
          <span>Lost Items</span>
        </button>
        <button
           onClick={() => setActiveTab('found')}
           className={`flex-1 flex items-center justify-center space-x-2 py-2.5 rounded-lg text-sm font-medium transition-all ${
             activeTab === 'found'
               ? 'bg-white text-gray-900 shadow-sm'
               : 'text-gray-600 hover:text-gray-900 hover:bg-gray-200/50'
           }`}
        >
          <CheckCircle2 className="w-4 h-4" />
          <span>Found Items</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {activeTab === 'lost' ? renderItems(lostItems, 'lost') : renderItems(foundItems, 'found')}
      </div>

      {/* Report Item Modal */}
      {showReportModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl w-full max-w-md overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-100 flex justify-between items-center bg-gray-50/50">
              <h2 className="text-lg font-semibold text-gray-900">Report an Item</h2>
              <button 
                onClick={() => setShowReportModal(false)}
                className="text-gray-400 hover:text-gray-600 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <form onSubmit={handleReportSubmit} className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Item Status</label>
                <select 
                  className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 outline-none transition-all"
                  value={reportForm.type}
                  onChange={(e) => setReportForm({...reportForm, type: e.target.value})}
                >
                  <option value="lost">I lost something</option>
                  <option value="found">I found something</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Item Title</label>
                <input 
                  type="text" 
                  required
                  placeholder="e.g. Blue Water Bottle"
                  className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 outline-none transition-all"
                  value={reportForm.name}
                  onChange={(e) => setReportForm({...reportForm, name: e.target.value})}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                <textarea 
                  required
                  rows="3"
                  placeholder="Provide identifying details..."
                  className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 outline-none transition-all resize-none"
                  value={reportForm.description}
                  onChange={(e) => setReportForm({...reportForm, description: e.target.value})}
                ></textarea>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Location</label>
                <input 
                  type="text" 
                  required
                  placeholder="Where was it lost/found?"
                  className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 outline-none transition-all"
                  value={reportForm.location}
                  onChange={(e) => setReportForm({...reportForm, location: e.target.value})}
                />
              </div>
              <div className="pt-2">
                <button 
                  type="submit"
                  className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-2.5 rounded-lg transition-colors"
                >
                  Submit Report
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default LostAndFound;
