"use client";

import { useQuery } from "@tanstack/react-query";
import { getDocumentService } from "@/services/documents/document.service";

const documentService = getDocumentService();

export function useDocumentNavigationQuery() {
  return useQuery({
    queryKey: ["documents", "navigation"],
    queryFn: () => documentService.listDocumentNavigation(),
  });
}

