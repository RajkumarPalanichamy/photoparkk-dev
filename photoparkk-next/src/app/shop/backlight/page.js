'use client';

import React from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { ChevronRight } from "lucide-react";

const BacklightBanner = "/assets/frontend_assets/BacklightPhotoFrames/BacklightBanner.jpeg";
const BacklightPortrait = "/assets/frontend_assets/BacklightPhotoFrames/BacklightPortrait.jpeg";
const BacklightLandscape = "/assets/frontend_assets/BacklightPhotoFrames/LandScape.jpeg"; // Note casing from filesystem
const BacklightSquare = "/assets/frontend_assets/BacklightPhotoFrames/Square.jpeg";

const steps = ["Select Shape", "Upload Image", "Place Order"];

const frameData = [
    {
        title: "Portrait Frame",
        image: BacklightPortrait,
        route: "/shop/backlight/portrait",
    },
    {
        title: "Landscape Frame",
        image: BacklightLandscape,
        route: "/shop/backlight/landscape",
    },
    {
        title: "Square Frame",
        image: BacklightSquare,
        route: "/shop/backlight/square",
    },
];

const BacklightShop = () => {
    const router = useRouter();

    return (
        <div className="w-full font-[Poppins] px-4 sm:px-6 md:px-12 lg:px-20 xl:px-24 pt-[100px] mb-20 bg-neutral-50 min-h-screen">
            {/* Header Section */}
            <div className="text-center font-extrabold text-2xl sm:text-3xl xl:text-4xl">
                <h1 className="text-secondary">Backlight Photo Frame</h1>
                <p className="text-lg sm:text-xl text-neutral-600 mt-3 sm:mt-5 font-medium">
                    Customize Your Backlight Photo Frame
                </p>

                {/* Banner Image */}
                <div className="w-full mt-8 rounded-2xl overflow-hidden shadow-xl aspect-[21/9] relative">
                    <Image
                        src={BacklightBanner}
                        alt="Backlight Frame Banner"
                        fill
                        className="object-cover"
                        priority
                    />
                </div>

                <p className="font-bold text-xl sm:text-2xl mt-12 sm:mt-16 text-secondary">
                    Pick the Backlight Frame For You!
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

            {/* Frame Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
                {frameData.map((frame, index) => (
                    <div
                        key={index}
                        className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden flex flex-col group hover:-translate-y-1"
                    >
                        <div className="relative w-full h-[340px] overflow-hidden">
                            <Image
                                src={frame.image}
                                alt={frame.title}
                                fill
                                className="object-cover group-hover:scale-105 transition-transform duration-500"
                            />
                        </div>
                        <div className="p-6 flex flex-col items-center flex-grow">
                            <h3 className="text-xl font-bold text-secondary text-center mb-4">
                                {frame.title}
                            </h3>
                            <button
                                onClick={() => router.push(frame.route)}
                                className="flex items-center gap-2 text-primary font-semibold mt-auto hover:text-primary-hover transition-colors"
                            >
                                <span>Customize Now</span>
                                <ChevronRight className="w-5 h-5" />
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default BacklightShop;
