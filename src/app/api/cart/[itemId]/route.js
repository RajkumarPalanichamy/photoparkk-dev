
import { supabase } from '@/lib/supabase';
import { NextResponse } from 'next/server';

export async function GET(request, { params }) {
    const { itemId } = await params;

    const { data, error } = await supabase
        .from('cart_items')
        .select('*')
        .eq('id', itemId)
        .single();

    if (error) {
        console.error("Supabase Cart Fetch Error:", error);
        return NextResponse.json({ message: "Item not found" }, { status: 404 });
    }

    return NextResponse.json(data);
}

export async function DELETE(request, { params }) {
    const { itemId } = await params;

    // Supabase delete
    const { error } = await supabase
        .from('cart_items')
        .delete()
        .eq('id', itemId);

    if (error) {
        console.error("Supabase Cart Delete Error:", error);
        return NextResponse.json({ message: "Failed to remove item" }, { status: 500 });
    }

    return NextResponse.json({ message: "Item removed" });
}

export async function PUT(request, { params }) {
    const { itemId } = await params;

    try {
        const body = await request.json();
        const { quantity } = body;

        // Fetch item first to get price
        const { data: item, error: fetchError } = await supabase
            .from('cart_items')
            .select('price')
            .eq('id', itemId)
            .single();

        if (fetchError || !item) {
            return NextResponse.json({ message: "Item not found" }, { status: 404 });
        }

        const newTotalAmount = item.price * quantity;

        const { data, error } = await supabase
            .from('cart_items')
            .update({
                quantity: quantity,
                total_amount: newTotalAmount
            })
            .eq('id', itemId)
            .select();

        if (error) {
            console.error("Supabase Cart Update Error:", error);
            return NextResponse.json({ message: "Failed to update item" }, { status: 500 });
        }

        return NextResponse.json({ message: "Item updated", item: data[0] });

    } catch (err) {
        console.error("PUT Error:", err);
        return NextResponse.json({ message: "Server Error" }, { status: 500 });
    }
}
