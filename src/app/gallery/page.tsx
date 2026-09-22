import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { Button } from "@/components/ui/button";
import { PageHero } from "@/components/site/page-hero";
import { GalleryClient } from "@/components/site/gallery-client";
import { SectionHeading } from "@/components/site/section-heading";
import { CtaPanel } from "@/components/site/cta-panel";
import { Reveal } from "@/components/motion/reveal";

export const metadata: Metadata = {
  title: "Gallery",
  description:
    "Browse Daisy's Cookery cake designs — birthday, Gaye Holud, wedding and celebration cakes, ready to browse and customize.",
};

export default function GalleryPage() {
  return (
    <>
      <PageHero
        eyebrow="Gallery"
        title="Cakes we've made for moments like yours"
        description="A look at the range of designs — from everyday birthdays to Gaye Holud and wedding centrepieces. Every cake can be customized."
      >
        <Reveal delay={0.15}>
          <div className="mt-6 flex flex-wrap gap-3">
            <Button asChild size="lg">
              <Link href="/customize">
                Create your own cake
                <ArrowRight className="size-4" aria-hidden />
              </Link>
            </Button>
          </div>
        </Reveal>
      </PageHero>

      <section className="shell py-12 sm:py-16">
        <Reveal>
          <p className="mb-2 text-xs text-muted-foreground">
            Sample photography — replace these with Daisy&apos;s real cake photos in config.
          </p>
        </Reveal>
        <GalleryClient />
      </section>

      <CtaPanel />
    </>
  );
}