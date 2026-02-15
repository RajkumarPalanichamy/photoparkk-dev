
import nodemailer from 'nodemailer';
import { NextResponse } from 'next/server';

export async function POST(request) {
    if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
        return NextResponse.json(
            { message: "Email configuration is missing in .env.local (EMAIL_USER or EMAIL_PASS)" },
            { status: 500 }
        );
    }
    try {
        const { user_name, user_email, message } = await request.json();

        // Validate basic fields
        if (!user_name || !user_email || !message) {
            return NextResponse.json(
                { message: 'Missing required fields' },
                { status: 400 }
            );
        }

        // Create a transporter
        const transporter = nodemailer.createTransport({
            service: 'gmail', // or use host/port for other services
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS,
            },
        });

        const mailOptions = {
            from: process.env.EMAIL_USER,
            to: process.env.EMAIL_TO || 'photoparkk.prints@gmail.com',
            subject: `New Contact Form Message from ${user_name}`,
            text: `
                Name: ${user_name}
                Email: ${user_email}
                
                Message:
                ${message}
            `,
            html: `
                <h3>New Contact Form Submission</h3>
                <p><strong>Name:</strong> ${user_name}</p>
                <p><strong>Email:</strong> ${user_email}</p>
                <p><strong>Message:</strong></p>
                <p>${message.replace(/\n/g, '<br>')}</p>
            `,
        };

        await transporter.sendMail(mailOptions);

        return NextResponse.json({ message: 'Email sent successfully' }, { status: 200 });
    } catch (error) {
        console.error('Nodemailer error:', error);
        return NextResponse.json(
            { message: 'Failed to send email' },
            { status: 500 }
        );
    }
}
