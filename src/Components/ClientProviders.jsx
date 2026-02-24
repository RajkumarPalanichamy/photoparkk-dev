'use client';

import { CartProvider } from '@/context/CartContext';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function ClientProviders({ children }) {
    return (
        <CartProvider>
            {children}
            <ToastContainer position="top-right" autoClose={2000} />
        </CartProvider>
    );
}
