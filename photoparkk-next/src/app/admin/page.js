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
            color: "bg-blue-500",
            link: "/admin/orders",
            ctaLabel: "View orders",
        },
        {
            icon: Package,
            label: "Total Products",
            value: loading ? "..." : numberFormatter.format(stats.totalProducts),
            color: "bg-green-500",
            link: "/admin/products",
            ctaLabel: "Manage catalog",
        },
        {
            icon: Frame,
            label: "Total Frames",
            value: loading ? "..." : numberFormatter.format(stats.totalFrames),
            color: "bg-indigo-500",
            link: "/admin/frames",
            ctaLabel: "Customize frames",
        },
        {
            icon: BarChart3,
            label: "Total Revenue",
            value: loading ? "..." : "₹" + numberFormatter.format(stats.totalRevenue),
            color: "bg-purple-500",
            link: "/admin/orders",
            ctaLabel: "Analyze sales",
        },
    ];

    const orderBreakdownData = {
        labels: ["Common Orders", "Frame Orders", "New Arrivals"],
        datasets: [
            {
                label: "Orders",
                data: [
                    breakdown.commonOrders || 0,
                    breakdown.frameOrders || 0,
                    breakdown.newArrivals || 0,
                ],
                backgroundColor: [
                    "rgba(59, 130, 246, 0.8)",
                    "rgba(139, 92, 246, 0.8)",
                    "rgba(16, 185, 129, 0.8)",
                ],
                borderRadius: 8,
                borderSkipped: false,
            },
        ],
    };

    const orderChartOptions = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                position: "bottom",
            },
            tooltip: {
                callbacks: {
                    label: (context) => `${context.label}: ${context.formattedValue} orders`,
                },
            },
        },
        scales: {
            y: {
                beginAtZero: true,
                ticks: { precision: 0 },
            },
        },
    };

    return (
        <div className="space-y-6">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-secondary">Admin Dashboard</h1>
                    <p className="text-neutral-500 text-sm">Welcome back, get an overview of your store.</p>
                </div>

                <button
                    onClick={fetchDashboardStats}
                    disabled={loading}
                    className="flex items-center gap-2 bg-white border border-neutral-200 hover:bg-neutral-50 px-4 py-2 rounded-lg text-sm font-medium transition-colors shadow-sm"
                >
                    {loading ? <Loader2 className="w-4 h-4 animate-spin text-neutral-400" /> : "Refresh Data"}
                </button>
            </div>

            {error && (
                <div className="bg-red-50 text-red-600 p-4 rounded-lg border border-red-100 flex items-center gap-2">
                    <span className="font-semibold">Error:</span> {error}
                </div>
            )}

            {/* Stats Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {statCards.map((stat, i) => {
                    const Icon = stat.icon;
                    return (
                        <div key={i} className="bg-white p-6 rounded-2xl border border-neutral-100 shadow-sm flex flex-col justify-between h-full hover:shadow-md transition-shadow">
                            <div className="flex justify-between items-start mb-4">
                                <div>
                                    <p className="text-neutral-500 text-sm font-medium mb-1">{stat.label}</p>
                                    <h3 className="text-2xl font-bold text-secondary">{stat.value}</h3>
                                </div>
                                <div className={`p-3 rounded-xl ${stat.color} bg-opacity-10`}>
                                    <Icon className={`w-6 h-6 ${stat.color.replace('bg-', 'text-')}`} />
                                </div>
                            </div>
                            <Link href={stat.link} className="text-sm font-semibold text-primary hover:text-primary-hover flex items-center gap-1 mt-auto">
                                {stat.ctaLabel} <ArrowUpRight className="w-3 h-3" />
                            </Link>
                        </div>
                    )
                })}
            </div>

            {/* Charts Section */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="bg-white p-6 rounded-2xl border border-neutral-100 shadow-sm min-h-[400px]">
                    <h3 className="text-lg font-bold text-secondary mb-1">Order Distribution</h3>
                    <p className="text-sm text-neutral-500 mb-6">Breakdown of orders by category</p>
                    <div className="h-64 md:h-80 w-full">
                        {loading ? (
                            <div className="flex items-center justify-center h-full">
                                <Loader2 className="w-8 h-8 animate-spin text-neutral-300" />
                            </div>
                        ) : (
                            <Bar data={orderBreakdownData} options={orderChartOptions} />
                        )}
                    </div>
                </div>

                {/* Simple Insights or Recent Activity Panel */}
                <div className="bg-white p-6 rounded-2xl border border-neutral-100 shadow-sm flex flex-col justify-center items-center text-center">
                    <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                        <BarChart3 className="w-8 h-8 text-primary" />
                    </div>
                    <h3 className="text-xl font-bold text-secondary mb-2">Growth Insights</h3>
                    <p className="text-neutral-500 max-w-xs mb-6">
                        Your new arrivals are gaining traction with {breakdown.newArrivals} orders recently.
                    </p>
                    <Link href="/admin/orders" className="bg-primary text-white px-6 py-2 rounded-lg font-medium hover:bg-primary-hover transition-colors">
                        View detailed reports
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default AdminDashboard;
