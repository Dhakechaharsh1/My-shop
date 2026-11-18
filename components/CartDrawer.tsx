"use client";

import Link from "next/link";
import { useEffect } from "react";
import { useCart, useQuote } from "./CartContext";
import { CloseIcon, MinusIcon, PlusIcon } from "./Icons";
import ProductImage from "./ProductImage";
import { getProductById } from "@/lib/products";
import { inr } from "@/lib/pricing";
import { STORE } from "@/lib/store-config";

export default function CartDrawer() {
  const { open, setOpen, items, setQty, remove } = useCart();
  const q = useQuote();
  const remaining = Math.max(0, STORE.freeShippingAbove - (q.subtotal - q.discount));
  const pct = Math.min(100, ((q.subtotal - q.discount) / STORE.freeShippingAbove) * 100);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [setOpen]);

  return (
    <div className={`drawer ${open ? "is-open" : ""}`} aria-hidden={!open}>
      <div className="drawer__scrim" onClick={() => setOpen(false)} />
      <aside className="drawer__panel" role="dialog" aria-label="Shopping bag" aria-modal="true">
        <div className="drawer__head">
          <h2>Your Bag</h2>
          <button className="nav__icon" onClick={() => setOpen(false)} aria-label="Close bag">
            <CloseIcon />
          </button>
        </div>

        {items.length === 0 ? (
          <div className="drawer__empty">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/brand/peacock.png" alt="" width={72} height={80} />
            <p>Your bag is waiting to be adorned.</p>
            <Link href="/shop" className="btn btn--primary" onClick={() => setOpen(false)}>
              Explore the collection
            </Link>
          </div>
        ) : (
          <>
            <div className="drawer__ship">
              {remaining > 0 ? (
                <span>You're <b>{inr(remaining)}</b> away from free shipping</span>
              ) : (
                <span>✦ You've unlocked <b>free shipping</b></span>
              )}
              <div className="meter"><i style={{ width: `${pct}%` }} /></div>
            </div>
            <ul className="drawer__list">
              {items.map((it) => {
                const p = getProductById(it.id);
                if (!p) return null;
                return (
                  <li key={it.id} className="line">
                    <Link href={`/product/${p.slug}`} className="line__img" onClick={() => setOpen(false)}>
                      <ProductImage product={p} />
                    </Link>
                    <div className="line__info">
                      <div className="line__top">
                        <div>
                          <Link href={`/product/${p.slug}`} className="line__name" onClick={() => setOpen(false)}>{p.name}</Link>
                          <div className="line__sub">{p.subtitle}</div>
                        </div>
                        <div className="line__price">{inr(p.price * it.qty)}</div>
                      </div>
                      <div className="line__bottom">
                        <div className="stepper stepper--sm">
                          <button aria-label="Decrease" onClick={() => setQty(it.id, it.qty - 1)}><MinusIcon size={14} /></button>
                          <span>{it.qty}</span>
                          <button aria-label="Increase" disabled={it.qty >= Math.min(10, p.stock)} onClick={() => setQty(it.id, it.qty + 1)}><PlusIcon size={14} /></button>
                        </div>
                        <button className="link-btn" onClick={() => remove(it.id)}>Remove</button>
                      </div>
                    </div>
                  </li>
                );
              })}
            </ul>
            <div className="drawer__foot">
              <div className="row"><span>Subtotal</span><span>{inr(q.subtotal)}</span></div>
              {q.discount > 0 && <div className="row row--save"><span>Discount ({q.coupon})</span><span>−{inr(q.discount)}</span></div>}
              <div className="row muted"><span>Shipping</span><span>{q.shipping === 0 ? "Free" : inr(q.shipping)}</span></div>
              <div className="row row--total"><span>Total</span><span>{inr(q.total)}</span></div>
              <Link href="/checkout" className="btn btn--primary btn--block" onClick={() => setOpen(false)}>
                Checkout
              </Link>
              <button className="btn btn--ghost btn--block" onClick={() => setOpen(false)}>Continue shopping</button>
            </div>
          </>
        )}
      </aside>
    </div>
  );
}
