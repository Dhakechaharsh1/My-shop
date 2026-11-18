"use client";

import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import type { Product } from "@/lib/products";
import { inr } from "@/lib/pricing";
import { STORE } from "@/lib/store-config";
import { useCart } from "@/components/CartContext";
import ProductImage, { galleryCount } from "@/components/ProductImage";
import { ChevronIcon, GiftIcon, MinusIcon, PlusIcon, ReturnIcon, TruckIcon } from "@/components/Icons";

export default function ProductView({ product }: { product: Product }) {
  const { add, showToast, items } = useCart();
  const router = useRouter();
  const [active, setActive] = useState(0);
  const [qty, setQty] = useState(1);
  const [sticky, setSticky] = useState(false);
  const buyRef = useRef<HTMLDivElement>(null);
  const mainRef = useRef<HTMLDivElement>(null);
  const n = galleryCount(product);
  const inBag = items.find((i) => i.id === product.id)?.qty ?? 0;
  const maxQty = Math.max(0, Math.min(10, product.stock) - inBag);
  const soldOut = product.stock <= 0;

  useEffect(() => {
    const el = buyRef.current;
    if (!el) return;
    const onScroll = () => setSticky(el.getBoundingClientRect().bottom < 0);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const onScroll = () => {
    const el = mainRef.current;
    if (!el || window.innerWidth > 860) return;
    setActive(Math.round(el.scrollLeft / el.clientWidth));
  };

  const addToBag = (go?: boolean) => {
    if (soldOut) return;
    if (maxQty <= 0) {
      showToast("You already have the maximum in your bag");
      return;
    }
    add(product.id, Math.min(qty, maxQty));
    if (go) router.push("/checkout");
    else showToast(`${product.name} added to your bag`);
  };

  const off = product.compareAt ? Math.round((1 - product.price / product.compareAt) * 100) : 0;

  return (
    <>
      <div className="pdp">
        <div>
          <div className="gallery">
            <div className="gallery__thumbs">
              {Array.from({ length: n }, (_, i) => (
                <button key={i} className={i === active ? "is-active" : ""} onClick={() => setActive(i)} aria-label={`View image ${i + 1}`}>
                  <ProductImage product={product} index={i} />
                </button>
              ))}
            </div>
            <div className="gallery__main" ref={mainRef} onScroll={onScroll}>
              {Array.from({ length: n }, (_, i) => (
                <div key={i} style={{ opacity: i === active ? 1 : 0 }} aria-hidden={i !== active}>
                  <ProductImage product={product} index={i} priority={i === 0} />
                </div>
              ))}
            </div>
          </div>
          <div className="gallery__dots">
            {Array.from({ length: n }, (_, i) => <i key={i} className={i === active ? "is-active" : ""} />)}
          </div>
        </div>

        <div className="pdp__info">
          <div>
            {product.badge && <span className="eyebrow" style={{ marginBottom: 12 }}>{product.badge}</span>}
            <h1 className="pdp__title">{product.name}</h1>
            <p className="pdp__sub">{product.subtitle}</p>
          </div>
          <div className="pdp__price">
            {inr(product.price)}
            {product.compareAt && <s>{inr(product.compareAt)}</s>}
            {off > 0 && <em>{off}% OFF</em>}
          </div>
          <div className="pdp__tax">Inclusive of all taxes. {product.price >= STORE.freeShippingAbove ? "Ships free." : `Free shipping above ₹${STORE.freeShippingAbove}.`}</div>
          <p className="pdp__desc">{product.description}</p>

          <div className="pdp__buy" ref={buyRef}>
            <div className="stepper">
              <button aria-label="Decrease quantity" disabled={qty <= 1} onClick={() => setQty((q) => Math.max(1, q - 1))}><MinusIcon size={16} /></button>
              <span aria-live="polite">{qty}</span>
              <button aria-label="Increase quantity" disabled={qty >= maxQty} onClick={() => setQty((q) => Math.min(maxQty, q + 1))}><PlusIcon size={16} /></button>
            </div>
            <button className="btn btn--primary" disabled={soldOut} onClick={() => addToBag()}>
              {soldOut ? "Sold out" : "Add to bag"}
            </button>
            <button className="btn btn--outline" disabled={soldOut} onClick={() => addToBag(true)}>Buy it now</button>
          </div>

          <div className={`pdp__stock ${product.stock <= 5 ? "low" : ""}`}>
            <i /> {soldOut ? "Currently sold out" : product.stock <= 5 ? `Only ${product.stock} left — order soon` : "In stock, ready to ship"}
          </div>

          <div className="pdp__perks">
            <div><TruckIcon /> Ships in 1–2 days</div>
            <div><ReturnIcon /> 7-day returns</div>
            <div><GiftIcon /> Gift wrapped</div>
          </div>

          <div className="acc">
            <details open>
              <summary>Details <ChevronIcon size={18} /></summary>
              <div className="acc__body">
                <ul>{product.details.map((d) => <li key={d}>{d}</li>)}</ul>
              </div>
            </details>
            <details>
              <summary>Care <ChevronIcon size={18} /></summary>
              <div className="acc__body">
                Keep away from perfume, water and moisture. Wipe gently with a soft dry cloth after wearing and store in the
                pouch provided, separately from other pieces, to keep the shine for years.
              </div>
            </details>
            <details>
              <summary>Shipping & returns <ChevronIcon size={18} /></summary>
              <div className="acc__body">
                Dispatched within 1–2 business days, delivered across India in 4–7 days. Free shipping on orders above
                ₹{STORE.freeShippingAbove}. Unused pieces in original packaging can be returned within 7 days of delivery.
              </div>
            </details>
          </div>
        </div>
      </div>

      <div className={`sticky-buy ${sticky && !soldOut ? "is-on" : ""}`}>
        <div>
          <b>{product.name}</b>
          <span>{inr(product.price)}</span>
        </div>
        <button className="btn btn--primary" onClick={() => addToBag()}>Add to bag</button>
      </div>
    </>
  );
}
