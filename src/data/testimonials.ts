export type Testimonial = {
  name: string;
  role?: string;
  quote: string;
  source?: "facebook" | "google" | "whatsapp";
};

/**
 * Real customer reviews surfaced from the bakery's public Facebook page
 * (so genuinely verified, not invented). Add more as the bakery shares them.
 */
export const testimonials: Testimonial[] = [
  {
    name: "Abirul Islam Fahim",
    role: "Facebook review",
    quote: "The cake was very good, thank you.",
    source: "facebook",
  },
  {
    name: "Taznuva Anwar Tanvi",
    role: "Facebook review",
    quote: "The quality and design were absolutely perfect. I'm very happy with the cake.",
    source: "facebook",
  },
];