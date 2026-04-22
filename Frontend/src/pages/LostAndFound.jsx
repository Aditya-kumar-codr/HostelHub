import React, { useState, useEffect } from 'react';
import { Search, PlusCircle, MapPin, Calendar, CheckCircle2, AlertCircle, X, Loader2, PackageSearch } from 'lucide-react';
import { API_URL } from '../config';
import { auth } from '../firebase';

const LostAndFound = () => {
  const [activeTab, setActiveTab] = useState('lost');
  const [showReportModal, setShowReportModal] = useState(false);
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentUserName, setCurrentUserName] = useState('Student');
  const [currentUserPhone, setCurrentUserPhone] = useState('');
  const [saving, setSaving] = useState(false);

  const [reportForm, setReportForm] = useState({
    type: 'lost',
    name: '',
    description: '',
    location: '',
  });

  // Get logged-in user's name
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (user) => {
      if (user) {
        try {
          const res = await fetch(`${API_URL}/api/profile/${user.uid}`);
          if (res.ok) {
            const data = await res.json();
            setCurrentUserName(data.user?.displayName || user.displayName || 'Student');
            setCurrentUserPhone(data.phone || '');
          } else {
            setCurrentUserName(user.displayName || 'Student');
          }
        } catch (err) {
          setCurrentUserName(user.displayName || 'Student');
        }
      }
    });
    return () => unsubscribe();
  }, []);

  // Fetch items from API
  useEffect(() => {
    fetchItems();
  }, []);

  const fetchItems = async () => {
    try {
      const res = await fetch(`${API_URL}/api/lost-found`);
      if (res.ok) {
        setItems(await res.json());
      }
    } catch (err) {
      console.error('Failed to fetch lost & found items:', err);
    } finally {
      setLoading(false);
    }
  };

  // Report a new item
  const handleReportSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      const res = await fetch(`${API_URL}/api/lost-found`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          itemName: reportForm.name.trim(),
          description: reportForm.description.trim(),
          reportedBy: currentUserName,
          location: reportForm.location.trim() || null,
          category: 'Other',
        }),
      });
      if (res.ok) {
        const newItem = await res.json();
        setItems((prev) => [newItem, ...prev]);
        setShowReportModal(false);
        setReportForm({ type: 'lost', name: '', description: '', location: '' });
      } else {
        alert('Failed to submit report. Please try again.');
      }
    } catch (err) {
      console.error('Failed to report item:', err);
      alert('Network error. Please try again.');
    } finally {
      setSaving(false);
    }
  };

  // Student clicks "I found this"
  const handleFoundClick = async (item) => {
    // Show alert first
    alert('Thank you! Please hand over the item to the Hostel Reception desk.');

    // Notify admin by updating the item in the database
    try {
      await fetch(`${API_URL}/api/lost-found/${item.id}/report-found`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ foundBy: currentUserName, foundByPhone: currentUserPhone }),
      });
      // Update local state
      setItems((prev) =>
        prev.map((i) => (i.id === item.id ? { ...i, status: 'Found', foundBy: currentUserName } : i))
      );
    } catch (err) {
      console.error('Failed to report found item:', err);
    }
  };

  const formatDate = (dateStr) => {
    return new Date(dateStr).toLocaleDateString('en-IN', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
    });
  };

  const lostItems = items.filter((i) => i.status === 'Lost');
  const foundItems = items.filter((i) => i.status === 'Found' || i.status === 'Returned');

  const renderItems = (itemsList, type) => {
    if (loading) {
      return (
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-8 text-center min-h-[300px] flex flex-col items-center justify-center col-span-full">
          <Loader2 size={32} className="animate-spin text-gray-400 mb-3" />
          <p className="text-gray-500 font-medium">Loading items…</p>
        </div>
      );
    }

    if (itemsList.length === 0) {
      return (
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-8 text-center min-h-[300px] flex flex-col items-center justify-center col-span-full">
          <div className="bg-indigo-50 w-16 h-16 rounded-full flex items-center justify-center mb-4">
            <PackageSearch className="w-8 h-8 text-indigo-600" />
          </div>
          <h3 className="text-lg font-medium text-gray-900">No {type} items reported yet</h3>
          <p className="text-gray-500 mt-2 max-w-sm">
            Check back later if you're looking for something.
          </p>
        </div>
      );
    }

    return itemsList.map((item) => (
      <div key={item.id} className="bg-white rounded-xl shadow-sm border border-gray-100 p-5 hover:shadow-md transition-shadow">
        <div className="flex justify-between items-start mb-3">
          <h3 className="font-semibold text-gray-900 text-lg">{item.itemName}</h3>
          <span className={`px-3 py-1 rounded-full text-xs font-medium ${
            item.status === 'Lost' ? 'bg-red-50 text-red-600' :
            item.status === 'Found' ? 'bg-amber-50 text-amber-600' :
            'bg-green-50 text-green-600'
          }`}>
            {item.status}
          </span>
        </div>
        <p className="text-gray-600 text-sm mb-4 line-clamp-2">{item.description}</p>
        <div className="space-y-2">
          {item.location && (
            <div className="flex items-center text-sm text-gray-500">
              <MapPin className="w-4 h-4 mr-2" />
              {item.location}
            </div>
          )}
          <div className="flex items-center text-sm text-gray-500">
            <Calendar className="w-4 h-4 mr-2" />
            {formatDate(item.createdAt)}
          </div>
          <div className="flex items-center text-sm text-gray-500">
            <AlertCircle className="w-4 h-4 mr-2" />
            Reported by: {item.reportedBy}
          </div>
          {item.foundBy && (
            <div className="flex items-center text-sm text-green-600 font-medium">
              <CheckCircle2 className="w-4 h-4 mr-2" />
              Found by: {item.foundBy}
            </div>
          )}
        </div>
        {/* Only show "I found this" for lost items */}
        {item.status === 'Lost' && (
          <div className="mt-5 flex gap-2">
            <button
              onClick={() => handleFoundClick(item)}
              className="flex-1 bg-indigo-50 text-indigo-600 font-medium py-2 rounded-lg text-sm hover:bg-indigo-100 transition-colors"
            >
              I found this
            </button>
          </div>
        )}
        {/* For found items, show "This is mine" which just alerts */}
        {item.status === 'Found' && (
          <div className="mt-5 flex gap-2">
            <button
              onClick={() => alert('Please visit the Hostel Reception desk with your ID to claim this item.')}
              className="flex-1 bg-green-50 text-green-600 font-medium py-2 rounded-lg text-sm hover:bg-green-100 transition-colors"
            >
              This is mine!
            </button>
          </div>
        )}
      </div>
    ));
  };

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Lost & Found</h1>
          <p className="text-gray-500 mt-1 text-sm">Report lost items or help find what others have lost.</p>
        </div>
        <button
          onClick={() => setShowReportModal(true)}
          className="flex items-center space-x-2 bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg transition-colors whitespace-nowrap"
        >
          <PlusCircle className="w-4 h-4" />
          <span className="text-sm font-medium">Report Lost Item</span>
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
          <span>Lost Items ({lostItems.length})</span>
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
          <span>Found Items ({foundItems.length})</span>
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
              <h2 className="text-lg font-semibold text-gray-900">Report a Lost Item</h2>
              <button
                onClick={() => setShowReportModal(false)}
                className="text-gray-400 hover:text-gray-600 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <form onSubmit={handleReportSubmit} className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Item Title</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Blue Water Bottle"
                  className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 outline-none transition-all"
                  value={reportForm.name}
                  onChange={(e) => setReportForm({ ...reportForm, name: e.target.value })}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                <textarea
                  required
                  rows="3"
                  placeholder="Provide identifying details (color, brand, marks etc.)..."
                  className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 outline-none transition-all resize-none"
                  value={reportForm.description}
                  onChange={(e) => setReportForm({ ...reportForm, description: e.target.value })}
                ></textarea>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Last Seen Location</label>
                <input
                  type="text"
                  required
                  placeholder="Where was it lost?"
                  className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 outline-none transition-all"
                  value={reportForm.location}
                  onChange={(e) => setReportForm({ ...reportForm, location: e.target.value })}
                />
              </div>
              <div className="pt-2">
                <button
                  type="submit"
                  disabled={saving}
                  className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-2.5 rounded-lg transition-colors disabled:opacity-60"
                >
                  {saving ? 'Submitting…' : 'Submit Report'}
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
