import { queryOptions } from "@tanstack/react-query";
import { DocumentId } from "@/domain/types/document";
import { getDocumentService } from "@/services/documents/document.service";
import { documentQueryKeys } from "./document-query-keys";

const documentService = getDocumentService();

export function documentTreeQueryOptions() {
  return queryOptions({
    queryKey: documentQueryKeys.tree(),
    queryFn: () => documentService.listDocumentTree(),
  });
}

export function documentDetailQueryOptions(documentId: DocumentId) {
  return queryOptions({
    queryKey: documentQueryKeys.detail(documentId),
    queryFn: () => documentService.getDocumentById(documentId),
    enabled: Boolean(documentId),
  });
}

export function documentNavigationQueryOptions() {
  return queryOptions({
    queryKey: documentQueryKeys.navigation(),
    queryFn: () => documentService.listDocumentNavigation(),
  });
}

