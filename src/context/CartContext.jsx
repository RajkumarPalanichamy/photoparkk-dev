import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import axiosInstance from '../utils/axiosInstance';

const GUEST_CART_KEY = 'guestCart';
const MAX_URL_LENGTH = 2048;

function isOversizedOrDataUrl(value) {
  if (value == null || typeof value !== 'string') return true;
  if (value.startsWith('data:')) return true;
  return value.length > MAX_URL_LENGTH;
}

function sanitizeGuestItem(item) {
  const copy = { ...item };
  if (isOversizedOrDataUrl(copy.image)) copy.image = null;
  if (isOversizedOrDataUrl(copy.uploadedImageUrl)) copy.uploadedImageUrl = null;
  return copy;
}

const CartContext = createContext();

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};

function getGuestCart() {
  if (typeof window === 'undefined') return [];
  try {
    const raw = localStorage.getItem(GUEST_CART_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

function setGuestCart(items) {
  if (typeof window === 'undefined') return;
  try {
    const json = JSON.stringify(items);
    localStorage.setItem(GUEST_CART_KEY, json);
  } catch (e) {
    if (e?.name === 'QuotaExceededError' || e?.code === 22) {
      throw new Error('QUOTA_EXCEEDED');
    }
    throw e;
  }
}

function getCurrentUser() {
  if (typeof window === 'undefined') return null;
  try {
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user) : null;
  } catch {
    return null;
  }
}

export const CartProvider = ({ children }) => {
  const [cartCount, setCartCount] = useState(0);
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchCartData = useCallback(async () => {
    const user = getCurrentUser();
    if (!user) {
      const guest = getGuestCart();
      const items = Array.isArray(guest) ? guest : [];
      setCartItems(items);
      setCartCount(items.length);
      return;
    }

    try {
      const parsedUser = user;
      if (!parsedUser._id && !parsedUser.id) {
        const guest = getGuestCart();
        setCartItems(Array.isArray(guest) ? guest : []);
        setCartCount((Array.isArray(guest) ? guest : []).length);
        return;
      }
      const userId = parsedUser.id || parsedUser._id;
      const { data } = await axiosInstance.get(`cart/user/${userId}`);
      const items = data || [];
      setCartItems(items);
      setCartCount(items.length);
    } catch (error) {
      if (error.response?.status === 401) {
        localStorage.removeItem('user');
        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');
        const guest = getGuestCart();
        setCartItems(Array.isArray(guest) ? guest : []);
        setCartCount((Array.isArray(guest) ? guest : []).length);
      } else {
        console.error('Error fetching cart data:', error);
        setCartItems([]);
        setCartCount(0);
      }
    }
  }, []);

  const addToCart = async (cartData) => {
    setLoading(true);
    try {
      const user = getCurrentUser();
      if (!user) {
        const guest = getGuestCart();
        const newItem = sanitizeGuestItem({
          _id: `guest-${Date.now()}-${Math.random().toString(36).slice(2, 9)}`,
          id: null,
          productId: cartData.productId,
          productType: cartData.productType || 'Canvascustomizedata',
          title: cartData.title || 'Custom Product',
          quantity: cartData.quantity || 1,
          size: cartData.size ?? null,
          thickness: cartData.thickness ?? null,
          price: cartData.price ?? 0,
          totalAmount: cartData.totalAmount ?? (cartData.price || 0) * (cartData.quantity || 1),
          image: cartData.image ?? null,
          uploadedImageUrl: cartData.uploadedImageUrl ?? null,
        });
        let next = [...guest.map(sanitizeGuestItem), newItem];
        try {
          setGuestCart(next);
        } catch (err) {
          if (err?.message === 'QUOTA_EXCEEDED') {
            const stripAllUrls = (list) => list.map((i) => ({ ...i, image: null, uploadedImageUrl: null }));
            next = stripAllUrls(next);
            try {
              setGuestCart(next);
            } catch {
              return { success: false, error: 'QUOTA_EXCEEDED' };
            }
          } else {
            throw err;
          }
        }
        setCartItems(next);
        setCartCount(next.length);
        return { success: true };
      }
      const payload = {
        userId: user.id || user._id,
        productId: cartData.productId,
        productType: cartData.productType,
        title: cartData.title,
        quantity: cartData.quantity,
        size: cartData.size,
        thickness: cartData.thickness,
        price: cartData.price,
        totalAmount: cartData.totalAmount,
        image: cartData.image,
        uploadedImageUrl: cartData.uploadedImageUrl,
      };
      await axiosInstance.post('cart', payload);
      await fetchCartData();
      return { success: true };
    } catch (error) {
      console.error('Error adding to cart:', error);
      return { success: false, error: error.message };
    } finally {
      setLoading(false);
    }
  };

  const removeFromCart = async (itemId) => {
    const user = getCurrentUser();
    if (!user) {
      const guest = getGuestCart().filter((item) => (item._id || item.id) !== itemId);
      setGuestCart(guest);
      setCartItems(guest);
      setCartCount(guest.length);
      return { success: true };
    }
    try {
      await axiosInstance.delete(`cart/${itemId}`);
      await fetchCartData();
      return { success: true };
    } catch (error) {
      console.error('Error removing from cart:', error);
      return { success: false, error: error.message };
    }
  };

  const updateQuantity = async (itemId, newQuantity) => {
    const user = getCurrentUser();
    if (!user) {
      const guest = getGuestCart().map((item) => {
        if ((item._id || item.id) !== itemId) return item;
        const qty = Math.max(1, parseInt(newQuantity, 10) || 1);
        const price = item.price || 0;
        return { ...item, quantity: qty, totalAmount: price * qty };
      });
      setGuestCart(guest);
      setCartItems(guest);
      setCartCount(guest.length);
      return { success: true };
    }
    try {
      await axiosInstance.put(`cart/${itemId}`, { quantity: newQuantity });
      await fetchCartData();
      return { success: true };
    } catch (error) {
      console.error('Error updating quantity:', error);
      return { success: false, error: error.message };
    }
  };

  const clearCart = async () => {
    const user = getCurrentUser();
    if (!user) {
      setGuestCart([]);
      setCartItems([]);
      setCartCount(0);
      return { success: true };
    }
    try {
      const allItems = Array.isArray(cartItems) ? cartItems : [];
      await Promise.all(
        allItems.map((item) => axiosInstance.delete(`cart/${item._id || item.id}`))
      );
      setCartItems([]);
      setCartCount(0);
      return { success: true };
    } catch (error) {
      console.error('Error clearing cart:', error);
      return { success: false, error: error.message };
    }
  };

  useEffect(() => {
    fetchCartData();
  }, []);

  useEffect(() => {
    const handleStorageChange = () => {
      fetchCartData();
    };
    if (typeof window !== 'undefined') {
      window.addEventListener('storage', handleStorageChange);
      return () => window.removeEventListener('storage', handleStorageChange);
    }
  }, [fetchCartData]);

  const value = {
    cartCount,
    cartItems,
    loading,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    fetchCartData,
    isGuest: !getCurrentUser(),
  };

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  );
};
