
import { sendEmail } from '@/lib/nodemailer';
import { NextResponse } from 'next/server';

export async function POST(request) {
    try {
        const { user_name, user_email, message } = await request.json();

        // Validate basic fields
        if (!user_name || !user_email || !message) {
            return NextResponse.json(
                { message: 'Missing required fields' },
                { status: 400 }
            );
        }

        const subject = `New Contact Form Message from ${user_name}`;
        const text = `
            Name: ${user_name}
            Email: ${user_email}
            
            Message:
            ${message}
        `;
        const html = `
            <h3>New Contact Form Submission</h3>
            <p><strong>Name:</strong> ${user_name}</p>
            <p><strong>Email:</strong> ${user_email}</p>
            <p><strong>Message:</strong></p>
            <p>${message.replace(/\n/g, '<br>')}</p>
        `;

        await sendEmail({
            to: process.env.EMAIL_TO || 'photoparkk.prints@gmail.com',
            subject,
            text,
            html,
        });

        return NextResponse.json({ message: 'Email sent successfully' }, { status: 200 });
    } catch (error) {
        console.error('Contact API error:', error);
        return NextResponse.json(
            { message: 'Failed to send email' },
            { status: 500 }
        );
    }
}
