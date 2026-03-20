"use client";

import Link from "next/link";
import { AlertCircle, Search } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { usePathname } from "next/navigation";
import { useDocumentNavigationQuery } from "@/features/documents/hooks/use-document-navigation";
import { StateCard } from "@/shared/components/feedback/state-card";
import { useDebounceValue } from "@/shared/hooks/use-debounce-value";
import { cn } from "@/shared/lib/utils";
import { useCommandPaletteStore } from "./command-palette-store";

export function DocumentCommandPalette() {
  const pathname = usePathname();
  const isOpen = useCommandPaletteStore((state) => state.isOpen);
  const close = useCommandPaletteStore((state) => state.close);
  const [query, setQuery] = useState("");
  const debouncedQuery = useDebounceValue(query, 120);
  const navigationQuery = useDocumentNavigationQuery();

  useEffect(() => {
    function handleKeydown(event: KeyboardEvent) {
      const isShortcut = (event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "k";

      if (isShortcut) {
        event.preventDefault();
        useCommandPaletteStore.getState().toggle();
      }

      if (event.key === "Escape") {
        close();
      }
    }

    window.addEventListener("keydown", handleKeydown);
    return () => window.removeEventListener("keydown", handleKeydown);
  }, [close]);

  useEffect(() => {
    if (!isOpen) {
      setQuery("");
    }
  }, [isOpen]);

  const results = useMemo(() => {
    if (!navigationQuery.data) {
      return [];
    }

    const normalizedQuery = debouncedQuery.trim().toLowerCase();

    if (!normalizedQuery) {
      return navigationQuery.data;
    }

    return navigationQuery.data.filter((item) =>
      `${item.title} ${item.breadcrumb.join(" ")}`.toLowerCase().includes(normalizedQuery),
    );
  }, [debouncedQuery, navigationQuery.data]);

  if (!isOpen) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-[60] bg-black/30 px-4 py-8 backdrop-blur-sm" onClick={close}>
      <div
        className="surface-card mx-auto w-full max-w-2xl rounded-[28px] border border-[var(--border)] p-4"
        onClick={(event) => event.stopPropagation()}
      >
        <div className="flex items-center gap-3 rounded-2xl border border-[var(--border)] bg-[var(--surface-elevated)] px-4 py-3">
          <Search className="h-4 w-4 text-[var(--muted-foreground)]" />
          <input
            autoFocus
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search documents or jump to a page"
            className="w-full bg-transparent outline-none placeholder:text-[var(--muted-foreground)]"
          />
          <span className="rounded-full border border-[var(--border)] px-2 py-0.5 text-xs text-[var(--muted-foreground)]">Esc</span>
        </div>

        <div className="mt-4 max-h-[60vh] overflow-y-auto">
          {navigationQuery.isLoading ? (
            <div className="space-y-2">
              <div className="h-14 animate-pulse rounded-2xl bg-black/6 dark:bg-white/8" />
              <div className="h-14 animate-pulse rounded-2xl bg-black/6 dark:bg-white/8" />
              <div className="h-14 animate-pulse rounded-2xl bg-black/6 dark:bg-white/8" />
            </div>
          ) : navigationQuery.isError ? (
            <StateCard
              title="Search unavailable"
              description="We could not load document navigation right now."
              icon={<AlertCircle className="h-5 w-5" />}
              action={{ label: "Retry", onClick: () => navigationQuery.refetch() }}
            />
          ) : results.length === 0 ? (
            <StateCard title="No matches" description="No documents match your search." />
          ) : (
            <div className="space-y-2">
              {results.map((item) => (
                <Link
                  key={item.id}
                  href={`/documents/${item.id}`}
                  onClick={close}
                  className={cn(
                    "flex items-center gap-3 rounded-2xl px-4 py-3 transition",
                    pathname === `/documents/${item.id}`
                      ? "bg-[var(--foreground)] text-[var(--card)]"
                      : "hover:bg-[var(--surface-elevated)]",
                  )}
                >
                  <span className="flex h-9 w-9 items-center justify-center rounded-xl border border-[var(--border)] bg-[var(--surface-elevated)] text-xs font-semibold text-[var(--foreground)]">
                    {item.icon}
                  </span>
                  <div className="min-w-0">
                    <p className="truncate text-sm font-medium">{item.title}</p>
                    <p className="truncate text-xs text-[var(--muted-foreground)]">{item.breadcrumb.join(" / ")}</p>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
