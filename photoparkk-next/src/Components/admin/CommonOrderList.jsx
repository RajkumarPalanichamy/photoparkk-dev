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
    Package,
    CheckCircle,
    Truck,
    Trash2,
    ChevronLeft,
    ChevronRight,
    ShoppingBag,
} from "lucide-react";

// Helper to safely access nested properties or fallback
const getOrderDetails = (order) => {
    const delivery = order.delivery_details || {};
    const item = delivery.itemSnapshot || {}; // New style snapshot
    // Fallback for old style (if any legacy data exists or different structure)
    // Or check if cartItemId was populated (not likely if deleted)

    return {
        title: item.title || order.product_type || "Product",
        image: item.image || order.image,
        quantity: item.quantity || 1,
        size: item.size,
        thickness: item.thickness,
        amount: parseFloat(order.amount || 0),
        status: order.status || 'Pending',
        customerName: delivery.name || "N/A", // Use name directly from delivery_details
        email: delivery.email || "N/A",
        phone: delivery.phone || "N/A",
        address: delivery.address || "N/A",
        pincode: delivery.pincode || "",
        orderId: order.id,
        createdAt: order.created_at
    };
};

const CommonOrderList = () => {
    const [orders, setOrders] = useState([]);
    const [searchQuery, setSearchQuery] = useState("");
    const [debouncedSearchQuery, setDebouncedSearchQuery] = useState("");
    const [filter, setFilter] = useState("all");
    const [sortBy, setSortBy] = useState("newest");
    const [selectedTimePeriod, setSelectedTimePeriod] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const [totalOrders, setTotalOrders] = useState(0);
    const [totalPages, setTotalPages] = useState(1);
    const [selectedOrder, setSelectedOrder] = useState(null);
    const [showDetailsModal, setShowDetailsModal] = useState(false);
    const [loadingOrderDetails, setLoadingOrderDetails] = useState(false);
    const modalRef = useRef(null);
    const ordersPerPage = 5;

    const statusOptions = [
        { value: "all", label: "All Orders" },
        { value: "completed", label: "Completed" }, // Note: DB status is 'Delivered' usually?
        { value: "processing", label: "Processing" },
        { value: "cancelled", label: "Cancelled" },
    ];

    const sortOptions = [
        { value: "newest", label: "Sort by: Newest" },
        { value: "oldest", label: "Sort by: Oldest" },
        // Price sort handled locally or need backend support
    ];

    useEffect(() => {
        const timer = setTimeout(() => {
            setDebouncedSearchQuery(searchQuery);
        }, 500);
        return () => clearTimeout(timer);
    }, [searchQuery]);

    const fetchOrders = useCallback(async () => {
        try {
            const params = new URLSearchParams({
                page: currentPage.toString(),
                limit: ordersPerPage.toString(),
            });

            if (filter && filter !== "all") {
                // Map filter to exact DB status if needed
                // 'completed' might map to 'Delivered'
                let statusMap = filter;
                if (filter === 'completed') statusMap = 'Delivered';
                if (filter === 'processing') statusMap = 'Pending'; // or 'Processing' checks DB
                params.append("status", statusMap);
            }

            if (debouncedSearchQuery.trim()) {
                params.append("search", debouncedSearchQuery.trim());
            }

            const res = await axiosInstance.get(`orders?${params.toString()}`);

            if (res.data.orders) {
                setOrders(res.data.orders);
                setTotalOrders(res.data.total || 0);
                setTotalPages(res.data.totalPages || 1);
            } else {
                setOrders([]);
                setTotalOrders(0);
            }
        } catch (err) {
            console.error("Failed to fetch orders:", err);
            // setOrders([]); // Keep old data or clear?
        }
    }, [currentPage, filter, sortBy, debouncedSearchQuery]);

    useEffect(() => {
        fetchOrders();
    }, [fetchOrders]);

    const handleStatusChange = async (orderId, newStatus) => {
        try {
            await axiosInstance.put(`orders/${orderId}`, { status: newStatus });
            setOrders(prev => prev.map(o => o.id === orderId ? { ...o, status: newStatus } : o));
            if (selectedOrder?.id === orderId) {
                setSelectedOrder(prev => ({ ...prev, status: newStatus }));
            }
        } catch (error) {
            console.error("Status update failed:", error);
            alert("Failed to update status");
        }
    };

    const handleDeleteOrder = async (orderId) => {
        if (!confirm("Are you sure?")) return;
        try {
            await axiosInstance.delete(`orders/${orderId}`);
            fetchOrders();
            if (selectedOrder?.id === orderId) {
                setShowDetailsModal(false);
                setSelectedOrder(null);
            }
        } catch (error) {
            console.error("Delete failed:", error);
            alert("Failed to delete order");
        }
    };

    const getStatusConfig = (status) => {
        switch (status) {
            case "Delivered":
                return { bg: "bg-green-100", text: "text-green-700", label: "Delivered" };
            case "Shipped":
                return { bg: "bg-blue-100", text: "text-blue-700", label: "Shipped" };
            case "Out for Delivery":
                return { bg: "bg-yellow-100", text: "text-yellow-700", label: "Out for Delivery" };
            default:
                return { bg: "bg-gray-100", text: "text-gray-700", label: "Pending" };
        }
    };

    return (
        <div className="w-full">
            {/* Filters */}
            <div className="bg-white p-4 rounded-xl border border-neutral-200 mb-6 flex flex-wrap gap-4 items-center justify-between">
                <div className="flex gap-2">
                    {statusOptions.map(opt => (
                        <button
                            key={opt.value}
                            onClick={() => setFilter(opt.value)}
                            className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${filter === opt.value ? 'bg-primary text-white' : 'hover:bg-neutral-100 text-neutral-600'}`}
                        >
                            {opt.label}
                        </button>
                    ))}
                </div>
                {/* Add Search/Sort controls here if needed */}
            </div>

            {/* List */}
            <div className="space-y-4">
                {orders.length === 0 ? (
                    <div className="text-center p-12 bg-white rounded-xl border border-neutral-200 text-neutral-500">
                        <ShoppingBag className="w-12 h-12 mx-auto mb-3 opacity-20" />
                        No orders found based on current filters.
                    </div>
                ) : (
                    orders.map(orderRaw => {
                        const order = getOrderDetails(orderRaw);
                        const status = getStatusConfig(order.status);

                        return (
                            <div key={order.orderId} className="bg-white border border-neutral-200 rounded-xl p-6 transition-shadow hover:shadow-md">
                                <div className="flex flex-col md:flex-row justify-between gap-6">
                                    {/* Left Info */}
                                    <div className="flex gap-4">
                                        <div className="w-20 h-20 bg-neutral-100 rounded-lg flex items-center justify-center overflow-hidden shrink-0">
                                            {order.image ? (
                                                <img src={order.image} alt={order.title} className="w-full h-full object-cover" />
                                            ) : (
                                                <ImageIcon className="text-neutral-300" />
                                            )}
                                        </div>
                                        <div>
                                            <div className="flex items-center gap-2 mb-1">
                                                <h3 className="font-semibold text-secondary">{order.title}</h3>
                                                <span className={`text-xs px-2 py-0.5 rounded-full ${status.bg} ${status.text}`}>{status.label}</span>
                                            </div>
                                            <p className="text-sm text-neutral-500">Qty: {order.quantity} • {order.size ? `Size: ${order.size}` : ''}</p>
                                            <p className="text-sm text-neutral-500 mt-1">Customer: {order.customerName}</p>
                                            <p className="text-xs text-neutral-400 mt-1">ID: {order.orderId.slice(0, 8)}</p>
                                        </div>
                                    </div>

                                    {/* Right Actions */}
                                    <div className="flex flex-col items-end gap-3 justify-between">
                                        <div className="text-right">
                                            <div className="text-lg font-bold text-primary">₹{order.amount}</div>
                                            <div className="text-xs text-neutral-400">{new Date(order.createdAt).toLocaleDateString()}</div>
                                        </div>
                                        <div className="flex gap-2">
                                            <button onClick={() => { setSelectedOrder(orderRaw); setShowDetailsModal(true); }} className="p-2 hover:bg-neutral-100 rounded-lg text-neutral-600" title="View Details">
                                                <Eye className="w-4 h-4" />
                                            </button>
                                            <button onClick={() => handleDeleteOrder(order.orderId)} className="p-2 hover:bg-red-50 rounded-lg text-red-500" title="Delete">
                                                <Trash2 className="w-4 h-4" />
                                            </button>
                                            <select
                                                value={order.status}
                                                onChange={(e) => handleStatusChange(order.orderId, e.target.value)}
                                                className="text-xs border border-neutral-300 rounded px-2 py-1 outline-none focus:border-primary"
                                            >
                                                <option value="Pending">Pending</option>
                                                <option value="Shipped">Shipped</option>
                                                <option value="Delivered">Delivered</option>
                                                <option value="Cancelled">Cancelled</option>
                                            </select>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        );
                    })
                )}
            </div>

            {/* Pagination */}
            <div className="flex justify-center mt-8 gap-2">
                <button disabled={currentPage === 1} onClick={() => setCurrentPage(p => p - 1)} className="p-2 border rounded disabled:opacity-50 hover:bg-neutral-50"><ChevronLeft className="w-4 h-4" /></button>
                <span className="px-4 py-2 text-sm text-neutral-600">Page {currentPage} of {totalPages}</span>
                <button disabled={currentPage === totalPages} onClick={() => setCurrentPage(p => p + 1)} className="p-2 border rounded disabled:opacity-50 hover:bg-neutral-50"><ChevronRight className="w-4 h-4" /></button>
            </div>

            {/* Details Modal */}
            {showDetailsModal && selectedOrder && (
                <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
                    <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
                        <div className="p-6 border-b border-neutral-200 flex justify-between items-center sticky top-0 bg-white">
                            <h2 className="text-xl font-bold">Order Details</h2>
                            <button onClick={() => setShowDetailsModal(false)}><X className="w-6 h-6" /></button>
                        </div>
                        <div className="p-6 space-y-6">
                            {(() => {
                                const det = getOrderDetails(selectedOrder);
                                return (
                                    <>
                                        <div className="grid grid-cols-2 gap-4 bg-neutral-50 p-4 rounded-xl">
                                            <div>
                                                <p className="text-xs text-neutral-500 uppercase font-semibold">Customer</p>
                                                <p className="font-medium">{det.customerName}</p>
                                                <p className="text-sm text-neutral-600">{det.email}</p>
                                                <p className="text-sm text-neutral-600">{det.phone}</p>
                                            </div>
                                            <div>
                                                <p className="text-xs text-neutral-500 uppercase font-semibold">Shipping Address</p>
                                                <p className="text-sm text-neutral-600">{det.address}</p>
                                                <p className="text-sm text-neutral-600">{det.pincode}</p>
                                            </div>
                                        </div>

                                        <div>
                                            <p className="text-xs text-neutral-500 uppercase font-semibold mb-2">Item Details</p>
                                            <div className="flex gap-4 border border-neutral-200 p-4 rounded-xl">
                                                <div className="w-24 h-24 bg-neutral-100 rounded-lg flex items-center justify-center overflow-hidden shrink-0">
                                                    {det.image ? <img src={det.image} className="w-full h-full object-contain" /> : <ImageIcon />}
                                                </div>
                                                <div>
                                                    <h3 className="font-semibold text-lg">{det.title}</h3>
                                                    <p className="text-sm text-neutral-600">Quantity: {det.quantity}</p>
                                                    <p className="text-sm text-neutral-600">Size: {det.size || 'Standard'}</p>
                                                    <p className="text-sm text-neutral-600">Thickness: {det.thickness || 'Standard'}</p>
                                                    <p className="text-lg font-bold text-primary mt-2">Total: ₹{det.amount}</p>
                                                </div>
                                            </div>
                                        </div>
                                    </>
                                );
                            })()}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default CommonOrderList;
