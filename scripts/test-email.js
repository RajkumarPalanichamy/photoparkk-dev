const nodemailer = require('nodemailer');
require('dotenv').config({ path: '.env.local' });

async function testEmail() {
    console.log('Testing Nodemailer configuration...');
    console.log('EMAIL_USER:', process.env.EMAIL_USER);
    console.log('EMAIL_TO:', process.env.EMAIL_TO);

    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS,
        },
    });

    const mailOptions = {
        from: process.env.EMAIL_USER,
        to: process.env.EMAIL_TO || 'photoparkk.prints@gmail.com',
        subject: 'Nodemailer Test Email - Photo Parkk',
        text: 'This is a test email to verify the Nodemailer configuration for Photo Parkk.',
        html: '<h3>Nodemailer Test</h3><p>This is a test email to verify the Nodemailer configuration for Photo Parkk.</p>',
    };

    try {
        const info = await transporter.sendMail(mailOptions);
        console.log('Email sent successfully!');
        console.log('Response:', info.response);
    } catch (error) {
        console.error('Error sending email:', error);
    }
}

testEmail();
