import React from 'react';
import { CreditCard, Download, Clock, CheckCircle, AlertCircle, IndianRupee, ArrowRight, ChevronRight } from 'lucide-react';

const Expenses = () => {
    const feeBreakdown = [
        { id: 1, title: 'Hostel Accommodation (Q3)', amount: 8000, status: 'pending', dueDate: '15 May 2026' },
        { id: 2, title: 'Mess Charges (April)', amount: 2500, status: 'pending', dueDate: '10 May 2026' },
        { id: 3, title: 'Laundry Services (April)', amount: 500, status: 'pending', dueDate: '10 May 2026' },
    ];

    const pastTransactions = [
        { id: 'TRX-8921', title: 'Hostel Accommodation (Q2)', amount: 8000, date: '05 Dec 2025', method: 'Reception (Cash)' },
        { id: 'TRX-8922', title: 'Mess Charges (March)', amount: 2500, date: '12 Apr 2026', method: 'Reception (Card)' },
    ];

    const totalPending = feeBreakdown.reduce((acc, curr) => acc + curr.amount, 0);

    return (
        <div className="max-w-7xl mx-auto space-y-8 animate-fade-in">
            {/* Page Header */}
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-black text-gray-900 tracking-tight">Fee & Expenses</h1>
                    <p className="text-gray-500 mt-1 text-lg">Manage your hostel dues and view payment history.</p>
                </div>
                <div className="flex items-center justify-center gap-2 bg-indigo-50 text-indigo-700 border border-indigo-100 px-6 py-3 rounded-xl font-bold">
                    <AlertCircle size={20} />
                    Kindly pay dues at Hostel Reception
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Left Column: Summary and Breakdown */}
                <div className="lg:col-span-2 space-y-8">
                    {/* Hero Summary Card */}
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
                                {totalPending.toLocaleString()}
                            </h2>
                            <p className="text-red-100 text-sm font-medium mb-8">Total outstanding balance</p>
                            
                            <div className="bg-white/20 backdrop-blur-md rounded-2xl p-4 flex items-center justify-between border border-white/20">
                                <div>
                                    <p className="text-sm text-red-100 font-medium">Next Due Date</p>
                                    <p className="font-bold">10 May 2026</p>
                                </div>
                                <ArrowRight className="text-red-100" />
                            </div>
                        </div>
                    </div>

                    {/* Breakdown List */}
                    <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100">
                        <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                            <AlertCircle className="text-orange-500" size={24} /> 
                            Pending Breakdown
                        </h3>
                        <div className="space-y-4">
                            {feeBreakdown.map((fee) => (
                                <div key={fee.id} className="flex flex-col sm:flex-row sm:items-center justify-between p-5 rounded-2xl bg-gray-50 border border-gray-100 hover:border-indigo-100 hover:bg-indigo-50/50 transition-colors group">
                                    <div className="mb-4 sm:mb-0">
                                        <h4 className="font-bold text-gray-900 text-lg mb-1">{fee.title}</h4>
                                        <p className="text-sm text-gray-500 font-medium flex items-center gap-1.5">
                                            <Clock size={14} className="text-orange-500" /> 
                                            Due by {fee.dueDate}
                                        </p>
                                    </div>
                                    <div className="flex items-center justify-between sm:gap-6">
                                        <span className="text-xl font-black text-gray-900 flex items-center">
                                            <IndianRupee size={20} className="stroke-[3]" />
                                            {fee.amount.toLocaleString()}
                                        </span>
                                        <span className="text-xs font-bold text-rose-600 uppercase tracking-wider bg-rose-50 px-3 py-1 rounded-md border border-rose-100">
                                            Unpaid
                                        </span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Right Column: History */}
                <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100 flex flex-col h-full">
                    <div className="flex items-center justify-between mb-6">
                        <h3 className="text-xl font-bold text-gray-900 flex items-center gap-2">
                            <CheckCircle className="text-green-500" size={24} /> 
                            Past Payments
                        </h3>
                        <button className="text-indigo-600 hover:bg-indigo-50 p-2 rounded-lg transition-colors" title="Download Statement">
                            <Download size={20} />
                        </button>
                    </div>

                    <div className="flex-1 space-y-4">
                        {pastTransactions.map((trx) => (
                            <div key={trx.id} className="p-4 rounded-2xl border border-gray-100 flex items-start gap-4 hover:shadow-md transition-shadow">
                                <div className="bg-green-100 p-2.5 rounded-xl text-green-600 mt-0.5">
                                    <CheckCircle size={20} />
                                </div>
                                <div className="flex-1">
                                    <div className="flex justify-between items-start mb-1">
                                        <h4 className="font-bold text-gray-900 text-sm leading-tight pr-2">{trx.title}</h4>
                                        <span className="font-bold text-gray-900 flex items-center text-sm">
                                            <IndianRupee size={12} className="stroke-[3]" />
                                            {trx.amount.toLocaleString()}
                                        </span>
                                    </div>
                                    <p className="text-xs text-gray-500 font-medium mb-2">{trx.date} • {trx.method}</p>
                                    <div className="flex items-center justify-between text-xs font-semibold text-gray-400">
                                        <span>Ref: {trx.id}</span>
                                        <button className="text-indigo-600 hover:text-indigo-800 flex items-center">
                                            Receipt <ChevronRight size={14} />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    <button className="w-full mt-6 py-3 border-2 border-dashed border-gray-200 rounded-xl text-gray-500 font-bold hover:bg-gray-50 hover:border-gray-300 hover:text-gray-700 transition-colors">
                        View All History
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Expenses;
