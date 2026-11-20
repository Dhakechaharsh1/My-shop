/**
 * ─────────────────────────────────────────────────────────────
 *  ROOH GEHNA — PRODUCT CATALOG
 *  Edit this file to change names, descriptions and photos.
 *
 *  Photos live in /public/products/. List them in `images`;
 *  the first one is the main photo, the second shows on hover.
 *  `price` is in Indian Rupees. Orders happen in Instagram DMs.
 * ─────────────────────────────────────────────────────────────
 */

export interface Product {
  id: string;
  slug: string;
  name: string;
  subtitle: string;
  /** Short line used in the copied DM message and image alt text. */
  colour: string;
  price: number;
  description: string;
  details: string[];
  badge?: string;
  images: string[];
}

export const COLLECTION = {
  name: "Mor Ghungroo",
  blurb: "One heirloom design in two colours: twin peacocks, a carved centrepiece and a cascade of ghungroos.",
};

export const PRODUCTS: Product[] = [
  {
    id: "RG001",
    slug: "gulnaar-mor-ghungroo-earrings-ruby",
    name: "Gulnaar",
    subtitle: "Mor Ghungroo Earrings · Ruby",
    colour: "Ruby pink",
    price: 999,
    description:
      "Twin peacocks frame a carved silver-tone centrepiece, set between ruby-pink stones ringed in tiny pearls. Below, layers of fine chain end in clusters of ghungroos that chime softly every time you turn your head. Made for mehendi nights, festive lunches and every outfit that deserves a little music.",
    details: [
      "Antique gold-tone finish",
      "Carved silver-tone centre stone with kundan accents",
      "Ruby-pink stones framed in seed pearls",
      "Twin peacock (mor) motif",
      "Layered chain tassels with ghungroo bells",
      "Push-back stud closure",
    ],
    badge: "First drop",
    images: ["/products/gulnaar-1.jpg", "/products/gulnaar-2.jpg"],
  },
  {
    id: "RG002",
    slug: "basanti-mor-ghungroo-earrings-yellow",
    name: "Basanti",
    subtitle: "Mor Ghungroo Earrings · Yellow",
    colour: "Haldi yellow",
    price: 999,
    description:
      "The same heirloom design in sunshine yellow. Twin peacocks, a carved silver-tone centrepiece and haldi-yellow stones ringed in tiny pearls, finished with cascading chains of ghungroos. Bright enough for a haldi ceremony, easy enough for a festive day out.",
    details: [
      "Antique gold-tone finish",
      "Carved silver-tone centre stone with kundan accents",
      "Haldi-yellow stones framed in seed pearls",
      "Twin peacock (mor) motif",
      "Layered chain tassels with ghungroo bells",
      "Push-back stud closure",
    ],
    badge: "First drop",
    images: ["/products/basanti-1.jpg", "/products/basanti-2.jpg", "/products/basanti-3.jpg"],
  },
];

export function formatPrice(n: number) {
  return "₹" + n.toLocaleString("en-IN");
}

export function getProduct(slug: string) {
  return PRODUCTS.find((p) => p.slug === slug);
}
