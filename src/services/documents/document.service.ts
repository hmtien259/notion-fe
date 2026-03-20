import {
  ArchiveDocumentInput,
  CreateDocumentInput,
  DocumentId,
  RenameDocumentInput,
  SaveDocumentInput,
} from "@/domain/types/document";
import { buildDocumentTree } from "@/shared/lib/build-document-tree";
import { DocumentRepository } from "./document.repository";
import { getDocumentRepository } from "./document-repository.factory";

export class DocumentService {
  constructor(private readonly repository: DocumentRepository) {}

  async listDocuments() {
    return this.repository.list();
  }

  async listDocumentNavigation() {
    return this.repository.listNavigation();
  }

  async listDocumentTree() {
    const documents = await this.repository.list();
    return buildDocumentTree(documents);
  }

  async getDocumentById(documentId: DocumentId) {
    return this.repository.getById(documentId);
  }

  async createDocument(input: CreateDocumentInput) {
    return this.repository.create(input);
  }

  async renameDocument(input: RenameDocumentInput) {
    return this.repository.rename(input);
  }

  async saveDocument(input: SaveDocumentInput) {
    return this.repository.save(input);
  }

  async archiveDocument(input: ArchiveDocumentInput) {
    return this.repository.archive(input);
  }
}

let documentService: DocumentService | null = null;

export function getDocumentService() {
  if (!documentService) {
    documentService = new DocumentService(getDocumentRepository());
  }

  return documentService;
}
