'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, ArrowUpRight, Search, Package } from 'lucide-react';
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
                    <motion.div layout className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                        <AnimatePresence mode='popLayout'>
                            {filteredItems.map((item, index) => (
                                <ProductCard
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

const ProductCard = ({ item, index }) => {
    const firstSize = item.sizes && item.sizes.length > 0 ? item.sizes[0] : null;
    const price = firstSize?.price;
    const href = `/shop/${item.type}/${(item.shape || 'portrait').toLowerCase()}`;

    return (
        <motion.div
            layout
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.5, delay: index * 0.05 }}
            className="group"
        >
            <Link href={href} className="block bg-white rounded-2xl overflow-hidden border border-blue-50 shadow-[0_4px_20px_rgba(37,99,235,0.06)] hover:shadow-[0_12px_40px_rgba(37,99,235,0.12)] hover:-translate-y-1 transition-all duration-500">
                {/* Image Section */}
                <div className="relative aspect-[4/5] overflow-hidden bg-blue-50/30">
                    <img
                        src={item.image || "/api/placeholder/800/1000"}
                        alt={item.title}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />

                    {/* Category Badge */}
                    <div className="absolute top-4 left-4 bg-white/95 backdrop-blur-sm px-3.5 py-1.5 rounded-full border border-blue-100 shadow-sm">
                        <span className="text-[9px] font-bold text-blue-600 uppercase tracking-widest">{item.type}</span>
                    </div>

                    {/* Hover Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-blue-900/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                    {/* Hover CTA */}
                    <div className="absolute bottom-4 inset-x-4 opacity-0 group-hover:opacity-100 translate-y-3 group-hover:translate-y-0 transition-all duration-500">
                        <div className="bg-blue-600 text-white py-3 rounded-xl text-center text-[11px] font-bold uppercase tracking-widest shadow-lg shadow-blue-600/30 flex items-center justify-center gap-2">
                            Configure <ArrowUpRight className="w-3.5 h-3.5" />
                        </div>
                    </div>
                </div>

                {/* Info Section */}
                <div className="p-5">
                    <div className="flex items-start justify-between gap-3 mb-3">
                        <h3 className="text-base font-bold text-[#0A1D37] tracking-tight group-hover:text-blue-600 transition-colors leading-snug line-clamp-2">
                            {item.title}
                        </h3>
                        <p className="text-lg font-black text-blue-600 shrink-0">
                            ₹{price?.toLocaleString() || '---'}
                        </p>
                    </div>
                    <div className="flex items-center justify-between pt-3 border-t border-blue-50">
                        <span className="text-[10px] font-bold text-neutral-400 uppercase tracking-widest">
                            {item.shape || 'Standard'} · {item.type}
                        </span>
                        <ArrowRight className="w-4 h-4 text-blue-300 group-hover:text-blue-600 group-hover:translate-x-1 transition-all duration-300" />
                    </div>
                </div>
            </Link>
        </motion.div>
    );
};

export default Products;
