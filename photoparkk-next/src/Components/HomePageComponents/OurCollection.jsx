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
        title: "Acrylic Frames",
        description: "Crystal clear, modern gloss finish.",
        image: AcrylicImage,
        link: "/frames/acrylic",
        color: "from-blue-600/90 to-blue-900/90",
        delay: 0.1,
    },
    {
        id: 2,
        title: "Canvas Art",
        description: "Textured, museum-quality prints.",
        image: CanvasImage,
        link: "/frames/canvas",
        color: "from-orange-600/90 to-red-900/90",
        delay: 0.2,
    },
    {
        id: 3,
        title: "Backlit Frames",
        description: "LED illuminated cinematic experience.",
        image: BacklightImage,
        link: "/frames/backlight",
        color: "from-purple-600/90 to-indigo-900/90",
        delay: 0.3,
    },
];

const OurCollection = () => {
    return (
        <section className="py-24 bg-neutral-50 font-[Poppins]">
            <div className="container mx-auto px-4 md:px-6">

                {/* Section Header */}
                <div className="text-center max-w-2xl mx-auto mb-16">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                    >
                        <div className="inline-flex items-center gap-2 px-4 py-2 bg-white rounded-full shadow-sm text-sm font-semibold text-primary mb-6">
                            <Sparkles className="w-4 h-4" />
                            <span>Premium Collections</span>
                        </div>
                        <h2 className="text-4xl md:text-5xl font-bold text-neutral-900 mb-6 tracking-tight">
                            Curated for Your Walls
                        </h2>
                        <p className="text-lg text-neutral-600 leading-relaxed">
                            Explore our diverse range of handcrafted frames, designed to turn your cherished memories into timeless masterpieces.
                        </p>
                    </motion.div>
                </div>

                {/* Collection Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {collections.map((item) => (
                        <Link href={item.link} key={item.id} className="group">
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.5, delay: item.delay }}
                                className="relative h-[500px] rounded-[2rem] overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2"
                            >
                                {/* Background Image */}
                                <Image
                                    src={item.image}
                                    alt={item.title}
                                    fill
                                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                                    sizes="(max-width: 768px) 100vw, 33vw"
                                />

                                {/* Gradient Overlay */}
                                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-80 group-hover:opacity-60 transition-opacity duration-500" />

                                {/* Hover Color Overlay */}
                                <div className={`absolute inset-0 bg-gradient-to-br ${item.color} opacity-0 group-hover:opacity-90 transition-opacity duration-500 mix-blend-multiply`} />

                                {/* Content */}
                                <div className="absolute inset-0 p-8 flex flex-col justify-end">
                                    <div className="transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                                        <h3 className="text-3xl font-bold text-white mb-2">{item.title}</h3>
                                        <p className="text-white/80 mb-6 opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100 text-lg">
                                            {item.description}
                                        </p>

                                        <div className="inline-flex items-center gap-3 text-white font-semibold group-hover:gap-4 transition-all">
                                            <span>Explore Collection</span>
                                            <div className="bg-white/20 p-2 rounded-full backdrop-blur-sm group-hover:bg-white group-hover:text-primary transition-colors">
                                                <ArrowRight className="w-5 h-5" />
                                            </div>
                                        </div>
                                    </div>
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
