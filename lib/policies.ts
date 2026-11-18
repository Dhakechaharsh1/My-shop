import { STORE } from "./store-config";

/** Store policies. Razorpay requires these pages to activate a live account. Edit to match how you operate. */
export const POLICIES: Record<string, { title: string; body: { h?: string; p: string }[] }> = {
  shipping: {
    title: "Shipping Policy",
    body: [
      { p: `We ship across India. Orders are dispatched within 1–2 business days and usually arrive within 4–7 business days, depending on your location.` },
      { h: "Shipping charges", p: `Shipping is free on all orders above ₹${STORE.freeShippingAbove}. A flat fee of ₹${STORE.shippingFee} applies to smaller orders.` },
      { h: "Tracking", p: "Once your order ships, we’ll send the tracking link to your email / WhatsApp." },
      { h: "Delays", p: "During festive and wedding seasons, deliveries may take a little longer. We’ll always keep you posted." },
    ],
  },
  returns: {
    title: "Returns & Refunds",
    body: [
      { p: "We want you to love what you wear. If something isn’t right, you can request a return within 7 days of delivery." },
      { h: "Eligibility", p: "Pieces must be unused, in original condition and packaging, with all tags. For hygiene reasons, earrings can only be returned if they are damaged or defective." },
      { h: "Damaged or wrong item", p: "Please share an unboxing video/photos within 48 hours of delivery and we’ll send a replacement or a full refund." },
      { h: "Refunds", p: "Approved refunds are processed to the original payment method within 5–7 business days of us receiving the return." },
      { h: "Cancellations", p: "Orders can be cancelled before they are dispatched for a full refund. Write to us as soon as possible." },
    ],
  },
  care: {
    title: "Jewellery Care",
    body: [
      { p: "Our pieces are gold-plated and hand-set. With a little love, they stay beautiful for years." },
      { h: "Do", p: "Wear your jewellery last — after makeup, perfume and hairspray. Wipe with a soft, dry cloth after use. Store each piece separately in its pouch or box, in an airtight container if possible." },
      { h: "Don’t", p: "Avoid water, perfume, sanitiser and moisture. Don’t sleep, bathe, swim or exercise in your jewellery." },
    ],
  },
  privacy: {
    title: "Privacy Policy",
    body: [
      { p: `Rooh Gehna (“we”, “us”) respects your privacy. This policy explains what we collect when you shop at ${STORE.siteUrl}.` },
      { h: "What we collect", p: "Your name, email, phone number and delivery address when you place an order, used only to process, ship and support your order." },
      { h: "Payments", p: "Payments are processed securely by Razorpay. We never see or store your card, UPI or bank details." },
      { h: "Sharing", p: "We share your details only with our payment and courier partners as needed to fulfil your order. We never sell your data." },
      { h: "Your choices", p: `You can ask us to access, correct or delete your information at any time by emailing ${STORE.email}.` },
      { h: "Cookies", p: "We use your browser’s local storage only to remember your shopping bag and checkout details on your device." },
    ],
  },
  terms: {
    title: "Terms of Service",
    body: [
      { p: "By using this website and placing an order, you agree to these terms." },
      { h: "Products", p: "We take care to display our jewellery accurately. Slight variations in colour and finish are natural for handcrafted pieces and are not defects." },
      { h: "Pricing", p: "All prices are in Indian Rupees and include applicable taxes. We may change prices without notice; the price at the time of your order applies." },
      { h: "Orders", p: "An order is confirmed once payment succeeds. We reserve the right to cancel and fully refund any order, for example if an item is out of stock." },
      { h: "Governing law", p: "These terms are governed by the laws of India." },
      { h: "Contact", p: `Questions? Email ${STORE.email}.` },
    ],
  },
};
