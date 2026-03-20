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
    <div className={cn("rounded-[24px] border border-dashed border-[var(--border)] px-4 py-6 text-center", className)}>
      {icon ? <div className="mb-3 flex justify-center text-[var(--muted-foreground)]">{icon}</div> : null}
      <p className="text-sm font-medium text-[var(--foreground)]">{title}</p>
      <p className="mt-2 text-sm text-[var(--muted-foreground)]">{description}</p>
      {action ? (
        <button type="button" onClick={action.onClick} className={buttonVariants({ variant: "outline", className: "mt-4" })}>
          {action.label}
        </button>
      ) : null}
    </div>
  );
}
