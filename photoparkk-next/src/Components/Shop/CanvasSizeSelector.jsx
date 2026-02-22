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
        if (!userId) { toast.error("Please log in to add items to cart."); return; }
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
            await axiosInstance.post("/cart", {
                userId, productId: frameConfig.id, productType: 'Canvascustomizedata',
                title: `Canvas ${shapeTitle} Frame`, image: finalUrl, size: selectedSize.label,
                thickness: selectedThickness.value, edge: selectedEdge.value,
                frameType: 'none', frameColor: null,
                price: totalPrice / quantity, quantity, totalAmount: totalPrice,
                uploadedImageUrl: photoData?.url,
                customizationDetails: {
                    crop: editorData.configuration?.crop, thickness: selectedThickness,
                    edge: selectedEdge, originalName: photoData?.name
                }
            });
            toast.success("Added to Cart!"); router.push("/cart");
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

                {/* ─── LEFT: Wall Preview ─── */}
                <div className="lg:col-span-7 xl:col-span-8 flex items-center justify-center p-8 md:p-12 lg:p-16">
                    <div
                        ref={previewRef}
                        className="relative w-full rounded-3xl overflow-hidden"
                        style={{
                            height: '600px',
                            maxHeight: '75vh',
                            background: '#f7f7f7',
                            backgroundImage: `
                                radial-gradient(circle at 20% 25%, rgba(255,255,255,0.9) 0%, rgba(255,255,255,0) 42%),
                                radial-gradient(circle at 78% 72%, rgba(0,0,0,0.035) 0%, rgba(0,0,0,0) 38%)
                            `,
                            boxShadow: 'inset 0 1px 30px rgba(0,0,0,0.06)',
                            border: '1px solid #e8e8e8'
                        }}
                    >
                        {/* Wall texture */}
                        <div className="absolute inset-0 pointer-events-none" style={{
                            backgroundImage: `
                                repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,0,0,0.012) 2px, rgba(0,0,0,0.012) 3px),
                                repeating-linear-gradient(90deg, transparent, transparent 2px, rgba(0,0,0,0.008) 2px, rgba(0,0,0,0.008) 3px)
                            `,
                            opacity: 0.45,
                        }}></div>
                        {/* Wall light */}
                        <div className="absolute inset-0 pointer-events-none" style={{
                            background: 'linear-gradient(180deg, rgba(255,255,255,0.22) 0%, rgba(255,255,255,0.08) 100%)',
                        }}></div>

                        {/* Live Preview Badge */}
                        <div data-html2canvas-ignore="true"
                            className="absolute top-5 left-5 z-30 bg-white/80 backdrop-blur-md px-3 py-1.5 rounded-full text-[10px] font-semibold text-neutral-500 uppercase tracking-widest border border-neutral-200/50 shadow-sm flex items-center gap-1.5"
                        >
                            <div className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse"></div>
                            Wall Preview
                        </div>

                        {/* Size badge */}
                        {selectedSize && (
                            <div data-html2canvas-ignore="true"
                                className="absolute top-5 right-5 z-30 bg-primary/10 backdrop-blur-md px-3 py-1.5 rounded-full text-[10px] font-semibold text-primary uppercase tracking-wider border border-primary/15 shadow-sm flex items-center gap-1.5"
                            >
                                <Ruler className="w-3 h-3" /> {getSizeDisplay(selectedSize)}
                            </div>
                        )}

                        {/* ═══ CENTERED CANVAS FRAME ═══ */}
                        <div className="absolute inset-0 flex items-center justify-center">
                            <div
                                className="relative transition-all duration-700 ease-out"
                                style={{
                                    ...getFrameStyle(),
                                    "--canvas-depth": selectedThickness?.value === "gallery" ? "11px" : "7px",
                                }}
                            >
                                {/* Dimension labels */}
                                {selectedSize && (
                                    <div data-html2canvas-ignore="true">
                                        <div className="absolute -bottom-9 left-0 w-full flex items-center gap-2">
                                            <div className="h-[1px] flex-1 bg-neutral-400/30"></div>
                                            <span className="text-[11px] font-semibold text-neutral-400 whitespace-nowrap font-mono">
                                                {selectedSize.width}"
                                            </span>
                                            <div className="h-[1px] flex-1 bg-neutral-400/30"></div>
                                        </div>
                                        <div className="absolute top-0 -right-10 h-full flex flex-col items-center gap-2">
                                            <div className="w-[1px] flex-1 bg-neutral-400/30"></div>
                                            <span className="text-[11px] font-semibold text-neutral-400 whitespace-nowrap font-mono -rotate-90">
                                                {selectedSize.height}"
                                            </span>
                                            <div className="w-[1px] flex-1 bg-neutral-400/30"></div>
                                        </div>
                                    </div>
                                )}

                                {/* Edit button */}
                                <button data-html2canvas-ignore="true"
                                    className="absolute -top-10 right-0 z-15 flex items-center gap-1.5 px-3 py-1.5 bg-white border border-neutral-200 rounded-lg text-[11px] font-semibold text-neutral-500 cursor-pointer transition-all shadow-sm hover:border-primary hover:text-primary"
                                    onClick={() => router.back()}>
                                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" /><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" /></svg>
                                    Edit
                                </button>

                                {/* 3D Canvas Frame - Front Face */}
                                <div className="relative w-full h-full overflow-hidden"
                                    style={{
                                        border: '1px solid rgba(0,0,0,0.18)',
                                        boxShadow: '0 8px 18px rgba(0,0,0,0.2), 0 1px 6px rgba(0,0,0,0.1)',
                                        transition: 'all 0.5s cubic-bezier(0.4, 0, 0.2, 1)',
                                    }}>
                                    <img src={imgSrc} alt="Your Canvas" className="w-full h-full object-cover block" />
                                </div>

                                {/* Right side depth */}
                                <div style={{
                                    position: 'absolute', top: 0, right: 'calc(-1 * var(--canvas-depth))',
                                    width: 'var(--canvas-depth)', bottom: 0,
                                    background: 'linear-gradient(90deg, #2f2f2f 0%, #212121 65%, #151515 100%)',
                                    borderRadius: '0 1px 1px 0', zIndex: 2,
                                }}>
                                    <div style={{
                                        position: 'absolute', inset: 0,
                                        background: 'linear-gradient(180deg, rgba(255,255,255,0.14) 0%, transparent 56%)',
                                    }}></div>
                                </div>

                                {/* Bottom side depth */}
                                <div style={{
                                    position: 'absolute', left: 0, bottom: 'calc(-1 * var(--canvas-depth))',
                                    height: 'calc(var(--canvas-depth) * 0.5)',
                                    right: 'calc(-1 * var(--canvas-depth))',
                                    background: 'linear-gradient(180deg, #2b2b2b 0%, #1b1b1b 70%, #121212 100%)',
                                    borderRadius: '0 0 2px 2px', zIndex: 2,
                                }}>
                                    <div style={{
                                        position: 'absolute', inset: 0,
                                        background: 'linear-gradient(90deg, rgba(255,255,255,0.08) 0%, transparent 42%)',
                                    }}></div>
                                </div>

                                {/* Frame shadow on wall */}
                                <div style={{
                                    position: 'absolute', left: '50%', transform: 'translateX(-50%)',
                                    width: 'calc(100% + (var(--canvas-depth) * 1.8))',
                                    height: 'clamp(12px, 7%, 22px)',
                                    bottom: 'calc(-1 * var(--canvas-depth) - 10px)',
                                    background: 'radial-gradient(ellipse, rgba(0,0,0,0.13) 0%, rgba(0,0,0,0.06) 38%, transparent 72%)',
                                    filter: 'blur(6px)', zIndex: 1,
                                }}></div>
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
                            <h1 className="text-2xl font-bold text-secondary tracking-tight">{shapeTitle} Canvas</h1>
                            <p className="text-sm text-neutral-400 mt-1.5">Premium poly-cotton blend • Solid wood stretcher bars • Ready to hang</p>
                        </div>

                        {/* ─── SIZE SELECTION ─── */}
                        <div className="mb-8">
                            <h3 className="text-[11px] font-bold text-neutral-400 uppercase tracking-[0.15em] mb-4 flex items-center gap-2">
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
                            <h3 className="text-[11px] font-bold text-neutral-400 uppercase tracking-[0.15em] mb-4 flex items-center gap-2">
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
                            <h3 className="text-[11px] font-bold text-neutral-400 uppercase tracking-[0.15em] mb-4 flex items-center gap-2">
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
                            <h3 className="text-[11px] font-bold text-neutral-400 uppercase tracking-[0.15em] mb-4">Quantity</h3>
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
