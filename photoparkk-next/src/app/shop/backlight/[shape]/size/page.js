"use client";
import React from 'react';
import { useParams } from 'next/navigation';
import BacklightSizeSelector from '@/Components/Shop/BacklightSizeSelector';

export default function BacklightSizePage() {
    const params = useParams();
    const shape = params.shape || 'portrait';

    return <BacklightSizeSelector shape={shape} />;
}
