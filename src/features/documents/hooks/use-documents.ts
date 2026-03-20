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
import { useToast } from "@/shared/hooks/use-toast";
import { invalidateDocumentQueries } from "../lib/document-query-cache";
import {
  documentDetailQueryOptions,
  documentTreeQueryOptions,
} from "../lib/document-query-options";
import { documentQueryKeys } from "../lib/document-query-keys";

const documentService = getDocumentService();

export function useDocumentTreeQuery() {
  return useQuery(documentTreeQueryOptions());
}

export function useDocumentDetailQuery(documentId: DocumentId) {
  return useQuery(documentDetailQueryOptions(documentId));
}

export function useCreateDocumentMutation() {
  const queryClient = useQueryClient();
  const router = useRouter();
  const { toast } = useToast();

  return useMutation({
    mutationFn: (input: CreateDocumentInput) => documentService.createDocument(input),
    onSuccess: async (document) => {
      await invalidateDocumentQueries(queryClient);
      toast({
        title: "Page created",
        description: `${document.title} is ready to edit.`,
      });
      router.push(`/documents/${document.id}`);
    },
  });
}

export function useRenameDocumentMutation() {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: (input: RenameDocumentInput) => documentService.renameDocument(input),
    onSuccess: async (document) => {
      await invalidateDocumentQueries(queryClient);
      queryClient.setQueryData(documentQueryKeys.detail(document.id), document);
      toast({
        title: "Page renamed",
        description: `Updated to ${document.title}.`,
      });
    },
  });
}

export function useSaveDocumentMutation() {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: (input: SaveDocumentInput) => documentService.saveDocument(input),
    onSuccess: async (document) => {
      queryClient.setQueryData(documentQueryKeys.detail(document.id), document);
      await invalidateDocumentQueries(queryClient);
    },
    onError: () => {
      toast({
        title: "Autosave failed",
        description: "We could not persist your latest edits to the mock layer.",
      });
    },
  });
}

export function useArchiveDocumentMutation(activeDocumentId?: DocumentId) {
  const queryClient = useQueryClient();
  const router = useRouter();
  const { toast } = useToast();

  return useMutation({
    mutationFn: (documentId: DocumentId) => documentService.archiveDocument({ id: documentId }),
    onSuccess: async (_, archivedDocumentId) => {
      await invalidateDocumentQueries(queryClient);
      toast({
        title: "Page archived",
        description: "The page was removed from the active workspace.",
      });

      if (activeDocumentId === archivedDocumentId) {
        router.push("/");
      }
    },
  });
}
