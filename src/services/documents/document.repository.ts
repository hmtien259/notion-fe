import { Document, DocumentId, DocumentSummary } from "@/domain/types/document";

export interface DocumentRepository {
  list(): Promise<DocumentSummary[]>;
  getById(documentId: DocumentId): Promise<Document | null>;
}

