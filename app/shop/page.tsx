import type { Metadata } from "next";
import { COLLECTION, PRODUCTS } from "@/lib/products";
import { STORE } from "@/lib/store-config";
import ProductCard from "@/components/ProductCard";
import Reveal from "@/components/Reveal";
import { InstagramIcon } from "@/components/Icons";

export const metadata: Metadata = {
  title: "Shop",
  description: "The Mor Ghungroo earrings by Rooh Gehna — order with a DM on Instagram.",
};

export default function ShopPage() {
  return (
    <div className="container">
      <Reveal className="page-head">
        <span className="eyebrow">The Collection</span>
        <h1 className="display">{COLLECTION.name}</h1>
        <p className="lede">{COLLECTION.blurb}</p>
      </Reveal>
      <div className="grid grid--two">
        {PRODUCTS.map((p, i) => (
          <Reveal key={p.id} delay={i * 80}>
            <ProductCard product={p} priority />
          </Reveal>
        ))}
      </div>
      <Reveal className="soon">
        <p className="h3">More pieces are on their way.</p>
        <p className="muted">Follow @{STORE.instagram} to see the next drop first.</p>
        <a href={STORE.instagramUrl} target="_blank" rel="noopener noreferrer" className="btn btn--outline">
          <InstagramIcon size={18} /> Follow on Instagram
        </a>
      </Reveal>
    </div>
  );
}
