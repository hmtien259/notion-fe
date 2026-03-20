"use client";

import { ReactNode, useState } from "react";
import { usePathname } from "next/navigation";
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
  const pathname = usePathname();

  return (
    <main className="min-h-screen px-3 py-3 sm:px-5 sm:py-5 lg:px-7 lg:py-7">
      <div className="mx-auto grid min-h-[calc(100vh-1.5rem)] max-w-[1580px] gap-5 lg:grid-cols-[300px_minmax(0,1fr)]">
        <div
          className={[
            "fixed inset-y-3 left-3 z-40 w-[300px] transition-transform duration-300 ease-out lg:static lg:w-auto lg:animate-slide-in-left",
            isSidebarOpen ? "translate-x-0" : "-translate-x-[120%] lg:translate-x-0",
          ].join(" ")}
        >
          <AppSidebar activeDocumentId={activeDocumentId} />
        </div>
        {isSidebarOpen ? (
          <button
            type="button"
            className="animate-overlay-fade fixed inset-0 z-30 bg-black/20 backdrop-blur-sm lg:hidden"
            aria-label="Close sidebar"
            onClick={() => setIsSidebarOpen(false)}
          />
        ) : null}
        <div className="flex min-h-0 flex-col gap-5">
          <AppHeader title={title} description={description} onToggleSidebar={() => setIsSidebarOpen(true)} />
          <section key={pathname} className="animate-fade-up min-h-0 flex-1">
            {children}
          </section>
        </div>
      </div>
    </main>
  );
}

