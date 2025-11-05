'use client';
import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { useAuth } from './AuthContext';
import { listCartItems, addItemToCart, updateCartItem, removeCartItem } from '../services/cart.service';

import type { Product as FEProduct, CartItem as FECartItem } from '../types';

import type { CartItem as ApiCartItem, Product as ApiProduct } from '../types/api';

function mapApiProductToFE(p: ApiProduct): FEProduct {
  const priceNumber =
    typeof p.price === 'string' ? parseFloat(p.price) : (p.price as unknown as number);

  const categoryName =
    typeof p.category === 'number'
      ? String(p.category)
      : (p.category as any)?.name ?? String((p.category as any)?.id ?? '');

  return {
    id: Number(p.id),
    name: p.name,
    price: priceNumber,
    description: p.description ?? '',
    category: categoryName,

    image: '',
    images: [],
    specs: {},
    reviews: [],
    rating: 0,
    isNew: false,
    isBestSeller: false,
  };
}

function mapApiItemToFE(it: ApiCartItem): FECartItem {
  return { id: it.id, product: mapApiProductToFE(it.product), quantity: it.quantity };
}

interface CartContextType {
  cart: FECartItem[];
  addToCart: (product: FEProduct, quantity?: number) => Promise<void> | void;
  removeFromCart: (productId: number) => Promise<void> | void;
  updateQuantity: (productId: number, quantity: number) => Promise<void> | void;
  clearCart: () => Promise<void> | void;
  getCartTotal: () => number;
  getCartCount: () => number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

const LOCAL_KEY = 'ternurinhas-cart';

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { isAuthenticated } = useAuth();
  const [cart, setCart] = useState<FECartItem[]>(() => {
    const raw = localStorage.getItem(LOCAL_KEY);
    return raw ? JSON.parse(raw) : [];
  });

  const persistLocal = (items: FECartItem[]) => {
    localStorage.setItem(LOCAL_KEY, JSON.stringify(items));
  };

  const loadServerCart = async () => {
    const data = await listCartItems();
    const items = Array.isArray(data) ? data : (data as any)?.results ?? [];
    setCart(items.map(mapApiItemToFE));
  };

  const migrateLocalToServer = async () => {
    const raw = localStorage.getItem(LOCAL_KEY);
    const localItems: FECartItem[] = raw ? JSON.parse(raw) : [];
    if (!localItems.length) return;
    for (const it of localItems) {
      await addItemToCart(it.product.id, it.quantity);
    }
    localStorage.removeItem(LOCAL_KEY);
  };

  useEffect(() => {
    (async () => {
      if (isAuthenticated) {
        await migrateLocalToServer();
        await loadServerCart();
      } else {
        const raw = localStorage.getItem(LOCAL_KEY);
        setCart(raw ? JSON.parse(raw) : []);
      }
    })();
  }, [isAuthenticated]);

  const addToCart = async (product: FEProduct, quantity: number = 1) => {
    if (!isAuthenticated) {
      setCart(prev => {
        const existing = prev.find(i => i.product.id === product.id);
        const next = existing
          ? prev.map(i =>
            i.product.id === product.id ? { ...i, quantity: i.quantity + quantity } : i
          )
          : [...prev, { id: Date.now(), product, quantity }];
        persistLocal(next);
        return next;
      });
      return;
    }
    await addItemToCart(product.id, quantity);
    await loadServerCart();
  };

  const updateQuantity = async (productId: number, quantity: number) => {
    if (quantity <= 0) return removeFromCart(productId);

    if (!isAuthenticated) {
      setCart(prev => {
        const next = prev.map(i => (i.product.id === productId ? { ...i, quantity } : i));
        persistLocal(next);
        return next;
      });
      return;
    }

    const item = cart.find(i => i.product.id === productId);
    if (!item) {
      await addItemToCart(productId, quantity);
    } else {
      await updateCartItem(item.id, quantity);
    }
    await loadServerCart();
  };

  const removeFromCart = async (productId: number) => {
    if (!isAuthenticated) {
      setCart(prev => {
        const next = prev.filter(i => i.product.id !== productId);
        persistLocal(next);
        return next;
      });
      return;
    }
    const item = cart.find(i => i.product.id === productId);
    if (item) {
      await removeCartItem(item.id);
      await loadServerCart();
    }
  };

  const clearCart = async () => {
    if (!isAuthenticated) {
      setCart([]);
      localStorage.removeItem(LOCAL_KEY);
      return;
    }
    for (const it of cart) {
      await removeCartItem(it.id);
    }
    await loadServerCart();
  };

  const getCartTotal = () =>
    cart.reduce((acc, it) => acc + it.product.price * it.quantity, 0);

  const getCartCount = () => cart.reduce((acc, it) => acc + it.quantity, 0);

  const value = useMemo(
    () => ({
      cart,
      addToCart,
      removeFromCart,
      updateQuantity,
      clearCart,
      getCartTotal,
      getCartCount,
    }),
    [cart, isAuthenticated]
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};

export const useCart = () => {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error('useCart must be used within CartProvider');
  return ctx;
};
