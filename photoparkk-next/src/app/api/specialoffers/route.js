
import { supabase } from '@/lib/supabase';
import { NextResponse } from 'next/server';

export async function GET() {
    const { data, error } = await supabase
        .from('special_offers')
        .select('*')
        .order('created_at', { ascending: false });

    if (error) {
        return NextResponse.json({ message: "Failed to fetch special offers" }, { status: 500 });
    }

    return NextResponse.json(data);
}

export async function POST(request) {
    try {
        const body = await request.json();

        const { data, error } = await supabase
            .from('special_offers')
            .insert([body])
            .select()
            .single();

        if (error) {
            console.error(error);
            return NextResponse.json({ message: "Failed to create offer" }, { status: 500 });
        }

        return NextResponse.json(data);
    } catch (err) {
        return NextResponse.json({ message: "Invalid Request" }, { status: 400 });
    }
}
