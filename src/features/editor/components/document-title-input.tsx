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
      placeholder="Chưa đặt tên"
      className="editor-display w-full border-none bg-transparent text-[2.6rem] leading-[1.05] text-[var(--foreground)] outline-none placeholder:text-[var(--muted-foreground)] sm:text-[3.4rem]"
    />
  );
}
