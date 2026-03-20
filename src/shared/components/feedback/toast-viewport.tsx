"use client";

import { useEffect } from "react";
import { useToastStore } from "./toast-store";

export function ToastViewport() {
  const toasts = useToastStore((state) => state.toasts);
  const removeToast = useToastStore((state) => state.removeToast);

  useEffect(() => {
    const timeouts = toasts.map((toast) =>
      window.setTimeout(() => {
        removeToast(toast.id);
      }, 2600),
    );

    return () => {
      timeouts.forEach((timeoutId) => window.clearTimeout(timeoutId));
    };
  }, [removeToast, toasts]);

  return (
    <div className="pointer-events-none fixed bottom-4 right-4 z-[70] flex max-w-sm flex-col gap-3">
      {toasts.map((toast) => (
        <div
          key={toast.id}
          className="surface-card pointer-events-auto rounded-2xl border border-[var(--border)] px-4 py-3 shadow-[0_18px_40px_rgba(0,0,0,0.12)]"
        >
          <p className="text-sm font-semibold text-[var(--foreground)]">{toast.title}</p>
          {toast.description ? <p className="mt-1 text-sm text-[var(--muted-foreground)]">{toast.description}</p> : null}
        </div>
      ))}
    </div>
  );
}

