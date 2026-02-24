import nodemailer from 'nodemailer';

/**
 * Reusable Nodemailer transporter
 */
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
    },
});

/**
 * Send an email using Nodemailer
 * @param {Object} options - Email options
 * @param {string} options.to - Recipient email
 * @param {string} options.subject - Email subject
 * @param {string} options.text - Plain text content
 * @param {string} options.html - HTML content
 * @returns {Promise} - Resolves when email is sent
 */
export async function sendEmail({ to, subject, text, html }) {
    const mailOptions = {
        from: process.env.EMAIL_USER,
        to: to || process.env.EMAIL_TO || 'photoparkk.prints@gmail.com',
        subject,
        text,
        html,
    };

    try {
        const info = await transporter.sendMail(mailOptions);
        console.log('Email sent: ' + info.response);
        return info;
    } catch (error) {
        console.error('Nodemailer error:', error);
        throw error;
    }
}
