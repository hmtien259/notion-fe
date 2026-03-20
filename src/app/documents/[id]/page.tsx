import { notFound } from "next/navigation";
import { DocumentPlaceholderPage } from "@/features/documents/components/document-placeholder-page";
import { getDocumentService } from "@/services/documents/document.service";
import { AppShell } from "@/shared/components/layout/app-shell";

interface DocumentDetailPageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function DocumentDetailPage({ params }: DocumentDetailPageProps) {
  const { id } = await params;
  const documentService = getDocumentService();
  const document = await documentService.getDocumentById(id);

  if (!document) {
    notFound();
  }

  return (
    <AppShell
      activeDocumentId={document.id}
      title={document.title}
      description="Placeholder document page for the editor MVP."
    >
      <DocumentPlaceholderPage document={document} />
    </AppShell>
  );
}

