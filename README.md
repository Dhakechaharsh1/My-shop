# Rooh Gehna by Khushi — Website

A static showcase site for Rooh Gehna. Customers browse the collection and tap **Order on Instagram**, which opens
[@rooh.gehna](https://www.instagram.com/rooh.gehna) and copies a ready-made DM ("Hi! I'd like to order Gulnaar…") for them to paste.
There is no checkout, cart or payment gateway; prices are shared in DMs.

## Run it locally

```bash
npm install
npm run dev        # http://localhost:3000
```

## Edit products
Everything is in **`lib/products.ts`**: name, subtitle, description, details and photos.
Photos live in `public/products/` (4:5 portrait, about 1200×1500). The first photo is the main one; the second shows on hover.

The Instagram link and email are in **`lib/store-config.ts`**. Policy text is in **`lib/policies.ts`**.

## Publish it (free)
`npm run build` writes a plain static website to the `out/` folder. Host it anywhere:

- **Vercel**: import this repo at https://vercel.com/new and click Deploy.
- **Netlify Drop**: run `npm run build`, then drag the `out` folder onto https://app.netlify.com/drop.

## Other files
- `preview/` — shareable demo files and edited product photos (not part of the site).

## Tech
Next.js 15 (App Router, static export) · React 19 · TypeScript · plain CSS (`app/globals.css`).
