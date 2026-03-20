"use client";

import { EditorContent, useEditor } from "@tiptap/react";
import { useEffect } from "react";
import { Sparkles } from "lucide-react";
import { Document } from "@/domain/types/document";
import { useDocumentEditor } from "../hooks/use-document-editor";
import { editorExtensions } from "../lib/tiptap-extensions";
import { DocumentAppearanceControls } from "./document-appearance-controls";
import { DocumentTitleInput } from "./document-title-input";
import { EditorBubbleMenu } from "./editor-bubble-menu";
import { EditorSaveIndicator } from "./editor-save-indicator";
import { EditorSlashMenu } from "./editor-slash-menu";
import { EditorToolbar } from "./editor-toolbar";

interface DocumentEditorSurfaceProps {
  document: Document;
}

export function DocumentEditorSurface({ document }: DocumentEditorSurfaceProps) {
  const {
    title,
    setTitle,
    content,
    setContent,
    icon,
    setIcon,
    coverStyle,
    setCoverStyle,
    saveState,
  } = useDocumentEditor(document);

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
    <section className="space-y-6">
      <div className="surface-strong soft-glow animate-fade-up rounded-[36px] border border-[var(--border)]">
        <div className="overflow-hidden rounded-t-[36px]">
          <div
            className="relative h-56 w-full transition-[background] duration-500 ease-out"
            style={{ background: coverStyle ?? document.coverStyle ?? "linear-gradient(135deg, #e7d3bb, #a57b4a)" }}
          >
            <div className="absolute inset-0 bg-gradient-to-b from-black/0 via-black/0 to-black/18" />
            <div className="pointer-events-none absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-white/10 to-transparent dark:from-white/5" />
          </div>
        </div>
        <div className="px-6 pb-10 sm:px-10 sm:pb-12 lg:px-12">
          <div className="-mt-6 flex h-20 w-20 items-center justify-center rounded-[26px] border border-white/70 bg-[var(--surface-elevated)] text-2xl font-semibold text-[var(--foreground)] shadow-[0_16px_36px_rgba(0,0,0,0.16)] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_22px_44px_rgba(0,0,0,0.18)]">
            {icon}
          </div>

          <div className="mt-4 flex flex-col gap-5 lg:flex-row lg:items-start lg:justify-between">
            <div className="min-w-0 flex-1">
              <p className="section-eyebrow">Tiêu đề trang</p>
              <div className="mt-3">
                <DocumentTitleInput title={title} onChange={setTitle} />
              </div>
            </div>
            <div className="flex shrink-0 flex-col items-start gap-3 lg:items-end">
              <EditorSaveIndicator saveState={saveState} />
              <div className="inline-flex items-center gap-2 rounded-full bg-black/4 px-3 py-1 text-xs text-[var(--muted-foreground)] dark:bg-white/8">
                <Sparkles className="h-3.5 w-3.5" />
                Gợi ý: gõ <span className="font-semibold text-[var(--foreground)]">/</span> trong khung soạn thảo để chèn nhanh các kiểu nội dung
              </div>
            </div>
          </div>

          <div className="mt-6 grid gap-4 xl:grid-cols-[minmax(0,1fr)_360px]">
            <div className="hover-lift rounded-[24px] border border-[var(--border)] bg-[var(--surface-elevated)] px-5 py-4">
              <p className="section-eyebrow">Hướng dẫn nhanh</p>
              <p className="mt-3 text-sm leading-7 text-[var(--muted-foreground)]">
                Trang này tự động lưu lên backend, hỗ trợ điều hướng theo cây và đồng bộ thông tin như biểu tượng, ảnh bìa ngay trong lúc bạn soạn thảo.
              </p>
            </div>
            <div className="hover-lift rounded-[24px] border border-[var(--border)] bg-[var(--surface-elevated)] px-5 py-4">
              <p className="section-eyebrow">Tùy chỉnh nhận diện trang</p>
              <div className="mt-3">
                <DocumentAppearanceControls
                  icon={icon}
                  coverStyle={coverStyle}
                  onIconChange={setIcon}
                  onCoverChange={setCoverStyle}
                />
              </div>
            </div>
          </div>

          <div className="mt-6 hidden items-center gap-3 text-sm text-[var(--muted-foreground)] md:flex">
            <span>Bấm đúp vào một trang trong thanh bên để đổi tên.</span>
            <span className="h-1 w-1 rounded-full bg-[var(--muted-foreground)]/60" />
            <span>Dùng Ctrl/Cmd + K để chuyển nhanh giữa các tài liệu.</span>
          </div>
        </div>
      </div>

      <EditorToolbar editor={editor} />

      <div className="surface-strong editor-frame soft-glow animate-fade-up relative rounded-[36px] border border-[var(--border)] px-6 py-8 sm:px-10 lg:px-12">
        <div className="mb-6 flex flex-wrap items-center justify-between gap-3 border-b border-[var(--border)] pb-5">
          <div>
            <p className="section-eyebrow">Trình soạn thảo</p>
            <p className="mt-2 text-sm leading-7 text-[var(--muted-foreground)]">
              Dùng thanh công cụ để định dạng nhanh, hoặc gõ nội dung tự nhiên rồi đổi kiểu khối khi cần.
            </p>
          </div>
          <div className="rounded-full border border-[var(--border)] bg-[var(--surface-elevated)] px-3 py-2 text-xs text-[var(--muted-foreground)]">
            Phím tắt: Alt + Cmd/Ctrl + 1, 2, 7, 8, 9
          </div>
        </div>

        <div className="relative">
          <EditorBubbleMenu editor={editor} />
          <EditorSlashMenu editor={editor} />
          <EditorContent editor={editor} />
        </div>
      </div>
    </section>
  );
}
