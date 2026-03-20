import { HomeEmptyState } from "@/features/home/components/home-empty-state";
import { AppShell } from "@/shared/components/layout/app-shell";

export default function HomePage() {
  return (
    <AppShell
      title="Home"
      description="A clean frontend foundation for a Notion-inspired editor."
    >
      <HomeEmptyState />
    </AppShell>
  );
}
