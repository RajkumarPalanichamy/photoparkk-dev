'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { ArrowRight, Sparkles } from 'lucide-react';

// Import images
import AcrylicImage from '@/assets/CustomizePage/AcrylicBanner.jpg'; // Verify path
import CanvasImage from '@/assets/CustomizePage/CanvasWallBanner.webp'; // Verify path
import BacklightImage from '@/assets/frontend_assets/BacklightPhotoFrames/BacklightBanner.jpeg'; // Verify path

const CategoryShowcase = ({
    type,
    variant,
    title,
    description,
    badgeColor,
    accentColor,
}) => {
    // Map type to image and link
    const contentMap = {
        acrylic: {
            image: AcrylicImage,
            link: '/frames/acrylic',
            badge: 'Best Seller',
            tagline: 'Precision Engineering'
        },
        canvas: {
            image: CanvasImage,
            link: '/frames/canvas',
            badge: 'Trending',
            tagline: 'Artisanal Quality'
        },
        backlight: {
            image: BacklightImage,
            link: '/frames/backlight',
            badge: 'New Arrival',
            tagline: 'Cinematic Experience'
        },
    };

    const currentContent = contentMap[type] || contentMap.acrylic;
    const isReversed = type === 'canvas';

    return (
        <section className="py-24 md:py-32 bg-white overflow-hidden font-sans selection:bg-blue-600/10 selection:text-blue-600">
            <div className="container mx-auto px-4 md:px-6">
                <div className={`flex flex-col ${isReversed ? 'md:flex-row-reverse' : 'md:flex-row'} items-center gap-16 md:gap-24`}>

                    {/* Text Content Architecture */}
                    <motion.div
                        initial={{ opacity: 0, x: isReversed ? 60 : -60 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                        className="flex-1 space-y-8 text-center md:text-left"
                    >
                        <div className="flex flex-col items-center md:items-start gap-4">
                            <div className="flex items-center gap-2">
                                <span className={`h-1 w-8 rounded-full ${type === 'backlight' ? 'bg-blue-600' : 'bg-slate-200'}`} />
                                <span className="text-[10px] font-black text-blue-600 uppercase tracking-[0.4em]">
                                    {currentContent.tagline}
                                </span>
                            </div>

                            <div className="inline-flex items-center px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest bg-blue-50 text-blue-600 border border-blue-100 shadow-sm">
                                {currentContent.badge}
                            </div>
                        </div>

                        <h2 className="text-4xl md:text-6xl lg:text-7xl font-extrabold text-slate-900 leading-[0.95] tracking-tighter">
                            {title.split(' ').map((word, i) => (
                                <span key={i} className="block">{word}</span>
                            ))}
                        </h2>

                        <p className="text-lg md:text-xl text-slate-500 font-medium leading-relaxed max-w-xl mx-auto md:mx-0">
                            {description}
                        </p>

                        <div className="pt-6 flex justify-center md:justify-start">
                            <Link href={currentContent.link} className="group relative inline-flex items-center justify-center">
                                <div className="absolute inset-0 bg-blue-600 rounded-full blur-xl opacity-20 group-hover:opacity-40 transition-opacity" />
                                <div className="relative inline-flex items-center gap-3 px-10 py-5 rounded-full bg-slate-900 text-white font-black text-xs uppercase tracking-[0.3em] transition-all hover:bg-blue-600 hover:shadow-2xl hover:shadow-blue-600/40 hover:-translate-y-1">
                                    Configure Now
                                    <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                                </div>
                            </Link>
                        </div>
                    </motion.div>

                    {/* Immersive Image Architecture */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 1, ease: "easeOut" }}
                        className="flex-1 w-full"
                    >
                        <div className="relative aspect-[5/4] rounded-[3.5rem] overflow-hidden shadow-[0_50px_100px_rgba(0,0,0,0.08)] group border-8 border-white">
                            <Image
                                src={currentContent.image}
                                alt={title}
                                fill
                                className="object-cover transition-all duration-[2000ms] group-hover:scale-110 group-hover:rotate-1"
                                priority={type === 'backlight'}
                            />
                            {/* Glassmorphism Badge Overlay */}
                            <div className="absolute top-8 right-8 z-10 w-20 h-20 rounded-full bg-white/20 backdrop-blur-xl border border-white/30 flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-all duration-700 scale-50 group-hover:scale-100 shadow-2xl">
                                <Sparkles className="w-8 h-8" />
                            </div>

                            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/40 via-transparent to-transparent opacity-60" />
                        </div>
                    </motion.div>

                </div>
            </div>
        </section>
    );
};

export default CategoryShowcase;
