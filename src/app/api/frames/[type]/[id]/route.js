
import { supabase } from '@/lib/supabase';
import { NextResponse } from 'next/server';

const TABLE_MAP = {
    'acrylic': 'acrylic_customize',
    'canvas': 'canvas_customize',
    'backlight': 'backlight_customize'
};

export async function GET(request, { params }) {
    const { type, id } = await params;
    const tableName = TABLE_MAP[type];

    if (!tableName) return NextResponse.json({ message: "Invalid type" }, { status: 400 });

    const { data, error } = await supabase
        .from(tableName)
        .select('*')
        .eq('id', id)
        .single();

    if (error) {
        return NextResponse.json({ message: "Frame not found" }, { status: 404 });
    }

    return NextResponse.json(data);
}

export async function PUT(request, { params }) {
    const { type, id } = await params;
    const tableName = TABLE_MAP[type];

    if (!tableName) return NextResponse.json({ message: "Invalid type" }, { status: 400 });

    try {
        const body = await request.json();
        const { data, error } = await supabase
            .from(tableName)
            .update(body)
            .eq('id', id)
            .select()
            .single();

        if (error) {
            console.error("Supabase update error:", error);
            return NextResponse.json({ message: "Update failed", details: error.message }, { status: 500 });
        }

        return NextResponse.json(data);
    } catch (err) {
        return NextResponse.json({ message: "Bad Request" }, { status: 400 });
    }
}

export async function DELETE(request, { params }) {
    const { type, id } = await params;
    const tableName = TABLE_MAP[type];

    if (!tableName) return NextResponse.json({ message: "Invalid type" }, { status: 400 });

    const { error } = await supabase
        .from(tableName)
        .delete()
        .eq('id', id);

    if (error) {
        return NextResponse.json({ message: "Delete failed" }, { status: 500 });
    }

    return NextResponse.json({ message: "Frame deleted" });
}
