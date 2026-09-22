import Link from "next/link";
import { MessageCircle } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/motion/reveal";
import { site } from "@/data/site";

/** Conversion band: funnel visitors into the Cake Studio. */
export function CtaPanel() {
  return (
    <section className="shell py-16 sm:py-24">
      <Reveal>
        <div className="relative overflow-hidden rounded-[2rem] bg-cocoa-900 p-8 text-cream shadow-hero sm:p-14">
          <div className="pointer-events-none absolute -right-16 -top-16 size-72 rounded-full bg-brand-500/25 blur-2xl" aria-hidden />
          <div className="pointer-events-none absolute -bottom-20 left-1/3 size-72 rounded-full bg-brand-600/15 blur-3xl" aria-hidden />
          <div className="relative max-w-2xl">
            <p className="eyebrow text-brand-300">Your cake, your way</p>
            <h2 className="mt-3 font-display text-3xl font-semibold leading-tight tracking-[-0.015em] text-white sm:text-4xl lg:text-5xl">
              Dream it, design it, and let{" "}
              <span className="font-script text-[1.14em] font-bold leading-[1.05] tracking-normal text-brand-400">
                Daisy&apos;s bake it.
              </span>
            </h2>
            <p className="mt-4 max-w-xl text-base leading-relaxed text-cream/85">
              Choose the size, flavor, filling, shape and message — then send us your design for a quick confirmation.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button asChild size="lg" variant="white" className="shadow-lg">
                <Link href="/customize">Create Your Cake</Link>
              </Button>
              <Button asChild size="lg" variant="ghost" className="rounded-full border border-cream/30 text-cream hover:bg-white/10 hover:text-white">
                <a href={site.social.facebook} target="_blank" rel="noopener noreferrer">
                  <MessageCircle className="size-4" aria-hidden />
                  Message us
                </a>
              </Button>
            </div>
          </div>
        </div>
      </Reveal>
    </section>
  );
}