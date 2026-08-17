"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { Product } from "./products";

export type CartItem = {
  productId: string;
  slug: string;
  name: string;
  price: number;
  finishId: string;
  finishName: string;
  qty: number;
};

type CartState = {
  items: CartItem[];
  isOpen: boolean;
  add: (p: Product, finishId: string) => void;
  remove: (productId: string, finishId: string) => void;
  setQty: (productId: string, finishId: string, qty: number) => void;
  clear: () => void;
  open: () => void;
  close: () => void;
  toggle: () => void;
};

export const useCart = create<CartState>()(
  persist(
    (set) => ({
      items: [],
      isOpen: false,
      add: (p, finishId) =>
        set((s) => {
          const finish = p.finishes.find((f) => f.id === finishId) ?? p.finishes[0];
          const existing = s.items.find(
            (i) => i.productId === p.id && i.finishId === finish.id
          );
          const items = existing
            ? s.items.map((i) =>
                i === existing ? { ...i, qty: i.qty + 1 } : i
              )
            : [
                ...s.items,
                {
                  productId: p.id,
                  slug: p.slug,
                  name: p.name,
                  price: p.price,
                  finishId: finish.id,
                  finishName: finish.name,
                  qty: 1,
                },
              ];
          return { items, isOpen: true };
        }),
      remove: (productId, finishId) =>
        set((s) => ({
          items: s.items.filter(
            (i) => !(i.productId === productId && i.finishId === finishId)
          ),
        })),
      setQty: (productId, finishId, qty) =>
        set((s) => ({
          items:
            qty <= 0
              ? s.items.filter(
                  (i) => !(i.productId === productId && i.finishId === finishId)
                )
              : s.items.map((i) =>
                  i.productId === productId && i.finishId === finishId
                    ? { ...i, qty }
                    : i
                ),
        })),
      clear: () => set({ items: [] }),
      open: () => set({ isOpen: true }),
      close: () => set({ isOpen: false }),
      toggle: () => set((s) => ({ isOpen: !s.isOpen })),
    }),
    { name: "auric-cart", partialize: (s) => ({ items: s.items, isOpen: false }) }
  )
);

export function cartCount(items: CartItem[]) {
  return items.reduce((n, i) => n + i.qty, 0);
}

export function cartTotal(items: CartItem[]) {
  return items.reduce((n, i) => n + i.price * i.qty, 0);
}

type WishlistState = {
  ids: string[];
  toggle: (id: string) => void;
  has: (id: string) => boolean;
};

export const useWishlist = create<WishlistState>()(
  persist(
    (set, get) => ({
      ids: [],
      toggle: (id) =>
        set((s) => ({
          ids: s.ids.includes(id)
            ? s.ids.filter((x) => x !== id)
            : [...s.ids, id],
        })),
      has: (id) => get().ids.includes(id),
    }),
    { name: "auric-wishlist" }
  )
);
