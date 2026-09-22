import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import Image from "next/image";
import { ChevronRight, CakeIcon, Wand2, BadgeCheck } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { CakeCard } from "@/components/site/cake-card";
import { Reveal } from "@/components/motion/reveal";
import { EnquiryButtons } from "@/components/site/enquiry-buttons";
import { products, getProduct, productsByCategory } from "@/data/products";
import { getCategory } from "@/data/categories";

export function generateStaticParams() {
  return products.map((p) => ({ slug: p.slug }));
}

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const product = getProduct(slug);
  if (!product) return {};
  return {
    title: product.name,
    description: product.shortDescription,
    openGraph: {
      title: product.name,
      description: product.shortDescription,
      images: [{ url: product.image, alt: product.alt }],
    },
  };
}

export default async function ProductPage({ params }: Props) {
  const { slug } = await params;
  const product = getProduct(slug);
  if (!product) notFound();

  const category = getCategory(product.categorySlug);
  const related = productsByCategory(product.categorySlug).filter((p) => p.slug !== slug).slice(0, 3);
  const priceUnavailable = product.price === null;

  return (
    <div className="shell py-10 sm:py-14">
      <nav aria-label="Breadcrumb" className="flex items-center gap-1 text-sm text-muted-foreground">
        <Link href="/" className="transition-colors hover:text-brand-600">
          Home
        </Link>
        <ChevronRight className="size-3.5" aria-hidden />
        <Link href="/cakes" className="transition-colors hover:text-brand-600">
          Cakes
        </Link>
        {category && (
          <>
            <ChevronRight className="size-3.5" aria-hidden />
            <Link href={`/cakes?cat=${category.slug}`} className="transition-colors hover:text-brand-600">
              {category.name}
            </Link>
          </>
        )}
        <ChevronRight className="size-3.5" aria-hidden />
        <span className="font-semibold text-cocoa-800">{product.name}</span>
      </nav>

      <div className="mt-8 grid grid-cols-1 gap-10 lg:grid-cols-2 lg:gap-14">
        <div className="lg:sticky lg:top-24 lg:self-start">
          <Reveal>
            <div className="overflow-hidden rounded-[2rem] bg-secondary shadow-lift">
              <Image
                src={product.image}
                alt={product.alt}
                width={900}
                height={1150}
                priority
                className="aspect-4/5 w-full object-cover"
              />
            </div>
          </Reveal>
        </div>

        <div>
          <Reveal>
            <div className="flex flex-wrap items-center gap-2">
              {category && (
                <Badge variant="outline" className="uppercase tracking-wide">
                  {category.name}
                </Badge>
              )}
              {product.demo && <Badge variant="sand">Sample design</Badge>}
            </div>

            <h1 className="mt-4 font-display text-3xl font-semibold leading-tight tracking-[-0.015em] text-cocoa-900 sm:text-5xl">
              {product.name}
            </h1>

            <p className="mt-5 text-lg leading-relaxed text-muted-foreground">{product.description}</p>

            <div className="mt-8 rounded-2xl border border-border bg-card p-6 shadow-card">
              {priceUnavailable ? (
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="text-sm font-semibold uppercase tracking-wide text-muted-foreground">Price</p>
                    <p className="mt-1 font-display text-2xl font-semibold text-cocoa-900">On enquiry</p>
                    <p className="mt-1 text-xs text-muted-foreground">
                      Share your size &amp; date and the bakery confirms the exact price.
                    </p>
                  </div>
                  <CakeIcon className="size-6 text-brand-500" aria-hidden />
                </div>
              ) : (
                <div>
                  <p className="text-sm font-semibold uppercase tracking-wide text-muted-foreground">Price</p>
                  <p className="mt-1 font-display text-2xl font-semibold text-cocoa-900">
                    {product.price != null
                      ? `Tk ${product.price.toLocaleString("en-US")}`
                      : "Price on enquiry"}
                  </p>
                  <p className="mt-1 text-xs text-muted-foreground">
                    Confirm size &amp; date and the bakery confirms the exact price.
                  </p>
                </div>
              )}
            </div>

            <dl className="mt-6 grid gap-3 text-sm">
              <div className="flex items-center justify-between gap-4 rounded-xl bg-secondary/60 px-4 py-3">
                <dt className="text-muted-foreground">Size</dt>
                <dd className="font-semibold text-cocoa-800">{product.sizeNote}</dd>
              </div>
              <div className="flex items-center justify-between gap-4 rounded-xl bg-secondary/60 px-4 py-3">
                <dt className="text-muted-foreground">Customization</dt>
                <dd className="font-semibold text-cocoa-800">Size, flavor, filling &amp; message</dd>
              </div>
            </dl>

            <div className="mt-8 flex flex-wrap gap-3">
              <Button asChild size="lg">
                <Link href="/customize">
                  <Wand2 className="size-4" aria-hidden />
                  Customize this cake
                </Link>
              </Button>
              <EnquiryButtons product={product} />
            </div>

            {product.demo && (
              <div className="mt-6 flex items-start gap-2.5 text-sm text-muted-foreground">
                <BadgeCheck className="mt-0.5 size-4 shrink-0 text-brand-500" aria-hidden />
                <p>
                  This is a sample presentation — the photo, name and details are placeholders ready to be replaced with
                  Daisy&apos;s real cakes and photography.
                </p>
              </div>
            )}
          </Reveal>
        </div>
      </div>

      {related.length > 0 && (
        <section className="mt-20">
          <Reveal>
            <div className="flex items-end justify-between">
              <div>
                <p className="eyebrow">More {category?.name ?? "cakes"}</p>
                <h2 className="mt-2 font-display text-2xl font-semibold text-cocoa-900 sm:text-3xl">
                  You may also like
                </h2>
              </div>
            </div>
          </Reveal>
          <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {related.map((p, i) => (
              <Reveal key={p.slug} delay={i * 0.06}>
                <CakeCard product={p} />
              </Reveal>
            ))}
          </div>
          <Separator className="mt-10" />
        </section>
      )}
    </div>
  );
}