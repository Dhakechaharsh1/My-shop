"use client";

import Link from "next/link";
import type { Product } from "@/lib/products";
import { inr } from "@/lib/pricing";
import ProductImage from "./ProductImage";
import { useCart } from "./CartContext";
import { PlusIcon } from "./Icons";

export default function ProductCard({ product, priority }: { product: Product; priority?: boolean }) {
  const { add, showToast } = useCart();
  const soldOut = product.stock <= 0;
  return (
    <article className="card">
      <Link href={`/product/${product.slug}`} className="card__media" aria-label={`${product.name}, ${product.subtitle}`}>
        <div className="card__img card__img--a"><ProductImage product={product} index={0} priority={priority} /></div>
        <div className="card__img card__img--b"><ProductImage product={product} index={product.images.length > 1 ? 1 : 2} /></div>
        {product.badge && <span className="badge">{product.badge}</span>}
        {soldOut && <span className="badge badge--muted">Sold out</span>}
      </Link>
      <div className="card__body">
        <div>
          <Link href={`/product/${product.slug}`} className="card__name">{product.name}</Link>
          <p className="card__sub">{product.subtitle}</p>
          <p className="card__price">
            {inr(product.price)}
            {product.compareAt && <s>{inr(product.compareAt)}</s>}
          </p>
        </div>
        <button
          className="card__add"
          aria-label={`Add ${product.name} to bag`}
          disabled={soldOut}
          onClick={() => {
            add(product.id);
            showToast(`${product.name} added to your bag`);
          }}
        >
          <PlusIcon size={18} />
        </button>
      </div>
    </article>
  );
}
