"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { CheckIcon } from "@/components/Icons";
import { inr, type Quote } from "@/lib/pricing";

type Last = { orderId: string; receipt: string; paymentId?: string; quote: Quote; customer: { name: string; email: string; city: string }; demo: boolean };

export default function SuccessPage() {
  const [o, setO] = useState<Last | null>(null);
  const [loaded, setLoaded] = useState(false);
  useEffect(() => {
    try {
      const s = sessionStorage.getItem("rg-last-order");
      if (s) setO(JSON.parse(s));
    } catch {}
    setLoaded(true);
  }, []);

  if (!loaded) return <div style={{ minHeight: "60vh" }} />;

  return (
    <div className="container">
      <div className="success">
        <div className="success__check"><CheckIcon size={36} /></div>
        <span className="eyebrow">Order confirmed</span>
        <h1 className="h2">Thank you{o?.customer?.name ? `, ${o.customer.name.split(" ")[0]}` : ""}.</h1>
        <p className="lede">
          Your Rooh Gehna is being lovingly packed. {o?.customer?.email && !o.demo ? <>Your payment receipt has been emailed to <b>{o.customer.email}</b>.</> : null} We’ll
          share tracking details on WhatsApp/email once it ships.
        </p>
        {o && (
          <div className="receipt">
            <div className="row"><span className="muted">Order</span><b>{o.receipt}</b></div>
            {o.paymentId && <div className="row"><span className="muted">Payment ID</span><span>{o.paymentId}</span></div>}
            {o.demo && <div className="row"><span className="muted">Mode</span><span>Demo (no money charged)</span></div>}
            <hr style={{ border: 0, borderTop: "1px solid var(--line)", width: "100%" }} />
            {o.quote.lines.map((l) => (
              <div className="row" key={l.id}><span>{l.qty} × {l.name}</span><span>{inr(l.total)}</span></div>
            ))}
            {o.quote.discount > 0 && <div className="row row--save"><span>Discount</span><span>−{inr(o.quote.discount)}</span></div>}
            <div className="row"><span>Shipping</span><span>{o.quote.shipping ? inr(o.quote.shipping) : "Free"}</span></div>
            <div className="row row--total" style={{ paddingBottom: 0 }}><span>Paid</span><span>{inr(o.quote.total)}</span></div>
          </div>
        )}
        <div style={{ display: "flex", gap: 12, flexWrap: "wrap", justifyContent: "center" }}>
          <Link href="/shop" className="btn btn--primary">Continue shopping</Link>
          <Link href="/contact" className="btn btn--outline">Need help?</Link>
        </div>
      </div>
    </div>
  );
}
