
"use client";
import React from 'react';
import { useParams } from 'next/navigation';
import GenericCustomize from '../../../../Components/Shop/GenericCustomize';

// Valid shapes
const shapes = ["portrait", "landscape", "square"];

export default function CustomizePage() {
    const params = useParams();
    const shape = params.shape;

    if (!shapes.includes(shape)) {
        return <div>Shape not found</div>;
    }

    return <GenericCustomize type="canvas" shape={shape} />;
}
