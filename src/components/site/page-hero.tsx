import { Reveal } from "@/components/motion/reveal";
import { cn } from "@/lib/utils";

type PageHeroProps = {
  eyebrow: string;
  title: string;
  description?: string;
  tone?: "celebratory" | "joyful" | "elegant" | "neutral";
  children?: React.ReactNode;
};

const toneBg: Record<NonNullable<PageHeroProps["tone"]>, string> = {
  celebratory: "bg-gradient-to-b from-blush via-blush/60 to-transparent",
  joyful: "bg-gradient-to-b from-brand-100 via-brand-50 to-transparent",
  elegant: "bg-gradient-to-b from-cocoa-100 via-cocoa-50 to-transparent",
  neutral: "bg-gradient-to-b from-secondary/80 to-transparent",
};

export function PageHero({ eyebrow, title, description, tone = "neutral", children }: PageHeroProps) {
  return (
    <section className={cn("relative overflow-hidden pb-10 pt-16 sm:pb-14 sm:pt-20", toneBg[tone])}>
      <div className="shell relative z-10 max-w-3xl">
        <Reveal>
          <p className="eyebrow">{eyebrow}</p>
          <h1 className="mt-3 font-display text-4xl font-semibold leading-[1.05] tracking-[-0.015em] text-cocoa-900 sm:text-5xl lg:text-6xl">
            {title}
          </h1>
          {description && (
            <p className="mt-5 max-w-2xl text-lg leading-relaxed text-muted-foreground">{description}</p>
          )}
        </Reveal>
        {children}
      </div>
    </section>
  );
}