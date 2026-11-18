import type { Metadata, Viewport } from "next";
import "@fontsource/cormorant-garamond/400.css";
import "@fontsource/cormorant-garamond/500.css";
import "@fontsource/cormorant-garamond/600.css";
import "@fontsource/cormorant-garamond/400-italic.css";
import "@fontsource-variable/inter";
import "./globals.css";
import { CartProvider } from "@/components/CartContext";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import CartDrawer from "@/components/CartDrawer";
import Toast from "@/components/Toast";
import { STORE } from "@/lib/store-config";

export const metadata: Metadata = {
  metadataBase: new URL(STORE.siteUrl),
  title: { default: "Rooh Gehna by Khushi — Heritage Jewellery", template: "%s · Rooh Gehna" },
  description:
    "Rooh Gehna by Khushi — kundan, polki and pearl jewellery handpicked for weddings, festivals and everyday grace. Free shipping above ₹999.",
  openGraph: {
    title: "Rooh Gehna by Khushi",
    description: "Heritage jewellery for the soul.",
    images: ["/brand/hero.jpg"],
    type: "website",
  },
  icons: { icon: "/icon.png", apple: "/apple-icon.png" },
};

export const viewport: Viewport = { themeColor: "#F6EFE6" };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en-IN">
      <body>
        <CartProvider>
          <Header />
          <main>{children}</main>
          <Footer />
          <CartDrawer />
          <Toast />
        </CartProvider>
      </body>
    </html>
  );
}
