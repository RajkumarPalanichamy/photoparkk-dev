
import { supabase } from '@/lib/supabase';
import { NextResponse } from 'next/server';

export async function GET(request, { params }) {
    try {
        const { userId } = await params;
        console.log("Fetching cart for userId:", userId);

        const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

        if (!userId || userId === 'undefined' || !uuidRegex.test(userId)) {
            console.warn("Invalid or missing userId:", userId);
            return NextResponse.json({ message: "Valid UUID UserId is required" }, { status: 400 });
        }

        const { data, error } = await supabase
            .from('cart_items')
            .select('*')
            .eq('user_id', userId);

        if (error) {
            console.error("Supabase Cart Fetch Error:", {
                code: error.code,
                message: error.message,
                details: error.details,
                hint: error.hint
            });
            return NextResponse.json({
                message: "Failed to fetch cart items",
                error: error.message,
                code: error.code
            }, { status: 500 });
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
    } catch (err) {
        console.error("Cart GET Error:", err);
        return NextResponse.json({ message: "Internal Server Error", error: err.message }, { status: 500 });
    }
}
