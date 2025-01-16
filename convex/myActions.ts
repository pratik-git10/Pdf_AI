import { ConvexVectorStore } from "@langchain/community/vectorstores/convex";
import { GoogleGenerativeAIEmbeddings } from "@langchain/google-genai";
import { TaskType } from "@google/generative-ai";
import { action } from "./_generated/server.js";
import { v } from "convex/values";

export const ingest = action({
  args: {
    splitText: v.any(),
    fileId: v.string(),
  },
  handler: async (ctx, args) => {
    await ConvexVectorStore.fromTexts(
      args.splitText,
      args.splitText.map(() => args.fileId),
      new GoogleGenerativeAIEmbeddings({
        apiKey: "AIzaSyAjWiPGKX_fg4otYmo1zHTlW4SINlOj4uI",
        model: "embedding-001", // 768 dimensions
        taskType: TaskType.RETRIEVAL_DOCUMENT,
        title: "Document title",
      }),
      { ctx }
    );
    return "complted";
  },
});
