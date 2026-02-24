"use client";
import React from 'react';
import { useParams } from 'next/navigation';
import GenericCustomize from '@/Components/Shop/GenericCustomize'; // This is now the Editor

export default function EditorPage() {
    const params = useParams();
    // Default to 'portrait' if shape not found, though folder structure ensures valid shape usually
    const shape = params.shape || 'portrait';

    return <GenericCustomize type="acrylic" shape={shape} />;
}
