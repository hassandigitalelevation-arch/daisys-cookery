import { unsplash, verifiedPhotoIds as P, brandImage } from "@/lib/images";

export type Category = {
  slug: "gaye-holud" | "happy-birthday" | "wedding-special" | "anniversary" | "special";
  name: string;
  title: string;
  description: string;
  /** short supporting line shown on the category card */
  blurb: string;
  image: string;
  alt: string;
  /** used for the category page hero tint */
  tone: "celebratory" | "joyful" | "elegant";
};

export const categories: Category[] = [
  {
    slug: "gaye-holud",
    name: "Gaye Holud",
    title: "Gaye Holud Cakes",
    description:
      "Colourful, festive cake designs made to match the joy and rituals of a Gaye Holud celebration — from henna-bright palettes to soft floral romance.",
blurb: "Festive, colourful designs for your haldi celebration",
    image: brandImage("category-gaye-holud", unsplash(P.strawberryCake, 900, 1200)),
    alt: "Gaye Holud cake from Daisy's Cookery",
    tone: "celebratory",
  },
  {
    slug: "happy-birthday",
    name: "Happy Birthday",
    title: "Happy Birthday Cakes",
    description:
      "Playful, colourful and premium birthday cakes for every age — from little one's first cake to grand milestone celebrations.",
blurb: "Joyful cakes for every birthday moment",
    image: brandImage("category-happy-birthday", unsplash(P.birthdayCake, 900, 1200)),
    alt: "Birthday cake from Daisy's Cookery",
    tone: "joyful",
  },
  {
    slug: "wedding-special",
    name: "Wedding Special",
    title: "Wedding Special Cakes",
    description:
      "Elegant tiered and themed cakes for weddings, engagements and anniversaries — designed to be the centrepiece of your day.",
blurb: "Elegant centrepiece cakes for your big day",
    image: brandImage("category-wedding-special", unsplash(P.weddingTower, 900, 1200)),
    alt: "Wedding cake from Daisy's Cookery",
tone: "elegant",
  },
  {
    slug: "anniversary",
    name: "Anniversary",
    title: "Anniversary Cakes",
    description:
      "Romantic, elegant cakes to mark the years together — anniversaries deserve a cake that celebrates the journey.",
    blurb: "Romantic cakes to celebrate your years together",
    image: brandImage("category-anniversary", unsplash(P.weddingRomantic, 900, 1200)),
    alt: "Anniversary cake from Daisy's Cookery",
    tone: "elegant",
  },
  {
    slug: "special",
    name: "Special",
    title: "Special Cakes",
    description:
      "Seasonal, one-off and surprise creations — cakes made for the moments you can't easily put in a box.",
    blurb: "Seasonal & one-off celebration creations",
    image: brandImage("category-special", unsplash(P.chocolateStack, 900, 1200)),
    alt: "Special occasion cake from Daisy's Cookery",
    tone: "celebratory",
  },
];

export function getCategory(slug: string) {
  return categories.find((c) => c.slug === slug);
}