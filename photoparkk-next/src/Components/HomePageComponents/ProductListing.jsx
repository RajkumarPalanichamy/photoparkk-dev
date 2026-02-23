'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, ArrowRight, ShoppingBag, ChevronRight } from 'lucide-react';
import axiosInstance from '@/utils/axiosInstance';

/**
 * ProductListing Component - White & Blue Signature Edition
 * Adapted for the Home Page from the previous Products page design.
 * Features the clean editorial search/tab layout and large card format.
 */
const ProductListing = () => {
    const [products, setProducts] = useState([]);
    const [templates, setTemplates] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState("");
    const [activeTab, setActiveTab] = useState('all');

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

                const templatePromise = axiosInstance.get('customizer-templates')
                    .then(res => res.data || [])
                    .catch(() => []);

                const [productResults, templatesData] = await Promise.all([
                    Promise.all(productPromises),
                    templatePromise
                ]);

                setProducts(productResults.flat());
                setTemplates(templatesData);
                setLoading(false);
            } catch (error) {
                setLoading(false);
            }
        };
        fetchAllData();
    }, []);

    const categories = [
        { id: 'all', label: 'All Assets' },
        { id: 'acrylic', label: 'Acrylic' },
        { id: 'canvas', label: 'Canvas' },
        { id: 'backlight', label: 'Backlight' },
        { id: 'templates', label: 'Ready Themes' }
    ];

    const allItems = [...products, ...templates];

    const filteredItems = allItems.filter((item) => {
        const isTemplate = item.type === undefined;
        const type = isTemplate ? 'templates' : item.type;

        const matchesSearch = item.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
            (type && type.toLowerCase().includes(searchQuery.toLowerCase()));

        const matchesTab = activeTab === "all" || type === activeTab;

        return matchesSearch && matchesTab;
    });

    return (
        <section className="py-32 bg-white font-sans relative">
            {/* Subtle Blue "Shade" Accents */}
            <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-blue-50/40 rounded-full blur-[140px] -mr-64 -mt-32 pointer-events-none" />
            <div className="absolute top-1/2 left-0 w-[500px] h-[500px] bg-indigo-50/20 rounded-full blur-[120px] -ml-40 pointer-events-none" />

            <div className="max-w-7xl mx-auto px-8 relative z-10">
                {/* Centered Header Section */}
                <div className="flex flex-col items-center text-center mb-24">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                        viewport={{ once: true }}
                        className="max-w-4xl flex flex-col items-center"
                    >
                        <div className="flex items-center gap-4 mb-8">
                            <span className="w-12 h-[1px] bg-primary/40 block" />
                            <span className="text-[11px] font-black uppercase tracking-[0.5em] text-primary">Prestige Collections</span>
                            <span className="w-12 h-[1px] bg-primary/40 block" />
                        </div>

                        <h2 className="text-6xl md:text-9xl font-black text-[#0A1D37] tracking-tighter mb-10 leading-[0.9]">
                            Distinctive <br />
                            <span className="bg-gradient-to-r from-[#0A1D37] via-neutral-400 to-[#0A1D37] bg-clip-text text-transparent italic font-light">Artisan Frames</span>
                        </h2>

                        <p className="text-xl text-neutral-500 font-medium max-w-2xl leading-relaxed mb-16 px-4">
                            Where advanced engineering meets curated elegance. <br className="hidden md:block" /> Discover frames designed to elevate your visual identity.
                        </p>

                        {/* Centered Elite Nav Hub Underneath */}
                        <div className="flex flex-wrap gap-3 p-1.5 bg-neutral-50/50 backdrop-blur-xl rounded-[2.5rem] border border-neutral-100/50 shadow-xl shadow-blue-500/5">
                            {categories.map((cat) => (
                                <button
                                    key={cat.id}
                                    onClick={() => setActiveTab(cat.id)}
                                    className={`px-10 py-4 rounded-[2rem] text-[10px] font-black uppercase tracking-[0.3em] transition-all duration-700 ${activeTab === cat.id
                                            ? "bg-[#0A1D37] text-white shadow-2xl shadow-navy/20 scale-105"
                                            : "text-neutral-400 hover:text-[#0A1D37] hover:bg-white"
                                        }`}
                                >
                                    {cat.label}
                                </button>
                            ))}
                        </div>
                    </motion.div>
                </div>

                {loading ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-12">
                        {[1, 2, 3, 4].map((i) => (
                            <div key={i} className="aspect-[4/5] bg-neutral-50 rounded-[2.5rem] animate-pulse" />
                        ))}
                    </div>
                ) : filteredItems.length === 0 ? (
                    <div className="py-40 text-center">
                        <ShoppingBag className="w-12 h-12 text-blue-100 mx-auto mb-6" />
                        <h3 className="text-xl font-bold text-secondary mb-2">No items found</h3>
                        <button onClick={() => { setSearchQuery(""); setActiveTab("all"); }} className="text-blue-600 text-xs font-bold uppercase tracking-widest border-b border-blue-600 pb-1">Reset Search</button>
                    </div>
                ) : (
                    <motion.div
                        layout
                        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-10 gap-y-20"
                    >
                        <AnimatePresence mode='popLayout'>
                            {filteredItems.map((item, index) => (
                                <ItemCard
                                    key={item.id || index}
                                    item={item}
                                    isTemplate={item.type === undefined}
                                />
                            ))}
                        </AnimatePresence>
                    </motion.div>
                )}

                {/* Home Page CTA to go to Full Products Page */}
                <div className="mt-24 text-center">
                    <Link
                        href="/products"
                        className="inline-flex items-center gap-6 text-[11px] font-black uppercase tracking-[0.5em] text-secondary group py-2"
                    >
                        Explore the Mastery Archive
                        <div className="w-12 h-12 rounded-full border border-neutral-100 flex items-center justify-center group-hover:bg-blue-600 group-hover:border-blue-600 transition-all duration-500">
                            <ArrowRight className="w-4 h-4 group-hover:text-white transition-all transform group-hover:translate-x-1" />
                        </div>
                    </Link>
                </div>
            </div>
        </section>
    );
};

