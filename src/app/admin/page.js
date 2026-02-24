'use client';

import React, { useEffect, useState } from "react";
import {
    ShoppingBag,
    Package,
    Frame,
    BarChart3,
    Loader2,
    ArrowUpRight,
} from "lucide-react";
import Link from "next/link";
import {
    Chart as ChartJS,
    BarElement,
    CategoryScale,
    LinearScale,
    ArcElement,
    Tooltip,
    Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";
import axiosInstance from "@/utils/axiosInstance";

ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);

const numberFormatter = new Intl.NumberFormat("en-IN");

const AdminDashboard = () => {
    const [stats, setStats] = useState({
        totalOrders: 0,
        totalProducts: 0,
        totalFrames: 0,
        totalRevenue: 0,
        breakdown: {
            commonOrders: 0,
            frameOrders: 0,
            newArrivals: 0,
            commonRevenue: 0,
            frameRevenue: 0,
        },
    });
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetchDashboardStats();
    }, []);

    const fetchDashboardStats = async () => {
        try {
            setLoading(true);
            setError(null);
            const response = await axiosInstance.get("/admin/stats");
            const payload = response.data || {};
            setStats({
                totalOrders: payload.totalOrders || 0,
                totalProducts: payload.totalProducts || 0,
                totalFrames: payload.totalFrames || 0,
                totalRevenue: payload.totalRevenue || 0,
                breakdown: {
                    commonOrders: payload.breakdown?.commonOrders || 0,
                    frameOrders: payload.breakdown?.frameOrders || 0,
                    newArrivals: payload.breakdown?.newArrivals || 0,
                    commonRevenue: payload.breakdown?.commonRevenue || 0,
                    frameRevenue: payload.breakdown?.frameRevenue || 0,
                },
            });
        } catch (err) {
            console.error("Failed to fetch dashboard stats:", err);
            setError("Failed to load dashboard statistics");
        } finally {
            setLoading(false);
        }
    };

    const breakdown = stats.breakdown;

    const statCards = [
        {
            icon: ShoppingBag,
            label: "Total Orders",
            value: loading ? "..." : numberFormatter.format(stats.totalOrders),
            color: "text-blue-600 bg-blue-50",
            link: "/admin/orders",
            ctaLabel: "View Order Hub",
        },
        {
            icon: Package,
            label: "Total Products",
            value: loading ? "..." : numberFormatter.format(stats.totalProducts),
            color: "text-indigo-600 bg-indigo-50",
            link: "/admin/products",
            ctaLabel: "Studio Catalog",
        },
        {
            icon: Frame,
            label: "Total Frames",
            value: loading ? "..." : numberFormatter.format(stats.totalFrames),
            color: "text-sky-600 bg-sky-50",
            link: "/admin/frames",
            ctaLabel: "Curation Lab",
        },
        {
            icon: BarChart3,
            label: "Net Revenue",
            value: loading ? "..." : "₹" + numberFormatter.format(stats.totalRevenue),
            color: "text-emerald-600 bg-emerald-50",
            link: "/admin/orders",
            ctaLabel: "Fiscal Overview",
        },
    ];

    const orderBreakdownData = {
        labels: ["Bespoke Orders", "Frame Studio", "Masterpiece Series"],
        datasets: [
            {
                label: "Orders",
                data: [
                    breakdown.commonOrders || 0,
                    breakdown.frameOrders || 0,
                    breakdown.newArrivals || 0,
                ],
                backgroundColor: [
                    "#2563eb", // blue-600
                    "#64748b", // slate-500
                    "#0ea5e9", // sky-500
                ],
                borderRadius: 4,
                borderSkipped: false,
            },
        ],
    };

    const orderChartOptions = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                display: false,
            },
            tooltip: {
                backgroundColor: "#ffffff",
                titleColor: "#0f172a",
                bodyColor: "#64748b",
                borderColor: "#e2e8f0",
                borderWidth: 1,
                padding: 12,
                titleFont: { family: 'Inter', size: 14, weight: 'bold' },
                bodyFont: { family: 'Inter', size: 12 },
                callbacks: {
                    label: (context) => `${context.label}: ${context.formattedValue} shipments`,
                },
            },
        },
        scales: {
            y: {
                beginAtZero: true,
                ticks: { precision: 0, font: { family: 'Poppins' } },
                grid: { color: "rgba(0,0,0,0.03)" }
            },
            x: {
                grid: { display: false },
                ticks: { font: { family: 'Poppins' } }
            }
        },
    };

    return (
        <div className="space-y-8">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
                <div>
                    <h1 className="text-3xl font-bold text-slate-900 tracking-tight">System Dashboard</h1>
                    <p className="text-slate-500 text-sm mt-1">Operational overview and business intelligence.</p>
                </div>

                <div className="flex items-center gap-3">
                    <div className="bg-white border border-slate-200 px-4 py-2 rounded-xl flex items-center gap-2 shadow-sm">
                        <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse" />
                        <span className="text-xs font-bold text-slate-600">LIVE SYNC</span>
                    </div>
                    <button
                        onClick={fetchDashboardStats}
                        disabled={loading}
                        className="flex items-center gap-2 bg-blue-600 text-white hover:bg-blue-700 px-5 py-2.5 rounded-xl text-sm font-bold transition-all shadow-md shadow-blue-500/10 active:scale-95"
                    >
                        {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : "Update Data"}
                    </button>
                </div>
            </div>

            {error && (
                <div className="bg-red-50 text-red-600 p-4 rounded-xl border border-red-100 flex items-center gap-3 animate-shake">
                    <div className="w-2 h-2 bg-red-600 rounded-full" />
                    <span className="font-semibold text-sm">{error}</span>
                </div>
            )}

            {/* Stats Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {statCards.map((stat, i) => {
                    const Icon = stat.icon;
                    return (
                        <div key={i} className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm flex flex-col justify-between h-full hover:shadow-lg hover:border-blue-100 transition-all duration-300 group">
                            <div className="flex justify-between items-start mb-6">
                                <div>
                                    <p className="text-slate-400 text-[10px] font-bold uppercase tracking-widest mb-1">{stat.label}</p>
                                    <h3 className="text-3xl font-bold text-slate-900 group-hover:text-blue-600 transition-colors">{stat.value}</h3>
                                </div>
                                <div className={`p-4 rounded-xl ${stat.color} transition-all duration-300 group-hover:scale-110 shadow-sm`}>
                                    <Icon className="w-6 h-6" />
                                </div>
                            </div>
                            <Link href={stat.link} className="text-xs font-bold text-slate-400 hover:text-blue-600 flex items-center gap-1.5 mt-auto transition-colors">
                                {stat.ctaLabel} <ArrowUpRight className="w-3 h-3 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                            </Link>
                        </div>
                    )
                })}
            </div>

            {/* Charts Section */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2 bg-white p-8 rounded-3xl border border-slate-100 shadow-sm min-h-[440px]">
                    <div className="flex justify-between items-start mb-8">
                        <div>
                            <h3 className="text-xl font-bold text-slate-900">Distribution Analysis</h3>
                            <p className="text-slate-400 text-xs mt-1">Operational volume by product category</p>
                        </div>
                        <div className="flex gap-2">
                            <div className="flex items-center gap-1.5"><div className="w-2 h-2 rounded-full bg-blue-600" /><span className="text-[10px] font-bold text-slate-500 uppercase">Primary</span></div>
                            <div className="flex items-center gap-1.5"><div className="w-2 h-2 rounded-full bg-slate-400" /><span className="text-[10px] font-bold text-slate-500 uppercase">Secondary</span></div>
                        </div>
                    </div>
                    <div className="h-72 w-full">
                        {loading ? (
                            <div className="flex items-center justify-center h-full">
                                <Loader2 className="w-8 h-8 animate-spin text-amber-200" />
                            </div>
                        ) : (
                            <Bar data={orderBreakdownData} options={orderChartOptions} />
                        )}
                    </div>
                </div>

                <div className="bg-white p-8 rounded-3xl border border-slate-100 shadow-lg flex flex-col justify-center items-center text-center overflow-hidden relative group">
                    <div className="absolute inset-0 bg-gradient-to-tr from-blue-50 to-transparent pointer-events-none" />
                    <div className="relative z-10">
                        <div className="w-20 h-20 bg-blue-600 text-white rounded-2xl flex items-center justify-center mb-6 mx-auto shadow-lg shadow-blue-500/20 group-hover:rotate-12 transition-transform duration-500">
                            <BarChart3 className="w-10 h-10" />
                        </div>
                        <h3 className="text-2xl font-bold text-slate-900 mb-3 tracking-tight">Growth Insight</h3>
                        <p className="text-slate-500 text-sm max-w-xs mb-8 leading-relaxed">
                            Primary collections are driving growth with <span className="text-blue-600 font-bold">{breakdown.newArrivals} new items</span> successfully launched this month.
                        </p>
                        <Link href="/admin/orders" className="inline-block w-full bg-blue-600 text-white px-8 py-3.5 rounded-xl font-bold hover:bg-blue-700 transition-all shadow-md shadow-blue-500/20 active:scale-95">
                            Audit Performance
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminDashboard;
