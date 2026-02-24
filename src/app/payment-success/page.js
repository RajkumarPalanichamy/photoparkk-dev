'use client';

import React, { Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { CheckCircle2, Package, Home, Loader2 } from 'lucide-react';

const PaymentSuccessContent = () => {
    const searchParams = useSearchParams();
    const paymentId = searchParams.get('razorpay_payment_id');
    const orderId = searchParams.get('razorpay_order_id');

    return (
        <div className="min-h-screen bg-slate-50 flex items-center justify-center pt-[120px] pb-20 px-4 relative overflow-hidden">
            {/* Background elements */}
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-100/30 rounded-full blur-3xl -mr-64 -mt-64" />
            <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-blue-50/50 rounded-full blur-3xl -ml-64 -mb-64" />

            <div className="bg-white/80 backdrop-blur-xl rounded-[40px] shadow-2xl p-10 max-w-lg w-full text-center border border-white relative z-10">
                <div className="w-24 h-24 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-8 shadow-xl shadow-blue-500/40 relative">
                    <div className="absolute inset-0 rounded-full animate-ping bg-blue-600/20" />
                    <CheckCircle2 className="w-12 h-12 text-white" />
                </div>

                <h1 className="text-4xl font-black text-slate-900 mb-3 tracking-tight">System Confirmation</h1>
                <p className="text-slate-500 font-medium mb-10 leading-relaxed text-lg">
                    Transaction processed successfully. Your order is now being queued for production.
                </p>

                <div className="bg-white rounded-3xl border border-slate-100 p-6 mb-10 text-left shadow-inner">
                    <p className="text-[10px] font-black text-blue-600 uppercase tracking-widest mb-4">Transaction Protocol</p>
                    <div className="space-y-4">
                        <div className="flex justify-between items-center bg-slate-50/50 p-3 rounded-xl border border-slate-50">
                            <span className="text-xs font-bold text-slate-400">Payment ID</span>
                            <span className="font-mono text-xs font-black text-slate-900 border-l border-slate-200 pl-3 ml-3 overflow-hidden text-ellipsis whitespace-nowrap">{paymentId}</span>
                        </div>
                        {orderId && (
                            <div className="flex justify-between items-center bg-slate-50/50 p-3 rounded-xl border border-slate-50">
                                <span className="text-xs font-bold text-slate-400">Network ID</span>
                                <span className="font-mono text-xs font-black text-slate-900 border-l border-slate-200 pl-3 ml-3 overflow-hidden text-ellipsis whitespace-nowrap">{orderId}</span>
                            </div>
                        )}
                    </div>
                </div>

                <div className="grid grid-cols-1 gap-3">
                    <Link href="/my-orders" className="w-full bg-blue-600 text-white py-4 rounded-2xl font-black text-sm uppercase tracking-widest transition-all hover:bg-blue-700 shadow-lg shadow-blue-500/25 flex items-center justify-center gap-3">
                        <Package className="w-5 h-5" />
                        Access My Orders
                    </Link>
                    <Link href="/" className="w-full bg-slate-50 text-slate-600 py-4 rounded-2xl font-black text-sm uppercase tracking-widest transition-all hover:bg-slate-100 flex items-center justify-center gap-3">
                        <Home className="w-5 h-5" />
                        Dashboard
                    </Link>
                </div>
            </div>
        </div>
    );
};

const PaymentSuccess = () => {
    return (
        <Suspense fallback={
            <div className="min-h-screen flex items-center justify-center bg-slate-50 pt-[120px]">
                <div className="flex flex-col items-center gap-4">
                    <Loader2 className="w-12 h-12 text-blue-600 animate-spin" />
                    <p className="text-slate-500 font-bold uppercase tracking-widest text-sm">Verifying Session...</p>
                </div>
            </div>
        }>
            <PaymentSuccessContent />
        </Suspense>
    );
};

export default PaymentSuccess;
