
import { supabase } from '@/lib/supabase';
import { NextResponse } from 'next/server';

const TABLE_MAP = {
    'acrylic': 'acrylic_customize',
    'canvas': 'canvas_customize',
    'backlight': 'backlight_customize'
};

export async function GET(request, { params }) {
    const { type } = await params;
    const { searchParams } = new URL(request.url);
    const shape = searchParams.get('shape');

    const tableName = TABLE_MAP[type];

    if (!tableName) {
        return NextResponse.json({ message: "Invalid product type" }, { status: 400 });
    }

    let query = supabase
        .from(tableName)
        .select('*');

    if (shape) {
        // Handle both capitalized and lower case shapes from query param
        const capitalizedShape = shape.charAt(0).toUpperCase() + shape.slice(1).toLowerCase();
        query = query.eq('shape', capitalizedShape);
    }

    const { data, error } = await query.order('created_at', { ascending: false });

    if (error) {
        console.error(`Fetch frames error for ${type}:`, error.message);
        // If the table doesn't exist yet, return an empty array instead of 500
        if (error.code === 'PGRST204' || error.code === 'PGRST205' || error.message.includes('relation') && error.message.includes('does not exist')) {
            return NextResponse.json([]);
        }
        return NextResponse.json({ message: "Failed to fetch frames" }, { status: 500 });
    }

    return NextResponse.json(data);
}

export async function POST(request, { params }) {
    const { type } = await params;
    const tableName = TABLE_MAP[type];

    if (!tableName) {
        return NextResponse.json({ message: "Invalid product type" }, { status: 400 });
    }

    try {
        const body = await request.json();

        const { data, error } = await supabase
            .from(tableName)
            .insert([body])
            .select()
            .single();

        if (error) {
            console.error(error);
            return NextResponse.json({ message: "Failed to create frame" }, { status: 500 });
        }

        return NextResponse.json(data);
    } catch (err) {
        return NextResponse.json({ message: "Invalid Request" }, { status: 400 });
    }
}
