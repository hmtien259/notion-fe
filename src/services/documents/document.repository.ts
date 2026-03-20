import {
  ArchiveDocumentInput,
  CreateDocumentInput,
  Document,
  DocumentId,
  DocumentSummary,
  RenameDocumentInput,
} from "@/domain/types/document";

export interface DocumentRepository {
  list(): Promise<DocumentSummary[]>;
  getById(documentId: DocumentId): Promise<Document | null>;
  create(input: CreateDocumentInput): Promise<Document>;
  rename(input: RenameDocumentInput): Promise<Document>;
  archive(input: ArchiveDocumentInput): Promise<void>;
}
