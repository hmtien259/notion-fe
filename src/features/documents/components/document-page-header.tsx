"use client";

import { useDocumentDetailQuery } from "../hooks/use-documents";

interface DocumentPageHeaderProps {
  documentId: string;
}

export function DocumentPageHeader({ documentId }: DocumentPageHeaderProps) {
  const documentQuery = useDocumentDetailQuery(documentId);

  if (documentQuery.isLoading) {
    return <span>Document</span>;
  }

  return <span>{documentQuery.data?.title ?? "Document"}</span>;
}

