"use client";

import { JSONContent } from "@tiptap/react";
import { useEffect, useMemo, useRef, useState } from "react";
import { Document } from "@/domain/types/document";
import { useSaveDocumentMutation } from "@/features/documents/hooks/use-documents";

function serializeSnapshot(title: string, content: JSONContent) {
  return JSON.stringify({ title, content });
}

export function useDocumentEditor(document: Document) {
  const saveDocumentMutation = useSaveDocumentMutation();
  const [title, setTitle] = useState(document.title);
  const [content, setContent] = useState<JSONContent>(document.content as JSONContent);
  const [saveState, setSaveState] = useState<"saved" | "saving" | "dirty">("saved");
  const lastSavedSnapshotRef = useRef(serializeSnapshot(document.title, document.content as JSONContent));
  const firstRenderRef = useRef(true);
  const currentDocumentIdRef = useRef(document.id);

  useEffect(() => {
    if (currentDocumentIdRef.current === document.id) {
      return;
    }

    currentDocumentIdRef.current = document.id;
    const nextSnapshot = serializeSnapshot(document.title, document.content as JSONContent);

    setTitle(document.title);
    setContent(document.content as JSONContent);
    setSaveState("saved");
    lastSavedSnapshotRef.current = nextSnapshot;
    firstRenderRef.current = true;
  }, [document.id, document.title, document.content]);

  const currentSnapshot = useMemo(() => serializeSnapshot(title, content), [title, content]);

  useEffect(() => {
    if (firstRenderRef.current) {
      firstRenderRef.current = false;
      return;
    }

    if (currentSnapshot === lastSavedSnapshotRef.current) {
      return;
    }

    setSaveState("dirty");

    const timeoutId = window.setTimeout(async () => {
      setSaveState("saving");

      try {
        const savedDocument = await saveDocumentMutation.mutateAsync({
          id: document.id,
          title,
          content,
        });

        lastSavedSnapshotRef.current = serializeSnapshot(
          savedDocument.title,
          savedDocument.content as JSONContent,
        );
        setSaveState("saved");
      } catch {
        setSaveState("dirty");
      }
    }, 800);

    return () => window.clearTimeout(timeoutId);
  }, [content, currentSnapshot, document.id, saveDocumentMutation, title]);

  return {
    title,
    setTitle,
    content,
    setContent,
    saveState,
  };
}
