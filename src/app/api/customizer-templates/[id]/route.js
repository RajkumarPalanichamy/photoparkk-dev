import { supabase } from '@/lib/supabase';
import { NextResponse } from 'next/server';

export async function PUT(request, { params }) {
    const { id } = await params;
    try {
        const body = await request.json();
        const { data, error } = await supabase
            .from('customizer_templates')
            .update(body)
            .eq('id', id)
            .select()
            .single();

        if (error) {
            console.error("Update template error:", error.message, error.details);
            return NextResponse.json({ message: "Failed to update template", error: error.message }, { status: 500 });
        }

        return NextResponse.json(data);
    } catch (err) {
        return NextResponse.json({ message: "Invalid Request" }, { status: 400 });
    }
}

export async function DELETE(request, { params }) {
    const { id } = await params;
    const { error } = await supabase
        .from('customizer_templates')
        .delete()
        .eq('id', id);

    if (error) {
        console.error("Delete template error:", error.message, error.details);
        return NextResponse.json({ message: "Failed to delete template", error: error.message }, { status: 500 });
    }

    return NextResponse.json({ message: "Deleted successfully" });
}
