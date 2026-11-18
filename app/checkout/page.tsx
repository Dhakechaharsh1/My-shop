import type { Metadata } from "next";
import { razorpayConfigured } from "@/lib/razorpay";
import CheckoutView from "./CheckoutView";

export const metadata: Metadata = { title: "Checkout", robots: { index: false } };
export const dynamic = "force-dynamic";

export default function CheckoutPage() {
  return <CheckoutView live={razorpayConfigured()} />;
}
