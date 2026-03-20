"use client";

import { Editor } from "@tiptap/react";
import { useEffect, useMemo, useState } from "react";
import { editorToolbarActions } from "../lib/editor-toolbar-actions";

interface EditorSlashMenuProps {
  editor: Editor | null;
}

export function EditorSlashMenu({ editor }: EditorSlashMenuProps) {
  const [selectedIndex, setSelectedIndex] = useState(0);

  const slashContext = (() => {
    if (!editor) {
      return null;
    }

    const { $from } = editor.state.selection;
    const parentNode = $from.parent;
    const text = parentNode.textContent;

    if (parentNode.type.name !== "paragraph" || !text.startsWith("/")) {
      return null;
    }

    return {
      query: text.slice(1).trim().toLowerCase(),
      from: $from.start(),
      to: $from.pos,
    };
  })();

  const items = useMemo(() => {
    if (!slashContext) {
      return [];
    }

    return editorToolbarActions.filter((action) =>
      `${action.label} ${action.id}`.toLowerCase().includes(slashContext.query),
    );
  }, [slashContext]);

  useEffect(() => {
    setSelectedIndex(0);
  }, [slashContext?.query]);

  useEffect(() => {
    if (!editor || !slashContext || items.length === 0) {
      return;
    }

    const currentSlashContext = slashContext;

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "ArrowDown") {
        event.preventDefault();
        setSelectedIndex((current) => (current + 1) % items.length);
      }

      if (event.key === "ArrowUp") {
        event.preventDefault();
        setSelectedIndex((current) => (current - 1 + items.length) % items.length);
      }

      if (event.key === "Enter") {
        event.preventDefault();
        const action = items[selectedIndex];

        if (!action || !editor) {
          return;
        }

        editor.chain().focus().deleteRange({ from: currentSlashContext.from, to: currentSlashContext.to }).run();
        action.run(editor);
      }
    }

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [editor, items, selectedIndex, slashContext]);

  if (!editor || !slashContext || items.length === 0) {
    return null;
  }

  const activeSlashContext = slashContext;

  return (
    <div className="surface-card absolute left-6 top-6 z-10 w-full max-w-xs rounded-[24px] border border-[var(--border)] p-2 shadow-[0_20px_50px_rgba(0,0,0,0.14)]">
      <p className="px-3 py-2 text-xs uppercase tracking-[0.18em] text-[var(--muted-foreground)]">Insert block</p>
      <div className="space-y-1">
        {items.map((item, index) => (
          <button
            key={item.id}
            type="button"
            onClick={() => {
              if (!editor) {
                return;
              }

              editor.chain().focus().deleteRange({ from: activeSlashContext.from, to: activeSlashContext.to }).run();
              item.run(editor);
            }}
            className={[
              "flex w-full items-center justify-between rounded-2xl px-3 py-2 text-left text-sm transition",
              index === selectedIndex ? "bg-[var(--foreground)] text-[var(--card)]" : "hover:bg-[var(--surface-elevated)]",
            ].join(" ")}
          >
            <span>{item.label}</span>
            <span className="text-xs opacity-70">Enter</span>
          </button>
        ))}
      </div>
    </div>
  );
}
