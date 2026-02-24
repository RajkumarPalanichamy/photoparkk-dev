
import Razorpay from 'razorpay';
import { NextResponse } from 'next/server';

const razorpay = new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID,
    key_secret: process.env.RAZORPAY_KEY_SECRET,
});

export async function POST(request) {
    try {
        const body = await request.json();
        const { amount, currency = "INR" } = body;

        const options = {
            amount: amount * 100, // amount in paisa
            currency,
            receipt: `receipt_${Date.now()}`,
        };

        const order = await razorpay.orders.create(options);

        // Pass back the Razorpay Order ID and other details to frontend
        // The frontend initializes payment with this Order ID.

        // Also we need to return `orderPayload` logic if we want frontend to reuse it?
        // Frontend passes `orderPayload` inside `paymentData`? No.
        // Frontend passes `amount`, `cartItemId`, `deliveryDetails`.
        // It expects { orderId: order.id, amount: order.amount, currency: order.currency, ... }

        // We can just return the Razorpay `order` object details.

        return NextResponse.json({
            id: order.id,
            currency: order.currency,
            amount: order.amount,
            orderId: order.id, // Frontend expects orderId
            // Pass payload back if needed or let frontend manage it.
            // Frontend uses response data to initialize payment.
            // And frontend constructs Payload from initial data + response.
        });

    } catch (error) {
        console.error("Razorpay Order Error:", error);
        return NextResponse.json({ message: "Failed to create payment order" }, { status: 500 });
    }
}
