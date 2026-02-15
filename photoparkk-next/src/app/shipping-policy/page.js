
import React from 'react';
import LegalLayout from '@/Components/LegalLayout';

export const metadata = {
    title: 'Shipping Policy | Photo Parkk',
    description: 'Our shipping policies, timelines, and costs for photo frame deliveries.',
};

export default function ShippingPolicyPage() {
    return (
        <LegalLayout>
            <h1 className="text-3xl font-bold mb-8 text-secondary border-b pb-4">
                Shipping Policy
            </h1>

            <div className="space-y-6 text-neutral-700 leading-relaxed">
                <p>
                    <span className="font-bold">Effective Date:</span> July 2, 2025
                </p>

                <p>
                    Thank you for shopping with <span className="font-bold text-secondary">PhotoParkk</span>. This Shipping
                    Policy outlines the terms and timelines for the delivery of our custom
                    photo frame products. We aim to ensure a smooth and timely delivery
                    experience for all our customers.
                </p>

                <section>
                    <h2 className="text-xl font-bold text-secondary mt-8 mb-4">1. Order Processing</h2>
                    <div className="space-y-2">
                        <p>• All custom orders are processed within <span className="font-bold">2–4 business days</span> after we receive your image and payment.</p>
                        <p>• During peak periods or promotional events, processing times may extend slightly.</p>
                        <p>• You will receive an order confirmation email after your purchase, and another email once your order has been shipped.</p>
                    </div>
                </section>

                <section>
                    <h2 className="text-xl font-bold text-secondary mt-8 mb-4">2. Shipping Time</h2>
                    <div className="space-y-2">
                        <p>• Once dispatched, shipping typically takes <span className="font-bold">3–7 business days</span> depending on your location.</p>
                        <p>• We partner with reliable courier services like Delhivery, Blue Dart, or India Post for fast and safe delivery.</p>
                    </div>
                </section>

                <section>
                    <h2 className="text-xl font-bold text-secondary mt-8 mb-4">3. Shipping Charges</h2>
                    <div className="space-y-2">
                        <p>• Shipping charges are calculated at checkout based on your location and order size.</p>
                        <p>• Free shipping may be available on special offers or minimum order values, as announced on our website.</p>
                    </div>
                </section>

                <section>
                    <h2 className="text-xl font-bold text-secondary mt-8 mb-4">4. Delivery Areas</h2>
                    <div className="space-y-2">
                        <p>• We currently ship all over India.</p>
                        <p>• If your area is unserviceable or out of coverage, we will contact you to provide alternative solutions or issue a refund if needed.</p>
                    </div>
                </section>

                <section>
                    <h2 className="text-xl font-bold text-secondary mt-8 mb-4">
                        5. Tracking Your Order
                    </h2>
                    <div className="space-y-2">
                        <p>• Once shipped, a tracking number will be shared via email or SMS.</p>
                        <p>• You can track your order status directly through the courier partner's website or our order tracking page (if available).</p>
                    </div>
                </section>

                <section>
                    <h2 className="text-xl font-bold text-secondary mt-8 mb-4">
                        6. Delays & Exceptions
                    </h2>
                    <div className="space-y-2">
                        <p>• Delivery times may be delayed due to unforeseen circumstances such as weather, strikes, lockdowns, or courier service disruptions.</p>
                        <p>• We will keep you informed in case of any delay and do our best to resolve the issue.</p>
                    </div>
                </section>

                <section>
                    <h2 className="text-xl font-bold text-secondary mt-8 mb-4">7. Damaged Packages</h2>
                    <div className="space-y-2">
                        <p>• If you receive a package that appears damaged or tampered with, please do not accept it and notify us immediately.</p>
                        <p>• If accepted, report any damage within <span className="font-bold">48 hours</span> with photos, and we will assess for a replacement.</p>
                    </div>
                </section>

                <section className="pt-8 mt-8 border-t">
                    <h2 className="text-xl font-bold text-secondary mb-4">8. Contact Us</h2>
                    <p className="mb-2">For any shipping-related questions or issues, feel free to contact us:</p>
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
