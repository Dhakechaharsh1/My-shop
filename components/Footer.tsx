import Link from "next/link";
import { STORE } from "@/lib/store-config";
import { PRODUCTS } from "@/lib/products";
import { InstagramIcon, MailIcon } from "./Icons";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container footer__grid">
        <div className="footer__brand">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/brand/logo-lockup-cream.png" alt="Rooh Gehna by Khushi" width={180} height={136} />
          <p>Handpicked heritage jewellery, made to be worn with love — and passed on with stories.</p>
          <div className="footer__social">
            <a href={STORE.instagramUrl} target="_blank" rel="noopener noreferrer" aria-label="Instagram"><InstagramIcon /></a>
            <a href={`mailto:${STORE.email}`} aria-label="Email"><MailIcon /></a>
          </div>
        </div>
        <div>
          <h4>Shop</h4>
          <Link href="/shop">All jewellery</Link>
          {PRODUCTS.map((p) => (
            <Link key={p.id} href={`/product/${p.slug}`}>{p.name}</Link>
          ))}
        </div>
        <div>
          <h4>Help</h4>
          <Link href="/contact">Contact us</Link>
          <Link href="/policies/shipping">Shipping</Link>
          <Link href="/policies/returns">Returns & exchanges</Link>
          <Link href="/policies/care">Jewellery care</Link>
        </div>
        <div>
          <h4>About</h4>
          <Link href="/about">Our story</Link>
          <Link href="/policies/privacy">Privacy policy</Link>
          <Link href="/policies/terms">Terms of service</Link>
        </div>
      </div>
      <div className="container footer__base">
        <span>© {new Date().getFullYear()} Rooh Gehna by Khushi. All rights reserved.</span>
        <span className="footer__pay">Orders on Instagram · @{STORE.instagram}</span>
      </div>
    </footer>
  );
}
