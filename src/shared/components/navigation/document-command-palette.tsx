"use client";

import Link from "next/link";
import { AlertCircle, ArrowUpRight, Search, Sparkles } from "lucide-react";
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
    <div className="animate-overlay-fade fixed inset-0 z-[60] bg-black/40 px-4 py-8 backdrop-blur-md" onClick={close}>
      <div
        className="surface-card animate-fade-scale mx-auto w-full max-w-3xl rounded-[30px] border border-[var(--border)] p-4 sm:p-5"
        onClick={(event) => event.stopPropagation()}
      >
        <div className="mb-4 rounded-[24px] border border-[var(--border)] bg-[var(--surface-elevated)] p-4">
          <div className="mb-3 flex items-center justify-between gap-3">
            <div className="inline-flex items-center gap-2 rounded-full border border-[var(--border)] bg-[var(--surface-strong)] px-3 py-1 text-xs uppercase tracking-[0.2em] text-[var(--muted-foreground)]">
              <Sparkles className="h-3.5 w-3.5" />
              Điều hướng nhanh
            </div>
            <span className="rounded-full border border-[var(--border)] px-2 py-0.5 text-xs text-[var(--muted-foreground)]">Esc</span>
          </div>
          <div className="flex items-center gap-3 rounded-2xl border border-[var(--border)] bg-[var(--surface-strong)] px-4 py-3">
            <Search className="h-4 w-4 text-[var(--muted-foreground)]" />
            <input
              autoFocus
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Tìm tài liệu hoặc chuyển nhanh đến một trang"
              className="w-full bg-transparent text-base outline-none placeholder:text-[var(--muted-foreground)]"
            />
          </div>
          <p className="mt-3 text-xs text-[var(--muted-foreground)]">Gõ tên trang, workspace hoặc nội dung breadcrumb để lọc nhanh.</p>
        </div>

        <div className="max-h-[60vh] overflow-y-auto">
          {navigationQuery.isLoading ? (
            <div className="space-y-2">
              <div className="skeleton-shimmer h-16 rounded-2xl" />
              <div className="skeleton-shimmer h-16 rounded-2xl" />
              <div className="skeleton-shimmer h-16 rounded-2xl" />
            </div>
          ) : navigationQuery.isError ? (
            <StateCard
              title="Không thể tìm kiếm lúc này"
              description="Không tải được dữ liệu điều hướng tài liệu."
              icon={<AlertCircle className="h-5 w-5" />}
              action={{ label: "Thử lại", onClick: () => navigationQuery.refetch() }}
            />
          ) : results.length === 0 ? (
            <StateCard title="Không có kết quả" description="Không có tài liệu nào phù hợp với từ khóa tìm kiếm." />
          ) : (
            <div className="space-y-2">
              {results.map((item, index) => (
                <Link
                  key={item.id}
                  href={`/documents/${item.id}`}
                  onClick={close}
                  className={cn(
                    "hover-lift flex items-center gap-3 rounded-2xl border px-4 py-3 transition",
                    pathname === `/documents/${item.id}`
                      ? "border-[var(--accent)]/35 bg-[var(--foreground)] text-[var(--card)]"
                      : "border-transparent hover:border-[var(--border)] hover:bg-[var(--surface-elevated)]",
                  )}
                  style={{ animationDelay: `${index * 18}ms` }}
                >
                  <span className="flex h-10 w-10 items-center justify-center rounded-xl border border-[var(--border)] bg-[var(--surface-strong)] text-xs font-semibold text-[var(--foreground)]">
                    {item.icon}
                  </span>
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-semibold">{item.title}</p>
                    <p className="truncate text-xs text-[var(--muted-foreground)]">{item.breadcrumb.join(" / ")}</p>
                  </div>
                  <ArrowUpRight className="h-4 w-4 opacity-60" />
                </Link>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
