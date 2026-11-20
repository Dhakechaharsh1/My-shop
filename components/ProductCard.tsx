import Link from "next/link";
import { formatPrice, type Product } from "@/lib/products";
import ProductImage from "./ProductImage";
import { ArrowIcon } from "./Icons";

export default function ProductCard({ product, priority }: { product: Product; priority?: boolean }) {
  return (
    <article className="card">
      <Link href={`/product/${product.slug}`} className="card__media" aria-label={`${product.name}, ${product.subtitle}`}>
        <div className="card__img card__img--a"><ProductImage product={product} index={0} priority={priority} /></div>
        {product.images[1] && <div className="card__img card__img--b"><ProductImage product={product} index={1} /></div>}
        {product.badge && <span className="badge">{product.badge}</span>}
      </Link>
      <div className="card__body">
        <div>
          <Link href={`/product/${product.slug}`} className="card__name">{product.name}</Link>
          <p className="card__sub">{product.subtitle}</p>
          <p className="card__price">{formatPrice(product.price)}<span className="card__dm">DM to order</span></p>
        </div>
        <Link href={`/product/${product.slug}`} className="card__add" aria-label={`View ${product.name}`}>
          <ArrowIcon size={18} />
        </Link>
      </div>
    </article>
  );
}
