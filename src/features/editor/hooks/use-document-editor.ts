"use client";

import { JSONContent } from "@tiptap/react";
import { useEffect, useMemo, useRef, useState } from "react";
import { Document } from "@/domain/types/document";
import { useSaveDocumentMutation } from "@/features/documents/hooks/use-documents";

function serializeSnapshot(
  title: string,
  content: JSONContent,
  icon?: string,
  coverStyle?: string,
) {
  return JSON.stringify({ title, content, icon, coverStyle });
}

export function useDocumentEditor(document: Document) {
  const saveDocumentMutation = useSaveDocumentMutation();
  const [title, setTitle] = useState(document.title);
  const [content, setContent] = useState<JSONContent>(document.content as JSONContent);
  const [icon, setIcon] = useState(document.icon);
  const [coverStyle, setCoverStyle] = useState(document.coverStyle);
  const [saveState, setSaveState] = useState<"saved" | "saving" | "dirty">("saved");
  const lastSavedSnapshotRef = useRef(
    serializeSnapshot(document.title, document.content as JSONContent, document.icon, document.coverStyle),
  );
  const firstRenderRef = useRef(true);
  const currentDocumentIdRef = useRef(document.id);

  useEffect(() => {
    if (currentDocumentIdRef.current === document.id) {
      return;
    }

    currentDocumentIdRef.current = document.id;
    const nextSnapshot = serializeSnapshot(
      document.title,
      document.content as JSONContent,
      document.icon,
      document.coverStyle,
    );

    setTitle(document.title);
    setContent(document.content as JSONContent);
    setIcon(document.icon);
    setCoverStyle(document.coverStyle);
    setSaveState("saved");
    lastSavedSnapshotRef.current = nextSnapshot;
    firstRenderRef.current = true;
  }, [document.content, document.coverStyle, document.icon, document.id, document.title]);

  const currentSnapshot = useMemo(
    () => JSON.stringify({ title, content, icon, coverStyle }),
    [content, coverStyle, icon, title],
  );

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
          icon,
          coverStyle,
        });

        lastSavedSnapshotRef.current = serializeSnapshot(
          savedDocument.title,
          savedDocument.content as JSONContent,
          savedDocument.icon,
          savedDocument.coverStyle,
        );
        setSaveState("saved");
      } catch {
        setSaveState("dirty");
      }
    }, 800);

    return () => window.clearTimeout(timeoutId);
  }, [content, coverStyle, currentSnapshot, document.id, icon, saveDocumentMutation, title]);

  return {
    title,
    setTitle,
    content,
    setContent,
    icon,
    setIcon,
    coverStyle,
    setCoverStyle,
    saveState,
  };
}
