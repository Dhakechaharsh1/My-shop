/** Store-wide settings. Edit freely. */
export const STORE = {
  name: "Rooh Gehna",
  tagline: "Jewellery for the soul",
  currency: "INR",
  freeShippingAbove: 999,
  shippingFee: 79,
  /** Coupon codes: percent off the subtotal. Validated on the server. */
  coupons: {
    WELCOME10: { percent: 10, label: "10% off your first order" },
    SHAGUN15: { percent: 15, label: "15% off — wedding season", minSubtotal: 4000 },
    ROOHAGAIN: { percent: 10, label: "10% off — thank you for coming back" },
  } as Record<string, { percent: number; label: string; minSubtotal?: number }>,
  instagram: process.env.NEXT_PUBLIC_INSTAGRAM || "rooh.gehna",
  whatsapp: process.env.NEXT_PUBLIC_WHATSAPP || "",
  email: process.env.NEXT_PUBLIC_EMAIL || "hello@roohgehna.com",
  siteUrl: process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000",
};
