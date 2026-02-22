'use client';

import React from "react";
import ProductManager from "@/Components/admin/ProductManager";
import { MessageCircle } from "lucide-react";

const AdminTemplatesPage = () => {
    return (
        <div className="w-full">
            <div className="flex items-center gap-6 bg-white p-8 rounded-2xl border border-slate-100 shadow-sm mb-8 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-full bg-green-50/20 translate-x-10 -skew-x-12" />
                <div className="w-14 h-14 bg-green-600 text-white rounded-2xl flex items-center justify-center shadow-lg shadow-green-500/20 relative z-10">
                    <MessageCircle className="w-7 h-7" />
                </div>
                <div className="relative z-10">
                    <h1 className="text-3xl font-black text-slate-900 tracking-tight">WhatsApp Templates</h1>
                    <p className="text-slate-500 font-medium">Create and manage quick-order templates that redirect users to WhatsApp.</p>
                </div>
            </div>

            <ProductManager
                apiEndpoint="customizer-templates"
                title="Template Inventory"
                allowedFields={['title', 'description', 'image', 'price']}
                jsonFields={[]}
            />
        </div>
    );
};

export default AdminTemplatesPage;
