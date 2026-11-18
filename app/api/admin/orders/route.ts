import crypto from "crypto";
import { NextResponse } from "next/server";
import { razorpay, razorpayConfigured } from "@/lib/razorpay";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

function passwordOk(given: string) {
  const real = process.env.ADMIN_PASSWORD;
  if (!real || real === "change-me") return false;
  const a = crypto.createHash("sha256").update(given).digest();
  const b = crypto.createHash("sha256").update(real).digest();
  return crypto.timingSafeEqual(a, b);
}

export async function POST(req: Request) {
  const { password, skip = 0 } = await req.json().catch(() => ({}));
  if (!process.env.ADMIN_PASSWORD || process.env.ADMIN_PASSWORD === "change-me") {
    return NextResponse.json({ error: "Set ADMIN_PASSWORD in your environment to enable the admin page." }, { status: 503 });
  }
  if (!passwordOk(String(password ?? ""))) {
    await new Promise((r) => setTimeout(r, 600));
    return NextResponse.json({ error: "Incorrect password" }, { status: 401 });
  }
  if (!razorpayConfigured()) {
    return NextResponse.json({ error: "Razorpay keys are not set — the store is in demo mode, so there are no real orders yet." }, { status: 503 });
  }
  try {
    const res = await razorpay().orders.all({ count: 100, skip: Number(skip) || 0 });
    const orders = res.items
      .filter((o) => o.status === "paid" || o.status === "attempted")
      .map((o) => ({
        id: o.id,
        receipt: o.receipt,
        status: o.status,
        amount: Number(o.amount) / 100,
        created_at: o.created_at,
        notes: o.notes,
      }));
    return NextResponse.json({ orders });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Could not load orders from Razorpay." }, { status: 502 });
  }
}
