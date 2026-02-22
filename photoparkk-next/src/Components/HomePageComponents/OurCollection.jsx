"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Sparkles } from "lucide-react";
import { motion } from "framer-motion";

// Assets
import AcrylicImage from "@/assets/CustomizePage/AcrylicBanner.jpg";
import CanvasImage from "@/assets/CustomizePage/CanvasWallBanner.webp";
import BacklightImage from "@/assets/frontend_assets/BacklightPhotoFrames/BacklightBanner.jpeg";

const collections = [
    {
        id: 1,
        title: "Acrylic Customizer",
        description: "Experience museum-grade 3D clarity with our float-mount acrylics.",
        image: AcrylicImage,
        link: "/shop/acrylic",
        color: "from-blue-600/90 to-blue-900/95",
        delay: 0.1,
    },
    {
        id: 2,
        title: "Canvas Art",
        description: "Textured, handcrafted gallery wraps for a classic artistic feel.",
        image: CanvasImage,
        link: "/shop/canvas",
        color: "from-cyan-600/90 to-blue-800/95",
        delay: 0.2,
    },
    {
        id: 3,
        title: "Backlit Customizer",
        description: "LED-powered cinematic memories that illuminate your space.",
        image: BacklightImage,
        link: "/shop/backlight",
        color: "from-indigo-600/90 to-blue-900/95",
        delay: 0.3,
    },
];

const OurCollection = () => {
    return (
        <section className="py-24 bg-white font-sans selection:bg-blue-600/10 selection:text-blue-600">
            <div className="container mx-auto px-4 md:px-6">

                {/* Section Header */}
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-20">
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                        className="max-w-2xl"
                    >
                        <div className="flex items-center gap-3 mb-6">
                            <div className="w-10 h-[1px] bg-blue-600" />
                            <span className="text-[11px] font-black text-blue-600 uppercase tracking-[0.4em]">Designer's Choice</span>
                        </div>
                        <h2 className="text-4xl md:text-6xl font-extrabold text-slate-900 tracking-tighter leading-none mb-6">
                            Premium <br /> Collections
                        </h2>
                        <p className="text-lg text-slate-500 font-medium leading-relaxed max-w-lg">
                            An curated intersection of high-end materials and visual storytelling. Engineering the future of your interior gallery.
                        </p>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                        className="hidden md:block"
                    >
                        <Link href="/products" className="group flex items-center gap-4 text-slate-900 font-black text-xs uppercase tracking-[0.3em] bg-slate-50 border border-slate-100 px-8 py-5 rounded-3xl hover:bg-blue-600 hover:text-white hover:border-blue-600 transition-all duration-500 shadow-sm hover:shadow-xl hover:shadow-blue-600/20">
                            Explore Archive <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                        </Link>
                    </motion.div>
                </div>

                {/* Collection Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
                    {collections.map((item) => (
                        <Link href={item.link} key={item.id} className="group">
                            <motion.div
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.8, delay: item.delay }}
                                className="relative h-[620px] rounded-[3.5rem] overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.04)] border-4 border-white transition-all duration-700 transform hover:-translate-y-4 hover:shadow-[0_60px_100px_rgba(0,0,0,0.1)] group-hover:border-blue-600/5"
                            >
                                {/* Background Image */}
                                <Image
                                    src={item.image}
                                    alt={item.title}
                                    fill
                                    className="object-cover transition-all duration-1000 group-hover:scale-110 grayscale-[0.2] group-hover:grayscale-0"
                                    sizes="(max-width: 768px) 100vw, 33vw"
                                />

                                {/* Subtle Overlay Layer */}
                                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/10 to-transparent opacity-60" />

                                {/* Premium Color Mask (Hidden but transitions in) */}
                                <div className={`absolute inset-0 bg-gradient-to-br ${item.color} opacity-0 group-hover:opacity-80 transition-all duration-700 mix-blend-multiply`} />

                                {/* Content Architecture */}
                                <div className="absolute inset-0 p-10 flex flex-col justify-end">
                                    <div className="transform translate-y-8 group-hover:translate-y-0 transition-all duration-700 ease-out">
                                        <div className="flex items-center gap-2 mb-4 opacity-0 group-hover:opacity-100 transition-opacity duration-700">
                                            <Sparkles className="w-4 h-4 text-blue-400" />
                                            <span className="text-[10px] font-black text-white uppercase tracking-[0.4em]">Exclusive Series</span>
                                        </div>

                                        <h3 className="text-4xl font-extrabold text-white mb-4 tracking-tighter leading-none">{item.title}</h3>

                                        <p className="text-white/70 mb-8 opacity-0 group-hover:opacity-100 transition-all duration-700 delay-100 text-base font-medium leading-relaxed max-w-[260px]">
                                            {item.description}
                                        </p>

                                        <div className="inline-flex items-center gap-4 bg-white/10 backdrop-blur-xl border border-white/20 px-8 py-4 rounded-3xl text-white font-black text-[10px] uppercase tracking-[0.3em] group-hover:bg-white group-hover:text-blue-600 transition-all duration-500 shadow-2xl">
                                            Explore <ArrowRight className="w-3.5 h-3.5" />
                                        </div>
                                    </div>
                                </div>

                                {/* Floating Detail Indicator */}
                                <div className="absolute top-10 right-10 z-20 w-12 h-12 rounded-full border border-white/20 backdrop-blur-xl flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-all duration-700 scale-50 group-hover:scale-100 rotate-90 group-hover:rotate-0">
                                    <ArrowRight className="w-5 h-5" />
                                </div>
                            </motion.div>
                        </Link>
                    ))}
                </div>

            </div>
        </section>
    );
};

export default OurCollection;
