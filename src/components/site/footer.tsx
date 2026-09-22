import Link from "next/link";
import { Phone, Clock } from "lucide-react";
import { FacebookIcon, InstagramIcon } from "@/components/ui/brand-icons";

import { Logo } from "@/components/site/logo";
import { site } from "@/data/site";
import { categories } from "@/data/categories";

const exploreLinks = [
  { label: "All Cakes", href: "/cakes" },
  { label: "Create Your Cake", href: "/customize" },
  { label: "Gallery", href: "/gallery" },
  { label: "Order / Enquiry", href: "/order" },
  { label: "FAQ", href: "/faq" },
];

export function SiteFooter() {
  return (
    <footer className="border-t border-border bg-cocoa-900 text-cocoa-100">
      <div className="shell grid gap-10 py-14 sm:grid-cols-2 lg:grid-cols-4 lg:py-20">
        <div className="space-y-4">
          <div className="flex items-center gap-3 text-white">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={site.logo.src}
              alt={site.logo.alt}
              className="size-12 rounded-full object-cover ring-1 ring-white/20"
            />
            <span className="font-display text-lg font-semibold tracking-tight">
              Daisy&apos;s <span className="text-brand-300">Cookery</span>
            </span>
          </div>
          <p className="max-w-xs text-sm leading-relaxed text-cocoa-300">{site.tagline}</p>
          <div className="flex flex-wrap gap-2.5">
            <a
              href={site.social.facebook}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full border border-white/15 px-4 py-2 text-sm font-semibold text-white transition-colors hover:border-brand-400 hover:text-brand-300"
            >
              <FacebookIcon className="size-4" />
              Follow us on Facebook
            </a>
            <a
              href={site.social.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full border border-white/15 px-4 py-2 text-sm font-semibold text-white transition-colors hover:border-brand-400 hover:text-brand-300"
            >
              <InstagramIcon className="size-4" />
              Instagram
            </a>
          </div>
        </div>

        <div>
          <h3 className="text-sm font-bold uppercase tracking-[0.18em] text-cocoa-300">Cakes</h3>
          <ul className="mt-4 space-y-2.5 text-sm">
            {categories.map((c) => (
              <li key={c.slug}>
                <Link href={`/cakes?cat=${c.slug}`} className="text-cocoa-100 transition-colors hover:text-brand-300">
                  {c.name}
                </Link>
              </li>
            ))}
            <li>
              <Link href="/cakes" className="text-cocoa-100 transition-colors hover:text-brand-300">
                All Cakes
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <h3 className="text-sm font-bold uppercase tracking-[0.18em] text-cocoa-300">Explore</h3>
          <ul className="mt-4 space-y-2.5 text-sm">
            {exploreLinks.map((l) => (
              <li key={l.href}>
                <Link href={l.href} className="text-cocoa-100 transition-colors hover:text-brand-300">
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="text-sm font-bold uppercase tracking-[0.18em] text-cocoa-300">Find us</h3>
          <ul className="mt-4 space-y-3 text-sm">
            <li className="flex items-start gap-2.5">
              <Clock className="mt-0.5 size-4 shrink-0 text-brand-300" aria-hidden />
              <span className="text-cocoa-100">
                {site.contact.hours.map((h) => (
                  <span key={h.days} className="block">
                    <span className="font-semibold text-white">{h.days}:</span> {h.time}
                  </span>
                ))}
              </span>
            </li>
            <li>
              <a href={site.contact.phoneHref} className="flex items-center gap-2.5 text-cocoa-100 transition-colors hover:text-brand-300">
                <Phone className="size-4 shrink-0 text-brand-300" aria-hidden />
                {site.contact.phoneDisplay}
              </a>
            </li>
            <li className="text-cocoa-200">{site.contact.address}</li>
          </ul>
        </div>
      </div>
      <div className="border-t border-white/10 py-5 text-xs text-cocoa-400">
        <div className="shell flex flex-col items-center justify-between gap-2 sm:flex-row">
          <p>© {new Date().getFullYear()} {site.name}. All rights reserved.</p>
          <p>Demo preview — not the bakery&apos;s live site.</p>
        </div>
      </div>
    </footer>
  );
}