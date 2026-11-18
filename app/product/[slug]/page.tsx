import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { PRODUCTS, categoryLabel, getProduct } from "@/lib/products";
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
    openGraph: { title: `${p.name} — ${p.subtitle}`, description: p.description, images: p.images[0] ? [p.images[0]] : ["/brand/hero.jpg"] },
  };
}

export default async function ProductPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const product = getProduct(slug);
  if (!product) notFound();

  const related = [
    ...PRODUCTS.filter((p) => p.id !== product.id && p.category === product.category),
    ...PRODUCTS.filter((p) => p.id !== product.id && p.category !== product.category),
  ].slice(0, 3);

  return (
    <div className="container">
      <nav className="crumbs" aria-label="Breadcrumb">
        <Link href="/">Home</Link>/<Link href="/shop">Shop</Link>/
        <Link href={`/shop?c=${product.category}`}>{categoryLabel(product.category)}</Link>/
        <span style={{ color: "var(--ink)" }}>{product.name}</span>
      </nav>

      <ProductView product={product} />

      <section className="section">
        <Reveal className="section-head">
          <h2 className="h2">You may also love</h2>
          <Link href="/shop" className="link-arrow">Shop all</Link>
        </Reveal>
        <div className="grid">
          {related.map((p, i) => (
            <Reveal key={p.id} delay={i * 80}>
              <ProductCard product={p} />
            </Reveal>
          ))}
        </div>
      </section>
    </div>
  );
}
