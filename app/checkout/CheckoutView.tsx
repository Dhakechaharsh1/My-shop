"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useCart, useQuote } from "@/components/CartContext";
import ProductImage from "@/components/ProductImage";
import { ChevronIcon, ShieldIcon } from "@/components/Icons";
import { getProductById } from "@/lib/products";
import { inr } from "@/lib/pricing";
import { INDIAN_STATES, validateCustomer, type Customer } from "@/lib/validate";

declare global {
  interface Window {
    Razorpay?: new (opts: Record<string, unknown>) => { open: () => void; on: (e: string, cb: (r: { error?: { description?: string } }) => void) => void };
  }
}

const EMPTY: Customer = { name: "", email: "", phone: "", address1: "", address2: "", city: "", state: "", pincode: "", notes: "" };
const SAVED = "rg-customer-v1";

function loadScript(src: string) {
  return new Promise<boolean>((resolve) => {
    if (document.querySelector(`script[src="${src}"]`)) return resolve(true);
    const s = document.createElement("script");
    s.src = src;
    s.onload = () => resolve(true);
    s.onerror = () => resolve(false);
    document.body.appendChild(s);
  });
}

export default function CheckoutView({ live }: { live: boolean }) {
  const { items, ready, coupon, setCoupon, clear } = useCart();
  const q = useQuote();
  const router = useRouter();
  const [c, setC] = useState<Customer>(EMPTY);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [touched, setTouched] = useState(false);
  const [code, setCode] = useState("");
  const [busy, setBusy] = useState(false);
  const [msg, setMsg] = useState<string | null>(null);

  useEffect(() => {
    try {
      const s = localStorage.getItem(SAVED);
      if (s) setC({ ...EMPTY, ...JSON.parse(s), notes: "" });
    } catch {}
  }, []);

  useEffect(() => {
    if (touched) setErrors(validateCustomer(c));
  }, [c, touched]);

  useEffect(() => {
    if (live) loadScript("https://checkout.razorpay.com/v1/checkout.js");
  }, [live]);

  const set = (k: keyof Customer) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) =>
    setC((prev) => ({ ...prev, [k]: e.target.value }));

  const finish = (orderId: string, receipt: string, paymentId?: string) => {
    try {
      sessionStorage.setItem(
        "rg-last-order",
        JSON.stringify({ orderId, receipt, paymentId, quote: q, customer: { name: c.name, email: c.email, city: c.city }, demo: !live }),
      );
    } catch {}
    clear();
    router.push(`/order/success?ref=${encodeURIComponent(receipt)}`);
  };

  const pay = async (e: React.FormEvent) => {
    e.preventDefault();
    setTouched(true);
    setMsg(null);
    const errs = validateCustomer(c);
    setErrors(errs);
    if (Object.keys(errs).length) {
      document.querySelector(".has-error input, .has-error select")?.scrollIntoView({ behavior: "smooth", block: "center" });
      return;
    }
    setBusy(true);
    try {
      const { notes: _n, ...toSave } = c;
      localStorage.setItem(SAVED, JSON.stringify(toSave));
    } catch {}

    try {
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ items, coupon, customer: c }),
      });
      const data = await res.json();
      if (!res.ok) {
        if (data.fields) setErrors(data.fields);
        throw new Error(data.error || "Something went wrong");
      }

      if (data.mode === "demo") {
        await fetch("/api/verify", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ razorpay_order_id: data.orderId }) });
        finish(data.orderId, data.receipt);
        return;
      }

      const ok = await loadScript("https://checkout.razorpay.com/v1/checkout.js");
      if (!ok || !window.Razorpay) throw new Error("Couldn't load the payment window. Check your connection and try again.");

      const rzp = new window.Razorpay({
        key: data.keyId,
        order_id: data.orderId,
        amount: data.amount,
        currency: "INR",
        name: "Rooh Gehna",
        description: `Order ${data.receipt}`,
        image: `${window.location.origin}/icon.png`,
        prefill: { name: c.name, email: c.email, contact: c.phone },
        notes: { receipt: data.receipt },
        theme: { color: "#7E1F23" },
        modal: { ondismiss: () => setBusy(false), confirm_close: true },
        handler: async (r: { razorpay_order_id: string; razorpay_payment_id: string; razorpay_signature: string }) => {
          const v = await fetch("/api/verify", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(r) });
          const vd = await v.json();
          if (vd.ok) finish(r.razorpay_order_id, data.receipt, r.razorpay_payment_id);
          else {
            setBusy(false);
            setMsg("We couldn't verify your payment. If money was deducted, please contact us with your payment ID: " + r.razorpay_payment_id);
          }
        },
      });
      rzp.on("payment.failed", (r) => {
        setBusy(false);
        setMsg(r.error?.description ? `Payment failed: ${r.error.description}` : "Payment failed. Please try again.");
      });
      rzp.open();
    } catch (err) {
      setBusy(false);
      setMsg(err instanceof Error ? err.message : "Something went wrong");
    }
  };

  if (ready && items.length === 0) {
    return (
      <div className="container">
        <div className="empty" style={{ paddingTop: 120, paddingBottom: 160 }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/brand/peacock.png" alt="" width={72} height={80} />
          <p className="h3">Your bag is empty</p>
          <Link href="/shop" className="btn btn--primary">Explore the collection</Link>
        </div>
      </div>
    );
  }

  const F = ({ k, label, type = "text", full, auto, mode }: { k: keyof Customer; label: string; type?: string; full?: boolean; auto?: string; mode?: "numeric" | "email" | "tel" }) => (
    <div className={full ? "full" : ""}>
      <label className={`field ${errors[k] ? "has-error" : ""}`}>
        <input type={type} value={c[k] ?? ""} onChange={set(k)} placeholder=" " autoComplete={auto} inputMode={mode} aria-invalid={!!errors[k]} />
        <span>{label}</span>
      </label>
      {errors[k] && <p className="field__err">{errors[k]}</p>}
    </div>
  );

  return (
    <div className="container">
      <form className="checkout" onSubmit={pay} noValidate>
        <div>
          <h1 className="h2">Checkout</h1>
          <p className="muted" style={{ margin: 0 }}>Almost yours. We just need a few details.</p>
          {!live && (
            <div className="alert alert--info" style={{ marginTop: 20 }}>
              <b>Demo mode:</b> payments are simulated because Razorpay keys aren’t set yet. Add them in <code>.env</code> to go live.
            </div>
          )}

          <div className="checkout__step">
            <h2><i>1</i> Contact</h2>
            <div className="form-grid">
              {F({ k: "name", label: "Full name", full: true, auto: "name" })}
              {F({ k: "email", label: "Email", type: "email", auto: "email", mode: "email" })}
              {F({ k: "phone", label: "Mobile number", type: "tel", auto: "tel", mode: "tel" })}
            </div>
          </div>

          <div className="checkout__step">
            <h2><i>2</i> Delivery address</h2>
            <div className="form-grid">
              {F({ k: "address1", label: "House no., building, street", full: true, auto: "address-line1" })}
              {F({ k: "address2", label: "Area, landmark (optional)", full: true, auto: "address-line2" })}
              {F({ k: "city", label: "City", auto: "address-level2" })}
              {F({ k: "pincode", label: "PIN code", auto: "postal-code", mode: "numeric" })}
              <div className="full">
                <label className={`field ${errors.state ? "has-error" : ""}`}>
                  <select value={c.state} onChange={set("state")} autoComplete="address-level1">
                    <option value="" disabled>Select…</option>
                    {INDIAN_STATES.map((s) => <option key={s}>{s}</option>)}
                  </select>
                  <span>State</span>
                  <ChevronIcon size={16} className="field__chev" />
                </label>
                {errors.state && <p className="field__err">{errors.state}</p>}
              </div>
              <div className="full">
                <label className="field">
                  <textarea value={c.notes} onChange={set("notes")} placeholder=" " maxLength={240} />
                  <span>Order notes — bangle size, gift message… (optional)</span>
                </label>
              </div>
            </div>
          </div>

          <div className="checkout__step">
            <h2><i>3</i> Payment</h2>
            <p className="muted" style={{ margin: 0, fontSize: 14.5 }}>
              Pay securely with UPI, cards, netbanking or wallets. You’ll confirm the payment in a secure Razorpay window.
            </p>
            {msg && <div className="alert">{msg}</div>}
            <button className={`btn btn--primary btn--block ${busy ? "is-loading" : ""}`} type="submit" style={{ height: 56, fontSize: 16, marginTop: 8 }}>
              {busy ? <span className="spinner" /> : `Pay ${inr(q.total)}`}
            </button>
            <p className="pay-note"><ShieldIcon size={14} /> 256-bit encrypted · Powered by Razorpay</p>
          </div>
        </div>

        <aside className="summary" aria-label="Order summary">
          <h2>Order summary</h2>
          {q.lines.map((l) => {
            const p = getProductById(l.id)!;
            return (
              <div key={l.id} className="summary__item">
                <div className="summary__thumb">
                  <div><ProductImage product={p} /></div>
                  <em>{l.qty}</em>
                </div>
                <div>
                  <b>{l.name}</b>
                  <small>{l.subtitle}</small>
                </div>
                <span>{inr(l.total)}</span>
              </div>
            );
          })}
          <hr />
          {q.coupon ? (
            <div className="coupon-ok">
              <span>✦ <b>{q.coupon}</b> — {q.couponLabel}</span>
              <button type="button" className="link-btn" onClick={() => setCoupon("")}>Remove</button>
            </div>
          ) : (
            <>
              <div className="coupon">
                <label className="field">
                  <input value={code} onChange={(e) => setCode(e.target.value)} placeholder=" " onKeyDown={(e) => { if (e.key === "Enter") { e.preventDefault(); setCoupon(code); } }} />
                  <span>Discount code</span>
                </label>
                <button type="button" className="btn btn--outline" onClick={() => setCoupon(code)} disabled={!code.trim()}>Apply</button>
              </div>
              {coupon && q.couponError && <p className="field__err" style={{ marginTop: -6 }}>{q.couponError}</p>}
            </>
          )}
          <hr />
          <div className="row"><span>Subtotal</span><span>{inr(q.subtotal)}</span></div>
          {q.discount > 0 && <div className="row row--save"><span>Discount</span><span>−{inr(q.discount)}</span></div>}
          <div className="row"><span>Shipping</span><span>{q.shipping === 0 ? "Free" : inr(q.shipping)}</span></div>
          <hr />
          <div className="row row--total"><span>Total</span><span>{inr(q.total)}</span></div>
          <p className="muted" style={{ margin: 0, fontSize: 12.5 }}>Inclusive of all taxes</p>
        </aside>
      </form>
    </div>
  );
}
