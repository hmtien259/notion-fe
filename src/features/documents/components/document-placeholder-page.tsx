import { Clock3, Sparkles } from "lucide-react";
import { Document } from "@/domain/types/document";
import { formatDocumentDate } from "@/shared/lib/date";

interface DocumentPlaceholderPageProps {
  document: Document;
}

export function DocumentPlaceholderPage({ document }: DocumentPlaceholderPageProps) {
  return (
    <section className="space-y-6">
      <div className="surface-card overflow-hidden rounded-[32px] border border-[var(--border)]">
        <div className="h-44 w-full" style={{ background: document.coverStyle ?? "linear-gradient(135deg, #e7d3bb, #a57b4a)" }} />
        <div className="px-8 pb-10 sm:px-10">
          <div className="-mt-8 flex h-16 w-16 items-center justify-center rounded-[22px] border border-white/70 bg-[var(--surface-elevated)] text-xl font-semibold text-[var(--foreground)] shadow-lg">
            {document.icon}
          </div>
          <h1 className="editor-display mt-5 text-4xl text-[var(--foreground)]">{document.title}</h1>
          <div className="mt-4 flex flex-wrap items-center gap-3 text-sm text-[var(--muted-foreground)]">
            <span className="inline-flex items-center gap-2 rounded-full border border-[var(--border)] bg-[var(--surface-elevated)] px-3 py-1">
              <Clock3 className="h-4 w-4" />
              Updated {formatDocumentDate(document.updatedAt)}
            </span>
            <span className="inline-flex items-center gap-2 rounded-full border border-[var(--border)] bg-[var(--surface-elevated)] px-3 py-1">
              <Sparkles className="h-4 w-4" />
              Placeholder document page
            </span>
          </div>
          <div className="page-copy mt-8 rounded-[24px] border border-[var(--border)] bg-[var(--surface-elevated)] p-6">
            <p>{document.preview}</p>
            <p className="mt-4">
              The tree sidebar in Phase 2 now supports nested pages, inline rename, child page creation, and archive through the mock repository layer.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
