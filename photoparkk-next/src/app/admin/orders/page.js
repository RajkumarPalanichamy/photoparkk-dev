'use client';

import React, { useState } from "react";
import CommonOrderList from "@/components/admin/CommonOrderList";
import FrameOrderList from "@/components/admin/FrameOrderList";
import { Frame, Package, ShoppingBag } from "lucide-react";

const AdminOrdersPage = () => {
    const [activeTab, setActiveTab] = useState("common");

    return (
        <div className="w-full space-y-8">
            <div className="flex items-center gap-4 bg-white p-6 rounded-2xl border border-neutral-100 shadow-sm">
                <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center text-primary">
                    <ShoppingBag className="w-6 h-6" />
                </div>
                <div>
                    <h1 className="text-2xl font-bold text-secondary">Order Management</h1>
                    <p className="text-neutral-500">Track and manage customer orders efficiently.</p>
                </div>
            </div>

            <div className="flex border-b border-neutral-200">
                <button
                    onClick={() => setActiveTab("common")}
                    className={`px-6 py-3 font-medium text-sm transition-colors border-b-2 ${activeTab === "common"
                            ? "border-primary text-primary"
                            : "border-transparent text-neutral-500 hover:text-neutral-700"
                        }`}
                >
                    Product Orders
                </button>
                <button
                    onClick={() => setActiveTab("frame")}
                    className={`px-6 py-3 font-medium text-sm transition-colors border-b-2 ${activeTab === "frame"
                            ? "border-primary text-primary"
                            : "border-transparent text-neutral-500 hover:text-neutral-700"
                        }`}
                >
                    Frame Orders
                </button>
            </div>

            <div className="min-h-[400px]">
                {activeTab === "common" ? <CommonOrderList /> : <FrameOrderList />}
            </div>
        </div>
    );
};

export default AdminOrdersPage;
