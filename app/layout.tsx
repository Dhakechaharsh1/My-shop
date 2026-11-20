import type { Metadata, Viewport } from "next";
import "@fontsource/cormorant-garamond/400.css";
import "@fontsource/cormorant-garamond/500.css";
import "@fontsource/cormorant-garamond/600.css";
import "@fontsource/cormorant-garamond/400-italic.css";
import "@fontsource-variable/inter";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { STORE } from "@/lib/store-config";

export const metadata: Metadata = {
  metadataBase: new URL(STORE.siteUrl),
  title: { default: "Rooh Gehna by Khushi — Heritage Jewellery", template: "%s · Rooh Gehna" },
  description:
    "Rooh Gehna by Khushi — heritage-inspired jewellery, handpicked with love. Meet the Mor Ghungroo earrings and order with a DM on Instagram.",
  openGraph: {
    title: "Rooh Gehna by Khushi",
    description: "Heritage jewellery for the soul. Order on Instagram @rooh.gehna.",
    images: ["/products/gulnaar-1.jpg"],
    type: "website",
  },
  icons: { icon: "/icon.png", apple: "/apple-icon.png" },
};

export const viewport: Viewport = { themeColor: "#F6EFE6" };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en-IN">
      <body>
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
