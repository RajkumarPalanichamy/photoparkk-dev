'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, ArrowUpRight, Plus, Search, Package } from 'lucide-react';
import axiosInstance from '@/utils/axiosInstance';

/**
 * Products Page - The "Editorial Mosaic" Edition
 * Adapted for the Products Page from the previous Home Page design.
 * Features the asymmetric staggered grid and vertical nav index, 
 * now with integrated search functionality for the full gallery.
 */
const Products = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [activeTab, setActiveTab] = useState('all');
    const [searchQuery, setSearchQuery] = useState("");

    useEffect(() => {
        const fetchAllData = async () => {
            try {
                const types = ['acrylic', 'canvas', 'backlight'];
                const productPromises = types.map(async (type) => {
                    try {
                        const res = await axiosInstance.get(`frames/${type}`);
                        return (res.data || []).map(item => ({ ...item, type }));
                    } catch (err) {
                        return [];
                    }
                });

                // Products page usually only shows frames, templates are on home/distinctive
                const results = await Promise.all(productPromises);
                setProducts(results.flat());
                setLoading(false);
            } catch (error) {
                setLoading(false);
            }
        };
        fetchAllData();
    }, []);

    const categories = [
        { id: 'all', label: 'Full Archive', index: '01' },
        { id: 'acrylic', label: 'Acrylic Series', index: '02' },
        { id: 'canvas', label: 'Canvas Series', index: '03' },
        { id: 'backlight', label: 'Backlight Series', index: '04' }
    ];

    const filteredItems = products.filter((item) => {
        const matchesSearch = item.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
            item.type?.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesTab = activeTab === "all" || item.type === activeTab;
        return matchesSearch && matchesTab;
    });

    return (
        <div className="min-h-screen bg-[#F0F2F5] pt-4 pb-24 font-sans relative overflow-hidden">
            {/* Subtle light accents */}
            <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-blue-100/40 rounded-full blur-[120px] pointer-events-none" />

            <div className="max-w-[1700px] mx-auto px-6 lg:px-12">

                {/* ═══ PREMIUM SATIN STUDIO HEADER ═══ */}
                <div className="relative mb-6 group rounded-[2.5rem] overflow-hidden border border-white bg-white shadow-[0_20px_50px_-15px_rgba(30,58,138,0.08)]">
                    {/* Atmospheric Background Layer */}
                    <div className="absolute inset-0 opacity-[0.25] pointer-events-none overflow-hidden">
                        <img
                            src="/interior-wall.jpg"
                            alt="Background Atmosphere"
                            className="w-full h-full object-cover transition-transform duration-[20s] scale-105 group-hover:scale-110"
                        />
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10 py-12 px-14">
                        {/* Left side: Editorial Typography */}
                        <div className="lg:col-span-7">
                            <motion.div
                                initial={{ opacity: 0, x: -25 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.8 }}
                                className="flex flex-col items-start"
                            >
                                <div className="flex items-center gap-3 mb-6">
                                    <div className="w-8 h-[2px] bg-blue-600 rounded-full" />
                                    <span className="text-[10px] font-black uppercase tracking-[0.6em] text-blue-600">Archival Series</span>
                                </div>

                                <h1 className="text-5xl md:text-[7rem] font-black text-[#0A1D37] tracking-tighter mb-8 leading-[0.8]">
                                    Masterpiece <br />
                                    <span className="text-blue-600 italic font-light">Inventory.</span>
                                </h1>

                                <p className="text-lg text-neutral-500 font-medium max-w-lg leading-relaxed border-l-4 border-blue-600 pl-8 py-2 bg-white/40 backdrop-blur-sm rounded-r-xl">
                                    Engineering the intersection of visual memory & luxury architecture.
                                </p>
                            </motion.div>
                        </div>

                        {/* Right side: Search & Vertical Hub */}
                        <div className="lg:col-span-5 lg:flex lg:justify-end">
                            <div className="flex flex-col w-full lg:max-w-[380px] bg-white/60 backdrop-blur-2xl rounded-3xl p-8 border border-white/80 shadow-xl shadow-blue-900/5">
                                {/* Compact Search Bar */}
                                <div className="relative group w-full mb-8">
                                    <Search className="absolute left-0 top-1/2 -translate-y-1/2 w-4 h-4 text-blue-600" />
                                    <input
                                        type="text"
                                        placeholder="SEARCH THE CATALOG..."
                                        value={searchQuery}
                                        onChange={(e) => setSearchQuery(e.target.value)}
                                        className="w-full pl-8 pr-4 py-4 bg-transparent border-b-2 border-neutral-100 outline-none focus:border-blue-600 transition-all text-[#0A1D37] font-black uppercase text-[10px] tracking-widest placeholder:text-neutral-400"
                                    />
                                </div>

                                {/* Premium Categorization Hub */}
                                <div className="flex flex-col gap-2">
                                    {categories.map((cat, idx) => (
                                        <button
                                            key={cat.id}
                                            onClick={() => setActiveTab(cat.id)}
                                            className={`group flex items-center justify-between px-6 py-4.5 rounded-2xl transition-all duration-400 relative ${activeTab === cat.id
                                                ? 'bg-white shadow-xl shadow-blue-900/5 ring-1 ring-blue-100 scale-[1.02] z-10'
                                                : 'text-neutral-400 hover:bg-white/50 hover:text-blue-600'
                                                }`}
                                        >
                                            <div className="flex items-center gap-6">
                                                <span className={`text-[10px] font-black ${activeTab === cat.id ? 'text-blue-600' : 'text-neutral-200'
                                                    }`}>
                                                    0{idx + 1}
                                                </span>
                                                <span className={`text-[12px] font-black uppercase tracking-[0.1em] transition-colors ${activeTab === cat.id ? 'text-[#0A1D37]' : ''
                                                    }`}>
                                                    {cat.label}
                                                </span>
                                            </div>
                                            {activeTab === cat.id && (
                                                <motion.div
                                                    layoutId="selectionIndicator"
                                                    className="w-2.5 h-2.5 bg-blue-600 rounded-full shadow-[0_0_12px_rgba(37,99,235,0.4)]"
                                                />
                                            )}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* ═══ STAGGERED MOSAIC GALLERY ═══ */}
                {loading ? (
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                        {[1, 2, 3].map(i => <div key={i} className="aspect-[3/4] bg-neutral-50 rounded-2xl animate-pulse" />)}
                    </div>
                ) : filteredItems.length === 0 ? (
                    <div className="py-40 text-center">
                        <Package className="w-12 h-12 text-neutral-100 mx-auto mb-8" />
                        <h4 className="text-xl font-bold text-[#0A1D37] mb-4">No matching assets found</h4>
                        <button onClick={() => { setSearchQuery(""); setActiveTab("all"); }} className="text-blue-600 font-bold uppercase tracking-widest text-[10px] border-b border-blue-600 pb-1">Reset Filters</button>
                    </div>
                ) : (
                    <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-12 gap-y-24 items-start">
                        <AnimatePresence mode='popLayout'>
                            {filteredItems.map((item, index) => (
                                <StaggeredCard
                                    key={item.id || index}
                                    item={item}
                                    index={index}
                                />
                            ))}
                        </AnimatePresence>
                    </motion.div>
                )}
            </div>
        </div>
    );
};

const StaggeredCard = ({ item, index }) => {
    const isEven = index % 2 === 0;
    const firstSize = item.sizes && item.sizes.length > 0 ? item.sizes[0] : null;
    const price = firstSize?.price;
    const href = `/shop/${item.type}/${(item.shape || 'portrait').toLowerCase()}`;

    return (
        <motion.div
            layout
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.8 }}
            className={`group relative ${isEven ? 'md:mt-24' : ''}`}
        >
            <Link href={href} className="block overflow-hidden relative rounded-[2rem]">
                {/* Clean Image Shell */}
                <div className="relative aspect-[4/5] overflow-hidden bg-neutral-50 transition-all duration-1000 group-hover:translate-x-4">
                    <img
                        src={item.image || "/api/placeholder/800/1000"}
                        alt={item.title}
                        className="w-full h-full object-cover transition-transform duration-[3s] group-hover:scale-110"
                    />

                    {/* Minimal Border Label */}
                    <div className="absolute top-8 left-8 bg-white/90 backdrop-blur-md px-5 py-2 rounded-full border border-blue-50 shadow-sm">
                        <span className="text-[9px] font-bold text-blue-600 uppercase tracking-widest">{item.type}</span>
                    </div>

                    {/* Interactive White/Blue Overlay */}
                    <div className="absolute inset-0 bg-blue-600/0 group-hover:bg-blue-600/10 transition-colors duration-700" />

                    {/* Floating Bottom Link */}
                    <div className="absolute bottom-8 left-8 opacity-0 group-hover:opacity-100 transition-all duration-700 translate-y-4 group-hover:translate-y-0">
                        <div className="bg-white text-blue-600 p-4 rounded-full shadow-2xl flex items-center gap-3">
                            <span className="text-[10px] font-black uppercase tracking-widest ml-2">Configure</span>
                            <div className="bg-blue-600 text-white p-1 rounded-full">
                                <Plus className="w-3 h-3" />
                            </div>
                        </div>
                    </div>
                </div>

                {/* Architectural Details */}
                <div className="mt-8 px-4 flex justify-between items-start transition-transform duration-700 group-hover:-translate-x-2">
                    <div className="max-w-[70%]">
                        <h3 className="text-xl font-bold text-[#0A1D37] tracking-tight group-hover:text-blue-600 transition-colors leading-tight mb-2">
                            {item.title}
                        </h3>
                        <p className="text-[10px] font-bold text-neutral-300 uppercase tracking-widest italic group-hover:text-blue-200 transition-colors">
                            {item.shape} Architecture
                        </p>
                    </div>
                    <div className="text-right">
                        <p className="text-xl font-bold text-[#0A1D37] tracking-tighter shrink-0">
                            ₹{price?.toLocaleString() || '---'}
                        </p>
                        <span className="text-[9px] font-bold text-blue-100 uppercase tracking-widest block transform group-hover:-translate-x-1 transition-transform">Entry</span>
                    </div>
                </div>
            </Link>
        </motion.div>
    );
};

export default Products;
