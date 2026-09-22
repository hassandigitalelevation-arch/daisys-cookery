import * as React from "react";
import { Slot } from "radix-ui/slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-full text-sm font-semibold transition-colors duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[color:var(--ring)] disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-[1.1em] [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default: "bg-brand-500 text-cocoa-900 shadow-sm hover:bg-brand-600",
        outline:
          "border border-cocoa-200 bg-transparent text-cocoa-800 hover:border-brand-300 hover:bg-brand-50",
        secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/70",
        ghost: "text-cocoa-700 hover:bg-cocoa-100/60",
        link: "text-brand-600 underline-offset-4 hover:underline",
        white: "bg-white text-cocoa-900 shadow-sm hover:bg-brand-50",
      },
      size: {
        default: "h-10 px-5",
        sm: "h-9 rounded-full px-4 text-xs",
        md: "h-11 px-6",
        lg: "h-12 px-7 text-base",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp className={cn(buttonVariants({ variant, size, className }))} ref={ref} {...props} />
    );
  }
);
Button.displayName = "Button";

export { Button, buttonVariants };