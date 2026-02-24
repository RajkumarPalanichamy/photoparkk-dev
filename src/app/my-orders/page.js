'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import axiosInstance from '@/utils/axiosInstance';
import { Package, Truck, Clock, AlertCircle, Calendar, ChevronRight, Loader2 } from 'lucide-react';
import { format } from 'date-fns';

const MyOrders = () => {
    const router = useRouter();
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchOrders = async () => {
            if (typeof window === 'undefined') return;

            const user = localStorage.getItem('user');
            if (!user) {
                router.push('/login');
                return;
            }

            try {
                const parsedUser = JSON.parse(user);
                const userId = parsedUser.id || parsedUser._id;

                // Fetch regular orders and frame orders in parallel
                const [ordersRes, frameOrdersRes] = await Promise.all([
                    axiosInstance.get(`/orders/user/${userId}`),
                    axiosInstance.get(`/frameorders/user/${userId}`)
                ]);

                const regularOrders = Array.isArray(ordersRes.data) ? ordersRes.data : [];
                const frameOrders = Array.isArray(frameOrdersRes.data?.orders) ? frameOrdersRes.data.orders :
                    Array.isArray(frameOrdersRes.data) ? frameOrdersRes.data : [];

                // Merge and sort by date
                const combined = [
                    ...regularOrders.map(o => ({ ...o, type: 'common' })),
                    ...frameOrders.map(o => ({ ...o, type: 'frame' }))
                ].sort((a, b) => new Date(b.created_at) - new Date(a.created_at));

                setOrders(combined);
            } catch (error) {
                console.error("Error fetching orders:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchOrders();
    }, [router]);

    const getStatusColor = (status) => {
        switch (status?.toLowerCase()) {
            case 'pending': return 'bg-yellow-100 text-yellow-800';
            case 'processing': return 'bg-blue-100 text-blue-800';
            case 'shipped': return 'bg-indigo-100 text-indigo-800';
            case 'delivered': return 'bg-green-100 text-green-800';
            case 'cancelled': return 'bg-red-100 text-red-800';
            default: return 'bg-neutral-100 text-neutral-800';
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen pt-[100px] flex justify-center">
                <Loader2 className="w-10 h-10 animate-spin text-primary" />
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-neutral-50 pt-[100px] px-4 pb-12">
            <div className="max-w-5xl mx-auto">
                <div className="flex items-center gap-3 mb-8">
                    <div className="p-3 bg-primary rounded-xl shadow-lg">
                        <Package className="w-8 h-8 text-white" />
                    </div>
                    <div>
                        <h1 className="text-3xl font-bold text-secondary">My Orders</h1>
                        <p className="text-neutral-600">Track and manage your recent purchases</p>
                    </div>
                </div>

                {orders.length === 0 ? (
                    <div className="bg-white rounded-2xl shadow-sm border border-neutral-200 p-12 text-center">
                        <div className="w-20 h-20 bg-neutral-100 rounded-full flex items-center justify-center mx-auto mb-6">
                            <Package className="w-10 h-10 text-neutral-400" />
                        </div>
                        <h3 className="text-xl font-bold text-secondary mb-2">No orders yet</h3>
                        <p className="text-neutral-600 mb-6">Start shopping to see your orders here.</p>
                        <button onClick={() => router.push('/')} className="px-6 py-3 bg-primary text-white rounded-xl font-semibold hover:bg-primary-hover transition-colors">
                            Start Shopping
                        </button>
                    </div>
                ) : (
                    <div className="space-y-6">
                        {orders.map((order) => (
                            <div key={order.id || order._id} className="bg-white rounded-2xl shadow-sm border border-neutral-200 overflow-hidden hover:shadow-md transition-shadow">
                                <div className="p-6">
                                    <div className="flex flex-col md:flex-row gap-6">
                                        {/* Order Image */}
                                        <div className="w-full md:w-32 h-32 bg-neutral-100 rounded-xl overflow-hidden flex-shrink-0">
                                            <img
                                                src={
                                                    (order.type === 'frame' ? order.items?.[0]?.userImageUrl : order.image) ||
                                                    "https://via.placeholder.com/150?text=No+Image"
                                                }
                                                alt="Order Item"
                                                className="w-full h-full object-cover"
                                            />
                                        </div>

                                        {/* Order Details */}
                                        <div className="flex-1">
                                            <div className="flex flex-col md:flex-row justify-between mb-4">
                                                <div>
                                                    <div className="flex items-center gap-3 mb-1">
                                                        <h3 className="text-lg font-bold text-secondary">
                                                            Order #{order.id?.slice(0, 8) || order._id?.slice(0, 8)}
                                                        </h3>
                                                        <span className={`px-2 py-0.5 rounded-full text-[10px] uppercase font-bold ${order.type === 'frame' ? 'bg-purple-100 text-purple-700' : 'bg-blue-100 text-blue-700'}`}>
                                                            {order.type || 'Product'}
                                                        </span>
                                                        <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(order.status)}`}>
                                                            {order.status || 'Pending'}
                                                        </span>
                                                    </div>
                                                    <div className="flex items-center gap-2 text-sm text-neutral-500">
                                                        <Calendar className="w-4 h-4" />
                                                        <span>Placed on {order.created_at ? format(new Date(order.created_at), 'MMM dd, yyyy') : 'Recently'}</span>
                                                    </div>
                                                </div>
                                                <div className="text-right mt-2 md:mt-0">
                                                    <p className="text-2xl font-bold text-primary">₹{
                                                        order.type === 'frame'
                                                            ? (order.items?.reduce((acc, item) => acc + (item.total || 0), 0) + (order.shipping_charge || 100))
                                                            : order.amount
                                                    }</p>
                                                    <p className="text-xs text-neutral-500 capitalize">{order.payment_status || 'Paid'}</p>
                                                </div>
                                            </div>

                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4 border-t border-neutral-100">
                                                <div>
                                                    <p className="text-xs font-semibold text-neutral-500 uppercase mb-1">Items</p>
                                                    <p className="text-sm font-medium text-secondary line-clamp-1">
                                                        {order.type === 'frame'
                                                            ? `${order.items?.[0]?.title}${order.items?.length > 1 ? ` (+ ${order.items.length - 1} more)` : ''}`
                                                            : `${order.product_type} - Custom Order`
                                                        }
                                                    </p>
                                                </div>
                                                <div>
                                                    <p className="text-xs font-semibold text-neutral-500 uppercase mb-1">Delivery To</p>
                                                    <p className="text-sm font-medium text-secondary line-clamp-1">
                                                        {order.type === 'frame'
                                                            ? order.shipping_details?.fullName
                                                            : order.delivery_details?.name || 'Customer'
                                                        }
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="bg-neutral-50 px-6 py-3 border-t border-neutral-200 flex justify-between items-center">
                                    <div className="flex items-center gap-2 text-sm text-neutral-600">
                                        <Truck className="w-4 h-4" />
                                        <span>Estimated Delivery: 5-7 Days</span>
                                    </div>
                                    <button className="text-primary font-semibold text-sm hover:text-primary-hover flex items-center gap-1">
                                        View Details <ChevronRight className="w-4 h-4" />
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default MyOrders;
