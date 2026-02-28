'use client';
import React, { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { Play, Pause, Volume2, VolumeX } from "lucide-react";

export default function LandingPage() {
  const videoRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(true);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    video.muted = true;
    const playAttempt = video.play();
    if (playAttempt !== undefined) {
      playAttempt.catch(() => {
        setTimeout(() => {
          video.play().catch(() => { });
        }, 500);
      });
    }
  }, []);

  const togglePlay = () => {
    const video = videoRef.current;
    if (!video) return;
    if (isPlaying) {
      video.pause();
    } else {
      video.play().catch(() => { });
    }
    setIsPlaying(!isPlaying);
  };

  const toggleMute = () => {
    const video = videoRef.current;
    if (!video) return;
    video.muted = !isMuted;
    setIsMuted(!isMuted);
  };

  return (
    <div className="relative">
      {/* Offers Scrolling Banner */}
      <motion.div
        className="bg-primary text-white py-3 overflow-hidden relative z-10"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="flex items-center justify-center">
          <motion.div
            className="text-lg font-bold whitespace-nowrap flex items-center gap-4"
            initial={{ x: "100%" }}
            animate={{ x: "-100%" }}
            transition={{
              repeat: Infinity,
              duration: 20,
              ease: "linear",
            }}
          >
            <span className="bg-white/20 px-3 py-1 rounded-full text-sm font-bold border border-white/30">
              NEW
            </span>
            <span>Premium Photography Collections - Handcrafted Excellence</span>
            <span className="text-white/40">•</span>
            <span>Free shipping on orders above ₹999</span>
            <span className="text-white/40">•</span>
            <span>Transform your memories into timeless art</span>
          </motion.div>
        </div>
      </motion.div>

      {/* Main Landing Section */}
      <div className="relative w-full h-[100svh] min-h-[600px] overflow-hidden bg-gray-900">

        {/* ── VIDEO BACKGROUND (z-0) ── */}
        <video
          ref={videoRef}
          autoPlay
          loop
          muted
          playsInline
          preload="auto"
          className="absolute inset-0 w-full h-full object-cover z-0"
        >
          <source src="/assets/photoparkk.mp4" type="video/mp4" />
        </video>

        {/* ── OVERLAYS (z-10) ── */}
        <div className="absolute inset-0 bg-black/55 z-10 pointer-events-none" />
        <div className="absolute inset-0 bg-gradient-to-br from-black/40 via-transparent to-black/50 z-10 pointer-events-none" />

        {/* ── VIDEO CONTROLS (z-20) ── */}
        <div className="absolute bottom-16 sm:bottom-6 right-4 z-20 flex gap-2">
          <button
            onClick={togglePlay}
            className="bg-black/50 text-white p-1.5 sm:p-2 rounded-full hover:bg-black/75 transition-all"
          >
            {isPlaying ? <Pause size={16} className="sm:w-5 sm:h-5" /> : <Play size={16} className="sm:w-5 sm:h-5" />}
          </button>
          <button
            onClick={toggleMute}
            className="bg-black/50 text-white p-1.5 sm:p-2 rounded-full hover:bg-black/75 transition-all"
          >
            {isMuted ? <VolumeX size={16} className="sm:w-5 sm:h-5" /> : <Volume2 size={16} className="sm:w-5 sm:h-5" />}
          </button>
        </div>

        {/* ── MAIN CONTENT (z-20) ── */}
        <div className="relative z-20 h-full flex items-center sm:items-center pt-16 sm:pt-0 pb-10 sm:pb-0">
          <div className="container mx-auto px-4 sm:px-6 flex justify-center sm:justify-end">
            <div className="max-w-2xl w-full">

              {/* Mobile */}
              <div className="block sm:hidden">
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.2 }}
                  className="bg-black/75 backdrop-blur-sm border border-white/20 p-6 rounded-xl text-center"
                >
                  <h1 className="text-3xl font-bold text-white mb-3">
                    Premium{" "}
                    <span className="bg-blue-600 px-2 py-1 rounded text-2xl shadow-lg">
                      Collections
                    </span>
                  </h1>
                  <p className="text-neutral-300 mb-6 text-sm">
                    Handcrafted premium frames for your memories
                  </p>
                  <div className="flex justify-center gap-3">
                    <Link href="/products">
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors shadow-lg"
                      >
                        SHOP NOW
                      </motion.button>
                    </Link>
                    <Link href="/customizer">
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="border border-white/50 text-white px-6 py-3 rounded-lg font-semibold hover:bg-white/10 transition-colors"
                      >
                        VIEW ALL
                      </motion.button>
                    </Link>
                  </div>
                </motion.div>
              </div>

              {/* Desktop */}
              <div className="hidden sm:block">
                <motion.div
                  initial={{ opacity: 0, x: 100 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 1, delay: 0.3 }}
                  className="bg-black/75 backdrop-blur-sm border border-white/20 p-10 rounded-xl max-w-lg text-right ml-auto"
                >
                  <h1 className="text-5xl font-bold text-white mb-6 leading-tight">
                    Premium{" "}
                    <span className="bg-blue-600 px-3 py-2 rounded text-4xl shadow-2xl">
                      Collections
                    </span>
                  </h1>
                  <p className="text-neutral-300 mb-8 text-lg">
                    Discover our exclusive collection of handcrafted premium
                    frames and photography art
                  </p>
                  <div className="flex gap-4 justify-end">
                    <Link href="/Offers">
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="bg-blue-600 text-white px-8 py-4 rounded-lg font-semibold hover:bg-blue-700 transition-colors text-lg shadow-xl"
                      >
                        SHOP NOW
                      </motion.button>
                    </Link>
                    <Link href="/shop/acrylic">
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="border-2 border-white text-white px-8 py-4 rounded-lg font-semibold hover:bg-white hover:text-secondary transition-colors text-lg"
                      >
                        VIEW ALL
                      </motion.button>
                    </Link>
                  </div>
                </motion.div>
              </div>

            </div>
          </div>
        </div>

        {/* Scroll Indicator — hidden on mobile, shown on sm+ */}
        <motion.div
          className="hidden sm:flex absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20"
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <div className="w-6 h-10 border-2 border-white rounded-full flex justify-center">
            <div className="w-1 h-3 bg-white rounded-full mt-2"></div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
