"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { ClipboardCopy, Check, RefreshCcw } from "lucide-react";
import { FacebookIcon } from "@/components/ui/brand-icons";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { studioConfig, optionLabel } from "@/data/customize";
import { buildEnquiryMessage, whatsappUrl, messageStyleLabel } from "@/lib/order";
import { site } from "@/data/site";
import { useStudio } from "./studio-store";

export function CakeReview() {
  const { selection, setCurrentStep, reset } = useStudio();
  const [copied, setCopied] = useState(false);

  const design = studioConfig.designs.find((d) => d.id === selection.design);
  const style = studioConfig.messageStyles.find((s) => s.id === selection.messageStyle);
  const message = buildEnquiryMessage({
    viaStudio: true,
    selection,
    name: selection.name,
    phone: selection.phone,
    preferredDate: selection.preferredDate,
    notes: selection.notes,
  });
  const waUrl = whatsappUrl(message);

  async function copySummary() {
    try {
      await navigator.clipboard.writeText(message);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      setCopied(false);
    }
  }

  const summaryRows: [string, string][] = [
    ["Size", optionLabel("size", selection.size)],
    ["Flavor", optionLabel("flavor", selection.flavor)],
    ["Cream / filling", optionLabel("cream", selection.cream)],
    ["Fruit filling", optionLabel("fruitFilling", selection.fruitFilling)],
    ["Shape", optionLabel("shape", selection.shape)],
    ["Design", optionLabel("design", selection.design)],
  ];

  return (
    <div id="review" className="grid grid-cols-1 gap-8 lg:grid-cols-2">
      {/* Preview */}
      <div className="space-y-6">
        <div>
          <p className="eyebrow">Preview / reference</p>
          <h3 className="mt-2 font-display text-2xl font-semibold text-cocoa-900">
            This is what we&apos;ll aim for
          </h3>
          <p className="mt-2 text-sm text-muted-foreground">
            A visual summary of your selections — the bakery styles the finished cake. The final result may differ
            slightly from this reference.
          </p>
        </div>
        <div className="relative overflow-hidden rounded-[1.75rem] bg-gradient-to-br from-blush to-sand shadow-hero">
          {design?.image ? (
            <Image
              src={design.image}
              alt={`Design ${design.id}`}
              width={640}
              height={640}
              className="aspect-square w-full object-cover"
            />
          ) : (
            <div className="flex aspect-square w-full items-center justify-center">
              <span className="font-display text-6xl">🎂</span>
            </div>
          )}
          <div className="absolute inset-0 flex items-end justify-center bg-gradient-to-t from-cocoa-900/70 via-transparent to-transparent p-8">
            <p
              className="max-w-xs text-center font-display text-2xl font-semibold leading-snug break-words drop-shadow sm:text-3xl"
              style={{ color: style?.swatch === "#ffffff" ? "#ffffff" : style?.swatch ?? "#4a3324" }}
            >
              {selection.message || "Your message"}
            </p>
          </div>
        </div>
        {design && (
          <p className="text-xs text-muted-foreground">
            Design: {design.label} · {design.description}. Message in {messageStyleLabel(selection.messageStyle)}.
          </p>
        )}
      </div>

      {/* Summary + contact */}
      <div>
        <div className="rounded-3xl border border-border bg-card p-6 shadow-card sm:p-8">
          <h3 className="font-display text-xl font-semibold text-cocoa-900">Your cake</h3>
          <dl className="mt-5 grid grid-cols-2 gap-x-4 gap-y-4">
            {summaryRows.map(([label, value]) => (
              <div key={label}>
                <dt className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">{label}</dt>
                <dd className="mt-1 text-sm font-medium text-cocoa-800">{value || "—"}</dd>
              </div>
            ))}
          </dl>
          {selection.referenceImage && (
            <p className="mt-4 rounded-xl bg-secondary px-4 py-3 text-sm text-secondary-foreground">
              Reference image attached: <span className="font-semibold">{selection.referenceImage.name}</span>
            </p>
          )}
          <Separator className="my-6" />
          <div className="flex items-baseline justify-between">
            <p className="text-sm text-muted-foreground">Estimated price</p>
            <p className="font-display text-2xl font-semibold text-cocoa-900">
              {studioConfig.priceMode === "quote" ? "To be quoted" : "—"}
            </p>
          </div>
        </div>

        <form className="mt-6 space-y-4 rounded-3xl border border-border bg-card p-6 shadow-card sm:p-8">
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <Label htmlFor="review-name">Your name</Label>
              <Input
                id="review-name"
                value={selection.name}
                onChange={(e) => useStudio.getState().setDetail("name", e.target.value)}
                placeholder="e.g. Tanvir"
                autoComplete="name"
                className="mt-2"
              />
            </div>
            <div>
              <Label htmlFor="review-phone">Phone number</Label>
              <Input
                id="review-phone"
                type="tel"
                value={selection.phone}
                onChange={(e) => useStudio.getState().setDetail("phone", e.target.value)}
                placeholder="01XXXXXXXXX"
                autoComplete="tel"
                className="mt-2"
              />
            </div>
          </div>
          <div>
            <Label htmlFor="review-date">When do you need it?</Label>
            <Input
              id="review-date"
              type="date"
              value={selection.preferredDate}
              onChange={(e) => useStudio.getState().setDetail("preferredDate", e.target.value)}
              className="mt-2"
            />
          </div>
          <div>
            <Label htmlFor="review-notes">Anything else? (optional)</Label>
            <Textarea
              id="review-notes"
              value={selection.notes}
              onChange={(e) => useStudio.getState().setDetail("notes", e.target.value)}
              placeholder="Theme, occasion, extra details…"
              className="mt-2"
            />
          </div>

          <div className="space-y-2 pt-2">
            {waUrl ? (
              <Button asChild size="lg" className="w-full">
                <a href={waUrl} target="_blank" rel="noopener noreferrer">
                  Send order request on WhatsApp
                </a>
              </Button>
            ) : (
              <>
                <Button size="lg" className="w-full" onClick={copySummary}>
                  {copied ? (
                    <>
                      <Check className="size-4" aria-hidden /> Copied to clipboard
                    </>
                  ) : (
                    <>
                      <ClipboardCopy className="size-4" aria-hidden /> Copy order summary
                    </>
                  )}
                </Button>
                <Button asChild size="lg" variant="outline" className="w-full">
                  <a href={site.social.facebook} target="_blank" rel="noopener noreferrer">
                    <FacebookIcon className="size-4" />
                    Send via Facebook page
                  </a>
                </Button>
              </>
            )}
            <p className="px-2 text-center text-xs text-muted-foreground">
              Your message opens in WhatsApp to the bakery ({site.contact.phoneDisplay}). Attach your reference
              photo there if you have one.
            </p>
          </div>
        </form>

        <div className="mt-6 flex flex-wrap items-center justify-between gap-3">
          <Button variant="ghost" onClick={() => setCurrentStep(6)}>
            ← Back to cake
          </Button>
          <Button variant="ghost" onClick={reset}>
            <RefreshCcw className="size-4" aria-hidden />
            Start a new cake
          </Button>
        </div>
        <p className="mt-4 text-center text-xs text-muted-foreground">
          This is an enquiry request — it becomes an order once the bakery confirms availability and price.{" "}
          <Link href="/contact" className="font-semibold text-brand-600 hover:underline">
            Contact us
          </Link>{" "}
          for anything else.
        </p>
      </div>
    </div>
  );
}