
"use client";
import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Image, Box, Sun, Crop } from "lucide-react";

const customizations = [
    {
        title: "Custom Frames",
        description: "Design your perfect frame with our interactive customizer. Choose shape, color, and style.",
        icon: <Crop size={40} />,
        color: "bg-blue-100 text-blue-600",
        href: "/frames",
        image: "/assets/frontend_assets/Customize/frame_custom.jpg" // Placeholder path, using generic fallback if needed
    },
    {
        title: "Acrylic Prints",
        description: "Modern, high-gloss acrylic prints that give your photos a stunning depth and glass-like finish.",
        icon: <Image size={40} />,
        color: "bg-purple-100 text-purple-600",
        href: "/shop/acrylic",
        image: "/assets/frontend_assets/Acrylic/acrylic_banner.jpg"
    },
    {
        title: "Canvas Prints",
        description: "Turn your photos into art with museum-quality canvas prints. Classic texture and durability.",
        icon: <Box size={40} />,
        color: "bg-orange-100 text-orange-600",
        href: "/shop/canvas",
        image: "/assets/frontend_assets/Canvas/canvas_banner.jpg"
    },
    {
        title: "Backlight Frames",
        description: "Illuminated frames that make your memories shine. Perfect for high-impact displays.",
        icon: <Sun size={40} />,
        color: "bg-yellow-100 text-yellow-600",
        href: "/shop/backlight",
        image: "/assets/frontend_assets/Backlight/backlight_banner.jpg"
    }
];

export default function CustomizePage() {
    return (
        <div className="bg-neutral-50 min-h-screen py-20 px-4 pt-32">
            <div className="max-w-7xl mx-auto">
                <div className="text-center mb-16">
                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-4xl md:text-6xl font-extrabold text-secondary mb-6"
                    >
                        Create Your <span className="text-primary">Masterpiece</span>
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="text-xl text-neutral-600 max-w-2xl mx-auto"
                    >
                        Choose from our premium collection of customizable prints and specific frame styles.
                    </motion.p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {customizations.map((item, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1 + 0.2 }}
                        >
                            <Link href={item.href} className="group block h-full bg-white rounded-3xl shadow-xl overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 border border-neutral-100">
                                <div className="relative h-64 overflow-hidden bg-gray-200">
                                    {/* Placeholder for actual image if path is wrong, uses icon as fallback visually if needed but structure implies image */}
                                    <div className={`absolute inset-0 flex items-center justify-center ${item.color} opacity-20`}>
                                        {item.icon}
                                    </div>
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-8">
                                        <div className={`p-3 rounded-2xl bg-white/90 backdrop-blur-sm shadow-sm`}>
                                            <div className={item.color.replace('bg-', 'text-').replace('100', '600')}>
                                                {item.icon}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="p-8">
                                    <h3 className="text-2xl font-bold text-secondary mb-3 flex items-center justify-between">
                                        {item.title}
                                        <ArrowRight className="w-6 h-6 text-primary transform -translate-x-4 opacity-0 group-hover:translate-x-0 group-hover:opacity-100 transition-all duration-300" />
                                    </h3>
                                    <p className="text-neutral-600 leading-relaxed text-lg">
                                        {item.description}
                                    </p>
                                </div>
                            </Link>
                        </motion.div>
                    ))}
                </div>
            </div>
        </div>
    );
}
