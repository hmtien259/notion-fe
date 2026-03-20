"use client";

import { BubbleMenu, Editor } from "@tiptap/react";
import { Bold, Code2, Heading1, Heading2, Italic, List, ListOrdered, Quote } from "lucide-react";
import { cn } from "@/shared/lib/utils";

interface EditorBubbleMenuProps {
  editor: Editor | null;
}

const actions = [
  {
    id: "bold",
    icon: Bold,
    label: "Đậm",
    isActive: (editor: Editor) => editor.isActive("bold"),
    run: (editor: Editor) => editor.chain().focus().toggleBold().run(),
  },
  {
    id: "italic",
    icon: Italic,
    label: "Nghiêng",
    isActive: (editor: Editor) => editor.isActive("italic"),
    run: (editor: Editor) => editor.chain().focus().toggleItalic().run(),
  },
  {
    id: "heading-1",
    icon: Heading1,
    label: "Tiêu đề 1",
    isActive: (editor: Editor) => editor.isActive("heading", { level: 1 }),
    run: (editor: Editor) => editor.chain().focus().toggleHeading({ level: 1 }).run(),
  },
  {
    id: "heading-2",
    icon: Heading2,
    label: "Tiêu đề 2",
    isActive: (editor: Editor) => editor.isActive("heading", { level: 2 }),
    run: (editor: Editor) => editor.chain().focus().toggleHeading({ level: 2 }).run(),
  },
  {
    id: "bullet",
    icon: List,
    label: "Danh sách",
    isActive: (editor: Editor) => editor.isActive("bulletList"),
    run: (editor: Editor) => editor.chain().focus().toggleBulletList().run(),
  },
  {
    id: "ordered",
    icon: ListOrdered,
    label: "Đánh số",
    isActive: (editor: Editor) => editor.isActive("orderedList"),
    run: (editor: Editor) => editor.chain().focus().toggleOrderedList().run(),
  },
  {
    id: "quote",
    icon: Quote,
    label: "Trích dẫn",
    isActive: (editor: Editor) => editor.isActive("blockquote"),
    run: (editor: Editor) => editor.chain().focus().toggleBlockquote().run(),
  },
  {
    id: "code",
    icon: Code2,
    label: "Code",
    isActive: (editor: Editor) => editor.isActive("codeBlock") || editor.isActive("code"),
    run: (editor: Editor) => editor.chain().focus().toggleCode().run(),
  },
];

export function EditorBubbleMenu({ editor }: EditorBubbleMenuProps) {
  if (!editor) {
    return null;
  }

  return (
    <BubbleMenu
      editor={editor}
      tippyOptions={{ duration: 150, placement: "top", offset: [0, 12] }}
      shouldShow={({ editor: activeEditor }) => !activeEditor.state.selection.empty}
    >
      <div className="surface-card animate-fade-scale flex items-center gap-1 rounded-2xl border border-[var(--border)] px-2 py-2 shadow-[0_16px_36px_rgba(0,0,0,0.12)]">
        {actions.map((action) => {
          const Icon = action.icon;
          return (
            <button
              key={action.id}
              type="button"
              aria-label={action.label}
              onClick={() => action.run(editor)}
              className={cn(
                "flex h-9 w-9 items-center justify-center rounded-xl transition",
                action.isActive(editor)
                  ? "bg-[var(--foreground)] text-[var(--card)] shadow-sm"
                  : "text-[var(--muted-foreground)] hover:bg-black/5 hover:text-[var(--foreground)] dark:hover:bg-white/10",
              )}
            >
              <Icon className="h-4 w-4" />
            </button>
          );
        })}
      </div>
    </BubbleMenu>
  );
}
