"use client";
import React from 'react';
import { useParams } from 'next/navigation';
import CanvasSizeSelector from '@/Components/Shop/CanvasSizeSelector';

export default function CanvasSizePage() {
    const params = useParams();
    const shape = params.shape || 'portrait';

    return <CanvasSizeSelector shape={shape} />;
}
