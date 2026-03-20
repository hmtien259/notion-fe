"use client";

import Link from "next/link";
import { AlertCircle } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { DocumentEditorSurface } from "@/features/editor/components/document-editor-surface";
import { StateCard } from "@/shared/components/feedback/state-card";
import { useDocumentDetailQuery } from "../hooks/use-documents";
import { DocumentRouteSkeleton } from "./document-route-skeleton";

interface DocumentRouteScreenProps {
  documentId: string;
}

export function DocumentRouteScreen({ documentId }: DocumentRouteScreenProps) {
  const documentQuery = useDocumentDetailQuery(documentId);

  if (documentQuery.isLoading) {
    return <DocumentRouteSkeleton />;
  }

  if (documentQuery.isError) {
    return (
      <StateCard
        title="Không tải được tài liệu"
        description="Vui lòng thử lại hoặc quay về không gian làm việc."
        icon={<AlertCircle className="h-5 w-5" />}
        action={{ label: "Thử lại", onClick: () => documentQuery.refetch() }}
        className="min-h-[420px] rounded-[28px] px-8 py-14"
      />
    );
  }

  if (!documentQuery.data) {
    return (
      <section className="surface-card animate-fade-up flex min-h-[420px] flex-col items-center justify-center rounded-[28px] border border-[var(--border)] px-8 py-14 text-center">
        <p className="text-xs uppercase tracking-[0.24em] text-[var(--muted-foreground)]">Không tìm thấy trang</p>
        <h1 className="editor-display mt-4 text-4xl text-[var(--foreground)]">Tài liệu này hiện không khả dụng</h1>
        <p className="mt-4 max-w-md text-sm leading-7 text-[var(--muted-foreground)]">
          Trang có thể đã được lưu trữ hoặc đường dẫn hiện tại không khớp với dữ liệu đang có.
        </p>
        <Link href="/" className={buttonVariants({ className: "mt-8 hover-lift" })}>
          Quay về trang chủ
        </Link>
      </section>
    );
  }

  return <DocumentEditorSurface document={documentQuery.data} />;
}
