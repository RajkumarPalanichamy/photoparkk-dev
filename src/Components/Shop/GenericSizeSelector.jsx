"use client";
import React, { useState, useEffect, useCallback, useRef } from "react";
import { useRouter } from "next/navigation";
import { Sparkles, CheckCircle2, Ruler, Layers, Scissors, ShoppingCart, Loader2, ArrowLeft, ArrowRight, Package, Truck, Lock, Frame, SlidersHorizontal } from "lucide-react";
import { HexColorPicker } from "react-colorful";
import { toast } from "react-toastify";
import * as htmlToImage from 'html-to-image';
import axiosInstance from "../../utils/axiosInstance";

// Configuration Constants
const SIZES = {
    portrait: [
        { label: "12x18 inches", price: 899, width: 12, height: 18 },
        { label: "16x24 inches", price: 1499, width: 16, height: 24 },
        { label: "20x30 inches", price: 2199, width: 20, height: 30 },
        { label: "24x36 inches", price: 2999, width: 24, height: 36 },
        { label: "30x40 inches", price: 3999, width: 30, height: 40 },
    ],
    landscape: [
        { label: "18x12 inches", price: 899, width: 18, height: 12 },
        { label: "24x16 inches", price: 1499, width: 24, height: 16 },
        { label: "30x20 inches", price: 2199, width: 30, height: 20 },
        { label: "36x24 inches", price: 2999, width: 36, height: 24 },
    ],
    square: [
        { label: "12x12 inches", price: 699, width: 12, height: 12 },
        { label: "16x16 inches", price: 1199, width: 16, height: 16 },
        { label: "24x24 inches", price: 1999, width: 24, height: 24 },
    ],
    default: [
        { label: "12x12 inches", price: 799, width: 12, height: 12 },
        { label: "16x16 inches", price: 1299, width: 16, height: 16 },
        { label: "20x20 inches", price: 1899, width: 20, height: 20 },
    ]
};

const THICKNESS_OPTIONS = [
    { label: "3mm (Standard)", price: 0, value: "3mm", desc: "Sleek & Lightweight" },
    { label: "5mm (Premium)", price: 400, value: "5mm", desc: "Depth & Durability" },
    { label: "8mm (Luxury)", price: 900, value: "8mm", desc: "Gallery Quality" },
];

const EDGE_OPTIONS = [
    { label: "Straight Cut", price: 0, value: "straight" },
    { label: "Polished Edge", price: 200, value: "polished" },
    { label: "Beveled Edge", price: 350, value: "bevel" },
];

// Product-specific frame options will be defined within the component

