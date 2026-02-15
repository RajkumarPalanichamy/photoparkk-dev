'use client';

import React, { useState, useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";
import {
    LayoutDashboard,
    ShoppingBag,
    Package,
    Frame,
    Menu,
    X,
    Home,
    LogOut,
    User,
    Loader2,
} from "lucide-react";
import axiosInstance from "@/utils/axiosInstance";

const AdminLayout = ({ children }) => {
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [user, setUser] = useState(null);
    const [authorized, setAuthorized] = useState(false);
    const router = useRouter();
    const pathname = usePathname();

    useEffect(() => {
        // Auth Check
        const userData = localStorage.getItem("user");
        if (!userData) {
            router.push("/login"); // or admin login
            return;
        }
        try {
            const parsedUser = JSON.parse(userData);
            if (parsedUser.role !== 'admin') {
                router.push("/");
                return;
            }
            setUser(parsedUser);
            setAuthorized(true);
        } catch (err) {
            console.error("Auth check failed:", err);
            router.push("/login");
        }
    }, [router]);

    const handleLogout = async () => {
        try {
            // Optional: Revoke token on server if needed
        } catch (err) {
            console.log("Logout error:", err);
        } finally {
            localStorage.removeItem("accessToken");
            localStorage.removeItem("refreshToken");
            localStorage.removeItem("user");
            router.push("/login");
        }
    };

    const menuItems = [
        {
            icon: LayoutDashboard,
            label: "Dashboard",
            path: "/admin", // Changed from /admin/adminpanel
        },
        {
            icon: ShoppingBag,
            label: "Orders",
            path: "/admin/orders",
        },
        {
            icon: Package,
            label: "Manage Products",
            path: "/admin/products",
        },
        {
            icon: Frame,
            label: "Manage Frames",
            path: "/admin/frames",
        },
    ];

    const isActive = (path) => {
        if (path === "/admin") return pathname === "/admin";
        return pathname.startsWith(path);
    };

    if (!authorized) {
        return (
            <div className="flex h-screen w-full items-center justify-center bg-neutral-50">
                <Loader2 className="h-10 w-10 animate-spin text-primary" />
            </div>
        );
    }

    return (
        <div className="relative min-h-screen bg-neutral-50 flex flex-col">
            {/* Header */}
            <header className="fixed top-0 w-full z-50 bg-white shadow-sm border-b border-neutral-200 h-16 px-4 lg:px-6 flex items-center justify-between">
                <div className="flex items-center gap-4">
                    {/* Mobile Menu Toggle */}
                    <button
                        onClick={() => setSidebarOpen(!sidebarOpen)}
                        className="lg:hidden p-2 rounded-lg hover:bg-neutral-100 text-neutral-600"
                    >
                        <Menu className="w-6 h-6" />
                    </button>

                    <Link href="/admin" className="flex items-center gap-2">
                        <span className="text-xl font-bold text-primary">PhotoParkk</span>
                        <span className="bg-primary/10 text-primary px-2 py-0.5 rounded text-xs font-semibold uppercase tracking-wider">Admin</span>
                    </Link>
                </div>

                <div className="flex items-center gap-4">
                    <Link href="/" className="p-2 rounded-lg hover:bg-neutral-100 text-neutral-500 hover:text-primary transition-colors" title="Go to Store">
                        <Home className="w-5 h-5" />
                    </Link>

                    <div className="relative group">
                        <button className="flex items-center gap-2">
                            <div className="w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center text-sm font-bold shadow-sm">
                                {user?.name?.charAt(0).toUpperCase() || 'A'}
                            </div>
                        </button>

                        {/* Dropdown */}
                        <div className="absolute right-0 top-full mt-2 w-48 bg-white rounded-xl shadow-lg border border-neutral-100 py-1 hidden group-hover:block transition-all transform origin-top-right z-50">
                            <div className="px-4 py-3 border-b border-neutral-100">
                                <p className="text-sm font-medium text-secondary truncate">{user?.name}</p>
                                <p className="text-xs text-neutral-500 truncate">{user?.email}</p>
                            </div>
                            <button onClick={handleLogout} className="w-full text-left px-4 py-2 text-sm text-error hover:bg-error-light/10 transition-colors flex items-center gap-2">
                                <LogOut className="w-4 h-4" /> Sign Out
                            </button>
                        </div>
                    </div>
                </div>
            </header>

            <div className="flex pt-16 h-screen overflow-hidden">
                {/* Sidebar */}
                <aside className={`fixed lg:static top-16 left-0 h-[calc(100vh-64px)] w-64 bg-white border-r border-neutral-200 transform transition-transform duration-300 z-40 overflow-y-auto ${sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}`}>
                    <div className="p-4 space-y-1">
                        {menuItems.map((item) => {
                            const Icon = item.icon;
                            const active = isActive(item.path);
                            return (
                                <Link
                                    key={item.path}
                                    href={item.path}
                                    onClick={() => setSidebarOpen(false)}
                                    className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200 ${active
                                            ? "bg-primary text-white shadow-md shadow-primary/20"
                                            : "text-neutral-600 hover:bg-neutral-50 hover:text-secondary"
                                        }`}
                                >
                                    <Icon className={`w-5 h-5 ${active ? "text-white" : "text-neutral-400 group-hover:text-primary"}`} />
                                    {item.label}
                                </Link>
                            );
                        })}
                    </div>
                </aside>

                {/* Overlay for mobile */}
                {sidebarOpen && (
                    <div
                        className="fixed inset-0 bg-black/50 z-30 lg:hidden top-16"
                        onClick={() => setSidebarOpen(false)}
                    />
                )}

                {/* Main Content */}
                <main className="flex-1 overflow-y-auto bg-neutral-50 p-6 lg:p-8">
                    <div className="max-w-7xl mx-auto">
                        {children}
                    </div>
                </main>
            </div>
        </div>
    );
};

export default AdminLayout;
