import { NextResponse } from "next/server";
import { WebPDFLoader } from "@langchain/community/document_loaders/web/pdf";

import { RecursiveCharacterTextSplitter } from "langchain/text_splitter";

export async function GET(req: Request) {
  const reqUrl = req.url;
  const { searchParams } = new URL(reqUrl);
  const pdfUrl = searchParams.get("pdfUrl");
  console.log("pdfurl", pdfUrl);

  if (!pdfUrl) {
    console.error("pdfUrl is missing");
    // Handle the error, e.g., return an error response or throw an error
    throw new Error("url is missing");
  } else {
    console.log("pdfurl", pdfUrl);
    const response = await fetch(pdfUrl);
    // Continue with processing the response

    const data = await response.blob();
    const loader = new WebPDFLoader(data);
    const docs = await loader.load();

    let pdfTextContent = "";
    docs.forEach((doc) => {
      pdfTextContent = pdfTextContent + doc.pageContent;
    });

    const splitter = new RecursiveCharacterTextSplitter({
      chunkSize: 100,
      chunkOverlap: 20,
    });

    const output = await splitter.createDocuments([pdfTextContent]);

    let splitterList: string[] = [];
    output.forEach((doc) => {
      splitterList.push(doc.pageContent);
    });

    return NextResponse.json({ result: splitterList });
  }
}
