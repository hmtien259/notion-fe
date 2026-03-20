export type DocumentId = string;

export interface RichTextMark {
  type: string;
  attrs?: Record<string, unknown>;
}

export interface RichTextNode {
  type?: string;
  attrs?: Record<string, unknown>;
  content?: RichTextNode[];
  marks?: RichTextMark[];
  text?: string;
}

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
  content: RichTextNode;
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

export interface SaveDocumentInput {
  id: DocumentId;
  title: string;
  content: RichTextNode;
  icon?: string;
  coverStyle?: string;
}

export interface DocumentNavigationItem {
  id: DocumentId;
  title: string;
  icon: string;
  parentId: DocumentId | null;
  breadcrumb: string[];
}
