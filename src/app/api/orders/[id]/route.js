
import { supabase } from '@/lib/supabase';
import { NextResponse } from 'next/server';
import { sendEmail } from '@/lib/nodemailer';

export async function GET(request, { params }) {
    const { id } = await params;

    // Fetch order by ID
    const { data, error } = await supabase
        .from('orders')
        .select('*')
        .eq('id', id)
        .single();

    if (error) {
        return NextResponse.json({ message: "Order not found" }, { status: 404 });
    }

    return NextResponse.json(data);
}

export async function PUT(request, { params }) {
    const { id } = await params;
    const body = await request.json();
    const { status } = body;

    const { data: order, error } = await supabase
        .from('orders')
        .update({ status })
        .eq('id', id)
        .select()
        .single();

    if (error) {
        return NextResponse.json({ message: "Update failed" }, { status: 500 });
    }

    // Send order status update email
    if (order.delivery_details && order.delivery_details.email) {
        try {
            const subject = `Order Status Update - #${order.id}`;
            const text = `
                Hi ${order.delivery_details.name},
                
                Your order #${order.id} status has been updated to: ${status}.
                
                Thank you for shopping with Photo Parkk!
            `;
            const html = `
                <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto;">
                    <h2 style="color: #4f46e5;">Order Status Updated</h2>
                    <p>Hi <strong>${order.delivery_details.name}</strong>,</p>
                    <p>The status of your order <strong>#${order.id}</strong> has been updated.</p>
                    <div style="background: #f3f4f6; padding: 15px; border-radius: 8px; text-align: center;">
                        <p style="font-size: 18px; margin: 0;">New Status: <span style="color: #4f46e5; font-weight: bold;">${status}</span></p>
                    </div>
                    <p>Thank you for shopping with Photo Parkk!</p>
                    <hr style="border: 0; border-top: 1px solid #e5e7eb; margin: 20px 0;" />
                    <p style="font-size: 12px; color: #6b7280;">This is an automated message, please do not reply.</p>
                </div>
            `;

            await sendEmail({
                to: order.delivery_details.email,
                subject,
                text,
                html
            });
        } catch (emailErr) {
            console.error("Failed to send status update email:", emailErr);
            // Don't fail the update if email fails
        }
    }

    return NextResponse.json(order);
}

export async function DELETE(request, { params }) {
    const { id } = await params;

    const { error } = await supabase
        .from('orders')
        .delete()
        .eq('id', id);

    if (error) {
        return NextResponse.json({ message: "Delete failed" }, { status: 500 });
    }

    return NextResponse.json({ message: "Order deleted" });
}
