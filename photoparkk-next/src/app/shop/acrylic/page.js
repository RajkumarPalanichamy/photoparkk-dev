'use client';

import React from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import {
    UserSquare,
    Image as ImageIcon,
    Square,
    Heart,
    Hexagon,
    Circle,
    ChevronRight,
} from "lucide-react";

// Assuming assets are copied to public/assets
const AcrylicBanner = "/assets/frontend_assets/CanvasCustomized/AcrylicBanner.jpg";

const shapeData = [
    {
        name: "Portrait",
        icon: <UserSquare className="w-12 h-12 text-primary" />,
        route: "/shop/acrylic/portrait/edit",
    },
    {
        name: "Landscape",
        icon: <ImageIcon className="w-12 h-12 text-success" />,
        route: "/shop/acrylic/landscape/edit",
    },
    {
        name: "Square",
        icon: <Square className="w-12 h-12 text-primary" />,
        route: "/shop/acrylic/square/edit",
    },
    {
        name: "Love",
        icon: <Heart className="w-12 h-12 text-primary" />,
        route: "/shop/acrylic/love/edit",
    },
    {
        name: "Hexagon",
        icon: <Hexagon className="w-12 h-12 text-warning" />,
        route: "/shop/acrylic/hexagon/edit",
    },
    {
        name: "Round",
        icon: <Circle className="w-12 h-12 text-error" />,
        route: "/shop/acrylic/round/edit",
    },
];

const steps = ["Select Shape", "Upload Image", "Place Order"];

