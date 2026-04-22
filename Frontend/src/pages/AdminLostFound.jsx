import React, { useState, useEffect } from 'react';
import { Search, PlusCircle, MapPin, Calendar, CheckCircle2, AlertCircle, X, Loader2, PackageSearch, Trash2, User } from 'lucide-react';
import { API_URL } from '../config';

const CATEGORIES = [
  'Electronics', 'Clothing', 'Books & Stationery', 'ID & Cards', 'Keys',
  'Wallet & Money', 'Water Bottle', 'Bag & Luggage', 'Sports Equipment', 'Other',
];

const AdminLostFound = () => {
  const [activeTab, setActiveTab] = useState('lost');
  const [showReportModal, setShowReportModal] = useState(false);
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const [reportForm, setReportForm] = useState({
    name: '',
    description: '',
    reportedBy: '',
    location: '',
    category: '',
  });

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

  // Admin adds a new lost item report
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
          reportedBy: reportForm.reportedBy.trim(),
          location: reportForm.location.trim() || null,
          category: reportForm.category || 'Other',
        }),
      });
      if (res.ok) {
        const newItem = await res.json();
        setItems((prev) => [newItem, ...prev]);
        setShowReportModal(false);
        setReportForm({ name: '', description: '', reportedBy: '', location: '', category: '' });
      } else {
        alert('Failed to add item. Please try again.');
      }
    } catch (err) {
      console.error('Failed to add item:', err);
      alert('Network error. Please try again.');
    } finally {
      setSaving(false);
    }
  };

  // Admin updates item status
  const handleStatusChange = async (id, newStatus) => {
    setItems((prev) => prev.map((i) => (i.id === id ? { ...i, status: newStatus } : i)));
    try {
      const res = await fetch(`${API_URL}/api/lost-found/${id}/status`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus }),
      });
      if (!res.ok) {
        fetchItems(); // revert on failure
      }
    } catch (err) {
      console.error('Failed to update status:', err);
      fetchItems();
    }
  };

  // Admin deletes an item
  const handleDelete = async (id) => {
    if (!window.confirm('Delete this lost & found entry?')) return;
    setItems((prev) => prev.filter((i) => i.id !== id));
    try {
      await fetch(`${API_URL}/api/lost-found/${id}`, { method: 'DELETE' });
    } catch (err) {
      console.error('Failed to delete item:', err);
      fetchItems();
    }
  };

  const formatDate = (dateStr) => {
    return new Date(dateStr).toLocaleDateString('en-IN', {
      day: 'numeric', month: 'short', year: 'numeric',
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
            Click "Add Lost Item" to add a new entry.
          </p>
        </div>
      );
    }

    return itemsList.map((item) => (
      <div key={item.id} className="bg-white rounded-xl shadow-sm border border-gray-100 p-5 hover:shadow-md transition-shadow group">
        <div className="flex justify-between items-start mb-3">
          <h3 className="font-semibold text-gray-900 text-lg">{item.itemName}</h3>
          <div className="flex items-center gap-2">
            <span className={`px-3 py-1 rounded-full text-xs font-medium ${
              item.status === 'Lost' ? 'bg-red-50 text-red-600' :
              item.status === 'Found' ? 'bg-amber-50 text-amber-600' :
              'bg-green-50 text-green-600'
            }`}>
              {item.status}
            </span>
            {/* Admin: Delete button */}
            <button
              onClick={() => handleDelete(item.id)}
              className="opacity-0 group-hover:opacity-100 p-1.5 text-gray-300 hover:text-red-500 hover:bg-red-50 rounded-lg transition-all"
              title="Delete item"
            >
              <Trash2 size={15} />
            </button>
          </div>
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
            <User className="w-4 h-4 mr-2" />
            Reported by: {item.reportedBy}
          </div>
          {item.category && item.category !== 'Other' && (
            <div className="flex items-center text-sm text-gray-500">
              <Search className="w-4 h-4 mr-2" />
              Category: {item.category}
            </div>
          )}

          {/* Admin: Show who found this item — this is the key notification */}
          {item.foundBy && (
            <div className="flex flex-col gap-1 text-sm font-bold text-green-700 bg-green-50 border border-green-200 px-3 py-2.5 rounded-lg mt-2">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 flex-shrink-0" />
                <span>Found by: <strong>{item.foundBy}</strong></span>
              </div>
              {item.foundByPhone && (
                <div className="flex items-center gap-2 text-green-600 font-medium ml-6">
                  <span>📞 {item.foundByPhone}</span>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Admin: Status controls */}
        <div className="mt-4 pt-3 border-t border-gray-100">
          <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-2">Update Status</p>
          <div className="flex gap-2">
            {['Lost', 'Found', 'Returned'].map((status) => (
              <button
                key={status}
                onClick={() => handleStatusChange(item.id, status)}
                className={`flex-1 py-1.5 rounded-lg text-xs font-bold transition-all border ${
                  item.status === status
                    ? status === 'Lost' ? 'bg-red-50 text-red-700 border-red-200'
                      : status === 'Found' ? 'bg-amber-50 text-amber-700 border-amber-200'
                      : 'bg-green-50 text-green-700 border-green-200'
                    : 'bg-white text-gray-500 border-gray-200 hover:bg-gray-50'
                }`}
              >
                {status}
              </button>
            ))}
          </div>
        </div>
      </div>
    ));
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Lost & Found</h1>
          <p className="text-gray-500 mt-1 text-sm">Manage lost items and see reports from students.</p>
        </div>
        <button
          onClick={() => setShowReportModal(true)}
          className="flex items-center space-x-2 bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg transition-colors whitespace-nowrap"
        >
          <PlusCircle className="w-4 h-4" />
          <span className="text-sm font-medium">Add Lost Item</span>
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

      {/* Add Item Modal */}
      {showReportModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl w-full max-w-md overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-100 flex justify-between items-center bg-gray-50/50">
              <h2 className="text-lg font-semibold text-gray-900">Add Lost Item</h2>
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
                <label className="block text-sm font-medium text-gray-700 mb-1">Reported By</label>
                <input
                  type="text"
                  required
                  placeholder="Student name"
                  className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 outline-none transition-all"
                  value={reportForm.reportedBy}
                  onChange={(e) => setReportForm({ ...reportForm, reportedBy: e.target.value })}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
                <select
                  className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 outline-none transition-all"
                  value={reportForm.category}
                  onChange={(e) => setReportForm({ ...reportForm, category: e.target.value })}
                >
                  <option value="">Select category…</option>
                  {CATEGORIES.map((c) => (
                    <option key={c} value={c}>{c}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                <textarea
                  required
                  rows="3"
                  placeholder="Provide identifying details..."
                  className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 outline-none transition-all resize-none"
                  value={reportForm.description}
                  onChange={(e) => setReportForm({ ...reportForm, description: e.target.value })}
                ></textarea>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Location</label>
                <input
                  type="text"
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
                  {saving ? 'Adding…' : 'Add Item'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminLostFound;
