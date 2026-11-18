"use client";

import { useState } from "react";
import { inr } from "@/lib/pricing";

type Order = { id: string; receipt?: string; status: string; amount: number; created_at: number; notes: Record<string, string> };

export default function AdminPage() {
  const [pw, setPw] = useState("");
  const [orders, setOrders] = useState<Order[] | null>(null);
  const [err, setErr] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  const load = async (e?: React.FormEvent) => {
    e?.preventDefault();
    setBusy(true);
    setErr(null);
    const res = await fetch("/api/admin/orders", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ password: pw }) });
    const data = await res.json();
    setBusy(false);
    if (!res.ok) return setErr(data.error);
    setOrders(data.orders);
  };

  const paid = orders?.filter((o) => o.status === "paid") ?? [];

  return (
    <div className="container admin">
      <span className="eyebrow">Store admin</span>
      <h1 className="h2" style={{ margin: "8px 0 20px" }}>Orders</h1>

      {!orders ? (
        <form onSubmit={load} style={{ display: "flex", gap: 10, maxWidth: 440 }}>
          <label className="field" style={{ flex: 1 }}>
            <input type="password" value={pw} onChange={(e) => setPw(e.target.value)} placeholder=" " autoComplete="current-password" />
            <span>Admin password</span>
          </label>
          <button className="btn btn--primary" style={{ height: 56 }} disabled={busy || !pw}>{busy ? "…" : "Open"}</button>
        </form>
      ) : (
        <>
          <div className="stats">
            <div className="stat"><small>Paid orders (latest 100)</small><b>{paid.length}</b></div>
            <div className="stat"><small>Revenue</small><b>{inr(paid.reduce((s, o) => s + o.amount, 0))}</b></div>
            <div className="stat"><small>Unfinished checkouts</small><b>{orders.length - paid.length}</b></div>
          </div>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
            <p className="muted" style={{ margin: 0, fontSize: 14 }}>Live from Razorpay. Refunds & settlements are managed in your Razorpay dashboard.</p>
            <button className="btn btn--outline" style={{ height: 40 }} onClick={() => load()}>Refresh</button>
          </div>
          <div className="table-wrap">
            <table>
              <thead>
                <tr><th>Date</th><th>Order</th><th>Customer</th><th>Ship to</th><th>Items</th><th>Amount</th><th>Status</th></tr>
              </thead>
              <tbody>
                {orders.map((o) => (
                  <tr key={o.id}>
                    <td>{new Date(o.created_at * 1000).toLocaleString("en-IN", { dateStyle: "medium", timeStyle: "short" })}</td>
                    <td><b>{o.receipt}</b><br /><small className="muted">{o.id}</small></td>
                    <td>{o.notes?.name}<br /><small className="muted">{o.notes?.phone}<br />{o.notes?.email}</small></td>
                    <td style={{ minWidth: 200 }}>{o.notes?.address}{o.notes?.customer_notes && <><br /><small className="muted">Note: {o.notes.customer_notes}</small></>}</td>
                    <td style={{ minWidth: 200 }}>{o.notes?.items}{o.notes?.items_2}{o.notes?.coupon && <><br /><small className="muted">Code: {o.notes.coupon}</small></>}</td>
                    <td>{inr(o.amount)}</td>
                    <td><span className={`pill ${o.status === "paid" ? "" : "pill--warn"}`}>{o.status === "paid" ? "Paid" : "Not paid"}</span></td>
                  </tr>
                ))}
                {orders.length === 0 && <tr><td colSpan={7} className="muted">No orders yet.</td></tr>}
              </tbody>
            </table>
          </div>
        </>
      )}
      {err && <div className="alert" style={{ marginTop: 16, maxWidth: 560 }}>{err}</div>}
    </div>
  );
}
