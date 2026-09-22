"use client";

import { useEffect, useRef } from "react";
import { ArrowLeft, ArrowRight, LayoutGrid, Sparkles } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { cn } from "@/lib/utils";
import { studioConfig, stepOptions } from "@/data/customize";
import { useStudio } from "./studio-store";
import { OptionGrid } from "./option-grid";
import { MessageStep } from "./message-step";
import { UploadStep } from "./upload-step";
import { SummaryRail } from "./summary-rail";
import { CakeReview } from "./cake-review";
import { Cake3DPreview } from "./cake-3d-preview";

const STEP_COUNT = studioConfig.steps.length; // 7 choice steps
const REVIEW_INDEX = STEP_COUNT; // 7 → review view

type SelectableStep = "size" | "flavor" | "cream" | "fruitFilling" | "shape" | "design";

const STEP_KEY: Record<string, SelectableStep> = {
  size: "size",
  flavor: "flavor",
  cream: "cream",
  fruitFilling: "fruitFilling",
  shape: "shape",
  design: "design",
};

/** Drives the stepped product-configurator for custom cakes. */
export function CakeStudio() {
  const { currentStep, selection, setCurrentStep, selectOption } = useStudio();
  const regionRef = useRef<HTMLDivElement>(null);

  const isReview = currentStep === REVIEW_INDEX;
  const step = studioConfig.steps[Math.min(currentStep, STEP_COUNT - 1)];

  const selectedFor = (stepId: string) => (STEP_KEY[stepId] ? selection[STEP_KEY[stepId]] : "");

  const canContinue =
    isReview || step.kind === "message" ? true : Boolean(selectedFor(step.id));

  function goNext() {
    if (isReview) return;
    if (currentStep < STEP_COUNT - 1) setCurrentStep(currentStep + 1);
    else setCurrentStep(REVIEW_INDEX);
  }

  function goBack() {
    if (currentStep > 0) setCurrentStep(currentStep - 1);
  }

  // Focus the configurator region when the step changes (keyboard + SR support).
  useEffect(() => {
    regionRef.current?.focus();
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [currentStep]);

  const progress = isReview ? 100 : ((currentStep + 1) / (STEP_COUNT + 1)) * 100;

  return (
    <div className="relative">
      {/* Step header + progress */}
      <div className="shell pt-10 sm:pt-14">
        <p className="eyebrow">
          <Sparkles className="size-3.5" aria-hidden />
          Create your cake
        </p>
        <div className="mt-2 flex flex-wrap items-end justify-between gap-4">
          <div aria-live="polite">
            {isReview ? (
              <h1 className="font-display text-3xl font-semibold tracking-[-0.015em] text-cocoa-900 sm:text-4xl">
                Review &amp; send your cake
              </h1>
            ) : (
              <>
                <p className="text-sm font-semibold uppercase tracking-[0.22em] text-brand-600">
                  Step {currentStep + 1} of {STEP_COUNT}
                </p>
                <h1 className="mt-1 font-display text-3xl font-semibold tracking-[-0.015em] text-cocoa-900 sm:text-4xl">
                  {step.title}
                </h1>
                <p className="mt-1 text-sm text-muted-foreground">{step.subtitle}</p>
              </>
            )}
          </div>
          <div className="hidden items-center gap-3 lg:flex">
            <Button variant="outline" size="sm" onClick={goBack} disabled={currentStep === 0}>
              <ArrowLeft className="size-4" aria-hidden /> Back
            </Button>
            {!isReview && (
              <Button size="sm" onClick={goNext} disabled={!canContinue}>
                Continue <ArrowRight className="size-4" aria-hidden />
              </Button>
            )}
          </div>
        </div>
        <div className="mt-6 flex items-center gap-3">
          <Progress value={progress} className="h-2 flex-1" aria-hidden />
          <span className="w-10 text-xs font-semibold tabular-nums text-muted-foreground">{Math.round(progress)}%</span>
        </div>
      </div>

      {/* Step content */}
      <div className="shell py-10 sm:py-12">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-[minmax(0,1fr)_340px]">
          <div
            ref={regionRef}
            tabIndex={-1}
            className="rounded-3xl border border-border bg-card p-6 shadow-card focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 sm:p-8"
>
            <div className="mb-8">
              <Cake3DPreview />
            </div>
            {isReview ? (
              <CakeReview />
            ) : (
              <div className="space-y-8">
                {step.kind === "message" ? (
                  <div className="space-y-10">
                    <MessageStep />
                    <div className="rounded-2xl bg-sand/60 p-5">
                      <div className="flex items-center gap-2 text-sm font-semibold text-cocoa-800">
                        <LayoutGrid className="size-4 text-brand-500" aria-hidden />
                        Extra: add a reference image
                      </div>
                      <div className="mt-4">
                        <UploadStep />
                      </div>
                    </div>
                  </div>
                ) : (
                  <OptionGrid
                    options={stepOptions(step.id)}
                    selected={selectedFor(step.id) || undefined}
                    onSelect={(id) => selectOption(STEP_KEY[step.id], id)}
                    mode={step.id === "design" ? "image" : "default"}
                  />
                )}
              </div>
            )}

            {/* Step navigation (below content on desktop, above bottom bar on mobile) */}
            <div className="mt-8 flex items-center justify-between border-t border-border pt-6 lg:hidden">
              <Button variant="outline" onClick={goBack} disabled={currentStep === 0}>
                <ArrowLeft className="size-4" aria-hidden /> Back
              </Button>
              {!isReview && (
                <Button onClick={goNext} disabled={!canContinue}>
                  Continue <ArrowRight className="size-4" aria-hidden />
                </Button>
              )}
            </div>
          </div>

          <div className="hidden lg:block">
            <div className="sticky top-24">
              <SummaryRail />
            </div>
          </div>
        </div>
      </div>

      {/* Mobile sticky bar */}
      <div
        className={cn(
          "fixed inset-x-0 bottom-0 z-30 border-t border-border bg-background/95 backdrop-blur md:hidden",
          isReview && "hidden"
        )}
      >
        <div className="flex items-center justify-between gap-3 px-5 py-3">
          <span className="text-xs font-semibold text-muted-foreground">
            {step.title}
          </span>
          <Button size="sm" onClick={goNext} disabled={!canContinue}>
            Continue <ArrowRight className="size-4" aria-hidden />
          </Button>
        </div>
      </div>
      {!isReview && <div className="h-16 md:hidden" aria-hidden />}
    </div>
  );
}