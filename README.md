# DAISY'S COOKERY — Premium Bakery Website (Demo)

A premium, conversion-focused **Next.js 16** bakery website for **Daisy's Cookery** — celebration cakes
in Chattogram. This is a **demo build** (`demoMode: true`): cakes, names, prices and photos are samples
until the bakery's real catalogue is added.

## Stack

- Next.js 16 (App Router) + Turbopack, React 19, TypeScript
- Tailwind CSS v4 (design tokens), Radix UI primitives (dialog/accordion), framer-motion
- Fully static build (all pages prerendered), SEO (metadata, sitemap, robots, JSON-LD) included

## Run it

```bash
npm install
npm run dev        # http://localhost:3000
npm run build      # static production build
npm run start      # serve the build
npm run typecheck  # TypeScript check
npm run lint       # ESLint
```

## Where to edit content (single source of truth)

Everything a bakery owner would change lives in **`src/data/`** — no component changes needed:

| File | What it controls |
| --- | --- |
| `src/data/site.ts` | Brand name, tagline (verified), logo, contact (phone/WhatsApp verified), links, demo mode |
| `src/data/categories.ts` | Gaye Holud / Happy Birthday / Wedding Special sections |
| `src/data/products.ts` | Cake catalogue (name, photo URL, blurb, size note) |
| `src/data/customize.ts` | **Cake Studio** options: sizes, flavors, creams, fruit fillings, shapes, designs, message colors, price mode |
| `src/data/gallery.ts` | Gallery photos + tags |
| `src/data/faqs.ts` | FAQ answers |
| `src/data/testimonials.ts` | Real customer reviews |
| `src/lib/images.ts` | Demo image source (replace with real bakery photos) |

### Going live checklist
1. Set `demoMode: false` in `src/data/site.ts`.
2. Replace sample photos in `src/lib/images.ts` / `src/data/*.ts` with real Daisy's photos.
3. Add real prices: fill `studioConfig.priceTable` and set `priceMode: "calculated"` in `src/data/customize.ts`.
4. Confirm address, hours and email (currently placeholders) in `src/data/site.ts`.

## Verified vs placeholder (honesty notes)

**Verified from the bakery's Facebook page** (public contact info):
- Name, phone **+880 1814-438989**, WhatsApp **+880 1814-438989**, Instagram `daisyscookery.ctg`
- "Serving Premium Homemade Cake Since 2018", **98% recommend** (346 reviews) + two named public reviews

**Placeholders (not confirmed):** address & opening hours (local public listing suggests
Dev Pahar, Chawkbazar, Chattogram), email, all cake photos/names/prices (sample/demo imagery is used and clearly marked).

## Cake Studio (Create Your Cake)

Product configurator at `/customize` — 7 steps with a **live 3D cake preview** (Three.js) that rebuilds as you choose:

Shape → Weight → Flavor → Cream & filling → Fruit topping → Preset theme (or Skip) → Personalize (message + color + uploaded design image decal)
→ **Review & send** (3D summary, WhatsApp/first copy + Facebook fallback).

Progress bar, keyboard navigation, drag-to-rotate 3D, persisted selections (localStorage), reduced-motion support,
price "To be quoted" until real prices are added.

## Pages

`/` `/cakes` `/cakes/[product]` `/cakes/gaye-holud` `/cakes/happy-birthday` `/cakes/wedding-special`
`/customize` `/gallery` `/about` `/contact` `/faq` `/order`

This demo was not cloned from any reference (e.g. Bread & Beyond) — only the *concept* of a visual
cake configurator was used as inspiration; code, layout, branding and copy are original.