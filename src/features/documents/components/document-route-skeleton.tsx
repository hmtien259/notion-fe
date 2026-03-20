import { Skeleton } from "@/shared/components/feedback/skeleton";

export function DocumentRouteSkeleton() {
  return (
    <section className="space-y-5">
      <div className="surface-card overflow-hidden rounded-[32px] border border-[var(--border)]">
        <Skeleton className="h-44 w-full rounded-none" />
        <div className="px-6 pb-8 sm:px-10 sm:pb-10">
          <Skeleton className="-mt-8 h-16 w-16 rounded-[22px]" />
          <Skeleton className="mt-5 h-12 w-3/5" />
          <Skeleton className="mt-4 h-5 w-1/3" />
        </div>
      </div>
      <Skeleton className="h-16 rounded-[24px]" />
      <Skeleton className="h-[420px] rounded-[32px]" />
    </section>
  );
}

