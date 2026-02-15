'use client';

import React from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import {
    UserSquare,
    Image as ImageIcon,
    Square,
    ChevronRight,
} from "lucide-react";

const CanvasBanner = "/assets/frontend_assets/CanvasCustomized/CanvasBanner.jpeg";

const shapeData = [
    {
        name: "Portrait",
        icon: <UserSquare className="w-12 h-12 text-primary" />,
        route: "/shop/canvas/portrait",
    },
    {
        name: "Landscape",
        icon: <ImageIcon className="w-12 h-12 text-success" />,
        route: "/shop/canvas/landscape",
    },
    {
        name: "Square",
        icon: <Square className="w-12 h-12 text-primary" />,
        route: "/shop/canvas/square",
    },
];

const steps = ["Select Shape", "Upload Image", "Place Order"];

const CanvasShop = () => {
    const router = useRouter();

    return (
        <div className="w-full font-[Poppins] px-4 sm:px-6 md:px-12 lg:px-20 xl:px-24 pt-[100px] mb-20 bg-neutral-50 min-h-screen">
            {/* Header */}
            <div className="text-center font-extrabold text-2xl sm:text-3xl xl:text-4xl">
                <h1 className="text-secondary">Canvas Frame</h1>
                <p className="text-lg sm:text-xl text-neutral-600 mt-3 sm:mt-5 font-medium">
                    Customize Your Canvas Photo Frame
                </p>

                {/* Banner */}
                <div className="w-full mt-8 rounded-2xl overflow-hidden shadow-xl aspect-[21/9] relative">
                    <Image
                        src={CanvasBanner}
                        alt="Canvas Frame Banner"
                        fill
                        className="object-cover"
                        priority
                    />
                </div>

                <p className="font-bold text-xl sm:text-2xl mt-12 sm:mt-16 text-secondary">
                    Pick the Canvas Frame Shape For You!
                </p>
            </div>

            {/* Steps */}
            <div className="flex flex-col sm:flex-row justify-center items-center gap-6 md:gap-16 mt-12 mb-16">
                {steps.map((label, index) => (
                    <div key={index} className="flex flex-col items-center gap-3 group">
                        <div className="w-12 h-12 rounded-full bg-primary text-white flex items-center justify-center text-lg font-bold shadow-lg group-hover:scale-110 transition-transform duration-300">
                            {index + 1}
                        </div>
                        <p className="text-center font-semibold text-secondary">{label}</p>
                    </div>
                ))}
            </div>

            {/* Shape Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 justify-items-center max-w-5xl mx-auto">
                {shapeData.map((shape, index) => (
                    <div
                        key={index}
                        onClick={() => router.push(shape.route)}
                        className="cursor-pointer w-full max-w-sm bg-white rounded-2xl p-8 flex flex-col items-center justify-center gap-6 shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border border-neutral-100 group"
                    >
                        <div className="text-neutral-600 group-hover:text-primary transition-colors duration-300 transform group-hover:scale-110">
                            {shape.icon}
                        </div>
                        <p className="text-xl font-bold text-secondary text-center">{shape.name}</p>
                        <button className="flex items-center justify-center gap-2 text-primary font-semibold group-hover:text-primary-hover transition-colors rounded-full bg-primary-light px-6 py-2">
                            <span>Customize Now</span>
                            <ChevronRight className="w-4 h-4" />
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default CanvasShop;
