import { unsplash, verifiedPhotoIds as P, brandImage } from "@/lib/images";

export type Product = {
  slug: string;
  name: string;
  categorySlug: "gaye-holud" | "happy-birthday" | "wedding-special" | "anniversary" | "special";
  shortDescription: string;
  description: string;
  image: string;
  alt: string;
  gallery: { src: string; alt: string }[];
  /** true only while the catalogue runs on sample imagery/names */
  demo: boolean;
  /** price in Bangladeshi Taka (tk) from the bakery's photo list; null = not available */
  price: number | null;
  popular?: boolean;
  sizeNote: string;
};

function g(key: string, src: string, alt: string) {
  return { src: brandImage(key, src), alt };
}

const SIZE_NOTE = "Confirm size & design with order";

export const products: Product[] = [
  // ================= Gaye Holud =================
  {
    slug: "gaye-holud-classic",
    name: "Classic Gaye Holud Cake",
    categorySlug: "gaye-holud",
    shortDescription: "A handcrafted Gaye Holud cake, baked to order.",
    description:
      "A handcrafted Gaye Holud cake from Daisy's Cookery, finished fresh and ready for your celebration. Share your size, colour theme and message and we'll bring it to life.",
    image: brandImage("gaye-holud-classic", unsplash(P.strawberryCake, 900, 1150)),
    alt: "Classic Gaye Holud cake by Daisy's Cookery",
    gallery: [g("gaye-holud-classic", unsplash(P.strawberryCake, 1200, 1400), "Classic Gaye Holud cake")],
    demo: false,
    price: 2500,
    sizeNote: SIZE_NOTE,
  },
  {
    slug: "gaye-holud-festive",
    name: "Festive Gaye Holud Cake",
    categorySlug: "gaye-holud",
    shortDescription: "A colourful celebration cake for your haldi.",
    description:
      "A festive Gaye Holud design made to match the joy of the ceremony — bright, cheerful and finished to order at Daisy's Cookery.",
    image: brandImage("gaye-holud-festive", unsplash(P.berryCake, 900, 1150)),
    alt: "Festive Gaye Holud cake by Daisy's Cookery",
    gallery: [g("gaye-holud-festive", unsplash(P.berryCake, 1200, 1400), "Festive Gaye Holud cake")],
    demo: false,
    price: 3000,
    popular: true,
    sizeNote: SIZE_NOTE,
  },
  {
    slug: "gaye-holud-deluxe",
    name: "Deluxe Gaye Holud Cake",
    categorySlug: "gaye-holud",
    shortDescription: "A richer, more elaborate haldi centrepiece.",
    description:
      "A deluxe Gaye Holud creation with extra finishing touches — designed to stand at the heart of your ceremony table.",
    image: brandImage("gaye-holud-deluxe", unsplash(P.dessertPlatter, 900, 1150)),
    alt: "Deluxe Gaye Holud cake by Daisy's Cookery",
    gallery: [g("gaye-holud-deluxe", unsplash(P.dessertPlatter, 1200, 1400), "Deluxe Gaye Holud cake")],
    demo: false,
    price: 4000,
    sizeNote: SIZE_NOTE,
  },
  {
    slug: "gaye-holud-premium",
    name: "Premium Gaye Holud Cake",
    categorySlug: "gaye-holud",
    shortDescription: "Premium detailing for the main event.",
    description:
      "Our premium Gaye Holud design — elegant finishing and finer details for the ceremony that deserves the spotlight.",
    image: brandImage("gaye-holud-premium", unsplash(P.weddingRomantic, 900, 1150)),
    alt: "Premium Gaye Holud cake by Daisy's Cookery",
    gallery: [g("gaye-holud-premium", unsplash(P.weddingRomantic, 1200, 1400), "Premium Gaye Holud cake")],
    demo: false,
    price: 4500,
    sizeNote: SIZE_NOTE,
  },
  {
    slug: "gaye-holud-signature",
    name: "Signature Gaye Holud Cake",
    categorySlug: "gaye-holud",
    shortDescription: "A signature take on the classic haldi cake.",
    description:
      "Our signature Gaye Holud interpretation — a showstopper design baked and finished to order for your big day.",
    image: brandImage("gaye-holud-signature", unsplash(P.strawberryCake, 900, 1150)),
    alt: "Signature Gaye Holud cake by Daisy's Cookery",
    gallery: [g("gaye-holud-signature", unsplash(P.strawberryCake, 1200, 1400), "Signature Gaye Holud cake")],
    demo: false,
    price: 4500,
    sizeNote: SIZE_NOTE,
  },

  // ================= Happy Birthday =================
  {
    slug: "birthday-classic",
    name: "Classic Birthday Cake",
    categorySlug: "happy-birthday",
    shortDescription: "A classic birthday cake, baked to order.",
    description:
      "A classic birthday cake from Daisy's Cookery — always baked fresh for the day. Pick your size and message and we'll make it yours.",
    image: brandImage("birthday-classic", unsplash(P.birthdayCake, 900, 1150)),
    alt: "Classic birthday cake by Daisy's Cookery",
    gallery: [g("birthday-classic", unsplash(P.birthdayCake, 1200, 1400), "Classic birthday cake")],
    demo: false,
    price: 2500,
    sizeNote: SIZE_NOTE,
  },
  {
    slug: "birthday-celebration",
    name: "Celebration Birthday Cake",
    categorySlug: "happy-birthday",
    shortDescription: "Playful styling built for the big day.",
    description:
      "A cheerful birthday creation with playful styling — made to bring a smile at birthday parties of any age.",
    image: brandImage("birthday-celebration", unsplash(P.chocolateDrip, 900, 1150)),
    alt: "Celebration birthday cake by Daisy's Cookery",
    gallery: [g("birthday-celebration", unsplash(P.chocolateDrip, 1200, 1400), "Celebration birthday cake")],
    demo: false,
    price: 2500,
    sizeNote: SIZE_NOTE,
  },
  {
    slug: "birthday-signature",
    name: "Signature Birthday Cake",
    categorySlug: "happy-birthday",
    shortDescription: "Our signature birthday design.",
    description:
      "The signature Daisy's birthday cake — a crowd-pleaser finished with care and baked fresh to order.",
    image: brandImage("birthday-signature", unsplash(P.birthdayCake, 900, 1150)),
    alt: "Signature birthday cake by Daisy's Cookery",
    gallery: [g("birthday-signature", unsplash(P.birthdayCake, 1200, 1400), "Signature birthday cake")],
    demo: false,
    price: 3000,
    popular: true,
    sizeNote: SIZE_NOTE,
  },
  {
    slug: "birthday-deluxe",
    name: "Deluxe Birthday Cake",
    categorySlug: "happy-birthday",
    shortDescription: "Extra detail for a special birthday.",
    description:
      "A deluxe birthday creation with richer decoration — perfect when the birthday deserves a little extra.",
    image: brandImage("birthday-deluxe", unsplash(P.cupcake, 900, 1150)),
    alt: "Deluxe birthday cake by Daisy's Cookery",
    gallery: [g("birthday-deluxe", unsplash(P.cupcake, 1200, 1400), "Deluxe birthday cake")],
    demo: false,
    price: 3000,
    sizeNote: SIZE_NOTE,
  },
  {
    slug: "birthday-premium",
    name: "Premium Birthday Cake",
    categorySlug: "happy-birthday",
    shortDescription: "Premium finishing for an elegant table.",
    description:
      "Our premium birthday design — refined finishing and a polished look for a more elegant celebration.",
    image: brandImage("birthday-premium", unsplash(P.cakeSlice, 900, 1150)),
    alt: "Premium birthday cake by Daisy's Cookery",
    gallery: [g("birthday-premium", unsplash(P.cakeSlice, 1200, 1400), "Premium birthday cake")],
    demo: false,
    price: 3500,
    sizeNote: SIZE_NOTE,
  },
  {
    slug: "birthday-grand",
    name: "Grand Birthday Cake",
    categorySlug: "happy-birthday",
    shortDescription: "The grand centrepiece for milestone years.",
    description:
      "Our grand birthday cake — built to be the centrepiece for milestone birthdays and big celebrations.",
    image: brandImage("birthday-grand", unsplash(P.chocolateStack, 900, 1150)),
    alt: "Grand birthday cake by Daisy's Cookery",
    gallery: [g("birthday-grand", unsplash(P.chocolateStack, 1200, 1400), "Grand birthday cake")],
    demo: false,
    price: 5000,
    popular: true,
    sizeNote: SIZE_NOTE,
  },
  {
    slug: "kids-cake-classic",
    name: "Kids Birthday Cake",
    categorySlug: "happy-birthday",
    shortDescription: "A fun cake made for the little ones.",
    description:
      "A fun kids' birthday cake — bright, playful and made to delight the youngest at the party.",
    image: brandImage("kids-cake-classic", unsplash(P.cupcake, 900, 1150)),
    alt: "Kids birthday cake by Daisy's Cookery",
    gallery: [g("kids-cake-classic", unsplash(P.cupcake, 1200, 1400), "Kids birthday cake")],
    demo: false,
    price: 2500,
    sizeNote: SIZE_NOTE,
  },
  {
    slug: "kids-cake-deluxe",
    name: "Deluxe Kids Birthday Cake",
    categorySlug: "happy-birthday",
    shortDescription: "Extra fun and colour for kids' parties.",
    description:
      "A deluxe kids' cake with more colour and character — the highlight of any children's celebration.",
    image: brandImage("kids-cake-deluxe", unsplash(P.dessertPlatter, 900, 1150)),
    alt: "Deluxe kids birthday cake by Daisy's Cookery",
    gallery: [g("kids-cake-deluxe", unsplash(P.dessertPlatter, 1200, 1400), "Deluxe kids birthday cake")],
    demo: false,
    price: 3000,
    sizeNote: SIZE_NOTE,
  },

  // ================= Wedding Special =================
  {
    slug: "wedding-special-cake",
    name: "Wedding Cake",
    categorySlug: "wedding-special",
    shortDescription: "An elegant wedding centrepiece, baked to order.",
    description:
      "An elegant wedding cake from Daisy's Cookery — designed to be photographed, remembered and the centrepiece of your day.",
    image: brandImage("wedding-special-cake", unsplash(P.weddingTower, 900, 1150)),
    alt: "Wedding cake by Daisy's Cookery",
    gallery: [g("wedding-special-cake", unsplash(P.weddingTower, 1200, 1400), "Wedding cake")],
    demo: false,
    price: 4500,
    popular: true,
    sizeNote: SIZE_NOTE,
  },

  // ================= Anniversary =================
  {
    slug: "anniversary-cake",
    name: "Anniversary Cake",
    categorySlug: "anniversary",
    shortDescription: "A romantic cake to mark the years together.",
    description:
      "A romantic anniversary cake — made to celebrate the years together, finished fresh to order.",
    image: brandImage("anniversary-cake", unsplash(P.weddingRomantic, 900, 1150)),
    alt: "Anniversary cake by Daisy's Cookery",
    gallery: [g("anniversary-cake", unsplash(P.weddingRomantic, 1200, 1400), "Anniversary cake")],
    demo: false,
    price: 4000,
    sizeNote: SIZE_NOTE,
  },
  {
    slug: "anniversary-premium",
    name: "Premium Anniversary Cake",
    categorySlug: "anniversary",
    shortDescription: "Premium finishing for a milestone anniversary.",
    description:
      "Our premium anniversary design — elegant finishing for the milestone years worth celebrating in style.",
    image: brandImage("anniversary-premium", unsplash(P.weddingTable, 900, 1150)),
    alt: "Premium anniversary cake by Daisy's Cookery",
    gallery: [g("anniversary-premium", unsplash(P.weddingTable, 1200, 1400), "Premium anniversary cake")],
    demo: false,
    price: 5500,
    sizeNote: SIZE_NOTE,
  },

  // ================= Special =================
  {
    slug: "special-cake",
    name: "Special Cake",
    categorySlug: "special",
    shortDescription: "A one-off special creation, baked to order.",
    description:
      "A special-occasion creation from Daisy's Cookery — for the moments that don't fit in a box.",
    image: brandImage("special-cake", unsplash(P.chocolateStack, 900, 1150)),
    alt: "Special cake by Daisy's Cookery",
    gallery: [g("special-cake", unsplash(P.chocolateStack, 1200, 1400), "Special cake")],
    demo: false,
    price: 3000,
    sizeNote: SIZE_NOTE,
  },
  {
    slug: "special-cake-deluxe",
    name: "Deluxe Special Cake",
    categorySlug: "special",
    shortDescription: "A deluxe twist on a surprise favourite.",
    description:
      "A deluxe special design — extra decoration for the celebrations that deserve a little more attention.",
    image: brandImage("special-cake-deluxe", unsplash(P.pastryCounter, 900, 1150)),
    alt: "Deluxe special cake by Daisy's Cookery",
    gallery: [g("special-cake-deluxe", unsplash(P.pastryCounter, 1200, 1400), "Deluxe special cake")],
    demo: false,
    price: 3000,
    sizeNote: SIZE_NOTE,
  },
  {
    slug: "special-cake-premium",
    name: "Premium Special Cake",
    categorySlug: "special",
    shortDescription: "Premium work for a standout occasion.",
    description:
      "Our premium special creation — refined finishing for the day that stands a little taller.",
    image: brandImage("special-cake-premium", unsplash(P.chocolateDrip, 900, 1150)),
    alt: "Premium special cake by Daisy's Cookery",
    gallery: [g("special-cake-premium", unsplash(P.chocolateDrip, 1200, 1400), "Premium special cake")],
    demo: false,
    price: 4000,
    sizeNote: SIZE_NOTE,
  },
  {
    slug: "special-cake-signature",
    name: "Signature Special Cake",
    categorySlug: "special",
    shortDescription: "A signature surprise creation.",
    description:
      "Our signature special design — a showstopper for the moments you'll want to remember.",
    image: brandImage("special-cake-signature", unsplash(P.berryCake, 900, 1150)),
    alt: "Signature special cake by Daisy's Cookery",
    gallery: [g("special-cake-signature", unsplash(P.berryCake, 1200, 1400), "Signature special cake")],
    demo: false,
    price: 4000,
    sizeNote: SIZE_NOTE,
  },
];

export function getProduct(slug: string) {
  return products.find((p) => p.slug === slug);
}

export function productsByCategory(slug: string) {
  return products.filter((p) => p.categorySlug === slug);
}