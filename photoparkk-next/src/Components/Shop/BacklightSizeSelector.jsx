"use client";
import React, { useState, useEffect, useCallback, useRef } from "react";
import { useRouter } from "next/navigation";
import {
    Sparkles, CheckCircle2, Ruler, ShoppingCart, Loader2,
    ArrowLeft, Package, Truck, Lock, Sun, Zap, Lightbulb,
    Shield, Star, ChevronRight
} from "lucide-react";
import { toast } from "react-toastify";
import * as htmlToImage from 'html-to-image';
import axiosInstance from "../../utils/axiosInstance";

// ─── Backlight Sizes ───
const BL_SIZES = {
    portrait: [
        { label: '8" x 12"', price: 1150, width: 8, height: 12 },
        { label: '12" x 18"', price: 2500, width: 12, height: 18 },
        { label: '16" x 20"', price: 3100, width: 16, height: 20 },
        { label: '15" x 30"', price: 3950, width: 15, height: 30 },
    ],
    landscape: [
        { label: '12" x 8"', price: 1150, width: 12, height: 8 },
        { label: '18" x 12"', price: 2500, width: 18, height: 12 },
        { label: '20" x 16"', price: 3100, width: 20, height: 16 },
    ],
    square: [
        { label: '12" x 12"', price: 1450, width: 12, height: 12 },
        { label: '16" x 16"', price: 2600, width: 16, height: 16 },
        { label: '20" x 20"', price: 3500, width: 20, height: 20 },
    ],
    default: [
        { label: '8" x 12"', price: 1150, width: 8, height: 12 },
        { label: '12" x 12"', price: 1450, width: 12, height: 12 },
        { label: '12" x 18"', price: 2500, width: 12, height: 18 },
    ],
};

// ─── Luxury Config Options ───
const LIGHT_MODES = [
    { label: "Warm Glow", value: "warm", color: "#FFD27D", desc: "Cozy & inviting" },
    { label: "Cool White", value: "cool", color: "#E6F0FF", desc: "Modern & crisp" },
    { label: "Natural", value: "natural", color: "#FFFFFF", desc: "Pure daylight" },
];

const POWER_OPTIONS = [
    { label: "Standard USB", value: "usb", price: 0, desc: "Plug & play" },
    { label: "Wireless Pack", value: "battery", price: 650, desc: "Cordless look" },
];

const SMART_UPGRADES = [
    { id: "remote", label: "Remote Control", price: 499, desc: "Dim from distance" },
    { id: "wifi", label: "Wi-Fi Switch", price: 899, desc: "Smart home ready" },
];

