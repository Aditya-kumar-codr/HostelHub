import React, { useState, useEffect } from 'react';
import { Megaphone, Plus, Edit2, Trash2, Save, X, AlertTriangle, Info, AlertCircle, Bell } from 'lucide-react';
import { API_URL } from '../config';

const importanceConfig = {
  low: { label: 'Low', color: 'bg-gray-100 text-gray-700 border-gray-200', dot: 'bg-gray-400', banner: 'border-gray-200 bg-gray-50' },
  normal: { label: 'Normal', color: 'bg-blue-50 text-blue-700 border-blue-200', dot: 'bg-blue-500', banner: 'border-blue-200 bg-blue-50' },
  important: { label: 'Important', color: 'bg-orange-50 text-orange-700 border-orange-200', dot: 'bg-orange-500', banner: 'border-orange-200 bg-orange-50' },
  urgent: { label: 'Urgent', color: 'bg-red-50 text-red-700 border-red-200', dot: 'bg-red-500', banner: 'border-red-200 bg-red-50' }
};

const AdminAnnouncements = () => {
  const [announcements, setAnnouncements] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [form, setForm] = useState({ title: '', content: '', importance: 'normal' });
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    fetchAnnouncements();
  }, []);

  const fetchAnnouncements = async () => {
    try {
      const res = await fetch(`${API_URL}/api/announcements`);
      if (res.ok) {
        const data = await res.json();
        setAnnouncements(data);
      }
    } catch (err) {
      console.error('Failed to fetch announcements:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async () => {
    if (!form.title.trim() || !form.content.trim()) return alert('Please fill in both title and content.');
    setSaving(true);
    try {
      const url = editingId
        ? `${API_URL}/api/announcements/${editingId}`
        : `${API_URL}/api/announcements`;
      const method = editingId ? 'PUT' : 'POST';

      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form)
      });

      if (res.ok) {
        await fetchAnnouncements();
        resetForm();
      } else {
        alert('Failed to save announcement.');
      }
    } catch (err) {
      console.error('Error saving announcement:', err);
      alert('Error saving announcement.');
    } finally {
      setSaving(false);
    }
  };

  const handleEdit = (announcement) => {
    setForm({
      title: announcement.title,
      content: announcement.content,
      importance: announcement.importance
    });
    setEditingId(announcement.id);
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    if (!confirm('Are you sure you want to delete this announcement?')) return;
    try {
      const res = await fetch(`${API_URL}/api/announcements/${id}`, { method: 'DELETE' });
      if (res.ok) {
        setAnnouncements(prev => prev.filter(a => a.id !== id));
      }
    } catch (err) {
      console.error('Error deleting announcement:', err);
    }
  };

  const resetForm = () => {
    setForm({ title: '', content: '', importance: 'normal' });
    setEditingId(null);
    setShowForm(false);
  };

  const formatDate = (dateStr) => {
    const date = new Date(dateStr);
    const now = new Date();
    const diffMs = now - date;
    const diffMins = Math.floor(diffMs / 60000);
    const diffHrs = Math.floor(diffMins / 60);
    const diffDays = Math.floor(diffHrs / 24);

    if (diffMins < 1) return 'Just now';
    if (diffMins < 60) return `${diffMins} min ago`;
    if (diffHrs < 24) return `${diffHrs} hr${diffHrs > 1 ? 's' : ''} ago`;
    if (diffDays < 7) return `${diffDays} day${diffDays > 1 ? 's' : ''} ago`;
    return date.toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' });
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-gray-800">Announcements</h2>
          <p className="text-sm text-gray-500 mt-1">Create and manage announcements for all students</p>
        </div>
        <button
          onClick={() => { resetForm(); setShowForm(true); }}
          className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2.5 rounded-lg font-bold text-sm transition-colors shadow-sm"
        >
          <Plus size={16} /> New Announcement
        </button>
      </div>

      {/* Create / Edit Form */}
      {showForm && (
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="p-5 border-b border-gray-100 bg-gray-50/50 flex items-center justify-between">
            <h3 className="font-bold text-gray-800 flex items-center gap-2">
              <Megaphone size={18} className="text-indigo-600" />
              {editingId ? 'Edit Announcement' : 'New Announcement'}
            </h3>
            <button onClick={resetForm} className="p-1.5 hover:bg-gray-200 rounded-lg transition-colors">
              <X size={18} className="text-gray-500" />
            </button>
          </div>
          <div className="p-5 space-y-4">
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-1.5">Title</label>
              <input
                type="text"
                value={form.title}
                onChange={(e) => setForm({ ...form, title: e.target.value })}
                placeholder="e.g. Mandatory Hostel Meeting"
                className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-lg text-sm font-medium text-gray-900 outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-400 focus:bg-white transition-all"
              />
            </div>
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-1.5">Content</label>
              <textarea
                value={form.content}
                onChange={(e) => setForm({ ...form, content: e.target.value })}
                placeholder="Write the full announcement details here..."
                rows={4}
                className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-lg text-sm font-medium text-gray-900 outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-400 focus:bg-white transition-all resize-none"
              />
            </div>
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">Importance Level</label>
              <div className="flex flex-wrap gap-2">
                {Object.entries(importanceConfig).map(([key, cfg]) => (
                  <button
                    key={key}
                    onClick={() => setForm({ ...form, importance: key })}
                    className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-bold border transition-all ${
                      form.importance === key
                        ? cfg.color + ' ring-2 ring-offset-1 ring-indigo-400'
                        : 'bg-white border-gray-200 text-gray-500 hover:bg-gray-50'
                    }`}
                  >
                    <span className={`w-2 h-2 rounded-full ${cfg.dot}`}></span>
                    {cfg.label}
                  </button>
                ))}
              </div>
            </div>
            <div className="flex items-center gap-3 pt-2">
              <button
                onClick={handleSubmit}
                disabled={saving}
                className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-2.5 rounded-lg font-bold text-sm transition-colors shadow-sm disabled:opacity-50"
              >
                <Save size={14} /> {saving ? 'Saving...' : editingId ? 'Update' : 'Publish'}
              </button>
              <button
                onClick={resetForm}
                className="px-4 py-2.5 text-gray-600 bg-gray-100 hover:bg-gray-200 rounded-lg font-bold text-sm transition-colors"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Announcements List */}
      {loading ? (
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-12 text-center">
          <div className="animate-spin w-8 h-8 border-3 border-indigo-600 border-t-transparent rounded-full mx-auto mb-3"></div>
          <p className="text-gray-500 font-medium">Loading announcements...</p>
        </div>
      ) : announcements.length === 0 ? (
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-12 text-center">
          <Megaphone className="w-12 h-12 text-gray-300 mx-auto mb-3" />
          <p className="text-gray-500 font-bold text-lg">No announcements yet</p>
          <p className="text-gray-400 text-sm mt-1">Click "New Announcement" to create the first one.</p>
        </div>
      ) : (
        <div className="space-y-3">
          {announcements.map((a) => {
            const cfg = importanceConfig[a.importance] || importanceConfig.normal;
            return (
              <div key={a.id} className={`bg-white rounded-xl shadow-sm border overflow-hidden ${cfg.banner}`}>
                <div className="p-5">
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-2 flex-wrap">
                        <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-bold border ${cfg.color}`}>
                          <span className={`w-1.5 h-1.5 rounded-full ${cfg.dot}`}></span>
                          {cfg.label}
                        </span>
                        <span className="text-xs text-gray-400 font-medium">{formatDate(a.createdAt)}</span>
                        {a.updatedAt !== a.createdAt && (
                          <span className="text-xs text-gray-400 font-medium italic">(edited)</span>
                        )}
                      </div>
                      <h3 className="text-lg font-black text-gray-900 mb-1">{a.title}</h3>
                      <p className="text-sm text-gray-600 leading-relaxed whitespace-pre-wrap">{a.content}</p>
                    </div>
                    <div className="flex items-center gap-1 flex-shrink-0">
                      <button
                        onClick={() => handleEdit(a)}
                        className="p-2 text-gray-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors"
                        title="Edit"
                      >
                        <Edit2 size={16} />
                      </button>
                      <button
                        onClick={() => handleDelete(a.id)}
                        className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                        title="Delete"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default AdminAnnouncements;
