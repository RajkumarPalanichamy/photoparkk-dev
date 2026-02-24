"use client";
import { useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';

export default function ShapeRedirect() {
    const router = useRouter();
    const params = useParams();

    useEffect(() => {
        if (params?.shape) {
            router.replace(`/shop/acrylic/${params.shape}/edit`);
        }
    }, [params, router]);

    return null; // Or a loading spinner
}
