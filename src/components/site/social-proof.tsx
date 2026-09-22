import { Star, BadgeCheck } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/motion/reveal";
import { FacebookIcon, InstagramIcon } from "@/components/ui/brand-icons";
import { site } from "@/data/site";
import { testimonials } from "@/data/testimonials";

/**
 * Social proof band — built only from VERIFIED data (the bakery's public
 * Facebook reviews + follow links). No invented testimonials or numbers.
 */
export function SocialProof() {
  return (
    <section className="border-y border-border bg-secondary/50">
      <div className="shell py-14 sm:py-20">
        <Reveal className="mx-auto max-w-3xl text-center">
          <p className="eyebrow justify-center">Love from our customers</p>
          <h2 className="mt-3 font-display text-3xl font-semibold leading-tight tracking-[-0.015em] text-cocoa-900 sm:text-4xl">
            Cakes people recommend on Facebook
          </h2>
          <p className="mt-4 text-base leading-relaxed text-muted-foreground">
            Public reviews on the bakery&apos;s Facebook page.
          </p>
        </Reveal>

        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
          {[
            `${site.recommendRate} recommend the bakery`,
            `${site.reviewsCount}+ public reviews`,
            `Serving since ${site.established}`,
          ].map((stat) => (
            <span
              key={stat}
              className="rounded-full border border-border bg-card px-4 py-2 text-sm font-semibold text-cocoa-700 shadow-card"
            >
              {stat}
            </span>
          ))}
        </div>

        {testimonials.length > 0 && (
          <div className="mx-auto mt-10 grid max-w-4xl gap-5 sm:grid-cols-2">
            {testimonials.map((t, i) => (
              <Reveal key={t.name} delay={i * 0.06}>
                <figure className="h-full rounded-3xl border border-border bg-card p-6 shadow-card">
                  <div className="flex gap-0.5 text-brand-500" aria-label="5 out of 5 stars">
                    {Array.from({ length: 5 }).map((_, j) => (
                      <Star key={j} className="size-4 fill-current" aria-hidden />
                    ))}
                  </div>
                  <blockquote className="mt-4 text-base leading-relaxed text-cocoa-800">
                    “{t.quote}”
                  </blockquote>
                  <figcaption className="mt-4 flex items-center justify-between gap-3 text-sm">
                    <span className="font-semibold text-cocoa-900">{t.name}</span>
                    <span className="inline-flex items-center gap-1 text-xs font-medium text-muted-foreground">
                      <BadgeCheck className="size-3.5 text-brand-500" aria-hidden />
                      {t.role}
                    </span>
                  </figcaption>
                </figure>
              </Reveal>
            ))}
          </div>
        )}

        <Reveal delay={0.1} className="mt-12 text-center">
          <p className="text-sm text-muted-foreground">
            See every new design and review on the bakery&apos;s page.
          </p>
          <div className="mt-4 flex flex-wrap justify-center gap-3">
            <Button asChild size="lg" variant="outline">
              <a href={site.social.facebook} target="_blank" rel="noopener noreferrer">
                <FacebookIcon className="size-4" />
                Visit Facebook page
              </a>
            </Button>
            <Button asChild size="lg">
              <a href={site.social.instagram} target="_blank" rel="noopener noreferrer">
                <InstagramIcon className="size-4" />
                Follow on Instagram
              </a>
            </Button>
          </div>
        </Reveal>
      </div>
    </section>
  );
}