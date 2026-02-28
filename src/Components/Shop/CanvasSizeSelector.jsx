"use client";
import React, { useState, useEffect, useCallback, useRef } from "react";
import { useRouter } from "next/navigation";
import {
    Sparkles, CheckCircle2, Ruler, ShoppingCart, Loader2,
    Package, Truck, Lock, ArrowLeft, Eye, Star, Check,
    Shield, Layers, Scissors
} from "lucide-react";
import { toast } from "react-toastify";
import * as htmlToImage from 'html-to-image';
import axiosInstance from "../../utils/axiosInstance";
import { useCart } from "@/context/CartContext";

// ─── Canvas Sizes ───
const SIZES = {
    portrait: [
        { label: '12×18"', price: 899, width: 12, height: 18 },
        { label: '16×24"', price: 1499, width: 16, height: 24 },
        { label: '20×30"', price: 2199, width: 20, height: 30 },
        { label: '24×36"', price: 2999, width: 24, height: 36 },
    ],
    landscape: [
        { label: '18×12"', price: 899, width: 18, height: 12 },
        { label: '24×16"', price: 1499, width: 24, height: 16 },
        { label: '30×20"', price: 2199, width: 30, height: 20 },
        { label: '36×24"', price: 2999, width: 36, height: 24 },
    ],
    square: [
        { label: '12×12"', price: 699, width: 12, height: 12 },
        { label: '16×16"', price: 1199, width: 16, height: 16 },
        { label: '24×24"', price: 1999, width: 24, height: 24 },
    ],
    default: [
        { label: '12×12"', price: 799, width: 12, height: 12 },
        { label: '16×16"', price: 1299, width: 16, height: 16 },
    ]
};

const THICKNESS_OPTIONS = [
    { label: "Standard", price: 0, value: "standard", desc: '0.75" depth' },
    { label: "Gallery Wrap", price: 400, value: "gallery", desc: '1.5" depth' },
];

const EDGE_OPTIONS = [
    { label: "Image Wrap", price: 0, value: "wrap", desc: "Image extends around edges" },
    { label: "Mirror Wrap", price: 200, value: "mirror", desc: "Edges mirror the image" },
    { label: "White Border", price: 0, value: "white", desc: "Clean white edges" },
];

