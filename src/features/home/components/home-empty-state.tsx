import Link from "next/link";
import { ArrowRight, FileText } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";

export function HomeEmptyState() {
  return (
    <section className="surface-card relative overflow-hidden rounded-[32px] border border-[var(--border)] px-8 py-12 sm:px-10 lg:px-14 lg:py-16">
      <div className="absolute inset-x-0 top-0 h-40 bg-gradient-to-r from-amber-100/50 via-transparent to-transparent dark:from-amber-500/10" />
      <div className="relative max-w-3xl">
        <div className="inline-flex items-center gap-2 rounded-full border border-[var(--border)] bg-[var(--surface-elevated)] px-3 py-1 text-xs uppercase tracking-[0.22em] text-[var(--muted-foreground)]">
          <FileText className="h-3.5 w-3.5" />
          Frontend MVP
        </div>
        <h1 className="editor-display mt-6 text-4xl leading-tight text-[var(--foreground)] sm:text-5xl">
          A calm, scalable shell for a Notion-like editor.
        </h1>
        <p className="mt-6 max-w-2xl text-base leading-8 text-[var(--muted-foreground)]">
          This phase focuses on structure, routing, theming, and reusable layout pieces so future editor work can grow cleanly.
        </p>
        <div className="mt-10 flex flex-wrap items-center gap-3">
          <Link href="/documents/welcome" className={buttonVariants()}>
            Open sample document
            <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
          <Link href="/documents/product-spec" className={buttonVariants({ variant: "outline" })}>
            View document route
          </Link>
        </div>
      </div>
    </section>
  );
}
