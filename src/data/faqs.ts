export type Faq = {
  question: string;
  answer: string;
};

/**
 * Honest, non-fabricated FAQ. Answers avoid promising policies (delivery
 * windows, prices, guarantees) that have not been confirmed by the bakery.
 */
export const faqs: Faq[] = [
  {
    question: "How do I order a cake?",
    answer:
      "Use the Create Your Cake studio to design a cake, then send the order summary through WhatsApp or Facebook. Daisy's team will confirm your details and arrange your cake.",
  },
  {
    question: "Can I customize an existing cake design?",
    answer:
      "Yes — every cake can be adapted. Open the cake you like and choose “Customize”, or start fresh in the Cake Studio with your own size, flavor, filling, design and message.",
  },
  {
    question: "Can I send a photo of a design I love?",
    answer:
      "Of course. In the Cake Studio you can upload a reference image. It is used as a design reference for your enquiry, so Daisy's can match the look as closely as possible.",
  },
  {
    question: "How are prices calculated?",
    answer:
      "Prices depend on size, flavors, fillings and design detail. Your customized summary is sent as a request and the team shares the exact price with you before you confirm.",
  },
  {
    question: "How far in advance should I order?",
    answer:
      "For birthdays and small cakes, earlier is always better. For weddings and events, please reach out well in advance so we can plan the design and delivery together.",
  },
  {
    question: "Do you take orders for weddings and Gaye Holud?",
    answer:
      "Celebrations are our specialty — browse the Gaye Holud and Wedding Special collections, or create a custom design for your event.",
  },
];