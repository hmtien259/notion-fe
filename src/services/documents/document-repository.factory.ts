import { DocumentRepository } from "./document.repository";
import { MockDocumentRepository } from "./mock-document.repository";

let documentRepository: DocumentRepository | null = null;

export function getDocumentRepository() {
  if (!documentRepository) {
    documentRepository = new MockDocumentRepository();
  }

  return documentRepository;
}

