import {
  ArchiveDocumentInput,
  CreateDocumentInput,
  Document,
  DocumentId,
  DocumentNavigationItem,
  SaveDocumentInput,
  DocumentSummary,
  RenameDocumentInput,
} from "@/domain/types/document";

export interface DocumentRepository {
  list(): Promise<DocumentSummary[]>;
  listNavigation(): Promise<DocumentNavigationItem[]>;
  getById(documentId: DocumentId): Promise<Document | null>;
  create(input: CreateDocumentInput): Promise<Document>;
  rename(input: RenameDocumentInput): Promise<Document>;
  save(input: SaveDocumentInput): Promise<Document>;
  archive(input: ArchiveDocumentInput): Promise<void>;
}