const ItemCard = ({ item, isTemplate }) => {
    const firstSize = item.sizes && item.sizes.length > 0 ? item.sizes[0] : null;
    const price = isTemplate ? item.price : firstSize?.price;
    const href = isTemplate
        ? `https://wa.me/919629674444?text=${encodeURIComponent(`Hi PhotoParkk, I'm interested: *${item.title}*`)}`
        : `/shop/${item.type}/${(item.shape || 'portrait').toLowerCase()}`;

    const Tag = isTemplate ? 'a' : Link;
    const extraProps = isTemplate ? { target: "_blank", rel: "noopener noreferrer" } : {};

    return (
        <motion.div
            layout
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6 }}
            className="group"
        >
            <Tag href={href} {...extraProps} className="block relative">
                {/* Visual Shell */}
                <div className="relative aspect-[4/5] overflow-hidden rounded-[2.5rem] bg-white border border-neutral-100 shadow-[0_10px_30px_rgba(0,0,0,0.02)] transition-all duration-1000 group-hover:shadow-[0_40px_80px_rgba(0,102,255,0.08)] group-hover:-translate-y-4 group-hover:border-blue-100">
                    <img
                        src={item.image || "/api/placeholder/800/1000"}
                        alt={item.title}
                        className="w-full h-full object-cover transition-transform duration-[2s] ease-out group-hover:scale-105"
                    />

                    {/* Smooth Blue Tint Overlay */}
                    <div className="absolute inset-0 bg-blue-900/0 group-hover:bg-blue-950/20 transition-colors duration-700 z-10" />

                    {/* Bottom Dynamic Pill */}
                    <div className="absolute inset-x-0 bottom-10 flex justify-center translate-y-8 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-700 ease-out z-20">
                        <div className="px-8 py-3.5 bg-white rounded-full flex items-center gap-3 text-blue-600 text-[11px] font-bold uppercase tracking-widest shadow-2xl">
                            {isTemplate ? "Reserve" : "Configure"}
                            <ArrowRight className="w-4 h-4" />
                        </div>
                    </div>
                </div>

                {/* Refined Detail Architecture */}
                <div className="mt-8 px-1">
                    <div className="flex justify-between items-baseline gap-4 mb-3">
                        <h3 className="text-lg md:text-xl font-bold text-secondary tracking-tight group-hover:text-blue-600 transition-colors duration-500 truncate">
                            {item.title}
                        </h3>
                        <p className="text-lg font-bold text-secondary tracking-tight shrink-0">
                            ₹{price?.toLocaleString() || '---'}
                        </p>
                    </div>

                    <div className="flex items-center justify-between border-t border-neutral-50 pt-4">
                        <div className="flex items-center gap-2">
                            <span className="text-[9px] font-bold text-blue-600/60 uppercase tracking-widest">
                                {isTemplate ? 'Exclusive' : item.type} / {item.shape || 'Series'}
                            </span>
                        </div>
                        <div className="w-8 h-8 rounded-full bg-blue-50 opacity-0 group-hover:opacity-100 transition-all flex items-center justify-center">
                            <ChevronRight className="w-4 h-4 text-blue-600" />
                        </div>
                    </div>
                </div>
            </Tag>
        </motion.div>
    );
};

export default ProductListing;
