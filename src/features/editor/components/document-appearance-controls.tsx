"use client";

import { ImagePlus, Shuffle } from "lucide-react";
import { pageCoverOptions, pageIconOptions } from "../lib/document-appearance";

interface DocumentAppearanceControlsProps {
  icon: string;
  coverStyle?: string;
  onIconChange: (icon: string) => void;
  onCoverChange: (coverStyle: string) => void;
}

export function DocumentAppearanceControls({
  icon,
  coverStyle,
  onIconChange,
  onCoverChange,
}: DocumentAppearanceControlsProps) {
  const selectedIcon = pageIconOptions.find((option) => option.value === icon) ?? pageIconOptions[0];
  const selectedCoverIndex = Math.max(0, pageCoverOptions.findIndex((item) => item === coverStyle));

  function cycleCover() {
    const currentIndex = pageCoverOptions.findIndex((item) => item === coverStyle);
    const nextCover = pageCoverOptions[(currentIndex + 1) % pageCoverOptions.length];
    onCoverChange(nextCover);
  }

  return (
    <div className="space-y-4">
      <div className="rounded-[22px] border border-[var(--border)] bg-[var(--surface-strong)] p-4">
        <div className="flex items-start gap-3">
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl border border-[var(--border)] bg-[var(--foreground)] text-sm font-semibold text-[var(--card)] shadow-sm">
            {selectedIcon.value}
          </div>
          <div className="min-w-0">
            <p className="text-sm font-semibold text-[var(--foreground)]">Biểu tượng trang</p>
            <p className="mt-1 text-sm leading-6 text-[var(--muted-foreground)]">
              Biểu tượng này xuất hiện ở thanh bên và đầu trang để bạn nhận ra tài liệu nhanh hơn.
            </p>
            <p className="mt-2 text-xs text-[var(--muted-foreground)]">
              Đang chọn: <span className="font-semibold text-[var(--foreground)]">{selectedIcon.label}</span>
            </p>
          </div>
        </div>

        <div className="mt-4 grid grid-cols-1 gap-2 sm:grid-cols-2">
          {pageIconOptions.map((option) => (
            <button
              key={option.value}
              type="button"
              onClick={() => onIconChange(option.value)}
              className={[
                "flex items-center gap-3 rounded-2xl border px-3 py-3 text-left transition",
                icon === option.value
                  ? "border-[var(--accent)]/40 bg-[color-mix(in_srgb,var(--accent)_10%,white)] text-[var(--foreground)] shadow-sm dark:bg-[color-mix(in_srgb,var(--accent)_12%,black)]"
                  : "border-[var(--border)] bg-transparent text-[var(--muted-foreground)] hover:bg-black/5 hover:text-[var(--foreground)] dark:hover:bg-white/10",
              ].join(" ")}
            >
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-[var(--border)] bg-[var(--surface-elevated)] text-xs font-semibold text-[var(--foreground)]">
                {option.value}
              </span>
              <span className="min-w-0">
                <span className="block text-sm font-semibold">{option.label}</span>
                <span className="mt-0.5 block text-xs leading-5 opacity-80">{option.description}</span>
              </span>
            </button>
          ))}
        </div>
      </div>

      <div className="rounded-[22px] border border-[var(--border)] bg-[var(--surface-strong)] p-4">
        <div className="flex items-start justify-between gap-3">
          <div>
            <p className="text-sm font-semibold text-[var(--foreground)]">Nền bìa trang</p>
            <p className="mt-1 text-sm leading-6 text-[var(--muted-foreground)]">
              Đây là màu nền của phần bìa phía trên. Mỗi lần bấm sẽ đổi sang một mẫu nền khác.
            </p>
            <p className="mt-2 text-xs text-[var(--muted-foreground)]">
              Đang chọn: mẫu nền <span className="font-semibold text-[var(--foreground)]">{selectedCoverIndex + 1}</span> / {pageCoverOptions.length}
            </p>
          </div>
          <div
            className="h-14 w-24 shrink-0 rounded-2xl border border-[var(--border)] shadow-sm"
            style={{ background: pageCoverOptions[selectedCoverIndex] }}
          />
        </div>

        <button
          type="button"
          onClick={cycleCover}
          className="mt-4 flex items-center gap-2 rounded-full border border-[var(--border)] bg-[var(--surface-elevated)] px-4 py-3 text-sm text-[var(--muted-foreground)] transition hover:border-[var(--accent)]/40 hover:text-[var(--foreground)]"
        >
          <ImagePlus className="h-4 w-4" />
          Đổi nền bìa
          <Shuffle className="h-3.5 w-3.5" />
        </button>
      </div>
    </div>
  );
}
