"use client";

import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { useDocumentNavigationQuery } from "@/features/documents/hooks/use-document-navigation";

interface DocumentBreadcrumbsProps {
  documentId: string;
}

export function DocumentBreadcrumbs({ documentId }: DocumentBreadcrumbsProps) {
  const navigationQuery = useDocumentNavigationQuery();
  const item = navigationQuery.data?.find((entry) => entry.id === documentId);
  const titleToIdMap = new Map(navigationQuery.data?.map((entry) => [entry.title, entry.id]) ?? []);

  if (navigationQuery.isLoading) {
    return <div className="h-5 w-44 animate-pulse rounded-full bg-black/6 dark:bg-white/8" />;
  }

  if (!item) {
    return <span>Document</span>;
  }

  return (
    <div className="flex flex-wrap items-center gap-1 text-sm text-[var(--muted-foreground)]">
      {item.breadcrumb.map((segment, index) => (
        <span key={`${segment}-${index}`} className="inline-flex items-center gap-1">
          {index > 0 ? <ChevronRight className="h-3.5 w-3.5" /> : null}
          {index === item.breadcrumb.length - 1 ? (
            <span className="font-medium text-[var(--foreground)]">{segment}</span>
          ) : (
            <Link
              href={titleToIdMap.get(segment) ? `/documents/${titleToIdMap.get(segment)}` : "/"}
              className="hover:text-[var(--foreground)]"
            >
              {segment}
            </Link>
          )}
        </span>
      ))}
    </div>
  );
}
