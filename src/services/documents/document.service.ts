import { DocumentId } from "@/domain/types/document";
import { MockDocumentRepository } from "./mock-document.repository";

class DocumentService {
  constructor(private readonly repository = new MockDocumentRepository()) {}

  listDocuments() {
    return this.repository.list();
  }

  getDocumentById(documentId: DocumentId) {
    return this.repository.getById(documentId);
  }
}

let documentService: DocumentService | null = null;

export function getDocumentService() {
  if (!documentService) {
    documentService = new DocumentService();
  }

  return documentService;
}

