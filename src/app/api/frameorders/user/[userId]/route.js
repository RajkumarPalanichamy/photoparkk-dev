
import { supabase } from '@/lib/supabase';
import { NextResponse } from 'next/server';

export async function GET(request, { params }) {
    const { userId } = await params;

    if (!userId) {
        return NextResponse.json({ message: "UserId is required" }, { status: 400 });
    }

    const { data, error } = await supabase
        .from('frame_orders')
        .select('*')
        .eq('user_id', userId)
        .order('created_at', { ascending: false });

    if (error) {
        console.error("Supabase My Frame Orders Error:", error);
        return NextResponse.json({ message: "Failed to fetch frame orders" }, { status: 500 });
    }

    return NextResponse.json(data);
}