const GenericSizeSelector = ({ type, shape }) => {
    const router = useRouter();

    // State
    const [editorData, setEditorData] = useState(null);
    const [frameConfig, setFrameConfig] = useState(null);
    const [selectedSize, setSelectedSize] = useState(null);
    const [selectedThickness, setSelectedThickness] = useState(THICKNESS_OPTIONS[0]);
    const [selectedEdge, setSelectedEdge] = useState(EDGE_OPTIONS[0]);
    const [frameType, setFrameType] = useState('none'); // 'none' or 'custom'
    const [selectedColor, setSelectedColor] = useState("#000000");
    const [quantity, setQuantity] = useState(1);
    const [totalPrice, setTotalPrice] = useState(0);
    const [loading, setLoading] = useState(false);
    const [userId, setUserId] = useState(null);
    const [backlightColor, setBacklightColor] = useState("#ffffff");
    const [backlightIntensity, setBacklightIntensity] = useState(1.0);

    // Dynamic Frame Icons
    const FRAME_ICONS = [
        { label: "No Frame", value: "none", icon: <Frame className="w-5 h-5 text-neutral-400" /> },
        { label: "Custom Frame", value: "custom", icon: <Frame className="w-5 h-5 text-primary" /> },
    ];

    if (type === 'backlight') {
        FRAME_ICONS.push({ label: "LED Lightbox", value: "backlight", icon: <Sparkles className="w-5 h-5 text-yellow-500" /> });
    }

    // Derived Constants
    const shapeTitle = shape.charAt(0).toUpperCase() + shape.slice(1);
    const typeTitle = type.charAt(0).toUpperCase() + type.slice(1);
    const shapeKey = ["portrait", "landscape", "square"].includes(shape) ? shape : "default";

    // Dynamic Sizes from DB or Fallback
    const availableSizes = frameConfig?.sizes || SIZES[shapeKey] || SIZES.default;

    // Fetch Frame Config from DB
    useEffect(() => {
        const fetchConfig = async () => {
            try {
                const res = await axiosInstance.get(`frames/${type}?shape=${shape}`);
                if (res.data && res.data.length > 0) {
                    const dbConfig = res.data[0];
                    setFrameConfig(dbConfig);
                    // If we have sizes from DB, select the first one by default if nothing selected yet
                    if (dbConfig.sizes && dbConfig.sizes.length > 0 && !selectedSize) {
                        setSelectedSize(dbConfig.sizes[0]);
                    }
                }
            } catch (err) {
                console.error("Failed to fetch frame config", err);
            }
        };
        fetchConfig();
    }, [type, shape]);

    // Load Session Data
    useEffect(() => {
        if (typeof window !== "undefined") {
            const storedData = sessionStorage.getItem(`${type}_custom_data`);
            if (storedData) {
                try {
                    const parsed = JSON.parse(storedData);
                    if (parsed.photoData) {
                        setEditorData(parsed);
                        // Restore previous selection if available
                        if (parsed.configuration?.size) {
                            setSelectedSize(parsed.configuration.size);
                        } else if (!selectedSize && availableSizes.length > 0) {
                            // If not set by DB fetch yet, set default
                            setSelectedSize(availableSizes[0]);
                        }

                        if (parsed.configuration?.thickness) setSelectedThickness(parsed.configuration.thickness);
                        if (parsed.configuration?.edge) setSelectedEdge(parsed.configuration.edge);
                        if (parsed.configuration?.frameType) {
                            setFrameType(parsed.configuration.frameType);
                        } else if (type === 'backlight') {
                            setFrameType('backlight');
                        }
                        if (parsed.configuration?.frameColor) setSelectedColor(parsed.configuration.frameColor);
                    } else {
                        // No photo data
                        router.push(`/shop/${type}/${shape}/edit`);
                    }
                } catch (e) {
                    router.push(`/shop/${type}/${shape}/edit`);
                }
            } else {
                router.push(`/shop/${type}/${shape}/edit`);
            }

            const storedUser = localStorage.getItem("user");
            if (storedUser) {
                try {
                    const parsedUser = JSON.parse(storedUser);
                    // Prioritize 'id' (UUID) over '_id' (Mongo) to satisfy Postgres UUID constraint
                    setUserId(parsedUser.id || parsedUser._id);
                } catch (err) {
                    console.error("Failed to parse user:", err);
                }
            }
        }
    }, [type, shape, router]);

    // Calculate Price
    useEffect(() => {
        if (!selectedSize) return;
        const base = selectedSize.price;
        const thickness = selectedThickness.price;
        const edge = selectedEdge.price;
        // Frame is free
        setTotalPrice((base + thickness + edge) * quantity);
    }, [selectedSize, selectedThickness, selectedEdge, quantity]);



    const [croppedImageUrl, setCroppedImageUrl] = useState(null);
    const previewRef = useRef(null);

    // Capture the styled wall preview using html-to-image (better for modern CSS)
    const generateWallPreview = async () => {
        if (!previewRef.current) return null;
        try {
            // Using html-to-image as html2canvas fails with modern CSS (oklab)
            const blob = await htmlToImage.toBlob(previewRef.current, {
                quality: 0.95,
                pixelRatio: 2,
                backgroundColor: '#f5f5f5', // Match the container background
                filter: (node) => {
                    // Filter out ignored elements (like badge and ruler)
                    if (node.hasAttribute && node.hasAttribute('data-html2canvas-ignore')) {
                        return false;
                    }
                    return true;
                }
            });
            return blob;
        } catch (err) {
            console.error("Failed to generate wall preview", err);
            // toast.error("Could not generate full preview.");
            return null;
        }
    };

    // Optimized utility to crop image for preview
    const getCroppedImg = useCallback(async (imageSrc, pixelCrop, rotation = 0) => {
        const image = new Image();
        image.crossOrigin = "anonymous";
        image.src = imageSrc;
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');

        await new Promise((resolve) => { image.onload = resolve; });

        const maxSize = Math.max(image.width, image.height);
        const safeArea = 2 * ((maxSize / 2) * Math.sqrt(2));

        canvas.width = safeArea;
        canvas.height = safeArea;

        ctx.translate(safeArea / 2, safeArea / 2);
        ctx.rotate((rotation * Math.PI) / 180);
        ctx.translate(-safeArea / 2, -safeArea / 2);

        ctx.drawImage(
            image,
            safeArea / 2 - image.width * 0.5,
            safeArea / 2 - image.height * 0.5
        );

        const data = ctx.getImageData(0, 0, safeArea, safeArea);

        canvas.width = pixelCrop.width;
        canvas.height = pixelCrop.height;

        ctx.putImageData(
            data,
            0 - safeArea / 2 + image.width * 0.5 - pixelCrop.x,
            0 - safeArea / 2 + image.height * 0.5 - pixelCrop.y
        );

        return new Promise((resolve) => {
            canvas.toBlob((blob) => {
                if (!blob) {
                    console.error('Canvas is empty');
                    return;
                }
                resolve(URL.createObjectURL(blob));
            }, 'image/jpeg');
        });
    }, []);

    // Generate crop when data loads
    useEffect(() => {
        if (editorData?.photoData?.url && editorData?.configuration?.crop?.croppedAreaPixels) {
            const { croppedAreaPixels, rotation } = editorData.configuration.crop;
            getCroppedImg(editorData.photoData.url, croppedAreaPixels, rotation).then((url) => {
                setCroppedImageUrl(url);
            });
        }
    }, [editorData, getCroppedImg]);

    const handleAddToCart = async () => {
        if (!selectedSize || !editorData) return;

        if (!userId) {
            toast.error("Please log in to add items to cart.");
            return;
        }

        setLoading(true);
        try {
            // Prepare Cart Data
            const { photoData, configuration: prevConfig } = editorData;

            if (!frameConfig?.id) {
                toast.error("Product configuration missing. Please refresh.");
                return;
            }

            // Map type to exact database enum values (Note: Inconsistent casing in DB)
            const PRODUCT_TYPE_MAP = {
                'acrylic': 'AcrylicCustomizedata',
                'canvas': 'Canvascustomizedata',
                'backlight': 'Backlightcustomizedata'
            };
            const dbProductType = PRODUCT_TYPE_MAP[type.toLowerCase()] || `${typeTitle}Customizedata`;

            // 1. Generate Wall Preview Blob
            let blobToUpload = await generateWallPreview();

            // 2. Fallback to cropped image if wall preview fails
            if (!blobToUpload && croppedImageUrl) {
                console.warn("Wall preview generation failed, falling back to crop.");
                // toast.warn("Optimizing preview..."); // Optional: Don't alarm user too much
                blobToUpload = await fetch(croppedImageUrl).then(r => r.blob());
            }

            let finalImageUrl = photoData?.url;

            // 3. Upload the blob (Wall Preview or Crop)
            if (blobToUpload) {
                try {
                    // Use a unique name
                    const filename = `preview-${Date.now()}-${blobToUpload === await generateWallPreview() ? 'wall' : 'crop'}.png`;
                    const file = new File([blobToUpload], filename, { type: blobToUpload.type });
                    const formData = new FormData();
                    formData.append("image", file);

                    const uploadRes = await axiosInstance.post("/upload-image", formData, {
                        headers: { "Content-Type": "multipart/form-data" }
                    });

                    if (uploadRes.data?.imageUrl) {
                        finalImageUrl = uploadRes.data.imageUrl;
                    }
                } catch (uploadErr) {
                    console.error("Failed to upload preview image", uploadErr);
                }
            }

            const cartData = {
                userId,
                productId: frameConfig.id,
                productType: dbProductType,
                title: `${typeTitle} ${shapeTitle} Frame`,
                image: finalImageUrl,
                size: selectedSize.label,
                thickness: selectedThickness.value,
                edge: selectedEdge.value,
                frameType,
                frameColor: frameType === 'custom' ? selectedColor : null,
                price: totalPrice / quantity, // Unit price
                quantity,
                totalAmount: totalPrice,
                uploadedImageUrl: photoData?.url,
                customizationDetails: {
                    crop: prevConfig?.crop,
                    thickness: selectedThickness,
                    edge: selectedEdge,
                    frameType,
                    frameColor: selectedColor,
                    backlightColor: type === 'backlight' ? backlightColor : null,
                    backlightIntensity: type === 'backlight' ? backlightIntensity : null,
                    originalName: photoData?.name
                }
            };

            await axiosInstance.post("/cart", cartData);
            toast.success("Added to Cart Successfully!");
            router.push("/cart");

        } catch (error) {
            console.error("Add to cart failed", error);
            toast.error("Failed to add to cart.");
        } finally {
            setLoading(false);
        }
    };

    if (!editorData) return <div className="min-h-screen flex text-center items-center justify-center"><Loader2 className="animate-spin mr-2" /> Loading...</div>;

    const { photoData } = editorData;

    // Simple mask logic for shape preview
    const isRound = shape === 'round';
    const isLove = shape === 'love';
    const isHexagon = shape === 'hexagon';

    // Determine visual style for preview based on user selection
    const hasFrame = frameType === 'custom' || frameType === 'backlight';
    const previewStyle = {
        // If frame is selected, add border width.
        borderWidth: hasFrame ? '12px' : (selectedThickness.value === '8mm' ? '2px' : '0px'),
        borderColor: frameType === 'custom' ? selectedColor : (frameType === 'backlight' ? '#171717' : 'transparent'), // Default sleek black for backlight
        borderStyle: 'solid',
        boxShadow: hasFrame
            ? `0 10px 30px rgba(0,0,0,0.3)`
            : (selectedThickness.value === '8mm' ? '0 20px 40px rgba(0,0,0,0.3)' : '0 10px 20px rgba(0,0,0,0.15)'),
        transform: selectedEdge.value === 'bevel' && !hasFrame ? 'perspective(1000px) rotateX(2deg)' : 'none',
        clipPath: isLove ? 'url(#love-clip-preview)' : isHexagon ? 'url(#hexagon-clip-preview)' : 'none',
    };

    if (frameType === 'backlight') {
        const innerGlow = `inset 0 0 40px ${backlightColor}aa, inset 0 0 100px ${backlightColor}55`;
        const borderGlow = `0 0 20px ${backlightColor}44`;
        const frameBevel = `inset 0 0 10px rgba(0,0,0,0.8), inset 0 0 2px rgba(255,255,255,0.2)`;

        previewStyle.boxShadow = `${previewStyle.boxShadow}, ${innerGlow}, ${borderGlow}, ${frameBevel}`;
        previewStyle.borderColor = '#1a1817'; // Deep Charcoal/Wenge wood color
        previewStyle.borderWidth = '28px'; // Thicker professional frame

        // Add a subtle wood grain effect using a repeating linear gradient
        previewStyle.backgroundImage = `
            linear-gradient(45deg, rgba(255,255,255,0.02) 25%, transparent 25%),
            linear-gradient(-45deg, rgba(255,255,255,0.02) 25%, transparent 25%),
            linear-gradient(45deg, transparent 75%, rgba(255,255,255,0.02) 75%),
            linear-gradient(-45deg, transparent 75%, rgba(255,255,255,0.02) 75%)
        `;
        previewStyle.backgroundSize = '4px 4px';
    }

    if (isLove || isHexagon) {
        // Switch to drop-shadow since box-shadow is clipped
        previewStyle.boxShadow = 'none';

        if (hasFrame) {
            // Colored frame glow + Realistic wall shadow
            previewStyle.filter = `drop-shadow(0 0 10px ${selectedColor}) drop-shadow(0 20px 30px rgba(0,0,0,0.5))`;
        } else {
            // Frameless acrylic shadow (Deep + Soft)
            previewStyle.filter = 'drop-shadow(0 15px 35px rgba(0,0,0,0.4))';
        }
        // And remove border since it looks weird when clipped
        previewStyle.borderWidth = '0px';
    }

    // Backlight Effect (Lightbox)
    if (type === 'backlight' && frameType === 'backlight') {
        const intensity = backlightIntensity || 1.0;
        const currentFilter = previewStyle.filter || '';

        // Illuminate the graphic itself
        previewStyle.filter = `${currentFilter} brightness(${1.1 + (intensity * 0.3)}) contrast(${1.1 + (intensity * 0.15)}) saturate(${1.15 + (intensity * 0.15)})`;

        // Add a deeper, more realistic wall shadow (Ambient + Light Leak)
        if (!isLove && !isHexagon) {
            previewStyle.boxShadow = `
                0 30px 60px -12px rgba(0, 0, 0, 0.45), 
                0 18px 36px -18px rgba(0, 0, 0, 0.5), 
                0 0 ${50 * intensity}px ${10 * intensity}px ${backlightColor}22
            `;
        }
    }

    return (
        <div className="bg-white min-h-screen pt-[100px] pb-12 font-sans selection:bg-blue-600/10 selection:text-blue-600 text-secondary">
            <svg width="0" height="0" className="absolute pointer-events-none">
                <defs>
                    <clipPath id="love-clip-preview" clipPathUnits="objectBoundingBox">
                        <path d="M0.5,0.887 C0.111,0.675,0.015,0.473,0.015,0.306 C0.015,0.165,0.126,0.05,0.267,0.05 C0.347,0.05,0.423,0.087,0.472,0.148 L0.5,0.183 L0.528,0.148 C0.577,0.087,0.653,0.05,0.733,0.05 C0.874,0.05,0.985,0.165,0.985,0.306 C0.985,0.473,0.889,0.675,0.5,0.887 Z" />
                    </clipPath>
                    <clipPath id="hexagon-clip-preview" clipPathUnits="objectBoundingBox">
                        <polygon points="0.5 0, 1 0.25, 1 0.75, 0.5 1, 0 0.75, 0 0.25" />
                    </clipPath>
                </defs>
            </svg>
            <div className="max-w-[1400px] mx-auto px-4 lg:px-8">

                {/* Header */}
                <div className="flex items-center gap-4 mb-8">
                    <button
                        onClick={() => router.back()}
                        className="p-2 rounded-full hover:bg-neutral-200 transition-colors"
                    >
                        <ArrowLeft className="w-5 h-5 text-neutral-600" />
                    </button>
                    <div>
                        <span className="text-sm font-medium text-neutral-400 uppercase tracking-widest mb-1 block">Step 2 of 2</span>
                        <h1 className="text-2xl font-bold text-secondary">Select Size & Finishes</h1>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">

                    {/* Left: Enhanced Preview */}
                    <div className="lg:col-span-7 sticky top-24">
                        {/* Wall Preview Container - Validated for html2canvas (Inline Styles) */}
                        <div
                            ref={previewRef}
                            style={{
                                position: 'relative',
                                height: '600px',
                                width: '100%',
                                borderRadius: '24px',
                                overflow: 'hidden',
                                display: 'flex',
                                alignItems: 'flex-start',
                                justifyContent: 'center',
                                paddingTop: '128px',
                                backgroundColor: '#f5f5f5',
                                borderColor: '#e5e5e5',
                                borderWidth: '1px',
                                borderStyle: 'solid',
                                perspective: '1200px', // perspective-mid
                                boxShadow: 'inset 0 2px 4px 0 rgba(0,0,0,0.05)'
                            }}
                        >

                            {/* Wall Gradient / Image */}
                            <img
                                src="/interior-wall.jpg"
                                alt="Wall Background"
                                className="absolute inset-0 w-full h-full object-cover opacity-90"
                            />
                            <div style={{ position: 'absolute', inset: 0, backgroundColor: 'rgba(255,255,255,0.1)' }}></div>



                            {/* Live Preview Badge */}
                            <div data-html2canvas-ignore="true" className="absolute top-6 left-6 z-20 bg-white/80 backdrop-blur px-4 py-1.5 rounded-full text-xs font-bold text-neutral-600 border border-white/50 shadow-sm flex items-center gap-2">
                                <Sparkles className="w-3 h-3 text-primary" /> Live Wall Preview
                            </div>

                            <div
                                className="relative z-10 flex items-center justify-center transition-all duration-700 ease-[cubic-bezier(0.25,0.1,0.25,1)]"
                                style={{
                                    // Dynamic scaling: adjusting denominator for better visibility
                                    height: selectedSize ? `${(selectedSize.height / 45) * 100}%` : '40%',
                                    // Use aspect ratio to determine width automatically
                                    aspectRatio: selectedSize ? `${selectedSize.width} / ${selectedSize.height}` : 'auto',
                                    maxHeight: '85%', // Prevent overflowing the container
                                }}
                            >
                                {/* Dimension Labels - Repositioned for stability */}
                                {selectedSize && (
                                    <div data-html2canvas-ignore="true">
                                        {/* Width Label */}
                                        <div className="absolute -top-8 left-0 w-full text-center">
                                            <div className="inline-block bg-white/90 backdrop-blur px-2 py-1 rounded-md shadow-sm border border-neutral-200/50">
                                                <span className="text-[10px] font-bold text-neutral-700 flex items-center gap-1">
                                                    <Ruler className="w-3 h-3" /> {selectedSize.width}"
                                                </span>
                                            </div>
                                        </div>

                                        {/* Height Label */}
                                        <div className="absolute top-0 -left-10 h-full flex flex-col justify-center">
                                            <div className="bg-white/90 backdrop-blur px-2 py-1 rounded-md shadow-sm border border-neutral-200/50 -rotate-90 origin-center">
                                                <span className="text-[10px] font-bold text-neutral-700 flex items-center gap-1">
                                                    <Ruler className="w-3 h-3" /> {selectedSize.height}"
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                )}

                                {/* The Frame Container with Cable */}
                                <div className="relative group">
                                    {/* Power Cable (Only for Backlight) */}
                                    {type === 'backlight' && frameType === 'backlight' && (
                                        <div
                                            data-html2canvas-ignore="true"
                                            className="absolute -right-[120px] top-1/2 w-[125px] h-1.5 bg-neutral-800 rounded-full blur-[0.5px] opacity-80"
                                            style={{
                                                transform: 'translateY(24px) rotate(12deg)',
                                                boxShadow: '0 4px 8px rgba(0,0,0,0.3)',
                                                backgroundImage: 'linear-gradient(to bottom, transparent, rgba(0,0,0,0.4))'
                                            }}
                                        >
                                            <div className="absolute -right-1 -top-1 w-3 h-3 bg-neutral-700 rounded-full shadow-md"></div>
                                        </div>
                                    )}

                                    <div
                                        className={`relative w-full h-full overflow-hidden ${isRound ? 'rounded-full' : 'rounded-sm'}`}
                                        style={{
                                            backgroundColor: 'white',
                                            transition: 'all 0.5s ease',
                                            ...previewStyle,
                                        }}
                                    >
                                        {/* Glassy Detail: Specular Highlight (Window Reflection) */}
                                        <div className="absolute top-0 right-0 w-[200%] h-full bg-gradient-to-l from-transparent via-white/20 to-transparent skew-x-[-25deg] translate-x-1/2 opacity-30 pointer-events-none z-30"></div>

                                        {/* Glassy Detail: Surface Gloss */}
                                        <div className="absolute inset-0 z-20 bg-gradient-to-tr from-white/20 via-transparent to-black/10 pointer-events-none mix-blend-overlay"></div>

                                        {/* Edge Highlight (Inner Glow) */}
                                        <div className="absolute inset-0 z-20 shadow-[inset_0_0_2px_1px_rgba(255,255,255,0.4)] pointer-events-none rounded-inherit"></div>

                                        <img
                                            src={croppedImageUrl || photoData.url}
                                            alt="Preview"
                                            className="w-full h-full object-cover block"
                                        />
                                    </div>
                                </div>

                                {/* Redundant shadow removed - handled by filter */}
                            </div>
                        </div>

                        {/* Features List */}
                        <div className="mt-6 grid grid-cols-2 sm:grid-cols-3 gap-4">
                            <div className="bg-white p-4 rounded-xl border border-neutral-100 flex items-center gap-3 shadow-sm">
                                <Package className="w-5 h-5 text-primary" />
                                <span className="text-sm font-medium text-secondary">Premium Packaging</span>
                            </div>
                            <div className="bg-white p-4 rounded-xl border border-neutral-100 flex items-center gap-3 shadow-sm">
                                <Truck className="w-5 h-5 text-primary" />
                                <span className="text-sm font-medium text-secondary">Fast Shipping</span>
                            </div>
                            <div className="bg-white p-4 rounded-xl border border-neutral-100 flex items-center gap-3 shadow-sm">
                                <Lock className="w-5 h-5 text-primary" />
                                <span className="text-sm font-medium text-secondary">Secure Payment</span>
                            </div>
                        </div>
                    </div>

                    {/* Right: Configuration Form */}
                    <div className="lg:col-span-5 space-y-8 animate-in fade-in slide-in-from-right-10 duration-1000">
                        <div className="bg-white rounded-[40px] shadow-2xl shadow-slate-900/5 border border-slate-100 overflow-hidden">
                            <div className="p-8 md:p-12 space-y-10">

                                {/* Size Section */}
                                <div className="space-y-6">
                                    <div className="flex items-center justify-between border-b border-slate-50 pb-4">
                                        <h3 className="text-[11px] font-extrabold text-slate-400 uppercase tracking-[0.3em] flex items-center gap-3">
                                            <Ruler className="w-5 h-5 text-blue-600" /> Size Configuration
                                        </h3>
                                        {selectedSize && (
                                            <span className="text-[10px] font-extrabold text-blue-600 bg-blue-50 px-3 py-1 rounded-full uppercase tracking-widest">
                                                {selectedSize.label} Selected
                                            </span>
                                        )}
                                    </div>
                                    <div className="grid grid-cols-2 gap-4">
                                        {availableSizes.map((size, idx) => (
                                            <button
                                                key={idx}
                                                onClick={() => setSelectedSize(size)}
                                                className={`p-5 rounded-[24px] border text-left transition-all relative group ${selectedSize?.label === size.label ? 'border-blue-600 bg-blue-50/30' : 'border-slate-100 hover:border-blue-200 bg-slate-50/50'}`}
                                            >
                                                <div className="font-bold text-slate-900 text-sm tracking-tight">{size.label}</div>
                                                <div className="text-xs text-slate-500 mt-2 font-bold">₹{size.price}</div>
                                                {selectedSize?.label === size.label && (
                                                    <div className="absolute top-4 right-4 animate-in zoom-in duration-300">
                                                        <CheckCircle2 className="w-5 h-5 text-blue-600" />
                                                    </div>
                                                )}
                                                <div className={`absolute inset-0 rounded-[24px] border-2 border-blue-600 transition-opacity pointer-events-none ${selectedSize?.label === size.label ? 'opacity-100' : 'opacity-0'}`} />
                                            </button>
                                        ))}
                                    </div>
                                </div>

                                {/* Thickness Section */}
                                <div className="space-y-6">
                                    <div className="flex items-center justify-between border-b border-slate-50 pb-4">
                                        <h3 className="text-[11px] font-extrabold text-slate-400 uppercase tracking-[0.3em] flex items-center gap-3">
                                            <Layers className="w-5 h-5 text-blue-600" /> Architectural Depth
                                        </h3>
                                    </div>
                                    <div className="space-y-3">
                                        {THICKNESS_OPTIONS.map((opt, idx) => (
                                            <div
                                                key={idx}
                                                onClick={() => setSelectedThickness(opt)}
                                                className={`flex items-center justify-between p-6 rounded-[24px] border cursor-pointer transition-all group ${selectedThickness.value === opt.value ? 'border-blue-600 bg-blue-50/30' : 'border-slate-100 hover:border-blue-200 bg-slate-50/50'}`}
                                            >
                                                <div className="space-y-1">
                                                    <div className="font-bold text-sm text-slate-900 tracking-tight">{opt.label}</div>
                                                    <div className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">{opt.desc}</div>
                                                </div>
                                                <div className="text-sm font-bold text-blue-600">
                                                    {opt.price === 0 ? 'STANDARD' : `+ ₹${opt.price}`}
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                {/* Edge Finish Section */}
                                <div className="space-y-6">
                                    <div className="flex items-center justify-between border-b border-slate-50 pb-4">
                                        <h3 className="text-[11px] font-extrabold text-slate-400 uppercase tracking-[0.3em] flex items-center gap-3">
                                            <Scissors className="w-5 h-5 text-blue-600" /> Edge Artistry
                                        </h3>
                                    </div>
                                    <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                                        {EDGE_OPTIONS.map((opt, idx) => (
                                            <button
                                                key={idx}
                                                onClick={() => setSelectedEdge(opt)}
                                                className={`py-5 px-6 rounded-[24px] border text-xs font-bold uppercase tracking-widest transition-all ${selectedEdge.value === opt.value ? 'bg-slate-900 text-white border-slate-900 shadow-xl' : 'border-slate-100 text-slate-400 hover:bg-slate-50'}`}
                                            >
                                                {opt.label}
                                                <div className={`text-[9px] font-bold mt-1.5 ${selectedEdge.value === opt.value ? 'text-blue-400' : 'text-slate-300'}`}>
                                                    {opt.price === 0 ? 'Standard' : `+ ₹${opt.price}`}
                                                </div>
                                            </button>
                                        ))}
                                    </div>
                                </div>

                                {/* Frame Color Section */}
                                <div className="space-y-6">
                                    <div className="flex items-center justify-between border-b border-slate-50 pb-4">
                                        <h3 className="text-[11px] font-extrabold text-slate-400 uppercase tracking-[0.3em] flex items-center gap-3">
                                            <Frame className="w-5 h-5 text-blue-600" /> Framework Style
                                        </h3>
                                    </div>

                                    <div className="bg-slate-50 p-4 rounded-[32px] border border-slate-100 space-y-6">
                                        {/* Toggle */}
                                        <div className="flex gap-2 p-1.5 bg-white rounded-2xl border border-slate-100 shadow-sm">
                                            {FRAME_ICONS.map((opt) => (
                                                <button
                                                    key={opt.value}
                                                    onClick={() => setFrameType(opt.value)}
                                                    className={`flex-1 flex items-center justify-center gap-3 py-3 rounded-xl text-[10px] font-bold uppercase tracking-widest transition-all ${frameType === opt.value ? 'bg-blue-600 text-white shadow-lg' : 'text-slate-400 hover:bg-slate-50'}`}
                                                >
                                                    {opt.icon && React.cloneElement(opt.icon, { className: `w-4 h-4 ${frameType === opt.value ? 'text-white' : 'text-slate-300'}` })}
                                                    {opt.label}
                                                </button>
                                            ))}
                                        </div>

                                        {/* Color Picker */}
                                        {frameType === 'custom' && (
                                            <div className="space-y-6 animate-in fade-in slide-in-from-top-2 duration-300">
                                                <div className="flex justify-center p-2 bg-white rounded-[24px] border border-slate-100 shadow-sm">
                                                    <HexColorPicker color={selectedColor} onChange={setSelectedColor} style={{ width: '100%', height: '140px' }} />
                                                </div>

                                                <div className="flex items-center gap-4 bg-white p-4 rounded-2xl border border-slate-100 focus-within:ring-2 focus-within:ring-blue-600/20 transition-all shadow-sm">
                                                    <div className="w-10 h-10 rounded-xl border border-slate-100 shrink-0" style={{ backgroundColor: selectedColor }}></div>
                                                    <div className="flex-1 space-y-0.5">
                                                        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Selected Tone</span>
                                                        <div className="flex items-center gap-1 font-bold text-slate-900 tracking-widest uppercase">
                                                            <span className="opacity-30">#</span>
                                                            <input
                                                                type="text"
                                                                value={selectedColor.replace('#', '')}
                                                                onChange={(e) => {
                                                                    const val = e.target.value;
                                                                    if (/^[0-9A-Fa-f]{0,6}$/.test(val)) {
                                                                        setSelectedColor(`#${val}`);
                                                                    }
                                                                }}
                                                                className="w-full bg-transparent outline-none"
                                                                maxLength={6}
                                                            />
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                </div>

                                {/* Backlight Section */}
                                {type === 'backlight' && frameType === 'backlight' && (
                                    <div className="space-y-6 animate-in fade-in slide-in-from-top-4 duration-700">
                                        <div className="flex items-center justify-between border-b border-slate-50 pb-4">
                                            <h3 className="text-[11px] font-extrabold text-slate-400 uppercase tracking-[0.3em] flex items-center gap-3">
                                                <Sparkles className="w-5 h-5 text-blue-600" /> Light Atmosphere
                                            </h3>
                                        </div>

                                        <div className="bg-slate-900 rounded-[32px] p-8 space-y-8 shadow-inner border border-slate-800">
                                            <div className="flex justify-center p-2 bg-white/5 rounded-[24px] border border-white/5 shadow-inner">
                                                <HexColorPicker color={backlightColor} onChange={setBacklightColor} style={{ width: '100%', height: '140px' }} />
                                            </div>

                                            <div className="space-y-5">
                                                <div className="flex justify-between text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                                                    <span>Beam Intensity</span>
                                                    <span className="text-blue-400 bg-blue-400/10 px-2 py-0.5 rounded-md">{Math.round(backlightIntensity * 100)}%</span>
                                                </div>
                                                <input
                                                    type="range"
                                                    min="0.2"
                                                    max="1.5"
                                                    step="0.1"
                                                    value={backlightIntensity}
                                                    onChange={(e) => setBacklightIntensity(parseFloat(e.target.value))}
                                                    className="w-full h-1.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-blue-600"
                                                />
                                            </div>

                                            <div className="grid grid-cols-5 gap-3">
                                                {['#ffffff', '#0ea5e9', '#f43f5e', '#eab308', '#22c55e'].map((c) => (
                                                    <button
                                                        key={c}
                                                        onClick={() => setBacklightColor(c)}
                                                        className={`h-10 rounded-xl border-2 transition-all hover:scale-110 ${backlightColor === c ? 'border-blue-500 shadow-[0_0_15px_rgba(59,130,246,0.5)]' : 'border-slate-800'}`}
                                                        style={{ backgroundColor: c }}
                                                    />
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                )}

                                {/* Final Purchase Matrix */}
                                <div className="pt-10 border-t border-slate-50 space-y-8">
                                    <div className="flex items-center justify-between">
                                        <div className="space-y-1">
                                            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Order Volume</span>
                                            <div className="flex items-center gap-4 bg-slate-50 p-1.5 rounded-2xl border border-slate-100">
                                                <button
                                                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                                                    className="w-10 h-10 flex items-center justify-center text-slate-400 hover:text-slate-900 border border-transparent hover:border-slate-200 transition-all rounded-xl font-bold text-lg"
                                                >
                                                    −
                                                </button>
                                                <span className="w-8 text-center font-bold text-sm text-slate-900">{quantity}</span>
                                                <button
                                                    onClick={() => setQuantity(quantity + 1)}
                                                    className="w-10 h-10 flex items-center justify-center text-slate-400 hover:text-slate-900 border border-transparent hover:border-slate-200 transition-all rounded-xl font-bold text-lg"
                                                >
                                                    +
                                                </button>
                                            </div>
                                        </div>

                                        <div className="text-right space-y-1">
                                            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Elite Valuation</span>
                                            <div className="text-4xl font-extrabold text-slate-950 tracking-tighter">₹{totalPrice.toLocaleString()}</div>
                                        </div>
                                    </div>

                                    <button
                                        onClick={handleAddToCart}
                                        disabled={loading || !selectedSize}
                                        className="relative w-full overflow-hidden group rounded-[24px]"
                                    >
                                        <div className="absolute inset-0 bg-blue-600 transition-all group-hover:bg-blue-700" />
                                        <div className="relative py-6 flex items-center justify-center gap-4 text-white">
                                            {loading ? <Loader2 className="animate-spin" /> : <ShoppingCart className="w-5 h-5 shadow-2xl" />}
                                            <span className="font-extrabold text-xs uppercase tracking-[0.25em]">Initialise Checkout</span>
                                            <ArrowRight size={18} className="translate-x-0 group-hover:translate-x-1.5 transition-transform" />
                                        </div>
                                        <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/10 to-white/0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
                                    </button>

                                    <div className="flex items-center justify-center gap-6 pt-4">
                                        <div className="flex items-center gap-2">
                                            <Lock size={12} className="text-slate-400" />
                                            <span className="text-[9px] font-bold text-slate-400 uppercase tracking-[0.1em]">PCI Secured</span>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <Truck size={12} className="text-slate-400" />
                                            <span className="text-[9px] font-bold text-slate-400 uppercase tracking-[0.1em]">Global Priority</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default GenericSizeSelector;
