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
    <header className="surface-strong soft-glow animate-fade-up flex flex-col gap-5 rounded-[32px] border border-[var(--border)] px-5 py-5 sm:flex-row sm:items-end sm:justify-between sm:px-7">
      <div className="min-w-0">
        <div className="mb-3 flex items-center gap-2 lg:hidden">
          <button
            type="button"
            onClick={onToggleSidebar}
            className="flex h-10 w-10 items-center justify-center rounded-full border border-[var(--border)] bg-[var(--surface-elevated)] text-[var(--foreground)] shadow-sm"
            aria-label="Mở thanh bên"
          >
            <Menu className="h-4 w-4" />
          </button>
        </div>
        <p className="section-eyebrow">Không gian làm việc</p>
        <div className="mt-3 text-[1.9rem] font-semibold leading-tight text-[var(--foreground)]">{title}</div>
        <div className="mt-2 max-w-2xl text-sm leading-7 text-[var(--muted-foreground)]">{description}</div>
      </div>

      <div className="flex flex-wrap items-center gap-3">
        <button
          type="button"
          onClick={openCommandPalette}
          className="hover-lift hidden items-center gap-2 rounded-full border border-[var(--border)] bg-[var(--header)] px-4 py-2.5 text-sm text-[var(--muted-foreground)] transition hover:border-[var(--accent)]/40 hover:text-[var(--foreground)] md:flex"
        >
          <Search className="h-4 w-4" />
          Tìm tài liệu
          <span className="rounded-full border border-[var(--border)] px-2 py-0.5 text-xs">Ctrl K</span>
        </button>
        <ThemeToggle />
      </div>
    </header>
  );
}
