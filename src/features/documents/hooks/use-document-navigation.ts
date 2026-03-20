"use client";

import { useQuery } from "@tanstack/react-query";
import { documentNavigationQueryOptions } from "../lib/document-query-options";

export function useDocumentNavigationQuery() {
  return useQuery(documentNavigationQueryOptions());
}
