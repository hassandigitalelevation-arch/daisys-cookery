import type { Metadata } from "next";
import Link from "next/link";
import { Suspense } from "react";
import { ChevronRight } from "lucide-react";

import { PageHero } from "@/components/site/page-hero";
import { Reveal } from "@/components/motion/reveal";
import { CakesBrowser, CakesGridSkeleton } from "@/components/site/cakes-browser";
import { site } from "@/data/site";

export const metadata: Metadata = {
  title: "Cakes",
  description:
    `Browse the Daisy's Cookery cake collection — birthday, Gaye Holud, wedding and anniversary categories, all customizable in the 3D Cake Studio.`,
};

export default function CakesIndexPage() {
  return (
    <>
      <PageHero
        eyebrow="Collections"
        title="All cakes"
        description={`Pick a category below — birthday, Gaye Holud, wedding or anniversary — or design your own in the ${site.shortName} Cake Studio.`}
      >
        <Reveal delay={0.15}>
          <nav aria-label="Breadcrumb" className="mt-5 flex items-center gap-1 text-sm text-muted-foreground">
            <Link href="/" className="transition-colors hover:text-brand-600">
              Home
            </Link>
            <ChevronRight className="size-3.5" aria-hidden />
            <span className="font-semibold text-cocoa-800">Cakes</span>
          </nav>
        </Reveal>
      </PageHero>

      <section className="shell py-12 sm:py-16">
        <Suspense fallback={<CakesGridSkeleton />}>
          <CakesBrowser />
        </Suspense>
      </section>
    </>
  );
}