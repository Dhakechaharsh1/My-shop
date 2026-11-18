import type { MetadataRoute } from "next";
import { PRODUCTS } from "@/lib/products";
import { POLICIES } from "@/lib/policies";
import { STORE } from "@/lib/store-config";

export default function sitemap(): MetadataRoute.Sitemap {
  const u = (p: string) => `${STORE.siteUrl}${p}`;
  return [
    ...["/", "/shop", "/about", "/contact"].map((p) => ({ url: u(p) })),
    ...PRODUCTS.map((p) => ({ url: u(`/product/${p.slug}`) })),
    ...Object.keys(POLICIES).map((s) => ({ url: u(`/policies/${s}`) })),
  ];
}
