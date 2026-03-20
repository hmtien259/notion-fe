"use client";

import { useDocumentDetailQuery } from "../hooks/use-documents";

interface DocumentPageDescriptionProps {
  documentId: string;
}

export function DocumentPageDescription({ documentId }: DocumentPageDescriptionProps) {
  const documentQuery = useDocumentDetailQuery(documentId);

  if (documentQuery.isLoading) {
    return <span>Loading document metadata...</span>;
  }

  return (
    <span>
      {documentQuery.data
        ? "Mock-backed document page connected through the service and repository layers."
        : "Document not found in the current mock workspace."}
    </span>
  );
}

