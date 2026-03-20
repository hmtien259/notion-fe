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

export interface DocumentTreeNode extends DocumentSummary {
  children: DocumentTreeNode[];
}

export interface CreateDocumentInput {
  parentId?: DocumentId | null;
  title?: string;
}

export interface RenameDocumentInput {
  id: DocumentId;
  title: string;
}

export interface ArchiveDocumentInput {
  id: DocumentId;
}
