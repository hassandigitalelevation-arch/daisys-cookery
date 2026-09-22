"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, ChevronDown } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Logo } from "@/components/site/logo";
import { NAV_ITEMS, site } from "@/data/site";
import { cn } from "@/lib/utils";

export function SiteHeader() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const isActive = (href: string) => (href === "/" ? pathname === "/" : pathname.startsWith(href));

  return (
    <header
      className={cn(
        "sticky top-0 z-40 border-b transition-colors duration-300",
        scrolled
          ? "border-border bg-background/90 backdrop-blur-md"
          : "border-transparent bg-background/60 backdrop-blur-sm"
      )}
    >
      <div className="shell flex h-16 items-center justify-between gap-4 lg:h-[72px]">
        <Logo />

        <nav className="hidden items-center gap-0.5 lg:flex" aria-label="Primary">
          {NAV_ITEMS.map((item) => {
            if (item.children) {
              const active = pathname.startsWith(item.href);
              return (
                <div key={item.href} className="group relative">
                  <Link
                    href={item.href}
                    aria-haspopup="true"
                    aria-expanded="false"
                    className={cn(
                      "flex items-center gap-1 rounded-full px-3.5 py-2 text-sm font-semibold transition-colors hover:text-brand-600",
                      active ? "text-brand-600" : "text-cocoa-700"
                    )}
                  >
                    {item.label}
                    <ChevronDown className="size-3.5 opacity-60 transition-transform group-hover:rotate-180 group-focus-within:rotate-180" />
                  </Link>
                  <div
                    className="invisible absolute left-0 top-full pt-2 opacity-0 transition-all duration-200 group-focus-within:visible group-focus-within:opacity-100 group-hover:visible group-hover:opacity-100"
                    role="menu"
                  >
                    <div className="w-64 rounded-2xl border border-border bg-card p-2 shadow-lift">
                      {item.children.map((child) => (
                        <Link
                          key={child.href}
                          href={child.href}
                          role="menuitem"
                          className={cn(
                            "block rounded-xl px-4 py-3 transition-colors hover:bg-brand-50",
                            isActive(child.href) && "bg-brand-50"
                          )}
                        >
                          <span className="block text-sm font-semibold text-cocoa-800">{child.label}</span>
                          {child.description && (
                            <span className="mt-0.5 block text-xs text-muted-foreground">{child.description}</span>
                          )}
                        </Link>
                      ))}
                    </div>
                  </div>
                </div>
              );
            }
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "rounded-full px-3.5 py-2 text-sm font-semibold transition-colors",
                  isActive(item.href) ? "text-brand-600" : "text-cocoa-700 hover:text-brand-600"
                )}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-2">
          <Button asChild size="sm" className="hidden sm:inline-flex lg:hidden xl:inline-flex">
            <Link href="/customize">Create Your Cake</Link>
          </Button>
          <Dialog open={menuOpen} onOpenChange={setMenuOpen}>
            <DialogTrigger asChild>
              <Button variant="outline" size="icon" className="lg:hidden" aria-label="Open menu">
                <Menu className="size-5" />
              </Button>
            </DialogTrigger>
            <DialogContent className="top-[6px] translate-y-0 max-w-md rounded-2xl sm:max-w-md">
              <DialogTitle className="sr-only">{site.name} menu</DialogTitle>
              <DialogDescription className="sr-only">Site navigation</DialogDescription>
              <nav className="mt-2 flex flex-col gap-1" aria-label="Mobile">
                {NAV_ITEMS.map((item) =>
                  item.children ? (
                    <div key={item.href} className="rounded-xl bg-secondary/70 p-3">
                      <Link
                        href={item.href}
                        onClick={() => setMenuOpen(false)}
                        className="text-sm font-bold text-cocoa-900"
                      >
                        {item.label}
                      </Link>
                      <div className="mt-2 flex flex-col gap-1">
                        {item.children.map((child) => (
                          <Link
                            key={child.href}
                            href={child.href}
                            onClick={() => setMenuOpen(false)}
                            className="rounded-lg px-2 py-1.5 text-sm text-muted-foreground hover:bg-card hover:text-cocoa-800"
                          >
                            {child.label}
                          </Link>
                        ))}
                      </div>
                    </div>
                  ) : (
                    <Link
                      key={item.href}
                      href={item.href}
                      onClick={() => setMenuOpen(false)}
                      className="rounded-xl px-3 py-2.5 text-sm font-semibold text-cocoa-800 hover:bg-brand-50"
                    >
                      {item.label}
                    </Link>
                  )
                )}
                <Button asChild size="lg" className="mt-2" onClick={() => setMenuOpen(false)}>
                  <Link href="/customize">Create Your Cake</Link>
                </Button>
              </nav>
            </DialogContent>
          </Dialog>
        </div>
      </div>
    </header>
  );
}