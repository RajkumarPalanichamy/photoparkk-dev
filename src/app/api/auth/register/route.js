
import { supabase } from '@/lib/supabase';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { NextResponse } from 'next/server';

export async function POST(req) {
    try {
        const { name, email, password, role } = await req.json();
        if (!name || !email || !password) {
            return NextResponse.json({ message: "Please fill all fields" }, { status: 400 });
        }

        // Check if user exists
        const { data: existingUser } = await supabase
            .from('users')
            .select('*')
            .eq('email', email)
            .single();

        if (existingUser) {
            return NextResponse.json({ message: "User already exists" }, { status: 400 });
        }

        // Hash password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const allowedRoles = ["admin", "customer"];
        const assignedRole = allowedRoles.includes(role) ? role : "customer";

        // Insert user
        const { data: newUser, error } = await supabase
            .from('users')
            .insert([
                { name, email, password_hash: hashedPassword, role: assignedRole }
            ])
            .select()
            .single();

        if (error) throw error;

        // Generate Tokens
        const accessToken = jwt.sign({ id: newUser.id }, process.env.JWT_SECRET, { expiresIn: '15m' });
        const refreshToken = jwt.sign({ id: newUser.id }, process.env.JWT_SECRET, { expiresIn: '7d' });

        return NextResponse.json({
            user: {
                _id: newUser.id, // Keep _id format for compatibility with frontend if needed, or update frontend to use id
                id: newUser.id,
                name: newUser.name,
                email: newUser.email,
                role: newUser.role,
            },
            accessToken,
            refreshToken,
        }, { status: 201 });

    } catch (error) {
        console.error("Register Error:", error);
        return NextResponse.json({ message: "Server Error", error: error.message }, { status: 500 });
    }
}
