"use client";

import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useMemo } from "react";
import { CATEGORIES, PRODUCTS, type Category } from "@/lib/products";
import ProductCard from "@/components/ProductCard";
import Reveal from "@/components/Reveal";
import { ChevronIcon } from "@/components/Icons";

const SORTS = {
  featured: "Featured",
  "price-asc": "Price: low to high",
  "price-desc": "Price: high to low",
  name: "Name: A–Z",
} as const;
type SortKey = keyof typeof SORTS;

export default function ShopView() {
  const sp = useSearchParams();
  const router = useRouter();
  const cat = (sp.get("c") as Category | null) ?? null;
  const q = (sp.get("q") ?? "").trim();
  const sort = ((sp.get("sort") as SortKey) in SORTS ? sp.get("sort") : "featured") as SortKey;

  const setParam = (k: string, v: string | null) => {
    const next = new URLSearchParams(sp.toString());
    if (v) next.set(k, v);
    else next.delete(k);
    router.replace(`/shop${next.toString() ? `?${next}` : ""}`, { scroll: false });
  };

  const list = useMemo(() => {
    let l = PRODUCTS.slice();
    if (cat) l = l.filter((p) => p.category === cat);
    if (q) {
      const s = q.toLowerCase();
      l = l.filter((p) => [p.name, p.subtitle, p.description, p.category].join(" ").toLowerCase().includes(s));
    }
    if (sort === "price-asc") l.sort((a, b) => a.price - b.price);
    if (sort === "price-desc") l.sort((a, b) => b.price - a.price);
    if (sort === "name") l.sort((a, b) => a.name.localeCompare(b.name));
    if (sort === "featured") l.sort((a, b) => Number(!!b.featured) - Number(!!a.featured));
    return l;
  }, [cat, q, sort]);

  const title = cat ? CATEGORIES.find((c) => c.id === cat)?.label : "All Jewellery";
  const blurb = cat ? CATEGORIES.find((c) => c.id === cat)?.blurb : "Handpicked kundan, polki & pearl — for every celebration.";

  return (
    <div className="container">
      <Reveal className="page-head">
        <span className="eyebrow">The Collection</span>
        <h1 className="display">{title}</h1>
        <p className="lede">{blurb}</p>
      </Reveal>

      <div className="toolbar">
        <div className="chips" role="tablist" aria-label="Categories">
          <button className={`chip ${!cat ? "is-active" : ""}`} onClick={() => setParam("c", null)}>All</button>
          {CATEGORIES.map((c) => (
            <button key={c.id} className={`chip ${cat === c.id ? "is-active" : ""}`} onClick={() => setParam("c", c.id)}>
              {c.label}
            </button>
          ))}
        </div>
        <label className="select">
          <span className="sr-only" style={{ position: "absolute", width: 1, height: 1, overflow: "hidden", clip: "rect(0 0 0 0)" }}>Sort</span>
          <select value={sort} onChange={(e) => setParam("sort", e.target.value === "featured" ? null : e.target.value)}>
            {Object.entries(SORTS).map(([k, v]) => (
              <option key={k} value={k}>{v}</option>
            ))}
          </select>
          <ChevronIcon size={16} />
        </label>
      </div>

      {q && (
        <p className="results-note">
          {list.length} result{list.length === 1 ? "" : "s"} for “{q}” ·{" "}
          <button className="link-btn" onClick={() => setParam("q", null)}>Clear search</button>
        </p>
      )}

      {list.length === 0 ? (
        <div className="empty">
          <p className="h3">Nothing here — yet.</p>
          <Link href="/shop" className="btn btn--outline">See everything</Link>
        </div>
      ) : (
        <div className="grid" style={{ paddingBottom: 120 }}>
          {list.map((p, i) => (
            <Reveal key={p.id} delay={(i % 3) * 70}>
              <ProductCard product={p} priority={i < 3} />
            </Reveal>
          ))}
        </div>
      )}
    </div>
  );
}
