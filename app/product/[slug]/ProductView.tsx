"use client";

import { useEffect, useRef, useState } from "react";
import type { Product } from "@/lib/products";
import ProductImage from "@/components/ProductImage";
import OrderButton from "@/components/OrderButton";
import { ChevronIcon, GiftIcon, ShieldIcon, TruckIcon } from "@/components/Icons";

export default function ProductView({ product }: { product: Product }) {
  const [active, setActive] = useState(0);
  const [sticky, setSticky] = useState(false);
  const buyRef = useRef<HTMLDivElement>(null);
  const mainRef = useRef<HTMLDivElement>(null);
  const n = product.images.length;

  useEffect(() => {
    const el = buyRef.current;
    if (!el) return;
    const onScroll = () => setSticky(el.getBoundingClientRect().bottom < 0);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const onSwipe = () => {
    const el = mainRef.current;
    if (!el || window.innerWidth > 860) return;
    setActive(Math.round(el.scrollLeft / el.clientWidth));
  };

  return (
    <>
      <div className="pdp">
        <div>
          <div className="gallery">
            <div className="gallery__thumbs">
              {product.images.map((_, i) => (
                <button key={i} className={i === active ? "is-active" : ""} onClick={() => setActive(i)} aria-label={`View photo ${i + 1}`}>
                  <ProductImage product={product} index={i} />
                </button>
              ))}
            </div>
            <div className="gallery__main" ref={mainRef} onScroll={onSwipe}>
              {product.images.map((_, i) => (
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
          <div className="pdp__price">DM for price</div>
          <p className="pdp__desc">{product.description}</p>

          <div className="pdp__order" ref={buyRef}>
            <OrderButton name={product.name} subtitle={product.subtitle} className="btn btn--primary btn--block btn--lg" showHint />
          </div>

          <div className="pdp__perks">
            <div><ShieldIcon /> Checked by hand</div>
            <div><GiftIcon /> Gift-ready box</div>
            <div><TruckIcon /> Ships across India</div>
          </div>

          <div className="acc">
            <details open>
              <summary>Details <ChevronIcon size={18} /></summary>
              <div className="acc__body">
                <ul>{product.details.map((d) => <li key={d}>{d}</li>)}</ul>
              </div>
            </details>
            <details>
              <summary>How to order <ChevronIcon size={18} /></summary>
              <div className="acc__body">
                Tap “Order on Instagram” and send us a DM with the name of this piece ({product.name}). We’ll reply with the price,
                payment options and delivery time, and pack your order once it’s confirmed.
              </div>
            </details>
            <details>
              <summary>Care <ChevronIcon size={18} /></summary>
              <div className="acc__body">
                Keep away from perfume, water and moisture. Wipe gently with a soft dry cloth after wearing and store in its pouch,
                separately from other pieces, so the finish and the ghungroos stay bright.
              </div>
            </details>
          </div>
        </div>
      </div>

      <div className={`sticky-buy ${sticky ? "is-on" : ""}`}>
        <div>
          <b>{product.name}</b>
          <span>DM for price</span>
        </div>
        <OrderButton name={product.name} subtitle={product.subtitle} label="Order" />
      </div>
    </>
  );
}
