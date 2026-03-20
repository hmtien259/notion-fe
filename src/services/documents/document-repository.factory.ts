import { DocumentRepository } from "./document.repository";
import { ApiDocumentRepository } from "./api-document.repository";
import { MockDocumentRepository } from "./mock-document.repository";

let documentRepository: DocumentRepository | null = null;

export function getDocumentRepository() {
  if (!documentRepository) {
    documentRepository =
      process.env.NEXT_PUBLIC_DOCUMENT_DATA_SOURCE === "mock"
        ? new MockDocumentRepository()
        : new ApiDocumentRepository();
  }

  return documentRepository;
}
