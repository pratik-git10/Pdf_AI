import {
  Bold,
  Italic,
  Underline,
  Code,
  AlignJustify,
  AlignRight,
  AlignCenter,
  AlignLeft,
  Highlighter,
  WandSparkles,
  Heading1,
  Heading2,
  Heading3,
} from "lucide-react";
import React, { useEffect, useState } from "react";
import { Editor } from "@tiptap/react";
import { useAction, useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { useParams } from "next/navigation";
import { chatSession } from "@/configs/AiModel";
import toast from "react-hot-toast";
import { useUser } from "@clerk/nextjs";

interface EditorExtensionProps {
  editor: Editor | null;
}

const EditorExtension: React.FC<EditorExtensionProps> = ({ editor }) => {
  // const fileInfo = useQuery(api.messages.getFileRecord, {
  //   fileId: fileIdString,
  // });
  if (!editor) {
    return null;
  }

  const { fileId } = useParams();
  const [loading, setLoading] = useState(false);
  const fileIdString = Array.isArray(fileId) ? fileId[0] : fileId || "";

  const searchAi = useAction(api.myActions.search);
  const addNotes = useMutation(api.notes.AddNotes);
  const { user } = useUser();
  const toggleUnderline = () => {
    if (editor.isActive("underline")) {
      editor.chain().focus().unsetUnderline().run();
    } else {
      editor.chain().focus().setUnderline().run();
    }
  };

  const onAiClick = async () => {
    toast.success("Ai is generating...");

    setLoading(true);
    try {
      const selectedText = editor.state.doc.textBetween(
        editor.state.selection.from,
        editor.state.selection.to,
        " "
      );
      console.log(selectedText);
      const result = await searchAi({
        query: selectedText,
        fileId: fileIdString,
      });

      interface SearchResultItem {
        pageContent: string;
      }

      const unformattedAns: SearchResultItem[] = JSON.parse(result);
      // console.log("unformated answer", result);
      let answer = " ";
      unformattedAns &&
        unformattedAns.forEach((item) => {
          answer = answer + item.pageContent;
        });

      const PROMPT = `For question:${selectedText} and with the given content as answer, please give appropriate answer in HTML format only dont give extra. The answer content is ${answer}`;

      const AIResult = await chatSession.sendMessage(PROMPT);
      // //  console.log(AIResult.response.text());
      const finalAnswer = AIResult.response
        .text()

        .replace("```", "")
        .replace("html", "")
        .replace("```", "");
      const allText = editor.getHTML();
      editor.commands.setContent(
        allText + `<p> <strong>Answer: </strong>${finalAnswer}</p>`
      );
      addNotes({
        notes: editor.getHTML(),
        fileId: fileIdString,
        createdBy: user?.primaryEmailAddress?.emailAddress || "undefined",
      });
    } catch (error) {
      console.log("ai error");
      toast.error("Something went wrong in AI.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const handleKeydown = (event: KeyboardEvent) => {
      if (event.ctrlKey && event.key === "Enter") {
        // Call onAiClick when Ctrl + Enter is pressed
        onAiClick();
      }
    };

    window.addEventListener("keydown", handleKeydown);

    // Cleanup the event listener on component unmount
    return () => {
      window.removeEventListener("keydown", handleKeydown);
    };
  }, []);

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
            onClick={() =>
              editor.chain().focus().toggleHeading({ level: 1 }).run()
            }
            className={
              editor.isActive("heading", { level: 1 }) ? "text-blue-500" : ""
            }>
            <Heading1 />
          </button>
          <button
            onClick={() =>
              editor.chain().focus().toggleHeading({ level: 2 }).run()
            }
            className={
              editor.isActive("heading", { level: 2 }) ? "text-blue-500" : ""
            }>
            <Heading2 />
          </button>
          <button
            onClick={() =>
              editor.chain().focus().toggleHeading({ level: 3 }).run()
            }
            className={
              editor.isActive("heading", { level: 3 }) ? "text-blue-500" : ""
            }>
            <Heading3 />
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
          <button onClick={() => onAiClick()} className={"hover:text-blue-500"}>
            <WandSparkles />
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditorExtension;
