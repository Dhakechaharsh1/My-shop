import { STORE } from "./store-config";

/** Store policies. Edit to match how you operate. */
export const POLICIES: Record<string, { title: string; body: { h?: string; p: string }[] }> = {
  shipping: {
    title: "Shipping",
    body: [
      { p: "We ship across India. Once your order is confirmed in our Instagram DMs, we dispatch within 1–2 business days. Delivery usually takes 4–7 business days, depending on your location." },
      { h: "Shipping charges", p: "We share the shipping charge for your PIN code in the DM before you pay, so there are no surprises." },
      { h: "Tracking", p: "Once your order ships, we send you the tracking link on Instagram." },
      { h: "Delays", p: "During festive and wedding seasons deliveries may take a little longer. We’ll always keep you posted." },
    ],
  },
  returns: {
    title: "Returns & Exchanges",
    body: [
      { p: "We want you to love what you wear. If something isn’t right, message us on Instagram within 48 hours of delivery." },
      { h: "Damaged or wrong item", p: "Please share an unboxing video or photos within 48 hours of delivery and we’ll arrange a replacement or a refund." },
      { h: "Earrings", p: "For hygiene reasons, earrings can only be returned or exchanged if they arrive damaged or defective." },
      { h: "Refunds", p: "Approved refunds are sent back the same way you paid, within 5–7 business days of us receiving the return." },
      { h: "Cancellations", p: "You can cancel any time before your order is dispatched. Just send us a DM." },
    ],
  },
  care: {
    title: "Jewellery Care",
    body: [
      { p: "Our pieces have a plated, antique finish. With a little love, they stay beautiful for years." },
      { h: "Do", p: "Wear your jewellery last — after makeup, perfume and hairspray. Wipe with a soft, dry cloth after use. Store each piece separately in its pouch, in an airtight box if possible." },
      { h: "Don’t", p: "Avoid water, perfume, sanitiser and moisture. Don’t sleep, bathe, swim or exercise in your jewellery." },
    ],
  },
  privacy: {
    title: "Privacy Policy",
    body: [
      { p: "Rooh Gehna (“we”, “us”) respects your privacy. This website does not collect personal details, payments or accounts. Orders are placed with us directly on Instagram." },
      { h: "What we collect", p: "When you order through Instagram, we ask for your name, phone number and delivery address, and use them only to ship and support your order." },
      { h: "Sharing", p: "We share your address only with our courier partner to deliver your order. We never sell your data." },
      { h: "Your choices", p: `You can ask us to correct or delete your details at any time by messaging @${STORE.instagram} or emailing ${STORE.email}.` },
    ],
  },
  terms: {
    title: "Terms of Service",
    body: [
      { p: "By using this website and ordering from Rooh Gehna, you agree to these terms." },
      { h: "Products", p: "We take care to show our jewellery accurately. Small variations in colour and finish are natural and are not defects." },
      { h: "Pricing and orders", p: "Prices are shown on this website in Indian Rupees. Orders are placed by DM on Instagram and are confirmed once we have received your payment." },
      { h: "Availability", p: "Pieces are made in small batches. If a piece sells out after you message us, we’ll let you know straight away." },
      { h: "Governing law", p: "These terms are governed by the laws of India." },
    ],
  },
};
