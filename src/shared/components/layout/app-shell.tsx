"use client";

import { ReactNode, useState } from "react";
import { AppHeader } from "./app-header";
import { AppSidebar } from "./app-sidebar";

interface AppShellProps {
  children: ReactNode;
  title: ReactNode;
  description: ReactNode;
  activeDocumentId?: string;
}

export function AppShell({ children, title, description, activeDocumentId }: AppShellProps) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <main className="min-h-screen px-4 py-4 sm:px-6 sm:py-6 lg:px-8 lg:py-8">
      <div className="mx-auto grid min-h-[calc(100vh-2rem)] max-w-[1600px] gap-4 lg:grid-cols-[280px_minmax(0,1fr)]">
        <div
          className={[
            "fixed inset-y-4 left-4 z-40 w-[280px] transition-transform lg:static lg:w-auto",
            isSidebarOpen ? "translate-x-0" : "-translate-x-[120%] lg:translate-x-0",
          ].join(" ")}
        >
          <AppSidebar activeDocumentId={activeDocumentId} />
        </div>
        {isSidebarOpen ? (
          <button
            type="button"
            className="fixed inset-0 z-30 bg-black/20 backdrop-blur-sm lg:hidden"
            aria-label="Close sidebar"
            onClick={() => setIsSidebarOpen(false)}
          />
        ) : null}
        <div className="flex min-h-0 flex-col gap-4">
          <AppHeader title={title} description={description} onToggleSidebar={() => setIsSidebarOpen(true)} />
          <section className="min-h-0 flex-1">{children}</section>
        </div>
      </div>
    </main>
  );
}

