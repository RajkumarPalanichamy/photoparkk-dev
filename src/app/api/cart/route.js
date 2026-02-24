
import { supabase } from '@/lib/supabase';
import { NextResponse } from 'next/server';

export async function POST(request) {
    try {
        const body = await request.json();
        const { userId, productId, productType, title, quantity, size, thickness, price, totalAmount, image, uploadedImageUrl } = body;

        if (!userId || !productId) {
            return NextResponse.json({ message: "Missing required fields" }, { status: 400 });
        }

        const { data, error } = await supabase
            .from('cart_items')
            .insert([
                {
                    user_id: userId,
                    product_id: productId,
                    product_type: productType,
                    title,
                    quantity,
                    size,
                    thickness,
                    price,
                    total_amount: totalAmount,
                    image: image, // Main preview image (e.g., cropped)
                    uploaded_image_url: uploadedImageUrl, // Original full image
                    // customization_details: body.customizationDetails, // Removed until column exists
                },
            ])
            .select();

        if (error) {
            console.error("Supabase Cart Insert Error:", error);
            return NextResponse.json({ message: "Failed to add to cart" }, { status: 500 });
        }

        return NextResponse.json({ message: "Item added to cart", cartItem: data[0] });
    } catch (error) {
        console.error("Cart API Error:", error);
        return NextResponse.json({ message: "Server error" }, { status: 500 });
    }
}
