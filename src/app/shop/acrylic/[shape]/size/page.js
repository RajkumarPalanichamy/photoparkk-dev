"use client";
import React from 'react';
import { useParams } from 'next/navigation';
import GenericSizeSelector from '@/Components/Shop/GenericSizeSelector';

export default function SizePage() {
    const params = useParams();
    const shape = params.shape || 'portrait';

    return <GenericSizeSelector type="acrylic" shape={shape} />;
}
