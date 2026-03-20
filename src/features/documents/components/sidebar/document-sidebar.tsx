"use client";

import Link from "next/link";
import { AlertCircle, Home, Plus, Search } from "lucide-react";
import { usePathname } from "next/navigation";
import { useCommandPaletteStore } from "@/shared/components/navigation/command-palette-store";
import { StateCard } from "@/shared/components/feedback/state-card";
import { cn } from "@/shared/lib/utils";
import { useCreateDocumentMutation, useDocumentTreeQuery } from "../../hooks/use-documents";
import { DocumentSidebarSkeleton } from "./document-sidebar-skeleton";
import { DocumentTreeBranch } from "./document-tree-branch";

interface DocumentSidebarProps {
  activeDocumentId?: string;
}

export function DocumentSidebar({ activeDocumentId }: DocumentSidebarProps) {
  const pathname = usePathname();
  const treeQuery = useDocumentTreeQuery();
  const createDocumentMutation = useCreateDocumentMutation();
  const openCommandPalette = useCommandPaletteStore((state) => state.open);

  return (
    <aside className="surface-strong soft-glow flex h-full min-h-0 flex-col rounded-[32px] border border-[var(--border)] bg-[var(--sidebar)] p-4">
      <div className="hover-lift rounded-[26px] border border-[var(--border)] bg-[var(--surface-elevated)] p-5">
        <div className="flex items-start justify-between gap-3">
          <div>
            <p className="section-eyebrow">Notion HMT</p>
            <h1 className="mt-4 text-[1.55rem] font-semibold leading-tight text-[var(--sidebar-foreground)]">
              Không gian sản phẩm
            </h1>
            <p className="mt-3 text-sm leading-7 text-[var(--muted-foreground)]">
              Tạo trang mới, sắp xếp nội dung theo cây, đổi tên nhanh và đồng bộ mọi thay đổi với backend.
            </p>
          </div>
          <button
            className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-[var(--border)] bg-[var(--foreground)] text-[var(--card)] transition hover:scale-[1.02] hover:opacity-95"
            type="button"
            aria-label="Tạo trang mới"
            onClick={() => createDocumentMutation.mutate({ parentId: null })}
          >
            <Plus className="h-4 w-4" />
          </button>
        </div>
      </div>

      <nav className="mt-5 min-h-0 flex-1 overflow-y-auto pr-1">
        <button
          type="button"
          onClick={openCommandPalette}
          className="hover-lift mb-4 flex w-full items-center gap-3 rounded-[20px] border border-[var(--border)] bg-[var(--surface-elevated)] px-4 py-3 text-sm text-[var(--muted-foreground)] transition hover:border-[var(--accent)]/40 hover:text-[var(--foreground)]"
        >
          <Search className="h-4 w-4" />
          Tìm trang
          <span className="ml-auto rounded-full border border-[var(--border)] px-2 py-0.5 text-[11px]">Ctrl K</span>
        </button>

        <Link
          href="/"
          className={cn(
            "flex items-center gap-3 rounded-[18px] px-3.5 py-2.5 text-sm font-medium transition",
            pathname === "/"
              ? "border border-[var(--border)] bg-[var(--surface-elevated)] text-[var(--foreground)] shadow-sm ring-1 ring-[var(--ring)]"
              : "text-[var(--muted-foreground)] hover:bg-[var(--surface-elevated)]/80 hover:text-[var(--foreground)]",
          )}
        >
          <Home className="h-4 w-4" />
          Trang chủ
        </Link>

        <div className="mt-6">
          <div className="flex items-center justify-between px-3">
            <p className="section-eyebrow">Tài liệu</p>
            {createDocumentMutation.isPending ? (
              <span className="text-[11px] text-[var(--muted-foreground)]">Đang tạo...</span>
            ) : null}
          </div>

          <div className="mt-3 space-y-1.5">
            {treeQuery.isLoading ? <DocumentSidebarSkeleton /> : null}
            {treeQuery.isError ? (
              <StateCard
                title="Không tải được danh sách trang"
                description="Cây tài liệu tạm thời không khả dụng."
                icon={<AlertCircle className="h-5 w-5" />}
                action={{ label: "Thử lại", onClick: () => treeQuery.refetch() }}
              />
            ) : null}
            {!treeQuery.isLoading && treeQuery.data?.length === 0 ? (
              <StateCard title="Chưa có trang nào" description="Hãy tạo trang đầu tiên để bắt đầu." />
            ) : null}
            {treeQuery.data?.map((node) => (
              <DocumentTreeBranch key={node.id} node={node} depth={0} activeDocumentId={activeDocumentId} />
            ))}
          </div>
        </div>

        <div className="hover-lift mt-6 rounded-[22px] border border-[var(--border)] bg-[var(--surface-elevated)] px-4 py-4">
          <p className="section-eyebrow">Cách sử dụng</p>
          <p className="mt-3 text-sm leading-7 text-[var(--muted-foreground)]">
            Bấm một lần để mở trang. Bấm đúp để đổi tên. Đưa chuột vào từng dòng để tạo trang con hoặc lưu trữ trang.
          </p>
        </div>
      </nav>
    </aside>
  );
}
