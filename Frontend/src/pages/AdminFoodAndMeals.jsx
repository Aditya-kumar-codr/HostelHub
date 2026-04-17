import React, { useState, useEffect } from 'react';
import {
  Utensils,
  Edit2,
  Save,
  X,
  Coffee,
  Sun,
  Moon,
  ChevronLeft,
  ChevronRight,
  Calendar,
  Star,
  MessageSquare,
  User
} from 'lucide-react';
import { API_URL } from '../config';

const AdminFoodAndMeals = () => {
  const today = new Date().toISOString().split('T')[0];
  const [selectedDate, setSelectedDate] = useState(today);
  const [meals, setMeals] = useState({ breakfast: '', lunch: '', dinner: '' });
  const [reviews, setReviews] = useState([]);
  const [editingMeal, setEditingMeal] = useState(null);
  const [editValue, setEditValue] = useState('');
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);

  // Fetch meals and reviews for selected date
  useEffect(() => {
    fetchMeals();
    fetchReviews();
  }, [selectedDate]);

  const fetchMeals = async () => {
    setLoading(true);
    try {
      const res = await fetch(`${API_URL}/api/meals/${selectedDate}`);
      if (res.ok) {
        const data = await res.json();
        const mealMap = { breakfast: '', lunch: '', dinner: '' };
        data.forEach(m => { mealMap[m.mealType] = m.items; });
        setMeals(mealMap);
      }
    } catch (err) {
      console.error('Failed to fetch meals:', err);
    }
    setLoading(false);
  };

  const fetchReviews = async () => {
    try {
      const res = await fetch(`${API_URL}/api/reviews`);
      if (res.ok) {
        const data = await res.json();
        setReviews(data);
      }
    } catch (err) {
      console.error('Failed to fetch reviews:', err);
    }
  };

  const handleSave = async (mealType) => {
    setSaving(true);
    try {
      const res = await fetch(`${API_URL}/api/meals`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ date: selectedDate, mealType, items: editValue })
      });
      if (res.ok) {
        setMeals(prev => ({ ...prev, [mealType]: editValue }));
        setEditingMeal(null);
        setEditValue('');
      }
    } catch (err) {
      console.error('Failed to save meal:', err);
    }
    setSaving(false);
  };

  const startEdit = (mealType) => {
    setEditingMeal(mealType);
    setEditValue(meals[mealType]);
  };

  const cancelEdit = () => {
    setEditingMeal(null);
    setEditValue('');
  };

  const changeDate = (days) => {
    const d = new Date(selectedDate);
    d.setDate(d.getDate() + days);
    setSelectedDate(d.toISOString().split('T')[0]);
  };

  const formatDate = (dateStr) => {
    const d = new Date(dateStr + 'T00:00:00');
    return d.toLocaleDateString('en-IN', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });
  };

  const formatReviewDate = (timestamp) => {
    const d = new Date(timestamp);
    const time = d.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    if (d.toDateString() === new Date().toDateString()) {
      return `Today, ${time}`;
    }
    return `${d.toLocaleDateString()} ${time}`;
  };

  const isToday = selectedDate === today;

  const mealConfig = [
    { type: 'breakfast', label: 'Breakfast', icon: Coffee, time: '7:30 AM - 9:30 AM', gradient: 'from-amber-400 to-orange-500', bg: 'bg-amber-50', border: 'border-amber-100', text: 'text-amber-700', iconBg: 'bg-amber-100' },
    { type: 'lunch', label: 'Lunch', icon: Sun, time: '12:30 PM - 2:30 PM', gradient: 'from-emerald-400 to-teal-500', bg: 'bg-emerald-50', border: 'border-emerald-100', text: 'text-emerald-700', iconBg: 'bg-emerald-100' },
    { type: 'dinner', label: 'Dinner', icon: Moon, time: '7:30 PM - 9:30 PM', gradient: 'from-indigo-400 to-purple-500', bg: 'bg-indigo-50', border: 'border-indigo-100', text: 'text-indigo-700', iconBg: 'bg-indigo-100' }
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2">
              <Utensils className="w-5 h-5 text-indigo-600" />
              Food & Meals Management
            </h2>
            <p className="text-sm text-gray-500 mt-1">Set daily menus for breakfast, lunch, and dinner</p>
          </div>

          {/* Date Picker */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => changeDate(-1)}
              className="p-2 bg-gray-50 border border-gray-200 rounded-lg hover:bg-gray-100 transition-colors"
            >
              <ChevronLeft className="w-4 h-4 text-gray-600" />
            </button>

            <div className="flex items-center gap-2 px-4 py-2 bg-gray-50 border border-gray-200 rounded-lg">
              <Calendar className="w-4 h-4 text-gray-500" />
              <input
                type="date"
                value={selectedDate}
                onChange={(e) => setSelectedDate(e.target.value)}
                className="bg-transparent text-sm font-semibold text-gray-900 outline-none cursor-pointer"
              />
            </div>

            <button
              onClick={() => changeDate(1)}
              className="p-2 bg-gray-50 border border-gray-200 rounded-lg hover:bg-gray-100 transition-colors"
            >
              <ChevronRight className="w-4 h-4 text-gray-600" />
            </button>

            {!isToday && (
              <button
                onClick={() => setSelectedDate(today)}
                className="px-3 py-2 text-xs font-bold text-indigo-600 bg-indigo-50 border border-indigo-100 rounded-lg hover:bg-indigo-100 transition-colors"
              >
                Today
              </button>
            )}
          </div>
        </div>

        <div className="mt-3 text-sm font-medium text-gray-600">
          {isToday ? (
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-green-50 text-green-700 rounded-full text-xs font-bold border border-green-100">
              <span className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse"></span>
              Today
            </span>
          ) : null}
          {' '}{formatDate(selectedDate)}
        </div>
      </div>

      {/* Meal Cards */}
      {loading ? (
        <div className="text-center py-12 text-gray-400 font-medium">Loading meals...</div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
          {mealConfig.map(({ type, label, icon: Icon, time, gradient, bg, border, text, iconBg }) => (
            <div
              key={type}
              className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden flex flex-col"
            >
              {/* Card Header */}
              <div className={`bg-gradient-to-r ${gradient} px-5 py-4 flex items-center justify-between`}>
                <div className="flex items-center gap-3">
                  <div className="bg-white/20 backdrop-blur-sm p-2 rounded-xl">
                    <Icon className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h3 className="text-white font-bold text-lg">{label}</h3>
                    <p className="text-white/80 text-xs font-medium">{time}</p>
                  </div>
                </div>
                {editingMeal !== type && (
                  <button
                    onClick={() => startEdit(type)}
                    className="p-2 bg-white/20 backdrop-blur-sm text-white rounded-lg hover:bg-white/30 transition-colors"
                  >
                    <Edit2 className="w-4 h-4" />
                  </button>
                )}
              </div>

              {/* Card Body */}
              <div className="p-5 flex-1 flex flex-col">
                {editingMeal === type ? (
                  <div className="flex-1 flex flex-col gap-3">
                    <textarea
                      value={editValue}
                      onChange={(e) => setEditValue(e.target.value)}
                      placeholder={`Enter ${label.toLowerCase()} items...\n\nExample:\n• Poha\n• Bread & Butter\n• Tea / Coffee`}
                      className="flex-1 min-h-[150px] w-full p-3 text-sm bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-400 outline-none transition-all resize-none font-medium text-gray-800"
                      autoFocus
                    />
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleSave(type)}
                        disabled={saving}
                        className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl font-semibold text-sm transition-colors disabled:opacity-50 shadow-sm"
                      >
                        <Save className="w-4 h-4" />
                        {saving ? 'Saving...' : 'Save Menu'}
                      </button>
                      <button
                        onClick={cancelEdit}
                        className="px-4 py-2.5 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-xl font-semibold text-sm transition-colors"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="flex-1">
                    {meals[type] ? (
                      <div className="space-y-1.5">
                        {meals[type].split('\n').map((item, i) => (
                          item.trim() && (
                            <div key={i} className={`flex items-start gap-2 px-3 py-2 ${bg} rounded-lg ${border} border`}>
                              <span className={`mt-0.5 w-1.5 h-1.5 rounded-full bg-current ${text} flex-shrink-0`}></span>
                              <span className={`text-sm font-medium ${text}`}>{item.replace(/^[•\-]\s*/, '')}</span>
                            </div>
                          )
                        ))}
                      </div>
                    ) : (
                      <div className="flex flex-col items-center justify-center py-8 text-gray-400">
                        <Utensils className="w-8 h-8 mb-2 opacity-30" />
                        <p className="text-sm font-medium">No menu set</p>
                        <button
                          onClick={() => startEdit(type)}
                          className="mt-3 px-4 py-2 text-xs font-bold text-indigo-600 bg-indigo-50 border border-indigo-100 rounded-lg hover:bg-indigo-100 transition-colors"
                        >
                          + Add Menu
                        </button>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Student Reviews Section */}
      <div className="mt-8 bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
        <div className="flex items-center justify-between mb-6 pb-4 border-b border-gray-50">
          <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2">
            <MessageSquare className="w-5 h-5 text-indigo-600" />
            Recent Student Reviews
          </h2>
          <span className="text-xs font-medium text-indigo-600 bg-indigo-50 px-3 py-1.5 rounded-full">
            Live Feed
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {reviews.length > 0 ? (
            reviews.map((rev) => (
              <div key={rev.id || Math.random()} className="p-5 rounded-2xl bg-gray-50 border border-gray-100 hover:border-indigo-100 hover:bg-white hover:shadow-md transition-all">
                <div className="flex justify-between items-start mb-3">
                  <div className="flex items-center">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-indigo-500 to-purple-500 flex items-center justify-center text-white mr-3 shadow-sm">
                      <User className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="text-sm font-bold text-gray-900">{rev.studentName || rev.student || 'Student'}</p>
                      <p className="text-xs font-medium text-gray-500 mt-0.5">{rev.createdAt ? formatReviewDate(rev.createdAt) : rev.date}</p>
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center mb-3">
                  <span className="text-xs font-bold text-indigo-900 bg-indigo-100 px-2 py-0.5 rounded mr-2 uppercase tracking-wide">
                    {rev.meal}
                  </span>
                  <div className="flex items-center">
                    {[...Array(5)].map((_, i) => (
                      <Star 
                        key={i} 
                        className={`w-3.5 h-3.5 ${i < rev.rating ? 'text-yellow-400 fill-current' : 'text-gray-200'}`} 
                      />
                    ))}
                  </div>
                </div>

                {rev.foodItems && (
                  <p className="text-[11px] font-medium text-gray-500 mb-2 truncate bg-gray-100/50 px-2 py-1 rounded-md border border-gray-100">
                    <span className="text-gray-400 mr-1">Served:</span>{rev.foodItems.replace(/[\n•\-]/g, ' ').replace(/\s+/g, ' ').trim()}
                  </p>
                )}

                <p className="text-sm text-gray-700 leading-relaxed italic">
                  "{rev.comment}"
                </p>
              </div>
            ))
          ) : (
            <div className="col-span-full flex flex-col items-center justify-center py-10 text-gray-400">
              <MessageSquare className="w-10 h-10 mb-3 opacity-20" />
              <p className="text-sm font-medium">No reviews submitted yet.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminFoodAndMeals;
