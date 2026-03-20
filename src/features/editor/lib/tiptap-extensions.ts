import Placeholder from "@tiptap/extension-placeholder";
import TaskItem from "@tiptap/extension-task-item";
import TaskList from "@tiptap/extension-task-list";
import StarterKit from "@tiptap/starter-kit";

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
        return "Heading";
      }

      if (node.type.name === "codeBlock") {
        return "Write code or paste a snippet";
      }

      if (node.type.name === "taskItem") {
        return "Add a task";
      }

      return "Type '/' for commands later, or start writing...";
    },
    includeChildren: true,
  }),
];

