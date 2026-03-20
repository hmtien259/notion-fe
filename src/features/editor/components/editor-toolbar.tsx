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
    <div className="flex flex-wrap items-center gap-2 rounded-[22px] border border-[var(--border)] bg-[var(--surface-elevated)] p-3">
      {editorToolbarActions.map((action) => (
        <button
          key={action.id}
          type="button"
          onClick={() => action.run(editor)}
          className={cn(
            "rounded-full px-3 py-1.5 text-sm transition",
            action.isActive(editor)
              ? "bg-[var(--foreground)] text-[var(--card)]"
              : "bg-transparent text-[var(--muted-foreground)] hover:bg-black/5 hover:text-[var(--foreground)] dark:hover:bg-white/10",
          )}
        >
          {action.label}
        </button>
      ))}
    </div>
  );
}

