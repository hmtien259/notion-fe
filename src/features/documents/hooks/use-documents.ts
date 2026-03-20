"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import {
  CreateDocumentInput,
  DocumentId,
  RenameDocumentInput,
  SaveDocumentInput,
} from "@/domain/types/document";
import { getDocumentService } from "@/services/documents/document.service";
import { documentQueryKeys } from "../lib/document-query-keys";

const documentService = getDocumentService();

export function useDocumentTreeQuery() {
  return useQuery({
    queryKey: documentQueryKeys.tree(),
    queryFn: () => documentService.listDocumentTree(),
  });
}

export function useDocumentDetailQuery(documentId: DocumentId) {
  return useQuery({
    queryKey: documentQueryKeys.detail(documentId),
    queryFn: () => documentService.getDocumentById(documentId),
    enabled: Boolean(documentId),
  });
}

export function useCreateDocumentMutation() {
  const queryClient = useQueryClient();
  const router = useRouter();

  return useMutation({
    mutationFn: (input: CreateDocumentInput) => documentService.createDocument(input),
    onSuccess: async (document) => {
      await queryClient.invalidateQueries({ queryKey: documentQueryKeys.all });
      router.push(`/documents/${document.id}`);
    },
  });
}

export function useRenameDocumentMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (input: RenameDocumentInput) => documentService.renameDocument(input),
    onSuccess: async (document) => {
      await queryClient.invalidateQueries({ queryKey: documentQueryKeys.all });
      queryClient.setQueryData(documentQueryKeys.detail(document.id), document);
    },
  });
}

export function useSaveDocumentMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (input: SaveDocumentInput) => documentService.saveDocument(input),
    onSuccess: async (document) => {
      queryClient.setQueryData(documentQueryKeys.detail(document.id), document);
      await queryClient.invalidateQueries({ queryKey: documentQueryKeys.tree() });
    },
  });
}

export function useArchiveDocumentMutation(activeDocumentId?: DocumentId) {
  const queryClient = useQueryClient();
  const router = useRouter();

  return useMutation({
    mutationFn: (documentId: DocumentId) => documentService.archiveDocument({ id: documentId }),
    onSuccess: async (_, archivedDocumentId) => {
      await queryClient.invalidateQueries({ queryKey: documentQueryKeys.all });

      if (activeDocumentId === archivedDocumentId) {
        router.push("/");
      }
    },
  });
}
