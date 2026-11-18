/**
 * ─────────────────────────────────────────────────────────────
 *  ROOH GEHNA — PRODUCT CATALOG
 *  Edit this file to change names, prices, descriptions & stock.
 *
 *  Photos: drop files into /public/products/ and list them in
 *  `images`, e.g. images: ["/products/mehrunissa-1.jpg", ...].
 *  While `images` is empty, a hand-drawn illustration is shown.
 *  Prices are in Indian Rupees (whole rupees).
 * ─────────────────────────────────────────────────────────────
 */

export type Category = "necklaces" | "earrings" | "headpieces" | "hands" | "anklets";

export type ArtKind =
  | "choker"
  | "jhumka"
  | "tikka"
  | "rani-haar"
  | "pendant"
  | "chandbali"
  | "bangles"
  | "ring"
  | "anklet"
  | "studs";

export type Stone = "kundan" | "pearl" | "ruby" | "emerald" | "polki";

export interface Product {
  id: string;
  slug: string;
  name: string;
  subtitle: string;
  category: Category;
  price: number;
  compareAt?: number;
  description: string;
  details: string[];
  stock: number;
  badge?: string;
  featured?: boolean;
  images: string[];
  art: { kind: ArtKind; stone: Stone };
}

export const CATEGORIES: { id: Category; label: string; blurb: string }[] = [
  { id: "necklaces", label: "Necklaces", blurb: "Chokers, haars & pendants" },
  { id: "earrings", label: "Earrings", blurb: "Jhumkas, chandbalis & studs" },
  { id: "headpieces", label: "Headpieces", blurb: "Maang tikkas for every shagun" },
  { id: "hands", label: "Bangles & Rings", blurb: "Kadas and statement rings" },
  { id: "anklets", label: "Anklets", blurb: "Payals with a soft chime" },
];

