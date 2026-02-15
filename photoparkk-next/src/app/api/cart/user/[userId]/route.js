
import { supabase } from '@/lib/supabase';
import { NextResponse } from 'next/server';

export async function GET(request, { params }) {
    const { userId } = await params;

    if (!userId) {
        return NextResponse.json({ message: "UserId is required" }, { status: 400 });
    }

    const { data, error } = await supabase
        .from('cart_items')
        .select('*')
        .eq('user_id', userId);

    if (error) {
        console.error("Supabase Cart Fetch Error:", error);
        return NextResponse.json({ message: "Failed to fetch cart items" }, { status: 500 });
    }

    // Map snake_case to camelCase for frontend compatibility
    const mappedData = data.map(item => ({
        _id: item.id,
        userId: item.user_id,
        productId: item.product_id,
        productType: item.product_type,
        title: item.title,
        quantity: item.quantity,
        size: item.size,
        thickness: item.thickness,
        price: item.price,
        totalAmount: item.total_amount,
        image: item.image,
        // Include other fields if necessary
    }));

    return NextResponse.json(mappedData);
}
