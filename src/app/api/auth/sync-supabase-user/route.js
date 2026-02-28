import { createClient } from '@supabase/supabase-js';
import jwt from 'jsonwebtoken';
import { supabase } from '@/lib/supabase';
import { NextResponse } from 'next/server';

/**
 * POST /api/auth/sync-supabase-user
 * Called after magic link login. Verifies Supabase JWT, upserts user into
 * photoparkk.users so cart/orders keep working, returns our app JWT.
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
        const accessToken = authHeader.replace('Bearer ', '').trim();

        const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
        const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
        if (!supabaseUrl || !supabaseAnonKey) {
            return NextResponse.json(
                { message: 'Server configuration error' },
                { status: 500 }
            );
        }

        const authClient = createClient(supabaseUrl, supabaseAnonKey);
        const { data: { user: authUser }, error: authError } = await authClient.auth.getUser(accessToken);

        if (authError || !authUser) {
            return NextResponse.json(
                { message: 'Invalid or expired link. Please request a new one.' },
                { status: 401 }
            );
        }

        const userId = authUser.id;
        const email = authUser.email?.trim().toLowerCase() || '';
        const name = authUser.user_metadata?.name || authUser.user_metadata?.full_name || email?.split('@')[0] || 'Customer';

        if (!email) {
            return NextResponse.json(
                { message: 'Email not found for this account' },
                { status: 400 }
            );
        }

        const { data: existingUser } = await supabase
            .from('users')
            .select('id, name, email')
            .eq('id', userId)
            .single();

        if (existingUser) {
            await supabase
                .from('users')
                .update({
                    name,
                    email,
                    updated_at: new Date().toISOString(),
                })
                .eq('id', userId);
        } else {
            const { error: insertError } = await supabase
                .from('users')
                .insert({
                    id: userId,
                    name,
                    email,
                    role: 'customer',
                    password_hash: null,
                });

            if (insertError) {
                console.error('Sync user insert error:', insertError);
                return NextResponse.json(
                    { message: 'Failed to create account' },
                    { status: 500 }
                );
            }
        }

        const JWT_SECRET = process.env.JWT_SECRET;
        if (!JWT_SECRET) {
            return NextResponse.json(
                { message: 'Server configuration error' },
                { status: 500 }
            );
        }

        const appAccessToken = jwt.sign({ id: userId }, JWT_SECRET, { expiresIn: '15m' });
        const appRefreshToken = jwt.sign({ id: userId }, JWT_SECRET, { expiresIn: '7d' });

        return NextResponse.json({
            user: {
                _id: userId,
                id: userId,
                name,
                email,
                role: 'customer',
            },
            accessToken: appAccessToken,
            refreshToken: appRefreshToken,
        });
    } catch (err) {
        console.error('Sync supabase user error:', err);
        return NextResponse.json(
            { message: 'Server error' },
            { status: 500 }
        );
    }
}