const BacklightSizeSelector = ({ shape }) => {
    const router = useRouter();
    const type = "backlight";

    // ─── State ───
    const [editorData, setEditorData] = useState(null);
    const [frameConfig, setFrameConfig] = useState(null);
    const [selectedSize, setSelectedSize] = useState(null);
    const [selectedLightMode, setSelectedLightMode] = useState(LIGHT_MODES[0]);
    const [selectedPower, setSelectedPower] = useState(POWER_OPTIONS[0]);
    const [upgrades, setUpgrades] = useState([]);
    const [quantity, setQuantity] = useState(1);
    const [totalPrice, setTotalPrice] = useState(0);
    const [loading, setLoading] = useState(false);
    const [userId, setUserId] = useState(null);
    const [ledBrightness, setLedBrightness] = useState(0.9);
    const [croppedImageUrl, setCroppedImageUrl] = useState(null);
    const previewRef = useRef(null);

    // ─── Derived ───
    const shapeTitle = shape.charAt(0).toUpperCase() + shape.slice(1);
    const shapeKey = ["portrait", "landscape", "square"].includes(shape) ? shape : "default";
    const availableSizes = frameConfig?.sizes || BL_SIZES[shapeKey] || BL_SIZES.default;

    // ─── Fetch Frame Config ───
    useEffect(() => {
        const fetchConfig = async () => {
            try {
                const res = await axiosInstance.get(`frames/${type}?shape=${shape}`);
                if (res.data && res.data.length > 0) {
                    const dbConfig = res.data[0];
                    setFrameConfig(dbConfig);
                    if (dbConfig.sizes?.length > 0 && !selectedSize) {
                        setSelectedSize(dbConfig.sizes[0]);
                    }
                }
            } catch (err) {
                console.error("Failed to fetch frame config", err);
            }
        };
        fetchConfig();
    }, [shape]);

    // ─── Load Session ───
    useEffect(() => {
        if (typeof window === "undefined") return;
        const storedData = sessionStorage.getItem(`${type}_custom_data`);
        if (storedData) {
            try {
                const parsed = JSON.parse(storedData);
                if (parsed.photoData) {
                    setEditorData(parsed);
                    if (parsed.configuration?.size) setSelectedSize(parsed.configuration.size);
                    else if (!selectedSize && availableSizes.length > 0) setSelectedSize(availableSizes[0]);
                } else {
                    router.push(`/shop/${type}/${shape}`);
                }
            } catch { router.push(`/shop/${type}/${shape}`); }
        } else {
            router.push(`/shop/${type}/${shape}`);
        }
        const storedUser = localStorage.getItem("user");
        if (storedUser) {
            try { const p = JSON.parse(storedUser); setUserId(p.id || p._id); } catch { }
        }
    }, [shape, router]);

    // ─── Default Size ───
    useEffect(() => {
        if (!selectedSize && availableSizes.length > 0) setSelectedSize(availableSizes[0]);
    }, [availableSizes, selectedSize]);

    // ─── Price ───
    useEffect(() => {
        if (!selectedSize) return;
        const upgradeBase = upgrades.reduce((sum, u) => sum + u.price, 0);
        setTotalPrice((selectedSize.price + selectedPower.price + upgradeBase) * quantity);
    }, [selectedSize, selectedPower, upgrades, quantity]);

    // ─── Crop ───
    const getCroppedImg = useCallback(async (imageSrc, pixelCrop, rotation = 0) => {
        const image = new Image();
        image.crossOrigin = "anonymous";
        image.src = imageSrc;
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        await new Promise(r => { image.onload = r; });
        const maxSize = Math.max(image.width, image.height);
        const safeArea = 2 * ((maxSize / 2) * Math.sqrt(2));
        canvas.width = safeArea; canvas.height = safeArea;
        ctx.translate(safeArea / 2, safeArea / 2);
        ctx.rotate((rotation * Math.PI) / 180);
        ctx.translate(-safeArea / 2, -safeArea / 2);
        ctx.drawImage(image, safeArea / 2 - image.width * 0.5, safeArea / 2 - image.height * 0.5);
        const data = ctx.getImageData(0, 0, safeArea, safeArea);
        canvas.width = pixelCrop.width; canvas.height = pixelCrop.height;
        ctx.putImageData(data, -safeArea / 2 + image.width * 0.5 - pixelCrop.x, -safeArea / 2 + image.height * 0.5 - pixelCrop.y);
        return new Promise(resolve => {
            canvas.toBlob(blob => { if (blob) resolve(URL.createObjectURL(blob)); }, 'image/jpeg');
        });
    }, []);

    useEffect(() => {
        if (editorData?.photoData?.url && editorData?.configuration?.crop?.croppedAreaPixels) {
            const { croppedAreaPixels, rotation } = editorData.configuration.crop;
            getCroppedImg(editorData.photoData.url, croppedAreaPixels, rotation).then(setCroppedImageUrl);
        }
    }, [editorData, getCroppedImg]);

    // ─── Wall Preview Capture ───
    const generateWallPreview = async () => {
        if (!previewRef.current) return null;
        try {
            return await htmlToImage.toBlob(previewRef.current, {
                quality: 0.95, pixelRatio: 2, backgroundColor: '#f1eee9',
                filter: n => !(n.hasAttribute && n.hasAttribute('data-html2canvas-ignore'))
            });
        } catch { return null; }
    };

    const toggleUpgrade = (u) => {
        setUpgrades(prev => prev.find(x => x.id === u.id) ? prev.filter(x => x.id !== u.id) : [...prev, u]);
    };

    // ─── Add to Cart ───
    const handleAddToCart = async () => {
        if (!selectedSize || !editorData) return;
        if (!userId) { toast.error("Please log in to add items to cart."); return; }
        setLoading(true);
        try {
            const { photoData, configuration: prevConfig } = editorData;
            if (!frameConfig?.id) { toast.error("Product configuration missing."); return; }

            let blobToUpload = await generateWallPreview();
            if (!blobToUpload && croppedImageUrl) blobToUpload = await fetch(croppedImageUrl).then(r => r.blob());

            let finalImageUrl = photoData?.url;
            if (blobToUpload) {
                try {
                    const file = new File([blobToUpload], `preview-${Date.now()}-led.png`, { type: blobToUpload.type });
                    const formData = new FormData(); formData.append("image", file);
                    const uploadRes = await axiosInstance.post("/upload-image", formData, { headers: { "Content-Type": "multipart/form-data" } });
                    if (uploadRes.data?.imageUrl) finalImageUrl = uploadRes.data.imageUrl;
                } catch (e) { console.error("Upload failed", e); }
            }

            await axiosInstance.post("/cart", {
                userId, productId: frameConfig.id, productType: 'Backlightcustomizedata',
                title: `LED Photo Frame - ${shapeTitle}`, image: finalImageUrl,
                size: selectedSize.label, thickness: "LED", edge: "standard",
                frameType: "backlight", frameColor: "#1a1a1a",
                price: totalPrice / quantity, quantity, totalAmount: totalPrice,
                uploadedImageUrl: photoData?.url,
                customizationDetails: {
                    crop: prevConfig?.crop,
                    ledBrightness,
                    lightMode: selectedLightMode.label,
                    powerType: selectedPower.label,
                    upgrades: upgrades.map(u => u.label),
                    originalName: photoData?.name
                }
            });
            toast.success("Added to Cart!"); router.push("/cart");
        } catch (e) { console.error("Cart error", e); toast.error("Failed to add to cart."); }
        finally { setLoading(false); }
    };

    // ─── Loading ───
    if (!editorData) return (
        <div className="min-h-screen flex items-center justify-center bg-neutral-50 uppercase tracking-widest text-[10px] font-bold">
            <Loader2 className="animate-spin mr-3 text-primary w-4 h-4" /> <span className="text-secondary/60">Initializing Studio...</span>
        </div>
    );

    const imgSrc = croppedImageUrl || editorData.photoData.url;

    return (
        <div className="min-h-screen bg-white font-sans text-secondary selection:bg-blue-600/10 selection:text-blue-600" style={{ paddingTop: '80px' }}>

            {/* ═══ STICKY TOP BAR ═══ */}
            <div className="bg-white/95 backdrop-blur-md border-b border-neutral-100 sticky top-[80px] z-40">
                <div className="max-w-[1440px] mx-auto px-4 md:px-8 flex items-center justify-between h-14">
                    <div className="flex items-center gap-3">
                        <button onClick={() => router.back()} className="p-2 rounded-full hover:bg-neutral-100 transition-colors">
                            <ArrowLeft className="w-4 h-4 text-neutral-500" />
                        </button>
                        <div className="flex items-center gap-2">
                            <Star className="w-4 h-4 text-amber-500 fill-amber-500" />
                            <span className="font-extrabold text-secondary text-sm tracking-tight">Luxury LED Studio</span>
                        </div>
                        <span className="text-neutral-200 hidden sm:inline">|</span>
                        <span className="text-[10px] font-bold text-neutral-400 uppercase tracking-wider hidden sm:inline">{shapeTitle} Collection</span>
                    </div>
                    <div className="flex items-center gap-4">
                        <span className="text-sm font-extrabold text-secondary">₹{totalPrice.toLocaleString()}</span>
                        <button
                            onClick={handleAddToCart}
                            disabled={loading || !selectedSize}
                            className="bg-primary hover:bg-primary-hover text-white h-9 px-6 rounded-full text-xs font-bold uppercase tracking-wider transition-all disabled:opacity-50 flex items-center gap-2 shadow-[0_4px_12px_rgba(0,113,227,0.3)] hover:shadow-[0_6px_20px_rgba(0,113,227,0.4)] hover:-translate-y-0.5"
                        >
                            {loading ? <Loader2 className="animate-spin w-4 h-4" /> : <ShoppingCart className="w-4 h-4" />}
                            Secure Cart
                        </button>
                    </div>
                </div>
            </div>

            {/* ═══ MAIN CONTENT ═══ */}
            <div className="max-w-[1440px] mx-auto grid grid-cols-1 lg:grid-cols-12 min-h-[calc(100vh-136px)]">

                {/* ─── LEFT: Wall Preview ─── */}
                <div className="lg:col-span-7 xl:col-span-8 flex items-center justify-center p-8 md:p-12 lg:p-16">
                    <div
                        ref={previewRef}
                        className="relative w-full rounded-3xl overflow-hidden"
                        style={{
                            height: '600px',
                            maxHeight: '75vh',
                            background: '#f1eee9',
                            backgroundImage: `
                                radial-gradient(circle at 50% 10%, rgba(255,255,255,0.7) 0%, transparent 60%),
                                url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M0 50h100M50 0v100' fill='none' stroke='%23d4cfc7' stroke-opacity='0.15' stroke-width='0.5'/%3E%3C/svg%3E")
                            `,
                            boxShadow: 'inset 0 1px 40px rgba(0,0,0,0.08)',
                            border: '1px solid #e8e3dc'
                        }}
                    >
                        {/* Dynamic Gloom Overlay (reacts to brightness) */}
                        <div className="absolute inset-0 transition-opacity duration-700 pointer-events-none" style={{
                            background: 'rgba(15, 20, 30, 0.4)',
                            opacity: Math.max(0, 0.7 - (ledBrightness * 0.4))
                        }}></div>

                        {/* Adaptive Wall light effect (reacts to color mode) */}
                        <div className="absolute inset-x-0 top-0 transition-all duration-700 pointer-events-none" style={{
                            height: '100%',
                            background: `radial-gradient(circle at 50% 45%, ${selectedLightMode.color}${Math.round(ledBrightness * 40).toString(16).padStart(2, '0')}, transparent 65%)`,
                        }}></div>

                        {/* Live Preview Badge */}
                        <div data-html2canvas-ignore="true"
                            className="absolute top-6 left-6 z-30 bg-white/70 backdrop-blur-xl px-4 py-2 rounded-2xl text-[9px] font-bold text-neutral-600 uppercase tracking-[0.2em] border border-white/40 shadow-xl flex items-center gap-2"
                        >
                            <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse shadow-[0_0_8px_#22c55e]"></div>
                            Studio Simulation
                        </div>

                        {/* ═══ CENTERED FRAME ═══ */}
                        <div className="absolute inset-0 flex items-center justify-center">
                            <div
                                className="relative transition-all duration-700 ease-[cubic-bezier(0.23,1,0.32,1)]"
                                style={{
                                    height: selectedSize
                                        ? `${Math.min(Math.max((selectedSize.height / 30) * 100, 40), 75)}%`
                                        : '50%',
                                    aspectRatio: selectedSize
                                        ? `${selectedSize.width} / ${selectedSize.height}`
                                        : '2/3',
                                    maxWidth: '65%',
                                }}
                            >
                                {/* ─── LED FRAME ─── */}
                                <div
                                    className="relative w-full h-full p-[18px] transition-all duration-700"
                                    style={{
                                        background: '#121212',
                                        borderRadius: '6px',
                                        boxShadow: `
                                            inset 0 0 1px rgba(255,255,255,0.15),
                                            0 30px 60px -12px rgba(0,0,0,0.6),
                                            ${ledBrightness > 0.6 ? `0 0 50px -10px ${selectedLightMode.color}${Math.round(ledBrightness * 30).toString(16).padStart(2, '0')}` : '0 0 0 transparent'}
                                        `,
                                    }}
                                >
                                    {/* Glass reflection (dynamic) */}
                                    <div className="absolute inset-[18px] pointer-events-none z-10 transition-opacity duration-700" style={{
                                        background: 'linear-gradient(155deg, rgba(255,255,255,0.12) 0%, transparent 40%, transparent 60%, rgba(255,255,255,0.05) 100%)',
                                        opacity: 1.5 - ledBrightness,
                                        borderRadius: '2px'
                                    }}></div>

                                    {/* Inner Light Spread */}
                                    <div className="absolute inset-[15px] pointer-events-none z-0 transition-all duration-500" style={{
                                        boxShadow: `inset 0 0 ${40 * ledBrightness}px ${selectedLightMode.color}${Math.round(ledBrightness * 40).toString(16).padStart(2, '0')}`,
                                    }}></div>

                                    {/* Photo with dynamic treatment */}
                                    <div className="w-full h-full overflow-hidden rounded-[2px]">
                                        <img
                                            src={imgSrc}
                                            alt="Your LED Photo"
                                            className="w-full h-full object-cover block transition-all duration-500"
                                            style={{
                                                filter: `brightness(${0.9 + (ledBrightness * 0.4)}) contrast(${1.08 + (ledBrightness * 0.1)}) saturate(${1.05 + (ledBrightness * 0.2)})`,
                                                opacity: 0.95,
                                            }}
                                        />
                                    </div>
                                </div>

                                {/* ─── Dimension Labels ─── */}
                                {selectedSize && (
                                    <div data-html2canvas-ignore="true">
                                        <div className="absolute -bottom-10 left-0 w-full flex items-center gap-3">
                                            <div className="h-[1px] flex-1 bg-neutral-800/10"></div>
                                            <span className="text-[10px] font-bold text-neutral-500/50 whitespace-nowrap tracking-wider">
                                                {selectedSize.width}" WIDTH
                                            </span>
                                            <div className="h-[1px] flex-1 bg-neutral-800/10"></div>
                                        </div>
                                        <div className="absolute top-0 -right-12 h-full flex flex-col items-center gap-3">
                                            <div className="w-[1px] flex-1 bg-neutral-800/10"></div>
                                            <span className="text-[10px] font-bold text-neutral-500/50 whitespace-nowrap tracking-wider -rotate-90">
                                                {selectedSize.height}" HEIGHT
                                            </span>
                                            <div className="w-[1px] flex-1 bg-neutral-800/10"></div>
                                        </div>
                                    </div>
                                )}

                                {/* ─── Power Cable Simulation ─── */}
                                {selectedPower.value === 'usb' && (
                                    <div data-html2canvas-ignore="true" className="absolute bottom-0 right-10 translate-y-full flex flex-col items-center">
                                        <div className="w-1.5 h-1.5 rounded-full bg-[#121212] -mb-0.5"></div>
                                        <div className="w-[2px] h-20 transition-all duration-700" style={{
                                            background: 'linear-gradient(to bottom, #121212, transparent)',
                                            opacity: 0.4
                                        }}></div>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>

                {/* ─── RIGHT: Config Panel ─── */}
                <div className="lg:col-span-5 xl:col-span-4 border-l border-neutral-100 overflow-y-auto"
                    style={{ maxHeight: 'calc(100vh - 136px)' }}>
                    <div className="p-7 md:p-9 lg:p-12">

                        {/* Product Title */}
                        <div className="mb-10">
                            <div className="flex items-center gap-2.5 mb-3">
                                <div className="px-2.5 py-1 rounded-full bg-amber-50 border border-amber-200/50 flex items-center gap-1.5">
                                    <Sparkles className="w-3 h-3 text-amber-500" />
                                    <span className="text-[9px] font-extrabold text-amber-700 uppercase tracking-widest">Masterpiece Series</span>
                                </div>
                            </div>
                            <h1 className="text-3xl md:text-5xl font-extrabold text-slate-900 tracking-tighter leading-tight drop-shadow-sm">
                                {shapeTitle} <span className="text-blue-600 italic font-medium">Luminescence</span>
                            </h1>
                            <p className="text-sm text-slate-400 font-medium leading-relaxed">Aerospace aluminium chassis • High-density LED array</p>
                        </div>

                        {/* ─── SIZE SELECTION ─── */}
                        <div className="mb-10">
                            <h3 className="text-[11px] font-black text-slate-400 uppercase tracking-[0.25em] mb-5 flex items-center justify-between border-b border-slate-50 pb-2">
                                <span className="flex items-center gap-2"><Ruler className="w-3.5 h-3.5" /> Dimensions</span>
                                <span className="text-[10px] text-blue-600/60 lowercase italic">Choose your scale</span>
                            </h3>
                            <div className="grid grid-cols-2 gap-3.5">
                                {availableSizes.map((size, idx) => {
                                    const isSelected = selectedSize?.label === size.label;
                                    return (
                                        <button key={idx} onClick={() => setSelectedSize(size)}
                                            className={`relative p-5 rounded-2xl border-2 text-left transition-all duration-300 ${isSelected
                                                ? 'border-primary bg-primary/[0.02] shadow-[0_8px_20px_rgba(0,113,227,0.12)]'
                                                : 'border-neutral-100 hover:border-neutral-200 bg-white'
                                                }`}
                                        >
                                            <div className="font-bold text-slate-900 text-sm tracking-tight">{size.label}</div>
                                            <div className="text-xs text-slate-500 mt-2 font-bold">₹{size.price}</div>
                                            {isSelected && <div className="absolute top-4 right-4 w-4 h-4 bg-primary rounded-full flex items-center justify-center"><CheckCircle2 className="w-2.5 h-2.5 text-white" /></div>}
                                        </button>
                                    );
                                })}
                            </div>
                        </div>

                        {/* ─── LIGHT MODE SELECTION ─── */}
                        <div className="mb-10">
                            <h3 className="text-[11px] font-black text-slate-400 uppercase tracking-[0.25em] mb-5 flex items-center gap-2 border-b border-slate-50 pb-2">
                                <Sun className="w-3.5 h-3.5" /> Light Temperature
                            </h3>
                            <div className="grid grid-cols-3 gap-3">
                                {LIGHT_MODES.map((mode, i) => {
                                    const isSelected = selectedLightMode.value === mode.value;
                                    return (
                                        <button key={i} onClick={() => setSelectedLightMode(mode)}
                                            className={`p-3.5 rounded-2xl border-2 text-center transition-all duration-300 ${isSelected
                                                ? 'border-amber-400 bg-amber-50/30'
                                                : 'border-neutral-100 hover:border-neutral-200'
                                                }`}>
                                            <div className="w-7 h-7 rounded-full mx-auto mb-2 border border-neutral-100" style={{ background: mode.color }}></div>
                                            <div className={`text-[10px] font-bold ${isSelected ? 'text-amber-700' : 'text-secondary'}`}>{mode.label}</div>
                                        </button>
                                    );
                                })}
                            </div>
                        </div>

                        {/* ─── BRIGHTNESS SLIDER ─── */}
                        <div className="mb-10">
                            <div className="flex items-center justify-between mb-4">
                                <h3 className="text-[11px] font-black text-slate-400 uppercase tracking-[0.25em]">Intensity Control</h3>
                                <span className="text-sm font-bold text-slate-900 tracking-tighter">{Math.round(ledBrightness * 100)}%</span>
                            </div>
                            <div className="px-2">
                                <input type="range" min="0.3" max="1.5" step="0.05"
                                    value={ledBrightness} onChange={(e) => setLedBrightness(parseFloat(e.target.value))}
                                    className="w-full h-1.5 rounded-full appearance-none cursor-pointer bg-neutral-100 accent-primary"
                                />
                            </div>
                        </div>

                        {/* ─── POWER TYPE & UPGRADES ─── */}
                        <div className="mb-10 space-y-7">
                            <div>
                                <h3 className="text-[11px] font-black text-slate-400 uppercase tracking-[0.25em] mb-5 flex items-center gap-2 border-b border-slate-50 pb-2">
                                    <Zap className="w-3.5 h-3.5" /> Power Source
                                </h3>
                                <div className="flex gap-3">
                                    {POWER_OPTIONS.map((p, i) => {
                                        const isSelected = selectedPower.value === p.value;
                                        return (
                                            <button key={i} onClick={() => setSelectedPower(p)}
                                                className={`flex-1 p-5 rounded-3xl border-2 text-left transition-all duration-300 relative overflow-hidden group ${isSelected
                                                    ? 'border-blue-600 bg-blue-50/30'
                                                    : 'border-slate-100 hover:border-slate-200 bg-white'
                                                    }`}>
                                                {isSelected && <div className="absolute top-0 right-0 w-12 h-12 bg-blue-600/10 rounded-bl-3xl flex items-center justify-center"><CheckCircle2 className="w-4 h-4 text-blue-600" /></div>}
                                                <div className={`text-sm font-bold tracking-tight ${isSelected ? 'text-blue-900' : 'text-slate-900'}`}>{p.label}</div>
                                                <div className="text-[11px] text-slate-500 font-medium mt-1">{p.desc}</div>
                                                <div className={`text-xs font-black mt-3 ${isSelected ? 'text-blue-600' : 'text-slate-400'}`}>{p.price === 0 ? 'Included' : `+ ₹${p.price}`}</div>
                                            </button>
                                        );
                                    })}
                                </div>
                            </div>

                            <div>
                                <h3 className="text-[11px] font-black text-slate-400 uppercase tracking-[0.25em] mb-5 flex items-center gap-2 border-b border-slate-50 pb-2">
                                    <Shield className="w-3.5 h-3.5" /> Smart Upgrades
                                </h3>
                                <div className="space-y-3">
                                    {SMART_UPGRADES.map((u, i) => {
                                        const isSelected = !!upgrades.find(x => x.id === u.id);
                                        return (
                                            <button key={i} onClick={() => toggleUpgrade(u)}
                                                className={`w-full flex items-center justify-between p-5 rounded-3xl border-2 transition-all duration-300 relative overflow-hidden ${isSelected
                                                    ? 'border-blue-600 bg-blue-50/30 shadow-sm'
                                                    : 'border-slate-100 hover:border-slate-200 bg-white'
                                                    }`}>
                                                <div className="flex items-center gap-4">
                                                    <div className="text-left">
                                                        <div className={`text-sm font-bold tracking-tight ${isSelected ? 'text-blue-900' : 'text-slate-900'}`}>{u.label}</div>
                                                        <div className="text-[11px] text-slate-500 font-medium">{u.desc}</div>
                                                    </div>
                                                </div>
                                                <div className="flex items-center gap-4">
                                                    <div className={`text-xs font-black ${isSelected ? 'text-blue-600' : 'text-slate-400'}`}>+ ₹{u.price}</div>
                                                    {isSelected && <CheckCircle2 className="w-5 h-5 text-blue-600" />}
                                                </div>
                                            </button>
                                        );
                                    })}
                                </div>
                            </div>
                        </div>

                        {/* ─── SUMMARY & CART ─── */}
                        <div className="pt-8 border-t border-neutral-100">
                            <div className="flex items-end justify-between mb-8">
                                <div>
                                    <h3 className="text-[11px] font-extrabold text-slate-400 uppercase tracking-[0.3em] flex items-center gap-3 mb-3">
                                        Project Forecast
                                    </h3>
                                    <div className="flex items-center gap-3">
                                        <div className="flex items-center bg-slate-50 rounded-2xl p-1.5 border border-slate-100 shadow-inner">
                                            <button onClick={() => setQuantity(Math.max(1, quantity - 1))} className="w-10 h-8 text-slate-400 hover:text-blue-600 font-black transition-colors">−</button>
                                            <span className="w-10 text-center text-sm font-bold text-slate-900">{quantity}</span>
                                            <button onClick={() => setQuantity(quantity + 1)} className="w-10 h-8 text-slate-400 hover:text-blue-600 font-black transition-colors">+</button>
                                        </div>
                                    </div>
                                </div>
                                <div className="text-right">
                                    <div className="text-[10px] font-bold text-slate-300 mb-0.5 line-through decoration-slate-200 uppercase tracking-widest">₹{(totalPrice * 1.2).toLocaleString()}</div>
                                    <div className="text-4xl font-bold text-slate-950 tracking-tighter">₹{totalPrice.toLocaleString()}</div>
                                </div>
                            </div>

                            <button onClick={handleAddToCart} disabled={loading || !selectedSize}
                                className="w-full bg-secondary hover:bg-black text-white py-5 rounded-2xl font-black text-[13px] uppercase tracking-[0.15em] shadow-2xl hover:-translate-y-1 transition-all flex items-center justify-center gap-3 disabled:opacity-50"
                            >
                                {loading ? <Loader2 className="animate-spin w-5 h-5 text-white/40" /> : <ChevronRight className="w-5 h-5 translate-x-1" />}
                                Finalize & Add to Cart
                            </button>
                        </div>

                        {/* ─── FOOTER FEATURES ─── */}
                        <div className="mt-12 grid grid-cols-2 gap-4">
                            {[
                                { icon: <Package className="w-4 h-4" />, label: "Luxury Gifting Box" },
                                { icon: <Shield className="w-4 h-4" />, label: "Lifetime LED Life" },
                            ].map((item, i) => (
                                <div key={i} className="flex items-center gap-3 p-4 bg-slate-50 rounded-2xl border border-slate-100 shadow-sm transition-all hover:bg-slate-100">
                                    <div className="text-slate-400 shrink-0">{item.icon}</div>
                                    <span className="text-[10px] font-bold text-slate-500 leading-tight uppercase tracking-widest">{item.label}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default BacklightSizeSelector;
