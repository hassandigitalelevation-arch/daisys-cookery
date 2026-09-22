import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { site } from "@/data/site";

export function Logo({ className, href = "/" }: { className?: string; href?: string }) {
  return (
    <Link href={href} className={cn("inline-flex items-center gap-3", className)} aria-label={`${site.name} — home`}>
      <Image
        src={site.logo.src}
        alt={site.logo.alt}
        width={44}
        height={44}
        className="size-11 rounded-full object-cover shadow-sm ring-1 ring-cocoa-100"
      />
      <span className="flex flex-col leading-none">
        <span className="flex items-baseline gap-1.5">
          <span className="font-display text-lg font-semibold tracking-tight text-cocoa-900">Daisy&apos;s</span>
          <span className="font-script text-[1.55rem] leading-none text-brand-500">Cookery</span>
        </span>
        <span className="mt-1 hidden text-[10px] font-semibold uppercase tracking-[0.28em] text-muted-foreground sm:block">
          Celebration Cakes
        </span>
      </span>
    </Link>
  );
}