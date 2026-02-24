'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, ArrowRight, ShoppingBag } from 'lucide-react';
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
        <section className="py-14 md:py-24 lg:py-32 bg-white font-sans relative">
            {/* Subtle Blue "Shade" Accents */}
            <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-blue-50/40 rounded-full blur-[140px] -mr-64 -mt-32 pointer-events-none" />
            <div className="absolute top-1/2 left-0 w-[500px] h-[500px] bg-indigo-50/20 rounded-full blur-[120px] -ml-40 pointer-events-none" />

            <div className="max-w-7xl mx-auto px-4 md:px-8 relative z-10">
                {/* Centered Header Section */}
                <div className="flex flex-col items-center text-center mb-10 md:mb-24">
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

                        <h2 className="text-6xl md:text-9xl font-black text-[#0A1D37] tracking-tighter mb-10 leading-[0.9] overflow-visible pr-4">
                            Distinctive <br />
                            <span className="bg-gradient-to-r from-[#0A1D37] via-neutral-400 to-[#0A1D37] bg-clip-text text-transparent italic font-light pr-2">Artisan Frames</span>
                        </h2>

                        <p className="text-xl text-neutral-500 font-medium max-w-2xl leading-relaxed mb-16 px-4">
                            Where advanced engineering meets curated elegance. <br className="hidden md:block" /> Discover frames designed to elevate your visual identity.
                        </p>

                        {/* Filter Pills */}
                        <div className="flex flex-wrap justify-center gap-2 sm:gap-3">
                            {categories.map((cat) => (
                                <button
                                    key={cat.id}
                                    onClick={() => setActiveTab(cat.id)}
                                    className={`px-5 py-2.5 rounded-full text-[10px] font-black uppercase tracking-[0.25em] transition-all duration-300 whitespace-nowrap border ${activeTab === cat.id
                                        ? "bg-[#0A1D37] text-white border-[#0A1D37] shadow-lg"
                                        : "bg-transparent text-neutral-400 border-neutral-200 hover:border-blue-300 hover:text-blue-600"
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
                        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8"
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
                        className="inline-flex items-center gap-4 bg-blue-600 text-white px-10 py-4 rounded-full text-[11px] font-black uppercase tracking-[0.3em] shadow-xl shadow-blue-500/20 hover:bg-blue-700 hover:shadow-2xl hover:shadow-blue-500/30 transition-all duration-500 group"
                    >
                        Explore the Mastery Archive
                        <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center group-hover:bg-white/30 transition-all duration-500">
                            <ArrowRight className="w-4 h-4 text-white transform group-hover:translate-x-1 transition-transform" />
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
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.5 }}
            className="group"
        >
            <Tag href={href} {...extraProps} className="block bg-white rounded-2xl overflow-hidden border border-blue-50 shadow-[0_4px_20px_rgba(37,99,235,0.06)] hover:shadow-[0_12px_40px_rgba(37,99,235,0.12)] hover:-translate-y-1 transition-all duration-500">
                {/* Image Section */}
                <div className="relative aspect-[4/5] overflow-hidden bg-blue-50/30">
                    <img
                        src={item.image || "/api/placeholder/800/1000"}
                        alt={item.title}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />

                    {/* Category Badge */}
                    <div className="absolute top-4 left-4 bg-white/95 backdrop-blur-sm px-3.5 py-1.5 rounded-full border border-blue-100 shadow-sm">
                        <span className="text-[9px] font-bold text-blue-600 uppercase tracking-widest">
                            {isTemplate ? 'Exclusive' : item.type}
                        </span>
                    </div>

                    {/* Hover Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-blue-900/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                    {/* Hover CTA */}
                    <div className="absolute bottom-4 inset-x-4 opacity-0 group-hover:opacity-100 translate-y-3 group-hover:translate-y-0 transition-all duration-500">
                        <div className="bg-blue-600 text-white py-3 rounded-xl text-center text-[11px] font-bold uppercase tracking-widest shadow-lg shadow-blue-600/30 flex items-center justify-center gap-2">
                            {isTemplate ? 'Reserve' : 'Configure'} <ArrowRight className="w-3.5 h-3.5" />
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
                            {isTemplate ? 'Exclusive' : item.type} · {item.shape || 'Series'}
                        </span>
                        <ArrowRight className="w-4 h-4 text-blue-300 group-hover:text-blue-600 group-hover:translate-x-1 transition-all duration-300" />
                    </div>
                </div>
            </Tag>
        </motion.div>
    );
};

export default ProductListing;
