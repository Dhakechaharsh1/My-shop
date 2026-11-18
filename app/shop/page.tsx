import type { Metadata } from "next";
import { Suspense } from "react";
import ShopView from "./ShopView";

export const metadata: Metadata = {
  title: "Shop all jewellery",
  description: "Kundan chokers, pearl jhumkas, maang tikkas, kadas and more from Rooh Gehna by Khushi.",
};

export default function ShopPage() {
  return (
    <Suspense>
      <ShopView />
    </Suspense>
  );
}
