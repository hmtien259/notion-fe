import { ReactNode } from "react";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/shared/lib/utils";

interface StateCardProps {
  title: string;
  description: string;
  action?: {
    label: string;
    onClick: () => void;
  };
  icon?: ReactNode;
  className?: string;
}

export function StateCard({ title, description, action, icon, className }: StateCardProps) {
  return (
    <div
      className={cn(
        "surface-card animate-fade-up rounded-[24px] border border-dashed border-[var(--border)] px-5 py-7 text-center",
        className,
      )}
    >
      {icon ? (
        <div className="mx-auto mb-3 flex h-11 w-11 items-center justify-center rounded-2xl border border-[var(--border)] bg-[var(--surface-elevated)] text-[var(--muted-foreground)]">
          {icon}
        </div>
      ) : null}
      <p className="text-sm font-semibold text-[var(--foreground)]">{title}</p>
      <p className="mt-2 text-sm leading-7 text-[var(--muted-foreground)]">{description}</p>
      {action ? (
        <button
          type="button"
          onClick={action.onClick}
          className={buttonVariants({ variant: "outline", className: "mt-5 hover-lift" })}
        >
          {action.label}
        </button>
      ) : null}
    </div>
  );
}
