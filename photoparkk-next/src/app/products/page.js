'use client';

import React, { useEffect, useState } from "react";
import Link from "next/link";
import axiosInstance from "@/utils/axiosInstance";
import {
    Package,
    Loader2,
    Search,
    Sparkles,
    ArrowRight,
    Filter,
    Layers,
    Sun,
    Image as ImageIcon,
    ChevronRight,
    ShoppingBag
} from "lucide-react";

const Products = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState("");
    const [activeTab, setActiveTab] = useState("all");

    useEffect(() => {
        const fetchAllProducts = async () => {
            try {
                const types = ['acrylic', 'canvas', 'backlight'];
                const promises = types.map(async (type) => {
                    const res = await axiosInstance.get(`frames/${type}`);
                    return res.data.map(item => ({ ...item, type }));
                });

                const results = await Promise.all(promises);
                const merged = results.flat();
                setProducts(merged);
                setLoading(false);
            } catch (error) {
                console.error("Failed to fetch products:", error);
                setProducts([]);
                setLoading(false);
            }
        };

        fetchAllProducts();
    }, []);

    const filteredProducts = products.filter((product) => {
        const matchesSearch = product.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
            product.type?.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesTab = activeTab === "all" || product.type === activeTab;
        return matchesSearch && matchesTab;
    });

    return (
        <div className="min-h-screen bg-slate-50/50 pt-[120px] pb-24 px-4 font-sans selection:bg-blue-600/10 selection:text-blue-600">
            {/* Background Aesthetic Elements */}
            <div className="fixed inset-0 pointer-events-none overflow-hidden -z-10 font-sans text-secondary">
                <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-blue-100/20 rounded-full blur-[120px] -mr-64 -mt-64" />
                <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-slate-200/30 rounded-full blur-[120px] -ml-64 -mb-64" />
            </div>

            <div className="max-w-7xl mx-auto">
                {/* ═══ HERO / HEADER SECTION ═══ */}
                <div className="relative mb-16">
                    <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-12">
                        <div className="max-w-2xl">
                            <div className="flex items-center gap-2 mb-4">
                                <span className="h-[1px] w-8 bg-blue-600"></span>
                                <span className="text-[10px] font-black text-blue-600 uppercase tracking-[0.4em]">Masterpiece Archive</span>
                            </div>
                            <h1 className="text-5xl md:text-7xl font-extrabold text-slate-900 tracking-tighter leading-none mb-6">
                                Curated <br /> Collection
                            </h1>
                            <p className="text-slate-500 font-medium text-lg leading-relaxed max-w-lg">
                                Engineering the intersection of visual memory and luxury architecture. Premium frames designed for the modern aesthetic.
                            </p>
                        </div>

                        {/* Search & Stats Bar */}
                        <div className="flex flex-col gap-4 w-full md:w-auto">
                            <div className="relative group">
                                <Search className="absolute left-6 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 group-focus-within:text-blue-600 transition-colors" />
                                <input
                                    type="text"
                                    placeholder="Inventory Search..."
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    className="w-full md:w-[320px] pl-14 pr-6 py-4 bg-white border border-slate-200 rounded-3xl outline-none focus:border-blue-600/30 focus:ring-4 focus:ring-blue-600/5 transition-all text-slate-900 font-medium shadow-sm hover:border-slate-300 placeholder:text-slate-300"
                                />
                            </div>
                        </div>
                    </div>

                    {/* Navigation Tabs */}
                    <div className="flex items-center gap-2 overflow-x-auto pb-4 no-scrollbar border-b border-slate-100">
                        {["all", "acrylic", "canvas", "backlight"].map((tab) => (
                            <button
                                key={tab}
                                onClick={() => setActiveTab(tab)}
                                className={`px-6 py-2.5 rounded-full text-[11px] font-black uppercase tracking-[0.2em] transition-all whitespace-nowrap ${activeTab === tab
                                    ? "bg-slate-900 text-white shadow-xl shadow-slate-900/10 scale-105"
                                    : "bg-transparent text-slate-400 hover:text-slate-900"
                                    }`}
                            >
                                {tab}
                            </button>
                        ))}
                    </div>
                </div>

                {loading ? (
                    <div className="flex flex-col justify-center items-center h-[50vh] gap-6">
                        <div className="relative">
                            <div className="w-16 h-16 border-4 border-blue-600/10 border-t-blue-600 rounded-full animate-spin" />
                            <div className="absolute inset-0 flex items-center justify-center">
                                <ShoppingBag className="w-6 h-6 text-blue-600/40" />
                            </div>
                        </div>
                        <p className="text-slate-400 font-black uppercase tracking-[0.3em] text-[10px]">Accessing Database</p>
                    </div>
                ) : filteredProducts.length === 0 ? (
                    <div className="bg-white/60 backdrop-blur-xl rounded-[40px] border border-white shadow-2xl p-20 text-center max-w-2xl mx-auto">
                        <div className="w-20 h-20 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-8 text-slate-200">
                            <Package className="w-10 h-10" />
                        </div>
                        <h3 className="text-2xl font-black text-slate-900 mb-4 tracking-tight uppercase">Protocol: Not Found</h3>
                        <p className="text-slate-500 font-medium mb-10 leading-relaxed">
                            The requested assets could not be located in our current inventory. Adjust your parameters or contact the concierge.
                        </p>
                        <button
                            onClick={() => { setSearchQuery(""); setActiveTab("all"); }}
                            className="bg-slate-900 text-white px-10 py-4 rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-black transition-all shadow-xl shadow-slate-900/20"
                        >
                            Reset Parameters
                        </button>
                    </div>
                ) : (
                    <>
                        <div className="mb-10 flex items-center justify-between">
                            <div className="flex items-center gap-3">
                                <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Available Assets</span>
                                <span className="px-3 py-1 bg-white border border-slate-100 rounded-full text-[10px] font-black text-blue-600">
                                    {filteredProducts.length}
                                </span>
                            </div>
                        </div>

                        {/* ═══ PRODUCTS GRID ═══ */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 gap-y-16">
                            {filteredProducts.map((product, index) => {
                                const firstSize = product.sizes && product.sizes.length > 0 ? product.sizes[0] : null;
                                const isBacklight = product.type === "backlight";

                                return (
                                    <Link
                                        key={product.id || index}
                                        href={`/shop/${product.type}/${product.shape.toLowerCase()}`}
                                        className="group relative flex flex-col h-full"
                                    >
                                        {/* Luxury Badge - Floating */}
                                        <div className="absolute -top-4 -right-4 z-20 opacity-0 group-hover:opacity-100 transition-all duration-500 scale-75 group-hover:scale-100 rotate-12 group-hover:rotate-0">
                                            <div className="bg-blue-600 text-white w-20 h-20 rounded-full flex flex-col items-center justify-center shadow-2xl shadow-blue-500/40 border-4 border-white">
                                                <span className="text-[8px] font-black uppercase tracking-tighter">Premium</span>
                                                <Sparkles className="w-4 h-4" />
                                            </div>
                                        </div>

                                        {/* Image Container with Custom Shadow & Border Architecture */}
                                        <div className="relative aspect-[4/5] bg-white rounded-[40px] overflow-hidden shadow-[0_10px_40px_rgba(0,0,0,0.04)] border border-slate-100 transition-all duration-700 group-hover:shadow-[0_40px_80px_rgba(0,0,0,0.12)] group-hover:-translate-y-4 group-hover:border-blue-600/20">
                                            {/* Category Tag Overlay */}
                                            <div className="absolute top-6 left-6 z-10 flex flex-col gap-2">
                                                <div className="bg-white/80 backdrop-blur-xl border border-white/50 px-4 py-2 rounded-2xl shadow-xl flex items-center gap-2">
                                                    {isBacklight ? <Sun className="w-3 h-3 text-amber-500" /> : <Layers className="w-3 h-3 text-blue-600" />}
                                                    <span className="text-[9px] font-black text-slate-900 uppercase tracking-widest">{product.type}</span>
                                                </div>
                                            </div>

                                            <img
                                                src={product.image || "/api/placeholder/800/800"}
                                                alt={product.title}
                                                className="w-full h-full object-cover transition-all duration-1000 group-hover:scale-110"
                                            />

                                            {/* Hover Action Gradient Overlay */}
                                            <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 via-slate-900/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex flex-col justify-end p-8">
                                                <div className="flex items-center gap-2 text-white font-black uppercase text-[10px] tracking-[0.3em] translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                                                    Configure Details <ArrowRight className="w-3 h-3 text-blue-400" />
                                                </div>
                                            </div>
                                        </div>

                                        {/* Info Section */}
                                        <div className="pt-8 px-2 flex flex-col flex-1">
                                            <div className="flex items-center gap-2 mb-3">
                                                <span className="text-[9px] font-black text-slate-300 uppercase tracking-[0.2em]">{product.shape}</span>
                                                <div className="w-1 h-1 bg-slate-200 rounded-full" />
                                                <span className="text-[9px] font-black text-blue-600/40 uppercase tracking-[0.2em]">{product.type} Series</span>
                                            </div>

                                            <h3 className="text-xl font-bold text-slate-900 mb-4 tracking-tight leading-7 line-clamp-2 min-h-[3.5rem] group-hover:text-blue-600 transition-colors">
                                                {product.title}
                                            </h3>

                                            <div className="flex items-center justify-between mt-auto">
                                                {firstSize ? (
                                                    <div className="flex flex-col">
                                                        <span className="text-[9px] font-black text-slate-300 uppercase tracking-[0.1em] mb-1">Entry Price</span>
                                                        <div className="flex items-center gap-2">
                                                            <span className="text-2xl font-black text-slate-900 tracking-tighter">
                                                                ₹{firstSize.price.toLocaleString()}
                                                            </span>
                                                            {firstSize.original && firstSize.original > firstSize.price && (
                                                                <span className="text-slate-300 line-through text-xs font-bold">
                                                                    ₹{firstSize.original.toLocaleString()}
                                                                </span>
                                                            )}
                                                        </div>
                                                    </div>
                                                ) : (
                                                    <span className="text-slate-300 text-[10px] font-bold uppercase tracking-widest italic">
                                                        Protocol Pending
                                                    </span>
                                                )}

                                                <div className="w-12 h-12 bg-slate-50 border border-slate-100 rounded-2xl flex items-center justify-center group-hover:bg-blue-600 group-hover:border-blue-600 group-hover:text-white transition-all duration-500">
                                                    <ChevronRight className="w-5 h-5 group-hover:translate-x-0.5 transition-transform" />
                                                </div>
                                            </div>
                                        </div>
                                    </Link>
                                );
                            })}
                        </div>
                    </>
                )}
            </div>

            {/* Floating Navigation Prompt (Optional Aesthetic Feature) */}
            <div className="fixed bottom-10 left-1/2 -translate-x-1/2 z-50 pointer-events-none">
                <div className="bg-slate-900/90 backdrop-blur-2xl text-white px-8 py-3 rounded-full text-[9px] font-black uppercase tracking-[0.3em] flex items-center gap-4 shadow-2xl shadow-slate-900/40 border border-slate-800">
                    <span className="opacity-40">System Status: Optimal</span>
                    <div className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse" />
                    <span className="opacity-40 whitespace-nowrap">Global Shipping Enabled</span>
                </div>
            </div>
        </div>
    );
};

export default Products;

