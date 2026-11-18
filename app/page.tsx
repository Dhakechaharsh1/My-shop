import Link from "next/link";
import { CATEGORIES, PRODUCTS } from "@/lib/products";
import { inr } from "@/lib/pricing";
import { STORE } from "@/lib/store-config";
import ProductCard from "@/components/ProductCard";
import ProductImage from "@/components/ProductImage";
import JewelArt from "@/components/JewelArt";
import Reveal from "@/components/Reveal";
import { ArrowIcon, GiftIcon, InstagramIcon, ReturnIcon, ShieldIcon, SparkIcon, TruckIcon } from "@/components/Icons";

const CAT_ART = {
  necklaces: { kind: "choker", stone: "kundan" },
  earrings: { kind: "jhumka", stone: "pearl" },
  headpieces: { kind: "tikka", stone: "ruby" },
  hands: { kind: "bangles", stone: "kundan" },
  anklets: { kind: "anklet", stone: "pearl" },
} as const;

export default function Home() {
  const featured = PRODUCTS.filter((p) => p.featured).slice(0, 6);
  const hero = PRODUCTS.find((p) => p.art.kind === "rani-haar") ?? PRODUCTS[0];

  return (
    <>
      <section className="hero" aria-label="Rooh Gehna by Khushi">
        <div className="hero__bg" aria-hidden />
        <div className="hero__frame">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img className="hero__img" src="/brand/hero.jpg" alt="Rooh Gehna by Khushi — peacock emblem on a soft ivory wall with pearls and kundan jewellery" />
          <div className="hero__cta">
            <p>Heritage jewellery, for the soul.</p>
            <div className="hero__btns">
              <Link href="/shop" className="btn btn--primary">Shop the collection</Link>
              <Link href="/about" className="btn btn--light">Our story</Link>
            </div>
          </div>
        </div>
      </section>

      <section className="section">
        <Reveal className="container intro">
          <span className="eyebrow"><SparkIcon size={10} /> Rooh · Gehna <SparkIcon size={10} /></span>
          <h1 className="display">
            Jewellery that holds <em>a little of your soul.</em>
          </h1>
          <p className="lede">
            “Rooh” is the soul, “Gehna” its adornment. Every piece is chosen by Khushi for the moments that stay with you —
            a first shagun, a sister’s sangeet, an ordinary Tuesday made beautiful.
          </p>
        </Reveal>
      </section>

      <section className="section--tight" style={{ paddingTop: 0 }}>
        <div className="container">
          <Reveal className="section-head">
            <h2 className="h2">Shop by category</h2>
            <Link href="/shop" className="link-arrow">View all <ArrowIcon size={16} /></Link>
          </Reveal>
          <Reveal className="cats" delay={80}>
            {CATEGORIES.map((c) => (
              <Link key={c.id} href={`/shop?c=${c.id}`} className="cat">
                <JewelArt kind={CAT_ART[c.id].kind} stone={CAT_ART[c.id].stone} title={c.label} />
                <div className="cat__label">
                  <b>{c.label}</b>
                  <span>{c.blurb}</span>
                </div>
              </Link>
            ))}
          </Reveal>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <Reveal className="section-head section-head--center">
            <span className="eyebrow">The Bestsellers</span>
            <h2 className="h2">Loved, and worn, most.</h2>
          </Reveal>
          <div className="grid">
            {featured.map((p, i) => (
              <Reveal key={p.id} delay={(i % 3) * 90}>
                <ProductCard product={p} priority={i < 3} />
              </Reveal>
            ))}
          </div>
          <div style={{ display: "flex", justifyContent: "center", marginTop: 48 }}>
            <Link href="/shop" className="btn btn--outline">Shop all {PRODUCTS.length} pieces <ArrowIcon size={16} /></Link>
          </div>
        </div>
      </section>

      <section className="section--tight" style={{ paddingTop: 0 }}>
        <div className="container">
          <Reveal className="feature">
            <div className="feature__media">
              <ProductImage product={hero} index={2} />
            </div>
            <div className="feature__body">
              <span className="eyebrow">The Bridal Edit</span>
              <h2 className="h2">{hero.name}. <br />Made for your shagun.</h2>
              <p className="lede">{hero.description}</p>
              <div className="feature__price">{inr(hero.price)} · Arrives in a keepsake box</div>
              <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
                <Link href={`/product/${hero.slug}`} className="btn btn--cream">Discover {hero.name}</Link>
                <Link href="/shop?c=necklaces" className="btn" style={{ color: "#f6ede0" }}>All necklaces <ArrowIcon size={16} /></Link>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="promises">
            {[
              { i: <TruckIcon size={26} />, t: "Free shipping", d: `On every order above ₹${STORE.freeShippingAbove}. Pan-India delivery in 4–7 days.` },
              { i: <ReturnIcon size={26} />, t: "7-day returns", d: "Not in love? Return unused pieces within 7 days of delivery." },
              { i: <ShieldIcon size={26} />, t: "Secure payments", d: "UPI, cards, netbanking & wallets via Razorpay." },
              { i: <GiftIcon size={26} />, t: "Gift-ready", d: "Every piece arrives wrapped and ready to be given." },
            ].map((x, i) => (
              <Reveal key={x.t} className="promise" delay={i * 80}>
                {x.i}
                <b>{x.t}</b>
                <span>{x.d}</span>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="section section--sand">
        <div className="container story">
          <Reveal className="story__art story__art--card">
            <div className="story__frame">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/brand/logo-lockup.png" alt="Rooh Gehna by Khushi" />
              <p>Handpicked with love</p>
            </div>
          </Reveal>
          <Reveal className="story__body" delay={120}>
            <span className="eyebrow">by Khushi</span>
            <h2 className="h2">A peacock, a promise, and a love for old-world craft.</h2>
            <p className="lede">
              The peacock — mor — has always meant grace and celebration in our homes. Rooh Gehna began with that feeling:
              jewellery that looks like an heirloom, feels light enough to live in, and is priced so you can wear it often.
            </p>
            <p className="lede">Every piece is checked, polished and packed by hand before it reaches you.</p>
            <span className="signature">— Khushi</span>
            <div><Link href="/about" className="link-arrow">Read our story <ArrowIcon size={16} /></Link></div>
          </Reveal>
        </div>
      </section>

      <section className="section">
        <Reveal className="container band">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/brand/peacock.png" alt="" width={64} height={71} />
          <h2 className="h2">Join the family on Instagram</h2>
          <p className="lede">New drops, styling reels and behind-the-scenes — @{STORE.instagram}</p>
          <a href={`https://instagram.com/${STORE.instagram}`} target="_blank" rel="noreferrer" className="btn btn--primary">
            <InstagramIcon size={18} /> Follow @{STORE.instagram}
          </a>
        </Reveal>
      </section>
    </>
  );
}
