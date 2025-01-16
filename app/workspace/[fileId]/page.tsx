"use client";

import Navbar from "@/components/navbar";
import { useParams } from "next/navigation";
import React, { useEffect } from "react";
import PdfViewer from "../_components/pdfViewer";
import { api } from "@/convex/_generated/api";
import { useQuery } from "convex/react";

const Workspace = () => {
  const { fileId } = useParams();
  const fileIdString = Array.isArray(fileId) ? fileId[0] : fileId || "";

  const fileInfo = useQuery(api.messages.getFileRecord, {
    fileId: fileIdString,
  });

  useEffect(() => {
    if (fileInfo) {
      console.log(fileInfo);
    }
  }, [fileInfo]);

  return (
    <div>
      <div className="m-2">
        <Navbar showLinkOnSmallDevices={true} />
      </div>
      <div className="grid grid-cols-2 gap-5">
        <div></div>
        <div>
          <PdfViewer fileUrl={fileInfo?.fileUrl} />
        </div>
      </div>
    </div>
  );
};

export default Workspace;
