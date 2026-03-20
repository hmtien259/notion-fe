import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import { AppShell } from "@/shared/components/layout/app-shell";

export default function NotFound() {
  return (
    <AppShell title="Không tìm thấy" description="Trang bạn yêu cầu không tồn tại trong không gian làm việc hiện tại.">
      <section className="surface-card animate-fade-up flex min-h-[420px] flex-col items-center justify-center rounded-[28px] border border-[var(--border)] px-8 py-14 text-center">
        <p className="text-xs uppercase tracking-[0.24em] text-[var(--muted-foreground)]">404</p>
        <h1 className="editor-display mt-4 text-4xl text-[var(--foreground)]">Trang này không tồn tại</h1>
        <p className="mt-4 max-w-md text-sm leading-7 text-[var(--muted-foreground)]">
          Giao diện đã sẵn sàng, nhưng đường dẫn này hiện không khớp với tài liệu nào.
        </p>
        <Link href="/" className={buttonVariants({ className: "mt-8 hover-lift" })}>
          Quay về trang chủ
        </Link>
      </section>
    </AppShell>
  );
}
