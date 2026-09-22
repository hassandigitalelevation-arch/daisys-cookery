import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Heart, Palette, CakeSlice, Megaphone } from "lucide-react";

import { Button } from "@/components/ui/button";
import { PageHero } from "@/components/site/page-hero";
import { SectionHeading } from "@/components/site/section-heading";
import { Reveal } from "@/components/motion/reveal";
import { Parallax } from "@/components/motion/parallax";
import { CtaPanel } from "@/components/site/cta-panel";
import { verifiedPhotoIds as P, unsplash } from "@/lib/images";
import { site } from "@/data/site";

export const metadata: Metadata = {
  title: "About",
  description: `About ${site.name} — a celebration cake studio in Chattogram making Gaye Holud, birthday and wedding cakes.`,
};

const values = [
  {
    icon: Heart,
    title: "For meaningful moments",
    text: "Every cake is made for an occasion that matters — birthdays, Gaye Holud, weddings and the small celebrations in between.",
  },
  {
    icon: Palette,
    title: "Made to order",
    text: "Cakes are baked for your celebration, not pre-made for a shelf. Tell us your date and we plan around it.",
  },
  {
    icon: CakeSlice,
    title: "Custom by design",
    text: "Use the Cake Studio or share a reference photo — we shape the design around your idea, your size and your message.",
  },
  {
    icon: Megaphone,
    title: "Fresh designs, shared openly",
    text: "New cakes and ideas are shared on our Facebook page, where the bakery talks to its customers every day.",
  },
];

export default function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="About us"
        title="A celebration cake studio with a personal touch"
        description={`${site.name} has been serving premium homemade cakes to Chattogram since ${site.established} — celebration cakes for Gaye Holud, birthdays and weddings, made to order.`}
      />

      <section className="shell py-14 sm:py-20">
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2">
          <Reveal>
            <div className="relative">
              <Parallax strength={30}>
                <div className="overflow-hidden rounded-[2rem] shadow-lift">
                  <Image
                    src={unsplash(P.strawberryCake, 900, 1000)}
                    alt="Sample celebration cake by Daisy's Cookery"
                    width={900}
                    height={1000}
                    className="aspect-square w-full object-cover"
                  />
                </div>
              </Parallax>
              <div className="absolute -bottom-6 -right-4 hidden w-52 overflow-hidden rounded-2xl border-4 border-background shadow-lift sm:block">
                <Image
                  src={unsplash(P.weddingTower, 480, 600)}
                  alt="Sample wedding cake"
                  width={480}
                  height={600}
                  className="aspect-4/5 object-cover"
                />
              </div>
            </div>
          </Reveal>

          <div>
            <SectionHeading
              eyebrow="Our story"
              title="Sweet moments, carefully baked"
              description={`${site.name} began as a love of baking that grew into a celebration cake studio. From colourful Gaye Holud designs to elegant wedding tiers and playful birthday cakes, every order starts with the person celebrating — not a template.`}
            />
            <Reveal delay={0.1}>
              <div className="mt-8 rounded-2xl border border-border bg-card p-5 text-sm leading-relaxed text-muted-foreground shadow-card">
                <p>
                  Because the bakery&apos;s full story is shared on its Facebook page, this page keeps things simple and
                  honest: what we bake, how to order, and how to make a cake yours. The busiest place we share designs
                  is{" "}
                  <a
                    href={site.social.facebook}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-semibold text-brand-600 hover:underline"
                  >
                    our Facebook page
                  </a>
                  .
                </p>
              </div>
            </Reveal>
            <Reveal delay={0.16}>
              <div className="mt-8 flex flex-wrap gap-3">
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
            </Reveal>
          </div>
        </div>
      </section>

      <section className="bg-sand/60 py-16 sm:py-20">
        <div className="shell">
          <SectionHeading
            eyebrow="What makes us Daisy's"
            title="The values behind every bake"
            align="center"
          />
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {values.map((v, i) => (
              <Reveal key={v.title} delay={i * 0.06}>
                <div className="h-full rounded-3xl border border-border bg-card p-6 shadow-card">
                  <span className="flex size-12 items-center justify-center rounded-2xl bg-brand-50 text-brand-600">
                    <v.icon className="size-6" aria-hidden />
                  </span>
                  <h3 className="mt-5 font-display text-lg font-semibold text-cocoa-900">{v.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{v.text}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <CtaPanel />
    </>
  );
}