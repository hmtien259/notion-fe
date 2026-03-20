import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import { AppShell } from "@/shared/components/layout/app-shell";

export default function NotFound() {
  return (
    <AppShell title="Not found" description="The requested page does not exist in this mock workspace.">
      <section className="surface-card flex min-h-[420px] flex-col items-center justify-center rounded-[28px] border border-[var(--border)] px-8 py-14 text-center">
        <p className="text-xs uppercase tracking-[0.24em] text-[var(--muted-foreground)]">404</p>
        <h1 className="editor-display mt-4 text-4xl text-[var(--foreground)]">This page is missing</h1>
        <p className="mt-4 max-w-md text-sm text-[var(--muted-foreground)]">
          The frontend shell is ready, but this route does not map to a mock document yet.
        </p>
        <Link href="/" className={buttonVariants({ className: "mt-8" })}>
          Back to home
        </Link>
      </section>
    </AppShell>
  );
}
