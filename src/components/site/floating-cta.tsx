import { MessageCircle } from "lucide-react";

import { WhatsAppIcon } from "@/components/site/enquiry-buttons";
import { site } from "@/data/site";

/** Sticky floating order CTA — always visible so a visitor can order/message from anywhere. */
export function FloatingCta() {
  const number = site.contact.whatsapp.replace(/[^0-9]/g, "");
  const hasWhatsApp = number.length >= 10 && !number.includes("X");
  const href = hasWhatsApp
    ? `https://wa.me/${number}?text=${encodeURIComponent("Hi! I'd like to order a cake. Please share the details.")}`
    : site.social.facebook;

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Order your custom cake"
      className="fixed bottom-5 right-5 z-50 flex items-center gap-2.5 rounded-full bg-brand-600 px-5 py-3.5 font-semibold text-white shadow-lift transition-all hover:-translate-y-0.5 hover:bg-brand-500"
    >
      {hasWhatsApp ? <WhatsAppIcon className="size-5" /> : <MessageCircle className="size-5" aria-hidden />}
      <span className="hidden sm:inline">Order Your Cake</span>
    </a>
  );
}