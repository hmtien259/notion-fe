"use client";

interface DocumentTitleInputProps {
  title: string;
  onChange: (value: string) => void;
}

export function DocumentTitleInput({ title, onChange }: DocumentTitleInputProps) {
  return (
    <input
      value={title}
      onChange={(event) => onChange(event.target.value)}
      placeholder="Untitled"
      className="editor-display w-full border-none bg-transparent text-4xl text-[var(--foreground)] outline-none placeholder:text-[var(--muted-foreground)] sm:text-5xl"
    />
  );
}

