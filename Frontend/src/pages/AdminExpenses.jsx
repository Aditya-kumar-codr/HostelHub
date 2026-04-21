import React, { useState, useEffect } from 'react';
import {
  IndianRupee,
  Plus,
  Trash2,
  CheckCircle2,
  Circle,
  Calendar,
  Users,
  ChevronDown,
  AlertCircle,
  X,
  Loader2,
  Receipt,
  TrendingUp,
  ArrowLeft,
} from 'lucide-react';
import { API_URL } from '../config';

const EXPENSE_PRESETS = [
  'Hostel Fees',
  'Mess Charges',
  'Laundry Services',
  'Electricity Bill',
  'Water Charges',
  'Maintenance Fee',
  'Security Deposit',
  'Library Fee',
  'Sports Fee',
  'Other',
];

const AdminExpenses = () => {
  const [students, setStudents] = useState([]);
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [expenses, setExpenses] = useState([]);
  const [loadingStudents, setLoadingStudents] = useState(true);
  const [loadingExpenses, setLoadingExpenses] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [saving, setSaving] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [error, setError] = useState('');

  const [form, setForm] = useState({
    title: '',
    customTitle: '',
    amount: '',
    dueDate: '',
  });

  // Auto-dismiss error after 5 seconds
  useEffect(() => {
    if (error) {
      const timer = setTimeout(() => setError(''), 5000);
      return () => clearTimeout(timer);
    }
  }, [error]);

  /* ── Load students ─────────────────────────────────── */
  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const res = await fetch(`${API_URL}/api/profile/all`);
        if (res.ok) {
          const data = await res.json();
          setStudents(
            data.map((s) => ({
              id: s.firebaseUid,
              name: s.displayName || s.name || 'Unnamed Student',
              room: s.room || 'Unassigned',
              email: s.email || '',
            }))
          );
        } else {
          console.error('Failed to fetch students, status:', res.status);
          setError('Failed to load students list.');
        }
      } catch (err) {
        console.error('Failed to fetch students:', err);
        setError('Network error: Could not load students.');
      } finally {
        setLoadingStudents(false);
      }
    };
    fetchStudents();
  }, []);

  /* ── Load expenses for selected student ─────────────── */
  useEffect(() => {
    if (!selectedStudent) return;
    const fetchExpenses = async () => {
      setLoadingExpenses(true);
      try {
        const res = await fetch(
          `${API_URL}/api/expenses?studentName=${encodeURIComponent(selectedStudent.name)}`
        );
        if (res.ok) {
          setExpenses(await res.json());
        } else {
          console.error('Failed to fetch expenses, status:', res.status, await res.text());
          setError(`Failed to load expenses (HTTP ${res.status}). Make sure the backend is deployed with expense routes.`);
        }
      } catch (err) {
        console.error('Failed to fetch expenses:', err);
        setError('Network error: Could not load expenses.');
      } finally {
        setLoadingExpenses(false);
      }
    };
    fetchExpenses();
  }, [selectedStudent]);

  /* ── Add expense ─────────────────────────────────────── */
  const handleAddExpense = async (e) => {
    e.preventDefault();
    if (!selectedStudent) return;
    const title = form.title === 'Other' ? form.customTitle.trim() : form.title;
    if (!title || !form.amount) return;

    setSaving(true);
    setError('');
    try {
      const res = await fetch(`${API_URL}/api/expenses`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          studentName: selectedStudent.name,
          title,
          amount: parseFloat(form.amount),
          dueDate: form.dueDate || null,
        }),
      });
      if (res.ok) {
        const newExpense = await res.json();
        setExpenses((prev) => [newExpense, ...prev]);
        setForm({ title: '', customTitle: '', amount: '', dueDate: '' });
        setShowForm(false);
      } else {
        const errText = await res.text();
        console.error('Failed to save expense, status:', res.status, errText);
        setError(`Failed to save expense (HTTP ${res.status}). Make sure the backend is deployed with expense routes.`);
      }
    } catch (err) {
      console.error('Failed to add expense:', err);
      setError('Network error: Could not save expense.');
    } finally {
      setSaving(false);
    }
  };

  /* ── Toggle paid ─────────────────────────────────────── */
  const handleTogglePaid = async (expense) => {
    const newPaid = !expense.isPaid;
    // Optimistic update
    setExpenses((prev) =>
      prev.map((e) => (e.id === expense.id ? { ...e, isPaid: newPaid } : e))
    );
    try {
      const res = await fetch(`${API_URL}/api/expenses/${expense.id}/paid`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ isPaid: newPaid }),
      });
      if (!res.ok) {
        // Revert on failure
        setExpenses((prev) =>
          prev.map((e) => (e.id === expense.id ? { ...e, isPaid: expense.isPaid } : e))
        );
      }
    } catch (err) {
      console.error('Failed to toggle paid:', err);
      setExpenses((prev) =>
        prev.map((e) => (e.id === expense.id ? { ...e, isPaid: expense.isPaid } : e))
      );
    }
  };

  /* ── Delete expense ──────────────────────────────────── */
  const handleDelete = async (id) => {
    if (!window.confirm('Delete this expense entry?')) return;
    setExpenses((prev) => prev.filter((e) => e.id !== id));
    try {
      await fetch(`${API_URL}/api/expenses/${id}`, { method: 'DELETE' });
    } catch (err) {
      console.error('Failed to delete expense:', err);
    }
  };

  /* ── Derived stats ───────────────────────────────────── */
  const totalAmount = expenses.reduce((s, e) => s + parseFloat(e.amount || 0), 0);
  const paidAmount = expenses
    .filter((e) => e.isPaid)
    .reduce((s, e) => s + parseFloat(e.amount || 0), 0);
  const pendingAmount = totalAmount - paidAmount;

  const filteredStudents = students.filter(
    (s) =>
      s.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.room.toLowerCase().includes(searchQuery.toLowerCase())
  );

  /* ══════════════════════════════════════════════════════ */
  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-gray-900 tracking-tight">
            Student Expenses
          </h1>
          <p className="text-sm text-gray-500 mt-1">
            Assign fee entries and mark payment status per student.
          </p>
        </div>
      </div>

      {/* Error Banner */}
      {error && (
        <div className="flex items-center gap-3 bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-xl text-sm font-medium animate-fade-in">
          <AlertCircle size={18} className="flex-shrink-0" />
          <span className="flex-1">{error}</span>
          <button onClick={() => setError('')} className="p-1 hover:bg-red-100 rounded-lg transition-colors">
            <X size={16} />
          </button>
        </div>
      )}

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        {/* ── Left: Student Selector ────────────────────── */}
        <div className="xl:col-span-1">
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
            <div className="p-4 border-b border-gray-100 bg-gray-50/60">
              <div className="flex items-center gap-2 mb-3">
                <Users size={16} className="text-indigo-600" />
                <h2 className="font-bold text-gray-800 text-sm uppercase tracking-wide">
                  Select Student
                </h2>
              </div>
              <input
                type="text"
                placeholder="Search by name or room…"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full px-3 py-2 text-sm bg-white border border-gray-200 rounded-lg outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-400"
              />
            </div>

            <div className="max-h-[420px] overflow-y-auto divide-y divide-gray-50">
              {loadingStudents ? (
                <div className="flex items-center justify-center py-12 text-gray-400">
                  <Loader2 size={24} className="animate-spin" />
                </div>
              ) : filteredStudents.length === 0 ? (
                <p className="text-center py-10 text-sm text-gray-400">No students found</p>
              ) : (
                filteredStudents.map((student) => {
                  const isActive = selectedStudent?.id === student.id;
                  return (
                    <button
                      key={student.id}
                      onClick={() => {
                        setSelectedStudent(student);
                        setShowForm(false);
                        setExpenses([]);
                      }}
                      className={`w-full flex items-center gap-3 px-4 py-3.5 text-left transition-all ${
                        isActive
                          ? 'bg-indigo-50 border-l-4 border-indigo-500'
                          : 'hover:bg-gray-50 border-l-4 border-transparent'
                      }`}
                    >
                      <div
                        className={`w-9 h-9 rounded-xl flex items-center justify-center font-black text-sm flex-shrink-0 ${
                          isActive
                            ? 'bg-indigo-600 text-white'
                            : 'bg-indigo-100 text-indigo-700'
                        }`}
                      >
                        {student.name.charAt(0)}
                      </div>
                      <div className="min-w-0">
                        <p
                          className={`font-bold text-sm truncate ${
                            isActive ? 'text-indigo-700' : 'text-gray-900'
                          }`}
                        >
                          {student.name}
                        </p>
                        <p className="text-xs text-gray-500 font-medium">
                          Room {student.room}
                        </p>
                      </div>
                    </button>
                  );
                })
              )}
            </div>
          </div>
        </div>

        {/* ── Right: Expense Manager ────────────────────── */}
        <div className="xl:col-span-2 space-y-5">
          {!selectedStudent ? (
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm flex flex-col items-center justify-center py-20 text-center">
              <div className="w-16 h-16 bg-indigo-50 rounded-2xl flex items-center justify-center mb-4">
                <Receipt size={28} className="text-indigo-400" />
              </div>
              <h3 className="font-bold text-gray-700 mb-1">No student selected</h3>
              <p className="text-sm text-gray-400 max-w-xs">
                Choose a student from the list on the left to manage their expenses.
              </p>
            </div>
          ) : (
            <>
              {/* Student Banner */}
              <div className="bg-gradient-to-r from-indigo-600 to-violet-600 rounded-2xl p-5 text-white shadow-lg shadow-indigo-500/20">
                <div className="flex items-center justify-between flex-wrap gap-4">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-white/20 backdrop-blur rounded-xl flex items-center justify-center font-black text-xl">
                      {selectedStudent.name.charAt(0)}
                    </div>
                    <div>
                      <h2 className="text-lg font-black">{selectedStudent.name}</h2>
                      <p className="text-indigo-200 text-sm font-medium">
                        Room {selectedStudent.room}
                      </p>
                    </div>
                  </div>
                  <button
                    onClick={() => setShowForm((v) => !v)}
                    className="flex items-center gap-2 bg-white text-indigo-700 font-bold text-sm px-4 py-2.5 rounded-xl hover:bg-indigo-50 transition-colors shadow-sm"
                  >
                    {showForm ? <X size={16} /> : <Plus size={16} />}
                    {showForm ? 'Cancel' : 'Add Expense'}
                  </button>
                </div>

                {/* Stats Row */}
                <div className="grid grid-cols-3 gap-3 mt-5">
                  {[
                    { label: 'Total', value: totalAmount, color: 'bg-white/10' },
                    { label: 'Paid', value: paidAmount, color: 'bg-green-500/20' },
                    { label: 'Pending', value: pendingAmount, color: 'bg-red-500/20' },
                  ].map((stat) => (
                    <div key={stat.label} className={`${stat.color} backdrop-blur rounded-xl p-3 text-center`}>
                      <p className="text-xs font-bold text-white/70 uppercase tracking-wide mb-1">
                        {stat.label}
                      </p>
                      <p className="font-black text-lg flex items-center justify-center">
                        <IndianRupee size={14} className="stroke-[3] mr-0.5" />
                        {stat.value.toLocaleString('en-IN', { minimumFractionDigits: 0 })}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Add Expense Form */}
              {showForm && (
                <div className="bg-white rounded-2xl border border-indigo-100 shadow-sm p-5">
                  <h3 className="font-bold text-gray-800 mb-4 flex items-center gap-2">
                    <Plus size={18} className="text-indigo-600" /> New Expense Entry
                  </h3>
                  <form onSubmit={handleAddExpense} className="space-y-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-bold text-gray-500 uppercase tracking-wide mb-1.5">
                          Expense Type *
                        </label>
                        <select
                          required
                          value={form.title}
                          onChange={(e) => setForm({ ...form, title: e.target.value, customTitle: '' })}
                          className="w-full px-3 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm font-medium text-gray-900 outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-400 focus:bg-white"
                        >
                          <option value="">Select a category…</option>
                          {EXPENSE_PRESETS.map((p) => (
                            <option key={p} value={p}>{p}</option>
                          ))}
                        </select>
                      </div>

                      {form.title === 'Other' && (
                        <div>
                          <label className="block text-xs font-bold text-gray-500 uppercase tracking-wide mb-1.5">
                            Custom Title *
                          </label>
                          <input
                            type="text"
                            required
                            placeholder="Enter expense title…"
                            value={form.customTitle}
                            onChange={(e) => setForm({ ...form, customTitle: e.target.value })}
                            className="w-full px-3 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm font-medium text-gray-900 outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-400 focus:bg-white"
                          />
                        </div>
                      )}

                      <div>
                        <label className="block text-xs font-bold text-gray-500 uppercase tracking-wide mb-1.5">
                          Amount (₹) *
                        </label>
                        <div className="relative">
                          <IndianRupee size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 stroke-[2.5]" />
                          <input
                            type="number"
                            required
                            min="0"
                            step="0.01"
                            placeholder="0.00"
                            value={form.amount}
                            onChange={(e) => setForm({ ...form, amount: e.target.value })}
                            className="w-full pl-8 pr-3 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm font-medium text-gray-900 outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-400 focus:bg-white"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-xs font-bold text-gray-500 uppercase tracking-wide mb-1.5">
                          Due Date
                        </label>
                        <div className="relative">
                          <Calendar size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                          <input
                            type="date"
                            value={form.dueDate}
                            onChange={(e) => setForm({ ...form, dueDate: e.target.value })}
                            className="w-full pl-8 pr-3 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm font-medium text-gray-900 outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-400 focus:bg-white"
                          />
                        </div>
                      </div>
                    </div>

                    <div className="flex justify-end pt-1">
                      <button
                        type="submit"
                        disabled={saving}
                        className="flex items-center gap-2 bg-indigo-600 text-white font-bold text-sm px-5 py-2.5 rounded-xl hover:bg-indigo-700 transition-colors disabled:opacity-60"
                      >
                        {saving ? (
                          <Loader2 size={16} className="animate-spin" />
                        ) : (
                          <Plus size={16} />
                        )}
                        {saving ? 'Saving…' : 'Add Expense'}
                      </button>
                    </div>
                  </form>
                </div>
              )}

              {/* Expense List */}
              <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
                <div className="px-5 py-4 border-b border-gray-100 flex items-center justify-between">
                  <h3 className="font-bold text-gray-800 flex items-center gap-2">
                    <TrendingUp size={17} className="text-indigo-500" />
                    Expense Entries
                  </h3>
                  <span className="text-xs font-bold text-gray-400 bg-gray-100 px-2.5 py-1 rounded-full">
                    {expenses.length} items
                  </span>
                </div>

                {loadingExpenses ? (
                  <div className="flex items-center justify-center py-16 text-gray-400">
                    <Loader2 size={28} className="animate-spin" />
                  </div>
                ) : expenses.length === 0 ? (
                  <div className="flex flex-col items-center justify-center py-16 text-center">
                    <AlertCircle size={32} className="text-gray-200 mb-3" />
                    <p className="font-bold text-gray-400 text-sm">No expenses yet</p>
                    <p className="text-xs text-gray-400 mt-1">
                      Click "Add Expense" to add the first entry.
                    </p>
                  </div>
                ) : (
                  <ul className="divide-y divide-gray-50">
                    {expenses.map((expense) => (
                      <li
                        key={expense.id}
                        className={`flex items-center gap-4 px-5 py-4 transition-colors group ${
                          expense.isPaid ? 'bg-green-50/40' : 'hover:bg-gray-50/80'
                        }`}
                      >
                        {/* Paid Toggle Checkbox */}
                        <button
                          onClick={() => handleTogglePaid(expense)}
                          className="flex-shrink-0 transition-transform hover:scale-110"
                          title={expense.isPaid ? 'Mark as Unpaid' : 'Mark as Paid'}
                        >
                          {expense.isPaid ? (
                            <CheckCircle2 size={26} className="text-green-500" />
                          ) : (
                            <Circle size={26} className="text-gray-300 hover:text-indigo-400" />
                          )}
                        </button>

                        {/* Details */}
                        <div className="flex-1 min-w-0">
                          <p
                            className={`font-bold text-sm ${
                              expense.isPaid
                                ? 'line-through text-gray-400'
                                : 'text-gray-900'
                            }`}
                          >
                            {expense.title}
                          </p>
                          {expense.dueDate && (
                            <p className="text-xs text-gray-400 font-medium mt-0.5 flex items-center gap-1">
                              <Calendar size={11} />
                              Due:{' '}
                              {new Date(expense.dueDate).toLocaleDateString('en-IN', {
                                day: 'numeric',
                                month: 'short',
                                year: 'numeric',
                              })}
                            </p>
                          )}
                        </div>

                        {/* Amount */}
                        <div className="text-right flex-shrink-0">
                          <p
                            className={`font-black text-base flex items-center justify-end ${
                              expense.isPaid ? 'text-green-600' : 'text-gray-900'
                            }`}
                          >
                            <IndianRupee size={14} className="stroke-[3] mr-0.5" />
                            {parseFloat(expense.amount).toLocaleString('en-IN')}
                          </p>
                          <span
                            className={`text-[10px] font-bold uppercase tracking-wide px-2 py-0.5 rounded-md mt-1 inline-block ${
                              expense.isPaid
                                ? 'bg-green-100 text-green-700'
                                : 'bg-rose-50 text-rose-600 border border-rose-100'
                            }`}
                          >
                            {expense.isPaid ? 'Paid' : 'Unpaid'}
                          </span>
                        </div>

                        {/* Delete */}
                        <button
                          onClick={() => handleDelete(expense.id)}
                          className="opacity-0 group-hover:opacity-100 p-1.5 text-gray-300 hover:text-red-500 hover:bg-red-50 rounded-lg transition-all flex-shrink-0"
                          title="Delete expense"
                        >
                          <Trash2 size={15} />
                        </button>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminExpenses;
