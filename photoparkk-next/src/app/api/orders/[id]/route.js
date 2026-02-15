
import { supabase } from '@/lib/supabase';
import { NextResponse } from 'next/server';

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

    const { data, error } = await supabase
        .from('orders')
        .update({ status })
        .eq('id', id)
        .select()
        .single();

    if (error) {
        return NextResponse.json({ message: "Update failed" }, { status: 500 });
    }

    return NextResponse.json(data);
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
