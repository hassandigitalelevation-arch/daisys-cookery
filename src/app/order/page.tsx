import type { Metadata } from "next";
import Link from "next/link";
import { Compass, ClipboardList, Wand2, Send, ArrowRight } from "lucide-react";

import { Button } from "@/components/ui/button";
import { PageHero } from "@/components/site/page-hero";
import { EnquiryForm } from "@/components/site/enquiry-form";
import { SectionHeading } from "@/components/site/section-heading";
import { Reveal } from "@/components/motion/reveal";
import { site } from "@/data/site";

export const metadata: Metadata = {
  title: "Order / Enquiry",
  description: `How to order a cake from ${site.name} — browse designs, create your own in the Cake Studio, then send your order request.`,
};

const steps = [
  {
    icon: Compass,
    title: "Discover",
    text: "Browse the Gaye Holud, birthday and wedding collections until a design catches your eye.",
  },
  {
    icon: ClipboardList,
    title: "Pick your details",
    text: "Note down the size, flavor and message you want — or customize the design in the Cake Studio.",
  },
  {
    icon: Wand2,
    title: "Design it (optional)",
    text: "Use Create Your Cake to build it step by step, upload a reference photo and preview your cake.",
  },
  {
    icon: Send,
    title: "Send & confirm",
    text: "Send your order request with your name and date. The bakery confirms availability and the exact price.",
  },
];

export default function OrderPage() {
  return (
    <>
      <PageHero
        eyebrow="Order / Enquiry"
        title="Discover, customize, and let us confirm your cake"
        description="Ordering is simple: find a design you love, set your details, and send your request. No prepayment on this demo — the bakery confirms everything first."
      />

      <section className="shell py-12 sm:py-16">
        <SectionHeading eyebrow="How it works" title="Four steps to your cake" />
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {steps.map((s, i) => (
            <Reveal key={s.title} delay={i * 0.06}>
              <div className="relative h-full rounded-3xl border border-border bg-card p-6 shadow-card">
                <span className="absolute right-5 top-5 font-display text-4xl font-semibold text-brand-100">
                  {i + 1}
                </span>
                <span className="flex size-11 items-center justify-center rounded-2xl bg-brand-50 text-brand-600">
                  <s.icon className="size-5" aria-hidden />
                </span>
                <h3 className="mt-4 font-display text-lg font-semibold text-cocoa-900">{s.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{s.text}</p>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal className="mt-10">
          <div className="flex flex-wrap items-center justify-between gap-6 rounded-3xl border border-border bg-gradient-to-br from-brand-50 to-card p-8">
            <div>
              <h2 className="font-display text-2xl font-semibold text-cocoa-900">Start now</h2>
              <p className="mt-2 max-w-xl text-sm text-muted-foreground">
                Have an idea already? Open the Cake Studio, or send a plain enquiry straight to the bakery.
              </p>
            </div>
            <div className="flex flex-wrap gap-3">
              <Button asChild size="lg">
                <Link href="/customize">
                  Create Your Cake
                  <ArrowRight className="size-4" aria-hidden />
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline">
                <Link href="/cakes">Browse cakes</Link>
              </Button>
            </div>
          </div>
        </Reveal>

        <div className="mt-14 grid grid-cols-1 gap-10 lg:grid-cols-2">
          <div>
            <SectionHeading
              eyebrow="Enquiry"
              title="Send an order request"
              description="Tell us the cake you have in mind and when you need it — we'll come back with availability and the exact price."
            />
          </div>
          <Reveal delay={0.1}>
            <div className="rounded-3xl border border-border bg-card p-6 shadow-card sm:p-8">
              <EnquiryForm
                label="Cake details"
                placeholder="e.g. 2 kg chocolate birthday cake, message “Happy Birthday Toma”, needed next Friday…"
                copyNote="This sends an enquiry (not a payment). The bakery confirms price and availability before any order is placed."
              />
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}