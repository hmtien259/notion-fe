"use client";

import { ChevronRight } from "lucide-react";
import { DocumentTreeNode } from "@/domain/types/document";
import { cn } from "@/shared/lib/utils";
import { useDocumentTreeUiStore } from "../../hooks/use-document-tree-ui-store";
import { DocumentTreeItem } from "./document-tree-item";

interface DocumentTreeBranchProps {
  node: DocumentTreeNode;
  depth: number;
  activeDocumentId?: string;
}

export function DocumentTreeBranch({ node, depth, activeDocumentId }: DocumentTreeBranchProps) {
  const expandedIds = useDocumentTreeUiStore((state) => state.expandedIds);
  const toggleExpanded = useDocumentTreeUiStore((state) => state.toggleExpanded);
  const isExpanded = expandedIds[node.id] ?? depth < 1;
  const hasChildren = node.children.length > 0;

  return (
    <div>
      <div className="flex items-center gap-1">
        <button
          className={cn(
            "flex h-7 w-7 shrink-0 items-center justify-center rounded-lg text-[var(--muted-foreground)] transition hover:bg-[var(--surface-elevated)]",
            !hasChildren && "pointer-events-none opacity-0",
          )}
          type="button"
          aria-label={isExpanded ? "Thu gọn trang" : "Mở rộng trang"}
          onClick={() => toggleExpanded(node.id)}
        >
          <ChevronRight className={cn("h-4 w-4 transition-transform", isExpanded && "rotate-90")} />
        </button>

        <div className="min-w-0 flex-1">
          <DocumentTreeItem node={node} depth={depth} activeDocumentId={activeDocumentId} />
        </div>
      </div>

      {hasChildren && isExpanded ? (
        <div className="animate-fade-up mt-1 space-y-1 overflow-hidden">
          {node.children.map((child) => (
            <DocumentTreeBranch key={child.id} node={child} depth={depth + 1} activeDocumentId={activeDocumentId} />
          ))}
        </div>
      ) : null}
    </div>
  );
}
