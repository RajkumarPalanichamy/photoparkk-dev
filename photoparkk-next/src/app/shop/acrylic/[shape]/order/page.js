
"use client";
import React from 'react';
import { useParams } from 'next/navigation';
import GenericOrder from '../../../../../Components/Shop/GenericOrder';

// Valid shapes
const shapes = ["portrait", "landscape", "square", "love", "hexagon", "round"];

export default function OrderPage() {
    const params = useParams();
    const shape = params.shape;

    if (!shapes.includes(shape)) {
        return <div>Shape not found</div>;
    }

    return <GenericOrder type="acrylic" shape={shape} />;
}
