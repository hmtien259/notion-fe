interface EditorSaveIndicatorProps {
  saveState: "saved" | "saving" | "dirty";
}

export function EditorSaveIndicator({ saveState }: EditorSaveIndicatorProps) {
  const label =
    saveState === "saving"
      ? "Đang tự động lưu..."
      : saveState === "dirty"
        ? "Có thay đổi chưa lưu"
        : "Đã lưu mọi thay đổi";

  const toneClass =
    saveState === "saving"
      ? "border-[var(--accent)]/30 text-[var(--foreground)]"
      : saveState === "dirty"
        ? "border-[var(--border)] text-[var(--foreground)]"
        : "border-[var(--border)] text-[var(--muted-foreground)]";

  return (
    <div
      className={`rounded-full bg-[var(--surface-elevated)] px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.22em] shadow-sm transition ${toneClass}`}
    >
      {label}
    </div>
  );
}
