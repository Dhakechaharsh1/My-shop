import { NextResponse } from "next/server";
import { razorpay, razorpayConfigured, verifySignature } from "@/lib/razorpay";

export const runtime = "nodejs";

export async function POST(req: Request) {
  const body = await req.json().catch(() => ({}));
  const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = body ?? {};

  if (!razorpayConfigured()) {
    // Demo mode — no real money moves.
    return NextResponse.json({ ok: String(razorpay_order_id ?? "").startsWith("demo_"), demo: true });
  }
  if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature) {
    return NextResponse.json({ ok: false, error: "Missing payment details" }, { status: 400 });
  }
  if (!verifySignature(razorpay_order_id, razorpay_payment_id, razorpay_signature)) {
    return NextResponse.json({ ok: false, error: "Payment could not be verified" }, { status: 400 });
  }
  try {
    const payment = await razorpay().payments.fetch(razorpay_payment_id);
    return NextResponse.json({ ok: true, method: payment.method, status: payment.status });
  } catch {
    return NextResponse.json({ ok: true });
  }
}
