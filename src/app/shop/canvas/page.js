'use client';

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { ArrowRight, Check, Hammer, Palette, ShieldCheck, Clock, Box, Layers } from "lucide-react";

import axiosInstance from '@/utils/axiosInstance';
const guarantees = [
    { icon: <ShieldCheck className="w-4 h-4" />, text: "400gsm Premium Cotton" },
    { icon: <Palette className="w-4 h-4" />, text: "Archival-grade UV inks" },
    { icon: <Hammer className="w-4 h-4" />, text: "Kiln-Dried Pine Wood" },
    { icon: <Clock className="w-4 h-4" />, text: "Ships in 4–6 business days" },
];

export default function CanvasShop() {
    const router = useRouter();
    const [shapeData, setShapeData] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                setLoading(true);
                const res = await axiosInstance.get('frames/canvas');
                // Format the API response to match the existing shapeData structure
                const formattedData = (res.data || []).map(product => ({
                    name: product.title || "Canvas Shape",
                    tag: product.shape === "portrait" ? "Most Popular" : "Classic",
                    subtitle: product.shape ? `${product.shape} Shape` : "Standard Ratio",
                    description: product.description || "Museum-quality modern canvas wrap.",
                    route: `/shop/canvas/${(product.shape || 'portrait').toLowerCase()}/size`,
                    img: product.image || "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?w=700&q=90&auto=format&fit=crop",
                    shape: (product.shape || 'portrait').toLowerCase(),
                }));
                setShapeData(formattedData);
            } catch (error) {
                console.error("Failed to fetch canvas frames:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchProducts();
    }, []);

    return (
        <div className="bg-[#F0F4F8] font-sans selection:bg-blue-600/10 selection:text-blue-600">
            {/* ═══ ELEGANT HERO SECTION ═══ */}
            <section className="relative min-h-[85vh] flex items-center overflow-hidden bg-slate-900 pt-[100px]">
                {/* Immersive Background */}
                <img
                    src="/assets/frontend_assets/CanvasCustomized/CanvasBanner.jpeg"
                    alt="Canvas Backdrop"
                    className="absolute inset-0 w-full h-full object-cover opacity-20 filter grayscale contrast-125"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-slate-900 via-slate-900/40 to-transparent z-10" />

                <div className="max-w-7xl mx-auto px-6 relative z-20 w-full grid md:grid-cols-2 gap-16 items-center py-20">
                    <div className="space-y-8 animate-in fade-in slide-in-from-left-10 duration-1000">
                        <div className="flex items-center gap-3">
                            <div className="h-[1px] w-12 bg-blue-500" />
                            <span className="text-[11px] font-black text-blue-400 uppercase tracking-[0.4em]">The Artisan Gallery</span>
                        </div>
                        <h1 className="text-6xl md:text-8xl font-black text-white tracking-tighter leading-[0.9] mb-4">
                            Texture <br /> <span className="text-slate-400 italic font-medium">Redefined</span>
                        </h1>
                        <p className="text-slate-400 text-lg font-medium max-w-md leading-relaxed border-l border-slate-700 pl-6">
                            Museum-quality cotton canvas hand-stretched over kiln-dried solid wood. A timeless bridge between photography and fine art.
                        </p>
                        <button
                            onClick={() => document.getElementById('shapes')?.scrollIntoView({ behavior: 'smooth' })}
                            className="bg-white hover:bg-slate-100 text-slate-900 px-10 py-5 rounded-2xl font-black text-xs uppercase tracking-[0.2em] transition-all shadow-2xl flex items-center gap-4 group"
                        >
                            Explore Formats
                            <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                        </button>
                    </div>

                    <div className="hidden md:flex flex-col items-end space-y-4">
                        <div className="bg-white/5 backdrop-blur-xl border border-white/10 p-10 rounded-[48px] max-w-sm shadow-2xl">
                            <span className="text-[10px] font-black text-blue-400 uppercase tracking-widest block mb-10">Hand-Crafted Details</span>
                            <ul className="space-y-6">
                                {[
                                    { t: "400gsm Natural Cotton", sub: "Weight & Texture" },
                                    { t: "Kiln-Dried Pine", sub: "Solid Foundation" },
                                    { t: "Gallery Wrap Finish", sub: "Architectural Edges" },
                                ].map((item, i) => (
                                    <li key={i} className="space-y-1">
                                        <div className="text-white text-sm font-black tracking-tight">{item.t}</div>
                                        <div className="text-blue-400 text-[10px] uppercase font-bold tracking-widest">{item.sub}</div>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>
            </section>

            {/* ═══ JOURNEY MAP ═══ */}
            <div className="max-w-7xl mx-auto px-6 relative z-30 -mt-10 mb-20">
                <div className="bg-white border border-blue-100 rounded-[32px] shadow-2xl shadow-blue-900/8 overflow-hidden">
                    <div className="flex flex-wrap md:flex-nowrap divide-x divide-slate-100 text-center md:text-left">
                        {[
                            { n: "01", label: "Format", sub: "Shape selection", active: true },
                            { n: "02", label: "Studio", sub: "Upload & Adjust", active: false },
                            { n: "03", label: "Craft", sub: "Handwork & Ship", active: false },
                        ].map((s, i) => (
                            <div key={i} className="flex-1 py-10 px-10 flex flex-col md:flex-row items-center gap-6">
                                <span className={`text-4xl font-black ${s.active ? 'text-slate-900' : 'text-slate-100'}`}>{s.n}</span>
                                <div>
                                    <div className={`text-[10px] font-black uppercase tracking-widest ${s.active ? 'text-blue-600' : 'text-slate-400'}`}>{s.label}</div>
                                    <div className="text-xs text-slate-400 font-medium">{s.sub}</div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* ═══ SHAPE SELECTION ═══ */}
            <section id="shapes" className="py-24 max-w-7xl mx-auto px-6">
                <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-8">
                    <div className="space-y-4">
                        <span className="text-[11px] font-black text-blue-600 uppercase tracking-[0.4em]">Selection Interface</span>
                        <h2 className="text-5xl md:text-6xl font-black text-slate-950 tracking-tighter">
                            Architectural <span className="text-slate-200 font-medium">Shapes</span>
                        </h2>
                    </div>
                    <p className="text-slate-400 font-medium text-sm max-w-xs md:text-right leading-relaxed border-r-2 border-slate-50 pr-6">
                        Curated formats optimized for high-end interior galleries and residential spaces.
                    </p>
                </div>

                {loading ? (
                    <div className="flex flex-col items-center justify-center py-20">
                        <div className="w-12 h-12 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin mb-4"></div>
                        <p className="text-slate-400 font-medium animate-pulse">Initializing Interface...</p>
                    </div>
                ) : shapeData.length === 0 ? (
                    <div className="text-center py-20 bg-white rounded-3xl shadow-sm border border-slate-100 max-w-2xl mx-auto">
                        <p className="text-slate-500 mb-8 max-w-md mx-auto">No products found in this category right now.</p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {shapeData.map((item, i) => (
                            <ShapeCard key={i} data={item} onClick={() => router.push(item.route)} />
                        ))}
                    </div>
                )}
            </section>

            {/* ═══ EXECUTIVE GRADE ASSURANCE ═══ */}
            <section className="bg-slate-950 py-32 px-6 overflow-hidden relative">
                {/* Architectural Background Elements */}
                <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-blue-500/10 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/2 pointer-events-none" />
                <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-blue-600/5 rounded-full blur-[100px] translate-y-1/2 -translate-x-1/2 pointer-events-none" />

                <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center justify-between gap-16 relative z-10">
                    <div className="space-y-8 text-center lg:text-left">
                        <div className="space-y-4">
                            <h3 className="text-[11px] font-black text-blue-500 uppercase tracking-[0.5em] flex items-center justify-center lg:justify-start gap-3">
                                <div className="w-8 h-[1px] bg-blue-500/50" />
                                The Heritage Craft
                            </h3>
                            <h2 className="text-white text-5xl md:text-7xl font-black tracking-tighter leading-none">
                                Artisan Gallery <br />
                                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-400 font-medium italic">Mastery</span>
                            </h2>
                        </div>
                        <p className="text-slate-400 text-lg font-medium max-w-sm mx-auto lg:mx-0 leading-relaxed font-sans">
                            Timeless textures meet modern precision. Every canvas is hand-stretched and archival-treated to preserve your memories for a lifetime.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 w-full lg:w-auto">
                        {guarantees.map((g, i) => (
                            <div key={i} className="flex items-center gap-6 p-8 bg-white/5 backdrop-blur-2xl border border-white/10 rounded-[32px] group hover:bg-white/10 transition-all duration-500 hover:-translate-y-1">
                                <div className="w-16 h-16 bg-blue-600/20 rounded-2xl flex items-center justify-center text-blue-400 group-hover:bg-blue-600 group-hover:text-white transition-all duration-500 shadow-2xl">
                                    {React.cloneElement(g.icon, { size: 24 })}
                                </div>
                                <div className="space-y-1 text-left">
                                    <span className="text-[10px] font-black text-blue-400 uppercase tracking-widest block font-mono">Premium Standard</span>
                                    <span className="text-sm font-black text-white uppercase tracking-widest leading-tight">{g.text}</span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    );
}

function ShapeCard({ data, onClick }) {
    const [hovered, setHovered] = useState(false);
    const { name, tag, subtitle, description, img, shape } = data;

    return (
        <div
            onClick={onClick}
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
            className="group relative bg-white rounded-2xl border border-blue-100 overflow-hidden cursor-pointer transition-all duration-500 shadow-[0_4px_20px_rgba(37,99,235,0.06)] hover:shadow-[0_16px_48px_rgba(37,99,235,0.14)] hover:-translate-y-1 hover:border-blue-200"
        >
            {/* Texture Area */}
            <div className="relative aspect-[4/5] bg-blue-50/40 flex items-center justify-center p-12 overflow-hidden">
                <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/canvas-orange.png')] pointer-events-none" />

                {/* Premium Tag */}
                <div className="absolute top-8 left-8 z-30">
                    <span className="bg-white/80 backdrop-blur-xl px-5 py-2.5 rounded-2xl text-[9px] font-black text-slate-900 uppercase tracking-[0.3em] shadow-sm border border-white/50">
                        {tag}
                    </span>
                </div>

                {/* The Product Display */}
                <div className="relative z-10 transition-all duration-1000 group-hover:scale-110 drop-shadow-[0_30px_50px_rgba(0,0,0,0.15)]">
                    <img
                        src={img}
                        alt={name}
                        className={`relative z-20 object-cover rounded-sm transition-all duration-1000 ${shape === 'portrait' ? 'w-[210px] h-[280px]' :
                            shape === 'landscape' ? 'w-[280px] h-[210px]' :
                                'w-[240px] h-[240px]'
                            }`}
                    />

                    {/* Realistic Depth Shadow */}
                    <div className="absolute -bottom-4 -right-4 w-full h-full bg-black/10 blur-2xl group-hover:bg-black/20 transition-all" />
                </div>
            </div>

            {/* Content Body */}
            <div className="p-10 space-y-6">
                <div className="flex items-center justify-between">
                    <h3 className="text-3xl font-black text-slate-950 tracking-tighter">{name}</h3>
                    <span className="text-[10px] font-bold text-blue-600 bg-blue-50 px-4 py-1.5 rounded-full uppercase tracking-widest">
                        {subtitle}
                    </span>
                </div>

                <p className="text-slate-400 text-sm leading-relaxed font-bold tracking-tight">
                    {description}
                </p>

                <div className="pt-8 border-t border-blue-50 flex items-center justify-between">
                    <span className="text-[10px] font-black text-slate-900 uppercase tracking-[0.3em] opacity-0 group-hover:opacity-100 transition-all -translate-x-4 group-hover:translate-x-0">Enter Studio</span>
                    <div className="w-14 h-14 bg-blue-50 border border-blue-100 rounded-[24px] flex items-center justify-center text-blue-400 group-hover:bg-blue-600 group-hover:text-white group-hover:border-blue-600 transition-all duration-500">
                        <ArrowRight size={22} className="transition-transform group-hover:translate-x-0.5" />
                    </div>
                </div>
            </div>
        </div>
    );
}
