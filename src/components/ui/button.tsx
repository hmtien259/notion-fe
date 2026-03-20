import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/shared/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center rounded-xl text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--ring)] disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default: "bg-[var(--foreground)] px-4 py-2 text-[var(--card)] hover:opacity-90",
        ghost: "px-3 py-2 text-[var(--muted-foreground)] hover:bg-black/5 hover:text-[var(--foreground)]",
        outline:
          "border border-[var(--border)] bg-[var(--card)] px-4 py-2 text-[var(--foreground)] hover:bg-black/5",
      },
      size: {
        default: "h-10",
        sm: "h-8 rounded-lg px-3 text-xs",
        icon: "h-9 w-9 rounded-full",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, ...props }, ref) => {
    return <button className={cn(buttonVariants({ variant, size, className }))} ref={ref} {...props} />;
  },
);
Button.displayName = "Button";

export { Button, buttonVariants };

