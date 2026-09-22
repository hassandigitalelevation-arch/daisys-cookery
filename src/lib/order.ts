import { site } from "@/data/site";
import { studioConfig, optionLabel, type StudioSelection } from "@/data/customize";

export function messageStyleLabel(id: string) {
  return studioConfig.messageStyles.find((s) => s.id === id)?.label ?? "";
}

export type Enquiry = {
  name: string;
  phone: string;
  preferredDate: string;
  notes: string;
  viaStudio: boolean;
  selection?: StudioSelection;
};

/** Human-readable WhatsApp message summarising the order/enquiry. */
export function buildEnquiryMessage(enquiry: Enquiry): string {
  const s = enquiry.selection;
  const lines: string[] = [];
  lines.push(`Hello ${site.name}! 🎂`);

  if (s && enquiry.viaStudio) {
    lines.push("");
    lines.push("I designed a cake in your Cake Studio:");
    lines.push(`- Size: ${optionLabel("size", s.size)}`);
    lines.push(`- Flavor: ${optionLabel("flavor", s.flavor)}`);
    lines.push(`- Cream / filling: ${optionLabel("cream", s.cream)}`);
    lines.push(`- Fruit filling: ${optionLabel("fruitFilling", s.fruitFilling)}`);
    lines.push(`- Shape: ${optionLabel("shape", s.shape)}`);
    lines.push(`- Design: ${optionLabel("design", s.design)}`);
    if (s.message) lines.push(`- Message on cake: “${s.message}” (${messageStyleLabel(s.messageStyle)})`);
    if (s.referenceImage) lines.push("- Reference design image attached");
    lines.push("");
    lines.push("Please share the exact price & availability.");
  } else {
    lines.push("");
    lines.push("I'd like to place a cake order / enquiry.");
    if (enquiry.selection?.message) lines.push(`Note: ${enquiry.selection.message}`);
  }

  if (enquiry.name) lines.push("");
  if (enquiry.name) lines.push(`Name: ${enquiry.name}`);
  if (enquiry.phone) lines.push(`Phone: ${enquiry.phone}`);
  if (enquiry.preferredDate) lines.push(`Preferred date: ${enquiry.preferredDate}`);
  if (enquiry.notes) lines.push(`Details: ${enquiry.notes}`);

  lines.push("");
  lines.push("Thank you!");
  return lines.filter((l) => l !== "").join("\n");
}

export function whatsappUrl(text: string): string | null {
  const number = site.contact.whatsapp
    // strip anything that isn't a digit to be safe
    .replace(/[^0-9]/g, "");
  if (!number || number.length < 10 || number.includes("X")) return null;
  return `https://wa.me/${number}?text=${encodeURIComponent(text)}`;
}