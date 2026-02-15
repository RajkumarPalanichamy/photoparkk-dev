
import { supabase } from '@/lib/supabase';
import { NextResponse } from 'next/server';

export async function GET() {
    if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) {
        return NextResponse.json(
            { message: "Supabase credentials are missing. Please update your .env.local file with valid URL and Key." },
            { status: 500 }
        );
    }

    const { data, error } = await supabase
        .from('new_arrivals')
        .select('*')
        .order('created_at', { ascending: false });

    if (error) {
        console.error("Supabase error fetching new_arrivals:", error);
        return NextResponse.json({ message: "Failed to fetch new arrivals from database" }, { status: 500 });
    }

    return NextResponse.json(data);
}

export async function POST(request) {
    try {
        const body = await request.json();
        // Validation could be added here

        const { data, error } = await supabase
            .from('new_arrivals')
            .insert([body])
            .select()
            .single();

        if (error) {
            console.error("Insert Error:", error);
            return NextResponse.json({ message: "Failed to add product" }, { status: 500 });
        }

        return NextResponse.json(data);
    } catch (err) {
        return NextResponse.json({ message: "Invalid Request" }, { status: 400 });
    }
}
