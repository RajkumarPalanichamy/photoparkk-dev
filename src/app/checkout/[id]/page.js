'use client';

import React, { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { State, City } from "country-state-city";
import {
    ShoppingCart,
    User,
    Mail,
    Phone,
    CreditCard,
    Truck,
    Package,
    Loader2,
    ArrowLeft,
    Lock,
    Send,
    CheckCircle2,
} from "lucide-react";
import { toast } from "react-toastify";
import axiosInstance from "@/utils/axiosInstance";
import { createPaymentOrder, initializePayment } from "@/utils/paymentUtils";
import { useCart } from "@/context/CartContext";

const CHECKOUT_RETURN_URL_KEY = "checkoutReturnUrl";
const PLACEHOLDER_IMAGE = "https://via.placeholder.com/400?text=No+Image";

function safeImageSrc(url) {
    const u = url != null ? String(url).trim() : "";
    if (!u) return PLACEHOLDER_IMAGE;
    if (!/^https?:\/\/[^\s/]+/i.test(u)) return PLACEHOLDER_IMAGE;
    return u;
}

function normalizeCartItem(row) {
    if (!row) return null;
    return {
        ...row,
        _id: row._id ?? row.id,
        id: row.id ?? row._id,
        totalAmount: row.totalAmount ?? row.total_amount,
        productType: row.productType ?? row.product_type,
        uploadedImageUrl: row.uploadedImageUrl ?? row.uploaded_image_url,
    };
}

const CommonCheckout = () => {
    const { id: cartItemId } = useParams();
    const router = useRouter();
    const { cartItems: contextCartItems, isGuest } = useCart();

    const [cartItem, setCartItem] = useState(null);
    const [loading, setLoading] = useState(true);
    const [paymentLoading, setPaymentLoading] = useState(false);
    const [paymentMethod, setPaymentMethod] = useState("ONLINE");

    const [guestEmail, setGuestEmail] = useState("");
    const [guestName, setGuestName] = useState("");
    const [signupLoading, setSignupLoading] = useState(false);
    const [signupSuccess, setSignupSuccess] = useState(false);

    const [form, setForm] = useState({
        name: "",
        email: "",
        phone: "",
        address: "",
        state: "",
        stateCode: "",
        district: "",
        city: "",
        pincode: "",
    });

    const [statesList, setStatesList] = useState([]);
    const [citiesList, setCitiesList] = useState([]);

    const SHIPPING_CHARGE = 100;

    useEffect(() => {
        if (!cartItemId) {
            setLoading(false);
            return;
        }
        const user = typeof window !== "undefined" ? localStorage.getItem("user") : null;
        if (user) {
            const fetchCartItem = async () => {
                try {
                    const { data } = await axiosInstance.get(`/cart/${cartItemId}`);
                    setCartItem(normalizeCartItem(data));
                } catch (error) {
                    console.error("Error fetching cart item:", error);
                    toast.error("Failed to load cart item");
                    setCartItem(null);
                } finally {
                    setLoading(false);
                }
            };
            fetchCartItem();
        } else {
            const list = Array.isArray(contextCartItems) ? contextCartItems : [];
            const found = list.find((i) => (i._id || i.id) === cartItemId);
            setCartItem(found ? normalizeCartItem(found) : null);
            setLoading(false);
        }
    }, [cartItemId, contextCartItems]);

    useEffect(() => {
        const allStates = State.getStatesOfCountry("IN") || [];
        setStatesList(allStates);
    }, []);

    useEffect(() => {
        if (!form.stateCode) {
            setCitiesList([]);
            return;
        }
        const allCities = City.getCitiesOfState("IN", form.stateCode) || [];
        setCitiesList(allCities);
    }, [form.stateCode]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setForm((prev) => ({ ...prev, [name]: value }));
    };

    const handleCheckoutSignup = async (e) => {
        e.preventDefault();
        const email = (guestEmail || "").trim().toLowerCase();
        const name = (guestName || "").trim();
        if (!email) {
            toast.error("Please enter your email address");
            return;
        }
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            toast.error("Please enter a valid email address");
            return;
        }
        setSignupLoading(true);
        try {
            const res = await fetch("/api/auth/checkout-signup", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, name: name || undefined }),
            });
            let data = {};
            try {
                data = await res.json();
            } catch (_) {
                data = { message: "Invalid response from server" };
            }
            if (!res.ok) {
                toast.error(data.message || "Something went wrong. Please try again.");
                return;
            }
            localStorage.setItem("user", JSON.stringify(data.user));
            localStorage.setItem("accessToken", data.accessToken);
            localStorage.setItem("refreshToken", data.refreshToken);

            const guestCartRaw = typeof window !== "undefined" ? localStorage.getItem("guestCart") : null;
            let guestCart = [];
            try {
                if (guestCartRaw) guestCart = JSON.parse(guestCartRaw);
            } catch (_) {}

            if (guestCart.length > 0) {
                const mergeRes = await fetch("/api/cart/merge", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${data.accessToken}`,
                    },
                    body: JSON.stringify({ guestCart }),
                });
                if (mergeRes.ok) {
                    localStorage.removeItem("guestCart");
                    const mergeData = await mergeRes.json();
                    const merged = mergeData.merged || [];
                    setSignupSuccess(true);
                    toast.success(data.message || "You're logged in.");
                    if (merged.length > 0) {
                        const nextUrl = `/checkout/${merged[0]._id || merged[0].id}`;
                        setTimeout(() => { window.location.href = nextUrl; }, 600);
                    } else {
                        setTimeout(() => { window.location.href = "/cart"; }, 600);
                    }
                    return;
                }
            }
            setSignupSuccess(true);
            toast.success(data.message || "You're logged in.");
            setTimeout(() => { window.location.href = "/cart"; }, 600);
        } catch (err) {
            console.error(err);
            toast.error(err?.message || "Something went wrong. Please try again.");
        } finally {
            setSignupLoading(false);
        }
    };

    const validateForm = () => {
        const phoneRegex = /^[6-9]\d{9}$/;
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const pincodeRegex = /^\d{6}$/;

        if (!form.name.trim()) return toast.error("Please enter your full name") && false;
        if (!phoneRegex.test(form.phone)) return toast.error("Invalid mobile number") && false;
        if (!emailRegex.test(form.email)) return toast.error("Invalid email address") && false;
        if (!form.address.trim()) return toast.error("Please enter delivery address") && false;
        if (!form.state) return toast.error("Please select a state") && false;
        if (!form.city) return toast.error("Please select a city") && false;
        if (!pincodeRegex.test(form.pincode)) return toast.error("Invalid pincode") && false;

        return true;
    };

    const handlePayment = async () => {
        if (!validateForm()) return;

        setPaymentLoading(true);

        try {
            const user = JSON.parse(localStorage.getItem("user"));
            if (!user) {
                toast.error("Please log in to proceed");
                router.push("/login");
                return;
            }

            const itemsTotal = Number(cartItem.totalAmount || cartItem.price * cartItem.quantity || 0);
            const totalAmount = itemsTotal + SHIPPING_CHARGE;

            if (paymentMethod === "COD") {
                const fd = new FormData();
                fd.append("cartItemId", cartItem._id || cartItem.id);
                fd.append("productType", cartItem.productType || "custom");
                fd.append("amount", String(totalAmount));
                fd.append(
                    "deliveryDetails",
                    JSON.stringify({
                        name: form.name,
                        email: form.email,
                        phone: form.phone,
                        address: form.address,
                        state: form.state,
                        district: form.district,
                        city: form.city,
                        pincode: form.pincode,
                        shippingCharge: SHIPPING_CHARGE,
                        itemsTotal,
                    })
                );

                await axiosInstance.post("/orders", fd);
                toast.success("Order placed successfully with Cash on Delivery!");
                router.push("/my-orders");
            } else {
                // Online Payment
                const paymentData = {
                    orderPayload: { // Encapsulate payload for paymentUtils usage
                        amount: totalAmount,
                        cartItemId: cartItem._id || cartItem.id,
                        productType: cartItem.productType || "custom",
                        deliveryDetails: {
                            ...form,
                            shippingCharge: SHIPPING_CHARGE,
                            itemsTotal,
                        },
                    },
                    // For Razorpay creation
                    amount: totalAmount,
                    currency: "INR"
                };

                const orderData = await createPaymentOrder(paymentData);
                // paymentData needs to be passed for initialization because it contains the payload used in success handler
                // Update orderData to include payload
                orderData.orderPayload = paymentData.orderPayload;

                await initializePayment(orderData, form);
            }
        } catch (error) {
            if (error.message === "PAYMENT_CANCELLED") {
                console.log("User cancelled payment flow");
                return;
            }
            console.error("Payment failed:", error);
            toast.error(error.message || "Payment failed");
        } finally {
            setPaymentLoading(false);
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-primary flex items-center justify-center pt-[100px]">
                <div className="text-center">
                    <Loader2 className="w-12 h-12 animate-spin text-primary mx-auto mb-4" />
                    <p className="text-neutral-600 font-medium">Loading checkout...</p>
                </div>
            </div>
        );
    }

    if (!cartItem) {
        return (
            <div className="min-h-screen bg-neutral-50 flex items-center justify-center pt-[100px]">
                <div className="text-center bg-white rounded-2xl shadow-xl p-8 max-w-md">
                    <Package className="w-16 h-16 text-neutral-400 mx-auto mb-4" />
                    <h3 className="text-2xl font-bold text-secondary mb-2">Item not found</h3>
                    <p className="text-neutral-600 mb-6">The cart item you're looking for doesn't exist.</p>
                    <Link
                        href="/cart"
                        className="inline-flex items-center gap-2 bg-primary hover:bg-primary-hover text-white px-6 py-3 rounded-xl font-semibold transition-all duration-300"
                    >
                        <ArrowLeft className="w-5 h-5" />
                        Back to Cart
                    </Link>
                </div>
            </div>
        );
    }

    const product = cartItem.productId || {}; // Will be ID string in existing setup
    const itemsTotal = Number(cartItem.totalAmount || cartItem.price * cartItem.quantity || 0);
    const totalAmount = itemsTotal + SHIPPING_CHARGE;

    if (isGuest) {
        return (
            <div className="min-h-screen bg-neutral-50 py-8 px-4 pt-[100px]">
                <div className="max-w-7xl mx-auto">
                    <div className="mb-8">
                        <Link href="/cart" className="inline-flex items-center gap-2 text-neutral-600 hover:text-primary mb-4 transition">
                            <ArrowLeft className="w-4 h-4" />
                            <span>Back to Cart</span>
                        </Link>
                        <div className="flex items-center gap-3">
                            <div className="p-3 bg-primary rounded-xl shadow-lg">
                                <ShoppingCart className="w-8 h-8 text-white" />
                            </div>
                            <div>
                                <h1 className="text-4xl md:text-5xl font-bold text-secondary">Checkout</h1>
                                <p className="text-neutral-600 mt-1">Enter your email to create an account and continue. We'll email you a password and log you in.</p>
                            </div>
                        </div>
                    </div>
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                        <div className="lg:col-span-2">
                            <div className="bg-white rounded-2xl shadow-xl border border-neutral-200 overflow-hidden">
                                <div className="bg-primary px-6 py-4">
                                    <h2 className="text-xl font-bold text-white flex items-center gap-2">
                                        <Mail className="w-6 h-6" />
                                        Continue with Email
                                    </h2>
                                </div>
                                <div className="p-6">
                                    {signupSuccess ? (
                                        <div className="text-center py-4">
                                            <CheckCircle2 className="w-14 h-14 text-green-500 mx-auto mb-4" />
                                            <p className="text-lg font-medium text-secondary mb-2">Account created. You're logged in.</p>
                                            <p className="text-neutral-600 text-sm">We've sent your password to your email. Redirecting to checkout…</p>
                                        </div>
                                    ) : (
                                        <form onSubmit={handleCheckoutSignup} className="space-y-4">
                                            <div>
                                                <label className="block text-sm font-semibold text-neutral-700 mb-1">Your name (optional)</label>
                                                <input
                                                    type="text"
                                                    value={guestName}
                                                    onChange={(e) => setGuestName(e.target.value)}
                                                    placeholder="e.g. John"
                                                    className="w-full px-4 py-3 border border-neutral-300 rounded-lg focus:ring-2 ring-primary outline-none"
                                                    disabled={signupLoading}
                                                />
                                            </div>
                                            <div>
                                                <label className="block text-sm font-semibold text-neutral-700 mb-1">Email address *</label>
                                                <input
                                                    type="email"
                                                    value={guestEmail}
                                                    onChange={(e) => setGuestEmail(e.target.value)}
                                                    placeholder="you@example.com"
                                                    className="w-full px-4 py-3 border border-neutral-300 rounded-lg focus:ring-2 ring-primary outline-none"
                                                    disabled={signupLoading}
                                                    autoComplete="email"
                                                />
                                            </div>
                                            <button
                                                type="submit"
                                                disabled={signupLoading}
                                                className="w-full py-3 bg-primary text-white rounded-xl font-semibold hover:bg-primary-hover transition-all flex justify-center items-center gap-2 disabled:opacity-70"
                                            >
                                                {signupLoading ? <Loader2 className="w-5 h-5 animate-spin" /> : <Send className="w-5 h-5" />}
                                                {signupLoading ? "Creating account…" : "Create account & continue"}
                                            </button>
                                        </form>
                                    )}
                                </div>
                            </div>
                        </div>
                        <div className="lg:col-span-1">
                            <div className="bg-white rounded-2xl shadow-xl border border-neutral-200 overflow-hidden sticky top-[120px]">
                                <div className="bg-primary px-6 py-4">
                                    <h3 className="text-xl font-bold text-white flex items-center gap-2"><Package className="w-6 h-6" /> Order Summary</h3>
                                </div>
                                <div className="p-6 space-y-4">
                                    <img src={safeImageSrc(cartItem?.image)} alt="" className="w-full h-48 object-contain bg-neutral-50 rounded-lg" />
                                    <h4 className="text-lg font-bold">{cartItem.title}</h4>
                                    <div className="flex justify-between text-sm">
                                        <span>Items Total</span>
                                        <span className="font-bold">₹{itemsTotal}</span>
                                    </div>
                                    <div className="flex justify-between text-sm">
                                        <span>Shipping</span>
                                        <span className="font-bold">₹{SHIPPING_CHARGE}</span>
                                    </div>
                                    <div className="flex justify-between text-xl font-bold border-t pt-4">
                                        <span>Grand Total</span>
                                        <span className="text-primary">₹{totalAmount}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-neutral-50 py-8 px-4 pt-[100px]">
            <div className="max-w-7xl mx-auto">
                <div className="mb-8">
                    <Link
                        href="/cart"
                        className="inline-flex items-center gap-2 text-neutral-600 hover:text-primary mb-4 transition"
                    >
                        <ArrowLeft className="w-4 h-4" />
                        <span>Back to Cart</span>
                    </Link>
                    <div className="flex items-center gap-3">
                        <div className="p-3 bg-primary rounded-xl shadow-lg">
                            <ShoppingCart className="w-8 h-8 text-white" />
                        </div>
                        <div>
                            <h1 className="text-4xl md:text-5xl font-bold text-secondary">Checkout</h1>
                            <p className="text-neutral-600 mt-1">Complete your order details and payment</p>
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    <div className="lg:col-span-2 space-y-6">
                        <div className="bg-white rounded-2xl shadow-xl border border-neutral-200 overflow-hidden">
                            <div className="bg-primary px-6 py-4">
                                <h2 className="text-xl font-bold text-white flex items-center gap-2">
                                    <User className="w-6 h-6" />
                                    Delivery Information
                                </h2>
                            </div>
                            <div className="p-6 space-y-5">
                                {/* Form Fields: Name, Email etc */}
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm font-semibold text-neutral-700 mb-2">Full Name *</label>
                                        <input name="name" value={form.name} onChange={handleInputChange} className="w-full px-4 py-3 border border-neutral-300 rounded-lg focus:ring-2 ring-primary outline-none" placeholder="Full Name" />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-semibold text-neutral-700 mb-2">Email *</label>
                                        <input name="email" value={form.email} onChange={handleInputChange} className="w-full px-4 py-3 border border-neutral-300 rounded-lg focus:ring-2 ring-primary outline-none" placeholder="Email Address" />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-semibold text-neutral-700 mb-2">Phone *</label>
                                        <input name="phone" value={form.phone} onChange={handleInputChange} className="w-full px-4 py-3 border border-neutral-300 rounded-lg focus:ring-2 ring-primary outline-none" placeholder="Phone Number" maxLength={10} />
                                    </div>
                                    <div className="md:col-span-2">
                                        <label className="block text-sm font-semibold text-neutral-700 mb-2">Address *</label>
                                        <textarea name="address" value={form.address} onChange={handleInputChange} className="w-full px-4 py-3 border border-neutral-300 rounded-lg focus:ring-2 ring-primary outline-none" placeholder="Complete Address" rows={3}></textarea>
                                    </div>
                                    <div>
                                        <label className="block text-sm font-semibold text-neutral-700 mb-2">State *</label>
                                        <select value={form.stateCode} onChange={(e) => {
                                            const code = e.target.value;
                                            const st = statesList.find(s => s.isoCode === code);
                                            setForm(prev => ({ ...prev, stateCode: code, state: st?.name || "", district: "", city: "" }));
                                        }} className="w-full px-4 py-3 border border-neutral-300 rounded-lg focus:ring-2 ring-primary outline-none">
                                            <option value="">Select State</option>
                                            {statesList.map(s => <option key={s.isoCode} value={s.isoCode}>{s.name}</option>)}
                                        </select>
                                    </div>
                                    <div>
                                        <label className="block text-sm font-semibold text-neutral-700 mb-2">City *</label>
                                        <select value={form.city} onChange={(e) => setForm(prev => ({ ...prev, city: e.target.value }))} disabled={!form.stateCode} className="w-full px-4 py-3 border border-neutral-300 rounded-lg focus:ring-2 ring-primary outline-none">
                                            <option value="">Select City</option>
                                            {citiesList.map(c => <option key={c.name} value={c.name}>{c.name}</option>)}
                                        </select>
                                    </div>
                                    <div>
                                        <label className="block text-sm font-semibold text-neutral-700 mb-2">Pincode *</label>
                                        <input name="pincode" value={form.pincode} onChange={handleInputChange} className="w-full px-4 py-3 border border-neutral-300 rounded-lg focus:ring-2 ring-primary outline-none" placeholder="6-digit Pincode" maxLength={6} />
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="bg-white rounded-2xl shadow-xl border border-neutral-200 overflow-hidden">
                            <div className="bg-primary px-6 py-4">
                                <h2 className="text-xl font-bold text-white flex items-center gap-2"><CreditCard /> Payment Method</h2>
                            </div>
                            <div className="p-6">
                                <div className="flex gap-4">
                                    <button onClick={() => setPaymentMethod("ONLINE")} className={`flex-1 p-4 border rounded-xl flex items-center gap-3 ${paymentMethod === "ONLINE" ? "bg-primary-light border-primary" : "border-neutral-200"}`}>
                                        <CreditCard className="text-primary" />
                                        <span className="font-bold">Pay Online</span>
                                    </button>
                                    <button onClick={() => setPaymentMethod("COD")} className={`flex-1 p-4 border rounded-xl flex items-center gap-3 ${paymentMethod === "COD" ? "bg-primary-light border-primary" : "border-neutral-200"}`}>
                                        <Truck className="text-secondary" />
                                        <span className="font-bold">Cash On Delivery</span>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="lg:col-span-1">
                        <div className="bg-white rounded-2xl shadow-xl border border-neutral-200 overflow-hidden sticky top-[120px]">
                            <div className="bg-primary px-6 py-4">
                                <h3 className="text-xl font-bold text-white flex items-center gap-2"><Package /> Order Summary</h3>
                            </div>
                            <div className="p-6 space-y-4">
                                <img src={safeImageSrc(cartItem?.image)} alt="" className="w-full h-48 object-contain bg-neutral-50 rounded-lg" />
                                <h4 className="text-lg font-bold">{cartItem.title}</h4>
                                <div className="flex justify-between text-sm">
                                    <span>Items Total</span>
                                    <span className="font-bold">₹{itemsTotal}</span>
                                </div>
                                <div className="flex justify-between text-sm">
                                    <span>Shipping</span>
                                    <span className="font-bold">₹{SHIPPING_CHARGE}</span>
                                </div>
                                <div className="flex justify-between text-xl font-bold border-t pt-4">
                                    <span>Grand Total</span>
                                    <span className="text-primary">₹{totalAmount}</span>
                                </div>
                                <button onClick={handlePayment} disabled={paymentLoading} className="w-full py-4 bg-primary text-white rounded-xl font-bold hover:bg-primary-hover transition-all flex justify-center items-center gap-2">
                                    {paymentLoading ? <Loader2 className="animate-spin" /> : <Lock size={18} />}
                                    {paymentMethod === 'COD' ? 'Place Order' : `Pay ₹${totalAmount}`}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CommonCheckout;
