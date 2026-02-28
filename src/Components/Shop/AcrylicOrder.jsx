
"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { FaShoppingCart, FaPhoneAlt, FaTruck, FaLock, FaWhatsapp } from "react-icons/fa";
import { BsPatchCheckFill } from "react-icons/bs";
import {
    Sparkles,
    Package,
    Ruler,
    Box,
    CheckCircle2,
    Loader2,
} from "lucide-react";
import axiosInstance from "../../utils/axiosInstance";
import { useCart } from "@/context/CartContext";
import { toast } from "react-toastify";

// Configuration for different shapes
const PRODUCT_CONFIG = {
    portrait: {
        title: "Portrait Acrylic Customize",
        sizes: [
            { label: "8x10", price: 499, original: 699, width: 8, height: 10 },
            { label: "12x16", price: 699, original: 899, width: 12, height: 16 },
            { label: "16x20", price: 899, original: 1199, width: 16, height: 20 },
            { label: "20x30", price: 1999, original: 2499, width: 20, height: 30 },
        ]
    },
    landscape: {
        title: "Landscape Acrylic Customize",
        sizes: [
            { label: "10x8", price: 499, original: 699, width: 10, height: 8 },
            { label: "16x12", price: 699, original: 899, width: 16, height: 12 },
            { label: "20x16", price: 899, original: 1199, width: 20, height: 16 },
            { label: "30x20", price: 1999, original: 2499, width: 30, height: 20 },
        ]
    },
    square: {
        title: "Square Acrylic Customize",
        sizes: [
            { label: "8x8", price: 399, original: 599, width: 8, height: 8 },
            { label: "12x12", price: 699, original: 899, width: 12, height: 12 },
            { label: "16x16", price: 999, original: 1299, width: 16, height: 16 },
            { label: "24x24", price: 1999, original: 2499, width: 24, height: 24 },
        ]
    },
    round: {
        title: "Round Acrylic Customize",
        sizes: [
            { label: "8x8", price: 449, original: 649, width: 8, height: 8 },
            { label: "12x12", price: 749, original: 949, width: 12, height: 12 },
            { label: "16x16", price: 1099, original: 1399, width: 16, height: 16 },
            { label: "24x24", price: 2199, original: 2699, width: 24, height: 24 },
        ]
    },
    hexagon: {
        title: "Hexagon Acrylic Customize",
        sizes: [
            { label: "8x8", price: 449, original: 649, width: 8, height: 8 },
            { label: "12x12", price: 749, original: 949, width: 12, height: 12 },
            { label: "16x16", price: 1099, original: 1399, width: 16, height: 16 },
        ]
    },
    love: {
        title: "Love/Heart Acrylic Customize",
        sizes: [
            { label: "8x8", price: 499, original: 699, width: 8, height: 8 },
            { label: "12x12", price: 799, original: 999, width: 12, height: 12 },
            { label: "16x16", price: 1199, original: 1499, width: 16, height: 16 },
        ]
    }
};

const COMMON_HIGHLIGHTS = [
    "High-Quality Finish & Durable Material",
    "Perfect for Home Decor & Gifting",
    "Customizable with Your Photo",
    "Secure Packaging for Safe Delivery",
    "Eco-Friendly Printing Process",
    "Crafted with Precision & Love",
    "Easy to Hang or Display",
    "Multiple Sizes & Thickness Options",
    "Premium quality acrylic",
    "Edge-to-edge printing",
];

