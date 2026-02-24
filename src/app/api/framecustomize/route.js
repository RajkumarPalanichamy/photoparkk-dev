
import { supabase } from '@/lib/supabase';
import { NextResponse } from 'next/server';

export async function GET(request) {
    try {
        const { data, error } = await supabase
            .from('frame_customize')
            .select('*')
            .order('created_at', { ascending: false });

        if (error) throw error;

        return NextResponse.json(data);
    } catch (error) {
        console.error("Fetch Frame Customize Error:", error);
        return NextResponse.json({ message: "Error fetching frames" }, { status: 500 });
    }
}

export async function POST(request) {
    try {
        const body = await request.json();
        const {
            userId,
            shapeData,
            selectedShape,
            selectedColor,
            selectedFrameImage,
            selectedSize,
            quantity,
            userUploadedImage
        } = body;

        const { data, error } = await supabase
            .from('frame_customize')
            .insert([
                {
                    user_id: userId,
                    shape_data: shapeData,
                    selected_shape: selectedShape,
                    selected_color: selectedColor,
                    selected_frame_image: selectedFrameImage,
                    selected_size: selectedSize,
                    quantity: quantity,
                    user_uploaded_image: userUploadedImage
                }
            ])
            .select();

        if (error) throw error;

        return NextResponse.json(data[0]);
    } catch (error) {
        console.error("Create Frame Customize Error:", error);
        return NextResponse.json({ message: "Error saving frame customization" }, { status: 500 });
    }
}
