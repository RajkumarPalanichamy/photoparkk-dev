'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { createClient } from '@supabase/supabase-js';
import { Loader2, CheckCircle2, XCircle } from 'lucide-react';

const GUEST_CART_KEY = 'guestCart';
const CHECKOUT_RETURN_URL_KEY = 'checkoutReturnUrl';

function parseHashParams(hash) {
    const params = {};
    if (!hash || !hash.startsWith('#')) return params;
    const query = hash.slice(1);
    query.split('&').forEach((pair) => {
        const [key, value] = pair.split('=').map((s) => decodeURIComponent(s));
        params[key] = value;
    });
    return params;
}

export default function AuthCallbackPage() {
    const router = useRouter();
    const [status, setStatus] = useState('loading'); // 'loading' | 'success' | 'error'
    const [message, setMessage] = useState('');

    useEffect(() => {
        const run = async () => {
            const hash = typeof window !== 'undefined' ? window.location.hash : '';
            const params = parseHashParams(hash);
            const access_token = params.access_token;
            const refresh_token = params.refresh_token;
            const errorParam = params.error;
            const errorDescription = params.error_description;

            if (errorParam) {
                setMessage(errorDescription || errorParam || 'Login failed');
                setStatus('error');
                return;
            }

            if (!access_token) {
                setMessage('Missing login data. Please use the link from your email.');
                setStatus('error');
                return;
            }

            const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
            const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
            if (!supabaseUrl || !supabaseAnonKey) {
                setMessage('Configuration error');
                setStatus('error');
                return;
            }

            const supabase = createClient(supabaseUrl, supabaseAnonKey);

            try {
                const { error: sessionError } = await supabase.auth.setSession({
                    access_token,
                    refresh_token: refresh_token || '',
                });
                if (sessionError) throw sessionError;

                const baseUrl = window.location.origin;
                const apiBase = baseUrl + '/api';

                const syncRes = await fetch(`${apiBase}/auth/sync-supabase-user`, {
                    method: 'POST',
                    headers: { Authorization: `Bearer ${access_token}` },
                });
                const syncData = await syncRes.json();

                if (!syncRes.ok) {
                    throw new Error(syncData.message || 'Could not sign you in');
                }

                localStorage.setItem('user', JSON.stringify(syncData.user));
                localStorage.setItem('accessToken', syncData.accessToken);
                localStorage.setItem('refreshToken', syncData.refreshToken);

                const guestCartRaw = localStorage.getItem(GUEST_CART_KEY);
                let guestCart = [];
                try {
                    if (guestCartRaw) guestCart = JSON.parse(guestCartRaw);
                } catch (_) {}

                let returnUrl = localStorage.getItem(CHECKOUT_RETURN_URL_KEY) || '/cart';
                localStorage.removeItem(CHECKOUT_RETURN_URL_KEY);

                if (guestCart.length > 0) {
                    const mergeRes = await fetch(`${apiBase}/cart/merge`, {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                            Authorization: `Bearer ${syncData.accessToken}`,
                        },
                        body: JSON.stringify({ guestCart }),
                    });
                    if (mergeRes.ok) {
                        localStorage.removeItem(GUEST_CART_KEY);
                        const mergeData = await mergeRes.json();
                        const merged = mergeData.merged || [];
                        if (merged.length > 0 && returnUrl.startsWith('/checkout/')) {
                            returnUrl = `/checkout/${merged[0]._id || merged[0].id}`;
                        }
                    }
                }
                setStatus('success');
                setTimeout(() => {
                    router.replace(returnUrl);
                }, 800);
            } catch (err) {
                console.error('Auth callback error:', err);
                setMessage(err.message || 'Something went wrong');
                setStatus('error');
            }
        };

        run();
    }, [router]);

    return (
        <div className="min-h-screen bg-neutral-50 flex items-center justify-center pt-[80px] px-4">
            <div className="bg-white rounded-2xl shadow-xl border border-neutral-200 p-8 max-w-md w-full text-center">
                {status === 'loading' && (
                    <>
                        <Loader2 className="w-14 h-14 animate-spin text-primary mx-auto mb-4" />
                        <h1 className="text-xl font-bold text-secondary mb-2">Signing you in...</h1>
                        <p className="text-neutral-600">Linking your cart and redirecting you.</p>
                    </>
                )}
                {status === 'success' && (
                    <>
                        <CheckCircle2 className="w-14 h-14 text-green-500 mx-auto mb-4" />
                        <h1 className="text-xl font-bold text-secondary mb-2">You’re in!</h1>
                        <p className="text-neutral-600">Redirecting you to checkout...</p>
                    </>
                )}
                {status === 'error' && (
                    <>
                        <XCircle className="w-14 h-14 text-red-500 mx-auto mb-4" />
                        <h1 className="text-xl font-bold text-secondary mb-2">Something went wrong</h1>
                        <p className="text-neutral-600 mb-6">{message}</p>
                        <button
                            type="button"
                            onClick={() => router.push('/cart')}
                            className="px-6 py-3 bg-primary text-white rounded-xl font-semibold hover:opacity-90"
                        >
                            Back to Cart
                        </button>
                    </>
                )}
            </div>
        </div>
    );
}
