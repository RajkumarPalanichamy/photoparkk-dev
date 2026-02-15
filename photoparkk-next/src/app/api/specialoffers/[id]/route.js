
import { supabase } from '@/lib/supabase';
import { NextResponse } from 'next/server';

export async function GET(request, { params }) {
    const { id } = await params;

    const { data, error } = await supabase
        .from('special_offers')
        .select('*')
        .eq('id', id)
        .single();

    if (error) {
        return NextResponse.json({ message: "Offer not found" }, { status: 404 });
    }

    return NextResponse.json(data);
}

export async function PUT(request, { params }) {
    const { id } = await params;

    try {
        const body = await request.json();
        const { data, error } = await supabase
            .from('special_offers')
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
        .from('special_offers')
        .delete()
        .eq('id', id);

    if (error) {
        return NextResponse.json({ message: "Delete failed" }, { status: 500 });
    }

    return NextResponse.json({ message: "Offer deleted" });
}
