import JewelArt from "./JewelArt";
import type { Product } from "@/lib/products";

export default function ProductImage({
  product,
  index = 0,
  className,
  priority,
}: {
  product: Product;
  index?: number;
  className?: string;
  priority?: boolean;
}) {
  const src = product.images[index];
  if (src) {
    return (
      // eslint-disable-next-line @next/next/no-img-element
      <img
        src={src}
        alt={`${product.name} — ${product.subtitle}`}
        className={className}
        loading={priority ? "eager" : "lazy"}
        style={{ objectFit: "cover", width: "100%", height: "100%" }}
      />
    );
  }
  return (
    <JewelArt
      kind={product.art.kind}
      stone={product.art.stone}
      variant={(index % 3) as 0 | 1 | 2}
      className={className}
      title={`${product.name} — ${product.subtitle}`}
    />
  );
}

/** Number of gallery views for a product (photos, or 3 illustrated views). */
export function galleryCount(product: Product) {
  return product.images.length || 3;
}
