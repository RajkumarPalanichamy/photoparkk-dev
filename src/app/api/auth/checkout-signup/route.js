import { supabase } from '@/lib/supabase';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import crypto from 'crypto';
import { NextResponse } from 'next/server';
import { sendEmail } from '@/lib/nodemailer';

function generatePassword(length = 12) {
    const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZabcdefghjkmnpqrstuvwxyz23456789';
    const bytes = crypto.randomBytes(length);
    let result = '';
    for (let i = 0; i < length; i++) result += chars[bytes[i] % chars.length];
    return result;
}

/**
 * POST /api/auth/checkout-signup
 * For guest checkout: create account (or use existing), set a generated password,
 * email the password to the user, and return JWT so they are logged in immediately.
 */
export async function POST(request) {
    try {
        const body = await request.json();
        const email = (body.email || '').trim().toLowerCase();
        const name = (body.name || '').trim() || email.split('@')[0] || 'Customer';

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return NextResponse.json({ message: 'Please enter a valid email address' }, { status: 400 });
        }

        const JWT_SECRET = process.env.JWT_SECRET;
        if (!JWT_SECRET) {
            return NextResponse.json({ message: 'Server configuration error' }, { status: 500 });
        }

        const { data: existingUser } = await supabase
            .from('users')
            .select('id, name, email, role')
            .eq('email', email)
            .single();

        const plainPassword = generatePassword(12);
        const salt = await bcrypt.genSalt(10);
        const password_hash = await bcrypt.hash(plainPassword, salt);

        let userRow;

        if (existingUser) {
            const { error: updateError } = await supabase
                .from('users')
                .update({
                    password_hash,
                    name: name || existingUser.name,
                    updated_at: new Date().toISOString(),
                })
                .eq('id', existingUser.id);

            if (updateError) {
                console.error('Checkout signup update error:', updateError);
                return NextResponse.json({ message: 'Could not update account' }, { status: 500 });
            }
            userRow = { ...existingUser, name: name || existingUser.name };
        } else {
            const { data: newUser, error: insertError } = await supabase
                .from('users')
                .insert([
                    { name: name || 'Customer', email, password_hash, role: 'customer' },
                ])
                .select('id, name, email, role')
                .single();

            if (insertError) {
                console.error('Checkout signup insert error:', insertError);
                return NextResponse.json({ message: 'Could not create account' }, { status: 500 });
            }
            userRow = newUser;
        }

        const subject = existingUser
            ? 'Your PhotoParkk login password'
            : 'Welcome to PhotoParkk – your account and password';
        const html = `
            <div style="font-family: sans-serif; max-width: 480px;">
                <p>Hello${name ? ` ${name}` : ''},</p>
                <p>${existingUser ? 'A new password has been set for your account.' : 'Your account has been created.'}</p>
                <p><strong>Email:</strong> ${email}</p>
                <p><strong>Your password:</strong> <code style="background:#f0f0f0;padding:4px 8px;border-radius:4px;">${plainPassword}</code></p>
                <p>You can change this password later from your account settings. Keep it safe and do not share it.</p>
                <p>Thank you,<br/>PhotoParkk</p>
            </div>
        `;
        const text = `Email: ${email}\nYour password: ${plainPassword}\nYou can change it later from your account settings.`;

        try {
            await sendEmail({ to: email, subject, text, html });
        } catch (emailErr) {
            console.error('Checkout signup email error:', emailErr);
            return NextResponse.json(
                { message: 'Account was created but we could not send the password email. Please try again or contact support.' },
                { status: 500 }
            );
        }

        const accessToken = jwt.sign({ id: userRow.id }, JWT_SECRET, { expiresIn: '15m' });
        const refreshToken = jwt.sign({ id: userRow.id }, JWT_SECRET, { expiresIn: '7d' });

        return NextResponse.json({
            user: {
                _id: userRow.id,
                id: userRow.id,
                name: userRow.name,
                email: userRow.email,
                role: userRow.role,
            },
            accessToken,
            refreshToken,
            message: existingUser
                ? "We've sent your login password to your email. You're logged in."
                : "Account created. We've sent your password to your email. You're logged in.",
        });
    } catch (err) {
        console.error('Checkout signup error:', err);
        return NextResponse.json({ message: 'Server error' }, { status: 500 });
    }
}
