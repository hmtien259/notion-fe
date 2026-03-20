"use client";

import { ReactNode } from "react";
import { Menu, Search } from "lucide-react";
import { ThemeToggle } from "@/shared/components/theme/theme-toggle";
import { useCommandPaletteStore } from "@/shared/components/navigation/command-palette-store";

interface AppHeaderProps {
  title: ReactNode;
  description: ReactNode;
  onToggleSidebar?: () => void;
}

export function AppHeader({ title, description, onToggleSidebar }: AppHeaderProps) {
  const openCommandPalette = useCommandPaletteStore((state) => state.open);

  return (
    <header className="surface-card flex flex-col gap-4 rounded-[28px] border border-[var(--border)] px-5 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-6">
      <div className="min-w-0">
        <div className="mb-3 flex items-center gap-2 lg:hidden">
          <button
            type="button"
            onClick={onToggleSidebar}
            className="flex h-10 w-10 items-center justify-center rounded-full border border-[var(--border)] bg-[var(--surface-elevated)] text-[var(--foreground)]"
            aria-label="Open sidebar"
          >
            <Menu className="h-4 w-4" />
          </button>
        </div>
        <p className="text-xs uppercase tracking-[0.22em] text-[var(--muted-foreground)]">Workspace</p>
        <div className="mt-2 text-2xl font-semibold text-[var(--foreground)]">{title}</div>
        <div className="mt-1 text-sm text-[var(--muted-foreground)]">{description}</div>
      </div>

      <div className="flex items-center gap-3">
        <button
          type="button"
          onClick={openCommandPalette}
          className="hidden items-center gap-2 rounded-full border border-[var(--border)] bg-[var(--header)] px-3 py-2 text-sm text-[var(--muted-foreground)] md:flex"
        >
          <Search className="h-4 w-4" />
          Search documents
          <span className="rounded-full border border-[var(--border)] px-2 py-0.5 text-xs">Ctrl K</span>
        </button>
        <ThemeToggle />
      </div>
    </header>
  );
}

