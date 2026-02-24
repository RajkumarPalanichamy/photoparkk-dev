
import { supabase } from '@/lib/supabase';
import { NextResponse } from 'next/server';

export async function GET(request, { params }) {
    const { id } = await params;

    if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) {
        return NextResponse.json(
            { message: "Supabase credentials are missing. Please update your .env.local file with valid URL and Key." },
            { status: 500 }
        );
    }

    const { data, error } = await supabase
        .from('new_arrivals')
        .select('*')
        .eq('id', id)
        .single();

    if (error) {
        console.error("Supabase error fetching product:", error);
        return NextResponse.json({ message: "Product not found or database error" }, { status: 404 });
    }

    return NextResponse.json(data);
}

export async function PUT(request, { params }) {
    const { id } = await params;

    try {
        const body = await request.json();
        const { data, error } = await supabase
            .from('new_arrivals')
            .update(body)
            .eq('id', id)
            .select()
            .single();

        if (error) {
            return NextResponse.json({ message: "Update failed" }, { status: 500 });
        }

        return NextResponse.json(data);
    } catch (err) {
        return NextResponse.json({ message: "Bad Request" }, { status: 400 });
    }
}

export async function DELETE(request, { params }) {
    const { id } = await params;

    const { error } = await supabase
        .from('new_arrivals')
        .delete()
        .eq('id', id);

    if (error) {
        return NextResponse.json({ message: "Delete failed" }, { status: 500 });
    }

    return NextResponse.json({ message: "Product deleted" });
}
