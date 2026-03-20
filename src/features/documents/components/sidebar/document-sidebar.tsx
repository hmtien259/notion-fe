"use client";

import Link from "next/link";
import { Home, Plus } from "lucide-react";
import { usePathname } from "next/navigation";
import { cn } from "@/shared/lib/utils";
import { useCreateDocumentMutation, useDocumentTreeQuery } from "../../hooks/use-documents";
import { DocumentTreeBranch } from "./document-tree-branch";

interface DocumentSidebarProps {
  activeDocumentId?: string;
}

export function DocumentSidebar({ activeDocumentId }: DocumentSidebarProps) {
  const pathname = usePathname();
  const treeQuery = useDocumentTreeQuery();
  const createDocumentMutation = useCreateDocumentMutation();

  return (
    <aside className="surface-card flex h-full min-h-0 flex-col rounded-[28px] border border-[var(--border)] bg-[var(--sidebar)] p-3">
      <div className="rounded-[22px] border border-[var(--border)] bg-[var(--surface-elevated)] p-4">
        <div className="flex items-start justify-between gap-3">
          <div>
            <p className="text-xs uppercase tracking-[0.24em] text-[var(--muted-foreground)]">Notion HMT</p>
            <h1 className="mt-3 text-lg font-semibold text-[var(--sidebar-foreground)]">Editor MVP</h1>
            <p className="mt-2 text-sm leading-6 text-[var(--muted-foreground)]">
              Nested documents, mock-backed actions, and backend-ready data flow.
            </p>
          </div>
          <button
            className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-[var(--border)] bg-[var(--surface-elevated)] text-[var(--foreground)] transition hover:bg-white/90 dark:hover:bg-white/10"
            type="button"
            aria-label="Create new page"
            onClick={() => createDocumentMutation.mutate({ parentId: null })}
          >
            <Plus className="h-4 w-4" />
          </button>
        </div>
      </div>

      <nav className="mt-4 min-h-0 flex-1">
        <Link
          href="/"
          className={cn(
            "flex items-center gap-3 rounded-2xl px-3 py-2.5 text-sm transition",
            pathname === "/"
              ? "bg-[var(--surface-elevated)] text-[var(--foreground)]"
              : "text-[var(--muted-foreground)] hover:bg-[var(--surface-elevated)]/70",
          )}
        >
          <Home className="h-4 w-4" />
          Home
        </Link>

        <div className="mt-4">
          <div className="flex items-center justify-between px-3">
            <p className="text-xs uppercase tracking-[0.22em] text-[var(--muted-foreground)]">Documents</p>
            {createDocumentMutation.isPending ? (
              <span className="text-[11px] text-[var(--muted-foreground)]">Creating...</span>
            ) : null}
          </div>

          <div className="mt-2 space-y-1">
            {treeQuery.isLoading ? <p className="px-3 py-3 text-sm text-[var(--muted-foreground)]">Loading pages...</p> : null}
            {treeQuery.data?.map((node) => (
              <DocumentTreeBranch key={node.id} node={node} depth={0} activeDocumentId={activeDocumentId} />
            ))}
          </div>
        </div>
      </nav>
    </aside>
  );
}

