export interface ApiDocumentTreeNode {
  id: string;
  parentId: string | null;
  title: string;
  icon: string;
  coverStyle: string | null;
  preview: string;
  updatedAt: string;
  children: ApiDocumentTreeNode[];
}

export interface ApiDocumentDetail {
  id: string;
  workspaceId: string;
  parentId: string | null;
  title: string;
  icon: string;
  coverStyle: string | null;
  preview: string;
  content: Record<string, unknown>;
  contentVersion: number;
  createdAt: string;
  updatedAt: string;
}

export interface ApiArchiveDocumentResponse {
  archivedIds: string[];
}

