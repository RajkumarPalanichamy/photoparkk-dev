
import { supabase } from '@/lib/supabase';
import { NextResponse } from 'next/server';
import { v4 as uuidv4 } from 'uuid';

export async function POST(request) {
    try {
        const formData = await request.formData();
        const file = formData.get('image');

        if (!file) {
            return NextResponse.json({ message: "No image file provided" }, { status: 400 });
        }

        const arrayBuffer = await file.arrayBuffer();
        const buffer = Buffer.from(arrayBuffer);

        // Generate a unique file name
        const fileExt = file.name.split('.').pop();
        const fileName = `${uuidv4()}.${fileExt}`;
        const filePath = `uploads/${fileName}`;

        // Upload to Supabase Storage
        // NOTE: Ensure you have created a bucket named 'photos' in Supabase and set its access to PUBLIC.
        const { data, error } = await supabase.storage
            .from('photos')
            .upload(filePath, buffer, {
                contentType: file.type,
                upsert: false
            });

        if (error) {
            console.error("Supabase Storage Error:", error);
            // If error is bucket not found, remind user
            if (error.message?.includes('bucket not found')) {
                return NextResponse.json({
                    message: "Supabase storage bucket 'photos' not found. Please create it in your dashboard."
                }, { status: 500 });
            }
            return NextResponse.json({ message: error.message }, { status: 500 });
        }

        // Get Public URL
        const { data: { publicUrl } } = supabase.storage
            .from('photos')
            .getPublicUrl(filePath);

        return NextResponse.json({ imageUrl: publicUrl });

    } catch (error) {
        console.error("Upload Error:", error);
        return NextResponse.json({ message: "Image upload failed" }, { status: 500 });
    }
}
