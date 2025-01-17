import React from "react";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import BulletList from "@tiptap/extension-bullet-list";
import Underline from "@tiptap/extension-underline";
import Heading from "@tiptap/extension-heading";
import CodeBlock from "@tiptap/extension-code-block";
import TextAlign from "@tiptap/extension-text-align";
import ListItem from "@tiptap/extension-list-item";
import Highlight from "@tiptap/extension-highlight";
import Placeholder from "@tiptap/extension-placeholder";
import EditorExtension from "./editorExtension";

const TextEditor = () => {
  const editor = useEditor({
    extensions: [
      StarterKit,
      Placeholder.configure({
        placeholder: "Start writing....",
      }),
      BulletList,
      Underline,
      Heading.configure({ levels: [1, 2, 3] }),
      CodeBlock,
      ListItem,
      Highlight,

      TextAlign.configure({
        types: ["paragraph"],
        alignments: ["left", "center", "right", "justify"],
      }),
    ],

    editorProps: {
      attributes: {
        class: `focus:outline-none h-screen p-2`,
      },
    },
  });

  return (
    <div className="p-4 bg--500">
      <EditorExtension editor={editor} />
      <div className="editor-content mb-5 mx-2 shadow-black shadow-sm rounded-md p-4 bg--300 mt-5">
        <EditorContent editor={editor} className="h-full overflow-auto" />
      </div>
    </div>
  );
};

export default TextEditor;
