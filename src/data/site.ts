/**
 * DAISY'S COOKERY — SITE CONFIG (single source of truth)
 * ------------------------------------------------------
 * Everything the owner would edit lives here or in the files in this folder.
 */

export const site = {
  name: "Daisy's Cookery",
  shortName: "Daisy's",
  tagline: "Serving premium homemade cakes since 2018.",
  description:
    "Daisy's Cookery is a premium homemade cake shop in Chattogram crafting celebration cakes — Gaye Holud, birthday and wedding designs you can browse, customize and order.",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://daisys-cookery.demo",
  locale: "en_US",

  /** VERIFIED from the bakery's Facebook page (contact info). */
  established: "2018",
  recommendRate: "98%",
  reviewsCount: 346,

  logo: {
    src: "/logo.jpg",
    width: 1500,
    height: 1500,
    alt: "Daisy's Cookery logo",
  },

  /**
   * DEMO PREVIEW MODE
   * -----------------
   * The real cake catalogue (photos, names & prices) is now loaded, so this is
   * off. Flip to `true` only if sample imagery is being used again.
   */
  demoMode: false,
  demoNotice:
    "Cart preview — prices & cakes shown are samples until the bakery's real catalogue is added.",

  contact: {
    /**
     * VERIFIED from the Facebook page contact info (public listing).
     * Address, hours and email are NOT visible there yet → safe placeholders.
     */
    phoneDisplay: "+880 1814-438989",
    phoneHref: "tel:+8801814438989",
    whatsapp: "8801814438989", // verified (WhatsApp number on the Facebook page)
    email: "hello@daisyscookery.com", // placeholder
    address: "Dev Pahar, Chawkbazar, Chattogram", // unverified public listing
    addressShort: "Chawkbazar, Chattogram",
    hours: [
      { days: "Daily", time: "10:00 AM – 10:00 PM" }, // placeholder
    ] as { days: string; time: string }[],
    mapQuery: "Chawkbazar, Chattogram, Bangladesh",
  },

  social: {
    facebook: "https://www.facebook.com/daisyscookery",
    instagram: "https://www.instagram.com/daisyscookery.ctg",
  },
} as const;

export type NavItem = {
  label: string;
  href: string;
  highlight?: boolean;
  children?: { label: string; href: string; description?: string }[];
};

export const NAV_ITEMS: NavItem[] = [
  { label: "Home", href: "/" },
  { label: "Cakes", href: "/cakes" },
  { label: "Create Your Cake", href: "/customize", highlight: true },
  { label: "Gallery", href: "/gallery" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
  { label: "FAQ", href: "/faq" },
];