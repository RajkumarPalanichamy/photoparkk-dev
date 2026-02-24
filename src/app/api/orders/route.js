
import { supabase } from '@/lib/supabase';
import { NextResponse } from 'next/server';
import { sendEmail } from '@/lib/nodemailer';

export async function GET(request) {
    try {
        const { searchParams } = new URL(request.url);
        const page = parseInt(searchParams.get('page') || '1');
        const limit = parseInt(searchParams.get('limit') || '10');
        const status = searchParams.get('status');
        const search = searchParams.get('search');

        const from = (page - 1) * limit;
        const to = from + limit - 1;

        let query = supabase
            .from('orders')
            .select('*', { count: 'exact' })
            .order('created_at', { ascending: false })
            .range(from, to);

        if (status && status !== 'all') {
            const mappedStatus = status.charAt(0).toUpperCase() + status.slice(1);
            query = query.eq('status', mappedStatus);
        }

        // Search? orders table filtering on JSONB is hard for 'delivery_details->>name'
        // But we can filter on ID or other fields.
        // Implementing basic ID search or simple status filtering.
        // Full text search on JSONB is complex in this setup without extensions.
        // We'll skip complex search for now or just filter in memory if dataset small (not scalable).
        // Let's implement basics.

        const { data, count, error } = await query;

        if (error) throw error;

        return NextResponse.json({
            orders: data,
            total: count,
            page,
            totalPages: Math.ceil((count || 0) / limit)
        });

    } catch (error) {
        console.error("Fetch Orders Error:", error);
        return NextResponse.json({ message: "Error fetching orders" }, { status: 500 });
    }
}

export async function POST(request) {
    try {
        const formData = await request.formData();
        const cartItemId = formData.get('cartItemId');
        const productType = formData.get('productType');
        const amount = formData.get('amount');
        const deliveryDetailsRaw = formData.get('deliveryDetails');

        // Parse delivery details or default to empty object
        let deliveryDetails = deliveryDetailsRaw ? JSON.parse(deliveryDetailsRaw) : {};

        // Fetch Cart Item
        const { data: cartItem, error: cartError } = await supabase
            .from('cart_items')
            .select('*')
            .eq('id', cartItemId)
            .single();

        if (cartError || !cartItem) {
            return NextResponse.json({ message: "Cart item not found" }, { status: 404 });
        }

        // Add item snapshot to deliveryDetails (as a hack/workaround to store it in existing jsonb column)
        // We will store it under 'itemSnapshot' key.
        deliveryDetails.itemSnapshot = {
            title: cartItem.title,
            quantity: cartItem.quantity,
            size: cartItem.size,
            thickness: cartItem.thickness,
            image: cartItem.image || cartItem.uploaded_image_url,
            price: cartItem.price,
            product_id: cartItem.product_id,
            product_type: cartItem.product_type
        };

        const { data: order, error: orderError } = await supabase
            .from('orders')
            .insert([
                {
                    user_id: cartItem.user_id,
                    cart_item_id: cartItemId, // We keep the ID reference even if deleted, for traceability if logged separately
                    product_type: productType,
                    delivery_details: deliveryDetails,
                    image: cartItem.image || cartItem.uploaded_image_url,
                    amount: amount,
                    status: 'Pending',
                    payment_status: 'pending' // Default
                }
            ])
            .select()
            .single();

        if (orderError) {
            console.error("Supabase Order Insert Error:", orderError);
            return NextResponse.json({ message: "Failed to place order" }, { status: 500 });
        }

        // Delete from cart
        await supabase.from('cart_items').delete().eq('id', cartItemId);

        // Send Order Confirmation Email
        if (deliveryDetails.email) {
            try {
                const subject = `Order Confirmation - #${order.id}`;
                const text = `
                    Hi ${deliveryDetails.name},
                    
                    Thank you for your order!
                    
                    Order ID: #${order.id}
                    Total Amount: ₹${amount}
                    
                    We are processing your order and will notify you once it's shipped.
                `;
                const html = `
                    <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto;">
                        <h2 style="color: #4f46e5;">Order Confirmation</h2>
                        <p>Hi <strong>${deliveryDetails.name}</strong>,</p>
                        <p>Thank you for your order with Photo Parkk!</p>
                        <div style="background: #f3f4f6; padding: 15px; border-radius: 8px;">
                            <p><strong>Order ID:</strong> #${order.id}</p>
                            <p><strong>Total Amount:</strong> ₹${amount}</p>
                        </div>
                        <p>We are processing your order and will notify you once it's shipped.</p>
                        <hr style="border: 0; border-top: 1px solid #e5e7eb; margin: 20px 0;" />
                        <p style="font-size: 12px; color: #6b7280;">This is an automated message, please do not reply.</p>
                    </div>
                `;

                await sendEmail({
                    to: deliveryDetails.email,
                    subject,
                    text,
                    html
                });
            } catch (emailErr) {
                console.error("Failed to send confirmation email:", emailErr);
                // We don't fail the order if email fails
            }
        }

        return NextResponse.json({ message: "Order placed successfully", order });

    } catch (error) {
        console.error("Order API Error:", error);
        return NextResponse.json({ message: "Server Error" }, { status: 500 });
    }
}
