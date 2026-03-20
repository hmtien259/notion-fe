"use client";

import { create } from "zustand";

interface DocumentTreeUiState {
  expandedIds: Record<string, boolean>;
  editingId: string | null;
  ensureExpanded: (documentId: string) => void;
  toggleExpanded: (documentId: string) => void;
  setEditingId: (documentId: string | null) => void;
}

export const useDocumentTreeUiStore = create<DocumentTreeUiState>((set) => ({
  expandedIds: {
    workspace: true,
    "product-strategy": true,
    "design-system": true,
  },
  editingId: null,
  ensureExpanded: (documentId) =>
    set((state) => ({
      expandedIds: {
        ...state.expandedIds,
        [documentId]: true,
      },
    })),
  toggleExpanded: (documentId) =>
    set((state) => ({
      expandedIds: {
        ...state.expandedIds,
        [documentId]: !state.expandedIds[documentId],
      },
    })),
  setEditingId: (editingId) => set({ editingId }),
}));
