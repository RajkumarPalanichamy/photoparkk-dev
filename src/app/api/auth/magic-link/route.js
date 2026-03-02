import { createClient } from '@supabase/supabase-js';
import { NextResponse } from 'next/server';

/**
 * POST /api/auth/magic-link
 * Sends a magic link (OTP) to the given email via Supabase Auth.
 * Works for both new users (creates account) and existing users (sends login link).
 *
 * Supabase Dashboard: Auth → URL Configuration → add your redirect URL, e.g.:
 * - http://localhost:3000/auth/callback (dev)
 * - https://yourdomain.com/auth/callback (prod)
 *
 * If you see "Error sending confirmation email": Supabase's default email has strict
 * limits (e.g. 2/hour, only team emails). For production, configure custom SMTP
 * in Supabase: Auth → Email Templates / SMTP (e.g. Resend, SendGrid, Brevo).
 */
export async function POST(request) {
    try {
        const body = await request.json();
        const { email } = body;

        if (!email || typeof email !== 'string') {
            return NextResponse.json(
                { message: 'Valid email is required' },
                { status: 400 }
            );
        }

        const trimmedEmail = email.trim().toLowerCase();
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(trimmedEmail)) {
            return NextResponse.json(
                { message: 'Invalid email address' },
                { status: 400 }
            );
        }

        const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
        const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

        if (!supabaseUrl || !supabaseAnonKey) {
            console.error('Supabase env vars missing');
            return NextResponse.json(
                { message: 'Server configuration error' },
                { status: 500 }
            );
        }

        const supabase = createClient(supabaseUrl, supabaseAnonKey);

        const origin = request.nextUrl?.origin || process.env.NEXT_PUBLIC_APP_URL || '';
        const callbackUrl = `${origin}/auth/callback`;

        if (process.env.NODE_ENV === 'development' && process.env.NEXT_PUBLIC_SKIP_MAGIC_LINK_EMAIL === 'true') {
            console.warn('[magic-link] Dev bypass: skipping Supabase email. Set custom SMTP in Supabase for real magic links.');
            return NextResponse.json({
                success: true,
                message: "We've sent a secure login link to your email.",
            });
        }

        const { data, error } = await supabase.auth.signInWithOtp({
            email: trimmedEmail,
            options: {
                emailRedirectTo: callbackUrl,
                data: {
                    source: 'checkout',
                },
            },
        });

        if (error) {
            console.error('[magic-link] Supabase error:', error.message, 'code:', error.code || error.status);
            const rawMessage = error.message || 'Failed to send login link';
            const isEmailDeliveryError = /confirmation email|sending.*email|email.*(?:fail|error)/i.test(rawMessage);
            const userMessage = isEmailDeliveryError
                ? "We couldn't send the login email right now. Please try again in a few minutes, use a different email, or check your spam folder. If it keeps failing, the site may need to enable custom email delivery."
                : rawMessage;
            const payload = { message: userMessage };
            if (process.env.NODE_ENV === 'development' && error.code) payload.code = error.code;
            return NextResponse.json(payload, { status: 400 });
        }

        return NextResponse.json({
            success: true,
            message: "We've sent a secure login link to your email.",
        });
    } catch (err) {
        console.error('Magic link API error:', err);
        return NextResponse.json(
            { message: 'Server error' },
            { status: 500 }
        );
    }
}
