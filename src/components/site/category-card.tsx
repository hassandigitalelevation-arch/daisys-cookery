import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";

import type { Category } from "@/data/categories";

const subtleBg: Record<Category["tone"], string> = {
  celebratory: "bg-blush",
  joyful: "bg-brand-50",
  elegant: "bg-cocoa-50",
};

export function CategoryCard({ category }: { category: Category }) {
  return (
    <Link
      href={`/cakes?cat=${category.slug}`}
      className="group relative block overflow-hidden rounded-3xl border border-border bg-card shadow-card transition-all duration-300 hover:-translate-y-1 hover:shadow-lift"
    >
      <div className={`relative aspect-3/4 overflow-hidden ${subtleBg[category.tone]}`}>
        <Image
          src={category.image}
          alt={category.alt}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className="object-cover transition-transform duration-700 group-hover:scale-[1.07]"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-cocoa-900/75 via-cocoa-900/10 to-transparent" />
        <div className="absolute inset-x-0 bottom-0 p-6">
          <h3 className="font-display text-2xl font-semibold tracking-tight text-white">{category.name}</h3>
          <p className="mt-1.5 max-w-xs text-sm leading-snug text-white/85">{category.blurb}</p>
          <span className="mt-4 inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 text-sm font-semibold text-cocoa-900 transition-colors group-hover:bg-brand-500 group-hover:text-white">
            Explore Collection
            <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" aria-hidden />
          </span>
        </div>
      </div>
    </Link>
  );
}