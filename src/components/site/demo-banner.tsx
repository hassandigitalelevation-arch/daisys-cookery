import { Info } from "lucide-react";
import { site } from "@/data/site";

export function DemoBanner() {
  if (!site.demoMode) return null;
  return (
    <div className="bg-cocoa-900 px-4 py-2 text-center text-xs font-medium text-brand-100">
      <p className="mx-auto flex max-w-4xl items-center justify-center gap-2">
        <Info className="size-3.5 shrink-0" aria-hidden />
        <span>{site.demoNotice}</span>
      </p>
    </div>
  );
}