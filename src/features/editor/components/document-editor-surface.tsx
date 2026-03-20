"use client";

import { EditorContent, useEditor } from "@tiptap/react";
import { useEffect } from "react";
import { Document } from "@/domain/types/document";
import { useDocumentEditor } from "../hooks/use-document-editor";
import { editorExtensions } from "../lib/tiptap-extensions";
import { DocumentTitleInput } from "./document-title-input";
import { EditorSaveIndicator } from "./editor-save-indicator";
import { EditorToolbar } from "./editor-toolbar";

interface DocumentEditorSurfaceProps {
  document: Document;
}

export function DocumentEditorSurface({ document }: DocumentEditorSurfaceProps) {
  const { title, setTitle, content, setContent, saveState } = useDocumentEditor(document);

  const editor = useEditor({
    immediatelyRender: false,
    extensions: editorExtensions,
    content,
    editorProps: {
      attributes: {
        class: "editor-prose focus:outline-none",
      },
    },
    onUpdate: ({ editor: nextEditor }) => {
      setContent(nextEditor.getJSON());
    },
  });

  useEffect(() => {
    if (!editor) {
      return;
    }

    const currentEditorState = JSON.stringify(editor.getJSON());
    const nextEditorState = JSON.stringify(content);

    if (currentEditorState !== nextEditorState) {
      editor.commands.setContent(content, false);
    }
  }, [content, editor]);

  return (
    <section className="space-y-5">
      <div className="surface-card overflow-hidden rounded-[32px] border border-[var(--border)]">
        <div className="h-44 w-full" style={{ background: document.coverStyle ?? "linear-gradient(135deg, #e7d3bb, #a57b4a)" }} />
        <div className="px-6 pb-8 sm:px-10 sm:pb-10">
          <div className="-mt-8 flex h-16 w-16 items-center justify-center rounded-[22px] border border-white/70 bg-[var(--surface-elevated)] text-xl font-semibold text-[var(--foreground)] shadow-lg">
            {document.icon}
          </div>

          <div className="mt-5 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <DocumentTitleInput title={title} onChange={setTitle} />
            <EditorSaveIndicator saveState={saveState} />
          </div>

          <p className="mt-3 max-w-2xl text-sm leading-7 text-[var(--muted-foreground)]">
            A focused editor MVP with mock-backed autosave, typed persistence, and a modular feature boundary ready for richer commands later.
          </p>
        </div>
      </div>

      <EditorToolbar editor={editor} />

      <div className="surface-card rounded-[32px] border border-[var(--border)] px-6 py-8 sm:px-10">
        <EditorContent editor={editor} />
      </div>
    </section>
  );
}
