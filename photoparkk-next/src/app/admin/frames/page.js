'use client';

import React from "react";
import Link from "next/link";
import { Frame, ArrowRight } from "lucide-react";

const AdminFramesPage = () => {
    const cards = [
        { title: "Acrylic Frames", text: "Manage acrylic frame products, prices and shapes.", href: "/admin/products?tab=acrylic", color: "bg-blue-500" },
        { title: "Canvas Frames", text: "Manage canvas frame inventory and configurations.", href: "/admin/products?tab=canvas", color: "bg-purple-500" },
        { title: "Backlight Frames", text: "Manage backlit frame options.", href: "/admin/products?tab=backlight", color: "bg-orange-500" },
    ];

    return (
        <div className="w-full">
            <div className="flex items-center gap-4 bg-white p-6 rounded-2xl border border-neutral-100 shadow-sm mb-8">
                <div className="w-12 h-12 bg-indigo-50 rounded-xl flex items-center justify-center text-indigo-500">
                    <Frame className="w-6 h-6" />
                </div>
                <div>
                    <h1 className="text-2xl font-bold text-secondary">Frame Management</h1>
                    <p className="text-neutral-500">Configure frame categories and options.</p>
                </div>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
                {cards.map((card, i) => (
                    <Link key={i} href={card.href} className="group block bg-white p-6 rounded-xl border border-neutral-200 hover:border-primary/50 transition-all hover:shadow-md">
                        <div className={`w-10 h-10 ${card.color} bg-opacity-10 rounded-lg flex items-center justify-center mb-4 group-hover:bg-opacity-20 transition`}>
                            <Frame className={`w-5 h-5 ${card.color.replace('bg-', 'text-')}`} />
                        </div>
                        <h3 className="text-lg font-bold text-secondary group-hover:text-primary transition-colors">{card.title}</h3>
                        <p className="text-sm text-neutral-500 mt-2 mb-4">{card.text}</p>
                        <div className="flex items-center text-sm font-medium text-primary">
                            Manage <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    );
};

export default AdminFramesPage;
