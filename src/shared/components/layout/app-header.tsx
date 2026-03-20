import { ReactNode } from "react";
import { Search } from "lucide-react";
import { ThemeToggle } from "@/shared/components/theme/theme-toggle";

interface AppHeaderProps {
  title: ReactNode;
  description: ReactNode;
}

export function AppHeader({ title, description }: AppHeaderProps) {
  return (
    <header className="surface-card flex flex-col gap-4 rounded-[28px] border border-[var(--border)] px-5 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-6">
      <div>
        <p className="text-xs uppercase tracking-[0.22em] text-[var(--muted-foreground)]">Workspace</p>
        <h2 className="mt-2 text-2xl font-semibold text-[var(--foreground)]">{title}</h2>
        <p className="mt-1 text-sm text-[var(--muted-foreground)]">{description}</p>
      </div>

      <div className="flex items-center gap-3">
        <div className="hidden items-center gap-2 rounded-full border border-[var(--border)] bg-[var(--header)] px-3 py-2 text-sm text-[var(--muted-foreground)] md:flex">
          <Search className="h-4 w-4" />
          Search will be added next
        </div>
        <ThemeToggle />
      </div>
    </header>
  );
}

