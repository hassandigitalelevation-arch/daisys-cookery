"use client";

import { Suspense, lazy } from "react";

const Cake3DViewer = lazy(() => import("./cake-3d-viewer").then((m) => ({ default: m.Cake3DViewer })));

function Cake3DSkeleton() {
  return (
    <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 animate-pulse" aria-hidden>
      <div className="flex size-24 items-center justify-center rounded-full bg-white/70 text-4xl shadow-card">🎂</div>
      <p className="text-xs font-semibold uppercase tracking-[0.18em] text-cocoa-400">Baking your preview…</p>
    </div>
  );
}

/** Lazy, client-only live 3D preview panel shown above every studio step. */
export function Cake3DPreview() {
  return (
    <section
      aria-label="Live 3D preview of your cake"
      className="overflow-hidden rounded-3xl border border-border bg-card shadow-card"
    >
      <div className="bg-[radial-gradient(circle_at_50%_30%,#ffffff,#f7ede3_62%,#f3dfc8)]">
        <div className="relative mx-auto aspect-square w-full max-w-md">
          <Suspense fallback={<Cake3DSkeleton />}>
            <Cake3DViewer />
          </Suspense>
        </div>
      </div>
      <p className="border-t border-border bg-cream/70 px-4 py-2.5 text-center text-xs font-medium text-muted-foreground">
        Live preview — drag the cake to spin it, updates as you choose
      </p>
    </section>
  );
}