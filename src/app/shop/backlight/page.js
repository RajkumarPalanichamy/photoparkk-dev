'use client';

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { ArrowRight, Check, Sun, Zap, Lightbulb, ShieldCheck, Sparkles, Clock, Layers } from "lucide-react";

import axiosInstance from '@/utils/axiosInstance';

const guarantees = [
    { icon: <ShieldCheck className="w-4 h-4" />, text: "Uniform LED distribution" },
    { icon: <Sparkles className="w-4 h-4" />, text: "High-Density Fabric Print" },
    { icon: <Zap className="w-4 h-4" />, text: "Smart Power Management" },
    { icon: <Clock className="w-4 h-4" />, text: "Ships in 4–6 business days" },
];

const BacklightShop = () => {
    const router = useRouter();
    const [shapeData, setShapeData] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                setLoading(true);
                const res = await axiosInstance.get('frames/backlight');
                // Format the API response to match the existing shapeData structure
                const formattedData = (res.data || []).map(product => ({
                    name: product.title || "Backlight Shape",
                    tag: product.shape === "portrait" ? "Most Popular" : "Classic",
                    subtitle: product.shape ? `${product.shape} Shape` : "Standard Ratio",
                    description: product.description || "Premium edge-lit LED frame.",
                    route: `/shop/backlight/${(product.shape || 'portrait').toLowerCase()}/size`,
                    img: product.image || "/assets/frontend_assets/BacklightPhotoFrames/BacklightPortrait.jpeg",
                    shape: (product.shape || 'portrait').toLowerCase(),
                }));
                setShapeData(formattedData);
            } catch (error) {
                console.error("Failed to fetch backlight frames:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchProducts();
    }, []);

    return (
        <div className="bg-[#F0F4F8] font-sans selection:bg-blue-600/10 selection:text-blue-600">
            {/* ═══ CINEMATIC HERO SECTION ═══ */}
            <section className="relative min-h-[90vh] flex items-center overflow-hidden bg-slate-900 pt-[100px]">
                {/* Immersive Background */}
                <img
                    src="/assets/frontend_assets/BacklightPhotoFrames/BacklightBanner.jpeg"
                    alt="Backlight Backdrop"
                    className="absolute inset-0 w-full h-full object-cover opacity-40 mix-blend-screen"
                />

                {/* Dynamic Lighting Overlays */}
                <div className="absolute inset-0 bg-gradient-to-r from-slate-900 via-slate-900/80 to-transparent z-10" />
                <div className="absolute top-1/4 right-1/4 w-[500px] h-[500px] bg-blue-500/10 rounded-full blur-[120px] animate-pulse pointer-events-none" />

                <div className="max-w-7xl mx-auto px-6 relative z-20 w-full grid md:grid-cols-2 gap-16 items-center py-20">
                    <div className="space-y-10 animate-in fade-in slide-in-from-left-10 duration-1000">
                        <div className="flex items-center gap-3">
                            <div className="h-[1px] w-12 bg-blue-500" />
                            <span className="text-[11px] font-black text-blue-400 uppercase tracking-[0.4em]">The Illuminated Series</span>
                        </div>

                        <div className="space-y-4">
                            <h1 className="text-6xl md:text-8xl font-black text-white tracking-tighter leading-[0.85]">
                                Capturing <br /> <span className="text-blue-500 italic font-medium">The Glow</span>
                            </h1>
                        </div>

                        <p className="text-slate-400 text-lg font-medium max-w-md leading-relaxed border-l-2 border-blue-500/30 pl-6">
                            Beyond standard prints. Our edge-lit LED technology breathes life into your photos, creating a cinematic focal point that illuminates your space.
                        </p>

                        <button
                            onClick={() => document.getElementById('shapes')?.scrollIntoView({ behavior: 'smooth' })}
                            className="bg-blue-600 hover:bg-blue-700 text-white px-12 py-6 rounded-2xl font-black text-xs uppercase tracking-[0.2em] transition-all shadow-2xl shadow-blue-500/40 flex items-center gap-4 group"
                        >
                            Experience the Light
                            <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                        </button>
                    </div>

                    <div className="hidden md:flex flex-col items-end space-y-6">
                        <div className="bg-white/5 backdrop-blur-3xl border border-white/10 p-10 rounded-[48px] max-w-sm shadow-2xl relative overflow-hidden group">
                            <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-transparent pointer-events-none" />
                            <span className="text-[10px] font-black text-blue-400 uppercase tracking-widest block mb-8">Photon Architecture</span>
                            <ul className="space-y-6">
                                {[
                                    { icon: <Sun className="w-5 h-5" />, t: "Edge-lit Diffusion Core" },
                                    { icon: <Zap className="w-5 h-5" />, t: "High-Contrast Backlit Fabric" },
                                    { icon: <Lightbulb className="w-5 h-5" />, t: "50,000hr Archival LEDs" },
                                ].map((item, i) => (
                                    <li key={i} className="flex items-center gap-4 text-slate-300 text-sm font-bold tracking-tight">
                                        <div className="text-blue-400">{item.icon}</div>
                                        {item.t}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>
            </section>

            {/* ═══ PROCESS ARCHITECTURE ═══ */}
            <div className="max-w-7xl mx-auto px-6 relative z-30 -mt-20">
                <div className="bg-white border border-blue-100 rounded-[32px] shadow-2xl shadow-blue-900/8 overflow-hidden">
                    <div className="flex flex-wrap md:flex-nowrap divide-x divide-slate-100">
                        {[
                            { n: "01", label: "Geometry", sub: "Shape Selection", active: true },
                            { n: "02", label: "Content", sub: "Visual Upload", active: false },
                            { n: "03", label: "Output", sub: "Size & Checkout", active: false },
                        ].map((s, i) => (
                            <div key={i} className="flex-1 py-10 px-10 flex items-center gap-6">
                                <span className={`text-3xl font-black ${s.active ? 'text-blue-600' : 'text-slate-200'}`}>{s.n}</span>
                                <div>
                                    <div className={`text-[10px] font-black uppercase tracking-[0.2em] ${s.active ? 'text-slate-900' : 'text-slate-400'}`}>{s.label}</div>
                                    <div className="text-xs text-slate-400 font-medium">{s.sub}</div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* ═══ CATEGORY SELECTOR ═══ */}
            <section id="shapes" className="py-32 max-w-7xl mx-auto px-6">
                <div className="flex flex-col md:flex-row md:items-end justify-between mb-20 gap-10">
                    <div className="space-y-4">
                        <span className="text-[11px] font-black text-blue-600 uppercase tracking-[0.4em]">Shape Engineering</span>
                        <h2 className="text-5xl md:text-6xl font-black text-slate-900 tracking-tighter leading-tight">
                            Define Your <span className="text-slate-300 font-medium">Silhouette</span>
                        </h2>
                    </div>
                    <p className="text-slate-400 font-medium text-sm max-w-xs md:text-right leading-relaxed">
                        Curated aspect ratios designed to maximize visual impact across various architectural spaces.
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

            {/* ═══ THE LIGHTING PROMISE ═══ */}
            <section className="bg-slate-950 py-32 px-6 overflow-hidden relative border-t border-white/5">
                {/* Immersive Background Flares */}
                <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-blue-600/10 rounded-full blur-[160px] -translate-y-1/2 translate-x-1/4 pointer-events-none" />
                <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-indigo-600/10 rounded-full blur-[140px] translate-y-1/2 -translate-x-1/4 pointer-events-none" />

                <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center justify-between gap-16 relative z-10">
                    <div className="space-y-8 text-center lg:text-left">
                        <div className="space-y-4">
                            <h3 className="text-[11px] font-black text-blue-500 uppercase tracking-[0.5em] flex items-center justify-center lg:justify-start gap-3">
                                <div className="w-8 h-[1px] bg-blue-500/50" />
                                Photoparkk Photon Tech
                            </h3>
                            <h2 className="text-white text-5xl md:text-7xl font-black tracking-tighter leading-none">
                                Cinematic <br />
                                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-400 font-medium italic">Luminance</span>
                            </h2>
                        </div>
                        <p className="text-slate-400 text-lg font-medium max-w-sm mx-auto lg:mx-0 leading-relaxed font-sans">
                            A fusion of photographic art and ambient lighting. Engineered to transform your space with a captivating, museum-standard glow.
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
};

/* ───────────────────────── Shape Card ────────────────────────── */
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
            {/* Visual Area */}
            <div className="relative aspect-[4/5] bg-blue-50/40 flex items-center justify-center p-12 overflow-hidden">
                {/* Status Badge */}
                <div className="absolute top-8 left-8 z-30">
                    <span className="bg-white/95 backdrop-blur-sm px-5 py-2.5 rounded-2xl text-[9px] font-black text-blue-600 uppercase tracking-[0.2em] border border-blue-100 shadow-sm">
                        {tag}
                    </span>
                </div>

                {/* The Product Display */}
                <div className="relative z-10 transition-all duration-1000 group-hover:scale-110">
                    {/* Glowing Aura behind frame */}
                    <div className="absolute inset-0 bg-blue-500/20 blur-[60px] opacity-0 group-hover:opacity-100 transition-opacity duration-1000" />

                    <img
                        src={img}
                        alt={name}
                        className={`relative z-20 object-cover shadow-[0_30px_60px_rgba(0,0,0,0.15)] border-2 border-blue-100 rounded-lg transition-all duration-1000 ${shape === 'portrait' ? 'w-[140px] h-[190px]' :
                            shape === 'landscape' ? 'w-[200px] h-[150px]' :
                                'w-[170px] h-[170px]'
                            }`}
                    />

                    {/* Surface Sheen */}
                    <div className="absolute inset-0 z-30 bg-gradient-to-tr from-white/10 via-transparent to-white/5 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
                </div>

                {/* Background Texture */}
                <div className="absolute inset-0 opacity-5 bg-[url('https://www.transparenttextures.com/patterns/dark-matter.png')] pointer-events-none" />
            </div>

            {/* Metadata Body */}
            <div className="p-8 space-y-6 relative z-20">
                <div className="flex items-center justify-between">
                    <h3 className="text-2xl font-bold text-slate-900 tracking-tight">{name}</h3>
                    <span className="text-[10px] font-bold text-blue-600 bg-blue-50 px-4 py-1.5 rounded-full uppercase tracking-widest">
                        {subtitle}
                    </span>
                </div>

                <p className="text-slate-400 text-sm leading-relaxed font-medium">
                    {description}
                </p>

                <div className="pt-6 border-t border-blue-50 flex items-center justify-between">
                    <span className="text-[10px] font-black text-blue-600 uppercase tracking-[0.2em] opacity-0 group-hover:opacity-100 transition-all -translate-x-4 group-hover:translate-x-0">Enter Studio</span>
                    <div className="w-12 h-12 bg-blue-50 border border-blue-100 rounded-2xl flex items-center justify-center text-blue-400 group-hover:bg-blue-600 group-hover:text-white group-hover:border-blue-600 transition-all duration-500">
                        <ArrowRight size={22} className="transition-transform group-hover:translate-x-0.5" />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default BacklightShop;
