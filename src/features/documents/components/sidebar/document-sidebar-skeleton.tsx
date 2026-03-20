import { Skeleton } from "@/shared/components/feedback/skeleton";

export function DocumentSidebarSkeleton() {
  return (
    <div className="space-y-2">
      <Skeleton className="h-11 rounded-2xl" />
      <Skeleton className="h-11 rounded-2xl" />
      <Skeleton className="ml-6 h-10 rounded-2xl" />
      <Skeleton className="h-11 rounded-2xl" />
    </div>
  );
}
