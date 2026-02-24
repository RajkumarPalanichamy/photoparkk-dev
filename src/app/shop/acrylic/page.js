'use client';

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { ArrowRight, Check, Sparkles, Layers, ShieldCheck, Clock, Box } from "lucide-react";
import axiosInstance from '@/utils/axiosInstance';

const guarantees = [
    { icon: <ShieldCheck className="w-5 h-5" />, text: "Crystal-clear UV-grade acrylic" },
    { icon: <Sparkles className="w-5 h-5" />, text: "Vibrant HD print quality" },
    { icon: <Box className="w-5 h-5" />, text: "Ready to hang hardware" },
    { icon: <Clock className="w-5 h-5" />, text: "Ships in 4–6 business days" },
];

export default function AcrylicShop() {
    const router = useRouter();
    const [shapeData, setShapeData] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                setLoading(true);
                const res = await axiosInstance.get('frames/acrylic');
                // Format the API response to match the existing shapeData structure
                const formattedData = (res.data || []).map(product => ({
                    name: product.title || "Acrylic Shape",
                    tag: product.shape === "portrait" ? "Most Popular" : "Classic",
                    subtitle: product.shape ? `${product.shape} Shape` : "Standard Ratio",
                    description: product.description || "Premium acrylic photo frame.",
                    route: `/shop/acrylic/${(product.shape || 'portrait').toLowerCase()}/edit`,
                    img: product.image || "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?w=700&q=90&auto=format&fit=crop",
                    shape: (product.shape || 'portrait').toLowerCase(),
                }));
                setShapeData(formattedData);
            } catch (error) {
                console.error("Failed to fetch acrylic frames:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchProducts();
    }, []);

    return (
        <div className="bg-[#F0F4F8] font-sans selection:bg-blue-600/10 selection:text-blue-600">
            {/* ═══ LUXURY HERO SECTION ═══ */}
            <section className="relative min-h-[85vh] flex items-center overflow-hidden bg-slate-900 pt-[100px]">
                {/* Immersive Background */}
                <img
                    src="/assets/frontend_assets/CanvasCustomized/AcrylicBanner.jpg"
                    alt="Acrylic Backdrop"
                    className="absolute inset-0 w-full h-full object-cover opacity-30 mix-blend-overlay"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-slate-900 via-slate-900/80 to-transparent z-10" />

                <div className="max-w-7xl mx-auto px-6 relative z-20 w-full grid md:grid-cols-2 gap-16 items-center py-20">
                    <div className="space-y-8 animate-in fade-in slide-in-from-left-10 duration-1000">
                        <div className="flex items-center gap-3">
                            <div className="h-[1px] w-12 bg-blue-500" />
                            <span className="text-[11px] font-black text-blue-400 uppercase tracking-[0.4em]">Elite Glass Architecture</span>
                        </div>
                        <h1 className="text-6xl md:text-8xl font-extrabold text-white tracking-tighter leading-[0.9] mb-4">
                            Crystal <br /> <span className="text-blue-500 italic font-medium">Boutique</span>
                        </h1>
                        <p className="text-slate-400 text-lg font-medium max-w-md leading-relaxed">
                            Experience museum-grade visual depth. Our UV-curable acrylic technology transforms frames into luminous 3D masterpieces.
                        </p>
                        <button
                            onClick={() => document.getElementById('shapes')?.scrollIntoView({ behavior: 'smooth' })}
                            className="bg-blue-600 hover:bg-blue-700 text-white px-10 py-5 rounded-2xl font-black text-xs uppercase tracking-[0.2em] transition-all shadow-2xl shadow-blue-500/40 flex items-center gap-4 group"
                        >
                            Select Your Format
                            <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                        </button>
                    </div>

                    <div className="hidden md:flex flex-col items-end space-y-4">
                        <div className="bg-white/10 backdrop-blur-xl border border-white/10 p-8 rounded-[40px] max-w-sm">
                            <span className="text-[10px] font-black text-blue-400 uppercase tracking-widest block mb-6">Technical Specifications</span>
                            <ul className="space-y-4">
                                {[
                                    "Optical-grade perspex core",
                                    "Edge-to-edge diamond polish",
                                    "Advanced light refraction tech",
                                    "Life-long color permanence"
                                ].map((t, i) => (
                                    <li key={i} className="flex items-center gap-3 text-slate-300 text-sm font-medium">
                                        <div className="w-1.5 h-1.5 bg-blue-500 rounded-full shadow-[0_0_10px_rgba(59,130,246,0.8)]" />
                                        {t}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>
            </section>

            {/* ═══ PROCESS STEPS ═══ */}
            <div className="bg-white border border-blue-100 relative z-30 -mt-10 mx-6 rounded-[32px] shadow-2xl shadow-blue-900/8">
                <div className="max-w-7xl mx-auto px-10 flex flex-wrap md:flex-nowrap divide-x divide-slate-50">
                    {[
                        { n: "01", label: "Format", sub: "Select Shape", active: true },
                        { n: "02", label: "Studio", sub: "Upload Media", active: false },
                        { n: "03", label: "Protocol", sub: "Secure Order", active: false },
                    ].map((s, i) => (
                        <div key={i} className="flex-1 py-8 px-8 flex items-center gap-5">
                            <span className={`text-2xl font-black ${s.active ? 'text-blue-600' : 'text-slate-200'}`}>{s.n}</span>
                            <div>
                                <div className={`text-[10px] font-black uppercase tracking-widest ${s.active ? 'text-slate-900' : 'text-slate-400'}`}>{s.label}</div>
                                <div className="text-xs text-slate-400 font-medium">{s.sub}</div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* ═══ SHAPE SELECTION ═══ */}
            <section id="shapes" className="py-24 max-w-7xl mx-auto px-6">
                <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-8">
                    <div className="space-y-2">
                        <span className="text-[11px] font-black text-blue-600 uppercase tracking-[0.3em]">Selection Interface</span>
                        <h2 className="text-4xl md:text-5xl font-black text-slate-900 tracking-tighter">
                            Architectural <span className="text-slate-300 font-medium">Shapes</span>
                        </h2>
                    </div>
                    <div className="h-[1px] flex-1 bg-slate-100 mx-12 hidden lg:block" />
                    <p className="text-slate-400 font-medium text-sm max-w-xs text-right leading-relaxed">
                        Precision engineering applied to every silhouette. Choose the geometry that defines your space.
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
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                        {shapeData.map((shape, idx) => (
                            <ShapeCard
                                key={idx}
                                shape={shape}
                                onClick={() => router.push(shape.route)}
                            />
                        ))}
                    </div>
                )}
            </section>

            {/* ═══ LUXURY GUARANTEE ═══ */}
            <div className="relative bg-slate-900 pt-24 pb-28 px-6 overflow-hidden">
                {/* Background glow effects */}
                <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />
                <div className="absolute bottom-0 right-1/4 w-64 h-64 bg-blue-500/8 rounded-full blur-2xl pointer-events-none" />

                <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center justify-between gap-16 relative z-10">
                    {/* Left — Heading */}
                    <div className="space-y-5 lg:max-w-xs">
                        <p className="text-[11px] font-black text-blue-400 uppercase tracking-[0.4em]">The Photoparkk Vow</p>
                        <h2 className="text-5xl font-black text-white leading-[0.95] tracking-tighter">
                            Executive<br />Grade<br />
                            <span className="italic text-blue-500 font-extrabold">Assurance</span>
                        </h2>
                        <p className="text-slate-400 text-sm leading-relaxed">
                            Museum-grade precision in every silhouette. Our commitment to architectural clarity and optical brilliance.
                        </p>
                    </div>

                    {/* Right — Cards */}
                    <div className="grid grid-cols-2 gap-4 w-full lg:flex-1 lg:max-w-xl">
                        {guarantees.map((g, i) => (
                            <div
                                key={i}
                                className="flex items-center gap-4 p-5 bg-slate-800/60 border border-slate-700/60 rounded-2xl backdrop-blur-sm hover:border-blue-500/40 hover:bg-slate-800 transition-all duration-300 group"
                            >
                                <div className="w-11 h-11 shrink-0 bg-blue-600/20 border border-blue-500/30 rounded-xl flex items-center justify-center text-blue-400 group-hover:bg-blue-600 group-hover:text-white group-hover:border-blue-600 transition-all duration-300">
                                    {g.icon}
                                </div>
                                <div>
                                    <p className="text-[9px] font-black text-blue-500 uppercase tracking-[0.2em] mb-1">Premium Standard</p>
                                    <p className="text-[11px] font-black text-white uppercase tracking-widest leading-snug">{g.text}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}

function ShapeCard({ shape, onClick }) {
    const [hovered, setHovered] = useState(false);

    return (
        <div
            onClick={onClick}
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
            className="group relative bg-white rounded-2xl border border-blue-100 overflow-hidden cursor-pointer transition-all duration-500 shadow-[0_4px_20px_rgba(37,99,235,0.06)] hover:shadow-[0_16px_48px_rgba(37,99,235,0.14)] hover:-translate-y-1 hover:border-blue-200"
        >
            {/* Gloss Area */}
            <div className="relative aspect-[4/3] bg-blue-50/40 flex items-center justify-center p-8 overflow-hidden">
                {/* Product Tag */}
                <div className="absolute top-6 left-6 z-20">
                    <span className="bg-white/80 backdrop-blur-xl px-4 py-2 rounded-2xl text-[9px] font-black text-blue-600 uppercase tracking-[0.2em] shadow-xl border border-white/50">
                        {shape.tag}
                    </span>
                </div>

                {/* Refined Image Base */}
                <div className="relative z-10 transition-all duration-1000 group-hover:scale-110 drop-shadow-[0_20px_40px_rgba(0,0,0,0.2)]">
                    <ShapeImageClip shape={shape} hovered={hovered} />
                    {/* Realistic Gloss Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-tr from-white/20 via-white/5 to-transparent pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                </div>
            </div>

            {/* Info Body */}
            <div className="p-8 space-y-6">
                <div className="flex items-center justify-between">
                    <h3 className="text-2xl font-bold text-slate-900 tracking-tight">{shape.name}</h3>
                    <span className="text-[10px] font-black text-slate-300 border border-slate-100 px-3 py-1 rounded-full uppercase tracking-widest">
                        {shape.subtitle}
                    </span>
                </div>
                <p className="text-slate-400 text-sm leading-relaxed font-medium line-clamp-2">
                    {shape.description}
                </p>

                <div className="pt-6 border-t border-blue-50 flex items-center justify-between">
                    <span className="text-[10px] font-black text-blue-600 uppercase tracking-[0.2em] opacity-0 group-hover:opacity-100 transition-all -translate-x-4 group-hover:translate-x-0">Enter Studio</span>
                    <div className="w-12 h-12 bg-blue-50 border border-blue-100 rounded-2xl flex items-center justify-center text-blue-400 group-hover:bg-blue-600 group-hover:border-blue-600 group-hover:text-white transition-all duration-500">
                        <ArrowRight size={18} className="transition-transform group-hover:translate-x-0.5" />
                    </div>
                </div>
            </div>
        </div>
    );
}

function ShapeImageClip({ shape, hovered }) {
    const { name, img } = shape;

    const getShapeStyles = () => {
        switch (name) {
            case "Portrait": return { width: "110px", height: "150px", borderRadius: "8px" };
            case "Landscape": return { width: "160px", height: "120px", borderRadius: "8px" };
            case "Square": return { width: "135px", height: "135px", borderRadius: "8px" };
            case "Round": return { width: "140px", height: "140px", borderRadius: "50%" };
            case "Love Heart": return { width: "140px", height: "140px" };
            case "Hexagon": return { width: "140px", height: "140px" };
            default: return { width: "130px", height: "130px", borderRadius: "8px" };
        }
    };

    const containerStyle = {
        ...getShapeStyles(),
        position: "relative",
        overflow: "hidden",
        boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.4)",
        border: "1px solid rgba(255,255,255,0.2)"
    };

    if (name === "Love Heart") {
        return (
            <div style={{ position: "relative", width: "140px", height: "140px" }}>
                <svg width="0" height="0" style={{ position: "absolute" }}>
                    <defs>
                        <clipPath id="heartClip" clipPathUnits="objectBoundingBox">
                            <path d="M0.5,0.9 C0.1,0.68,0.01,0.46,0.01,0.3 C0.01,0.155,0.12,0.04,0.265,0.04 C0.346,0.04,0.42,0.08,0.47,0.145 L0.5,0.18 L0.53,0.145 C0.58,0.08,0.654,0.04,0.735,0.04 C0.88,0.04,0.99,0.155,0.99,0.3 C0.99,0.46,0.9,0.68,0.5,0.9 Z" />
                        </clipPath>
                    </defs>
                </svg>
                <div style={{ ...containerStyle, clipPath: "url(#heartClip)" }}>
                    <img src={img} alt={name} className="w-full h-full object-cover" />
                </div>
            </div>
        );
    }

    if (name === "Hexagon") {
        return (
            <div style={{ ...containerStyle, clipPath: "polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)" }}>
                <img src={img} alt={name} className="w-full h-full object-cover" />
            </div>
        );
    }

    return (
        <div style={containerStyle}>
            <img src={img} alt={name} className="w-full h-full object-cover" />
        </div>
    );
}
