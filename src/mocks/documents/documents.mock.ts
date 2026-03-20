import { Document } from "@/domain/types/document";

export const mockDocuments: Document[] = [
  {
    id: "welcome",
    parentId: null,
    title: "Welcome",
    icon: "W",
    isArchived: false,
    updatedAt: "2026-03-20T09:00:00.000Z",
    coverStyle: "linear-gradient(135deg, rgba(190,146,92,0.92), rgba(129,90,43,0.9))",
    preview: "Project overview, product goals, and the initial setup notes for the editor MVP.",
  },
  {
    id: "product-spec",
    parentId: "welcome",
    title: "Product Spec",
    icon: "PS",
    isArchived: false,
    updatedAt: "2026-03-20T09:20:00.000Z",
    coverStyle: "linear-gradient(135deg, rgba(233,218,195,0.95), rgba(179,145,103,0.85))",
    preview: "Placeholder page for future editor work, slash commands, autosave, and search flows.",
  },
  {
    id: "design-principles",
    parentId: "welcome",
    title: "Design Principles",
    icon: "DP",
    isArchived: false,
    updatedAt: "2026-03-20T09:40:00.000Z",
    coverStyle: "linear-gradient(135deg, rgba(146,180,172,0.95), rgba(74,109,102,0.9))",
    preview: "Warm, calm, readable UI direction inspired by focused writing tools rather than dashboards.",
  },
];

