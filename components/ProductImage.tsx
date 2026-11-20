import type { Product } from "@/lib/products";

export default function ProductImage({
  product,
  index = 0,
  priority,
}: {
  product: Product;
  index?: number;
  priority?: boolean;
}) {
  const src = product.images[index] ?? product.images[0];
  const views = ["", " — close-up of the peacock detail", " — detail"];
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={src}
      alt={`${product.name}, ${product.subtitle}${views[index] ?? ""}`}
      loading={priority ? "eager" : "lazy"}
      decoding="async"
      style={{ objectFit: "cover", width: "100%", height: "100%", display: "block" }}
    />
  );
}
