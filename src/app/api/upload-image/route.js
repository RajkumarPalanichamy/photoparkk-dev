import { supabase } from '@/lib/supabase';
import { NextResponse } from 'next/server';

export async function POST(request) {
    try {
        const formData = await request.formData();
        const file = formData.get('image');

        if (!file) {
            return NextResponse.json({ message: "No image file provided" }, { status: 400 });
        }

        // Generate unique filename (Flat structure like LeveCotton)
        const ext = file.name.split('.').pop() || 'jpg';
        const fileName = `${Date.now()}-${Math.random().toString(36).substring(2, 8)}.${ext}`;

        // Convert file to buffer
        const bytes = await file.arrayBuffer();
        const buffer = Buffer.from(bytes);

        // Upload to Supabase Storage
        const { data, error } = await supabase.storage
            .from('photos')
            .upload(fileName, buffer, {
                contentType: file.type,
                upsert: false,
            });

        if (error) {
            console.error("Supabase Storage Error Details:", JSON.stringify(error, null, 2));

            // LeveCotton Fallback Mechanism: Return Base64 data URI if docker fails path traversal
            const base64 = buffer.toString('base64');
            const imageUrl = `data:${file.type};base64,${base64}`;
            console.log("Fallback base64 triggered due to Supabase error.");
            return NextResponse.json({ imageUrl });
        }

        // Get Public URL
        const { data: { publicUrl } } = supabase.storage
            .from('photos')
            .getPublicUrl(fileName);

        // Ensure URL is absolute based on LeveCotton's flow
        let imageUrl = publicUrl;
        if (imageUrl.startsWith('/')) {
            const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
            if (supabaseUrl) {
                imageUrl = `${supabaseUrl.replace(/\/$/, '')}/storage/v1/object/public/photos/${fileName}`;
            }
        }

        return NextResponse.json({ imageUrl });

    } catch (error) {
        console.error("Upload Error (Catch Block):", error);
        return NextResponse.json({ message: `Image upload failed: ${error.message}` }, { status: 500 });
    }
}
