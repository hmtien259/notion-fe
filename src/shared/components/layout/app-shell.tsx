import { ReactNode } from "react";
import { AppHeader } from "./app-header";
import { AppSidebar } from "./app-sidebar";

interface AppShellProps {
  children: ReactNode;
  title: ReactNode;
  description: ReactNode;
  activeDocumentId?: string;
}

export function AppShell({ children, title, description, activeDocumentId }: AppShellProps) {
  return (
    <main className="min-h-screen px-4 py-4 sm:px-6 sm:py-6 lg:px-8 lg:py-8">
      <div className="mx-auto grid min-h-[calc(100vh-2rem)] max-w-[1600px] gap-4 lg:grid-cols-[280px_minmax(0,1fr)]">
        <AppSidebar activeDocumentId={activeDocumentId} />
        <div className="flex min-h-0 flex-col gap-4">
          <AppHeader title={title} description={description} />
          <section className="min-h-0 flex-1">{children}</section>
        </div>
      </div>
    </main>
  );
}

