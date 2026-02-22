'use client';

import React, { useEffect, useState, useRef, useCallback } from "react";
import axiosInstance from "@/utils/axiosInstance";
import {
    Search,
    Download,
    Eye,
    Image as ImageIcon,
    X,
    Loader2,
    Trash2,
    ChevronLeft,
    ChevronRight,
    ShoppingBag,
    ArrowRight,
} from "lucide-react";

const getFrameOrderDetails = (order) => {
    const items = order.items || [];
    const shipping = order.shipping_details || {};

    // Calculate total from items if possible
    const totalAmount = items.reduce((sum, item) => sum + (parseFloat(item.total) || 0), 0);

    return {
        id: order.id,
        orderUUID: order.id,
        items,
        totalAmount,
        status: order.status || 'Pending',
        createdAt: order.created_at,
        customerName: shipping.fullName || "N/A",
        email: shipping.email || "N/A",
        phone: shipping.phone || "N/A",
        address: shipping.address || "N/A",
        pincode: shipping.pincode || ""
    };
};

const FrameOrderList = () => {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedOrder, setSelectedOrder] = useState(null);
    const [showModal, setShowModal] = useState(false);

    // Simplistic fetching without server-side filter for now as it duplicates logic
    const fetchOrders = async () => {
        setLoading(true);
        try {
            const res = await axiosInstance.get('frameorders');
            if (res.data.orders) setOrders(res.data.orders);
            else setOrders([]);
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchOrders();
    }, []);

    const updateStatus = async (id, status) => {
        try {
            await axiosInstance.patch(`frameorders/${id}`, { status });
            fetchOrders();
        } catch (e) {
            alert("Update failed");
        }
    };

    const deleteOrder = async (id) => {
        if (!confirm("Delete this order?")) return;
        try {
            await axiosInstance.delete(`frameorders/${id}`);
            fetchOrders();
            setShowModal(false);
        } catch (e) {
            alert("Delete failed");
        }
    };

    return (
        <div className="space-y-4">
            {loading ? <div className="flex justify-center p-20"><Loader2 className="animate-spin text-blue-600 w-10 h-10" /></div> : orders.length === 0 ? (
                <div className="text-center p-20 bg-white rounded-3xl border border-slate-100 text-slate-400 shadow-sm transition-all">
                    <ShoppingBag className="mx-auto w-16 h-16 mb-4 opacity-10" />
                    <p className="text-sm font-bold tracking-wide">No specialized frame projects found.</p>
                </div>
            ) : (
                <div className="grid grid-cols-1 gap-6">
                    {orders.map(o => {
                        const order = getFrameOrderDetails(o);
                        return (
                            <div key={order.id} className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm hover:shadow-xl transition-all duration-300 group hover:-translate-y-1 overflow-hidden relative">
                                <div className="absolute top-0 right-0 w-32 h-32 bg-blue-50/30 rounded-full blur-3xl -mr-16 -mt-16 pointer-events-none" />
                                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 relative z-10">
                                    <div className="flex gap-5 items-center">
                                        <div className="w-14 h-14 bg-blue-600 text-white rounded-2xl flex items-center justify-center shadow-lg shadow-blue-500/20 group-hover:rotate-6 transition-transform">
                                            <ImageIcon className="w-7 h-7" />
                                        </div>
                                        <div>
                                            <div className="flex items-center gap-3 mb-1">
                                                <h3 className="font-bold text-lg text-slate-900 tracking-tight">Project #{order.id.slice(0, 8).toUpperCase()}</h3>
                                                <span className="text-[10px] font-black uppercase tracking-widest bg-blue-50 text-blue-600 px-2.5 py-1 rounded-full border border-blue-100 shadow-sm">{order.status}</span>
                                            </div>
                                            <p className="text-xs font-bold text-slate-400 uppercase tracking-tighter">Account: <span className="text-slate-900">{order.customerName}</span></p>
                                            <p className="text-[10px] text-slate-400 mt-1 font-medium">{new Date(order.createdAt).toLocaleDateString(undefined, { month: 'long', day: 'numeric', year: 'numeric' })}</p>
                                        </div>
                                    </div>
                                    <div className="flex flex-col md:items-end gap-4">
                                        <div className="text-left md:text-right">
                                            <div className="text-2xl font-black text-slate-900 tracking-tight leading-none">₹{order.totalAmount}</div>
                                            <p className="text-[10px] font-bold text-blue-600 uppercase tracking-widest mt-1">{order.items.length} Configured Units</p>
                                        </div>
                                        <div className="flex gap-2">
                                            <button onClick={() => { setSelectedOrder(order); setShowModal(true); }} className="flex items-center gap-2 px-4 py-2 bg-slate-50 hover:bg-slate-100 text-slate-700 rounded-xl text-xs font-bold transition-all border border-slate-100 shadow-sm">
                                                <Eye className="w-3.5 h-3.5" /> View
                                            </button>
                                            <button onClick={() => deleteOrder(order.id)} className="p-2.5 hover:bg-red-50 text-red-500 rounded-xl transition-all border border-transparent hover:border-red-100">
                                                <Trash2 className="w-4 h-4" />
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            )}

            {showModal && selectedOrder && (
                <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
                    <div className="bg-white rounded-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
                        <div className="p-4 border-b flex justify-between sticky top-0 bg-white">
                            <h2 className="font-bold text-lg">Frame Order Details</h2>
                            <button onClick={() => setShowModal(false)}><X /></button>
                        </div>
                        <div className="p-6 space-y-6">
                            <div className="grid grid-cols-2 gap-4 bg-slate-50 p-5 rounded-2xl border border-slate-100">
                                <div>
                                    <h4 className="font-bold text-[10px] uppercase text-slate-400 tracking-widest mb-1">Customer</h4>
                                    <p className="font-bold text-slate-900">{selectedOrder.customerName}</p>
                                    <p className="text-sm text-slate-500 font-medium">{selectedOrder.phone}</p>
                                </div>
                                <div>
                                    <h4 className="font-bold text-[10px] uppercase text-slate-400 tracking-widest mb-1">Shipping</h4>
                                    <p className="text-sm text-slate-900 font-bold">{selectedOrder.address}</p>
                                    <p className="text-[11px] text-slate-500 uppercase font-black">{selectedOrder.pincode}</p>
                                </div>
                            </div>

                            <div>
                                <h4 className="font-semibold mb-2">Items ({selectedOrder.items.length})</h4>
                                <div className="space-y-4">
                                    {selectedOrder.items.map((item, idx) => (
                                        <div key={idx} className="flex gap-4 border p-3 rounded-lg">
                                            <div className="w-16 h-16 bg-neutral-100 rounded overflow-hidden shrink-0">
                                                {item.userImageUrl ? <img src={item.userImageUrl} className="w-full h-full object-cover" /> : <ImageIcon className="m-auto mt-4 text-neutral-300" />}
                                            </div>
                                            <div>
                                                <p className="font-medium">{item.title || "Custom Frame"}</p>
                                                <p className="text-sm text-neutral-500">Qty: {item.quantity}</p>
                                                <p className="text-sm font-semibold">₹{item.total}</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <div className="border-t border-slate-100 pt-6 flex justify-between items-center">
                                <div className="font-black text-2xl text-slate-900 tracking-tight">Total: ₹{selectedOrder.totalAmount}</div>
                                <select
                                    value={selectedOrder.status}
                                    onChange={(e) => updateStatus(selectedOrder.id, e.target.value)}
                                    className="bg-blue-600 text-white rounded-xl px-5 py-2.5 text-sm font-bold shadow-md shadow-blue-500/10 cursor-pointer outline-none hover:bg-blue-700 transition-all border-none"
                                >
                                    <option value="Pending">Pending</option>
                                    <option value="Shipped">Shipped</option>
                                    <option value="Delivered">Delivered</option>
                                </select>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default FrameOrderList;
