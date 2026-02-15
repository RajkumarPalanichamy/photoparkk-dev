
import React from 'react';
import LegalLayout from '@/Components/LegalLayout';

export const metadata = {
    title: 'Privacy Policy | Photo Parkk',
    description: 'Learn how Photo Parkk collects, uses, and protects your personal information.',
};

export default function PrivacyPolicyPage() {
    return (
        <LegalLayout>
            <h1 className="text-3xl font-bold mb-8 text-secondary border-b pb-4">
                Privacy Policy
            </h1>

            <div className="space-y-6 text-neutral-700 leading-relaxed">
                <p>
                    <span className="font-bold">Effective Date:</span> July 2, 2025
                </p>

                <p>
                    At <span className="font-bold text-secondary">PhotoParkk</span> (
                    <a href="mailto:photoparkk.prints@gmail.com" className="text-primary hover:underline">
                        photoparkk.prints@gmail.com
                    </a>
                    ), we are committed to protecting your privacy. This Privacy Policy
                    explains how we collect, use, and protect your personal information when
                    you use our services or visit our website.
                </p>

                <section>
                    <h2 className="text-xl font-bold text-secondary mt-8 mb-4">
                        1. Information We Collect
                    </h2>
                    <ul className="list-disc ml-6 space-y-2">
                        <li>
                            <span className="font-semibold text-secondary">Personal Information:</span> Name, email address, phone
                            number, delivery address.
                        </li>
                        <li>
                            <span className="font-semibold text-secondary">Order Information:</span> Photo uploads, frame preferences,
                            customizations, transaction details.
                        </li>
                        <li>
                            <span className="font-semibold text-secondary">Technical Data:</span> Device type, browser, IP address, and
                            usage data (via cookies).
                        </li>
                    </ul>
                </section>

                <section>
                    <h2 className="text-xl font-bold text-secondary mt-8 mb-4">
                        2. How We Use Your Information
                    </h2>
                    <ul className="list-disc ml-6 space-y-2">
                        <li>To process and deliver your photo frame orders.</li>
                        <li>To send order updates and respond to customer support requests.</li>
                        <li>To personalize and improve our services and user experience.</li>
                        <li>
                            To prevent fraud, comply with legal obligations, and ensure platform
                            security.
                        </li>
                    </ul>
                </section>

                <section>
                    <h2 className="text-xl font-bold text-secondary mt-8 mb-4">
                        3. Sharing Your Information
                    </h2>
                    <p>
                        We do not sell or rent your personal data. We may share your information
                        with trusted partners only for the purpose of fulfilling orders (e.g.,
                        delivery providers, payment gateways).
                    </p>
                </section>

                <section>
                    <h2 className="text-xl font-bold text-secondary mt-8 mb-4">
                        4. Image Usage Policy
                    </h2>
                    <p>
                        All images uploaded by users are used solely for the purpose of creating
                        and delivering personalized photo frames. We do not use or share your
                        images for marketing or any third-party purposes without explicit
                        consent.
                    </p>
                </section>

                <section>
                    <h2 className="text-xl font-bold text-secondary mt-8 mb-4">
                        5. Data Security
                    </h2>
                    <p>
                        We use secure technologies and best practices to protect your data from
                        unauthorized access, alteration, or loss. All sensitive transactions are
                        encrypted and processed through secure payment gateways.
                    </p>
                </section>

                <section>
                    <h2 className="text-xl font-bold text-secondary mt-8 mb-4">
                        6. Cookies
                    </h2>
                    <p>
                        We use cookies to enhance your browsing experience and analyze website
                        performance. You can manage cookie settings through your browser.
                    </p>
                </section>

                <section>
                    <h2 className="text-xl font-bold text-secondary mt-8 mb-4">
                        7. Your Rights
                    </h2>
                    <p>
                        You have the right to request access to, correction of, or deletion of
                        your personal data. To make a request, contact us at{" "}
                        <a href="mailto:photoparkk.prints@gmail.com" className="text-primary hover:underline">
                            photoparkk.prints@gmail.com
                        </a>
                        .
                    </p>
                </section>

                <section>
                    <h2 className="text-xl font-bold text-secondary mt-8 mb-4">
                        8. Updates to This Policy
                    </h2>
                    <p>
                        We may update this policy from time to time. All updates will be posted
                        on this page with a revised effective date.
                    </p>
                </section>

                <section className="pt-8 mt-8 border-t">
                    <h2 className="text-xl font-bold text-secondary mb-4">
                        9. Contact Information
                    </h2>
                    <p className="mb-2">
                        If you have questions or concerns about our Privacy Policy, contact us:
                    </p>
                    <p className="font-bold text-secondary">PhotoParkk</p>
                    <p>
                        Email:{" "}
                        <a href="mailto:photoparkk.prints@gmail.com" className="text-primary hover:underline">
                            photoparkk.prints@gmail.com
                        </a>
                    </p>
                </section>
            </div>
        </LegalLayout>
    );
}
