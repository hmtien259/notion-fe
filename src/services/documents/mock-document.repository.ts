import {
  ArchiveDocumentInput,
  CreateDocumentInput,
  Document,
  DocumentId,
  DocumentNavigationItem,
  DocumentSummary,
  RenameDocumentInput,
  RichTextNode,
  SaveDocumentInput,
} from "@/domain/types/document";
import { mockDocumentsSeed } from "@/mocks/documents/documents.mock";
import { DocumentRepository } from "./document.repository";

const networkDelayMs = 80;
const storageKey = "notion-hmt.documents";

function toSummary(document: Document): DocumentSummary {
  return {
    id: document.id,
    parentId: document.parentId,
    title: document.title,
    icon: document.icon,
    coverStyle: document.coverStyle,
    isArchived: document.isArchived,
    updatedAt: document.updatedAt,
  };
}

function createDocumentId(title: string) {
  const normalizedTitle = title
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");

  return `${normalizedTitle || "untitled"}-${Math.random().toString(36).slice(2, 8)}`;
}

function cloneSeed() {
  return structuredClone(mockDocumentsSeed);
}

function extractText(node: RichTextNode | undefined): string[] {
  if (!node) {
    return [];
  }

  const ownText = typeof node.text === "string" ? [node.text] : [];
  const childText = node.content?.flatMap((childNode) => extractText(childNode)) ?? [];

  return [...ownText, ...childText];
}

function createPreview(content: RichTextNode) {
  const previewText = extractText(content).join(" ").replace(/\s+/g, " ").trim();
  return previewText.slice(0, 160) || "Empty document";
}

function buildBreadcrumb(documentId: DocumentId, documents: Document[]) {
  const breadcrumb: string[] = [];
  let current = documents.find((document) => document.id === documentId && !document.isArchived) ?? null;

  while (current) {
    breadcrumb.unshift(current.title);
    current = current.parentId
      ? documents.find((document) => document.id === current?.parentId && !document.isArchived) ?? null
      : null;
  }

  return breadcrumb;
}

class MockDocumentStorage {
  private documents: Document[] | null = null;

  private isBrowser() {
    return typeof window !== "undefined";
  }

  private loadDocuments() {
    if (this.documents) {
      return this.documents;
    }

    if (!this.isBrowser()) {
      this.documents = cloneSeed();
      return this.documents;
    }

    const rawValue = window.localStorage.getItem(storageKey);

    if (!rawValue) {
      this.documents = cloneSeed();
      this.persist();
      return this.documents;
    }

    try {
      this.documents = JSON.parse(rawValue) as Document[];
    } catch {
      this.documents = cloneSeed();
      this.persist();
    }

    return this.documents;
  }

  private persist() {
    if (!this.isBrowser() || !this.documents) {
      return;
    }

    window.localStorage.setItem(storageKey, JSON.stringify(this.documents));
  }

  list() {
    return this.loadDocuments();
  }

  write(documents: Document[]) {
    this.documents = documents;
    this.persist();
  }
}

const storage = new MockDocumentStorage();

export class MockDocumentRepository implements DocumentRepository {
  async list(): Promise<DocumentSummary[]> {
    await new Promise((resolve) => setTimeout(resolve, networkDelayMs));

    return storage
      .list()
      .filter((document) => !document.isArchived)
      .map(toSummary);
  }

  async listNavigation(): Promise<DocumentNavigationItem[]> {
    await new Promise((resolve) => setTimeout(resolve, networkDelayMs));

    const documents = storage.list().filter((document) => !document.isArchived);

    return documents.map((document) => ({
      id: document.id,
      title: document.title,
      icon: document.icon,
      parentId: document.parentId,
      breadcrumb: buildBreadcrumb(document.id, documents),
    }));
  }

  async getById(documentId: DocumentId): Promise<Document | null> {
    await new Promise((resolve) => setTimeout(resolve, networkDelayMs));

    return (
      storage.list().find((document) => document.id === documentId && !document.isArchived) ?? null
    );
  }

  async create(input: CreateDocumentInput): Promise<Document> {
    await new Promise((resolve) => setTimeout(resolve, networkDelayMs));

    const parent = input.parentId
      ? storage.list().find((document) => document.id === input.parentId && !document.isArchived) ?? null
      : null;
    const title = input.title?.trim() || "Chưa đặt tên";
    const createdDocument: Document = {
      id: createDocumentId(title),
      parentId: input.parentId ?? null,
      title,
      icon: title.slice(0, 2).toUpperCase(),
      isArchived: false,
      updatedAt: new Date().toISOString(),
      coverStyle:
        parent?.coverStyle ?? "linear-gradient(135deg, rgba(223,208,183,0.95), rgba(153,118,78,0.88))",
      preview: "New page placeholder. Editor content will be added in the next phase.",
      content: {
        type: "doc",
        content: [
          {
            type: "paragraph",
          },
        ],
      },
    };

    storage.write([...storage.list(), createdDocument]);

    return createdDocument;
  }

  async rename(input: RenameDocumentInput): Promise<Document> {
    await new Promise((resolve) => setTimeout(resolve, networkDelayMs));

    const documents = storage.list();
    const documentIndex = documents.findIndex((document) => document.id === input.id && !document.isArchived);

    if (documentIndex === -1) {
      throw new Error("Document not found");
    }

    const nextTitle = input.title.trim() || "Chưa đặt tên";
    const nextDocuments = [...documents];
    const currentDocument = nextDocuments[documentIndex];

    nextDocuments[documentIndex] = {
      ...currentDocument,
      title: nextTitle,
      icon: nextTitle.slice(0, 2).toUpperCase(),
      updatedAt: new Date().toISOString(),
    };

    storage.write(nextDocuments);

    return nextDocuments[documentIndex];
  }

  async save(input: SaveDocumentInput): Promise<Document> {
    await new Promise((resolve) => setTimeout(resolve, networkDelayMs));

    const documents = storage.list();
    const documentIndex = documents.findIndex((document) => document.id === input.id && !document.isArchived);

    if (documentIndex === -1) {
      throw new Error("Document not found");
    }

    const nextTitle = input.title.trim() || "Chưa đặt tên";
    const nextDocuments = [...documents];
    const currentDocument = nextDocuments[documentIndex];

    nextDocuments[documentIndex] = {
      ...currentDocument,
      title: nextTitle,
      icon: input.icon?.trim() || currentDocument.icon || nextTitle.slice(0, 2).toUpperCase(),
      content: structuredClone(input.content),
      coverStyle: input.coverStyle ?? currentDocument.coverStyle,
      preview: createPreview(input.content),
      updatedAt: new Date().toISOString(),
    };

    storage.write(nextDocuments);

    return nextDocuments[documentIndex];
  }

  async archive(input: ArchiveDocumentInput): Promise<void> {
    await new Promise((resolve) => setTimeout(resolve, networkDelayMs));

    const documents = storage.list();
    const archiveIds = new Set<DocumentId>([input.id]);
    let changed = true;

    while (changed) {
      changed = false;

      for (const document of documents) {
        if (document.parentId && archiveIds.has(document.parentId) && !archiveIds.has(document.id)) {
          archiveIds.add(document.id);
          changed = true;
        }
      }
    }

    storage.write(
      documents.map((document) =>
        archiveIds.has(document.id)
          ? {
              ...document,
              isArchived: true,
              updatedAt: new Date().toISOString(),
            }
          : document,
      ),
    );
  }
}
