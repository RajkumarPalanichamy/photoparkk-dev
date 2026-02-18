
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
    Crop,
    Layers,
    Scissors
} from "lucide-react";
import axiosInstance from "../../utils/axiosInstance";
import { toast } from "react-toastify";

const COMMON_HIGHLIGHTS = [
    "High-Quality Finish & Durable Material",
    "Perfect for Home Decor & Gifting",
    "Customizable with Your Photo",
    "Secure Packaging for Safe Delivery",
    "Eco-Friendly Printing Process",
    "Crafted with Precision & Love",
    "Easy to Hang or Display",
    "Multiple Sizes & Thickness Options",
    "Premium quality materials",
    "Edge-to-edge printing",
];

const GenericOrder = ({ type, shape }) => {
    const router = useRouter();
    const [orderData, setOrderData] = useState(null);
    const [quantity, setQuantity] = useState(1);
    const [userId, setUserId] = useState(null);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (typeof window !== "undefined") {
            const storedData = sessionStorage.getItem(`${type}_custom_data`);
            if (storedData) {
                const parsed = JSON.parse(storedData);
                setOrderData(parsed);
            } else {
                toast.error("No customization data found. Please start from the editor.");
                router.push(`/shop/${type}/${shape}`);
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
    }, [type, shape, router]);

    const handleAddToCart = async () => {
        if (!orderData || quantity < 1) {
            toast.error("Invalid order data.");
            return;
        }

        if (!userId) {
            toast.error("Please log in to add items to cart.");
            router.push("/login");
            return;
        }

        setLoading(true);
        try {
            const config = orderData.configuration;

            const cartData = {
                userId,
                productType: `${type.charAt(0).toUpperCase() + type.slice(1)}Customized`,
                title: `${type.charAt(0).toUpperCase() + type.slice(1)} ${shape.charAt(0).toUpperCase() + shape.slice(1)} Frame`,
                image: orderData.photoData?.url,
                size: config.size.label,
                thickness: type === 'acrylic' ? config.thickness.value : undefined,
                edge: config.edge?.value, // Pass edge type if supported
                price: config.price,
                quantity,
                totalAmount: config.price * quantity,
                uploadedImageUrl: orderData.photoData?.url,
                customizationDetails: { // Store technical details for production
                    crop: config.crop,
                    edge: config.edge,
                    thickness: config.thickness,
                    originalName: orderData.photoData?.name
                }
            };

            await axiosInstance.post("/cart", cartData);
            toast.success("Item added to cart successfully!");
            router.push("/cart");
        } catch (error) {
            console.error("Add to cart failed", error);
            toast.error("Failed to add to cart.");
        } finally {
            setLoading(false);
        }
    };

    if (!orderData) return <div className="min-h-screen flex text-center items-center justify-center gap-2"><Loader2 className="animate-spin" /> Loading Order Details...</div>;

    const { photoData, configuration } = orderData;
    const { size, thickness, edge, price } = configuration;

    const typeTitle = type.charAt(0).toUpperCase() + type.slice(1);
    const shapeTitle = shape.charAt(0).toUpperCase() + shape.slice(1);

    // Simple Render Preview (Ideally would use the cropped result if we generated it, but original is fine for review)
    const renderPreview = () => {
        const borderStyle = {
            borderColor: "#e5e5e5",
            borderWidth: thickness?.value === '8mm' ? '12px' : thickness?.value === '5mm' ? '8px' : '4px',
            boxShadow: '0 10px 30px -10px rgba(0,0,0,0.2)'
        };

        // Simple shape masking logic for review
        const isCircle = shape === 'round';
        const isHex = shape === 'hexagon';
        const isLove = shape === 'love';

        return (
            <div className={`relative w-full max-w-sm mx-auto overflow-hidden bg-white ${isCircle ? 'rounded-full scale-90' : 'rounded-lg'}`} style={borderStyle}>
                <div className={`relative w-full aspect-square ${isHex ? 'hex-mask' : ''}`}>
                    {/* Note: Hex/Love masks are complex in CSS, using simple fallback or img tag */}
                    <img src={photoData.url} alt="Preview" className={`w-full h-full object-cover ${isCircle ? 'rounded-full' : ''}`} />
                </div>
                {/* Visual Glint */}
                <div className="absolute inset-0 bg-gradient-to-tr from-white/30 to-transparent pointer-events-none"></div>
            </div>
        );
    }

    return (
        <div className="bg-neutral-50 pt-[120px] pb-12 px-4 font-[Poppins]">
            <div className="max-w-6xl mx-auto">
                <div className="text-center mb-10">
                    <div className="inline-flex items-center gap-2 bg-success/10 text-success px-4 py-1.5 rounded-full mb-4">
                        <CheckCircle2 className="w-4 h-4" />
                        <span className="font-semibold text-sm">Review Your Specifications</span>
                    </div>
                    <h1 className="text-3xl md:text-4xl font-bold text-secondary">
                        Ready to Create?
                    </h1>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
                    {/* Left: Preview */}
                    <div className="md:col-span-5 bg-white rounded-2xl shadow-lg border border-neutral-100 p-6 sticky top-24">
                        <div className="bg-neutral-50 rounded-xl p-8 mb-4 border border-neutral-100 min-h-[300px] flex items-center justify-center">
                            {renderPreview()}
                        </div>
                        <div className="flex items-center justify-center gap-2 text-xs text-neutral-400">
                            <Sparkles className="w-3 h-3" /> Preview including thickness effect
                        </div>
                    </div>

                    {/* Right: Details & Checkout */}
                    <div className="md:col-span-7 space-y-6">
                        <div className="bg-white rounded-2xl shadow-lg border border-neutral-100 overflow-hidden">
                            <div className="bg-secondary px-6 py-4 flex justify-between items-center text-white">
                                <h2 className="text-lg font-bold flex items-center gap-2">
                                    <Package className="w-5 h-5" />
                                    Order Summary
                                </h2>
                                <button onClick={() => router.back()} className="text-xs text-neutral-300 hover:text-white underline">Edit Design</button>
                            </div>

                            <div className="p-6 md:p-8 space-y-6">
                                {/* Configuration Grid */}
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    <div className="flex items-start gap-3 p-4 bg-neutral-50 rounded-xl border border-neutral-100">
                                        <div className="p-2 bg-white rounded-lg shadow-sm text-primary"><Ruler className="w-5 h-5" /></div>
                                        <div>
                                            <p className="text-xs text-neutral-500 font-medium uppercase tracking-wider">Size</p>
                                            <p className="font-semibold text-secondary text-lg">{size.label}</p>
                                        </div>
                                    </div>

                                    <div className="flex items-start gap-3 p-4 bg-neutral-50 rounded-xl border border-neutral-100">
                                        <div className="p-2 bg-white rounded-lg shadow-sm text-primary"><Layers className="w-5 h-5" /></div>
                                        <div>
                                            <p className="text-xs text-neutral-500 font-medium uppercase tracking-wider">Thickness</p>
                                            <p className="font-semibold text-secondary text-lg">{thickness.label}</p>
                                        </div>
                                    </div>

                                    <div className="flex items-start gap-3 p-4 bg-neutral-50 rounded-xl border border-neutral-100">
                                        <div className="p-2 bg-white rounded-lg shadow-sm text-primary"><Scissors className="w-5 h-5" /></div>
                                        <div>
                                            <p className="text-xs text-neutral-500 font-medium uppercase tracking-wider">Edge Finish</p>
                                            <p className="font-semibold text-secondary text-lg">{edge.label}</p>
                                        </div>
                                    </div>

                                    <div className="flex items-start gap-3 p-4 bg-neutral-50 rounded-xl border border-neutral-100">
                                        <div className="p-2 bg-white rounded-lg shadow-sm text-primary"><Crop className="w-5 h-5" /></div>
                                        <div>
                                            <p className="text-xs text-neutral-500 font-medium uppercase tracking-wider">Product</p>
                                            <p className="font-semibold text-secondary text-lg">{typeTitle} {shapeTitle}</p>
                                        </div>
                                    </div>
                                </div>

                                {/* Divider */}
                                <div className="h-px bg-neutral-100 w-full my-4"></div>

                                {/* Total Price Section */}
                                <div className="space-y-4">
                                    <div className="flex items-center justify-between text-neutral-600">
                                        <span>Unit Price</span>
                                        <span className="font-medium">₹{price}</span>
                                    </div>

                                    <div className="flex items-center justify-between bg-neutral-50 p-4 rounded-xl">
                                        <div className="flex items-center gap-3">
                                            <span className="font-semibold text-secondary">Quantity</span>
                                            <div className="flex items-center bg-white rounded-lg border border-neutral-200">
                                                <button onClick={() => setQuantity(Math.max(1, quantity - 1))} className="px-3 py-1 hover:bg-neutral-100 rounded-l-lg">-</button>
                                                <span className="px-3 font-medium">{quantity}</span>
                                                <button onClick={() => setQuantity(quantity + 1)} className="px-3 py-1 hover:bg-neutral-100 rounded-r-lg">+</button>
                                            </div>
                                        </div>
                                        <div className="text-right">
                                            <span className="block text-xs text-neutral-400">Total Amount</span>
                                            <span className="text-2xl font-bold text-primary">₹{price * quantity}</span>
                                        </div>
                                    </div>
                                </div>

                                {/* Checkout Button */}
                                <button
                                    onClick={handleAddToCart}
                                    disabled={loading}
                                    className="w-full bg-primary hover:bg-primary-hover text-white py-4 rounded-xl font-bold text-lg shadow-xl hover:shadow-2xl hover:-translate-y-1 transition-all flex items-center justify-center gap-3"
                                >
                                    {loading ? <Loader2 className="animate-spin" /> : <FaShoppingCart />}
                                    Proceed to Checkout
                                </button>

                                <div className="grid grid-cols-2 gap-4 pt-2">
                                    <div className="flex items-center gap-2 text-neutral-500 text-xs justify-center">
                                        <FaTruck className="text-primary" /> Free Shipping
                                    </div>
                                    <div className="flex items-center gap-2 text-neutral-500 text-xs justify-center">
                                        <FaLock className="text-primary" /> Secure Transaction
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Highlights Accordion or List */}
                        <div className="bg-white rounded-2xl p-6 shadow-sm border border-neutral-100">
                            <h4 className="font-bold text-secondary mb-4 flex items-center gap-2"><Sparkles className="w-4 h-4 text-primary" /> Premium Features</h4>
                            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm text-neutral-600">
                                {COMMON_HIGHLIGHTS.slice(0, 6).map((h, i) => (
                                    <li key={i} className="flex items-center gap-2"><BsPatchCheckFill className="text-success w-3 h-3" /> {h}</li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default GenericOrder;
