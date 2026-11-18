import { getProductById } from "./products";
import { STORE } from "./store-config";

export interface LineInput {
  id: string;
  qty: number;
}

export interface PricedLine {
  id: string;
  name: string;
  subtitle: string;
  price: number;
  qty: number;
  total: number;
}

export interface Quote {
  lines: PricedLine[];
  subtotal: number;
  discount: number;
  coupon?: string;
  couponLabel?: string;
  couponError?: string;
  shipping: number;
  total: number;
}

/** Single source of truth for prices — used by both the UI and the payment API. */
export function quote(items: LineInput[], couponCode?: string): Quote {
  const lines: PricedLine[] = [];
  for (const it of items) {
    const p = getProductById(it.id);
    const qty = Math.max(0, Math.min(10, Math.floor(Number(it.qty) || 0)));
    if (!p || qty === 0) continue;
    lines.push({ id: p.id, name: p.name, subtitle: p.subtitle, price: p.price, qty, total: p.price * qty });
  }
  const subtotal = lines.reduce((s, l) => s + l.total, 0);

  let discount = 0;
  let coupon: string | undefined;
  let couponLabel: string | undefined;
  let couponError: string | undefined;
  const code = couponCode?.trim().toUpperCase();
  if (code) {
    const c = STORE.coupons[code];
    if (!c) couponError = "This code isn't valid.";
    else if (c.minSubtotal && subtotal < c.minSubtotal)
      couponError = `Add ₹${(c.minSubtotal - subtotal).toLocaleString("en-IN")} more to use ${code}.`;
    else {
      discount = Math.round((subtotal * c.percent) / 100);
      coupon = code;
      couponLabel = c.label;
    }
  }

  const afterDiscount = subtotal - discount;
  const shipping = subtotal === 0 || afterDiscount >= STORE.freeShippingAbove ? 0 : STORE.shippingFee;
  return { lines, subtotal, discount, coupon, couponLabel, couponError, shipping, total: afterDiscount + shipping };
}

export function inr(n: number) {
  return "₹" + n.toLocaleString("en-IN");
}
