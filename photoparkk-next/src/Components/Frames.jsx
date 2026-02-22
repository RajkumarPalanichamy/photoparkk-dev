'use client';

import React, { useEffect, useState } from "react";
import Link from "next/link";
import axiosInstance from "@/utils/axiosInstance";
import {
    Package,
    Search,
    Sparkles,
    ArrowRight,
    Layers,
    Sun,
    ChevronRight,
    ShoppingBag,
    MessageCircle
} from "lucide-react";

/**
 * Frames Component
 * A premium, high-performance product listing for various frame types.
 * Features a "Midnight Azure" theme with deep slate backgrounds and cyan glows.
 */
const Frames = () => {
    const [products, setProducts] = useState([]);
    const [templates, setTemplates] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState("");
    const [activeTab, setActiveTab] = useState("all");

    useEffect(() => {
        const fetchData = async () => {
            try {
                // Fetching all frame types to display in the inventory
                const types = ['acrylic', 'canvas', 'backlight'];
                const productPromises = types.map(async (type) => {
                    const res = await axiosInstance.get(`frames/${type}`);
                    return res.data.map(item => ({ ...item, type }));
                });

                // Fetching WhatsApp templates
                const templatePromise = axiosInstance.get('customizer-templates');

                const [productResults, templateRes] = await Promise.all([
                    Promise.all(productPromises),
                    templatePromise
                ]);

                const mergedProducts = productResults.flat();
                setProducts(mergedProducts);
                setTemplates(templateRes.data);
                setLoading(false);
            } catch (error) {
                console.error("Failed to fetch data:", error);
                setProducts([]);
                setTemplates([]);
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    const filteredProducts = products.filter((product) => {
        const matchesSearch = product.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
            product.type?.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesTab = activeTab === "all" || product.type === activeTab;
        return matchesSearch && matchesTab;
    });

    const filteredTemplates = templates.filter((template) => {
        const matchesSearch = template.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
            template.description?.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesTab = activeTab === "all" || activeTab === "templates";
        return matchesSearch && matchesTab;
    });

    return (
        <section className="py-32 bg-[#020617] px-4 font-sans selection:bg-blue-500/30 selection:text-white relative overflow-hidden min-h-screen">
            {/* Architectural Grid Pattern */}
            <div className="absolute inset-0 opacity-[0.03] pointer-events-none"
                style={{ backgroundImage: `radial-gradient(#3b82f6 1px, transparent 1px)`, backgroundSize: '40px 40px' }} />

            {/* Atmospheric Depth Volumetrics */}
            <div className="absolute -top-1/4 -right-1/4 w-[800px] h-[800px] bg-blue-600/5 blur-[150px] rounded-full animate-pulse" />
            <div className="absolute -bottom-1/4 -left-1/4 w-[600px] h-[600px] bg-indigo-900/10 blur-[130px] rounded-full" />

            <div className="max-w-7xl mx-auto relative z-10">
                {/* ═══ CYBER HUD HEADER ═══ */}
                <div className="relative mb-28">
                    <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-12 mb-20">
                        <div className="max-w-3xl">
                            <div className="flex items-center gap-4 mb-8">
                                <div className="flex gap-1">
                                    <div className="w-1.5 h-1.5 bg-blue-500 rounded-full animate-pulse" />
                                    <div className="w-1.5 h-1.5 bg-blue-500/40 rounded-full" />
                                    <div className="w-1.5 h-1.5 bg-blue-500/10 rounded-full" />
                                </div>
                                <span className="text-[10px] font-black text-blue-500 uppercase tracking-[0.6em] bg-blue-500/5 px-4 py-1.5 rounded-full border border-blue-500/20">Archive // Gallery v2.0</span>
                            </div>
                            <h2 className="text-5xl md:text-8xl font-black text-white tracking-tighter leading-[0.85] mb-10">
                                <span className="text-blue-500 drop-shadow-[0_0_30px_rgba(59,130,246,0.2)]">Premium</span> <br />
                                Collections
                            </h2>
                            <p className="text-slate-500 font-bold text-xl leading-relaxed max-w-xl border-l-2 border-blue-500/20 pl-8">
                                Engineering visual excellence. Explore our high-performance frames mapped to your specific dimensions.
                            </p>
                        </div>

                        {/* HUD Meta Search */}
                        <div className="flex flex-col gap-6 w-full lg:w-auto">
                            <div className="relative group">
                                <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-cyan-500 rounded-2xl opacity-0 group-hover:opacity-10 transition-opacity blur" />
                                <Search className="absolute left-6 top-1/2 -translate-y-1/2 w-4 h-4 text-blue-500" />
                                <input
                                    type="text"
                                    placeholder="SCAN FREQUENCY..."
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    className="w-full lg:w-[380px] pl-16 pr-8 py-5 bg-slate-900/50 backdrop-blur-xl border border-white/5 rounded-2xl outline-none focus:border-blue-500/50 transition-all text-white font-black tracking-widest text-xs placeholder:text-slate-700"
                                />
                            </div>
                        </div>
                    </div>

                    {/* Meta Tabs */}
                    <div className="flex items-center gap-4 overflow-x-auto pb-6 no-scrollbar">
                        {["all", "acrylic", "canvas", "backlight", "templates"].map((tab) => (
                            <button
                                key={tab}
                                onClick={() => setActiveTab(tab)}
                                className={`px-10 py-4 rounded-xl text-[10px] font-black uppercase tracking-[0.4em] transition-all border ${activeTab === tab
                                    ? "bg-blue-600 text-white border-blue-400 shadow-[0_0_40px_rgba(37,99,235,0.25)] -translate-y-1"
                                    : "bg-white/5 text-slate-500 border-white/5 hover:border-blue-500/40 hover:text-blue-400"
                                    }`}
                            >
                                [{tab}]
                            </button>
                        ))}
                    </div>
                </div>

                {loading ? (
                    <div className="flex flex-col justify-center items-center h-[50vh] gap-10">
                        <div className="w-32 h-[1px] bg-white/5 relative overflow-hidden">
                            <div className="absolute inset-0 bg-blue-500 w-full translate-x-[-100%] animate-[shimmer_1.5s_infinite]" />
                        </div>
                        <p className="text-blue-500 font-black uppercase tracking-[0.8em] text-[10px]">Retrieving Database</p>
                    </div>
                ) : (filteredProducts.length === 0 && filteredTemplates.length === 0) ? (
                    <div className="py-32 text-center">
                        <div className="inline-block p-10 bg-red-500/5 border border-red-500/10 rounded-full mb-10">
                            <Package className="w-12 h-12 text-red-500/40" />
                        </div>
                        <h3 className="text-2xl font-black text-white mb-4 uppercase tracking-[0.2em]">Zero Matches</h3>
                        <p className="text-slate-600 font-bold mb-12 italic">System parameters returned null.</p>
                        <button
                            onClick={() => { setSearchQuery(""); setActiveTab("all"); }}
                            className="text-blue-500 font-black text-[10px] uppercase tracking-[0.5em] border border-blue-500/20 px-10 py-4 rounded-full hover:bg-blue-500 hover:text-white transition-all shadow-xl shadow-blue-500/10"
                        >
                            Re-initialize Scan
                        </button>
                    </div>
                ) : (
                    <>
                        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-16 gap-y-32">
                            {/* Templates Rendering */}
                            {filteredTemplates.map((template, index) => {
                                const whatsappUrl = `https://wa.me/919629674444?text=${encodeURIComponent(`Hi PhotoParkk, I'm interested in the template: *${template.title}*.\n\nImage: ${template.image}\n\nPrice: ₹${template.price || 'N/A'}`)}`;

                                return (
                                    <a
                                        key={template.id || `temp-${index}`}
                                        href={whatsappUrl}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="group relative"
                                    >
                                        <div className="absolute inset-x-8 -bottom-10 h-20 bg-green-600/10 blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                                        <div className="relative aspect-square md:aspect-[4/5] bg-slate-900 border border-white/5 rounded-[2rem] overflow-hidden transition-all duration-1000 group-hover:border-green-500/50 group-hover:shadow-[0_40px_100px_rgba(0,0,0,0.6)] group-hover:-translate-y-8">
                                            <div className="absolute top-8 left-8 right-8 z-20 flex justify-between items-start">
                                                <div className="bg-black/60 backdrop-blur-md border border-white/10 px-4 py-2 rounded-lg flex items-center gap-3">
                                                    <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
                                                    <span className="text-[9px] font-black text-white/80 uppercase tracking-[0.3em]">Direct Order</span>
                                                </div>
                                                <div className="w-10 h-10 bg-white/5 backdrop-blur-md border border-white/10 rounded-lg flex items-center justify-center text-green-400">
                                                    <ShoppingBag className="w-4 h-4" />
                                                </div>
                                            </div>
                                            <img src={template.image} alt={template.title} className="w-full h-full object-cover transition-all duration-[2000ms] group-hover:scale-110 opacity-70 group-hover:opacity-100" />
                                            <div className="absolute inset-x-0 bottom-0 z-30 p-10 bg-gradient-to-t from-slate-950 via-slate-950/80 to-transparent">
                                                <div className="flex flex-col gap-6">
                                                    <div className="flex items-center gap-3 opacity-0 group-hover:opacity-100 transition-all duration-700 translate-y-4 group-hover:translate-y-0">
                                                        <div className="h-[2px] w-8 bg-green-500" />
                                                        <span className="text-[10px] font-black text-white uppercase tracking-[0.4em]">Order on WhatsApp</span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="mt-[-60px] relative z-40 mx-8 p-10 bg-[#0f172a]/95 backdrop-blur-2xl border border-white/10 rounded-[2.5rem] shadow-2xl transition-all duration-700 group-hover:border-green-500/30 group-hover:translate-y-3">
                                            <div className="flex items-center gap-3 mb-6">
                                                <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest leading-none border-b border-white/5 pb-1">Ready Theme</span>
                                            </div>
                                            <h3 className="text-2xl font-black text-white mb-2 tracking-tighter leading-tight group-hover:text-green-400 transition-colors duration-500">{template.title}</h3>
                                            <p className="text-slate-500 text-xs font-bold mb-8 line-clamp-2 uppercase tracking-wider">{template.description}</p>
                                            <div className="flex items-end justify-between">
                                                <div className="flex flex-col">
                                                    <span className="text-[10px] font-black text-green-500/40 uppercase tracking-[0.4em] mb-3">Unit Cost</span>
                                                    <div className="flex items-baseline gap-2">
                                                        <span className="text-4xl font-black text-white tracking-tighter">₹{template.price?.toLocaleString() || "---"}</span>
                                                        <span className="text-[11px] font-black text-slate-600 uppercase">INR</span>
                                                    </div>
                                                </div>
                                                <div className="w-16 h-16 bg-white/5 border border-white/10 rounded-2xl flex items-center justify-center text-white group-hover:bg-green-600 group-hover:border-green-600 transition-all duration-500 shadow-xl">
                                                    <MessageCircle className="w-7 h-7" />
                                                </div>
                                            </div>
                                        </div>
                                    </a>
                                );
                            })}

                            {/* Existing Products Rendering */}
                            {filteredProducts.map((product, index) => {
                                const firstSize = product.sizes && product.sizes.length > 0 ? product.sizes[0] : null;
                                const isBacklight = product.type === "backlight";

                                return (
                                    <Link
                                        key={product.id || index}
                                        href={`/shop/${product.type}/${product.shape.toLowerCase()}`}
                                        className="group relative"
                                    >
                                        {/* Volumetric Hover Shadow */}
                                        <div className="absolute inset-x-8 -bottom-10 h-20 bg-blue-600/10 blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-700" />

                                        {/* High-Contrast Card Shell */}
                                        <div className="relative aspect-square md:aspect-[4/5] bg-slate-900 border border-white/5 rounded-[2rem] overflow-hidden transition-all duration-1000 group-hover:border-blue-500/50 group-hover:shadow-[0_40px_100px_rgba(0,0,0,0.6)] group-hover:-translate-y-8">

                                            {/* Top Metadata HUD */}
                                            <div className="absolute top-8 left-8 right-8 z-20 flex justify-between items-start">
                                                <div className="bg-black/60 backdrop-blur-md border border-white/10 px-4 py-2 rounded-lg flex items-center gap-3">
                                                    <div className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-pulse" />
                                                    <span className="text-[9px] font-black text-white/80 uppercase tracking-[0.3em]">{product.type} SR</span>
                                                </div>
                                                <div className="w-10 h-10 bg-white/5 backdrop-blur-md border border-white/10 rounded-lg flex items-center justify-center text-slate-400 group-hover:text-blue-400 transition-colors">
                                                    {isBacklight ? <Sun className="w-4 h-4" /> : <Layers className="w-4 h-4" />}
                                                </div>
                                            </div>

                                            <img
                                                src={product.image || "/api/placeholder/800/800"}
                                                alt={product.title}
                                                className="w-full h-full object-cover transition-all duration-[2000ms] group-hover:scale-110 opacity-70 group-hover:opacity-100"
                                            />

                                            {/* Prismatic Scan Hover Overlay */}
                                            <div className="absolute inset-0 z-10 pointer-events-none overflow-hidden opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                                                <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-transparent via-blue-500 to-transparent shadow-[0_0_20px_rgba(59,130,246,1)] animate-[scan_3s_infinite]" />
                                            </div>

                                            {/* Bottom Interaction Strip */}
                                            <div className="absolute inset-x-0 bottom-0 z-30 p-10 bg-gradient-to-t from-slate-950 via-slate-950/80 to-transparent">
                                                <div className="flex flex-col gap-6">
                                                    <div className="flex items-center gap-3 opacity-0 group-hover:opacity-100 transition-all duration-700 translate-y-4 group-hover:translate-y-0">
                                                        <div className="h-[2px] w-8 bg-blue-500" />
                                                        <span className="text-[10px] font-black text-white uppercase tracking-[0.4em]">Personalize Now</span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Floating Info Pod */}
                                        <div className="mt-[-60px] relative z-40 mx-8 p-10 bg-[#0f172a]/95 backdrop-blur-2xl border border-white/10 rounded-[2.5rem] shadow-2xl transition-all duration-700 group-hover:border-blue-500/30 group-hover:translate-y-3">
                                            <div className="flex items-center gap-3 mb-6">
                                                <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest leading-none border-b border-white/5 pb-1">{product.shape} // ARCHIVE</span>
                                            </div>

                                            <h3 className="text-2xl font-black text-white mb-8 tracking-tighter leading-tight group-hover:text-blue-400 transition-colors duration-500">
                                                {product.title}
                                            </h3>

                                            <div className="flex items-end justify-between">
                                                <div className="flex flex-col">
                                                    <span className="text-[10px] font-black text-blue-500/40 uppercase tracking-[0.4em] mb-3">Unit Cost</span>
                                                    <div className="flex items-baseline gap-2">
                                                        <span className="text-4xl font-black text-white tracking-tighter">
                                                            ₹{firstSize?.price.toLocaleString() || "---"}
                                                        </span>
                                                        <span className="text-[11px] font-black text-slate-600 uppercase">INR</span>
                                                    </div>
                                                </div>

                                                <div className="w-16 h-16 bg-white/5 border border-white/10 rounded-2xl flex items-center justify-center text-white group-hover:bg-blue-600 group-hover:border-blue-600 transition-all duration-500 shadow-xl">
                                                    <ChevronRight className="w-7 h-7 group-hover:translate-x-1 transition-transform" />
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
        </section>
    );
};

export default Frames;
