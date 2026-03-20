import { DocumentSidebar } from "@/features/documents/components/sidebar/document-sidebar";

interface AppSidebarProps {
  activeDocumentId?: string;
}

export function AppSidebar({ activeDocumentId }: AppSidebarProps) {
  return <DocumentSidebar activeDocumentId={activeDocumentId} />;
}
