import { NextResponse } from "next/server";
import { quote, type LineInput } from "@/lib/pricing";
import { razorpay, razorpayConfigured } from "@/lib/razorpay";
import { validateCustomer, type Customer } from "@/lib/validate";
import { getProductById } from "@/lib/products";

export const runtime = "nodejs";

const clip = (s: unknown, n = 250) => String(s ?? "").trim().slice(0, n);

export async function POST(req: Request) {
  let body: { items?: LineInput[]; coupon?: string; customer?: Partial<Customer> };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }

  const items = Array.isArray(body.items) ? body.items.slice(0, 30) : [];
  for (const it of items) {
    const p = getProductById(it.id);
    if (p && it.qty > p.stock) {
      return NextResponse.json({ error: `Only ${p.stock} of ${p.name} left in stock.` }, { status: 409 });
    }
  }
  const q = quote(items, body.coupon);
  if (q.lines.length === 0) return NextResponse.json({ error: "Your bag is empty." }, { status: 400 });

  const customer = body.customer ?? {};
  const errors = validateCustomer(customer);
  if (Object.keys(errors).length) return NextResponse.json({ error: "Please check your details.", fields: errors }, { status: 422 });

  const receipt = `RG-${Date.now().toString(36).toUpperCase()}`;
  const itemSummary = q.lines.map((l) => `${l.qty}× ${l.name} (${l.id})`).join(", ");
  const address = [customer.address1, customer.address2, customer.city, customer.state, customer.pincode].filter(Boolean).join(", ");

  // Razorpay allows up to 15 notes of 256 chars each. These appear in your dashboard & /admin.
  const notes: Record<string, string> = {
    name: clip(customer.name),
    email: clip(customer.email),
    phone: clip(customer.phone),
    address: clip(address),
    items: clip(itemSummary),
    items_2: clip(itemSummary.slice(250), 250),
    coupon: q.coupon ?? "",
    customer_notes: clip(customer.notes),
    breakdown: `subtotal ${q.subtotal} | discount ${q.discount} | shipping ${q.shipping} | total ${q.total}`,
  };
  for (const k of Object.keys(notes)) if (!notes[k]) delete notes[k];

  if (!razorpayConfigured()) {
    return NextResponse.json({ mode: "demo", orderId: `demo_${receipt}`, receipt, amount: q.total * 100, quote: q });
  }

  try {
    const order = await razorpay().orders.create({ amount: q.total * 100, currency: "INR", receipt, notes });
    return NextResponse.json({
      mode: "razorpay",
      keyId: process.env.RAZORPAY_KEY_ID,
      orderId: order.id,
      receipt,
      amount: order.amount,
      quote: q,
    });
  } catch (err) {
    console.error("Razorpay order error", err);
    return NextResponse.json({ error: "We couldn't start the payment. Please try again." }, { status: 502 });
  }
}