export const PRODUCTS: Product[] = [
  {
    id: "RG001",
    slug: "mehrunissa-kundan-choker",
    name: "Mehrunissa",
    subtitle: "Kundan Choker with Pearl Drops",
    category: "necklaces",
    price: 4499,
    compareAt: 5299,
    description:
      "A regal choker of hand-set kundan stones, finished with a fringe of seed pearls that moves softly with you. Made for sangeets, pheras and every evening you want to be remembered.",
    details: [
      "Gold-plated brass with hand-set kundan",
      "Freshwater-look pearl drops",
      "Adjustable dori closure",
      "Includes matching pair of studs",
    ],
    stock: 8,
    badge: "Bestseller",
    featured: true,
    images: [],
    art: { kind: "choker", stone: "kundan" },
  },
  {
    id: "RG002",
    slug: "noor-pearl-jhumkas",
    name: "Noor",
    subtitle: "Pearl Cluster Jhumkas",
    category: "earrings",
    price: 1899,
    description:
      "Classic temple-dome jhumkas edged with tiny pearls. Light enough for all-day wear, festive enough for the mehendi.",
    details: [
      "Gold-plated brass",
      "Push-back closure",
      "Length: 5.5 cm",
      "Weight: 18 g per earring",
    ],
    stock: 15,
    featured: true,
    images: [],
    art: { kind: "jhumka", stone: "pearl" },
  },
  {
    id: "RG003",
    slug: "gulbahar-maang-tikka",
    name: "Gulbahar",
    subtitle: "Kundan & Ruby Maang Tikka",
    category: "headpieces",
    price: 1499,
    description:
      "A floral kundan medallion with a single ruby-red heart and a pearl fringe, on a delicate chain that sits perfectly along your parting.",
    details: [
      "Gold-plated brass, kundan & ruby-tone stones",
      "Hook closure with adjustable chain",
      "Medallion: 3.2 cm",
    ],
    stock: 10,
    featured: true,
    images: [],
    art: { kind: "tikka", stone: "ruby" },
  },
  {
    id: "RG004",
    slug: "rani-haar-heritage-necklace",
    name: "Rani Haar",
    subtitle: "Heritage Long Necklace",
    category: "necklaces",
    price: 6999,
    compareAt: 7999,
    description:
      "Our grandest piece. A long, layered rani haar of polki-look stones and pearls with a statement pendant, inspired by royal Rajasthani heirlooms.",
    details: [
      "Gold-plated brass, polki-look stones & pearls",
      "Length: 28 inches",
      "Adjustable dori closure",
      "Arrives in a keepsake box",
    ],
    stock: 4,
    badge: "Bridal",
    featured: true,
    images: [],
    art: { kind: "rani-haar", stone: "polki" },
  },
  {
    id: "RG005",
    slug: "mor-peacock-pendant",
    name: "Mor",
    subtitle: "Peacock Pendant Necklace",
    category: "necklaces",
    price: 1299,
    description:
      "The peacock that inspired our name — a delicate pendant with an emerald-green tail, on a fine chain made for everyday grace.",
    details: [
      "Gold-plated brass with emerald-tone stones",
      "Chain length: 18 inches",
      "Lobster clasp",
    ],
    stock: 20,
    badge: "Signature",
    images: [],
    art: { kind: "pendant", stone: "emerald" },
  },
  {
    id: "RG006",
    slug: "zehra-ruby-chandbalis",
    name: "Zehra",
    subtitle: "Ruby Chandbali Earrings",
    category: "earrings",
    price: 2299,
    description:
      "Crescent-moon chandbalis framed in kundan, with ruby-red accents and a pearl edge. A timeless shape that flatters every face.",
    details: [
      "Gold-plated brass, kundan & ruby-tone stones",
      "Hook closure",
      "Length: 6 cm",
    ],
    stock: 12,
    featured: true,
    images: [],
    art: { kind: "chandbali", stone: "ruby" },
  },
  {
    id: "RG007",
    slug: "shagun-kada-bangles",
    name: "Shagun",
    subtitle: "Kundan Kada Bangles · Set of 2",
    category: "hands",
    price: 2799,
    description:
      "A pair of openable kadas lined with kundan stones — the finishing touch to a lehenga, or stacked with your everyday glass bangles.",
    details: [
      "Gold-plated brass with kundan",
      "Openable screw clasp",
      "Available in size 2.4 & 2.6 (mention in order notes)",
    ],
    stock: 9,
    images: [],
    art: { kind: "bangles", stone: "kundan" },
  },
  {
    id: "RG008",
    slug: "zoya-polki-ring",
    name: "Zoya",
    subtitle: "Polki Cocktail Ring",
    category: "hands",
    price: 999,
    description:
      "A floral cocktail ring with a polki-look centre and a halo of tiny pearls. Adjustable, so it fits just right.",
    details: ["Gold-plated brass", "Adjustable band", "Top: 2.4 cm"],
    stock: 25,
    images: [],
    art: { kind: "ring", stone: "polki" },
  },
  {
    id: "RG009",
    slug: "chhanak-ghungroo-payal",
    name: "Chhanak",
    subtitle: "Ghungroo Payal · Pair",
    category: "anklets",
    price: 1199,
    description:
      "Slim anklets with tiny ghungroos that chime softly with every step. A little music for your everyday.",
    details: ["Gold-plated brass", "Adjustable hook closure", "Length: 10.5 inches"],
    stock: 18,
    images: [],
    art: { kind: "anklet", stone: "pearl" },
  },
  {
    id: "RG010",
    slug: "sitara-kundan-studs",
    name: "Sitara",
    subtitle: "Kundan Flower Studs",
    category: "earrings",
    price: 799,
    description:
      "Little kundan flowers with a ruby-tone heart. Effortless with a kurta, lovely with a saree, perfect as a gift.",
    details: ["Gold-plated brass", "Push-back closure", "Diameter: 1.6 cm"],
    stock: 30,
    badge: "New",
    featured: true,
    images: [],
    art: { kind: "studs", stone: "kundan" },
  },
];

export function getProduct(slug: string) {
  return PRODUCTS.find((p) => p.slug === slug);
}

export function getProductById(id: string) {
  return PRODUCTS.find((p) => p.id === id);
}

export function categoryLabel(c: Category) {
  return CATEGORIES.find((x) => x.id === c)?.label ?? c;
}
