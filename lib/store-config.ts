/** Store-wide settings. Edit freely. */
export const STORE = {
  name: "Rooh Gehna",
  tagline: "Jewellery for the soul",
  /** Every "Order on Instagram" button opens this link. */
  instagramUrl: process.env.NEXT_PUBLIC_INSTAGRAM_URL || "https://www.instagram.com/rooh.gehna?dmpr=MTJyb2JlcGw2bGpxdQ==",
  instagram: "rooh.gehna",
  email: process.env.NEXT_PUBLIC_EMAIL || "hello@roohgehna.com",
  siteUrl: process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000",
};

/** The message we copy for the customer to paste into their Instagram DM. */
export function orderMessage(name?: string, subtitle?: string, price?: string) {
  return name
    ? `Hi Rooh Gehna! I'd like to order ${name} (${subtitle}${price ? ", " + price : ""}). Could you share the delivery details?`
    : "Hi Rooh Gehna! I'd like to order from your collection. Could you share the delivery details?";
}