const AcrylicOrder = ({ shape }) => {
    const router = useRouter();
    const [photoData, setPhotoData] = useState(null);
    const [productConfig, setProductConfig] = useState(null);
    const [selectedSize, setSelectedSize] = useState(null);
    const [selectedThickness, setSelectedThickness] = useState("3mm");
    const [quantity, setQuantity] = useState(1);
    const [userId, setUserId] = useState(null);
    const { addToCart } = useCart();
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        // Load data from session storage
        if (typeof window !== "undefined") {
            const storedData = sessionStorage.getItem("acrylic_custom_data");
            if (storedData) {
                const parsed = JSON.parse(storedData);
                if (parsed.shape !== shape) {
                    // Warning: shape mismatch?
                    console.warn("Shape mismatch in session data");
                }
                setPhotoData(parsed.photoData);
            } else {
                // Redirect if no data
                toast.error("No customization data found. Please upload an image first.");
                router.push(`/shop/acrylic/${shape}`);
                return;
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

        const config = PRODUCT_CONFIG[shape.toLowerCase()] || PRODUCT_CONFIG.portrait;
        setProductConfig(config);
        if (config.sizes.length > 0) setSelectedSize(config.sizes[0]);

    }, [shape, router]);

    const getBorderWidth = (thickness) => {
        const thicknessMap = {
            "3mm": "8px",
            "5mm": "12px",
            "8mm": "16px",
        };
        return thicknessMap[thickness] || "10px";
    };

    const handleAddToCart = async () => {
        if (!selectedSize || !selectedThickness || quantity < 1) {
            toast.error("Please complete all selections.");
            return;
        }

        setLoading(true);
        try {
            const cartPayload = {
                productId: productConfig?.id ?? null,
                productType: "AcrylicCustomizedata",
                title: productConfig?.title || "Acrylic Frame",
                image: photoData?.url,
                size: selectedSize.label,
                thickness: selectedThickness,
                price: selectedSize.price,
                quantity,
                totalAmount: selectedSize.price * quantity,
                uploadedImageUrl: photoData?.url,
            };
            const result = await addToCart(cartPayload);
            if (result?.success) { toast.success("Item added to cart successfully!"); router.push("/cart"); } else { toast.error("Failed to add to cart."); }
            // Clear session data? Maybe not, allow user to go back
        } catch (error) {
            console.error("Add to cart failed", error);
            toast.error("Failed to add to cart.");
        } finally {
            setLoading(false);
        }
    };

    if (!photoData || !productConfig) return <div className="min-h-screen flex text-center items-center justify-center"><Loader2 className="animate-spin" /> Loading...</div>;

    const borderWidth = getBorderWidth(selectedThickness);
    const aspectRatio = selectedSize ? (selectedSize.width / selectedSize.height) : 1;

    // Render logic for preview shape
    const renderSimplePreview = () => {
        let containerClass = "relative w-full overflow-hidden shadow-2xl transition-all duration-500 bg-white";
        let style = {
            borderWidth: borderWidth,
            borderStyle: "solid",
            borderColor: "#1f2937",
            padding: "4px",
        };

        const s = shape.toLowerCase();
        if (s === 'portrait' || s === 'landscape' || s === 'square') {
            style.aspectRatio = aspectRatio;
            containerClass += " rounded-2xl"; // Standard rounded corners
        } else if (s === 'round') {
            style.aspectRatio = "1/1";
            containerClass += " rounded-full";
        } else if (s === 'hexagon') {
            style.aspectRatio = "1/1";
            containerClass += " mask-hexagon"; // Needs mask css
            style.clipPath = "polygon(25% 5%, 75% 5%, 100% 50%, 75% 95%, 25% 95%, 0% 50%)"; // Inline fallback
        } else if (s === 'love') {
            // Heart is complex, simplified for now or need the SVG mask structure
            return (
                <div className="heart-frame-container">
                    <div className="heart-border"></div>
                    <div className="heart-frame">
                        <img src={photoData.url} alt="Preview" className="w-full h-full object-cover" />
                    </div>
                </div>
            )
        }

        return (
            <div className={containerClass} style={style}>
                <img src={photoData.url} alt="Preview" className="w-full h-full object-cover rounded-lg" />
            </div>
        );
    }

    return (
        <div className="bg-neutral-50 pt-[120px] pb-8 px-4 font-[Poppins]">
            <div className="max-w-7xl mx-auto">
                <div className="text-center mb-8">
                    <div className="inline-flex items-center gap-2 bg-primary text-white px-6 py-2 rounded-full mb-4">
                        <Sparkles className="w-5 h-5" />
                        <span className="font-semibold">{shape.charAt(0).toUpperCase() + shape.slice(1)} Acrylic Frame</span>
                    </div>
                    <h1 className="text-4xl md:text-5xl font-bold text-secondary mb-3">
                        Complete Your Order
                    </h1>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    {/* Live Frame Preview */}
                    <div>
                        <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-neutral-200 sticky top-24">
                            <div className="bg-primary px-6 py-4">
                                <h2 className="text-xl font-bold text-white flex items-center justify-center gap-2">
                                    <Package className="w-6 h-6" />
                                    Live Frame Preview
                                </h2>
                            </div>
                            <div className="p-8 flex items-center justify-center min-h-[400px]">
                                <div className="w-full max-w-md mx-auto relative">
                                    {renderSimplePreview()}

                                    {selectedSize && (
                                        <>
                                            <div className="absolute -left-4 top-1/2 transform -translate-y-1/2 text-sm font-semibold text-neutral-700 bg-white px-2 py-1 rounded shadow-md border border-neutral-200">
                                                {selectedSize.height}"
                                            </div>
                                            <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 text-sm font-semibold text-neutral-700 bg-white px-2 py-1 rounded shadow-md border border-neutral-200">
                                                {selectedSize.width}"
                                            </div>
                                        </>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Customization */}
                    <div>
                        <div className="bg-white rounded-2xl shadow-xl border border-neutral-200 overflow-hidden">
                            <div className="bg-primary px-6 py-4">
                                <h2 className="text-xl font-bold text-white">
                                    {productConfig.title}
                                </h2>
                            </div>

                            <div className="p-6 space-y-6">
                                {/* Price */}
                                <div>
                                    <div className="text-4xl font-bold text-primary mb-2">
                                        ₹{selectedSize?.price || 0}
                                    </div>
                                    {selectedSize?.original && (
                                        <div className="flex items-center gap-3">
                                            <span className="text-xl text-neutral-400 line-through">
                                                ₹{selectedSize.original}
                                            </span>
                                            <span className="px-3 py-1 bg-primary-light text-primary-hover rounded-full text-sm font-semibold">
                                                Free Shipping
                                            </span>
                                        </div>
                                    )}
                                </div>

                                {/* Size Selector */}
                                <div>
                                    <label className="block text-lg font-semibold text-secondary mb-3 flex items-center justify-center gap-2">
                                        <Ruler className="w-5 h-5 text-primary" />
                                        Select Size
                                    </label>
                                    <div className="grid grid-cols-3 gap-3">
                                        {productConfig.sizes.map((sizeObj, i) => (
                                            <button
                                                key={i}
                                                onClick={() => setSelectedSize(sizeObj)}
                                                className={`px-4 py-3 rounded-xl border-2 text-sm font-medium transition-all duration-200 ${selectedSize?.label === sizeObj.label
                                                        ? "bg-primary text-white border-primary shadow-lg scale-105"
                                                        : "bg-white text-secondary border-neutral-300 hover:border-primary hover:shadow-md"
                                                    }`}
                                            >
                                                <div className="font-bold">{sizeObj.label}</div>
                                                <div className="text-xs mt-1 opacity-80">
                                                    ₹{sizeObj.price}
                                                </div>
                                            </button>
                                        ))}
                                    </div>
                                </div>

                                {/* Thickness Selector */}
                                <div>
                                    <label className="block text-lg font-semibold text-secondary mb-3 flex items-center justify-center gap-2">
                                        <Box className="w-5 h-5 text-primary" />
                                        Select Thickness
                                    </label>
                                    <div className="grid grid-cols-3 gap-3">
                                        {["3mm", "5mm", "8mm"].map((thick, i) => (
                                            <button
                                                key={i}
                                                onClick={() => setSelectedThickness(thick)}
                                                className={`px-4 py-3 rounded-xl border-2 text-sm font-medium transition-all duration-200 ${selectedThickness === thick
                                                        ? "bg-primary text-white border-primary shadow-lg scale-105"
                                                        : "bg-white text-secondary border-neutral-300 hover:border-primary hover:shadow-md"
                                                    }`}
                                            >
                                                {thick}
                                            </button>
                                        ))}
                                    </div>
                                </div>

                                {/* Add to Cart Button */}
                                <div className="space-y-4 pt-4 border-t border-neutral-200">
                                    <div className="flex items-center gap-4">
                                        <label className="text-lg font-medium text-neutral-700">Quantity:</label>
                                        <input type="number" min="1" value={quantity} onChange={(e) => setQuantity(Math.max(1, Number(e.target.value)))} className="w-24 px-4 py-2 border-2 border-neutral-300 rounded-lg text-center" />
                                    </div>
                                    <button
                                        onClick={handleAddToCart}
                                        disabled={loading || !selectedSize}
                                        className="w-full bg-primary hover:bg-primary-hover text-white px-6 py-4 rounded-xl flex items-center justify-center gap-3 font-semibold transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-xl transform hover:scale-[1.02]"
                                    >
                                        {loading ? (
                                            <>
                                                <Loader2 className="w-5 h-5 animate-spin" />
                                                <span>Adding to Cart...</span>
                                            </>
                                        ) : (
                                            <>
                                                <FaShoppingCart size={20} />
                                                <span>Add to Cart</span>
                                            </>
                                        )}
                                    </button>
                                </div>

                            </div>
                        </div>

                        {/* Highlights */}
                        <div className="mt-8 bg-white rounded-2xl shadow-xl border border-neutral-200 overflow-hidden">
                            <div className="bg-primary px-6 py-4">
                                <h3 className="text-xl font-bold text-white flex items-center justify-center gap-2">
                                    <CheckCircle2 className="w-6 h-6" /> Product Highlights
                                </h3>
                            </div>
                            <div className="p-6">
                                <ul className="grid grid-cols-1 gap-3">
                                    {COMMON_HIGHLIGHTS.slice(0, 6).map((h, i) => (
                                        <li key={i} className="flex items-start gap-2 text-sm text-neutral-700">
                                            <BsPatchCheckFill className="text-primary mt-1 flex-shrink-0" /> {h}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    );
};

export default AcrylicOrder;
