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
        customerName: delivery.name || "N/A",
        email: delivery.email || "N/A",
        phone: delivery.phone || "N/A",
        address: delivery.address || "N/A",
        pincode: delivery.pincode || "",
        orderId: order.id,
        createdAt: order.created_at,
        customizationDetails: item.customizationDetails || null
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
                            className={`px-3 py-1.5 rounded-lg text-sm font-bold transition-all ${filter === opt.value ? 'bg-blue-600 text-white shadow-md shadow-blue-500/20' : 'hover:bg-slate-50 text-slate-600'}`}
                        >
                            {opt.label}
                        </button>
                    ))}
                </div>
                {/* Add Search/Sort controls here if needed */}
            </div>

            {/* List */}
            <div className="space-y-6">
                {orders.length === 0 ? (
                    <div className="text-center p-20 bg-white rounded-3xl border border-neutral-100 text-neutral-400 shadow-sm">
                        <ShoppingBag className="w-16 h-16 mx-auto mb-4 opacity-10" />
                        <p className="text-sm font-medium tracking-wide">No orders found in this collection.</p>
                    </div>
                ) : (
                    orders.map(orderRaw => {
                        const order = getOrderDetails(orderRaw);
                        const status = getStatusConfig(order.status);
                        const isBacklight = orderRaw.product_type?.toLowerCase().includes('backlight') || orderRaw.productType?.toLowerCase().includes('backlight');

                        return (
                            <div key={order.orderId} className={`bg-white border ${isBacklight ? 'border-blue-100 shadow-blue-500/5' : 'border-slate-100'} rounded-2xl p-6 transition-all duration-300 hover:shadow-xl hover:-translate-y-1 group relative overflow-hidden`}>
                                {isBacklight && (
                                    <div className="absolute top-0 right-0 w-24 h-24 -mr-8 -mt-8 bg-blue-50 rounded-full blur-2xl opacity-50 group-hover:opacity-100 transition-opacity" />
                                )}
                                <div className="flex flex-col md:flex-row justify-between gap-8 relative z-10">
                                    {/* Left Info */}
                                    <div className="flex gap-6">
                                        <div className="relative group/img">
                                            <div className="w-24 h-24 bg-slate-50 rounded-xl flex items-center justify-center overflow-hidden shrink-0 shadow-inner border border-slate-100">
                                                {order.image ? (
                                                    <img src={order.image} alt={order.title} className="w-full h-full object-cover transition-transform duration-500 group-hover/img:scale-110" />
                                                ) : (
                                                    <ImageIcon className="text-slate-200 w-8 h-8" />
                                                )}
                                            </div>
                                        </div>
                                        <div className="space-y-1">
                                            <div className="flex items-center gap-3 mb-1.5">
                                                <h3 className="font-bold text-lg text-slate-900 group-hover:text-blue-600 transition-colors">{order.title}</h3>
                                                <span className={`text-[10px] font-bold uppercase tracking-widest px-2.5 py-1 rounded-full ${status.bg} ${status.text} border shadow-sm`}>{status.label}</span>
                                            </div>
                                            <div className="flex flex-wrap gap-x-4 gap-y-1 text-xs text-slate-500 font-bold">
                                                <span className="flex items-center gap-1.5 text-blue-600/70"><Package className="w-3 h-3" /> Qty: {order.quantity}</span>
                                                {order.size && <span className="flex items-center gap-1.5">Size: {order.size}</span>}
                                                <span className="text-slate-200">|</span>
                                                <span className="text-slate-900 font-black">ID: {order.orderId.slice(0, 8).toUpperCase()}</span>
                                            </div>
                                            <div className="pt-3 flex items-center gap-3 border-t border-slate-50 mt-3">
                                                <div className="w-8 h-8 rounded-full bg-slate-50 flex items-center justify-center text-[10px] font-bold text-blue-600 border border-slate-100 shadow-sm">
                                                    {order.customerName.charAt(0)}
                                                </div>
                                                <div>
                                                    <p className="text-xs font-bold text-slate-900 leading-none">{order.customerName}</p>
                                                    <p className="text-[10px] text-slate-400 mt-1">{order.email}</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Right Actions */}
                                    <div className="flex flex-col items-end justify-between gap-4 text-right">
                                        <div className="space-y-1">
                                            <div className="text-2xl font-black text-slate-900 tracking-tight leading-none">₹{order.amount}</div>
                                            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{new Date(order.createdAt).toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' })}</p>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <button onClick={() => { setSelectedOrder(orderRaw); setShowDetailsModal(true); }} className="flex items-center gap-2 px-4 py-2 bg-slate-50 hover:bg-slate-100 text-slate-600 rounded-xl text-xs font-bold transition-all border border-slate-100">
                                                <Eye className="w-3.5 h-3.5" /> View
                                            </button>
                                            <button onClick={() => handleDeleteOrder(order.orderId)} className="p-2.5 hover:bg-red-50 text-red-500 rounded-xl transition-all border border-transparent hover:border-red-100">
                                                <Trash2 className="w-4 h-4" />
                                            </button>

                                            <div className="h-4 w-[1px] bg-slate-100 mx-1" />

                                            <select
                                                value={order.status}
                                                onChange={(e) => handleStatusChange(order.orderId, e.target.value)}
                                                className="text-xs font-bold bg-blue-600 text-white rounded-xl px-4 py-2 outline-none focus:ring-4 ring-blue-500/10 cursor-pointer appearance-none border-none transition-all hover:bg-blue-700 shadow-md shadow-blue-500/10"
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

                                                    {det.customizationDetails && (
                                                        <div className="mt-4 p-4 bg-blue-50/50 rounded-2xl border border-blue-100 shadow-sm">
                                                            <p className="text-[10px] font-black text-blue-600 uppercase tracking-widest mb-3">Customization Specs</p>
                                                            <div className="grid grid-cols-2 gap-x-6 gap-y-2 text-xs">
                                                                {det.customizationDetails.lightMode && (
                                                                    <div className="flex flex-col gap-0.5"><span className="text-slate-400 font-bold uppercase tracking-tighter">Light Mode</span><span className="font-bold text-slate-900">{det.customizationDetails.lightMode}</span></div>
                                                                )}
                                                                {det.customizationDetails.powerType && (
                                                                    <div className="flex flex-col gap-0.5"><span className="text-slate-400 font-bold uppercase tracking-tighter">Power Type</span><span className="font-bold text-slate-900">{det.customizationDetails.powerType}</span></div>
                                                                )}
                                                                {det.customizationDetails.ledBrightness !== undefined && (
                                                                    <div className="flex flex-col gap-0.5"><span className="text-slate-400 font-bold uppercase tracking-tighter">Intensity</span><span className="font-bold text-slate-900">{Math.round(det.customizationDetails.ledBrightness * 100)}%</span></div>
                                                                )}
                                                            </div>
                                                            {det.customizationDetails.smartUpgrades && det.customizationDetails.smartUpgrades.length > 0 && (
                                                                <div className="mt-3 pt-3 border-t border-blue-100/50">
                                                                    <p className="text-[10px] font-bold text-slate-400 uppercase mb-2">Upgrades</p>
                                                                    <div className="flex flex-wrap gap-1.5">
                                                                        {det.customizationDetails.smartUpgrades.map(up => (
                                                                            <span key={up} className="text-[10px] bg-white text-blue-600 px-2.5 py-1 rounded-lg font-black border border-blue-100 shadow-sm">{up}</span>
                                                                        ))}
                                                                    </div>
                                                                </div>
                                                            )}
                                                        </div>
                                                    )}

                                                    <p className="text-2xl font-black text-slate-900 mt-4 tracking-tight">Total: ₹{det.amount}</p>
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
