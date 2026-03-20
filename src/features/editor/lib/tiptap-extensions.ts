import { Extension } from "@tiptap/core";
import Placeholder from "@tiptap/extension-placeholder";
import TaskItem from "@tiptap/extension-task-item";
import TaskList from "@tiptap/extension-task-list";
import StarterKit from "@tiptap/starter-kit";

const editorShortcuts = Extension.create({
  name: "editorShortcuts",
  addKeyboardShortcuts() {
    return {
      "Mod-Alt-1": () => this.editor.chain().focus().toggleHeading({ level: 1 }).run(),
      "Mod-Alt-2": () => this.editor.chain().focus().toggleHeading({ level: 2 }).run(),
      "Mod-Alt-7": () => this.editor.chain().focus().toggleOrderedList().run(),
      "Mod-Alt-8": () => this.editor.chain().focus().toggleBulletList().run(),
      "Mod-Alt-9": () => this.editor.chain().focus().toggleCodeBlock().run(),
    };
  },
});

export const editorExtensions = [
  StarterKit.configure({
    heading: {
      levels: [1, 2, 3],
    },
  }),
  TaskList,
  TaskItem.configure({
    nested: true,
  }),
  Placeholder.configure({
    placeholder: ({ node }) => {
      if (node.type.name === "heading") {
        return "Tiêu đề";
      }

      if (node.type.name === "codeBlock") {
        return "Viết đoạn mã hoặc dán một snippet";
      }

      if (node.type.name === "taskItem") {
        return "Thêm một việc cần làm";
      }

      return "Gõ '/' để mở lệnh nhanh hoặc bắt đầu viết...";
    },
    includeChildren: true,
  }),
  editorShortcuts,
];
