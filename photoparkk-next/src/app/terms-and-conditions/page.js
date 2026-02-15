
import React from 'react';
import LegalLayout from '@/Components/LegalLayout';

export const metadata = {
    title: 'Terms & Conditions | Photo Parkk',
    description: 'The terms and conditions for using Photo Parkk services.',
};

export default function TermsAndConditionsPage() {
    return (
        <LegalLayout>
            <h1 className="text-3xl font-bold mb-8 text-secondary border-b pb-4">
                Terms & Conditions
            </h1>

            <div className="space-y-6 text-neutral-700 leading-relaxed">
                <p>
                    <span className="font-bold">Effective Date:</span> July 2, 2025
                </p>

                <p>
                    Welcome to <span className="font-bold text-secondary">PhotoParkk</span>. By accessing or using our
                    website and services, you agree to be bound by the following Terms &
                    Conditions. If you do not agree with any part of these terms, please do
                    not use our services.
                </p>

                <section>
                    <h2 className="text-xl font-bold text-secondary mt-8 mb-4">1. About Us</h2>
                    <p>
                        PhotoParkk is a personalized photo framing service operated via{" "}
                        <a href="mailto:photoparkk.prints@gmail.com" className="text-primary hover:underline">
                            photoparkk.prints@gmail.com
                        </a>
                        . We offer custom-designed photo frames based on your uploaded images
                        and preferences.
                    </p>
                </section>

                <section>
                    <h2 className="text-xl font-bold text-secondary mt-8 mb-4">
                        2. Use of Our Services
                    </h2>
                    <ul className="list-disc ml-6 space-y-2">
                        <li>You must be at least 18 years old to place an order.</li>
                        <li>All information provided must be accurate and current.</li>
                        <li>
                            You agree not to upload any illegal, offensive, or copyrighted images
                            without permission.
                        </li>
                    </ul>
                </section>

                <section>
                    <h2 className="text-xl font-bold text-secondary mt-8 mb-4">
                        3. Orders & Customizations
                    </h2>
                    <p>
                        Once an order is placed, it cannot be modified or canceled after
                        processing begins. Customization details such as frame type, size, and
                        image placement are the customer’s responsibility. Please review all
                        selections carefully before confirming your order.
                    </p>
                </section>

                <section>
                    <h2 className="text-xl font-bold text-secondary mt-8 mb-4">4. Payment Terms</h2>
                    <p>
                        All payments must be made in full at the time of order. We use secure
                        payment gateways to process transactions. Prices are subject to change
                        without notice.
                    </p>
                </section>

                <section>
                    <h2 className="text-xl font-bold text-secondary mt-8 mb-4">
                        5. Shipping & Delivery
                    </h2>
                    <p>
                        We aim to deliver your customized frames within the estimated delivery
                        time. Delays may occur due to unforeseen circumstances. We are not
                        responsible for delays caused by third-party courier services.
                    </p>
                </section>

                <section>
                    <h2 className="text-xl font-bold text-secondary mt-8 mb-4">
                        6. Returns & Replacements
                    </h2>
                    <p>
                        Since products are custom-made, returns are not accepted unless the item
                        is defective or damaged during shipping. In such cases, please contact
                        us with photo evidence within 48 hours of delivery.
                    </p>
                </section>

                <section>
                    <h2 className="text-xl font-bold text-secondary mt-8 mb-4">
                        7. Intellectual Property
                    </h2>
                    <p>
                        All website content, designs, and product templates are the property of
                        PhotoParkk. User-uploaded images remain the property of the user and are
                        used only for fulfilling the specific order.
                    </p>
                </section>

                <section>
                    <h2 className="text-xl font-bold text-secondary mt-8 mb-4">
                        8. Limitation of Liability
                    </h2>
                    <p>
                        PhotoParkk shall not be liable for any indirect, incidental, or
                        consequential damages resulting from the use or inability to use our
                        services.
                    </p>
                </section>

                <section>
                    <h2 className="text-xl font-bold text-secondary mt-8 mb-4">
                        9. Modifications to Terms
                    </h2>
                    <p>
                        We reserve the right to modify these Terms & Conditions at any time.
                        Updated terms will be posted on this page, and your continued use of the
                        service implies acceptance.
                    </p>
                </section>

                <section className="pt-8 mt-8 border-t">
                    <h2 className="text-xl font-bold text-secondary mb-4">10. Contact Us</h2>
                    <p className="mb-2">
                        If you have any questions about these Terms, please contact us:
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
