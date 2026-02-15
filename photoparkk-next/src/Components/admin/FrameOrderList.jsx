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
            {loading ? <Loader2 className="animate-spin mx-auto" /> : orders.length === 0 ? (
                <div className="text-center p-8 border rounded-xl bg-white text-neutral-500">
                    <ShoppingBag className="mx-auto w-12 h-12 mb-2 opacity-20" />
                    No Frame Orders Found
                </div>
            ) : (
                orders.map(o => {
                    const order = getFrameOrderDetails(o);
                    return (
                        <div key={order.id} className="bg-white p-6 rounded-xl border border-neutral-200 shadow-sm hover:shadow-md transition-shadow">
                            <div className="flex justify-between items-start">
                                <div>
                                    <h3 className="font-bold text-lg text-secondary">Order #{order.id.slice(0, 8)}</h3>
                                    <p className="text-sm text-neutral-500">Customer: {order.customerName}</p>
                                    <p className="text-sm text-neutral-500">{new Date(order.createdAt).toLocaleDateString()}</p>
                                    <div className="mt-2 text-sm bg-neutral-100 px-2 py-1 rounded inline-block">
                                        Status: {order.status}
                                    </div>
                                </div>
                                <div className="text-right">
                                    <div className="text-xl font-bold text-primary">₹{order.totalAmount}</div>
                                    <div className="mt-2 flex gap-2">
                                        <button onClick={() => { setSelectedOrder(order); setShowModal(true); }} className="p-2 hover:bg-neutral-100 rounded text-neutral-600"><Eye className="w-4 h-4" /></button>
                                        <button onClick={() => deleteOrder(order.id)} className="p-2 hover:bg-red-50 rounded text-red-500"><Trash2 className="w-4 h-4" /></button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    );
                })
            )}

            {showModal && selectedOrder && (
                <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
                    <div className="bg-white rounded-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
                        <div className="p-4 border-b flex justify-between sticky top-0 bg-white">
                            <h2 className="font-bold text-lg">Frame Order Details</h2>
                            <button onClick={() => setShowModal(false)}><X /></button>
                        </div>
                        <div className="p-6 space-y-6">
                            <div className="grid grid-cols-2 gap-4 bg-neutral-50 p-4 rounded-xl">
                                <div>
                                    <h4 className="font-semibold text-xs uppercase text-neutral-500">Customer</h4>
                                    <p>{selectedOrder.customerName}</p>
                                    <p className="text-sm">{selectedOrder.phone}</p>
                                </div>
                                <div>
                                    <h4 className="font-semibold text-xs uppercase text-neutral-500">Shipping</h4>
                                    <p className="text-sm">{selectedOrder.address}, {selectedOrder.pincode}</p>
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

                            <div className="border-t pt-4 flex justify-between items-center">
                                <div className="font-bold text-xl">Total: ₹{selectedOrder.totalAmount}</div>
                                <select
                                    value={selectedOrder.status}
                                    onChange={(e) => updateStatus(selectedOrder.id, e.target.value)}
                                    className="border rounded px-3 py-2 bg-white"
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
