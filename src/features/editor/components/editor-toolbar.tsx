"use client";

import { Editor } from "@tiptap/react";
import { cn } from "@/shared/lib/utils";
import { editorToolbarActions } from "../lib/editor-toolbar-actions";

interface EditorToolbarProps {
  editor: Editor | null;
}

export function EditorToolbar({ editor }: EditorToolbarProps) {
  if (!editor) {
    return null;
  }

  return (
    <div className="surface-strong soft-glow animate-fade-up flex flex-wrap items-center gap-2 rounded-[28px] border border-[var(--border)] px-4 py-3">
      <div className="mr-2 hidden items-center rounded-full bg-black/5 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.2em] text-[var(--muted-foreground)] dark:bg-white/10 md:flex">
        Định dạng
      </div>
      {editorToolbarActions.map((action, index) => (
        <button
          key={action.id}
          type="button"
          onClick={() => action.run(editor)}
          className={cn(
            "rounded-full px-3.5 py-2 text-sm font-medium transition duration-200 hover:-translate-y-[1px]",
            action.isActive(editor)
              ? "bg-[var(--foreground)] text-[var(--card)] shadow-sm"
              : "bg-transparent text-[var(--muted-foreground)] hover:bg-black/5 hover:text-[var(--foreground)] dark:hover:bg-white/10",
          )}
          style={{ animationDelay: `${index * 30}ms` }}
        >
          {action.label}
        </button>
      ))}
    </div>
  );
}
