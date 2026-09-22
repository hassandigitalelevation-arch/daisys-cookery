import type { Metadata } from "next";
import { MapPin, Phone, Clock, MessageCircle } from "lucide-react";
import { FacebookIcon } from "@/components/ui/brand-icons";

import { PageHero } from "@/components/site/page-hero";
import { EnquiryForm } from "@/components/site/enquiry-form";
import { SectionHeading } from "@/components/site/section-heading";
import { Reveal } from "@/components/motion/reveal";
import { site } from "@/data/site";

export const metadata: Metadata = {
  title: "Contact",
  description: `Contact ${site.name} — message us on Facebook or WhatsApp about cakes, custom orders and events.`,
};

export default function ContactPage() {
  const contactCards = [
    {
      icon: MapPin,
      title: "Visit us",
      lines: [site.contact.address],
      note: "Based on a public listing — to be confirmed by the bakery.",
    },
    {
      icon: Phone,
      title: "Call us",
      lines: [site.contact.phoneDisplay],
      note: "Phone details to be confirmed.",
    },
    {
      icon: Clock,
      title: "Open hours",
      lines: site.contact.hours.map((h) => `${h.days}: ${h.time}`),
      note: "Hours to be confirmed.",
    },
    {
      icon: FacebookIcon,
      title: "Facebook",
      lines: ["We reply fastest on our page"],
      note: "",
      href: site.social.facebook,
    },
  ];

  return (
    <>
      <PageHero
        eyebrow="Contact"
        title="Say hello — we'd love to help you celebrate"
        description="Questions about a cake, a big event, or a custom idea? Reach out and the bakery will confirm details and timings."
      />

      <section className="shell py-12 sm:py-16">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {contactCards.map((c, i) => (
            <Reveal key={c.title} delay={i * 0.05}>
              <div className="h-full rounded-3xl border border-border bg-card p-6 shadow-card">
                <span className="flex size-11 items-center justify-center rounded-2xl bg-brand-50 text-brand-600">
                  <c.icon className="size-5" aria-hidden />
                </span>
                <h3 className="mt-4 font-display text-lg font-semibold text-cocoa-900">{c.title}</h3>
                {c.lines.map((line) => (
                  <p key={line} className="mt-1 text-sm font-medium text-cocoa-700">
                    {c.href ? (
                      <a href={c.href} target="_blank" rel="noopener noreferrer" className="hover:text-brand-600">
                        {line}
                      </a>
                    ) : (
                      line
                    )}
                  </p>
                ))}
                {c.note && <p className="mt-3 text-xs text-muted-foreground">{c.note}</p>}
              </div>
            </Reveal>
          ))}
        </div>

        <div className="mt-14 grid grid-cols-1 gap-10 lg:grid-cols-2">
          <div>
            <SectionHeading
              eyebrow="Send a message"
              title="Write to the bakery"
              description="Tell us about your cake, event date and any design ideas. Your message is copied into WhatsApp or Facebook so nothing gets lost."
            />
            <Reveal delay={0.1} className="mt-6">
              <EnquiryForm
                label="Your message"
                placeholder="I'd like a 2 kg chocolate birthday cake for next Saturday…"
                copyNote="If a bakery WhatsApp number is confirmed on this demo, the button will open it — otherwise copy the message or send via Facebook."
              />
            </Reveal>
          </div>

          <div className="rounded-3xl border border-border bg-card p-2 shadow-card">
            <iframe
              title="Daisy's Cookery — location map"
              src={`https://www.google.com/maps?q=${encodeURIComponent(site.contact.mapQuery)}&output=embed`}
              className="h-full min-h-[420px] w-full rounded-2xl border-0"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </div>

        <Reveal className="mt-14">
          <div className="flex flex-col items-start justify-between gap-6 rounded-3xl bg-cocoa-900 p-8 text-white sm:flex-row sm:items-center">
            <div>
              <h2 className="font-display text-2xl font-semibold">Fastest way to reach us</h2>
              <p className="mt-2 max-w-md text-sm text-cocoa-200">
                New designs and quick replies happen on our Facebook page.
              </p>
            </div>
            <a
              href={site.social.facebook}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-semibold text-cocoa-900 transition-colors hover:bg-brand-50"
            >
              <MessageCircle className="size-4" aria-hidden />
              Message us on Facebook
            </a>
          </div>
        </Reveal>
      </section>
    </>
  );
}