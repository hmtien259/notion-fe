"use client";

import Link from "next/link";
import { Archive, MoreHorizontal, Plus } from "lucide-react";
import { useState } from "react";
import { DocumentTreeNode } from "@/domain/types/document";
import { cn } from "@/shared/lib/utils";
import {
  useArchiveDocumentMutation,
  useCreateDocumentMutation,
  useRenameDocumentMutation,
} from "../../hooks/use-documents";
import { useDocumentTreeUiStore } from "../../hooks/use-document-tree-ui-store";

interface DocumentTreeItemProps {
  node: DocumentTreeNode;
  depth: number;
  activeDocumentId?: string;
}

export function DocumentTreeItem({ node, depth, activeDocumentId }: DocumentTreeItemProps) {
  const [draftTitle, setDraftTitle] = useState(node.title);
  const editingId = useDocumentTreeUiStore((state) => state.editingId);
  const setEditingId = useDocumentTreeUiStore((state) => state.setEditingId);
  const ensureExpanded = useDocumentTreeUiStore((state) => state.ensureExpanded);
  const createDocumentMutation = useCreateDocumentMutation();
  const renameDocumentMutation = useRenameDocumentMutation();
  const archiveDocumentMutation = useArchiveDocumentMutation(activeDocumentId);
  const isActive = activeDocumentId === node.id;
  const isEditing = editingId === node.id;

  function handleRenameCommit() {
    const nextTitle = draftTitle.trim() || "Untitled";
    setDraftTitle(nextTitle);

    if (nextTitle !== node.title) {
      renameDocumentMutation.mutate({ id: node.id, title: nextTitle });
    }

    setEditingId(null);
  }

  return (
    <div className="group flex min-w-0 items-center gap-2">
      {isEditing ? (
        <div
          className={cn(
            "flex min-w-0 flex-1 items-center gap-3 rounded-2xl px-3 py-2 text-sm",
            isActive ? "bg-[var(--surface-elevated)] text-[var(--foreground)]" : "text-[var(--foreground)]",
          )}
          style={{ marginLeft: `${depth * 12}px` }}
        >
          <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-xl border border-[var(--border)] bg-[var(--surface-elevated)] text-[11px] font-semibold">
            {node.icon}
          </span>
          <input
            autoFocus
            value={draftTitle}
            onChange={(event) => setDraftTitle(event.target.value)}
            onBlur={handleRenameCommit}
            onKeyDown={(event) => {
              if (event.key === "Enter") {
                handleRenameCommit();
              }

              if (event.key === "Escape") {
                setDraftTitle(node.title);
                setEditingId(null);
              }
            }}
            className="h-8 min-w-0 flex-1 rounded-lg border border-[var(--border)] bg-transparent px-2 outline-none ring-0"
          />
        </div>
      ) : (
        <Link
          href={`/documents/${node.id}`}
          className={cn(
            "flex min-w-0 flex-1 items-center gap-3 rounded-2xl px-3 py-2 text-sm transition",
            isActive
              ? "bg-[var(--surface-elevated)] text-[var(--foreground)]"
              : "text-[var(--muted-foreground)] hover:bg-[var(--surface-elevated)]/70",
          )}
          style={{ marginLeft: `${depth * 12}px` }}
          onDoubleClick={(event) => {
            event.preventDefault();
            setEditingId(node.id);
            setDraftTitle(node.title);
          }}
        >
          <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-xl border border-[var(--border)] bg-[var(--surface-elevated)] text-[11px] font-semibold">
            {node.icon}
          </span>
          <span className="truncate">{node.title}</span>
        </Link>
      )}

      <div className="flex items-center gap-1 opacity-0 transition group-hover:opacity-100">
        <button
          className="flex h-8 w-8 items-center justify-center rounded-lg text-[var(--muted-foreground)] transition hover:bg-[var(--surface-elevated)] hover:text-[var(--foreground)]"
          type="button"
          aria-label="Create child page"
          onClick={() => {
            ensureExpanded(node.id);
            createDocumentMutation.mutate({ parentId: node.id });
          }}
        >
          <Plus className="h-4 w-4" />
        </button>
        <button
          className="flex h-8 w-8 items-center justify-center rounded-lg text-[var(--muted-foreground)] transition hover:bg-[var(--surface-elevated)] hover:text-[var(--foreground)]"
          type="button"
          aria-label="Rename page"
          onClick={() => {
            setEditingId(node.id);
            setDraftTitle(node.title);
          }}
        >
          <MoreHorizontal className="h-4 w-4" />
        </button>
        <button
          className="flex h-8 w-8 items-center justify-center rounded-lg text-[var(--muted-foreground)] transition hover:bg-[var(--surface-elevated)] hover:text-[var(--foreground)]"
          type="button"
          aria-label="Archive page"
          onClick={() => archiveDocumentMutation.mutate(node.id)}
        >
          <Archive className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}
