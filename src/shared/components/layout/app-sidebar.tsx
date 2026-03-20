import Link from "next/link";
import { FileText, Home } from "lucide-react";
import { getDocumentService } from "@/services/documents/document.service";
import { cn } from "@/shared/lib/utils";

interface AppSidebarProps {
  activeDocumentId?: string;
}

export async function AppSidebar({ activeDocumentId }: AppSidebarProps) {
  const documents = await getDocumentService().listDocuments();

  return (
    <aside className="surface-card flex h-full min-h-0 flex-col rounded-[28px] border border-[var(--border)] bg-[var(--sidebar)] p-3">
      <div className="rounded-[22px] border border-[var(--border)] bg-[var(--surface-elevated)] p-4">
        <p className="text-xs uppercase tracking-[0.24em] text-[var(--muted-foreground)]">Notion HMT</p>
        <h1 className="mt-3 text-lg font-semibold text-[var(--sidebar-foreground)]">Editor MVP</h1>
        <p className="mt-2 text-sm leading-6 text-[var(--muted-foreground)]">
          Feature-ready shell with room for editor, slash command, autosave, and backend integration.
        </p>
      </div>

      <nav className="mt-4 space-y-1">
        <Link
          href="/"
          className={cn(
            "flex items-center gap-3 rounded-2xl px-3 py-2.5 text-sm transition",
            !activeDocumentId
              ? "bg-[var(--surface-elevated)] text-[var(--foreground)]"
              : "text-[var(--muted-foreground)] hover:bg-[var(--surface-elevated)]/70",
          )}
        >
          <Home className="h-4 w-4" />
          Home
        </Link>

        <div className="pt-3">
          <p className="px-3 text-xs uppercase tracking-[0.22em] text-[var(--muted-foreground)]">Documents</p>
          <div className="mt-2 space-y-1">
            {documents.map((document) => (
              <Link
                key={document.id}
                href={`/documents/${document.id}`}
                className={cn(
                  "flex items-center gap-3 rounded-2xl px-3 py-2.5 text-sm transition",
                  activeDocumentId === document.id
                    ? "bg-[var(--surface-elevated)] text-[var(--foreground)]"
                    : "text-[var(--muted-foreground)] hover:bg-[var(--surface-elevated)]/70",
                )}
              >
                <span className="flex h-7 w-7 items-center justify-center rounded-xl border border-[var(--border)] bg-[var(--surface-elevated)] text-[11px] font-semibold">
                  {document.icon}
                </span>
                <span className="truncate">{document.title}</span>
                <FileText className="ml-auto h-4 w-4 opacity-40" />
              </Link>
            ))}
          </div>
        </div>
      </nav>
    </aside>
  );
}

