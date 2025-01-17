import {
  Bold,
  Italic,
  Underline,
  Code,
  AlignJustify,
  AlignRight,
  AlignCenter,
  AlignLeft,
  Blocks,
  EllipsisVertical,
  Highlighter,
} from "lucide-react";
import React from "react";
import { Editor } from "@tiptap/react";

interface EditorExtensionProps {
  editor: Editor | null;
}

const EditorExtension: React.FC<EditorExtensionProps> = ({ editor }) => {
  if (!editor) {
    return null;
  }

  const toggleUnderline = () => {
    if (editor.isActive("underline")) {
      editor.chain().focus().unsetUnderline().run();
    } else {
      editor.chain().focus().setUnderline().run();
    }
  };

  return (
    <div className=" rounded-md shadow-sm shadow-black p-2 mb-2">
      <div className="control-group">
        <div className="button-group flex gap-2 flex-wrap justify-between">
          <button
            onClick={() => editor.chain().focus().toggleBold().run()}
            className={editor.isActive("bold") ? "text-blue-500" : ""}>
            <Bold />
          </button>
          <button
            onClick={() => editor.chain().focus().toggleItalic().run()}
            className={
              editor.isActive("italic") ? "text-blue-600 font-extrabold" : ""
            }>
            <Italic />
          </button>
          <button
            onClick={toggleUnderline}
            className={editor.isActive("underline") ? "text-blue-500" : ""}>
            <Underline />
          </button>
          <button
            onClick={() => editor.chain().focus().toggleBulletList().run()}
            className={editor.isActive("bulletList") ? "text-blue-500" : ""}>
            <EllipsisVertical />
          </button>
          <button
            onClick={() =>
              editor.chain().focus().toggleHeading({ level: 1 }).run()
            }
            className={
              editor.isActive("heading", { level: 1 }) ? "text-blue-500" : ""
            }>
            H1
          </button>
          <button
            onClick={() =>
              editor.chain().focus().toggleHeading({ level: 2 }).run()
            }
            className={
              editor.isActive("heading", { level: 2 }) ? "text-blue-500" : ""
            }>
            H2
          </button>
          <button
            onClick={() =>
              editor.chain().focus().toggleHeading({ level: 3 }).run()
            }
            className={
              editor.isActive("heading", { level: 3 }) ? "text-blue-500" : ""
            }>
            H3
          </button>
          <button
            onClick={() => editor.chain().focus().toggleCodeBlock().run()}
            className={editor.isActive("codeBlock") ? "text-blue-500" : ""}>
            <Code />
          </button>
          <button
            onClick={() => editor.chain().focus().setTextAlign("left").run()}
            className={
              editor.isActive({ textAlign: "left" }) ? "text-blue-500" : ""
            }>
            <AlignLeft />
          </button>
          <button
            onClick={() => editor.chain().focus().setTextAlign("center").run()}
            className={
              editor.isActive({ textAlign: "center" }) ? "text-blue-500" : ""
            }>
            <AlignCenter />
          </button>
          <button
            onClick={() => editor.chain().focus().setTextAlign("right").run()}
            className={
              editor.isActive({ textAlign: "right" }) ? "text-blue-500" : ""
            }>
            <AlignRight />
          </button>
          <button
            onClick={() => editor.chain().focus().setTextAlign("justify").run()}
            className={
              editor.isActive({ textAlign: "justify" }) ? "text-blue-500" : ""
            }>
            <AlignJustify />
          </button>
          <button
            onClick={() => editor.chain().focus().toggleHighlight().run()}
            className={editor.isActive("highlight") ? "text-blue-600" : ""}>
            <Highlighter />
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditorExtension;
