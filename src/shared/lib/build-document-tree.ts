import { DocumentSummary, DocumentTreeNode } from "@/domain/types/document";

export function buildDocumentTree(documents: DocumentSummary[]): DocumentTreeNode[] {
  const map = new Map<string, DocumentTreeNode>();

  for (const document of documents) {
    map.set(document.id, { ...document, children: [] });
  }

  const roots: DocumentTreeNode[] = [];

  for (const document of documents) {
    const node = map.get(document.id);

    if (!node) {
      continue;
    }

    if (!document.parentId) {
      roots.push(node);
      continue;
    }

    const parent = map.get(document.parentId);

    if (!parent) {
      roots.push(node);
      continue;
    }

    parent.children.push(node);
  }

  return roots;
}
