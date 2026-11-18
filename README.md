# Rooh Gehna by Khushi — Online Store

A complete jewellery store built with Next.js: catalog, product pages, bag, checkout, Razorpay payments (UPI / cards / netbanking / wallets), discount codes, an order dashboard, and all policy pages Razorpay needs for activation.

## Run it locally

```bash
npm install
cp .env.example .env.local     # fill in your values
npm run dev                    # http://localhost:3000
```

Without Razorpay keys the store runs in **demo mode**: checkout works end to end, but no money is charged.

## Go live with payments (Razorpay)

1. Create an account at https://dashboard.razorpay.com and complete KYC.
2. Copy your keys from **Settings → API Keys** into `.env.local` (or your host's environment variables):
   ```
   RAZORPAY_KEY_ID=rzp_live_xxxxx
   RAZORPAY_KEY_SECRET=xxxxx
   ADMIN_PASSWORD=pick-a-strong-password
   NEXT_PUBLIC_SITE_URL=https://your-domain.com
   NEXT_PUBLIC_WHATSAPP=91XXXXXXXXXX
   ```
   Use `rzp_test_…` keys first to test with Razorpay's test cards and UPI.
3. Razorpay will ask for your website's policy pages. They are already live at
   `/policies/privacy`, `/policies/terms`, `/policies/returns`, `/policies/shipping`, and `/contact`.

### Where orders show up
- **`/admin`** on your site (password = `ADMIN_PASSWORD`) lists paid orders with each customer's name, phone, email, address, items, and notes.
- The same details are attached to every order in your **Razorpay dashboard → Orders**.

## Editing your products
Everything is in **`lib/products.ts`**: name, price, compare-at price, description, details, stock, badge, category.

To add real photos, put them in `public/products/` and list them on the product:
```ts
images: ["/products/mehrunissa-1.jpg", "/products/mehrunissa-2.jpg"],
```
Use a 4:5 portrait ratio (e.g. 1600×2000) for the best look. Until you add photos, each product shows a drawn illustration.

Store settings (free-shipping threshold, shipping fee, discount codes) are in **`lib/store-config.ts`**.
Policy text is in **`lib/policies.ts`**.

## Deploy (recommended: Vercel, free tier)
1. Push this repo to GitHub, then import it at https://vercel.com/new.
2. Add the environment variables from `.env.example` in **Project → Settings → Environment Variables**.
3. Deploy, then connect your domain.

## Tech
Next.js 15 (App Router) · React 19 · TypeScript · plain CSS (`app/globals.css`) · Razorpay Orders API with server-side price calculation and signature verification.