const CanvasSizeSelector = ({ shape }) => {
    const router = useRouter();
    const type = "canvas";

    // ─── State ───
    const [editorData, setEditorData] = useState(null);
    const [frameConfig, setFrameConfig] = useState(null);
    const [selectedSize, setSelectedSize] = useState(null);
    const [selectedThickness, setSelectedThickness] = useState(THICKNESS_OPTIONS[0]);
    const [selectedEdge, setSelectedEdge] = useState(EDGE_OPTIONS[0]);
    const [quantity, setQuantity] = useState(1);
    const [totalPrice, setTotalPrice] = useState(0);
    const [loading, setLoading] = useState(false);
    const [userId, setUserId] = useState(null);
    const { addToCart } = useCart();
    const [croppedImageUrl, setCroppedImageUrl] = useState(null);
    const previewRef = useRef(null);

    // ─── Derived ───
    const shapeTitle = shape.charAt(0).toUpperCase() + shape.slice(1);
    const shapeKey = ["portrait", "landscape", "square"].includes(shape) ? shape : "default";
    const availableSizes = frameConfig?.sizes || SIZES[shapeKey] || SIZES.default;

    // ─── Fetch Frame Config ───
    useEffect(() => {
        (async () => {
            try {
                const res = await axiosInstance.get(`frames/${type}?shape=${shape}`);
                if (res.data?.length > 0) {
                    setFrameConfig(res.data[0]);
                }
            } catch (err) { console.error(err); }
        })();
    }, [type, shape]);

    // ─── Load Session ───
    useEffect(() => {
        if (typeof window === "undefined") return;
        const storedData = sessionStorage.getItem(`${type}_custom_data`);
        if (storedData) {
            try {
                const parsed = JSON.parse(storedData);
                if (parsed.photoData) {
                    setEditorData(parsed);
                } else {
                    router.push(`/shop/${type}/${shape}`);
                }
            } catch (e) {
                router.push(`/shop/${type}/${shape}`);
            }
        } else {
            router.push(`/shop/${type}/${shape}`);
        }
        try {
            const u = JSON.parse(localStorage.getItem("user"));
            if (u) setUserId(u.id || u._id);
        } catch (e) { }
    }, [type, shape, router]);

    // ─── Default Size ───
    useEffect(() => {
        if (availableSizes.length > 0 && !availableSizes.find(s => s.label === selectedSize?.label)) {
            setSelectedSize(availableSizes[0]);
        }
    }, [availableSizes]);

    // ─── Price ───
    useEffect(() => {
        if (!selectedSize) return;
        setTotalPrice((selectedSize.price + selectedThickness.price + selectedEdge.price) * quantity);
    }, [selectedSize, selectedThickness, selectedEdge, quantity]);

    // ─── Crop ───
    const getCroppedImg = useCallback(async (src, pixelCrop, rot = 0) => {
        const image = new Image(); image.crossOrigin = "anonymous"; image.src = src;
        const canvas = document.createElement('canvas'); const ctx = canvas.getContext('2d');
        await new Promise((r) => { image.onload = r; });
        const max = Math.max(image.width, image.height);
        const safe = 2 * ((max / 2) * Math.sqrt(2));
        canvas.width = safe; canvas.height = safe;
        ctx.translate(safe / 2, safe / 2); ctx.rotate((rot * Math.PI) / 180);
        ctx.translate(-safe / 2, -safe / 2);
        ctx.drawImage(image, safe / 2 - image.width * 0.5, safe / 2 - image.height * 0.5);
        const data = ctx.getImageData(0, 0, safe, safe);
        canvas.width = pixelCrop.width; canvas.height = pixelCrop.height;
        ctx.putImageData(data, -safe / 2 + image.width * 0.5 - pixelCrop.x, -safe / 2 + image.height * 0.5 - pixelCrop.y);
        return new Promise((resolve) => { canvas.toBlob((b) => { if (b) resolve(URL.createObjectURL(b)); }, 'image/jpeg'); });
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
                quality: 0.95, pixelRatio: 2, backgroundColor: '#f5f5f5',
                filter: (n) => !(n.hasAttribute && n.hasAttribute('data-html2canvas-ignore'))
            });
        } catch (e) { return null; }
    };

    // ─── Add to Cart ───
    const handleAddToCart = async () => {
        if (!selectedSize || !editorData) return;
        // Guest cart is supported; no login required to add to cart
        setLoading(true);
        try {
            const { photoData } = editorData;
            if (!frameConfig?.id) { toast.error("Product configuration missing."); setLoading(false); return; }

            let blob = await generateWallPreview();
            if (!blob && croppedImageUrl) blob = await fetch(croppedImageUrl).then(r => r.blob());
            let finalUrl = photoData?.url;
            if (blob) {
                try {
                    const f = new File([blob], `canvas-${Date.now()}.png`, { type: blob.type });
                    const fd = new FormData(); fd.append("image", f);
                    const r = await axiosInstance.post("/upload-image", fd, { headers: { "Content-Type": "multipart/form-data" } });
                    if (r.data?.imageUrl) finalUrl = r.data.imageUrl;
                } catch (e) { }
            }
            const cartPayload = {
                productId: frameConfig.id,
                productType: 'Canvascustomizedata',
                title: `Canvas ${shapeTitle} Frame`,
                image: finalUrl,
                size: selectedSize.label,
                thickness: selectedThickness?.value,
                price: totalPrice / quantity,
                quantity,
                totalAmount: totalPrice,
                uploadedImageUrl: photoData?.url,
            };
            const result = await addToCart(cartPayload);
            if (result?.success) { toast.success("Added to Cart!"); router.push("/cart"); } else { toast.error("Failed to add to cart."); }
        } catch (e) { console.error(e); toast.error("Failed to add to cart."); }
        finally { setLoading(false); }
    };

    // ─── Frame Size Calc ───
    const getFrameStyle = () => {
        if (!selectedSize) return { width: '260px', aspectRatio: '3/4' };
        const maxW = 360, maxH = 340;
        const aspect = selectedSize.width / selectedSize.height;
        let w, h;
        if (aspect >= 1) { w = maxW; h = maxW / aspect; if (h > maxH) { h = maxH; w = maxH * aspect; } }
        else { h = maxH; w = maxH * aspect; if (w > maxW) { w = maxW; h = maxW / aspect; } }
        return { width: `${w}px`, height: `${h}px` };
    };

    const getSizeDisplay = (size) => {
        if (!size) return "";
        if (size.width && size.height) return `${size.width}×${size.height}"`;
        return String(size.label || "").replace(/\s*inches?/gi, "").replace(/"/g, "").replace(/×/g, "×").trim();
    };

    // ─── Loading ───
    if (!editorData) return (
        <div className="min-h-screen flex items-center justify-center bg-neutral-50">
            <Loader2 className="animate-spin mr-2 text-primary" /> <span className="text-secondary">Loading...</span>
        </div>
    );

    const imgSrc = croppedImageUrl || editorData.photoData.url;

    return (
        <div className="min-h-screen bg-white" style={{ paddingTop: '80px' }}>

            {/* ═══ STICKY TOP BAR ═══ */}
            <div className="bg-white/95 backdrop-blur-md border-b border-neutral-100 sticky top-[80px] z-40">
                <div className="max-w-[1440px] mx-auto px-4 md:px-8 flex items-center justify-between h-14">
                    <div className="flex items-center gap-3">
                        <button onClick={() => router.back()} className="p-2 rounded-full hover:bg-neutral-100 transition-colors">
                            <ArrowLeft className="w-4 h-4 text-neutral-500" />
                        </button>
                        <div className="flex items-center gap-2">
                            <Layers className="w-4 h-4 text-primary" />
                            <span className="font-semibold text-secondary text-sm">Canvas Prints</span>
                        </div>
                        <span className="text-neutral-200 hidden sm:inline">|</span>
                        <span className="text-xs text-neutral-400 hidden sm:inline">{shapeTitle}</span>
                    </div>
                    <div className="flex items-center gap-4">
                        <span className="text-sm font-bold text-secondary">₹{totalPrice.toLocaleString()}</span>
                        <button
                            onClick={handleAddToCart}
                            disabled={loading || !selectedSize}
                            className="bg-primary hover:bg-primary-hover text-white h-9 px-5 rounded-full text-sm font-semibold transition-all disabled:opacity-50 flex items-center gap-2 shadow-sm"
                        >
                            {loading ? <Loader2 className="animate-spin w-4 h-4" /> : <ShoppingCart className="w-4 h-4" />}
                            Add to Cart
                        </button>
                    </div>
                </div>
            </div>

            {/* ═══ MAIN CONTENT ═══ */}
            <div className="max-w-[1440px] mx-auto grid grid-cols-1 lg:grid-cols-12 min-h-[calc(100vh-136px)]">

                {/* ─── LEFT: Easel Preview ─── */}
                <div className="lg:col-span-7 xl:col-span-8 flex items-start justify-center p-6 md:p-8 lg:p-10 xl:p-12 relative">
                    <div className="sticky top-24 w-full">
                        <div
                            ref={previewRef}
                            className="relative w-full rounded-[24px] overflow-hidden flex items-center justify-center"
                            style={{
                                height: '580px',
                                maxHeight: '74vh',
                                background: '#dcdada',
                                border: '1px solid rgba(0,0,0,0.06)',
                            }}
                        >
                            {/* Realistic coarse wallpaper / plaster texture */}
                            <div style={{
                                position: 'absolute', inset: 0, pointerEvents: 'none',
                                backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.12'/%3E%3C/svg%3E")`,
                            }} />

                            {/* Lighting gradient over the wall */}
                            <div style={{
                                position: 'absolute', inset: 0, pointerEvents: 'none',
                                background: 'radial-gradient(circle at 30% 20%, rgba(255,255,255,0.4) 0%, transparent 70%)'
                            }} />

                            {/* Live Preview Badge */}
                            <div data-html2canvas-ignore="true"
                                className="absolute top-5 left-5 z-30 bg-white/50 backdrop-blur-md px-4 py-2 rounded-full text-[11px] font-bold text-neutral-700 shadow-sm flex items-center gap-2 border border-black/5"
                            >
                                <Sparkles className="w-3.5 h-3.5 text-primary" /> Live Preview
                            </div>

                            {/* Dynamic Size Header Title */}
                            {selectedSize && (
                                <div className="absolute top-6 left-1/2 -translate-x-1/2 z-20 flex items-center gap-3 w-3/4 justify-center">
                                    <div className="h-px bg-neutral-800/80 w-full relative">
                                        <div className="absolute right-0 top-1/2 -translate-y-1/2 w-1.5 h-1.5 rounded-full bg-neutral-800/80"></div>
                                    </div>
                                    <span className="text-sm font-black text-neutral-800/90 whitespace-nowrap tracking-wider">
                                        {selectedSize.width}×{selectedSize.height} Canvas Frame
                                    </span>
                                    <div className="h-px bg-neutral-800/80 w-full relative">
                                        <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1.5 h-1.5 rounded-full bg-neutral-800/80"></div>
                                    </div>
                                </div>
                            )}

                            {/* Edit button */}
                            <button data-html2canvas-ignore="true"
                                className="absolute top-5 right-5 z-30 flex items-center gap-1.5 px-3 py-1.5 bg-white/90 backdrop-blur border border-neutral-200/60 rounded-lg text-[11px] font-bold text-neutral-600 cursor-pointer transition-all shadow-sm hover:border-primary hover:text-primary"
                                onClick={() => router.back()}>
                                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" /><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" /></svg>
                                Edit Photo
                            </button>

                            {/* ── Wall Mounted 3D Canvas Scene ── */}
                            <div className="relative flex items-center justify-center w-full h-full p-8 md:p-12 lg:p-16">

                                {/* Inner wrapper for 3D context */}
                                <div className="relative flex items-center justify-center z-10" style={{ width: '80%', maxWidth: '520px' }}>

                                    {/* ── True 3D Canvas ── */}
                                    {(() => {
                                        // Increased the thickness drastically to make it look like a very bold 3D shape
                                        const depth = selectedThickness?.value === 'gallery' ? 42 : 24;
                                        const edgeLeftBg = selectedEdge?.value === 'wrap' || selectedEdge?.value === 'mirror'
                                            ? `url(${imgSrc}) left center / cover no-repeat`
                                            : 'linear-gradient(to left, #e0dcd5, #cac4bc)';
                                        const edgeBottomBg = selectedEdge?.value === 'wrap' || selectedEdge?.value === 'mirror'
                                            ? `url(${imgSrc}) bottom center / cover no-repeat`
                                            : 'linear-gradient(to bottom, #d4cfc7, #bcbed)';

                                        // Calculate relative scale to make bigger canvases look physically bigger
                                        const maxWidth = Math.max(...availableSizes.map(s => s.width || 10));
                                        const scaleFactor = selectedSize ? (0.75 + 0.25 * (selectedSize.width / maxWidth)) : 1;

                                        // Adding key triggers a small unmount/remount CSS animation when size changes, proving the update happened.
                                        return (
                                            <div
                                                key={selectedSize?.label} // <--- fixes the "not working" visual feedback
                                                className="relative hover:scale-[1.02] transition-transform duration-700 ease-out animate-in fade-in zoom-in-95"
                                                style={{
                                                    width: '100%',
                                                    aspectRatio: selectedSize ? `${selectedSize.width} / ${selectedSize.height}` : '4/3',
                                                    maxHeight: '380px',
                                                    margin: 'auto',
                                                    transformStyle: 'preserve-3d',
                                                    // Scaled dynamically, reduced rotation to prevent clipping bounds
                                                    transform: `perspective(1200px) rotateY(18deg) rotateX(6deg) scale(${scaleFactor}) translateY(10px)`,
                                                    zIndex: 10,
                                                    // Sharp, directional wall drop-shadow mimicking the reference
                                                    filter: 'drop-shadow(-25px 25px 15px rgba(0,0,0,0.4)) drop-shadow(-8px 10px 8px rgba(0,0,0,0.25))',
                                                }}
                                            >
                                                {/* ── Front Face ── */}
                                                <div className="absolute inset-0 overflow-hidden bg-white" style={{ borderRadius: '2px', zIndex: 2, backfaceVisibility: 'hidden' }}>
                                                    {/* Optional White Margin if White Border is selected */}
                                                    {selectedEdge?.value === 'white' && (
                                                        <div style={{ position: 'absolute', inset: 0, border: '16px solid #ffffff', zIndex: 4, boxSizing: 'border-box', pointerEvents: 'none' }} />
                                                    )}

                                                    {/* The loaded photo */}
                                                    <img src={imgSrc} alt="Your Canvas" className="w-full h-full object-cover block" />

                                                    {/* Authentic linen weave texture overlay */}
                                                    <div style={{
                                                        position: 'absolute', inset: 0, pointerEvents: 'none', zIndex: 3, mixBlendMode: 'multiply', opacity: 0.6,
                                                        backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='weave'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3CfeColorMatrix type='matrix' values='1 0 0 0 0, 0 1 0 0 0, 0 0 1 0 0, 0 0 0 0.08 0'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23weave)'/%3E%3C/svg%3E")`,
                                                    }} />

                                                    {/* Elegant studio gloss sheen mimicking daylight from top right */}
                                                    <div style={{
                                                        position: 'absolute', inset: 0, pointerEvents: 'none', zIndex: 5,
                                                        background: 'linear-gradient(215deg, rgba(255,255,255,0.22) 0%, rgba(255,255,255,0.02) 45%, transparent 60%)',
                                                    }} />
                                                </div>

                                                {/* ── Left Side Face (Edge) ── */}
                                                <div style={{
                                                    position: 'absolute',
                                                    top: 0, left: 0,
                                                    width: `${depth}px`, height: '100%',
                                                    transform: `rotateY(-90deg) translateZ(0px)`,
                                                    transformOrigin: 'left center',
                                                    background: edgeLeftBg,
                                                    zIndex: 1,
                                                    overflow: 'hidden',
                                                }}>
                                                    {/* Depth shading */}
                                                    <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to right, rgba(0,0,0,0.4), rgba(0,0,0,0.15))' }} />
                                                    {/* Canvas folds / texture lines on the side */}
                                                    <div style={{ position: 'absolute', inset: 0, backgroundImage: 'repeating-linear-gradient(90deg, transparent, transparent 4px, rgba(0,0,0,0.03) 4px, rgba(0,0,0,0.03) 5px)' }} />
                                                </div>

                                                {/* ── Bottom Side Face (Edge) ── */}
                                                <div style={{
                                                    position: 'absolute',
                                                    bottom: 0, left: 0,
                                                    width: '100%', height: `${depth}px`,
                                                    transform: `rotateX(-90deg) translateZ(0px)`,
                                                    transformOrigin: 'bottom center',
                                                    background: edgeBottomBg,
                                                    zIndex: 1,
                                                    overflow: 'hidden',
                                                }}>
                                                    {/* Depth shading */}
                                                    <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(0,0,0,0.65), rgba(0,0,0,0.3))' }} />
                                                </div>
                                            </div>
                                        );
                                    })()}
                                </div>
                            </div>

                            {/* Size badge */}
                            {selectedSize && (
                                <div data-html2canvas-ignore="true" className="absolute bottom-5 left-1/2 -translate-x-1/2 z-30 bg-white/90 backdrop-blur px-4 py-1.5 rounded-full text-[11px] font-bold text-neutral-600 shadow-sm border border-neutral-200/50 flex items-center gap-1.5">
                                    <Ruler className="w-3 h-3 text-primary" />
                                    {selectedSize.width}" × {selectedSize.height}"
                                    <span className="mx-1 text-neutral-300">·</span>
                                    {selectedThickness?.label}
                                </div>
                            )}
                        </div>

                        {/* Features List */}
                        <div className="mt-5 grid grid-cols-3 gap-4">
                            <div className="bg-white p-4 rounded-xl border border-neutral-100 flex flex-col items-center justify-center gap-2 shadow-[0_2px_10px_rgba(0,0,0,0.02)]">
                                <Package className="w-5 h-5 text-primary" />
                                <span className="text-[11px] font-bold text-secondary uppercase tracking-wider text-center">Gallery Quality</span>
                            </div>
                            <div className="bg-white p-4 rounded-xl border border-neutral-100 flex flex-col items-center justify-center gap-2 shadow-[0_2px_10px_rgba(0,0,0,0.02)]">
                                <Truck className="w-5 h-5 text-primary" />
                                <span className="text-[11px] font-bold text-secondary uppercase tracking-wider text-center">Fast Shipping</span>
                            </div>
                            <div className="bg-white p-4 rounded-xl border border-neutral-100 flex flex-col items-center justify-center gap-2 shadow-[0_2px_10px_rgba(0,0,0,0.02)]">
                                <Shield className="w-5 h-5 text-primary" />
                                <span className="text-[11px] font-bold text-secondary uppercase tracking-wider text-center">Lifetime Warranty</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* ─── RIGHT: Config Panel ─── */}
                <div className="lg:col-span-5 xl:col-span-4 border-l border-neutral-100 overflow-y-auto"
                    style={{ maxHeight: 'calc(100vh - 136px)' }}>
                    <div className="p-6 md:p-8 lg:p-10">

                        {/* Product Title */}
                        <div className="mb-8">
                            <div className="flex items-center gap-2 mb-2">
                                <div className="w-7 h-7 rounded-lg bg-primary/10 flex items-center justify-center">
                                    <Layers className="w-4 h-4 text-primary" />
                                </div>
                                <span className="text-xs font-semibold text-primary uppercase tracking-widest">Canvas Print</span>
                            </div>
                            <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight leading-tight mb-2">{shapeTitle} Canvas</h1>
                            <p className="text-sm text-slate-400 mt-1.5 leading-relaxed">Premium poly-cotton blend • Solid wood stretcher bars • Ready to hang</p>
                        </div>

                        {/* ─── SIZE SELECTION ─── */}
                        <div className="mb-8">
                            <h3 className="text-[11px] font-black text-slate-400 uppercase tracking-[0.25em] mb-4 flex items-center gap-2 border-b border-slate-50 pb-2">
                                <Ruler className="w-3.5 h-3.5" /> Select Size
                            </h3>
                            <div className="grid grid-cols-2 gap-3">
                                {availableSizes.map((size, idx) => {
                                    const isSelected = selectedSize?.label === size.label;
                                    return (
                                        <button
                                            key={idx}
                                            onClick={() => setSelectedSize(size)}
                                            className={`relative p-4 rounded-2xl border-2 text-left transition-all duration-200 ${isSelected
                                                ? 'border-primary bg-primary/5 shadow-md ring-1 ring-primary/20'
                                                : 'border-neutral-100 hover:border-neutral-200 hover:shadow-sm bg-white'
                                                }`}
                                        >
                                            <div className={`text-sm font-bold ${isSelected ? 'text-primary' : 'text-secondary'}`}>
                                                {getSizeDisplay(size)}
                                            </div>
                                            <div className="text-xs text-neutral-400 mt-1 font-medium">
                                                ₹{size.price.toLocaleString()}
                                            </div>
                                            {isSelected && (
                                                <CheckCircle2 className="absolute top-3 right-3 w-4 h-4 text-primary" />
                                            )}
                                        </button>
                                    );
                                })}
                            </div>
                        </div>

                        {/* ─── CANVAS DEPTH ─── */}
                        <div className="mb-8">
                            <h3 className="text-[11px] font-black text-slate-400 uppercase tracking-[0.25em] mb-4 flex items-center gap-2 border-b border-slate-50 pb-2">
                                <Layers className="w-3.5 h-3.5" /> Canvas Depth
                            </h3>
                            <div className="flex gap-3">
                                {THICKNESS_OPTIONS.map((t, i) => {
                                    const isSelected = selectedThickness.value === t.value;
                                    return (
                                        <button key={i}
                                            onClick={() => setSelectedThickness(t)}
                                            className={`flex-1 p-4 rounded-2xl border-2 text-center transition-all duration-200 ${isSelected
                                                ? 'border-primary bg-primary/5 shadow-md ring-1 ring-primary/20'
                                                : 'border-neutral-100 hover:border-neutral-200 hover:shadow-sm bg-white'
                                                }`}>
                                            <div className={`text-[13px] font-bold ${isSelected ? 'text-primary' : 'text-secondary'}`}>{t.label}</div>
                                            <div className="text-[10px] text-neutral-400 mt-1">{t.desc}</div>
                                            <div className="text-[11px] text-primary font-semibold mt-2">
                                                {t.price === 0 ? 'Included' : `+ ₹${t.price}`}
                                            </div>
                                        </button>
                                    );
                                })}
                            </div>
                        </div>

                        {/* ─── EDGE FINISH ─── */}
                        <div className="mb-8">
                            <h3 className="text-[11px] font-black text-slate-400 uppercase tracking-[0.25em] mb-4 flex items-center gap-2 border-b border-slate-50 pb-2">
                                <Scissors className="w-3.5 h-3.5" /> Edge Finish
                            </h3>
                            <div className="space-y-2">
                                {EDGE_OPTIONS.map((e, i) => {
                                    const isSelected = selectedEdge.value === e.value;
                                    return (
                                        <button key={i}
                                            onClick={() => setSelectedEdge(e)}
                                            className={`w-full flex items-center justify-between p-4 rounded-2xl border-2 text-left transition-all duration-200 ${isSelected
                                                ? 'border-primary bg-primary/5 shadow-md ring-1 ring-primary/20'
                                                : 'border-neutral-100 hover:border-neutral-200 hover:shadow-sm bg-white'
                                                }`}>
                                            <div>
                                                <div className={`text-[13px] font-bold ${isSelected ? 'text-primary' : 'text-secondary'}`}>{e.label}</div>
                                                <div className="text-[10px] text-neutral-400 mt-0.5">{e.desc}</div>
                                            </div>
                                            <div className="flex items-center gap-2">
                                                <span className="text-[11px] font-semibold text-primary">
                                                    {e.price === 0 ? 'Free' : `+ ₹${e.price}`}
                                                </span>
                                                {isSelected && <CheckCircle2 className="w-4 h-4 text-primary" />}
                                            </div>
                                        </button>
                                    );
                                })}
                            </div>
                        </div>

                        {/* ─── QUANTITY ─── */}
                        <div className="mb-8">
                            <h3 className="text-[11px] font-black text-slate-400 uppercase tracking-[0.25em] mb-4 border-b border-slate-50 pb-2">Quantity</h3>
                            <div className="flex items-center border border-neutral-200 rounded-xl overflow-hidden w-fit">
                                <button onClick={() => setQuantity(Math.max(1, quantity - 1))}
                                    className="w-10 h-10 flex items-center justify-center hover:bg-neutral-50 text-neutral-500 font-medium transition-colors text-lg">−</button>
                                <span className="w-12 h-10 flex items-center justify-center font-bold text-sm text-secondary border-x border-neutral-200">{quantity}</span>
                                <button onClick={() => setQuantity(quantity + 1)}
                                    className="w-10 h-10 flex items-center justify-center hover:bg-neutral-50 text-neutral-500 font-medium transition-colors text-lg">+</button>
                            </div>
                        </div>

                        {/* ─── PRICE SUMMARY ─── */}
                        <div className="border-t border-neutral-100 pt-6 mb-6">
                            <div className="flex items-end justify-between">
                                <div>
                                    <p className="text-xs text-neutral-400 mb-0.5">
                                        {quantity} × ₹{selectedSize ? ((selectedSize.price + selectedThickness.price + selectedEdge.price)).toLocaleString() : 0}
                                    </p>
                                    <p className="text-[10px] text-neutral-300">Inclusive of all taxes</p>
                                </div>
                                <div className="text-right">
                                    <span className="text-3xl font-extrabold text-secondary">₹{totalPrice.toLocaleString()}</span>
                                </div>
                            </div>
                        </div>

                        {/* ─── ADD TO CART ─── */}
                        <button
                            onClick={handleAddToCart}
                            disabled={loading || !selectedSize}
                            className="w-full bg-primary hover:bg-primary-hover text-white py-4 rounded-2xl font-bold text-[15px] shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all flex items-center justify-center gap-3 disabled:opacity-50 disabled:cursor-not-allowed active:scale-[0.98]"
                        >
                            {loading ? <Loader2 className="animate-spin w-5 h-5" /> : <ShoppingCart className="w-5 h-5" />}
                            Add To Cart
                        </button>
                        <p className="text-[10px] text-center text-neutral-300 mt-3">
                            Secure checkout · Free shipping over ₹999
                        </p>

                        {/* ─── FEATURES ─── */}
                        <div className="mt-10 space-y-3">
                            <h3 className="text-[11px] font-bold text-neutral-400 uppercase tracking-[0.15em] mb-3">About Our Canvas</h3>
                            {[
                                { icon: <Star className="w-4 h-4" />, label: "400gsm poly-cotton blend, vibrant colours" },
                                { icon: <Package className="w-4 h-4" />, label: "Kiln-dried pine stretcher bars, warp-free" },
                                { icon: <Check className="w-4 h-4" />, label: "Ready to hang with sawtooth hangers" },
                                { icon: <Truck className="w-4 h-4" />, label: "Free express shipping" },
                                { icon: <Shield className="w-4 h-4" />, label: "Quality guarantee & safe packaging" },
                            ].map((item, i) => (
                                <div key={i} className="flex items-center gap-3 py-2">
                                    <div className="w-8 h-8 rounded-lg bg-neutral-50 flex items-center justify-center text-neutral-400 shrink-0">
                                        {item.icon}
                                    </div>
                                    <span className="text-xs font-medium text-neutral-500">{item.label}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CanvasSizeSelector;
