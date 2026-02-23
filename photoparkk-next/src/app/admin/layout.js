'use client';

import React, { useState, useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";
import {
    LayoutDashboard,
    ShoppingBag,
    Package,
    Frame,
    MessageCircle,
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
    const [user, setUser] = useState(null);
    const [authorized, setAuthorized] = useState(false);
    const router = useRouter();
    const pathname = usePathname();

    useEffect(() => {
        // Auth Check
        const userData = localStorage.getItem("user");
        if (!userData) {
            router.push("/login");
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
        localStorage.removeItem("accessToken");
        localStorage.removeItem("refreshToken");
        localStorage.removeItem("user");
        router.push("/login");
    };

    const menuItems = [
        { icon: LayoutDashboard, label: "Dashboard", path: "/admin" },
        { icon: ShoppingBag, label: "Orders", path: "/admin/orders" },
        { icon: Package, label: "Products", path: "/admin/products" },
        { icon: Frame, label: "Customizer", path: "/admin/frames" },
    ];

    const isActive = (path) => {
        if (path === "/admin") return pathname === "/admin";
        return pathname.startsWith(path);
    };

    if (!authorized) {
        return (
            <div className="flex h-screen w-full items-center justify-center bg-white">
                <Loader2 className="h-10 w-10 animate-spin text-blue-600" />
            </div>
        );
    }

    return (
        <div className="relative min-h-screen bg-[#F0F2F5] flex flex-col font-sans">
            <style jsx global>{`
                :root {
                    --primary: #2563eb; /* blue-600 */
                    --primary-hover: #1d4ed8; /* blue-700 */
                }
            `}</style>

            {/* Header */}
            <header className="fixed top-0 w-full z-50 bg-white text-slate-900 border-b border-slate-200 h-16 px-4 lg:px-6 flex items-center justify-between shadow-sm">
                <div className="flex items-center gap-4">
                    <button
                        onClick={() => setSidebarOpen(!sidebarOpen)}
                        className="lg:hidden p-2 rounded-lg hover:bg-slate-100 text-slate-600 transition-colors"
                    >
                        <Menu className="w-6 h-6" />
                    </button>

                    <Link href="/admin" className="flex items-center gap-2">
                        <div className="w-9 h-9 rounded-lg bg-blue-600 flex items-center justify-center shadow-md shadow-blue-500/20">
                            <span className="text-white font-bold text-xl">P</span>
                        </div>
                        <span className="text-xl font-bold tracking-tight text-slate-900">PhotoParkk</span>
                        <div className="h-6 w-[1.5px] bg-slate-200 mx-2 hidden sm:block"></div>
                        <span className="text-xs text-blue-600 font-bold uppercase tracking-wider hidden sm:block">Admin Console</span>
                    </Link>
                </div>

                <div className="flex items-center gap-4">
                    <Link href="/" className="px-3 py-1.5 rounded-lg border border-slate-200 text-slate-600 hover:text-blue-600 hover:bg-slate-50 transition-all text-xs font-semibold flex items-center gap-2" title="Go to Store">
                        <Home className="w-3.5 h-3.5" />
                        <span className="hidden md:inline">Live Store</span>
                    </Link>

                    <div className="relative group">
                        <button className="flex items-center gap-3 pl-2 border-l border-slate-200">
                            <div className="text-right hidden sm:block">
                                <p className="text-xs font-bold text-slate-900 leading-none">{user?.name}</p>
                                <p className="text-[10px] text-slate-400 leading-none mt-1">Management</p>
                            </div>
                            <div className="w-9 h-9 rounded-full bg-slate-100 text-blue-600 flex items-center justify-center text-sm font-bold border border-slate-200 transition-transform group-hover:scale-105">
                                {user?.name?.charAt(0).toUpperCase() || 'A'}
                            </div>
                        </button>

                        <div className="absolute right-0 top-full mt-2 w-48 bg-white rounded-xl shadow-xl border border-slate-100 py-1 opacity-0 pointer-events-none group-hover:opacity-100 group-hover:pointer-events-auto transition-all transform origin-top-right z-50">
                            <div className="px-4 py-3 border-b border-slate-50">
                                <p className="text-sm font-bold text-slate-900 truncate">{user?.name}</p>
                                <p className="text-[11px] text-slate-500 truncate">{user?.email}</p>
                            </div>
                            <button onClick={handleLogout} className="w-full text-left px-4 py-2.5 text-sm text-red-500 hover:bg-red-50 transition-colors flex items-center gap-2 font-semibold">
                                <LogOut className="w-3.5 h-3.5" /> Sign Out
                            </button>
                        </div>
                    </div>
                </div>
            </header>

            <div className="flex pt-16 h-screen overflow-hidden">
                {/* Sidebar */}
                <aside className={`fixed lg:static top-16 left-0 h-[calc(100vh-64px)] w-64 bg-white border-r border-slate-200 transform transition-transform duration-300 ease-in-out z-40 overflow-y-auto ${sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}`}>
                    <div className="p-5 space-y-1.5">
                        <p className="text-[11px] font-bold text-slate-400 uppercase tracking-widest px-4 mb-3">Main Menu</p>
                        {menuItems.map((item) => {
                            const Icon = item.icon;
                            const active = isActive(item.path);
                            return (
                                <Link
                                    key={item.path}
                                    href={item.path}
                                    onClick={() => setSidebarOpen(false)}
                                    className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-bold transition-all duration-200 ${active
                                        ? "bg-blue-50 text-blue-600 border border-blue-100"
                                        : "text-slate-600 hover:bg-slate-50 hover:text-blue-600"
                                        }`}
                                >
                                    <Icon className={`w-5 h-5 ${active ? "text-blue-600" : "text-slate-400"}`} />
                                    {item.label}
                                </Link>
                            );
                        })}
                    </div>

                    <div className="absolute bottom-0 w-full p-6 border-t border-neutral-50 bg-neutral-50/50">
                        <div className="p-4 bg-white rounded-xl border border-neutral-200 shadow-sm text-center">
                            <p className="text-[10px] text-neutral-400 font-bold uppercase mb-1">Status</p>
                            <p className="text-xs text-green-600 font-bold flex items-center justify-center gap-1.5">
                                <span className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse" />
                                System Online
                            </p>
                        </div>
                    </div>
                </aside>

                {/* Overlay for mobile */}
                {sidebarOpen && (
                    <div
                        className="fixed inset-0 bg-slate-900/40 backdrop-blur-[2px] z-30 lg:hidden top-16"
                        onClick={() => setSidebarOpen(false)}
                    />
                )}

                {/* Main Content */}
                <main className="flex-1 overflow-y-auto p-6 lg:p-8">
                    <div className="max-w-7xl mx-auto">
                        {children}
                    </div>
                </main>
            </div>
        </div>
    );
};

export default AdminLayout;
