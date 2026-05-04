"use client";

import { createContext, useContext, useEffect, useMemo, useReducer } from "react";

const STORAGE_KEY = "shopable.cart.v1";

function isValidItem(value) {
  if (!value || typeof value !== "object") return false;
  return (
    typeof value.key === "string" &&
    typeof value.id === "string" &&
    typeof value.slug === "string" &&
    typeof value.name === "string" &&
    typeof value.image === "string" &&
    typeof value.price === "number" &&
    Number.isFinite(value.price) &&
    typeof value.qty === "number" &&
    Number.isFinite(value.qty)
  );
}

function safeReadItems() {
  if (typeof window === "undefined") return [];
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];
    return parsed.filter(isValidItem).map((item) => ({
      ...item,
      qty: Math.max(1, Math.floor(item.qty)),
    }));
  } catch {
    return [];
  }
}

function safeWriteItems(items) {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
  } catch {
    // ignore write errors
  }
}

function makeKey(id, variantId) {
  return variantId ? `${id}::${variantId}` : id;
}

function cartReducer(state, action) {
  switch (action.type) {
    case "hydrate": {
      return { items: action.items };
    }
    case "add": {
      const { product, qty, variant } = action;
      const nextQty = Math.max(1, Math.floor(qty));
      const key = makeKey(product.id, variant?.id);

      const existingIndex = state.items.findIndex((item) => item.key === key);
      if (existingIndex >= 0) {
        const nextItems = state.items.slice();
        const existing = nextItems[existingIndex];
        nextItems[existingIndex] = {
          ...existing,
          qty: existing.qty + nextQty,
        };
        return { items: nextItems };
      }

      return {
        items: [
          ...state.items,
          {
            key,
            id: product.id,
            slug: product.slug,
            name: product.name,
            image: product.image,
            price: product.price,
            qty: nextQty,
            variant: variant ? { id: variant.id, name: variant.name } : null,
          },
        ],
      };
    }
    case "setQty": {
      const { key, qty } = action;
      const nextQty = Math.max(1, Math.floor(qty));
      return {
        items: state.items.map((item) =>
          item.key === key ? { ...item, qty: nextQty } : item,
        ),
      };
    }
    case "remove": {
      return { items: state.items.filter((item) => item.key !== action.key) };
    }
    case "clear": {
      return { items: [] };
    }
    default:
      return state;
  }
}

const CartContext = createContext(null);

export default function CartProvider({ children }) {
  const [state, dispatch] = useReducer(cartReducer, { items: [] });

  useEffect(() => {
    dispatch({ type: "hydrate", items: safeReadItems() });
  }, []);

  useEffect(() => {
    safeWriteItems(state.items);
  }, [state.items]);

  const value = useMemo(() => {
    const itemCount = state.items.reduce((accumulator, item) => accumulator + item.qty, 0);
    const subtotal = state.items.reduce(
      (accumulator, item) => accumulator + item.price * item.qty,
      0,
    );

    return {
      items: state.items,
      itemCount,
      subtotal,
      addItem: (product, options = {}) =>
        dispatch({
          type: "add",
          product,
          qty: options.qty ?? 1,
          variant: options.variant ?? null,
        }),
      setQty: (key, qty) => dispatch({ type: "setQty", key, qty }),
      removeItem: (key) => dispatch({ type: "remove", key }),
      clear: () => dispatch({ type: "clear" }),
    };
  }, [state.items]);

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const value = useContext(CartContext);
  if (!value) {
    throw new Error("useCart must be used within <CartProvider />");
  }
  return value;
}
