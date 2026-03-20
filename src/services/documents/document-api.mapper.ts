import {
  Document,
  DocumentNavigationItem,
  DocumentSummary,
  DocumentTreeNode,
  RichTextNode,
} from "@/domain/types/document";
import { ApiDocumentDetail, ApiDocumentTreeNode } from "./document-api.types";

export function mapApiDocumentTreeNode(node: ApiDocumentTreeNode): DocumentTreeNode {
  return {
    id: node.id,
    parentId: node.parentId,
    title: node.title,
    icon: node.icon,
    coverStyle: node.coverStyle ?? undefined,
    isArchived: false,
    updatedAt: node.updatedAt,
    children: node.children.map(mapApiDocumentTreeNode),
  };
}

export function flattenDocumentTreeToSummary(nodes: DocumentTreeNode[]): DocumentSummary[] {
  return nodes.flatMap((node) => [
    {
      id: node.id,
      parentId: node.parentId,
      title: node.title,
      icon: node.icon,
      coverStyle: node.coverStyle,
      isArchived: false,
      updatedAt: node.updatedAt,
    },
    ...flattenDocumentTreeToSummary(node.children),
  ]);
}

export function flattenDocumentTreeToNavigation(
  nodes: DocumentTreeNode[],
  breadcrumb: string[] = [],
): DocumentNavigationItem[] {
  return nodes.flatMap((node) => {
    const nextBreadcrumb = [...breadcrumb, node.title];

    return [
      {
        id: node.id,
        title: node.title,
        icon: node.icon,
        parentId: node.parentId,
        breadcrumb: nextBreadcrumb,
      },
      ...flattenDocumentTreeToNavigation(node.children, nextBreadcrumb),
    ];
  });
}

export function mapApiDocumentDetail(document: ApiDocumentDetail): Document {
  return {
    id: document.id,
    parentId: document.parentId,
    title: document.title,
    icon: document.icon,
    coverStyle: document.coverStyle ?? undefined,
    isArchived: false,
    updatedAt: document.updatedAt,
    preview: document.preview,
    content: document.content as RichTextNode,
  };
}
