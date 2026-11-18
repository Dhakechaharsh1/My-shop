"use client";

import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import { getProductById } from "@/lib/products";
import { quote } from "@/lib/pricing";

export type CartItem = { id: string; qty: number };

type CartCtx = {
  items: CartItem[];
  count: number;
  ready: boolean;
  open: boolean;
  setOpen: (v: boolean) => void;
  add: (id: string, qty?: number) => void;
  setQty: (id: string, qty: number) => void;
  remove: (id: string) => void;
  clear: () => void;
  coupon: string;
  setCoupon: (c: string) => void;
  toast: string | null;
  showToast: (m: string) => void;
};

const Ctx = createContext<CartCtx | null>(null);
const KEY = "rg-cart-v1";
const MAX = 10;

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [coupon, setCoupon] = useState("");
  const [ready, setReady] = useState(false);
  const [open, setOpen] = useState(false);
  const [toast, setToast] = useState<string | null>(null);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(KEY);
      if (raw) {
        const parsed = JSON.parse(raw);
        const valid = (parsed.items ?? []).filter((i: CartItem) => getProductById(i.id));
        setItems(valid);
        setCoupon(parsed.coupon ?? "");
      }
    } catch {}
    setReady(true);
  }, []);

  useEffect(() => {
    if (!ready) return;
    try {
      localStorage.setItem(KEY, JSON.stringify({ items, coupon }));
    } catch {}
  }, [items, coupon, ready]);

  useEffect(() => {
    document.documentElement.style.overflow = open ? "hidden" : "";
  }, [open]);

  const showToast = useCallback((m: string) => {
    setToast(m);
    window.setTimeout(() => setToast((t) => (t === m ? null : t)), 2600);
  }, []);

  const add = useCallback((id: string, qty = 1) => {
    const p = getProductById(id);
    if (!p) return;
    setItems((prev) => {
      const ex = prev.find((i) => i.id === id);
      const limit = Math.min(MAX, p.stock);
      if (ex) return prev.map((i) => (i.id === id ? { ...i, qty: Math.min(limit, i.qty + qty) } : i));
      return [...prev, { id, qty: Math.min(limit, qty) }];
    });
  }, []);

  const setQty = useCallback((id: string, qty: number) => {
    const p = getProductById(id);
    const limit = Math.min(MAX, p?.stock ?? MAX);
    setItems((prev) =>
      qty <= 0 ? prev.filter((i) => i.id !== id) : prev.map((i) => (i.id === id ? { ...i, qty: Math.min(limit, qty) } : i)),
    );
  }, []);

  const remove = useCallback((id: string) => setItems((prev) => prev.filter((i) => i.id !== id)), []);
  const clear = useCallback(() => {
    setItems([]);
    setCoupon("");
  }, []);

  const value = useMemo(
    () => ({
      items,
      count: items.reduce((s, i) => s + i.qty, 0),
      ready,
      open,
      setOpen,
      add,
      setQty,
      remove,
      clear,
      coupon,
      setCoupon,
      toast,
      showToast,
    }),
    [items, ready, open, add, setQty, remove, clear, coupon, toast, showToast],
  );

  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

export function useCart() {
  const c = useContext(Ctx);
  if (!c) throw new Error("useCart must be used within CartProvider");
  return c;
}

export function useQuote() {
  const { items, coupon } = useCart();
  return useMemo(() => quote(items, coupon), [items, coupon]);
}
