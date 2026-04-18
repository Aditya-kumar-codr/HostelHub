import React, { useState, useEffect } from 'react';
import { Megaphone, AlertTriangle, Info, AlertCircle, Bell } from 'lucide-react';
import { API_URL } from '../config';

const importanceConfig = {
  low: { label: 'Low', icon: Info, color: 'text-gray-600', bg: 'bg-gray-50', border: 'border-gray-200', dot: 'bg-gray-400', badge: 'bg-gray-100 text-gray-600' },
  normal: { label: 'Normal', icon: Bell, color: 'text-blue-600', bg: 'bg-blue-50', border: 'border-blue-200', dot: 'bg-blue-500', badge: 'bg-blue-100 text-blue-700' },
  important: { label: 'Important', icon: AlertCircle, color: 'text-orange-600', bg: 'bg-orange-50', border: 'border-orange-200', dot: 'bg-orange-500', badge: 'bg-orange-100 text-orange-700' },
  urgent: { label: 'Urgent', icon: AlertTriangle, color: 'text-red-600', bg: 'bg-red-50', border: 'border-red-200', dot: 'bg-red-500', badge: 'bg-red-100 text-red-700' }
};

const Announcements = () => {
  const [announcements, setAnnouncements] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all');

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

  const filtered = filter === 'all' ? announcements : announcements.filter(a => a.importance === filter);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-2xl font-bold text-gray-800">Announcements</h2>
        <p className="text-sm text-gray-500 mt-1">Stay updated with the latest hostel notices</p>
      </div>

      {/* Urgent Announcements Banner */}
      {announcements.filter(a => a.importance === 'urgent').length > 0 && (
        <div className="bg-red-50 border border-red-200 rounded-xl p-4 flex items-start gap-3">
          <AlertTriangle className="w-5 h-5 text-red-600 mt-0.5 flex-shrink-0" />
          <div>
            <p className="text-sm font-bold text-red-800">
              {announcements.filter(a => a.importance === 'urgent').length} urgent announcement{announcements.filter(a => a.importance === 'urgent').length > 1 ? 's' : ''} require your attention
            </p>
          </div>
        </div>
      )}

      {/* Filter Tabs */}
      <div className="flex flex-wrap gap-2">
        {[
          { key: 'all', label: 'All' },
          { key: 'urgent', label: 'Urgent' },
          { key: 'important', label: 'Important' },
          { key: 'normal', label: 'Normal' },
          { key: 'low', label: 'Low' }
        ].map(tab => (
          <button
            key={tab.key}
            onClick={() => setFilter(tab.key)}
            className={`px-4 py-2 rounded-lg text-sm font-bold transition-all border ${
              filter === tab.key
                ? 'bg-indigo-50 text-indigo-700 border-indigo-200'
                : 'bg-white text-gray-500 border-gray-200 hover:bg-gray-50 hover:text-gray-700'
            }`}
          >
            {tab.label}
            {tab.key !== 'all' && (
              <span className="ml-1.5 text-xs opacity-70">
                ({announcements.filter(a => a.importance === tab.key).length})
              </span>
            )}
          </button>
        ))}
      </div>

      {/* Content */}
      {loading ? (
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-12 text-center">
          <div className="animate-spin w-8 h-8 border-3 border-indigo-600 border-t-transparent rounded-full mx-auto mb-3"></div>
          <p className="text-gray-500 font-medium">Loading announcements...</p>
        </div>
      ) : filtered.length === 0 ? (
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-12 text-center">
          <Megaphone className="w-12 h-12 text-gray-300 mx-auto mb-3" />
          <p className="text-gray-500 font-bold text-lg">No announcements</p>
          <p className="text-gray-400 text-sm mt-1">
            {filter !== 'all' ? 'No announcements match this filter.' : 'No announcements have been posted yet.'}
          </p>
        </div>
      ) : (
        <div className="space-y-3">
          {filtered.map((a) => {
            const cfg = importanceConfig[a.importance] || importanceConfig.normal;
            const Icon = cfg.icon;
            return (
              <div key={a.id} className={`bg-white rounded-xl shadow-sm border overflow-hidden transition-all hover:shadow-md ${cfg.border}`}>
                <div className={`p-5 ${a.importance === 'urgent' ? cfg.bg : ''}`}>
                  <div className="flex items-start gap-3">
                    <div className={`p-2 rounded-lg ${cfg.bg} flex-shrink-0 mt-0.5`}>
                      <Icon className={`w-5 h-5 ${cfg.color}`} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1.5 flex-wrap">
                        <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-xs font-bold ${cfg.badge}`}>
                          <span className={`w-1.5 h-1.5 rounded-full ${cfg.dot}`}></span>
                          {cfg.label}
                        </span>
                        <span className="text-xs text-gray-400 font-medium">{formatDate(a.createdAt)}</span>
                      </div>
                      <h3 className="text-base font-black text-gray-900 mb-1">{a.title}</h3>
                      <p className="text-sm text-gray-600 leading-relaxed whitespace-pre-wrap">{a.content}</p>
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

export default Announcements;
