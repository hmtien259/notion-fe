interface EditorSaveIndicatorProps {
  saveState: "saved" | "saving" | "dirty";
}

export function EditorSaveIndicator({ saveState }: EditorSaveIndicatorProps) {
  const label =
    saveState === "saving" ? "Autosaving..." : saveState === "dirty" ? "Unsaved changes" : "All changes saved";

  return (
    <div className="rounded-full border border-[var(--border)] bg-[var(--surface-elevated)] px-3 py-1 text-xs uppercase tracking-[0.18em] text-[var(--muted-foreground)]">
      {label}
    </div>
  );
}

