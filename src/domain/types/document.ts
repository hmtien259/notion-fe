export type DocumentId = string;

export interface DocumentSummary {
  id: DocumentId;
  parentId: DocumentId | null;
  title: string;
  icon: string;
  isArchived: boolean;
  updatedAt: string;
}

export interface Document extends DocumentSummary {
  coverStyle?: string;
  preview: string;
}

