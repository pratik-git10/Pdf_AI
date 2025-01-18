"use client";

import Navbar from "@/components/navbar";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import PdfViewer from "../_components/pdfViewer";
import { api } from "@/convex/_generated/api";
import { useQuery } from "convex/react";
import TextEditor from "../_components/textEditor";
import toast from "react-hot-toast";

const Workspace = () => {
  const { fileId } = useParams();
  const [loading, setLoading] = useState(false);
  const fileIdString = Array.isArray(fileId) ? fileId[0] : fileId || "";

  const fileInfo = useQuery(api.messages.getFileRecord, {
    fileId: fileIdString,
  });

  useEffect(() => {
    setLoading(true);
    if (fileInfo) {
      setLoading(false);
      console.log(fileInfo);
    }
  }, [fileInfo]);

  return (
    <div className="bg-gray-100 min-h-screen">
      <p className="scrolling-text flex justify-center items-center font-bold my-1 bg-red-200 p-1">
        This Page still in Development, It have Several issues in AI part.
        Please Contact if Serious problem Occur!
      </p>

      <div className="mx-8 my-2">
        <Navbar showLinkOnSmallDevices={true} />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg--900 ">
        <div className="mb-5  bg-white shadow-sm shadow-black m-4 rounded-md">
          <TextEditor />
        </div>

        <div className="my-4 rounded-lg shadow-sm shadow-black px-4 mb-5 bg--200 mr-2">
          <h2 className="text-center my-4 text-xl font-bold shadow-sm shadow-black rounded-md p-1.5">
            {fileInfo?.fileName}
          </h2>
          <PdfViewer fileUrl={fileInfo?.fileUrl} />
        </div>
      </div>
    </div>
  );
};

export default Workspace;
