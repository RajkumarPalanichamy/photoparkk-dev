'use client';

import React, { useState } from "react";
import axiosInstance from "@/utils/axiosInstance"; // Ensure this alias works or use relative
import { useRouter } from "next/navigation";
import { User, Mail, Lock, Eye, EyeOff, Loader2, X } from "lucide-react";

// You might need to install lucide-react if not present, but I installed it.

const Login = () => {
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
    const [showForgotPassword, setShowForgotPassword] = useState(false);
    const [forgotPasswordEmail, setForgotPasswordEmail] = useState("");
    const [forgotPasswordLoading, setForgotPasswordLoading] = useState(false);
    const [forgotPasswordError, setForgotPasswordError] = useState("");
    const [forgotPasswordSuccess, setForgotPasswordSuccess] = useState("");
    const router = useRouter();

    const onChangeHandler = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
        if (error) setError("");
    };

    const toggleState = () => {
        setCurrentState(currentState === "Login" ? "Sign Up" : "Login");
        setError("");
        setSuccess("");
        setFormData({ name: "", email: "", password: "" });
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
                await axiosInstance.post("auth/register", { // Updated path
                    name,
                    email,
                    password,
                });
                setSuccess("Registered successfully! Please log in.");
                setTimeout(() => {
                    setCurrentState("Login");
                    setFormData({ name: "", email: "", password: "" });
                }, 1500);
            } else {
                const res = await axiosInstance.post("auth/login", { // Updated path
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
                        if (res.data.user.role === "admin") {
                            router.push("/admin");
                        } else {
                            router.push("/");
                        }
                    }, 1000);
                }
            }
        } catch (err) {
            const msg =
                err.response?.data?.message || "Something went wrong. Try again.";
            setError(msg);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="bg-neutral-50 flex items-center justify-center p-4 min-h-screen pt-24">
            <div className="w-full max-w-md">
                <div className="bg-white/80 backdrop-blur-lg rounded-2xl shadow-2xl border border-white/20 overflow-hidden transition-all duration-300 hover:shadow-3xl">
                    <div className="bg-primary p-8 text-center">
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

                    <div className="p-8">
                        <form onSubmit={onSubmitHandler} className="space-y-5">
                            {currentState === "Sign Up" && (
                                <div className="space-y-2 animate-in slide-in-from-top-2 duration-300">
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
                                            autoComplete="name"
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
                                        autoComplete="email"
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
                                        autoComplete={
                                            currentState === "Login"
                                                ? "current-password"
                                                : "new-password"
                                        }
                                        required
                                    />
                                    <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-neutral-400" />
                                    <button
                                        type="button"
                                        onClick={() => setShowPassword(!showPassword)}
                                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-neutral-400 hover:text-neutral-600 transition-colors"
                                    >
                                        {showPassword ? (
                                            <EyeOff className="w-5 h-5" />
                                        ) : (
                                            <Eye className="w-5 h-5" />
                                        )}
                                    </button>
                                </div>
                            </div>

                            {error && (
                                <div className="bg-error-light border-l-4 border-error p-4 rounded-r-lg animate-in slide-in-from-left-2 duration-300">
                                    <p className="text-error text-sm font-medium">{error}</p>
                                </div>
                            )}

                            {success && (
                                <div className="bg-success-light border-l-4 border-success p-4 rounded-r-lg animate-in slide-in-from-left-2 duration-300">
                                    <p className="text-success text-sm font-medium">{success}</p>
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
                                        {currentState === "Login" ? "Signing in..." : "Creating account..."}
                                    </>
                                ) : currentState === "Login" ? (
                                    "Sign In"
                                ) : (
                                    "Create Account"
                                )}
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
                </div>

                <p className="text-center text-neutral-500 text-sm mt-6">
                    By continuing, you agree to our Terms of Service and Privacy Policy
                </p>
            </div>

            {showForgotPassword && (
                <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
                    {/* Forgot password modal implementation omitted for brevity, but you can add it back similarly */}
                    <div className="bg-white p-6 rounded-xl">
                        <p>Forgot password functionality requires backend implementation.</p>
                        <button onClick={() => setShowForgotPassword(false)}>Close</button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Login;
