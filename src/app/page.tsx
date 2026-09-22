import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Sparkles, Cake, Wand2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Reveal } from "@/components/motion/reveal";
import { Parallax } from "@/components/motion/parallax";
import { SectionHeading } from "@/components/site/section-heading";
import { CakeCard } from "@/components/site/cake-card";
import { CategoryCard } from "@/components/site/category-card";
import { CtaPanel } from "@/components/site/cta-panel";
import { SocialProof } from "@/components/site/social-proof";
import { BakeryJsonLd } from "@/components/site/bakery-json-ld";
import { categories } from "@/data/categories";
import { products } from "@/data/products";
import { site } from "@/data/site";

export default function HomePage() {
  const featured = products.filter((p) => p.popular).slice(0, 3);
  const heroCake = products.find((p) => p.popular) ?? products[0];
  const studioSteps = ["Pick shape", "Choose size", "Pick flavor", "Add filling", "Pick a theme", "Personalize", "Send"];

  return (
    <>
      <BakeryJsonLd />

      {/* ============ HERO ============ */}
      <section className="relative overflow-hidden bg-cream">
        <div className="blob pointer-events-none absolute -left-24 top-10 size-105 rounded-full" aria-hidden />
        <div className="blob pointer-events-none absolute -right-32 bottom-0 size-96 rounded-full opacity-70" aria-hidden />

        <div className="shell grid grid-cols-1 items-center gap-12 py-16 sm:py-20 lg:min-h-[calc(100vh-72px)] lg:grid-cols-12 lg:gap-8 lg:py-0">
          <div className="relative z-10 lg:col-span-6 lg:py-16">
            <Reveal>
              <p className="eyebrow">
                <Sparkles className="size-3.5" aria-hidden />
                Celebration cakes &amp; custom designs
              </p>
            </Reveal>
            <Reveal delay={0.05}>
              <h1 className="mt-5 font-display text-[2.6rem] font-semibold leading-[1.04] tracking-[-0.02em] text-cocoa-900 sm:text-6xl lg:text-[4.25rem]">
                Beautiful cakes made for{" "}
                <span className="font-script text-[1.16em] font-bold leading-[1.06] tracking-normal text-brand-500">
                  meaningful moments.
                </span>
              </h1>
            </Reveal>
            <Reveal delay={0.1}>
              <p className="mt-6 max-w-xl text-lg leading-relaxed text-muted-foreground">
                From {site.shortName} for Gaye Holud, birthdays, weddings and every celebration in between —
                browse our designs or build your own cake and order in a few taps.
              </p>
            </Reveal>
            <Reveal delay={0.15}>
              <div className="mt-8 flex flex-wrap gap-3">
                <Button asChild size="lg">
                  <Link href="/cakes">
                    Explore Cakes
                    <ArrowRight className="size-4" aria-hidden />
                  </Link>
                </Button>
                <Button asChild size="lg" variant="outline">
                  <Link href="/customize">
                    <Wand2 className="size-4" aria-hidden />
                    Create Your Cake
                  </Link>
                </Button>
              </div>
            </Reveal>
            <Reveal delay={0.22}>
              <div className="mt-10 flex flex-wrap items-center gap-2">
                {categories.map((c) => (
                  <Link
                    key={c.slug}
                    href={`/cakes?cat=${c.slug}`}
                    className="rounded-full border border-border bg-card px-4 py-1.5 text-sm font-semibold text-cocoa-700 transition-colors hover:border-brand-300 hover:text-brand-600"
                  >
                    {c.name}
                  </Link>
                ))}
              </div>
            </Reveal>
          </div>

          {/* Layered image composition */}
          <div className="relative z-10 lg:col-span-6 lg:px-6">
            <Parallax strength={40}>
              <div className="relative mx-auto max-w-md">
                <div className="overflow-hidden rounded-[2rem] bg-secondary shadow-hero">
                  {heroCake && (
                    <Image
                      src={heroCake.image}
                      alt={heroCake.alt}
                      width={900}
                      height={1150}
                      priority
                      className="aspect-4/5 w-full object-cover"
                    />
                  )}
                </div>

                <Parallax strength={90} className="absolute -left-6 top-10 w-32 sm:-left-10 sm:w-40">
                  <Image
                    src={categories[1].image}
                    alt={categories[1].alt}
                    width={480}
                    height={600}
                    className="aspect-4/5 rounded-2xl border-4 border-cream object-cover shadow-lift"
                  />
                </Parallax>

                <Parallax strength={70} className="absolute -right-4 bottom-14 w-32 sm:-right-8 sm:w-40">
                  <Image
                    src={categories[0].image}
                    alt={categories[0].alt}
                    width={480}
                    height={480}
                    className="aspect-square rounded-2xl border-4 border-cream object-cover shadow-lift"
                  />
                </Parallax>

                <div className="absolute -bottom-5 left-1/2 flex -translate-x-1/2 items-center gap-2 rounded-full border border-border bg-white/95 px-4 py-2.5 shadow-lift backdrop-blur">
                  <Cake className="size-4 text-brand-500" aria-hidden />
                  <span className="whitespace-nowrap text-sm font-semibold text-cocoa-800">{site.shortName} bakes for you</span>
                </div>
              </div>
            </Parallax>
          </div>
        </div>
      </section>

      {/* ============ CATEGORIES ============ */}
      <section className="shell py-16 sm:py-24">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <SectionHeading
            eyebrow="Find your celebration"
            title="Cakes for every occasion"
            description="Browse our collections or start from scratch with your own design in the Cake Studio."
          />
          <Reveal delay={0.1} className="shrink-0">
            <Button asChild variant="outline">
              <Link href="/cakes">
                View all cakes
                <ArrowRight className="size-4" aria-hidden />
              </Link>
            </Button>
          </Reveal>
        </div>
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {categories.map((c, i) => (
            <Reveal key={c.slug} delay={i * 0.08}>
              <CategoryCard category={c} />
            </Reveal>
          ))}
        </div>
      </section>

      {/* ============ FEATURED CAKES ============ */}
      <section className="bg-sand/60 py-16 sm:py-24">
        <div className="shell">
          <div className="flex flex-wrap items-end justify-between gap-6">
            <SectionHeading
              eyebrow="Featured"
              title="Cakes our customers love"
              description="A taste of the range — every cake can be customized to your size, flavor and message."
            />
            <Reveal delay={0.1} className="shrink-0">
              <Button asChild variant="outline">
                <Link href="/cakes">
                  Browse all cakes
                  <ArrowRight className="size-4" aria-hidden />
                </Link>
              </Button>
            </Reveal>
          </div>
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {featured.map((p, i) => (
              <Reveal key={p.slug} delay={i * 0.08}>
                <CakeCard product={p} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ============ CAKE STUDIO TEASER ============ */}
      <section className="shell py-16 sm:py-24">
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2">
          <div>
            <SectionHeading
              eyebrow="Create Your Cake"
              title="Design your own cake, exactly how you imagine it"
              description="Choose the size, sponge, cream and fruit filling, shape, design and the message on top — then send your creation and we'll confirm it."
            />
            <Reveal delay={0.1}>
              <ul className="mt-8 flex flex-wrap gap-2.5">
                {studioSteps.map((step, i) => (
                  <li key={step} className="flex items-center gap-2.5">
                    <span className="rounded-full border border-border bg-card px-4 py-2 text-sm font-semibold text-cocoa-700">
                      {i + 1}. {step}
                    </span>
                    {i < studioSteps.length - 1 && <ArrowRight className="size-4 text-brand-300" aria-hidden />}
                  </li>
                ))}
              </ul>
            </Reveal>
            <Reveal delay={0.18}>
              <div className="mt-8 flex flex-wrap gap-3">
                <Button asChild size="lg">
                  <Link href="/customize">Open the Cake Studio</Link>
                </Button>
                <Button asChild size="lg" variant="ghost">
                  <Link href="/order">Order / Enquiry</Link>
                </Button>
              </div>
            </Reveal>
          </div>

          <Reveal delay={0.1}>
            <div className="relative">
              <Parallax strength={30}>
                <div className="overflow-hidden rounded-[2rem] shadow-lift">
                  <Image
                    src={categories[1].image}
                    alt="Sample cake in the Cake Studio"
                    width={900}
                    height={1000}
                    className="aspect-4/5 w-full object-cover"
                  />
                </div>
              </Parallax>
              <Badge variant="solid" className="absolute left-4 top-4 gap-1.5 px-3 py-1.5">
                <Sparkles className="size-3.5" aria-hidden />
                Made for you
              </Badge>
            </div>
          </Reveal>
        </div>
      </section>

      <SocialProof />
      <CtaPanel />
    </>
  );
}