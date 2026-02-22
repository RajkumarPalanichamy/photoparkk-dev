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

const BacklightSizeSelector = ({ shape }) => {
    const router = useRouter();
    const type = "backlight";

    // ─── State ───
    const [editorData, setEditorData] = useState(null);
    const [frameConfig, setFrameConfig] = useState(null);
    const [selectedSize, setSelectedSize] = useState(null);
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
        if (selectedSize) setTotalPrice(selectedSize.price * quantity);
    }, [selectedSize, quantity]);

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
                quality: 0.95, pixelRatio: 2, backgroundColor: '#f5f5f5',
                filter: n => !(n.hasAttribute && n.hasAttribute('data-html2canvas-ignore'))
            });
        } catch { return null; }
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
                customizationDetails: { crop: prevConfig?.crop, ledBrightness, originalName: photoData?.name }
            });
            toast.success("Added to Cart!"); router.push("/cart");
        } catch (e) { console.error("Cart error", e); toast.error("Failed to add to cart."); }
        finally { setLoading(false); }
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
                            <Sparkles className="w-4 h-4 text-primary" />
                            <span className="font-semibold text-secondary text-sm">LED Photo Frames</span>
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
                            background: '#e8e4de',
                            backgroundImage: `
                                linear-gradient(135deg, rgba(255,255,255,0.4) 0%, transparent 50%),
                                url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23d4cfc7' fill-opacity='0.25'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")
                            `,
                            boxShadow: 'inset 0 1px 30px rgba(0,0,0,0.06)',
                        }}
                    >
                        {/* Wall light effect */}
                        <div className="absolute inset-0 pointer-events-none" style={{
                            background: 'radial-gradient(ellipse at 50% 30%, rgba(255,255,255,0.5) 0%, transparent 70%)',
                        }}></div>

                        {/* Live Preview Badge */}
                        <div data-html2canvas-ignore="true"
                            className="absolute top-5 left-5 z-30 bg-white/80 backdrop-blur-md px-3 py-1.5 rounded-full text-[10px] font-semibold text-neutral-500 uppercase tracking-widest border border-neutral-200/50 shadow-sm flex items-center gap-1.5"
                        >
                            <div className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse"></div>
                            Wall Preview
                        </div>

                        {/* ═══ CENTERED FRAME ═══ */}
                        <div className="absolute inset-0 flex items-center justify-center">
                            <div
                                className="relative transition-all duration-700 ease-out"
                                style={{
                                    height: selectedSize
                                        ? `${Math.min(Math.max((selectedSize.height / 30) * 100, 40), 75)}%`
                                        : '50%',
                                    aspectRatio: selectedSize
                                        ? `${selectedSize.width} / ${selectedSize.height}`
                                        : '2/3',
                                    maxWidth: '60%',
                                }}
                            >
                                {/* ─── LED FRAME ─── */}
                                <div
                                    className="relative w-full h-full"
                                    style={{
                                        border: '20px solid #1c1c1c',
                                        borderRadius: '4px',
                                        boxShadow: `
                                            inset 0 0 0 1px rgba(80,80,80,0.5),
                                            inset 0 0 ${25 * ledBrightness}px rgba(255,248,235,${0.2 * ledBrightness}),
                                            0 40px 80px -20px rgba(0,0,0,0.4),
                                            0 20px 40px -10px rgba(0,0,0,0.3),
                                            0 0 0 1px rgba(0,0,0,0.08)
                                        `,
                                        transition: 'all 0.5s ease',
                                    }}
                                >
                                    {/* Photo */}
                                    <img
                                        src={imgSrc}
                                        alt="Your LED Photo"
                                        className="w-full h-full object-cover block"
                                        style={{
                                            filter: `brightness(${1.0 + (ledBrightness * 0.3)}) contrast(${1.05 + (ledBrightness * 0.12)}) saturate(${1.1 + (ledBrightness * 0.15)})`,
                                            transition: 'filter 0.4s ease',
                                        }}
                                    />
                                    {/* Glass reflection (subtle) */}
                                    <div className="absolute inset-0 pointer-events-none z-10" style={{
                                        background: 'linear-gradient(155deg, rgba(255,255,255,0.06) 0%, transparent 35%, transparent 65%, rgba(255,255,255,0.02) 100%)',
                                    }}></div>
                                </div>

                                {/* ─── Dimension Labels ─── */}
                                {selectedSize && (
                                    <div data-html2canvas-ignore="true">
                                        {/* Width (bottom) */}
                                        <div className="absolute -bottom-9 left-0 w-full flex items-center gap-2">
                                            <div className="h-[1px] flex-1 bg-neutral-400/30"></div>
                                            <span className="text-[11px] font-semibold text-neutral-400 whitespace-nowrap font-mono">
                                                {selectedSize.width}"
                                            </span>
                                            <div className="h-[1px] flex-1 bg-neutral-400/30"></div>
                                        </div>
                                        {/* Height (right) */}
                                        <div className="absolute top-0 -right-10 h-full flex flex-col items-center gap-2">
                                            <div className="w-[1px] flex-1 bg-neutral-400/30"></div>
                                            <span className="text-[11px] font-semibold text-neutral-400 whitespace-nowrap font-mono -rotate-90">
                                                {selectedSize.height}"
                                            </span>
                                            <div className="w-[1px] flex-1 bg-neutral-400/30"></div>
                                        </div>
                                    </div>
                                )}

                                {/* ─── USB Cable ─── */}
                                <div data-html2canvas-ignore="true" className="absolute bottom-0 right-8 translate-y-full">
                                    <div className="w-[1.5px] h-14 bg-neutral-600/30 mx-auto" style={{
                                        background: 'linear-gradient(to bottom, #555, #aaa)'
                                    }}></div>
                                </div>
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
                                    <Lightbulb className="w-4 h-4 text-primary" />
                                </div>
                                <span className="text-xs font-semibold text-primary uppercase tracking-widest">LED Photo Frame</span>
                            </div>
                            <h1 className="text-2xl font-bold text-secondary tracking-tight">{shapeTitle} Backlight Frame</h1>
                            <p className="text-sm text-neutral-400 mt-1.5">Premium LED-backlit • Black Aluminium Frame • USB Powered</p>
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
                                                {size.label}
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

                        {/* ─── LED BRIGHTNESS ─── */}
                        <div className="mb-8">
                            <h3 className="text-[11px] font-bold text-neutral-400 uppercase tracking-[0.15em] mb-4 flex items-center gap-2">
                                <Sun className="w-3.5 h-3.5" /> LED Brightness
                            </h3>
                            <div className="bg-neutral-50 rounded-2xl p-5 border border-neutral-100">
                                <div className="flex items-center justify-between mb-3">
                                    <span className="text-[10px] font-medium text-neutral-300 uppercase">Dim</span>
                                    <div className="flex items-center gap-1.5">
                                        <Sparkles className="w-3 h-3 text-amber-400" />
                                        <span className="text-sm font-bold text-secondary">{Math.round(ledBrightness * 100)}%</span>
                                    </div>
                                    <span className="text-[10px] font-medium text-neutral-300 uppercase">Bright</span>
                                </div>
                                <input
                                    type="range" min="0.3" max="1.5" step="0.05"
                                    value={ledBrightness}
                                    onChange={(e) => setLedBrightness(parseFloat(e.target.value))}
                                    className="w-full h-[6px] rounded-full appearance-none cursor-pointer led-slider"
                                    style={{
                                        background: `linear-gradient(to right, #0071e3 0%, #0071e3 ${((ledBrightness - 0.3) / 1.2) * 100}%, #e5e5e5 ${((ledBrightness - 0.3) / 1.2) * 100}%, #e5e5e5 100%)`,
                                    }}
                                />
                                <div className="mt-4 flex items-center gap-2 p-3 rounded-xl bg-amber-50/80 border border-amber-100/60">
                                    <Zap className="w-3.5 h-3.5 text-amber-500 shrink-0" />
                                    <span className="text-[10px] font-medium text-amber-600 leading-tight">
                                        USB powered • Warm LED • 50,000hr lifespan
                                    </span>
                                </div>
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
                                        {quantity} × ₹{selectedSize?.price?.toLocaleString() || 0}
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
                            Confirm your customization and proceed.
                        </p>

                        {/* ─── FEATURES ─── */}
                        <div className="mt-10 space-y-3">
                            <h3 className="text-[11px] font-bold text-neutral-400 uppercase tracking-[0.15em] mb-3">What's Included</h3>
                            {[
                                { icon: <Package className="w-4 h-4" />, label: "Premium gift packaging" },
                                { icon: <Truck className="w-4 h-4" />, label: "Free express shipping" },
                                { icon: <Shield className="w-4 h-4" />, label: "1-year LED warranty" },
                                { icon: <Star className="w-4 h-4" />, label: "High-resolution print on backlit film" },
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

export default BacklightSizeSelector;
