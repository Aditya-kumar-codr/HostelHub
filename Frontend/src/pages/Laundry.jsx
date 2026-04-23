import React, { useState, useEffect } from 'react';
import { Shirt, Calendar, Clock, ShoppingCart, Plus, Minus, CheckCircle, Loader2, Package, AlertCircle, MapPin } from 'lucide-react';
import { API_URL } from '../config';
import { auth } from '../firebase';

const Laundry = () => {
  const [laundryCart, setLaundryCart] = useState({
    Shirt: 0,
    Pant: 0,
    Pullover: 0,
    Towel: 0,
  });
  const [saving, setSaving] = useState(false);
  const [orders, setOrders] = useState([]);
  const [loadingOrders, setLoadingOrders] = useState(true);
  const [currentUserName, setCurrentUserName] = useState('');
  const [currentUserRoom, setCurrentUserRoom] = useState('');
  const [activeView, setActiveView] = useState('order'); // 'order' or 'history'

  // Get logged-in user info
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (user) => {
      if (user) {
        try {
          const res = await fetch(`${API_URL}/api/profile/${user.uid}`);
          if (res.ok) {
            const data = await res.json();
            const name = data.user?.displayName || user.displayName || 'Student';
            setCurrentUserName(name);
            setCurrentUserRoom(data.room || '');
            // Fetch orders for this student
            fetchOrders(name);
          } else {
            setCurrentUserName(user.displayName || 'Student');
            setLoadingOrders(false);
          }
        } catch (err) {
          setCurrentUserName(user.displayName || 'Student');
          setLoadingOrders(false);
        }
      } else {
        setLoadingOrders(false);
      }
    });
    return () => unsubscribe();
  }, []);

  const fetchOrders = async (name) => {
    try {
      const res = await fetch(`${API_URL}/api/laundry?studentName=${encodeURIComponent(name)}`);
      if (res.ok) {
        setOrders(await res.json());
      }
    } catch (err) {
      console.error('Failed to fetch laundry orders:', err);
    } finally {
      setLoadingOrders(false);
    }
  };

  const updateLaundryCart = (item, amount) => {
    setLaundryCart(prev => ({
      ...prev,
      [item]: Math.max(0, prev[item] + amount)
    }));
  };

  const handlePlaceOrder = async () => {
    const totalItems = Object.values(laundryCart).reduce((a, b) => a + b, 0);
    if (totalItems === 0) {
      alert('Please add at least one item to your cart.');
      return;
    }
    if (!currentUserName) {
      alert('Please log in first.');
      return;
    }

    // Format items as a readable string
    const itemsList = Object.entries(laundryCart)
      .filter(([, count]) => count > 0)
      .map(([name, count]) => `${name} x${count}`)
      .join(', ');

    setSaving(true);
    try {
      const res = await fetch(`${API_URL}/api/laundry`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          studentName: currentUserName,
          studentRoom: currentUserRoom,
          items: itemsList,
        }),
      });
      if (res.ok) {
        const newOrder = await res.json();
        setOrders((prev) => [newOrder, ...prev]);
        setLaundryCart({ Shirt: 0, Pant: 0, Pullover: 0, Towel: 0 });
        setActiveView('history');
        alert('Laundry submitted successfully! You will be notified when it is ready.');
      } else {
        alert('Failed to submit laundry. Please try again.');
      }
    } catch (err) {
      console.error('Failed to submit laundry:', err);
      alert('Network error. Please try again.');
    } finally {
      setSaving(false);
    }
  };

  const formatDate = (dateStr) => {
    return new Date(dateStr).toLocaleDateString('en-IN', {
      day: 'numeric', month: 'short', year: 'numeric',
      hour: '2-digit', minute: '2-digit',
    });
  };

  const statusConfig = {
    Received: { color: 'bg-blue-100 text-blue-700 border-blue-200', dot: 'bg-blue-500', label: 'Received' },
    Washing: { color: 'bg-amber-100 text-amber-700 border-amber-200', dot: 'bg-amber-500', label: 'Washing' },
    Ready: { color: 'bg-green-100 text-green-700 border-green-200', dot: 'bg-green-500', label: 'Ready for Pickup' },
    Collected: { color: 'bg-gray-100 text-gray-600 border-gray-200', dot: 'bg-gray-400', label: 'Collected' },
  };

  const readyOrders = orders.filter((o) => o.status === 'Ready');
  const activeOrders = orders.filter((o) => o.status !== 'Collected');

  return (
    <div className="space-y-6 animate-fade-in max-w-5xl mx-auto">
      <h2 className="text-2xl font-bold text-gray-800">Laundry Management</h2>

      {/* Ready for Pickup Alert */}
      {readyOrders.length > 0 && (
        <div className="bg-green-50 border border-green-200 rounded-xl p-4 flex items-start gap-3">
          <CheckCircle className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
          <div>
            <p className="font-bold text-green-800 text-sm">
              {readyOrders.length} laundry order{readyOrders.length > 1 ? 's' : ''} ready for pickup!
            </p>
            <p className="text-green-700 text-xs mt-1 flex items-center gap-1">
              <MapPin size={12} /> Collect from Laundry Room, Ground Floor
            </p>
          </div>
        </div>
      )}

      {/* Tab Switcher */}
      <div className="flex space-x-1 bg-gray-200/50 p-1 rounded-xl w-full max-w-md">
        <button
          onClick={() => setActiveView('order')}
          className={`flex-1 flex items-center justify-center space-x-2 py-2.5 rounded-lg text-sm font-medium transition-all ${
            activeView === 'order'
              ? 'bg-white text-gray-900 shadow-sm'
              : 'text-gray-600 hover:text-gray-900 hover:bg-gray-200/50'
          }`}
        >
          <ShoppingCart className="w-4 h-4" />
          <span>New Order</span>
        </button>
        <button
          onClick={() => setActiveView('history')}
          className={`flex-1 flex items-center justify-center space-x-2 py-2.5 rounded-lg text-sm font-medium transition-all ${
            activeView === 'history'
              ? 'bg-white text-gray-900 shadow-sm'
              : 'text-gray-600 hover:text-gray-900 hover:bg-gray-200/50'
          }`}
        >
          <Package className="w-4 h-4" />
          <span>My Orders ({activeOrders.length})</span>
        </button>
      </div>

      {activeView === 'order' ? (
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="bg-gradient-to-r from-indigo-50 to-blue-50/30 p-6 border-b border-gray-100">
            <div className="flex items-center space-x-2 text-indigo-700 mb-2">
              <Shirt className="w-5 h-5" />
              <h3 className="text-lg font-bold">Submit Laundry</h3>
            </div>
            <p className="text-sm text-gray-600">Add your items and submit. You'll be notified when they're ready.</p>
          </div>

          <div className="p-6">
            {/* Cart Items */}
            <div className="mb-8">
              <div className="flex items-center space-x-2 text-gray-800 mb-4 border-b border-gray-100 pb-3">
                <ShoppingCart className="w-5 h-5 text-indigo-600" />
                <h4 className="font-semibold text-lg">Add Items</h4>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {Object.keys(laundryCart).map(item => (
                  <div key={item} className="flex justify-between items-center p-4 border border-gray-100 rounded-xl bg-gray-50/50 hover:bg-white hover:border-indigo-100 transition-all group">
                    <div className="flex items-center space-x-4">
                      <div className="w-10 h-10 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600 group-hover:bg-indigo-600 group-hover:text-white transition-colors">
                        <Shirt className="w-5 h-5" />
                      </div>
                      <span className="font-medium text-gray-700 text-lg">{item}</span>
                    </div>

                    <div className="flex items-center space-x-3 bg-white border border-gray-200 rounded-lg p-1 shadow-sm">
                      <button
                        onClick={() => updateLaundryCart(item, -1)}
                        className="w-8 h-8 flex items-center justify-center text-gray-600 rounded-md hover:bg-red-50 hover:text-red-500 transition-colors"
                      >
                        <Minus className="w-4 h-4" />
                      </button>
                      <span className="w-6 text-center font-bold text-gray-800">{laundryCart[item]}</span>
                      <button
                        onClick={() => updateLaundryCart(item, 1)}
                        className="w-8 h-8 flex items-center justify-center text-indigo-600 rounded-md hover:bg-indigo-50 transition-colors"
                      >
                        <Plus className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Action Button */}
            <div className="flex justify-end pt-5 border-t border-gray-100">
              <button
                onClick={handlePlaceOrder}
                disabled={saving}
                className="bg-indigo-600 hover:bg-indigo-700 text-white px-8 py-3 rounded-xl font-medium transition-all transform hover:-translate-y-0.5 shadow-md hover:shadow-lg flex items-center space-x-2 disabled:opacity-60"
              >
                {saving ? <Loader2 className="w-5 h-5 animate-spin" /> : <ShoppingCart className="w-5 h-5" />}
                <span>{saving ? 'Submitting…' : 'Submit Laundry'}</span>
              </button>
            </div>
          </div>
        </div>
      ) : (
        /* Order History */
        <div className="space-y-4">
          {loadingOrders ? (
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-12 text-center">
              <Loader2 size={28} className="animate-spin text-gray-400 mx-auto mb-3" />
              <p className="text-gray-500 font-medium">Loading orders…</p>
            </div>
          ) : orders.length === 0 ? (
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-12 text-center">
              <Package size={40} className="text-gray-200 mx-auto mb-3" />
              <p className="font-bold text-gray-500">No laundry orders yet</p>
              <p className="text-sm text-gray-400 mt-1">Submit your first order from the "New Order" tab.</p>
            </div>
          ) : (
            orders.map((order) => {
              const cfg = statusConfig[order.status] || statusConfig.Received;
              return (
                <div key={order.id} className={`bg-white rounded-xl shadow-sm border p-5 ${order.status === 'Ready' ? 'border-green-200 bg-green-50/30' : 'border-gray-100'}`}>
                  <div className="flex justify-between items-start mb-3">
                    <div>
                      <p className="font-bold text-gray-900">{order.items}</p>
                      <p className="text-xs text-gray-500 mt-1 flex items-center gap-1">
                        <Clock size={12} /> {formatDate(order.createdAt)}
                      </p>
                    </div>
                    <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold border ${cfg.color}`}>
                      <span className={`w-1.5 h-1.5 rounded-full ${cfg.dot}`}></span>
                      {cfg.label}
                    </span>
                  </div>
                  {order.status === 'Ready' && (
                    <div className="bg-green-100 border border-green-200 rounded-lg p-3 mt-2 text-sm text-green-800 font-medium flex items-center gap-2">
                      <MapPin size={16} className="flex-shrink-0" />
                      Your laundry is ready! Collect from <strong>Laundry Room, Ground Floor</strong>
                    </div>
                  )}
                </div>
              );
            })
          )}
        </div>
      )}
    </div>
  );
};

export default Laundry;
