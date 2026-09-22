"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { ArrowRight } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/motion/reveal";
import { CakeCard } from "@/components/site/cake-card";
import { categories } from "@/data/categories";
import { products, productsByCategory } from "@/data/products";
import { cn } from "@/lib/utils";

const tabs = [
  { slug: "all", name: "All Cakes" },
  ...categories.map((c) => ({ slug: c.slug, name: c.name })),
];

const counts: Record<string, number> = {
  all: products.length,
  ...Object.fromEntries(categories.map((c) => [c.slug, productsByCategory(c.slug).length])),
};

/** Single cakes page — pick a category via in-page tabs (no extra routes). */
export function CakesBrowser() {
  const params = useSearchParams();
  const requested = params.get("cat");
  const active = tabs.some((t) => t.slug === requested) ? requested! : "all";
  const category = categories.find((c) => c.slug === active);
  const items = active === "all" ? products : productsByCategory(active);

  return (
    <div>
      {/* Category tabs */}
      <div className="flex flex-wrap gap-2" role="tablist" aria-label="Cake categories">
        {tabs.map((tab) => {
          const isActive = active === tab.slug;
          return (
            <Link
              key={tab.slug}
              href={tab.slug === "all" ? "/cakes" : `/cakes?cat=${tab.slug}`}
              role="tab"
              aria-selected={isActive}
              aria-current={isActive ? "page" : undefined}
              className={cn(
                "inline-flex items-center gap-2 rounded-full border px-4 py-2 text-sm font-semibold transition-colors",
                isActive
                  ? "border-brand-500 bg-brand-500 text-cocoa-900 shadow-sm"
                  : "border-border bg-card text-cocoa-700 hover:border-brand-300 hover:text-brand-600"
              )}
            >
              {tab.name}
              <span
                className={cn(
                  "rounded-full px-1.5 py-0.5 text-[11px] font-bold tabular-nums",
                  isActive ? "bg-black/10 text-cocoa-900" : "bg-secondary text-muted-foreground"
                )}
              >
                {counts[tab.slug] ?? 0}
              </span>
            </Link>
          );
        })}
      </div>

      {/* Collection intro */}
      {category ? (
        <Reveal>
          <div className="mt-8 max-w-2xl">
            <h2 className="font-display text-2xl font-semibold tracking-tight text-cocoa-900 sm:text-3xl">
              {category.title}
            </h2>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{category.description}</p>
          </div>
        </Reveal>
      ) : (
        <Reveal>
          <p className="mt-8 text-sm text-muted-foreground">
            Every cake can be customized — size, flavor, cream, fruit, theme and message.
          </p>
        </Reveal>
      )}

      {/* Grid */}
      {items.length > 0 ? (
        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((p, i) => (
            <Reveal key={p.slug} delay={(i % 3) * 0.06}>
              <CakeCard product={p} />
            </Reveal>
          ))}
        </div>
      ) : (
        <div className="mt-8 rounded-2xl border border-dashed border-border bg-card p-10 text-center">
          <p className="font-display text-xl font-semibold text-cocoa-800">This collection is being filled</p>
          <p className="mt-2 text-sm text-muted-foreground">
            Sample cakes for this category will appear here — or design one now in the Cake Studio.
          </p>
          <Button asChild size="lg" className="mt-6">
            <Link href="/customize">Create Your Cake</Link>
          </Button>
        </div>
      )}

      {/* Studio CTA */}
      <Reveal className="mt-14">
        <div className="flex flex-col items-start justify-between gap-6 rounded-3xl border border-border bg-gradient-to-br from-brand-50 to-card p-8 sm:flex-row sm:items-center">
          <div>
            <h2 className="font-display text-2xl font-semibold text-cocoa-900">
              Can&apos;t find the one? Make it yours.
            </h2>
            <p className="mt-2 max-w-xl text-sm text-muted-foreground">
              Start with the Cake Studio — choose every detail and send your design for a quick confirmation.
            </p>
          </div>
          <Button asChild size="lg">
            <Link href="/customize">
              Open the Cake Studio
              <ArrowRight className="size-4" aria-hidden />
            </Link>
          </Button>
        </div>
      </Reveal>
    </div>
  );
}

export function CakesGridSkeleton() {
  return (
    <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {Array.from({ length: 6 }).map((_, i) => (
        <div key={i} className="animate-pulse overflow-hidden rounded-3xl border border-border bg-card">
          <div className="aspect-4/5 bg-secondary" />
          <div className="space-y-2 p-5">
            <div className="h-3 w-1/4 rounded bg-secondary" />
            <div className="h-5 w-3/4 rounded bg-secondary" />
            <div className="h-3 w-2/3 rounded bg-secondary" />
          </div>
        </div>
      ))}
    </div>
  );
}