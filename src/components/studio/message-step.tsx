"use client";

import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import { studioConfig } from "@/data/customize";
import { useStudio } from "./studio-store";

export function MessageStep() {
  const { selection, setMessage, setMessageStyle } = useStudio();
  const limit = studioConfig.messageCharLimit;
  const style =
    studioConfig.messageStyles.find((s) => s.id === selection.messageStyle) ??
    studioConfig.messageStyles[0];

  return (
    <div className="space-y-8">
      <div>
        <div className="flex items-baseline justify-between gap-4">
          <Label htmlFor="cake-message" className="text-base">
            Message on your cake
          </Label>
          <span
            className={cn(
              "text-xs font-semibold tabular-nums",
              selection.message.length > limit ? "text-destructive" : "text-muted-foreground"
            )}
          >
            {selection.message.length}/{limit}
          </span>
        </div>
        <Textarea
          id="cake-message"
          name="cake-message"
          value={selection.message}
          maxLength={limit * 2}
          onChange={(e) => setMessage(e.target.value.slice(0, limit))}
          placeholder="Happy Birthday! · Hamid & Nadia · Happy Anniversary…"
          className="mt-3"
          aria-describedby="cake-message-hint"
        />
        <p id="cake-message-hint" className="mt-2 text-xs text-muted-foreground">
          Short and sweet works best — up to {limit} characters.
        </p>
      </div>

      <fieldset>
        <legend className="text-base font-semibold text-cocoa-800">Message color</legend>
        <div className="mt-3 flex flex-wrap gap-2.5">
          {studioConfig.messageStyles.map((s) => {
            const active = selection.messageStyle === s.id;
            return (
              <button
                key={s.id}
                type="button"
                onClick={() => setMessageStyle(s.id)}
                aria-pressed={active}
                aria-label={`Message color ${s.label}`}
                className={cn(
                  "flex items-center gap-2 rounded-full border px-3.5 py-2 text-sm font-semibold transition-all",
                  active
                    ? "border-brand-500 bg-brand-50 text-cocoa-900 ring-2 ring-brand-500/50"
                    : "border-border bg-card text-cocoa-700 hover:border-brand-300"
                )}
              >
                <span
                  className="size-4 rounded-full ring-1 ring-inset ring-black/10"
                  style={{ backgroundColor: s.swatch }}
                  aria-hidden
                />
                {s.label}
              </button>
            );
          })}
        </div>
      </fieldset>

      <div>
        <Label className="text-base">Live preview</Label>
        <div className="mt-3 flex items-center justify-center rounded-2xl bg-gradient-to-br from-blush via-cream to-sand px-6 py-10">
          <div className="flex h-44 w-44 items-center justify-center rounded-full bg-[radial-gradient(circle_at_30%_25%,_#fff,_,_#f3d5b8)] shadow-hero [border:10px_solid_#f4dfcf]">
            <p
              className="max-w-[7.5rem] px-2 text-center font-display text-lg font-semibold leading-tight break-words"
              style={{ color: style.swatch }}
            >
              {selection.message || "Your message here"}
            </p>
          </div>
        </div>
        <p className="mt-2 text-center text-xs text-muted-foreground">
          Preview / reference — the final lettering is styled by the bakery.
        </p>
      </div>
    </div>
  );
}