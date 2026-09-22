"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import { ImageUp, ImageOff } from "lucide-react";

import { Button } from "@/components/ui/button";
import { studioConfig } from "@/data/customize";
import { useStudio } from "./studio-store";

const ACCEPTED = ["image/png", "image/jpeg", "image/webp", "image/gif"];

export function UploadStep() {
  const { selection, setReferenceImage } = useStudio();
  const inputRef = useRef<HTMLInputElement>(null);
  const [error, setError] = useState<string | null>(null);
  const maxBytes = studioConfig.uploadMaxMB * 1024 * 1024;

  function handleFile(file: File | undefined) {
    setError(null);
    if (!file) return;
    if (!ACCEPTED.includes(file.type)) {
      setError("Please upload a PNG, JPG, WEBP or GIF image.");
      return;
    }
    if (file.size > maxBytes) {
      setError(`That image is larger than ${studioConfig.uploadMaxMB} MB — please choose a smaller one.`);
      return;
    }
    const reader = new FileReader();
    reader.onload = () => {
      if (typeof reader.result === "string") {
        setReferenceImage({ dataUrl: reader.result, name: file.name });
      }
    };
    reader.readAsDataURL(file);
  }

  return (
    <div className="space-y-4">
      <div>
        <h3 className="text-base font-semibold text-cocoa-800">Upload your own cake design (optional)</h3>
        <p className="mt-1 text-sm text-muted-foreground">
          Have a photo of a design you like? Add it — it is used as a <strong>design reference</strong> for your
          enquiry, so the bakery can match the look as closely as possible.
        </p>
      </div>

      <input
        ref={inputRef}
        type="file"
        accept={ACCEPTED.join(",")}
        className="sr-only"
        id="reference-upload"
        aria-label="Upload a reference image"
        onChange={(e) => handleFile(e.target.files?.[0])}
      />

      {selection.referenceImage ? (
        <div className="flex items-center gap-4 rounded-2xl border border-border bg-card p-4">
          <div className="relative size-24 shrink-0 overflow-hidden rounded-xl bg-secondary">
            <Image src={selection.referenceImage.dataUrl} alt="Uploaded design reference" fill className="object-cover" />
          </div>
          <div className="min-w-0 flex-1">
            <p className="truncate text-sm font-semibold text-cocoa-800">{selection.referenceImage.name}</p>
            <p className="text-xs text-muted-foreground">Design reference attached.</p>
          </div>
          <Button
            variant="ghost"
            size="sm"
            type="button"
            onClick={() => {
              if (inputRef.current) inputRef.current.value = "";
              setReferenceImage(null);
            }}
          >
            <ImageOff className="size-4" aria-hidden />
            Remove
          </Button>
        </div>
      ) : (
        <button
          type="button"
          onClick={() => inputRef.current?.click()}
          className="flex w-full flex-col items-center gap-2 rounded-2xl border-2 border-dashed border-brand-200 bg-brand-50/50 px-6 py-10 text-center transition-colors hover:border-brand-400 hover:bg-brand-50"
        >
          <ImageUp className="size-8 text-brand-500" aria-hidden />
          <span className="text-sm font-semibold text-cocoa-800">Choose a reference photo</span>
          <span className="text-xs text-muted-foreground">
            PNG, JPG or WEBP · up to {studioConfig.uploadMaxMB} MB
          </span>
        </button>
      )}

      {error && <p className="text-sm font-medium text-destructive">{error}</p>}
    </div>
  );
}