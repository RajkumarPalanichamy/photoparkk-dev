import { supabase } from '@/lib/supabase';
import { NextResponse } from 'next/server';

export async function GET() {
    const { data, error } = await supabase
        .from('customizer_templates')
        .select('*')
        .order('created_at', { ascending: false });

    if (error) {
        console.error("Fetch templates error:", error.message);
        // If the table doesn't exist yet, return an empty array instead of 500
        if (error.code === 'PGRST204' || error.code === 'PGRST205' || error.message.includes('relation "customizer_templates" does not exist')) {
            return NextResponse.json([]);
        }
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
            console.error("Create template error:", error.message);
            // Check if table is missing
            if (error.code === 'PGRST204' || error.code === 'PGRST205' || error.message.includes('relation "customizer_templates" does not exist')) {
                return NextResponse.json({
                    message: "Database Setup Required: The 'customizer_templates' table does not exist. Please run the SQL setup script in your Supabase dashboard.",
                    error: error.message
                }, { status: 500 });
            }
            return NextResponse.json({ message: "Failed to create template", error: error.message }, { status: 500 });
        }

        return NextResponse.json(data);
    } catch (err) {
        return NextResponse.json({ message: "Invalid Request" }, { status: 400 });
    }
}
