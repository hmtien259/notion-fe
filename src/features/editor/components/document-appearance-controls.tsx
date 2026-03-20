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
  function cycleCover() {
    const currentIndex = pageCoverOptions.findIndex((item) => item === coverStyle);
    const nextCover = pageCoverOptions[(currentIndex + 1) % pageCoverOptions.length];
    onCoverChange(nextCover);
  }

  return (
    <div className="flex flex-wrap items-center gap-2">
      <div className="flex items-center gap-2 rounded-full border border-[var(--border)] bg-[var(--surface-elevated)] px-2 py-2">
        {pageIconOptions.map((option) => (
          <button
            key={option}
            type="button"
            onClick={() => onIconChange(option)}
            className={[
              "flex h-9 w-9 items-center justify-center rounded-full text-xs font-semibold transition",
              icon === option ? "bg-[var(--foreground)] text-[var(--card)]" : "text-[var(--muted-foreground)] hover:bg-black/5 dark:hover:bg-white/10",
            ].join(" ")}
          >
            {option}
          </button>
        ))}
      </div>

      <button
        type="button"
        onClick={cycleCover}
        className="flex items-center gap-2 rounded-full border border-[var(--border)] bg-[var(--surface-elevated)] px-4 py-2 text-sm text-[var(--muted-foreground)] transition hover:text-[var(--foreground)]"
      >
        <ImagePlus className="h-4 w-4" />
        Change cover
        <Shuffle className="h-3.5 w-3.5" />
      </button>
    </div>
  );
}

