import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { PRODUCTS, getProduct } from "@/lib/products";
import ProductCard from "@/components/ProductCard";
import Reveal from "@/components/Reveal";
import ProductView from "./ProductView";

export function generateStaticParams() {
  return PRODUCTS.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const p = getProduct(slug);
  if (!p) return {};
  return {
    title: `${p.name} — ${p.subtitle}`,
    description: p.description,
    openGraph: { title: `${p.name} — ${p.subtitle}`, description: p.description, images: [p.images[0]] },
  };
}

export default async function ProductPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const product = getProduct(slug);
  if (!product) notFound();
  const others = PRODUCTS.filter((p) => p.id !== product.id);

  return (
    <div className="container">
      <nav className="crumbs" aria-label="Breadcrumb">
        <Link href="/">Home</Link>/<Link href="/shop">Shop</Link>/
        <span style={{ color: "var(--ink)" }}>{product.name}</span>
      </nav>

      <ProductView product={product} />

      {others.length > 0 && (
        <section className="section">
          <Reveal className="section-head">
            <h2 className="h2">Also in this drop</h2>
            <Link href="/shop" className="link-arrow">Shop all</Link>
          </Reveal>
          <div className={`grid grid--two ${others.length === 1 ? "grid--single" : ""}`}>
            {others.map((p, i) => (
              <Reveal key={p.id} delay={i * 80}>
                <ProductCard product={p} />
              </Reveal>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
