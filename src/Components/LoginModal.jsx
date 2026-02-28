'use client';

import React, { useState, useEffect } from "react";
import axiosInstance from "@/utils/axiosInstance";
import { User, Mail, Lock, Eye, EyeOff, Loader2, X } from "lucide-react";

/**
 * LoginModal that exactly matches the design of the old login page (page.js)
 */
const LoginModal = ({ isOpen, onClose }) => {
    const [currentState, setCurrentState] = useState("Login");
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
    });
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    const toggleState = () => {
        setCurrentState(currentState === "Login" ? "Sign Up" : "Login");
        setError("");
        setSuccess("");
        setFormData({ name: "", email: "", password: "" });
    };

    const onChangeHandler = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
        if (error) setError("");
    };

    const onSubmitHandler = async (event) => {
        event.preventDefault();
        setError("");
        setSuccess("");
        setLoading(true);

        const name = formData.name.trim();
        const email = formData.email.trim();
        const password = formData.password.trim();

        try {
            if (currentState === "Sign Up") {
                await axiosInstance.post("auth/register", {
                    name,
                    email,
                    password,
                });
                setSuccess("Registered successfully! Please log in.");
                setTimeout(() => {
                    setCurrentState("Login");
                    setFormData({ name: "", email: "", password: "" });
                    setSuccess("");
                }, 1500);
            } else {
                const res = await axiosInstance.post("auth/login", {
                    email,
                    password,
                });

                if (res.data.accessToken) {
                    localStorage.setItem("accessToken", res.data.accessToken);
                    localStorage.setItem("refreshToken", res.data.refreshToken);
                    localStorage.setItem("user", JSON.stringify(res.data.user));
                    localStorage.setItem("role", res.data.user.role);

                    setSuccess("Logged in successfully!");
                    window.dispatchEvent(new Event("storage"));

                    setTimeout(() => {
                        onClose();
                    }, 800);
                }
            }
        } catch (err) {
            const msg = err.response?.data?.message || "Something went wrong. Try again.";
            setError(msg);
        } finally {
            setLoading(false);
        }
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-[1000] flex items-center justify-center p-4">
            {/* Backdrop */}
            <div
                className="absolute inset-0 bg-neutral-900/60 backdrop-blur-sm transition-opacity"
                onClick={onClose}
            />

            {/* Modal Content - Matching the "Page Style" exactly */}
            <div className="relative w-full max-w-md bg-white rounded-2xl shadow-2xl border border-white/20 overflow-hidden transform transition-all animate-in fade-in zoom-in duration-300">

                {/* Header (Old Page Style) */}
                <div className="bg-primary p-8 text-center relative">
                    <button
                        onClick={onClose}
                        className="absolute right-4 top-4 p-1.5 rounded-full text-white/80 hover:text-white hover:bg-white/10 transition-colors"
                    >
                        <X size={20} />
                    </button>

                    <div className="inline-flex items-center justify-center w-16 h-16 bg-white/20 rounded-full mb-4 backdrop-blur-sm">
                        <User className="w-8 h-8 text-white" />
                    </div>
                    <h1 className="text-3xl font-bold text-white mb-2">
                        {currentState === "Login" ? "Welcome Back" : "Create Account"}
                    </h1>
                    <p className="text-white/90 text-sm">
                        {currentState === "Login"
                            ? "Sign in to continue to Photoparkk"
                            : "Join us and start customizing your photos"}
                    </p>
                </div>

                {/* Body (Old Page Style) */}
                <div className="p-8">
                    <form onSubmit={onSubmitHandler} className="space-y-5">
                        {currentState === "Sign Up" && (
                            <div className="space-y-2">
                                <label className="text-sm font-medium text-neutral-700 flex items-center gap-2">
                                    <User className="w-4 h-4" />
                                    Full Name
                                </label>
                                <div className="relative">
                                    <input
                                        type="text"
                                        name="name"
                                        value={formData.name}
                                        onChange={onChangeHandler}
                                        className="w-full px-4 py-3 pl-11 border-2 border-neutral-200 rounded-xl focus:border-primary focus:ring-2 focus:ring-primary-light outline-none transition-all duration-200 bg-neutral-50 focus:bg-white"
                                        placeholder="Enter your full name"
                                        required
                                    />
                                    <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-neutral-400" />
                                </div>
                            </div>
                        )}

                        <div className="space-y-2">
                            <label className="text-sm font-medium text-neutral-700 flex items-center gap-2">
                                <Mail className="w-4 h-4" />
                                Email Address
                            </label>
                            <div className="relative">
                                <input
                                    type="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={onChangeHandler}
                                    className="w-full px-4 py-3 pl-11 border-2 border-neutral-200 rounded-xl focus:border-primary focus:ring-2 focus:ring-primary-light outline-none transition-all duration-200 bg-neutral-50 focus:bg-white"
                                    placeholder="Enter your email"
                                    required
                                />
                                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-neutral-400" />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-medium text-neutral-700 flex items-center gap-2">
                                <Lock className="w-4 h-4" />
                                Password
                            </label>
                            <div className="relative">
                                <input
                                    type={showPassword ? "text" : "password"}
                                    name="password"
                                    value={formData.password}
                                    onChange={onChangeHandler}
                                    className="w-full px-4 py-3 pl-11 pr-11 border-2 border-neutral-200 rounded-xl focus:border-primary focus:ring-2 focus:ring-primary-light outline-none transition-all duration-200 bg-neutral-50 focus:bg-white"
                                    placeholder="Enter your password"
                                    required
                                />
                                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-neutral-400" />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-neutral-400 hover:text-neutral-600 transition-colors"
                                >
                                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                                </button>
                            </div>
                        </div>

                        {error && (
                            <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded-r-lg">
                                <p className="text-red-700 text-sm font-medium">{error}</p>
                            </div>
                        )}

                        {success && (
                            <div className="bg-green-50 border-l-4 border-green-500 p-4 rounded-r-lg">
                                <p className="text-green-700 text-sm font-medium">{success}</p>
                            </div>
                        )}

                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full bg-primary text-white font-semibold py-3 px-6 rounded-xl shadow-lg hover:bg-primary-hover hover:shadow-xl transform hover:scale-[1.02] transition-all duration-200 disabled:opacity-70 disabled:cursor-not-allowed disabled:transform-none flex items-center justify-center gap-2"
                        >
                            {loading ? (
                                <>
                                    <Loader2 className="w-5 h-5 animate-spin" />
                                    <span>{currentState === "Login" ? "Signing in..." : "Creating account..."}</span>
                                </>
                            ) : currentState === "Login" ? "Sign In" : "Create Account"}
                        </button>
                    </form>

                    <div className="mt-6 text-center">
                        <p className="text-neutral-600 text-sm">
                            {currentState === "Login"
                                ? "Don't have an account? "
                                : "Already have an account? "}
                            <button
                                type="button"
                                onClick={toggleState}
                                className="text-primary hover:text-primary-hover font-semibold transition-colors"
                            >
                                {currentState === "Login" ? "Sign Up" : "Sign In"}
                            </button>
                        </p>
                    </div>
                </div>

                {/* Footer (Old Page Style) */}
                <p className="text-center text-neutral-500 text-xs pb-6 px-8">
                    By continuing, you agree to our Terms of Service and Privacy Policy
                </p>
            </div>
        </div>
    );
};

export default LoginModal;
