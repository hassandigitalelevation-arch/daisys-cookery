"use client";

import Image from "next/image";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

type LightboxProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  src?: string | null;
  alt?: string;
  caption?: string;
};

/** Accessible image lightbox used by the gallery. */
export function Lightbox({ open, onOpenChange, src, alt = "", caption }: LightboxProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl gap-2 border-0 bg-cocoa-900 p-3 sm:p-4">
        <DialogHeader>
          <DialogTitle className="sr-only">{alt || "Photo"}</DialogTitle>
          <DialogDescription className="sr-only">{caption || alt || "Gallery image"}</DialogDescription>
        </DialogHeader>
        {src && (
          <Image
            src={src}
            alt={alt}
            width={1200}
            height={1500}
            className="max-h-[80vh] w-full rounded-xl object-contain"
          />
        )}
        {caption && <p className="px-2 pb-1 text-center text-sm text-white/80">{caption}</p>}
      </DialogContent>
    </Dialog>
  );
}