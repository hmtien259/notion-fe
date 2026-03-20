import {
  ArchiveDocumentInput,
  CreateDocumentInput,
  Document,
  DocumentId,
  DocumentNavigationItem,
  DocumentSummary,
  RenameDocumentInput,
  SaveDocumentInput,
} from "@/domain/types/document";
import { appConfig } from "@/shared/config/app-config";
import { apiClient } from "@/shared/lib/api-client";
import {
  flattenDocumentTreeToNavigation,
  flattenDocumentTreeToSummary,
  mapApiDocumentDetail,
  mapApiDocumentTreeNode,
} from "./document-api.mapper";
import { ApiArchiveDocumentResponse, ApiDocumentDetail, ApiDocumentTreeNode } from "./document-api.types";
import { DocumentRepository } from "./document.repository";
import { ApiClientError } from "@/shared/lib/api-client";

export class ApiDocumentRepository implements DocumentRepository {
  async list(): Promise<DocumentSummary[]> {
    const response = await apiClient<ApiDocumentTreeNode[]>({
      path: `/workspaces/${appConfig.defaultWorkspaceId}/documents/tree`,
    });

    const tree = response.map(mapApiDocumentTreeNode);
    return flattenDocumentTreeToSummary(tree);
  }

  async listNavigation(): Promise<DocumentNavigationItem[]> {
    const response = await apiClient<ApiDocumentTreeNode[]>({
      path: `/workspaces/${appConfig.defaultWorkspaceId}/documents/tree`,
    });

    const tree = response.map(mapApiDocumentTreeNode);
    return flattenDocumentTreeToNavigation(tree);
  }

  async getById(documentId: DocumentId): Promise<Document | null> {
    try {
      const response = await apiClient<ApiDocumentDetail>({
        path: `/documents/${documentId}`,
      });

      return mapApiDocumentDetail(response);
    } catch (error) {
      if (error instanceof ApiClientError && error.status === 404) {
        return null;
      }

      throw error;
    }
  }

  async create(input: CreateDocumentInput): Promise<Document> {
    const path = input.parentId
      ? `/documents/${input.parentId}/children`
      : `/workspaces/${appConfig.defaultWorkspaceId}/documents`;
    const response = await apiClient<ApiDocumentDetail>({
      path,
      method: "POST",
      body: JSON.stringify({
        title: input.title,
      }),
    });

    return mapApiDocumentDetail(response);
  }

  async rename(input: RenameDocumentInput): Promise<Document> {
    const response = await apiClient<ApiDocumentDetail>({
      path: `/documents/${input.id}`,
      method: "PATCH",
      body: JSON.stringify({
        title: input.title,
      }),
    });

    return mapApiDocumentDetail(response);
  }

  async save(input: SaveDocumentInput): Promise<Document> {
    const response = await apiClient<ApiDocumentDetail>({
      path: `/documents/${input.id}/content`,
      method: "PATCH",
      body: JSON.stringify({
        title: input.title,
        icon: input.icon,
        coverStyle: input.coverStyle,
        content: input.content,
      }),
    });

    return mapApiDocumentDetail(response);
  }

  async archive(input: ArchiveDocumentInput): Promise<void> {
    await apiClient<ApiArchiveDocumentResponse>({
      path: `/documents/${input.id}`,
      method: "DELETE",
    });
  }
}
