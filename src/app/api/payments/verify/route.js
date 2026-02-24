
import crypto from 'crypto';
import { NextResponse } from 'next/server';

export async function POST(request) {
    try {
        const body = await request.json();
        const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = body;

        const secret = process.env.RAZORPAY_KEY_SECRET;

        const shasum = crypto.createHmac('sha256', secret);
        shasum.update(`${razorpay_order_id}|${razorpay_payment_id}`);
        const digest = shasum.digest('hex');

        if (digest === razorpay_signature) {
            return NextResponse.json({ status: 'ok', message: "Payment verified successfully" });
        } else {
            return NextResponse.json({ message: "Invalid signature" }, { status: 400 });
        }
    } catch (error) {
        console.error("Verification Error:", error);
        return NextResponse.json({ message: "Verification failed" }, { status: 500 });
    }
}
