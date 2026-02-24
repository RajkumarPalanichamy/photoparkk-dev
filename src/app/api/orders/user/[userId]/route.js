
import { supabase } from '@/lib/supabase';
import { NextResponse } from 'next/server';

export async function GET(request, { params }) {
    const { userId } = await params;

    if (!userId) {
        return NextResponse.json({ message: "UserId is required" }, { status: 400 });
    }

    // Fetch from 'orders' table
    // And maybe 'frame_orders' if you want to combine?
    // Let's stick to 'orders' first. frame_orders logic is separate in original code.
    // Ideally combine them or fetch both.

    const { data, error } = await supabase
        .from('orders')
        .select('*')
        .eq('user_id', userId)
        .order('created_at', { ascending: false });

    if (error) {
        console.error("Supabase My Orders Error:", error);
        return NextResponse.json({ message: "Failed to fetch orders" }, { status: 500 });
    }

    return NextResponse.json(data);
}
