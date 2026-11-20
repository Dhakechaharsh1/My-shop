import Link from "next/link";
import { COLLECTION, PRODUCTS } from "@/lib/products";
import { STORE } from "@/lib/store-config";
import ProductCard from "@/components/ProductCard";
import Reveal from "@/components/Reveal";
import OrderButton from "@/components/OrderButton";
import { ArrowIcon, InstagramIcon, SparkIcon } from "@/components/Icons";

export default function Home() {
  const feature = PRODUCTS[0];

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

      <section className="section" style={{ paddingTop: 0 }}>
        <div className="container">
          <Reveal className="section-head section-head--center">
            <span className="eyebrow">The first drop</span>
            <h2 className="h2">{COLLECTION.name} earrings</h2>
            <p className="lede">{COLLECTION.blurb}</p>
          </Reveal>
          <div className="grid grid--two">
            {PRODUCTS.map((p, i) => (
              <Reveal key={p.id} delay={i * 90}>
                <ProductCard product={p} priority />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="section--tight" style={{ paddingTop: 0 }}>
        <div className="container">
          <Reveal className="feature">
            <div className="feature__media">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={feature.images[1]} alt={`${feature.name} — close-up of the twin peacock detail`} loading="lazy" />
            </div>
            <div className="feature__body">
              <span className="eyebrow">In the details</span>
              <h2 className="h2">Twin peacocks. <br />A cascade of ghungroos.</h2>
              <p className="lede">
                A carved silver-tone centrepiece sits between two peacocks — the mor that gave Rooh Gehna its emblem. Below it,
                layers of fine chain end in tiny bells that chime as you move.
              </p>
              <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
                <Link href={`/product/${feature.slug}`} className="btn btn--cream">See {feature.name}</Link>
                <OrderButton className="btn btn--on-dark" />
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <Reveal className="section-head section-head--center">
            <span className="eyebrow">How to order</span>
            <h2 className="h2">Three steps, one DM.</h2>
          </Reveal>
          <div className="steps">
            {[
              ["Choose your pair", "Browse the collection and pick the colour you love."],
              ["Send us a DM", "Tap “Order on Instagram” and message @rooh.gehna with the piece’s name. We’ll reply with the price and delivery details."],
              ["We pack it with love", "Your piece arrives in our gift-ready box, wrapped by hand."],
            ].map(([t, d], i) => (
              <Reveal key={t} className="step" delay={i * 80}>
                <span className="step__n">{i + 1}</span>
                <b>{t}</b>
                <span>{d}</span>
              </Reveal>
            ))}
          </div>
          <div style={{ display: "flex", justifyContent: "center", marginTop: 40 }}>
            <OrderButton />
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
          <a href={STORE.instagramUrl} target="_blank" rel="noopener noreferrer" className="btn btn--primary">
            <InstagramIcon size={18} /> Follow @{STORE.instagram}
          </a>
        </Reveal>
      </section>
    </>
  );
}
