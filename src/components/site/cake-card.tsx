import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import type { Product } from "@/data/products";

export function CakeCard({ product, className }: { product: Product; className?: string }) {
  return (
    <article
      className={cn(
        "group relative flex flex-col overflow-hidden rounded-3xl border border-border bg-card shadow-card transition-all duration-300 hover:-translate-y-1 hover:shadow-lift",
        className
      )}
    >
      <div className="relative aspect-[4/5] overflow-hidden bg-secondary">
        <Link href={`/cakes/${product.slug}`} aria-label={`View ${product.name}`} tabIndex={-1}>
          <Image
            src={product.image}
            alt={product.alt}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            className="object-cover transition-transform duration-500 group-hover:scale-[1.06]"
          />
        </Link>
        <div className="absolute left-3 top-3 flex gap-2">
          {product.demo && <Badge variant="sand">Sample</Badge>}
          {product.popular && <Badge>Popular</Badge>}
        </div>
      </div>

      <div className="flex flex-1 flex-col gap-1 p-5">
        <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-brand-600">
          {product.categorySlug.replace("-", " ")}
        </p>
        <h3 className="font-display text-lg font-semibold leading-snug tracking-tight text-cocoa-900">
          <Link href={`/cakes/${product.slug}`} className="transition-colors hover:text-brand-600">
            {product.name}
          </Link>
        </h3>
        <p className="line-clamp-2 text-sm text-muted-foreground">{product.shortDescription}</p>

        <div className="mt-3 flex items-center justify-between gap-3 border-t border-border pt-3">
          <span className="text-sm font-bold tabular-nums text-cocoa-900">
            {product.price != null ? `Tk ${product.price.toLocaleString("en-US")}` : "Price on enquiry"}
          </span>
          <div className="flex items-center gap-2">
            <Button asChild variant="ghost" size="sm" className="px-3">
              <Link href={`/cakes/${product.slug}`}>
                View
                <ArrowUpRight className="size-3.5" aria-hidden />
              </Link>
            </Button>
            <Button asChild size="sm" className="px-3">
              <Link href="/customize">Customize</Link>
            </Button>
          </div>
        </div>
      </div>
    </article>
  );
}