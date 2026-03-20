import { Document, RichTextNode } from "@/domain/types/document";

function createDocumentContent(nodes: RichTextNode[]): RichTextNode {
  return {
    type: "doc",
    content: nodes,
  };
}

export const mockDocumentsSeed: Document[] = [
  {
    id: "workspace",
    parentId: null,
    title: "Workspace",
    icon: "WS",
    isArchived: false,
    updatedAt: "2026-03-20T09:00:00.000Z",
    coverStyle: "linear-gradient(135deg, rgba(186,145,93,0.92), rgba(105,74,41,0.9))",
    preview: "High-level workspace overview for the Notion-like editor MVP and its frontend roadmap.",
    content: createDocumentContent([
      {
        type: "heading",
        attrs: { level: 1 },
        content: [{ type: "text", text: "Frontend editor foundation" }],
      },
      {
        type: "paragraph",
        content: [
          {
            type: "text",
            text: "This workspace is now ready for a real editable document experience with typed data flow and mock persistence.",
          },
        ],
      },
      {
        type: "bulletList",
        content: [
          {
            type: "listItem",
            content: [{ type: "paragraph", content: [{ type: "text", text: "Backend-ready repository layer" }] }],
          },
          {
            type: "listItem",
            content: [{ type: "paragraph", content: [{ type: "text", text: "Recursive page navigation" }] }],
          },
          {
            type: "listItem",
            content: [{ type: "paragraph", content: [{ type: "text", text: "Autosave-ready editor shell" }] }],
          },
        ],
      },
      {
        type: "taskList",
        content: [
          {
            type: "taskItem",
            attrs: { checked: true },
            content: [{ type: "paragraph", content: [{ type: "text", text: "Finish Phase 2 tree navigation" }] }],
          },
          {
            type: "taskItem",
            attrs: { checked: false },
            content: [{ type: "paragraph", content: [{ type: "text", text: "Build Phase 3 editor MVP" }] }],
          },
        ],
      },
    ]),
  },
  {
    id: "getting-started",
    parentId: "workspace",
    title: "Getting Started",
    icon: "GS",
    isArchived: false,
    updatedAt: "2026-03-20T09:10:00.000Z",
    coverStyle: "linear-gradient(135deg, rgba(232,223,208,0.95), rgba(177,152,120,0.85))",
    preview: "Project goals, architecture notes, and setup guidance for the FE-first product approach.",
    content: createDocumentContent([
      {
        type: "heading",
        attrs: { level: 2 },
        content: [{ type: "text", text: "How this MVP is structured" }],
      },
      {
        type: "paragraph",
        content: [
          {
            type: "text",
            text: "We build the frontend first, but every document operation already passes through services and repositories so API integration later is straightforward.",
          },
        ],
      },
      {
        type: "blockquote",
        content: [
          {
            type: "paragraph",
            content: [{ type: "text", text: "The UI should feel like a product foundation, not a throwaway demo." }],
          },
        ],
      },
    ]),
  },
  {
    id: "product-strategy",
    parentId: "workspace",
    title: "Product Strategy",
    icon: "PS",
    isArchived: false,
    updatedAt: "2026-03-20T09:20:00.000Z",
    coverStyle: "linear-gradient(135deg, rgba(207,181,143,0.9), rgba(137,101,63,0.88))",
    preview: "A placeholder document for editor scope, content system priorities, and future collaboration flows.",
    content: createDocumentContent([
      {
        type: "paragraph",
        content: [
          {
            type: "text",
            text: "The first editor version should feel fast, calm, and dependable even before collaboration or backend syncing exists.",
          },
        ],
      },
      {
        type: "orderedList",
        content: [
          {
            type: "listItem",
            content: [{ type: "paragraph", content: [{ type: "text", text: "Create a strong editing baseline" }] }],
          },
          {
            type: "listItem",
            content: [{ type: "paragraph", content: [{ type: "text", text: "Add slash commands next" }] }],
          },
          {
            type: "listItem",
            content: [{ type: "paragraph", content: [{ type: "text", text: "Prepare local draft autosave before APIs" }] }],
          },
        ],
      },
    ]),
  },
  {
    id: "editor-principles",
    parentId: "product-strategy",
    title: "Editor Principles",
    icon: "EP",
    isArchived: false,
    updatedAt: "2026-03-20T09:35:00.000Z",
    coverStyle: "linear-gradient(135deg, rgba(156,184,176,0.94), rgba(74,106,100,0.9))",
    preview: "Guiding principles for clarity, keyboard-friendly interactions, and a calm Notion-inspired writing experience.",
    content: createDocumentContent([
      {
        type: "paragraph",
        content: [
          {
            type: "text",
            text: "Typography and spacing should help long-form editing feel breathable rather than cramped.",
          },
        ],
      },
      {
        type: "codeBlock",
        attrs: { language: "ts" },
        content: [{ type: "text", text: "const autosaveDelay = 800;" }],
      },
    ]),
  },
  {
    id: "design-system",
    parentId: "workspace",
    title: "Design System",
    icon: "DS",
    isArchived: false,
    updatedAt: "2026-03-20T09:45:00.000Z",
    coverStyle: "linear-gradient(135deg, rgba(225,213,188,0.95), rgba(168,132,89,0.88))",
    preview: "Typography, spacing, colors, and reusable UI conventions for the frontend MVP.",
    content: createDocumentContent([
      {
        type: "heading",
        attrs: { level: 3 },
        content: [{ type: "text", text: "Visual notes" }],
      },
      {
        type: "paragraph",
        content: [
          {
            type: "text",
            text: "The editor surface should stay minimal and soft, with enough density for productivity but enough whitespace for focus.",
          },
        ],
      },
    ]),
  },
  {
    id: "motion-notes",
    parentId: "design-system",
    title: "Motion Notes",
    icon: "MN",
    isArchived: false,
    updatedAt: "2026-03-20T10:00:00.000Z",
    coverStyle: "linear-gradient(135deg, rgba(189,165,129,0.92), rgba(102,83,57,0.88))",
    preview: "Notes on subtle transitions, hover feedback, and how to keep interface motion useful rather than noisy.",
    content: createDocumentContent([
      {
        type: "paragraph",
        content: [
          {
            type: "text",
            text: "Motion should confirm state changes, not compete with the act of writing.",
          },
        ],
      },
    ]),
  },
];