const AcrylicShop = () => {
    const router = useRouter();

    return (
        <div className="w-full font-[Poppins] min-h-screen bg-[#FDFDFD]">
            {/* Hero Section */}
            <div className="relative w-full h-[40vh] min-h-[400px] flex items-center justify-center bg-neutral-100 overflow-hidden">
                <Image
                    src={AcrylicBanner}
                    alt="Acrylic Frame Banner"
                    fill
                    className="object-cover opacity-90"
                    priority
                />
                <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/60" />
                <div className="relative z-10 text-center px-4 max-w-4xl mx-auto mt-10">
                    <span className="inline-block py-1 px-3 rounded-full bg-white/20 backdrop-blur-md border border-white/30 text-white text-xs sm:text-sm font-medium tracking-widest uppercase mb-4">
                        The Premium Collection
                    </span>
                    <h1 className="text-4xl sm:text-5xl md:text-6xl font-semibold text-white tracking-tight leading-tight mb-4">
                        Acrylic <span className="font-light italic">Glass</span> Frames
                    </h1>
                    <p className="text-lg sm:text-xl text-white/90 font-light max-w-2xl mx-auto leading-relaxed">
                        Transform your memories into crystal-clear masterpieces. Elegance in every shape (Customized).
                    </p>
                </div>
            </div>

            {/* Minimalist Steps */}
            <div className="w-full border-b border-neutral-100 bg-white">
                <div className="max-w-7xl mx-auto px-6 py-6 overflow-x-auto">
                    <div className="flex items-center justify-center min-w-max gap-8 sm:gap-16 text-sm font-medium tracking-wide text-neutral-400">
                        {steps.map((label, index) => (
                            <div key={index} className={`flex items-center gap-3 ${index === 0 ? 'text-neutral-900' : ''}`}>
                                <span className={`flex items-center justify-center w-6 h-6 rounded-full border ${index === 0 ? 'border-neutral-900 bg-neutral-900 text-white' : 'border-neutral-300'} text-xs`}>
                                    {index + 1}
                                </span>
                                <span>{label}</span>
                                {index < steps.length - 1 && (
                                    <div className="w-8 h-[1px] bg-neutral-200 hidden sm:block" />
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Main Content - Shape Selection */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
                <div className="text-center mb-16">
                    <h2 className="text-3xl font-light text-neutral-800">Choose Your Canvas</h2>
                    <div className="h-1 w-20 bg-primary/20 mx-auto mt-4 rounded-full"></div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 sm:gap-10">
                    {shapeData.map((shape, index) => (
                        <div
                            key={index}
                            onClick={() => router.push(shape.route)}
                            className="group relative cursor-pointer"
                        >
                            {/* Card Container */}
                            <div className="relative h-80 w-full bg-white rounded-[2rem] border border-neutral-100 shadow-sm hover:shadow-[0_20px_50px_rgba(0,0,0,0.08)] transition-all duration-500 overflow-hidden flex flex-col items-center justify-center p-8 z-0">

                                {/* Background Decorative Gradient */}
                                <div className="absolute inset-0 bg-gradient-to-br from-neutral-50 to-white opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                                {/* Shape Preview */}
                                <div className="relative z-10 w-full flex-1 flex items-center justify-center p-4 transition-transform duration-500 group-hover:scale-105">
                                    {renderShapePreview(shape)}
                                </div>

                                {/* Label */}
                                <div className="relative z-10 mt-6 text-center">
                                    <h3 className="text-xl font-medium text-neutral-800 group-hover:text-primary transition-colors duration-300">
                                        {shape.name}
                                    </h3>
                                    <div className="flex items-center justify-center gap-2 mt-2 opacity-0 -translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300">
                                        <span className="text-sm font-medium text-neutral-500">Customize</span>
                                        <ChevronRight className="w-4 h-4 text-primary" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

// Image Assets
const PortraitImg = "/assets/frontend_assets/CanvasCustomized/Portrait.jpeg";
const LandscapeImg = "/assets/frontend_assets/CanvasCustomized/Landscape.jpeg";
const SquareImg = "/assets/frontend_assets/CanvasCustomized/Square.jpeg";

// Helper to render the shape preview visually instead of using icons
const renderShapePreview = (shape) => {
    // Premium Glass Effect & Shadow
    const glassOverlay = (
        <div className="absolute inset-0 bg-gradient-to-tr from-white/40 via-white/10 to-transparent pointer-events-none z-20" />
    );

    const baseClass = "relative transition-all duration-500 group-hover:scale-105 shadow-xl group-hover:shadow-2xl";

    // Scale images slightly to fill shapes perfectly without showing potential borders
    const imgClass = "object-cover scale-110 group-hover:scale-125 transition-transform duration-700";

    switch (shape.name) {
        case "Portrait":
            return (
                <div className={`${baseClass} w-32 h-44 rounded-sm overflow-hidden`}>
                    <Image src={PortraitImg} alt="Portrait" fill className={imgClass} />
                    {glassOverlay}
                </div>
            );
        case "Landscape":
            return (
                <div className={`${baseClass} w-44 h-32 rounded-sm overflow-hidden`}>
                    <Image src={LandscapeImg} alt="Landscape" fill className={imgClass} />
                    {glassOverlay}
                </div>
            );
        case "Square":
            return (
                <div className={`${baseClass} w-36 h-36 rounded-sm overflow-hidden`}>
                    <Image src={SquareImg} alt="Square" fill className={imgClass} />
                    {glassOverlay}
                </div>
            );
        case "Round":
            return (
                <div className={`${baseClass} w-36 h-36 rounded-full overflow-hidden border-2 border-white/50`}>
                    <Image src={PortraitImg} alt="Round" fill className={imgClass} />
                    {glassOverlay}
                </div>
            );
        case "Hexagon":
            return (
                // Flat-topped hexagon using slightly different clip-path for better look
                <div className="w-40 h-40 flex items-center justify-center filter drop-shadow-xl group-hover:drop-shadow-2xl transition-all duration-300">
                    <div className="relative w-full h-full transition-transform duration-500 group-hover:scale-105 bg-white"
                        style={{ clipPath: "polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)" }}>
                        <Image src={PortraitImg} alt="Hexagon" fill className={imgClass} />
                        {glassOverlay}
                    </div>
                </div>
            );
        case "Love":
            return (
                <div className="w-40 h-40 relative filter drop-shadow-xl group-hover:drop-shadow-2xl transition-all duration-300">
                    {/* SVG Heart Path Clip */}
                    <svg width="0" height="0" className="absolute">
                        <defs>
                            <clipPath id="myHeartClip" clipPathUnits="objectBoundingBox">
                                <path d="M0.5,0.887 C0.111,0.675,0.015,0.473,0.015,0.306 C0.015,0.165,0.126,0.05,0.267,0.05 C0.347,0.05,0.423,0.087,0.472,0.148 L0.5,0.183 L0.528,0.148 C0.577,0.087,0.653,0.05,0.733,0.05 C0.874,0.05,0.985,0.165,0.985,0.306 C0.985,0.473,0.889,0.675,0.5,0.887 Z" />
                            </clipPath>
                        </defs>
                    </svg>
                    <div className="w-full h-full relative tranform group-hover:scale-105 transition-transform duration-500" style={{ clipPath: "url(#myHeartClip)" }}>
                        <Image src={PortraitImg} alt="Love" fill className={`${imgClass}`} />
                        {glassOverlay}
                    </div>
                </div>
            );
        default:
            return <div className={`${baseClass} w-32 h-32 rounded-lg`} />;
    }
};

export default AcrylicShop;
