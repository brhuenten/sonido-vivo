import { useCallback, useEffect, useMemo, useState } from 'react';
import { CartContext } from './cart-context.js';
const CART_STORAGE_KEY = 'sonido-vivo-cart';

function lineTotal(item) {
  return item.price * item.quantity;
}

function loadCartFromStorage() {
  try {
    const raw = localStorage.getItem(CART_STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];
    return parsed.filter(
      (item) =>
        item &&
        item.id != null &&
        typeof item.quantity === 'number' &&
        item.quantity > 0 &&
        typeof item.price === 'number',
    );
  } catch {
    return [];
  }
}

export function CartProvider({ children }) {
  const [items, setItems] = useState(loadCartFromStorage);

  useEffect(() => {
    localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(items));
  }, [items]);

  const addToCart = useCallback((product, quantity = 1) => {
    if (!product?.id) return;

    setItems((prev) => {
      const existing = prev.find((item) => item.id === product.id);
      const nextQty = (existing?.quantity ?? 0) + quantity;
      const cappedQty = Math.min(nextQty, product.stock);

      if (cappedQty <= 0) return prev;

      if (existing) {
        return prev.map((item) =>
          item.id === product.id ? { ...item, quantity: cappedQty } : item,
        );
      }

      return [
        ...prev,
        {
          id: product.id,
          code: product.code,
          title: product.title,
          price: product.price,
          stock: product.stock,
          quantity: Math.min(quantity, product.stock),
        },
      ];
    });
  }, []);

  const removeFromCart = useCallback((productId) => {
    setItems((prev) => prev.filter((item) => item.id !== productId));
  }, []);

  const updateQuantity = useCallback((productId, quantity) => {
    setItems((prev) =>
      prev
        .map((item) => {
          if (item.id !== productId) return item;
          const next = Math.max(0, Math.min(quantity, item.stock));
          return next === 0 ? null : { ...item, quantity: next };
        })
        .filter(Boolean),
    );
  }, []);

  const clearCart = useCallback(() => setItems([]), []);

  const itemCount = useMemo(
    () => items.reduce((acc, item) => acc + item.quantity, 0),
    [items],
  );

  const total = useMemo(() => items.reduce((acc, item) => acc + lineTotal(item), 0), [items]);

  const value = useMemo(
    () => ({
      items,
      itemCount,
      total,
      addToCart,
      removeFromCart,
      updateQuantity,
      clearCart,
    }),
    [items, itemCount, total, addToCart, removeFromCart, updateQuantity, clearCart],
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}
