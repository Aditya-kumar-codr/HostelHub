import React, { useState, useEffect } from 'react';
import {
  CreditCard,
  Clock,
  CheckCircle,
  AlertCircle,
  IndianRupee,
  ArrowRight,
  Loader2,
  Receipt,
  BadgeCheck,
} from 'lucide-react';
import { API_URL } from '../config';
import { auth } from '../firebase';

const Expenses = () => {
  const [expenses, setExpenses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [studentName, setStudentName] = useState('');

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (user) => {
      if (user) {
        // Get the display name from profile API (same name admin sees)
        let name = user.displayName || 'Student';
        try {
          const profileRes = await fetch(`${API_URL}/api/profile/${user.uid}`);
          if (profileRes.ok) {
            const data = await profileRes.json();
            name = data.user?.displayName || user.displayName || 'Student';
          }
        } catch (err) {
          console.error('Failed to fetch profile:', err);
        }
        setStudentName(name);

        // Now fetch expenses using the correct name
        try {
          const res = await fetch(
            `${API_URL}/api/expenses?studentName=${encodeURIComponent(name)}`
          );
          if (res.ok) {
            setExpenses(await res.json());
          }
        } catch (err) {
          console.error('Failed to fetch expenses:', err);
        } finally {
          setLoading(false);
        }
      } else {
        setLoading(false);
      }
    });

    return () => unsubscribe();
  }, []);

  /* ── Derived values ──────────────────────────────── */
  const pending = expenses.filter((e) => !e.isPaid);
  const paid = expenses.filter((e) => e.isPaid);

  const totalPending = pending.reduce((s, e) => s + parseFloat(e.amount || 0), 0);
  const totalPaid = paid.reduce((s, e) => s + parseFloat(e.amount || 0), 0);

  const nextDue = pending
    .filter((e) => e.dueDate)
    .sort((a, b) => new Date(a.dueDate) - new Date(b.dueDate))[0];

  const formatDate = (d) => {
    if (!d) return null;
    return new Date(d).toLocaleDateString('en-IN', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
    });
  };

  /* ══════════════════════════════════════════════════ */
  if (loading) {
    return (
      <div className="flex items-center justify-center py-32 text-gray-400">
        <Loader2 size={32} className="animate-spin" />
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto space-y-8 animate-fade-in">
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h1 className="text-3xl font-black text-gray-900 tracking-tight">Fee & Expenses</h1>
          <p className="text-gray-500 mt-1 text-lg">
            View your hostel dues and payment history.
          </p>
        </div>
        <div className="flex items-center justify-center gap-2 bg-indigo-50 text-indigo-700 border border-indigo-100 px-6 py-3 rounded-xl font-bold text-sm">
          <AlertCircle size={18} />
          Kindly pay dues at Hostel Reception
        </div>
      </div>

      {/* No expenses state */}
      {expenses.length === 0 && (
        <div className="bg-white rounded-3xl border border-gray-100 shadow-sm flex flex-col items-center justify-center py-24 text-center">
          <div className="w-16 h-16 bg-green-50 rounded-2xl flex items-center justify-center mb-4">
            <BadgeCheck size={30} className="text-green-500" />
          </div>
          <h3 className="font-bold text-gray-700 text-lg mb-1">All clear!</h3>
          <p className="text-sm text-gray-400">No fee entries have been assigned yet.</p>
        </div>
      )}

      {expenses.length > 0 && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* ── Left Column ──────────────────────────── */}
          <div className="lg:col-span-2 space-y-8">
            {/* Hero Summary Card — only if there are pending items */}
            {pending.length > 0 ? (
              <div className="bg-gradient-to-br from-red-500 to-rose-600 rounded-3xl p-8 text-white shadow-xl shadow-red-500/20 relative overflow-hidden">
                <div className="absolute top-0 right-0 p-8 opacity-10">
                  <AlertCircle size={120} />
                </div>
                <div className="relative z-10">
                  <p className="text-red-100 font-medium mb-2 flex items-center gap-2">
                    <Clock size={18} /> Action Required
                  </p>
                  <h2 className="text-5xl font-black mb-1 flex items-center">
                    <IndianRupee size={40} className="stroke-[3] mr-1" />
                    {totalPending.toLocaleString('en-IN')}
                  </h2>
                  <p className="text-red-100 text-sm font-medium mb-8">
                    Total outstanding balance
                  </p>

                  {nextDue && (
                    <div className="bg-white/20 backdrop-blur-md rounded-2xl p-4 flex items-center justify-between border border-white/20">
                      <div>
                        <p className="text-sm text-red-100 font-medium">Next Due Date</p>
                        <p className="font-bold">{formatDate(nextDue.dueDate)}</p>
                      </div>
                      <ArrowRight className="text-red-100" />
                    </div>
                  )}
                </div>
              </div>
            ) : (
              <div className="bg-gradient-to-br from-green-500 to-emerald-600 rounded-3xl p-8 text-white shadow-xl shadow-green-500/20 relative overflow-hidden">
                <div className="absolute top-0 right-0 p-8 opacity-10">
                  <CheckCircle size={120} />
                </div>
                <div className="relative z-10">
                  <p className="text-green-100 font-medium mb-2 flex items-center gap-2">
                    <BadgeCheck size={18} /> All Dues Cleared
                  </p>
                  <h2 className="text-5xl font-black mb-1 flex items-center">
                    <IndianRupee size={40} className="stroke-[3] mr-1" />
                    0
                  </h2>
                  <p className="text-green-100 text-sm font-medium">
                    No pending dues — you're all good!
                  </p>
                </div>
              </div>
            )}

            {/* Pending Breakdown */}
            {pending.length > 0 && (
              <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100">
                <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                  <AlertCircle className="text-orange-500" size={24} />
                  Pending Breakdown
                </h3>
                <div className="space-y-4">
                  {pending.map((expense) => (
                    <div
                      key={expense.id}
                      className="flex flex-col sm:flex-row sm:items-center justify-between p-5 rounded-2xl bg-gray-50 border border-gray-100 hover:border-indigo-100 hover:bg-indigo-50/50 transition-colors"
                    >
                      <div className="mb-4 sm:mb-0">
                        <h4 className="font-bold text-gray-900 text-lg mb-1">
                          {expense.title}
                        </h4>
                        {expense.dueDate && (
                          <p className="text-sm text-gray-500 font-medium flex items-center gap-1.5">
                            <Clock size={14} className="text-orange-500" />
                            Due by {formatDate(expense.dueDate)}
                          </p>
                        )}
                      </div>
                      <div className="flex items-center justify-between sm:gap-6">
                        <span className="text-xl font-black text-gray-900 flex items-center">
                          <IndianRupee size={20} className="stroke-[3]" />
                          {parseFloat(expense.amount).toLocaleString('en-IN')}
                        </span>
                        <span className="text-xs font-bold text-rose-600 uppercase tracking-wider bg-rose-50 px-3 py-1 rounded-md border border-rose-100">
                          Unpaid
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* ── Right Column: Paid History ────────────── */}
          <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100 flex flex-col">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold text-gray-900 flex items-center gap-2">
                <CheckCircle className="text-green-500" size={24} />
                Paid Fees
              </h3>
              {totalPaid > 0 && (
                <span className="text-sm font-black text-green-600 flex items-center">
                  <IndianRupee size={13} className="stroke-[3]" />
                  {totalPaid.toLocaleString('en-IN')}
                </span>
              )}
            </div>

            <div className="flex-1 space-y-4">
              {paid.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-12 text-center text-gray-300">
                  <Receipt size={36} className="mb-3" />
                  <p className="text-sm font-medium">No payments recorded yet.</p>
                </div>
              ) : (
                paid.map((expense) => (
                  <div
                    key={expense.id}
                    className="p-4 rounded-2xl border border-gray-100 flex items-start gap-4 hover:shadow-md transition-shadow"
                  >
                    <div className="bg-green-100 p-2.5 rounded-xl text-green-600 mt-0.5 flex-shrink-0">
                      <CheckCircle size={20} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex justify-between items-start mb-1">
                        <h4 className="font-bold text-gray-900 text-sm leading-tight pr-2 truncate">
                          {expense.title}
                        </h4>
                        <span className="font-bold text-gray-900 flex items-center text-sm flex-shrink-0">
                          <IndianRupee size={12} className="stroke-[3]" />
                          {parseFloat(expense.amount).toLocaleString('en-IN')}
                        </span>
                      </div>
                      {expense.dueDate && (
                        <p className="text-xs text-gray-400 font-medium">
                          Due: {formatDate(expense.dueDate)}
                        </p>
                      )}
                      <span className="inline-block mt-2 text-[10px] font-bold uppercase tracking-wide bg-green-50 text-green-700 px-2 py-0.5 rounded-md border border-green-100">
                        Paid
                      </span>
                    </div>
                  </div>
                ))
              )}
            </div>

            {paid.length > 0 && (
              <div className="mt-6 pt-4 border-t border-gray-100">
                <div className="flex justify-between text-sm">
                  <span className="font-medium text-gray-500">Total paid</span>
                  <span className="font-black text-gray-900 flex items-center">
                    <IndianRupee size={13} className="stroke-[3]" />
                    {totalPaid.toLocaleString('en-IN')}
                  </span>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Expenses;
