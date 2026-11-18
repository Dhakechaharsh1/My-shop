import type { Metadata } from "next";
import { STORE } from "@/lib/store-config";
import Reveal from "@/components/Reveal";
import { InstagramIcon, MailIcon, WhatsAppIcon } from "@/components/Icons";

export const metadata: Metadata = { title: "Contact", description: "Get in touch with Rooh Gehna by Khushi." };

export default function Contact() {
  const cards = [
    STORE.whatsapp && { href: `https://wa.me/${STORE.whatsapp}`, icon: <WhatsAppIcon size={26} />, t: "WhatsApp", d: `+${STORE.whatsapp}`, ext: true },
    { href: `https://instagram.com/${STORE.instagram}`, icon: <InstagramIcon size={26} />, t: "Instagram", d: `@${STORE.instagram} — DM us anytime`, ext: true },
    { href: `mailto:${STORE.email}`, icon: <MailIcon size={26} />, t: "Email", d: STORE.email, ext: false },
  ].filter(Boolean) as { href: string; icon: React.ReactNode; t: string; d: string; ext: boolean }[];

  return (
    <div className="container">
      <Reveal className="page-head">
        <span className="eyebrow">We’re here for you</span>
        <h1 className="display">Say hello.</h1>
        <p className="lede">Styling advice, order help, or a custom request — we usually reply within a few hours (10am–8pm IST).</p>
      </Reveal>
      <div className="contact-grid" style={{ gridTemplateColumns: cards.length === 2 ? "repeat(2, 1fr)" : undefined }}>
        {cards.map((c, i) => (
          <Reveal key={c.t} delay={i * 80}>
            <a className="contact-card" href={c.href} target={c.ext ? "_blank" : undefined} rel="noreferrer">
              {c.icon}
              <b>{c.t}</b>
              <span>{c.d}</span>
            </a>
          </Reveal>
        ))}
      </div>
      <div className="prose" style={{ textAlign: "center" }}>
        <p>For order queries, please keep your order number (it starts with <b>RG-</b>) handy.</p>
      </div>
    </div>
  );
}
