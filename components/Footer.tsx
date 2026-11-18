import Link from "next/link";
import { STORE } from "@/lib/store-config";
import { CATEGORIES } from "@/lib/products";
import { InstagramIcon, MailIcon, WhatsAppIcon } from "./Icons";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container footer__grid">
        <div className="footer__brand">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/brand/logo-lockup-cream.png" alt="Rooh Gehna by Khushi" width={180} height={136} />
          <p>Handpicked heritage jewellery, made to be worn with love — and passed on with stories.</p>
          <div className="footer__social">
            <a href={`https://instagram.com/${STORE.instagram}`} target="_blank" rel="noreferrer" aria-label="Instagram"><InstagramIcon /></a>
            {STORE.whatsapp && (
              <a href={`https://wa.me/${STORE.whatsapp}`} target="_blank" rel="noreferrer" aria-label="WhatsApp"><WhatsAppIcon /></a>
            )}
            <a href={`mailto:${STORE.email}`} aria-label="Email"><MailIcon /></a>
          </div>
        </div>
        <div>
          <h4>Shop</h4>
          <Link href="/shop">All jewellery</Link>
          {CATEGORIES.map((c) => (
            <Link key={c.id} href={`/shop?c=${c.id}`}>{c.label}</Link>
          ))}
        </div>
        <div>
          <h4>Help</h4>
          <Link href="/contact">Contact us</Link>
          <Link href="/policies/shipping">Shipping</Link>
          <Link href="/policies/returns">Returns & refunds</Link>
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
        <span className="footer__pay">Secure payments · UPI · Cards · Netbanking · Wallets</span>
      </div>
    </footer>
  );
}
