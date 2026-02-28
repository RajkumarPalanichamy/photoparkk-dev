import { supabase } from '@/lib/supabase';
import jwt from 'jsonwebtoken';
import { NextResponse } from 'next/server';

/**
 * POST /api/cart/merge
 * Merges guest cart (localStorage) into logged-in user's cart.
 * Expects: Authorization: Bearer <app JWT>, body: { guestCart: [...] }
 */
export async function POST(request) {
    try {
        const authHeader = request.headers.get('Authorization');
        if (!authHeader?.startsWith('Bearer ')) {
            return NextResponse.json(
                { message: 'Authorization required' },
                { status: 401 }
            );
        }
        const token = authHeader.replace('Bearer ', '').trim();
        let userId;
        try {
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            userId = decoded.id;
        } catch {
            return NextResponse.json(
                { message: 'Invalid or expired session' },
                { status: 401 }
            );
        }

        const body = await request.json();
        const guestCart = Array.isArray(body.guestCart) ? body.guestCart : [];

        if (guestCart.length === 0) {
            const { data } = await supabase
                .from('cart_items')
                .select('id')
                .eq('user_id', userId);
            const mapped = (data || []).map((item) => ({
                _id: item.id,
                id: item.id,
            }));
            return NextResponse.json({ merged: mapped, message: 'No guest items to merge' });
        }

        const inserted = [];
        for (const item of guestCart) {
            const productId = item.productId ?? item.product_id ?? null;
            const productType = item.productType ?? item.product_type ?? 'Canvascustomizedata';
            const title = item.title ?? 'Custom Product';
            const quantity = Math.max(1, parseInt(item.quantity, 10) || 1);
            const size = item.size ?? null;
            const thickness = item.thickness ?? null;
            const price = Number(item.price) || 0;
            const totalAmount = Number(item.totalAmount ?? item.total_amount) || price * quantity;
            const image = item.image ?? null;
            const uploadedImageUrl = item.uploadedImageUrl ?? item.uploaded_image_url ?? null;

            const { data: row, error } = await supabase
                .from('cart_items')
                .insert({
                    user_id: userId,
                    product_id: productId,
                    product_type: productType,
                    title,
                    quantity,
                    size,
                    thickness,
                    price,
                    total_amount: totalAmount,
                    image,
                    uploaded_image_url: uploadedImageUrl,
                })
                .select()
                .single();

            if (!error && row) {
                inserted.push({
                    _id: row.id,
                    id: row.id,
                    ...row,
                });
            }
        }

        return NextResponse.json({
            merged: inserted,
            message: `Merged ${inserted.length} item(s) to your cart`,
        });
    } catch (err) {
        console.error('Cart merge error:', err);
        return NextResponse.json(
            { message: 'Server error' },
            { status: 500 }
        );
    }
}
