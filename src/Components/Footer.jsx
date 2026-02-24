import React from "react";
import {
  FaFacebookF,
  FaInstagram,
  FaLinkedinIn,
  FaWhatsapp,
} from "react-icons/fa";

import Link from "next/link";
import { CONTACT_DISPLAY_NUMBER, CONTACT_WHATSAPP_LINK } from "@/constants/contact";

const Footer = () => {
  return (
<<<<<<< HEAD
    <footer className="bg-secondary text-neutral-300 pt-12 pb-6 px-6">
=======
    <footer className="bg-slate-950 text-neutral-300 pt-12 pb-6 px-6">
>>>>>>> 28e678d3287376cb4ec8a59bd3e69fa194ddd056
      <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
        {/* Company Info */}
        <div>
          <h2 className="text-xl font-bold mb-1">PhotoParkk</h2>
          <p className="text-xs text-neutral-400 mb-3">Since 1996</p>
          <p className="text-sm">
            Frame your memories with style. High-quality custom photo frames
            delivered to your door.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-lg font-semibold mb-3">Quick Links</h3>
          <ul className="space-y-2 text-sm">
            <li>
              <Link href="/" className="hover:text-white">
                Home
              </Link>
            </li>
            <li>
              <Link href="/customizer" className="hover:text-white">
                Customize Frames
              </Link>
            </li>
            <li>
              <Link href="/contact" className="hover:text-white">
                Contact
              </Link>
            </li>
          </ul>
        </div>

        {/* Customer Service */}
        <div>
          <h3 className="text-lg font-semibold mb-3">Customer Service</h3>
          <ul className="space-y-2 text-sm">
            <li>
              <Link href="/shipping-policy" className="hover:text-white">
                Shipping & Returns
              </Link>
            </li>
            <li>
              <Link href="/refund-policy" className="hover:text-white">
                Refund & Cancellation Policy
              </Link>
            </li>
            <li>
              <Link href="/privacy-policy" className="hover:text-white">
                Privacy Policy
              </Link>
            </li>
            <li>
              <Link href="/terms-and-conditions" className="hover:text-white">
                Terms & Conditions
              </Link>
            </li>
          </ul>
        </div>

        {/* Contact Info */}
        <div>
          <h3 className="text-lg font-semibold mb-3">Get in Touch</h3>
          <p className="text-sm">Email: photoparkk.prints@gmail.com</p>
          <p className="text-sm">Phone: {CONTACT_DISPLAY_NUMBER}</p>
          <div className="flex gap-4 mt-4">
            <a
              href="https://www.instagram.com/photoparkk_?igsh=MWI3aGNmZDZ6NnFrOQ=="
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-white transition-colors"
              aria-label="Instagram"
            >
              <FaInstagram size={20} />
            </a>
            <a
              href={CONTACT_WHATSAPP_LINK}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-white transition-colors"
              aria-label="WhatsApp"
            >
              <FaWhatsapp size={20} />
            </a>
          </div>
        </div>
      </div>

      {/* Bottom Note */}
      <div className="text-center text-sm mt-10 border-t border-white/5 pt-4">
        © {new Date().getFullYear()} PhotoPark. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
