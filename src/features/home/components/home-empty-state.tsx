"use client";

import { ArrowRight, FileText, Search } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { useCreateDocumentMutation } from "@/features/documents/hooks/use-documents";
import { useCommandPaletteStore } from "@/shared/components/navigation/command-palette-store";

export function HomeEmptyState() {
  const createDocumentMutation = useCreateDocumentMutation();
  const openCommandPalette = useCommandPaletteStore((state) => state.open);

  return (
    <section className="surface-card soft-glow animate-fade-up relative overflow-hidden rounded-[32px] border border-[var(--border)] px-8 py-12 sm:px-10 lg:px-14 lg:py-16">
      <div className="absolute inset-x-0 top-0 h-40 bg-gradient-to-r from-amber-100/50 via-transparent to-transparent dark:from-amber-500/10" />
      <div className="relative max-w-3xl">
        <div className="inline-flex items-center gap-2 rounded-full border border-[var(--border)] bg-[var(--surface-elevated)] px-3 py-1 text-xs uppercase tracking-[0.22em] text-[var(--muted-foreground)]">
          <FileText className="h-3.5 w-3.5" />
          Giao diện MVP
        </div>
        <h1 className="editor-display mt-6 text-4xl leading-tight text-[var(--foreground)] sm:text-5xl">
          Một nền tảng gọn gàng, dễ mở rộng cho trình soạn thảo kiểu Notion.
        </h1>
        <p className="mt-6 max-w-2xl text-base leading-8 text-[var(--muted-foreground)]">
          Giao diện hiện đã kết nối với API tài liệu của backend thông qua lớp repository, nhưng vẫn giữ nguyên trải nghiệm tạo, mở và chỉnh sửa trang.
        </p>

        <div className="mt-8 grid gap-3 rounded-[24px] border border-[var(--border)] bg-[var(--surface-elevated)] p-4 sm:grid-cols-3">
          <div className="rounded-2xl border border-[var(--border)] bg-[var(--surface-strong)] p-4">
            <p className="text-sm font-semibold text-[var(--foreground)]">1. Tạo trang</p>
            <p className="mt-2 text-sm leading-6 text-[var(--muted-foreground)]">Bấm nút dấu cộng ở thanh bên để tạo một tài liệu mới.</p>
          </div>
          <div className="rounded-2xl border border-[var(--border)] bg-[var(--surface-strong)] p-4">
            <p className="text-sm font-semibold text-[var(--foreground)]">2. Tìm nhanh</p>
            <p className="mt-2 text-sm leading-6 text-[var(--muted-foreground)]">Dùng Ctrl + K để mở tìm kiếm và chuyển giữa các tài liệu.</p>
          </div>
          <div className="rounded-2xl border border-[var(--border)] bg-[var(--surface-strong)] p-4">
            <p className="text-sm font-semibold text-[var(--foreground)]">3. Soạn nội dung</p>
            <p className="mt-2 text-sm leading-6 text-[var(--muted-foreground)]">Mở một trang rồi gõ / trong editor để chèn nhanh các kiểu block.</p>
          </div>
        </div>

        <div className="mt-10 flex flex-wrap items-center gap-3">
          <button
            type="button"
            className={buttonVariants({ className: "hover-lift" })}
            onClick={() => createDocumentMutation.mutate({ parentId: null })}
          >
            Tạo tài liệu đầu tiên
            <ArrowRight className="ml-2 h-4 w-4" />
          </button>
          <button
            type="button"
            className={buttonVariants({ variant: "outline", className: "hover-lift" })}
            onClick={openCommandPalette}
          >
            <Search className="mr-2 h-4 w-4" />
            Tìm tài liệu
          </button>
        </div>
      </div>
    </section>
  );
}
