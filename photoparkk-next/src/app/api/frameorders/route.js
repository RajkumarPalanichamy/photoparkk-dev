
import { supabase } from '@/lib/supabase';
import { NextResponse } from 'next/server';

export async function GET(request) {
    try {
        const { searchParams } = new URL(request.url);
        const page = parseInt(searchParams.get('page') || '1');
        const limit = parseInt(searchParams.get('limit') || '10');
        const status = searchParams.get('status');

        const from = (page - 1) * limit;
        const to = from + limit - 1;

        let query = supabase
            .from('frame_orders')
            .select('*', { count: 'exact' })
            .order('created_at', { ascending: false })
            .range(from, to);

        if (status && status !== 'all') {
            query = query.eq('status', status);
        }

        const { data, count, error } = await query;

        if (error) throw error;

        return NextResponse.json({
            orders: data, // Client expects 'orders'
            total: count,
            page,
            totalPages: Math.ceil((count || 0) / limit)
        });

    } catch (error) {
        console.error("Fetch Frame Orders Error:", error);
        return NextResponse.json({ message: "Error fetching frame orders" }, { status: 500 });
    }
}
export async function POST(request) {
    try {
        const body = await request.json();
        const {
            userId,
            shippingDetails,
            items,
            status,
            shippingCharge,
            grandTotal
        } = body;

        const { data, error } = await supabase
            .from('frame_orders')
            .insert([
                {
                    user_id: userId,
                    shipping_details: shippingDetails,
                    items: items,
                    status: status || 'Pending',
                    // AssuminggrandTotal is total price, might need adjustment if separate column exists
                    // Let's check schema again.
                }
            ])
            .select();

        if (error) throw error;

        return NextResponse.json({ message: "Order placed successfully", order: data[0] });
    } catch (error) {
        console.error("Create Frame Order Error:", error);
        return NextResponse.json({ message: "Error placing frame order" }, { status: 500 });
    }
}
