import { DocumentPageDescription } from "@/features/documents/components/document-page-description";
import { DocumentPageHeader } from "@/features/documents/components/document-page-header";
import { DocumentRouteScreen } from "@/features/documents/components/document-route-screen";
import { AppShell } from "@/shared/components/layout/app-shell";

interface DocumentDetailPageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function DocumentDetailPage({ params }: DocumentDetailPageProps) {
  const { id } = await params;

  return (
    <AppShell
      activeDocumentId={id}
      title={<DocumentPageHeader documentId={id} />}
      description={<DocumentPageDescription documentId={id} />}
    >
      <DocumentRouteScreen documentId={id} />
    </AppShell>
  );
}

