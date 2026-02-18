"use client";
import React, { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import { Sparkles, CheckCircle2, Ruler, Layers, Scissors, ShoppingCart, Loader2, ArrowLeft, Package, Truck, Lock } from "lucide-react";
import { toast } from "react-toastify";
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

const GenericSizeSelector = ({ type, shape }) => {
    const router = useRouter();

    // State
    const [editorData, setEditorData] = useState(null);
    const [selectedSize, setSelectedSize] = useState(null);
    const [selectedThickness, setSelectedThickness] = useState(THICKNESS_OPTIONS[0]);
    const [selectedEdge, setSelectedEdge] = useState(EDGE_OPTIONS[0]);
    const [quantity, setQuantity] = useState(1);
    const [totalPrice, setTotalPrice] = useState(0);
    const [loading, setLoading] = useState(false);
    const [userId, setUserId] = useState(null);

    // Derived Constants
    const shapeTitle = shape.charAt(0).toUpperCase() + shape.slice(1);
    const typeTitle = type.charAt(0).toUpperCase() + type.slice(1);
    const shapeKey = ["portrait", "landscape", "square"].includes(shape) ? shape : "default";
    const availableSizes = SIZES[shapeKey] || SIZES.default;

    // Load Data
    useEffect(() => {
        if (typeof window !== "undefined") {
            const storedData = sessionStorage.getItem(`${type}_custom_data`);
            if (storedData) {
                try {
                    const parsed = JSON.parse(storedData);
                    if (parsed.photoData) {
                        setEditorData(parsed);
                        // Restore previous selection if available
                        if (parsed.configuration?.size) setSelectedSize(parsed.configuration.size);
                        else if (availableSizes.length > 0) setSelectedSize(availableSizes[0]);

                        if (parsed.configuration?.thickness) setSelectedThickness(parsed.configuration.thickness);
                        if (parsed.configuration?.edge) setSelectedEdge(parsed.configuration.edge);
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
                    setUserId(parsedUser._id || parsedUser.id);
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
        setTotalPrice((base + thickness + edge) * quantity);
    }, [selectedSize, selectedThickness, selectedEdge, quantity]);

    const [croppedImageUrl, setCroppedImageUrl] = useState(null);

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
            // Optionally redirect to login, but maybe save state first?
            // For now just error toast.
            return;
        }

        setLoading(true);
        try {
            // Prepare Cart Data
            const { photoData, configuration: prevConfig } = editorData;

            // Note: In a real app, you might want to upload the 'croppedImageUrl' blob to S3 here
            // or send the crop coordinates to the backend to generate the final print file.
            // For now, we will send the original URL + crop details.

            const cartData = {
                userId,
                productType: `${typeTitle}Customized`,
                title: `${typeTitle} ${shapeTitle} Frame`,
                image: croppedImageUrl || photoData?.url, // Use cropped preview for cart thumbnail if possible, though backend might expect a real URL
                size: selectedSize.label,
                thickness: selectedThickness.value,
                edge: selectedEdge.value,
                price: totalPrice / quantity, // Unit price
                quantity,
                totalAmount: totalPrice,
                uploadedImageUrl: photoData?.url,
                customizationDetails: {
                    crop: prevConfig?.crop, // The crop data from step 1
                    thickness: selectedThickness,
                    edge: selectedEdge,
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
    const previewStyle = {
        borderWidth: selectedThickness.value === '8mm' ? '12px' : selectedThickness.value === '5mm' ? '8px' : '4px',
        borderColor: selectedEdge.value === 'polished' ? '#e5e5e5' : '#fff',
        boxShadow: selectedThickness.value === '8mm' ? '0 20px 40px rgba(0,0,0,0.3)' : '0 10px 20px rgba(0,0,0,0.15)',
        transform: selectedEdge.value === 'bevel' ? 'perspective(1000px) rotateX(2deg)' : 'none',
        clipPath: isLove ? 'url(#love-clip-preview)' : isHexagon ? 'url(#hexagon-clip-preview)' : 'none',
        // For custom shapes, we might want to hide the border or make it follow the shape. 
        // Standard CSS border follows border-radius but NOT clip-path. 
        // So for Love/Hexagon, the rectangular border would be cut off by clip-path invisibly, or visible if clip-path is larger? No, clip-path hides everything outside.
        // So standard border will disappear for non-rectangular shapes unless we use SVG stroke? 
        // Actually, let's keep it simple. The clip-path cuts everything. The border is on the div. So the border will be cut to the shape? 
        // No, clip-path is applied AFTER border. So the border will be visible only inside the shape. Effectively, you lose the border thickness on the outside edge.
        // This is a known CSS limitation. For a perfect border on custom shape, we need an SVG overlay or drop-shadow filter.
        // For now, let's trust the clip, and maybe add a filter: drop-shadow instead of box-shadow.
    };

    if (isLove || isHexagon) {
        // Switch to drop-shadow since box-shadow is clipped
        previewStyle.boxShadow = 'none';
        previewStyle.filter = 'drop-shadow(0 10px 10px rgba(0,0,0,0.2))';
        // And remove border since it looks weird when clipped
        previewStyle.borderWidth = '0px';
    }

    return (
        <div className="bg-neutral-50 min-h-screen pt-[100px] pb-12 font-[Poppins]">
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
                        {/* Wall Preview Container */}
                        <div className="relative h-[600px] w-full rounded-3xl overflow-hidden bg-neutral-100 flex items-center justify-center shadow-inner border border-neutral-200 group perspective-mid">

                            {/* Wall Gradient / Image */}
                            <img
                                src="/wall-bg.jpg"
                                alt="Wall Background"
                                className="absolute inset-0 w-full h-full object-cover opacity-90"
                            />
                            <div className="absolute inset-0 bg-white/10 backdrop-blur-[1px]"></div>



                            {/* Live Preview Badge */}
                            <div className="absolute top-6 left-6 z-20 bg-white/80 backdrop-blur px-4 py-1.5 rounded-full text-xs font-bold text-neutral-600 border border-white/50 shadow-sm flex items-center gap-2">
                                <Sparkles className="w-3 h-3 text-primary" /> Live Wall Preview
                            </div>

                            {/* Dynamic Sizing Scale based on max dimension relative to viewport area */}
                            <div
                                className="relative transition-all duration-500 ease-out z-10"
                                style={{
                                    // Subtle scaling to represent size differences (approximate)
                                    transform: `scale(${selectedSize ? Math.min(1, Math.max(0.6, Math.max(selectedSize.width, selectedSize.height) / 40 + 0.3)) : 1})`
                                }}
                            >
                                {/* Dimension Labels */}
                                {selectedSize && (
                                    <>
                                        {/* Width Label */}
                                        <div className="absolute -top-12 left-0 w-full text-center">
                                            <div className="inline-block bg-white/90 backdrop-blur px-3 py-1 rounded-md shadow-sm border border-neutral-200/50">
                                                <span className="text-xs font-bold text-neutral-700 flex items-center gap-1">
                                                    <Ruler className="w-3 h-3" /> {selectedSize.width}"
                                                </span>
                                            </div>
                                            {/* Line */}
                                            <div className="w-full h-px bg-neutral-400/50 absolute bottom-[-8px] left-0 flex items-center justify-between">
                                                <div className="h-2 w-px bg-neutral-400/50"></div>
                                                <div className="h-2 w-px bg-neutral-400/50"></div>
                                            </div>
                                        </div>

                                        {/* Height Label */}
                                        <div className="absolute top-0 -left-12 h-full flex flex-col justify-center">
                                            <div className="absolute left-[-8px] h-full w-px bg-neutral-400/50 flex flex-col justify-between items-center">
                                                <div className="w-2 h-px bg-neutral-400/50"></div>
                                                <div className="w-2 h-px bg-neutral-400/50"></div>
                                            </div>
                                            <div className="bg-white/90 backdrop-blur px-3 py-1 rounded-md shadow-sm border border-neutral-200/50 -rotate-90 origin-center whitespace-nowrap">
                                                <span className="text-xs font-bold text-neutral-700 flex items-center gap-1">
                                                    <Ruler className="w-3 h-3" /> {selectedSize.height}"
                                                </span>
                                            </div>
                                        </div>
                                    </>
                                )}

                                {/* The Frame */}
                                <div
                                    className={`relative transition-all duration-500 ${isRound ? 'rounded-full' : 'rounded-sm'} overflow-hidden bg-white`}
                                    style={{
                                        ...previewStyle,
                                        width: selectedSize ? `${selectedSize.width * 12}px` : '300px', // Base pixel scale
                                        maxWidth: '100%',
                                        maxHeight: '400px', // Constraint
                                        aspectRatio: selectedSize ? `${selectedSize.width} / ${selectedSize.height}` : 'auto',
                                        // Use shadow from previewStyle unless custom shapes
                                    }}
                                >
                                    {/* Acrylic Reflection/Gloss Overlay */}
                                    <div className="absolute inset-0 z-20 bg-gradient-to-tr from-white/10 via-transparent to-black/5 pointer-events-none mix-blend-overlay"></div>
                                    <div className="absolute inset-0 z-20 bg-gradient-to-b from-white/5 to-transparent pointer-events-none"></div>

                                    <img
                                        src={croppedImageUrl || photoData.url}
                                        alt="Preview"
                                        className="w-full h-full object-cover block"
                                    />
                                </div>

                                {/* Realistic Drop Shadow for Custom Shapes (since box-shadow is clipped) */}
                                {(isLove || isHexagon || isRound) && (
                                    <div
                                        className={`absolute inset-0 -z-10 bg-black/40 blur-2xl transform translate-y-8 scale-95 opacity-60 rounded-full`}
                                        style={{
                                            // Approximate shadow shape
                                        }}
                                    ></div>
                                )}
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
                    <div className="lg:col-span-5 space-y-6">
                        <div className="bg-white rounded-3xl shadow-xl border border-neutral-100 overflow-hidden">
                            <div className="p-6 md:p-8 space-y-8">

                                {/* Size Section */}
                                <div>
                                    <div className="flex items-center justify-between mb-3">
                                        <h3 className="font-bold text-secondary flex items-center gap-2"><Ruler className="w-5 h-5 text-primary" /> Size Options</h3>
                                    </div>
                                    <div className="grid grid-cols-2 gap-3">
                                        {availableSizes.map((size, idx) => (
                                            <button
                                                key={idx}
                                                onClick={() => setSelectedSize(size)}
                                                className={`p-3 rounded-xl border text-left transition-all relative ${selectedSize?.label === size.label ? 'border-primary bg-primary/5 shadow-md ring-1 ring-primary' : 'border-neutral-200 hover:border-neutral-300 hover:shadow-sm'}`}
                                            >
                                                <div className="font-bold text-secondary text-sm">{size.label}</div>
                                                <div className="text-xs text-neutral-500 mt-1 font-medium">₹{size.price}</div>
                                                {selectedSize?.label === size.label && <CheckCircle2 className="absolute top-2 right-2 w-4 h-4 text-primary" />}
                                            </button>
                                        ))}
                                    </div>
                                </div>

                                {/* Thickness Section */}
                                <div>
                                    <div className="flex items-center justify-between mb-3">
                                        <h3 className="font-bold text-secondary flex items-center gap-2"><Layers className="w-5 h-5 text-primary" /> Material Thickness</h3>
                                    </div>
                                    <div className="space-y-3">
                                        {THICKNESS_OPTIONS.map((opt, idx) => (
                                            <div
                                                key={idx}
                                                onClick={() => setSelectedThickness(opt)}
                                                className={`flex items-center justify-between p-4 rounded-xl border cursor-pointer transition-all ${selectedThickness.value === opt.value ? 'border-primary bg-primary/5 shadow-inner' : 'border-neutral-200 hover:border-neutral-300'}`}
                                            >
                                                <div>
                                                    <div className="font-semibold text-sm text-secondary">{opt.label}</div>
                                                    <div className="text-xs text-neutral-400">{opt.desc}</div>
                                                </div>
                                                <div className="text-sm font-medium text-primary">
                                                    {opt.price === 0 ? 'Included' : `+ ₹${opt.price}`}
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                {/* Edge Finish Section */}
                                <div>
                                    <div className="flex items-center justify-between mb-3">
                                        <h3 className="font-bold text-secondary flex items-center gap-2"><Scissors className="w-5 h-5 text-primary" /> Edge Finish</h3>
                                    </div>
                                    <div className="flex flex-wrap gap-2">
                                        {EDGE_OPTIONS.map((opt, idx) => (
                                            <button
                                                key={idx}
                                                onClick={() => setSelectedEdge(opt)}
                                                className={`flex-1 min-w-[100px] py-3 px-4 rounded-xl border text-sm font-medium transition-all ${selectedEdge.value === opt.value ? 'border-secondary bg-secondary text-white shadow-lg' : 'border-neutral-200 text-neutral-600 hover:bg-neutral-50 hover:border-neutral-300'}`}
                                            >
                                                {opt.label}
                                                <div className="text-[10px] opacity-70 font-normal mt-0.5">{opt.price === 0 ? 'Standard' : `+ ₹${opt.price}`}</div>
                                            </button>
                                        ))}
                                    </div>
                                </div>

                                {/* Quantity & Total */}
                                <div className="pt-6 border-t border-neutral-100 space-y-4">
                                    <div className="flex items-center justify-between">
                                        <span className="font-medium text-neutral-600">Quantity</span>
                                        <div className="flex items-center border border-neutral-200 rounded-lg">
                                            <button onClick={() => setQuantity(Math.max(1, quantity - 1))} className="px-3 py-1 hover:bg-neutral-50">-</button>
                                            <span className="px-3 font-semibold text-sm">{quantity}</span>
                                            <button onClick={() => setQuantity(quantity + 1)} className="px-3 py-1 hover:bg-neutral-50">+</button>
                                        </div>
                                    </div>

                                    <div className="flex items-end justify-between">
                                        <div className="text-sm text-neutral-500">Total Price</div>
                                        <div className="text-3xl font-bold text-primary">₹{totalPrice}</div>
                                    </div>

                                    <button
                                        onClick={handleAddToCart}
                                        disabled={loading || !selectedSize}
                                        className="w-full bg-primary hover:bg-primary-hover text-white py-4 rounded-xl font-bold text-lg shadow-xl hover:shadow-2xl hover:-translate-y-1 transition-all flex items-center justify-center gap-3 disabled:opacity-70 disabled:cursor-not-allowed"
                                    >
                                        {loading ? <Loader2 className="animate-spin" /> : <ShoppingCart className="w-5 h-5" />}
                                        Add To Cart
                                    </button>

                                    <p className="text-xs text-center text-neutral-400">
                                        By adding to cart, you confirm your design settings.
                                    </p>
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
