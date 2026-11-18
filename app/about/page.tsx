import type { Metadata } from "next";
import Link from "next/link";
import Reveal from "@/components/Reveal";
import JewelArt from "@/components/JewelArt";

export const metadata: Metadata = { title: "Our Story", description: "The story behind Rooh Gehna by Khushi." };

export default function About() {
  return (
    <>
      <div className="container">
        <Reveal className="page-head">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/brand/logo-lockup.png" alt="Rooh Gehna by Khushi" width={260} height={196} style={{ width: 260, height: "auto", marginBottom: 12 }} />
          <h1 className="display" style={{ maxWidth: 900 }}>Adornment, for the soul.</h1>
        </Reveal>
      </div>
      <section className="section--tight" style={{ paddingTop: 0 }}>
        <div className="container story">
          <Reveal className="story__art" ><JewelArt kind="rani-haar" stone="polki" variant={2} /></Reveal>
          <Reveal className="story__body" delay={100}>
            <span className="eyebrow">Our beginning</span>
            <h2 className="h2">Every gehna has a rooh.</h2>
            <p className="lede">
              Rooh Gehna was born from a simple belief — that jewellery isn’t just worn, it’s felt. The choker your nani wore at her
              wedding. The jhumkas you borrowed for your first Diwali away from home. These pieces carry a little of us.
            </p>
            <p className="lede">
              Khushi started Rooh Gehna to bring that feeling to today: heirloom-inspired kundan, polki and pearl jewellery that is
              light, comfortable, and thoughtfully priced — so it can be part of your celebrations and your everyday.
            </p>
          </Reveal>
        </div>
      </section>
      <section className="section">
        <div className="container">
          <div className="promises">
            {[
              ["Handpicked", "Every design is personally chosen — nothing makes it to the shop unless we’d wear it ourselves."],
              ["Checked by hand", "Each piece is inspected, polished and packed by hand before it leaves us."],
              ["Made to last", "Quality gold plating and secure settings, with care instructions in every box."],
              ["Small & personal", "Questions? You’ll be talking to us directly — not a call centre."],
            ].map(([t, d], i) => (
              <Reveal key={t} className="promise" delay={i * 80}><b>{t}</b><span>{d}</span></Reveal>
            ))}
          </div>
          <div style={{ display: "flex", justifyContent: "center", marginTop: 56 }}>
            <Link href="/shop" className="btn btn--primary">Shop the collection</Link>
          </div>
        </div>
      </section>
    </>
  );
}
