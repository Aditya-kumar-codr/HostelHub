import React, { useState, useEffect } from 'react';
import { Shirt, Clock, CheckCircle, Loader2, Package, Trash2, User, MapPin, Filter, AlertCircle } from 'lucide-react';
import { API_URL } from '../config';

const statusConfig = {
  Received: { color: 'bg-blue-100 text-blue-700 border-blue-200', dot: 'bg-blue-500', label: 'Received', next: 'Washing' },
  Washing: { color: 'bg-amber-100 text-amber-700 border-amber-200', dot: 'bg-amber-500', label: 'Washing', next: 'Ready' },
  Ready: { color: 'bg-green-100 text-green-700 border-green-200', dot: 'bg-green-500', label: 'Ready', next: 'Collected' },
  Collected: { color: 'bg-gray-100 text-gray-600 border-gray-200', dot: 'bg-gray-400', label: 'Collected', next: null },
};

const AdminLaundry = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('All');

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const res = await fetch(`${API_URL}/api/laundry`);
      if (res.ok) {
        setOrders(await res.json());
      }
    } catch (err) {
      console.error('Failed to fetch laundry orders:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleStatusChange = async (id, newStatus) => {
    setOrders((prev) => prev.map((o) => (o.id === id ? { ...o, status: newStatus } : o)));
    try {
      const res = await fetch(`${API_URL}/api/laundry/${id}/status`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus }),
      });
      if (!res.ok) fetchOrders();
    } catch (err) {
      console.error('Failed to update status:', err);
      fetchOrders();
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this laundry order?')) return;
    setOrders((prev) => prev.filter((o) => o.id !== id));
    try {
      await fetch(`${API_URL}/api/laundry/${id}`, { method: 'DELETE' });
    } catch (err) {
      console.error('Failed to delete order:', err);
      fetchOrders();
    }
  };

  const formatDate = (dateStr) => {
    return new Date(dateStr).toLocaleDateString('en-IN', {
      day: 'numeric', month: 'short', year: 'numeric',
      hour: '2-digit', minute: '2-digit',
    });
  };

  const counts = {
    All: orders.length,
    Received: orders.filter((o) => o.status === 'Received').length,
    Washing: orders.filter((o) => o.status === 'Washing').length,
    Ready: orders.filter((o) => o.status === 'Ready').length,
    Collected: orders.filter((o) => o.status === 'Collected').length,
  };

  const filteredOrders = filter === 'All' ? orders : orders.filter((o) => o.status === filter);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-black text-gray-900 tracking-tight">Laundry Management</h1>
        <p className="text-sm text-gray-500 mt-1">
          Receive student laundry, update status, and notify when ready for pickup.
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-5 gap-3">
        {[
          { key: 'All', label: 'Total', from: 'from-indigo-500', to: 'to-violet-600', shadow: 'shadow-indigo-500/20' },
          { key: 'Received', label: 'Received', from: 'from-blue-500', to: 'to-blue-600', shadow: 'shadow-blue-500/20' },
          { key: 'Washing', label: 'Washing', from: 'from-amber-500', to: 'to-yellow-500', shadow: 'shadow-amber-500/20' },
          { key: 'Ready', label: 'Ready', from: 'from-green-500', to: 'to-emerald-600', shadow: 'shadow-green-500/20' },
          { key: 'Collected', label: 'Collected', from: 'from-gray-500', to: 'to-gray-600', shadow: 'shadow-gray-500/20' },
        ].map((stat) => (
          <div
            key={stat.key}
            onClick={() => setFilter(stat.key)}
            className={`bg-gradient-to-br ${stat.from} ${stat.to} rounded-2xl p-4 text-white shadow-lg ${stat.shadow} cursor-pointer hover:scale-[1.02] transition-transform ${
              filter === stat.key ? 'ring-2 ring-white ring-offset-2' : ''
            }`}
          >
            <div className="flex items-center justify-between mb-1">
              <span className="text-2xl font-black">{counts[stat.key]}</span>
            </div>
            <p className="text-white/80 text-xs font-bold uppercase tracking-wide">{stat.label}</p>
          </div>
        ))}
      </div>

      {/* Filter */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1">
        <Filter size={16} className="text-gray-400 flex-shrink-0" />
        {['All', 'Received', 'Washing', 'Ready', 'Collected'].map((tab) => (
          <button
            key={tab}
            onClick={() => setFilter(tab)}
            className={`px-3 py-1.5 rounded-lg text-sm font-bold whitespace-nowrap transition-colors border ${
              filter === tab
                ? 'bg-indigo-50 text-indigo-700 border-indigo-200'
                : 'bg-white text-gray-500 border-gray-200 hover:bg-gray-50'
            }`}
          >
            {tab} ({counts[tab]})
          </button>
        ))}
      </div>

      {/* Orders List */}
      {loading ? (
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-12 text-center">
          <Loader2 size={28} className="animate-spin text-gray-400 mx-auto mb-3" />
          <p className="text-gray-500 font-medium">Loading orders…</p>
        </div>
      ) : orders.length === 0 ? (
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 flex flex-col items-center justify-center py-20 text-center">
          <Package size={40} className="text-gray-200 mb-3" />
          <h3 className="font-bold text-gray-700 mb-1">No laundry orders yet</h3>
          <p className="text-sm text-gray-400">Orders from students will appear here.</p>
        </div>
      ) : filteredOrders.length === 0 ? (
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-12 text-center">
          <p className="text-gray-500 font-bold">No orders match this filter.</p>
        </div>
      ) : (
        <div className="space-y-4">
          {filteredOrders.map((order) => {
            const cfg = statusConfig[order.status] || statusConfig.Received;
            return (
              <div key={order.id} className="bg-white rounded-xl shadow-sm border border-gray-100 p-5 hover:shadow-md transition-shadow group">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                  {/* Student & Items Info */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-3 mb-2">
                      <div className="w-9 h-9 bg-indigo-100 text-indigo-700 rounded-xl flex items-center justify-center font-black text-sm flex-shrink-0">
                        {order.studentName.charAt(0)}
                      </div>
                      <div>
                        <p className="font-bold text-gray-900">{order.studentName}</p>
                        {order.studentRoom && (
                          <p className="text-xs text-gray-500 font-medium">Room {order.studentRoom}</p>
                        )}
                      </div>
                    </div>
                    <div className="flex items-start gap-2 mt-2">
                      <Shirt size={14} className="text-gray-400 mt-0.5 flex-shrink-0" />
                      <p className="text-sm text-gray-700 font-medium">{order.items}</p>
                    </div>
                    <p className="text-xs text-gray-400 mt-2 flex items-center gap-1">
                      <Clock size={12} /> {formatDate(order.createdAt)}
                    </p>
                  </div>

                  {/* Status & Actions */}
                  <div className="flex flex-col items-end gap-3 flex-shrink-0">
                    <div className="flex items-center gap-2">
                      <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold border ${cfg.color}`}>
                        <span className={`w-1.5 h-1.5 rounded-full ${cfg.dot}`}></span>
                        {cfg.label}
                      </span>
                      <button
                        onClick={() => handleDelete(order.id)}
                        className="opacity-0 group-hover:opacity-100 p-1.5 text-gray-300 hover:text-red-500 hover:bg-red-50 rounded-lg transition-all"
                        title="Delete order"
                      >
                        <Trash2 size={15} />
                      </button>
                    </div>

                    {/* Status progression buttons */}
                    <div className="flex gap-2">
                      {['Received', 'Washing', 'Ready', 'Collected'].map((status) => {
                        const sCfg = statusConfig[status];
                        const isActive = order.status === status;
                        return (
                          <button
                            key={status}
                            onClick={() => handleStatusChange(order.id, status)}
                            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all border ${
                              isActive
                                ? `${sCfg.color} shadow-sm`
                                : 'bg-white text-gray-400 border-gray-200 hover:bg-gray-50 hover:text-gray-600'
                            }`}
                          >
                            {status}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                </div>

                {/* Ready notification */}
                {order.status === 'Ready' && (
                  <div className="bg-green-50 border border-green-200 rounded-lg p-3 mt-3 text-sm text-green-700 font-medium flex items-center gap-2">
                    <AlertCircle size={16} className="flex-shrink-0" />
                    Student has been notified. Pickup: <strong>Laundry Room, Ground Floor</strong>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default AdminLaundry;
