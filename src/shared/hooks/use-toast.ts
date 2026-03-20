"use client";

import { useToastStore } from "@/shared/components/feedback/toast-store";

export function useToast() {
  const pushToast = useToastStore((state) => state.pushToast);

  return {
    toast: pushToast,
  };
}

