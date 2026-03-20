import { Document, DocumentId, DocumentSummary } from "@/domain/types/document";
import { mockDocuments } from "@/mocks/documents/documents.mock";
import { DocumentRepository } from "./document.repository";

const networkDelayMs = 60;

function toSummary(document: Document): DocumentSummary {
  return {
    id: document.id,
    parentId: document.parentId,
    title: document.title,
    icon: document.icon,
    isArchived: document.isArchived,
    updatedAt: document.updatedAt,
  };
}

export class MockDocumentRepository implements DocumentRepository {
  async list(): Promise<DocumentSummary[]> {
    await new Promise((resolve) => setTimeout(resolve, networkDelayMs));
    return mockDocuments.map(toSummary);
  }

  async getById(documentId: DocumentId): Promise<Document | null> {
    await new Promise((resolve) => setTimeout(resolve, networkDelayMs));
    return mockDocuments.find((document) => document.id === documentId) ?? null;
  }
}

