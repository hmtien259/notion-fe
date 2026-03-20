"use client";

import { DocumentBreadcrumbs } from "./document-breadcrumbs";
import { useDocumentDetailQuery } from "../hooks/use-documents";

interface DocumentPageHeaderProps {
  documentId: string;
}

export function DocumentPageHeader({ documentId }: DocumentPageHeaderProps) {
  const documentQuery = useDocumentDetailQuery(documentId);

  if (documentQuery.isLoading) {
    return <span>Tài liệu</span>;
  }

  if (!documentQuery.data) {
    return <span>Tài liệu</span>;
  }

  return (
    <div className="space-y-2">
      <DocumentBreadcrumbs documentId={documentId} />
      <span>{documentQuery.data.title}</span>
    </div>
  );
}
