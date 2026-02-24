
import { supabase } from '@/lib/supabase';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { NextResponse } from 'next/server';

export async function POST(req) {
    try {
        const { email, password } = await req.json();
        if (!email || !password) {
            return NextResponse.json({ message: "Email and password required" }, { status: 400 });
        }

        // Find User
        const { data: user, error: userError } = await supabase
            .from('users')
            .select('*')
            .eq('email', email)
            .single();

        if (userError || !user) {
            console.log("Login: User not found or error:", email, userError);
            return NextResponse.json({ message: "Invalid Credentials" }, { status: 400 });
        }

        console.log("Login: User found, verifying password...");

        // Verify Password
        const isMatch = await bcrypt.compare(password, user.password_hash);
        console.log("Login: Password match:", isMatch);

        if (!isMatch) {
            return NextResponse.json({ message: "Invalid Credentials" }, { status: 400 });
        }

        // Generate Tokens
        const accessToken = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: '15m' });
        const refreshToken = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: '7d' });

        return NextResponse.json({
            user: {
                _id: user.id,
                id: user.id,
                name: user.name,
                email: user.email,
                role: user.role,
            },
            accessToken,
            refreshToken,
        });

    } catch (error) {
        console.error("Login Error:", error);
        return NextResponse.json({ message: "Server Error", error: error.message }, { status: 500 });
    }
}
