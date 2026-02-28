
import { supabase } from '@/lib/supabase';
import jwt from 'jsonwebtoken';
import { NextResponse } from 'next/server';

export async function POST(req) {
    try {
        const { refreshToken } = await req.json();

        if (!refreshToken) {
            return NextResponse.json({ message: "Refresh token required" }, { status: 401 });
        }

        // Verify Refresh Token
        let decoded;
        try {
            decoded = jwt.verify(refreshToken, process.env.JWT_SECRET);
        } catch (err) {
            return NextResponse.json({ message: "Invalid refresh token" }, { status: 401 });
        }

        // Check if user exists in DB
        const { data: user, error } = await supabase
            .from('users')
            .select('*')
            .eq('id', decoded.id)
            .single();

        if (error || !user) {
            return NextResponse.json({ message: "User not found" }, { status: 401 });
        }

        // Generate New Access Token
        const accessToken = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: '15m' });

        return NextResponse.json({
            accessToken,
            refreshToken,
        });

    } catch (error) {
        console.error("Refresh Token Error:", error);
        return NextResponse.json({ message: "Server Error" }, { status: 500 });
    }
}
