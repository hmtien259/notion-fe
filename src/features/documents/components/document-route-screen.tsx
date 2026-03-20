"use client";

import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import { DocumentEditorSurface } from "@/features/editor/components/document-editor-surface";
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

  if (!documentQuery.data) {
    return (
      <section className="surface-card flex min-h-[420px] flex-col items-center justify-center rounded-[28px] border border-[var(--border)] px-8 py-14 text-center">
        <p className="text-xs uppercase tracking-[0.24em] text-[var(--muted-foreground)]">Missing page</p>
        <h1 className="editor-display mt-4 text-4xl text-[var(--foreground)]">This document is unavailable</h1>
        <p className="mt-4 max-w-md text-sm text-[var(--muted-foreground)]">
          It may have been archived or the route does not match any page in the mock repository.
        </p>
        <Link href="/" className={buttonVariants({ className: "mt-8" })}>
          Back to home
        </Link>
      </section>
    );
  }

  return <DocumentEditorSurface document={documentQuery.data} />;
}
