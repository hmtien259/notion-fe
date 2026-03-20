import { HomeEmptyState } from "@/features/home/components/home-empty-state";
import { AppShell } from "@/shared/components/layout/app-shell";

export default function HomePage() {
  return (
    <AppShell
      title="Trang chủ"
      description="Nền tảng giao diện gọn gàng cho một trình soạn thảo lấy cảm hứng từ Notion."
    >
      <HomeEmptyState />
    </AppShell>
  );
}
