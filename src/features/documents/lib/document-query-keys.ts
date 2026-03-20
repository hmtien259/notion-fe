export const documentQueryKeys = {
  all: ["documents"] as const,
  tree: () => [...documentQueryKeys.all, "tree"] as const,
  detail: (documentId: string) => [...documentQueryKeys.all, "detail", documentId] as const,
};

