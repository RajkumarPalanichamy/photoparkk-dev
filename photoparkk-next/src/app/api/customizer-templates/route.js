import { supabase } from '@/lib/supabase';
import { NextResponse } from 'next/server';

export async function GET() {
    const { data, error } = await supabase
        .from('customizer_templates')
        .select('*')
        .order('created_at', { ascending: false });

    if (error) {
        console.error("Fetch templates error:", error.message, error.details);
        return NextResponse.json({ message: "Failed to fetch templates", error: error.message }, { status: 500 });
    }

    return NextResponse.json(data);
}

export async function POST(request) {
    try {
        const body = await request.json();

        const { data, error } = await supabase
            .from('customizer_templates')
            .insert([body])
            .select()
            .single();

        if (error) {
            console.error("Create template error:", error.message, error.details);
            return NextResponse.json({ message: "Failed to create template", error: error.message }, { status: 500 });
        }

        return NextResponse.json(data);
    } catch (err) {
        return NextResponse.json({ message: "Invalid Request" }, { status: 400 });
    }
}
