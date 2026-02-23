'use client';

import React from "react";
import Link from "next/link";
import { Frame, ArrowRight } from "lucide-react";

const AdminFramesPage = () => {
    const cards = [
        { title: "Acrylic Customizer", text: "Configure crystal-clear acrylic preservation options.", href: "/admin/products?tab=acrylic", color: "text-blue-600", bg: "bg-blue-50" },
        { title: "Canvas Customizer", text: "Matrix management for premium textured canvas products.", href: "/admin/products?tab=canvas", color: "text-indigo-600", bg: "bg-indigo-50" },
        { title: "Backlight Customizer", text: "Illuminated frame customization and logic control.", href: "/admin/products?tab=backlight", color: "text-azure-600", bg: "bg-blue-50/50" },
    ];

    return (
        <div className="w-full">
            <div className="flex items-center gap-6 bg-white p-8 rounded-2xl border border-slate-100 shadow-sm mb-8 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-full bg-blue-50/20 translate-x-10 -skew-x-12" />
                <div className="w-14 h-14 bg-blue-600 text-white rounded-2xl flex items-center justify-center shadow-lg shadow-blue-500/20 relative z-10">
                    <Frame className="w-7 h-7" />
                </div>
                <div className="relative z-10">
                    <h1 className="text-3xl font-black text-slate-900 tracking-tight">Customizer Architecture</h1>
                    <p className="text-slate-500 font-medium">Coordinate your specialized product categories and pricing matrices.</p>
                </div>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
                {cards.map((card, i) => (
                    <Link key={i} href={card.href} className="group block bg-white p-8 rounded-2xl border border-slate-100 hover:border-blue-500/30 transition-all hover:shadow-xl hover:-translate-y-1 relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-16 h-16 bg-slate-50 rounded-bl-3xl -tr-8 pointer-events-none transition-transform group-hover:scale-110" />
                        <div className={`w-12 h-12 ${card.bg} ${card.color} rounded-xl flex items-center justify-center mb-6 shadow-sm`}>
                            <Frame className="w-6 h-6" />
                        </div>
                        <h3 className="text-xl font-bold text-slate-900 group-hover:text-blue-600 transition-colors mb-2">{card.title}</h3>
                        <p className="text-sm text-slate-500 mb-6 leading-relaxed font-medium">{card.text}</p>
                        <div className="flex items-center text-xs font-black text-blue-600 uppercase tracking-widest">
                            Access Module <ArrowRight className="w-3.5 h-3.5 ml-2 group-hover:translate-x-1 transition-transform" />
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    );
};

export default AdminFramesPage;
