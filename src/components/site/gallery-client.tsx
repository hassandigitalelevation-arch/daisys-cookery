"use client";

import { useState } from "react";
import Image from "next/image";

import { cn } from "@/lib/utils";
import { galleryItems, galleryTags } from "@/data/gallery";
import { Lightbox } from "@/components/site/lightbox";
import { Reveal } from "@/components/motion/reveal";

type Tag = (typeof galleryTags)[number];

export function GalleryClient() {
  const [activeTag, setActiveTag] = useState<Tag | "All">("All");
  const [open, setOpen] = useState<number | null>(null);

  const items =
    activeTag === "All" ? galleryItems : galleryItems.filter((i) => i.tag === activeTag);

  const shown = open !== null ? items[open] : null;

  return (
    <div>
      <div className="flex flex-wrap gap-2" role="group" aria-label="Filter gallery">
        {(["All", ...galleryTags] as const).map((tag) => {
          const active = activeTag === tag;
          return (
            <button
              key={tag}
              type="button"
              onClick={() => {
                setActiveTag(tag);
                setOpen(null);
              }}
              aria-pressed={active}
              className={cn(
                "rounded-full border px-4 py-1.5 text-sm font-semibold transition-colors",
                active
                  ? "border-brand-500 bg-brand-500 text-white"
                  : "border-border bg-card text-cocoa-700 hover:border-brand-300 hover:text-brand-600"
              )}
            >
              {tag}
            </button>
          );
        })}
      </div>

      <div className="mt-10 columns-1 gap-5 sm:columns-2 lg:columns-3 [&>*]:mb-5">
        {items.map((item, i) => (
          <Reveal key={`${item.src}-${item.tag}`} delay={(i % 3) * 0.05} className="break-inside-avoid">
            <button
              type="button"
              onClick={() => setOpen(i)}
              className="group relative block w-full overflow-hidden rounded-2xl border border-border bg-secondary shadow-card transition-shadow hover:shadow-lift focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[color:var(--ring)]"
              aria-label={`Open photo: ${item.alt}`}
            >
              <Image
                src={item.src}
                alt={item.alt}
                width={800}
                height={item.ratio === "tall" ? 1050 : 800}
                loading="lazy"
                className={cn(
                  "w-full object-cover transition-transform duration-700 group-hover:scale-[1.05]",
                  item.ratio === "tall" ? "aspect-[4/5]" : "aspect-square"
                )}
              />
              <span className="absolute left-3 top-3 rounded-full bg-black/45 px-3 py-1 text-xs font-semibold text-white backdrop-blur">
                {item.tag}
              </span>
              <span className="pointer-events-none absolute inset-0 bg-cocoa-900/0 transition-colors group-hover:bg-cocoa-900/10" />
            </button>
          </Reveal>
        ))}
      </div>

      <Lightbox
        open={open !== null}
        onOpenChange={(o) => setOpen(o ? open : null)}
        src={shown?.src ?? null}
        alt={shown?.alt}
        caption={shown?.tag ?? ""}
      />
    </div>
  );
}