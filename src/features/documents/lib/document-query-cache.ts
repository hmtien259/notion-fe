import { QueryClient } from "@tanstack/react-query";
import { documentQueryKeys } from "./document-query-keys";

export async function invalidateDocumentQueries(queryClient: QueryClient) {
  await Promise.all([
    queryClient.invalidateQueries({ queryKey: documentQueryKeys.all }),
    queryClient.invalidateQueries({ queryKey: documentQueryKeys.navigation() }),
  ]);
}
