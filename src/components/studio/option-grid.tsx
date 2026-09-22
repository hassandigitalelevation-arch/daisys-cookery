"use client";

import Image from "next/image";
import { Check } from "lucide-react";
import { motion } from "framer-motion";

import { cn } from "@/lib/utils";
import type { StudioOption } from "@/data/customize";

type OptionGridProps = {
  options: readonly StudioOption[];
  selected?: string;
  onSelect: (id: string) => void;
  /** "image" shows previews (cake designs); "swatch" shows colour dots */
  mode?: "default" | "image" | "swatch";
};

/** Accessible grid of selectable choices for a Cake Studio step. */
export function OptionGrid({ options, selected, onSelect, mode = "default" }: OptionGridProps) {
  const isImage = mode === "image";
  const isSwatch = mode === "swatch";

  return (
    <div
      role="radiogroup"
      aria-label="Select an option"
      className={cn(
        "grid gap-3",
        isSwatch ? "grid-cols-3 sm:grid-cols-5" : "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3"
      )}
    >
      {options.map((option) => {
        const active = selected === option.id;
        const OptionClass = cn(
          "group relative flex h-full w-full text-left transition-all duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[color:var(--ring)]",
          isImage ? "rounded-2xl" : "rounded-2xl border bg-card",
          isSwatch ? "items-center gap-3 border px-4 py-3" : isImage ? "" : "flex-col p-4",
          active
            ? "border-brand-500 ring-2 ring-brand-500/60"
            : "border-border hover:border-brand-300 hover:shadow-card"
        );

        return (
          <button
            key={option.id}
            type="button"
            role="radio"
            aria-checked={active}
            aria-label={`${option.label}${option.description ? ` — ${option.description}` : ""}`}
            onClick={() => onSelect(option.id)}
            className={OptionClass}
          >
            {isImage ? (
              <div className="relative overflow-hidden rounded-2xl border border-border">
                {option.image ? (
                  <Image
                    src={option.image}
                    alt={option.label}
                    width={640}
                    height={640}
                    className={cn(
                      "aspect-square w-full object-cover transition-transform duration-500 group-hover:scale-105",
                      active ? "saturate-100" : "saturate-[0.92]"
                    )}
                  />
                ) : (
                  <div className="flex aspect-square w-full items-center justify-center bg-secondary text-4xl" aria-hidden>
                    🎂
                  </div>
                )}
                <div className="absolute inset-x-0 bottom-0 flex items-end justify-between bg-gradient-to-t from-cocoa-900/70 to-transparent p-3">
                  <span className="text-sm font-semibold text-white">{option.label}</span>
                  {option.description && (
                    <span className="text-[11px] text-white/80">{option.description}</span>
                  )}
                </div>
                {active && (
                  <motion.span
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="absolute right-3 top-3 flex size-7 items-center justify-center rounded-full bg-brand-500 text-white shadow"
                  >
                    <Check className="size-4" aria-hidden />
                  </motion.span>
                )}
              </div>
            ) : (
              <>
                {isSwatch ? (
                  <span
                    className="size-6 shrink-0 rounded-full ring-1 ring-inset ring-black/10"
                    style={{ backgroundColor: option.swatch ?? "#e8661f" }}
                    aria-hidden
                  />
                ) : null}
                <span className="flex-1">
                  <span className="block text-sm font-semibold text-cocoa-800">{option.label}</span>
                  {option.description && !isSwatch && (
                    <span className="mt-0.5 block text-xs leading-relaxed text-muted-foreground">
                      {option.description}
                    </span>
                  )}
                  {option.note && (
                    <span className="mt-1 block text-[11px] font-medium uppercase tracking-wide text-brand-600">
                      {option.note}
                    </span>
                  )}
                </span>
                <span
                  className={cn(
                    "ml-auto flex size-6 shrink-0 items-center justify-center rounded-full border transition-colors",
                    active ? "border-brand-500 bg-brand-500 text-white" : "border-cocoa-200"
                  )}
                  aria-hidden
                >
                  {active && <Check className="size-3.5" />}
                </span>
              </>
            )}
          </button>
        );
      })}
    </div>
  );
}