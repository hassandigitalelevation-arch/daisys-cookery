"use client";

import { Link2, Pencil, RefreshCcw, ChefHat } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { optionLabel, studioConfig } from "@/data/customize";
import { useStudio } from "./studio-store";

type KeyOfSelection = "size" | "flavor" | "cream" | "fruitFilling" | "shape" | "design";

const KEY: Record<string, KeyOfSelection> = {
  size: "size",
  flavor: "flavor",
  cream: "cream",
  fruitFilling: "fruitFilling",
  shape: "shape",
  design: "design",
};

const rows: { stepId: string; label: string }[] = [
  { stepId: "shape", label: "Shape" },
  { stepId: "size", label: "Weight / size" },
  { stepId: "flavor", label: "Flavor" },
  { stepId: "cream", label: "Cream / filling" },
  { stepId: "fruitFilling", label: "Fruit filling" },
  { stepId: "design", label: "Theme" },
];

export function SummaryRail() {
  const { selection, currentStep, setCurrentStep, reset } = useStudio();
  const selectedCount = rows.filter((r) => selection[KEY[r.stepId]]).length;
  const quoting = studioConfig.priceMode === "quote";

  return (
    <aside className="rounded-3xl border border-border bg-card p-6 shadow-card">
      <div className="flex items-center justify-between">
        <h3 className="font-display text-lg font-semibold text-cocoa-900">Your cake</h3>
        <button
          type="button"
          onClick={reset}
          className="flex items-center gap-1 text-xs font-semibold text-muted-foreground transition-colors hover:text-brand-600"
        >
          <RefreshCcw className="size-3.5" aria-hidden />
          Start over
        </button>
      </div>

      <ul className="mt-5 space-y-3">
        {rows.map((row) => {
          const value = optionLabel(row.stepId, selection[KEY[row.stepId]]);
          const stepIndex = studioConfig.steps.findIndex((s) => s.id === row.stepId);
          const isCurrent = currentStep === stepIndex;
          return (
            <li key={row.stepId}>
              <button
                type="button"
                onClick={() => setCurrentStep(stepIndex)}
                className="group flex w-full items-center justify-between gap-3 text-left"
              >
                <span className="text-sm">
                  <span
                    className={
                      value
                        ? "font-semibold text-cocoa-800"
                        : "font-medium text-muted-foreground"
                    }
                  >
                    {value || <span className={isCurrent ? "text-brand-600" : ""}>Pick a size…</span>}
                  </span>
                  <span className="mt-0.5 block text-xs text-muted-foreground">{row.label}</span>
                </span>
                <Pencil className="size-3.5 shrink-0 text-cocoa-300 transition-colors group-hover:text-brand-500" aria-hidden />
              </button>
            </li>
          );
        })}
      </ul>

      <Separator className="my-5" />

      <div className="flex items-center justify-between gap-3">
        <div>
          <p className="text-sm text-muted-foreground">Estimated price</p>
          <p className="font-display text-xl font-semibold text-cocoa-900">
            {quoting ? "To be quoted" : "—"}
          </p>
        </div>
        <div className="flex items-center gap-1.5 rounded-full bg-secondary px-3 py-1.5 text-xs font-semibold text-secondary-foreground">
          <ChefHat className="size-3.5" aria-hidden />
          {selectedCount} of {rows.length} chosen
        </div>
      </div>
      {quoting && (
        <p className="mt-2 text-xs leading-relaxed text-muted-foreground">
          Prices depend on size, flavors and design detail — the bakery confirms the exact price with your enquiry.
        </p>
      )}

      <Button size="lg" className="mt-5 w-full" onClick={() => setCurrentStep(7)}>
        <Link2 className="size-4" aria-hidden />
        Review &amp; send
      </Button>
    </aside>
  );
}