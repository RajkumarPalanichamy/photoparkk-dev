'use client';

import React, { useEffect, useState } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { CheckCircle2, ArrowRight, Package, Home } from 'lucide-react';
import { useWindowSize } from 'react-use'; // Optional confusion or install separate package?
// I will not use confetti for now to avoid dependency hell, just clean UI.

const PaymentSuccess = () => {
    const searchParams = useSearchParams();
    const router = useRouter();
    const paymentId = searchParams.get('razorpay_payment_id');
    const orderId = searchParams.get('razorpay_order_id');

    return (
        <div className="min-h-screen bg-neutral-50 flex items-center justify-center pt-[100px] px-4">
            <div className="bg-white rounded-2xl shadow-xl p-8 max-w-md w-full text-center border border-success/20">
                <div className="w-20 h-20 bg-success-light rounded-full flex items-center justify-center mx-auto mb-6">
                    <CheckCircle2 className="w-10 h-10 text-success" />
                </div>

                <h1 className="text-3xl font-bold text-secondary mb-2">Payment Successful!</h1>
                <p className="text-neutral-600 mb-6">
                    Thank you for your purchase. Your order has been placed successfully.
                </p>

                <div className="bg-neutral-50 rounded-xl p-4 mb-8 text-sm">
                    <div className="flex justify-between mb-2">
                        <span className="text-neutral-500">Payment ID</span>
                        <span className="font-semibold text-secondary font-mono">{paymentId}</span>
                    </div>
                    {orderId && (
                        <div className="flex justify-between">
                            <span className="text-neutral-500">Order ID</span>
                            <span className="font-semibold text-secondary font-mono">{orderId}</span>
                        </div>
                    )}
                </div>

                <div className="flex flex-col gap-3">
                    <Link href="/my-orders" className="w-full bg-primary hover:bg-primary-hover text-white py-3 rounded-xl font-semibold transition-all flex items-center justify-center gap-2">
                        <Package className="w-5 h-5" />
                        View My Orders
                    </Link>
                    <Link href="/" className="w-full bg-white border-2 border-neutral-200 hover:border-primary text-neutral-700 hover:text-primary py-3 rounded-xl font-semibold transition-all flex items-center justify-center gap-2">
                        <Home className="w-5 h-5" />
                        Back to Home
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default PaymentSuccess;
