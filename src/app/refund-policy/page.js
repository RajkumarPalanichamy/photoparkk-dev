
import React from 'react';
import LegalLayout from '@/Components/LegalLayout';

export const metadata = {
    title: 'Refund & Cancellation Policy | Photo Parkk',
    description: 'Learn about our refund and cancellation policies for customized products.',
};

export default function RefundPolicyPage() {
    return (
        <LegalLayout>
            <h1 className="text-3xl font-bold mb-8 text-secondary border-b pb-4">
                Refund & Cancellation Policy
            </h1>

            <div className="space-y-6 text-neutral-700 leading-relaxed">
                <p>
                    <span className="font-bold">Effective Date:</span> July 2, 2025
                </p>

                <p>
                    At <span className="font-bold text-secondary">PhotoParkk</span>, we take pride in delivering high-quality
                    customized photo frames. Since each product is uniquely made based on
                    your submitted images and specifications, our Refund and Cancellation
                    Policy is outlined below.
                </p>

                <section>
                    <h2 className="text-xl font-bold text-secondary mt-8 mb-4">1. Order Cancellation</h2>
                    <div className="space-y-2">
                        <p>• Orders can only be cancelled within <span className="font-bold">2 hours</span> of placing the order, provided production has not started.</p>
                        <p>• Once processing begins (image printing, cutting, framing), the order cannot be cancelled or changed.</p>
                        <p>• To request cancellation, email us immediately at{" "}
                            <a href="mailto:photoparkk.prints@gmail.com" className="text-primary hover:underline">
                                photoparkk.prints@gmail.com
                            </a>{" "}
                            with your order number.
                        </p>
                    </div>
                </section>

                <section>
                    <h2 className="text-xl font-bold text-secondary mt-8 mb-4">2. Refund Policy</h2>
                    <div className="space-y-2">
                        <p>• Due to the customized nature of our products, we do <span className="font-bold text-error">not offer refunds</span> for change of mind, incorrect size selection, or uploaded photo issues.</p>
                        <p>• Refunds are only issued if the item is damaged during delivery or there is a manufacturing defect.</p>
                    </div>
                </section>

                <section>
                    <h2 className="text-xl font-bold text-secondary mt-8 mb-4">
                        3. Damaged or Defective Products
                    </h2>
                    <p>If your product arrives damaged or defective:</p>
                    <ul className="list-disc ml-6 mt-4 space-y-2">
                        <li>Notify us within <span className="font-bold">48 hours</span> of receiving the order.</li>
                        <li>
                            Email us at{" "}
                            <a
                                href="mailto:photoparkk.prints@gmail.com"
                                className="text-primary hover:underline"
                            >
                                photoparkk.prints@gmail.com
                            </a>{" "}
                            with clear photos of the damaged item and packaging.
                        </li>
                        <li>Once verified, we will offer a free replacement or refund depending on the issue.</li>
                    </ul>
                </section>

                <section>
                    <h2 className="text-xl font-bold text-secondary mt-8 mb-4">
                        4. Replacement Conditions
                    </h2>
                    <div className="space-y-2">
                        <p>• We will replace your frame only if the damage was caused during shipping or a clear production defect occurred.</p>
                        <p>• No replacements will be made for user-uploaded image quality issues or if damage occurs after delivery due to mishandling.</p>
                    </div>
                </section>

                <section className="pt-8 mt-8 border-t">
                    <h2 className="text-xl font-bold text-secondary mb-4">5. Contact Us</h2>
                    <p className="mb-2">If you have questions or need to initiate a return/cancellation request, reach out to us at:</p>
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
