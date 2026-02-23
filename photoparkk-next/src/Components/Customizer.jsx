'use client';

import React, { useEffect, useState } from "react";
import axiosInstance from "@/utils/axiosInstance";
import {
    Search,
    LayoutGrid,
    MessageCircle
} from "lucide-react";

/**
 * Customizer Component
 * A modern, bright product listing for customizer templates.
 * Matches the global application theme (light mode, #F0F4F8 background, white cards, primary blue).
 */
const Customizer = () => {
    const [templates, setTemplates] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState("");

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                const res = await axiosInstance.get('customizer-templates');
                setTemplates(res.data || []);
            } catch (error) {
                console.error("Critical error in fetchData:", error);
                setTemplates([]);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    const filteredTemplates = templates.filter((template) => {
        const matchesSearch = template.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
            template.description?.toLowerCase().includes(searchQuery.toLowerCase());
        return matchesSearch;
    });

    return (
        <section className="bg-[#F0F4F8] min-h-screen py-32 px-4 font-sans selection:bg-primary/30">
            <div className="max-w-7xl mx-auto">
                {/* Header Section */}
                <div className="text-center max-w-3xl mx-auto mb-16">
                    <div className="inline-flex items-center gap-2 bg-blue-100 text-primary px-4 py-2 rounded-full text-sm font-semibold mb-6 shadow-sm">
                        <LayoutGrid size={18} />
                        <span>Instant Configurations</span>
                    </div>
                    <h1 className="text-4xl md:text-6xl font-extrabold text-secondary mb-6 tracking-tight">
                        Interactive <span className="text-primary">Customizer</span>
                    </h1>
                    <p className="text-lg text-neutral-600 leading-relaxed">
                        Choose from our carefully crafted templates for a seamless, fast checkout and beautifully personalized display.
                    </p>
                </div>

                {/* Search Bar */}
                <div className="max-w-xl mx-auto mb-16">
                    <div className="relative group shadow-sm rounded-2xl">
                        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                            <Search className="h-5 w-5 text-neutral-400 group-focus-within:text-primary transition-colors duration-300" />
                        </div>
                        <input
                            type="text"
                            placeholder="Find a template..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full pl-12 pr-4 py-4 bg-white border border-neutral-100 rounded-2xl outline-none focus:border-primary focus:ring-4 focus:ring-primary/10 transition-all text-secondary font-medium placeholder:text-neutral-400 text-lg shadow-sm"
                        />
                    </div>
                </div>

                {/* Content Area */}
                {loading ? (
                    <div className="flex flex-col items-center justify-center py-20">
                        <div className="w-12 h-12 border-4 border-primary/20 border-t-primary rounded-full animate-spin mb-4"></div>
                        <p className="text-neutral-500 font-medium animate-pulse">Loading templates...</p>
                    </div>
                ) : filteredTemplates.length === 0 ? (
                    <div className="text-center py-20 bg-white rounded-3xl shadow-sm border border-neutral-100 max-w-2xl mx-auto">
                        <div className="inline-flex items-center justify-center w-20 h-20 bg-neutral-100 text-neutral-400 rounded-full mb-6">
                            <Search className="h-10 w-10" />
                        </div>
                        <h3 className="text-2xl font-bold text-secondary mb-3">No templates found</h3>
                        <p className="text-neutral-500 mb-8 max-w-md mx-auto">We couldn't find any templates matching your search criteria. Try using different keywords.</p>
                        <button
                            onClick={() => setSearchQuery("")}
                            className="bg-primary hover:bg-primary-hover text-white px-8 py-3 rounded-xl font-semibold transition-all shadow-md hover:shadow-lg hover:-translate-y-0.5"
                        >
                            Clear Search
                        </button>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {filteredTemplates.map((template, index) => {
                            const whatsappUrl = `https://wa.me/919629674444?text=${encodeURIComponent(`Hi PhotoParkk, I'm interested in the template: *${template.title}*.\n\nImage: ${template.image}\n\nPrice: ₹${template.price || 'N/A'}`)}`;

                            return (
                                <a
                                    key={template.id || `temp-${index}`}
                                    href={whatsappUrl}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="group bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-neutral-100 flex flex-col h-full hover:-translate-y-1"
                                >
                                    {/* Image Section */}
                                    <div className="relative aspect-square overflow-hidden bg-neutral-100 cursor-pointer">
                                        <div className="absolute inset-0 bg-secondary/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10 pointer-events-none" />
                                        <img
                                            src={template.image}
                                            alt={template.title}
                                            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                                        />
                                        <div className="absolute top-4 left-4 z-20 bg-white/95 backdrop-blur-sm px-3 py-1.5 rounded-lg text-xs font-bold text-secondary uppercase tracking-wider shadow-sm">
                                            Ready Theme
                                        </div>
                                    </div>

                                    {/* Details Section */}
                                    <div className="p-8 flex flex-col flex-grow relative z-20 bg-white">
                                        <h3 className="text-2xl font-bold text-secondary mb-3 line-clamp-1 group-hover:text-primary transition-colors duration-300">{template.title}</h3>
                                        <p className="text-neutral-500 text-sm leading-relaxed mb-8 line-clamp-2 flex-grow">
                                            {template.description}
                                        </p>

                                        <div className="pt-6 border-t border-neutral-100 flex items-center justify-between mt-auto">
                                            <div>
                                                <p className="text-[10px] text-neutral-400 font-bold uppercase tracking-widest mb-1">Unit Cost</p>
                                                <div className="flex items-baseline gap-1">
                                                    <span className="text-2xl font-black text-secondary group-hover:text-primary transition-colors">₹{template.price?.toLocaleString() || "---"}</span>
                                                    <span className="text-xs font-bold text-neutral-400">INR</span>
                                                </div>
                                            </div>

                                            <div className="w-12 h-12 bg-primary/10 text-primary rounded-xl flex items-center justify-center group-hover:bg-primary group-hover:text-white transition-all duration-300 shadow-sm">
                                                <MessageCircle className="w-6 h-6" />
                                            </div>
                                        </div>
                                    </div>
                                </a>
                            );
                        })}
                    </div>
                )}
            </div>
        </section>
    );
};

export default Customizer;
