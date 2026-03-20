import { Editor } from "@tiptap/react";

export interface EditorToolbarAction {
  id: string;
  label: string;
  isActive: (editor: Editor) => boolean;
  run: (editor: Editor) => void;
}

export const editorToolbarActions: EditorToolbarAction[] = [
  {
    id: "paragraph",
    label: "Văn bản",
    isActive: (editor) => editor.isActive("paragraph"),
    run: (editor) => editor.chain().focus().setParagraph().run(),
  },
  {
    id: "heading-1",
    label: "H1",
    isActive: (editor) => editor.isActive("heading", { level: 1 }),
    run: (editor) => editor.chain().focus().toggleHeading({ level: 1 }).run(),
  },
  {
    id: "heading-2",
    label: "H2",
    isActive: (editor) => editor.isActive("heading", { level: 2 }),
    run: (editor) => editor.chain().focus().toggleHeading({ level: 2 }).run(),
  },
  {
    id: "bullet-list",
    label: "Danh sách",
    isActive: (editor) => editor.isActive("bulletList"),
    run: (editor) => editor.chain().focus().toggleBulletList().run(),
  },
  {
    id: "ordered-list",
    label: "Đánh số",
    isActive: (editor) => editor.isActive("orderedList"),
    run: (editor) => editor.chain().focus().toggleOrderedList().run(),
  },
  {
    id: "task-list",
    label: "Việc cần làm",
    isActive: (editor) => editor.isActive("taskList"),
    run: (editor) => editor.chain().focus().toggleTaskList().run(),
  },
  {
    id: "blockquote",
    label: "Trích dẫn",
    isActive: (editor) => editor.isActive("blockquote"),
    run: (editor) => editor.chain().focus().toggleBlockquote().run(),
  },
  {
    id: "code-block",
    label: "Code",
    isActive: (editor) => editor.isActive("codeBlock"),
    run: (editor) => editor.chain().focus().toggleCodeBlock().run(),
  },
];
