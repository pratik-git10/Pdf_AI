"use client";

import React, { ReactNode, useState } from "react";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Loader, Upload } from "lucide-react";
import { useAction, useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { AddFileEntryToDb } from "@/convex/messages";
import uuid4 from "uuid4";
import { useUser } from "@clerk/nextjs";
import axios from "axios";
import toast from "react-hot-toast";

interface UploadPdfProps {
  children: ReactNode;
}
const UploadPdf: React.FC<UploadPdfProps> = ({ children }) => {
  const generateUploadUrl = useMutation(api.messages.generateUploadUrl);

  const insertFileEntry = useMutation(api.messages.AddFileEntryToDb);

  const getFileUrl = useMutation(api.messages.getFilrUrl);

  const embeddDocument = useAction(api.myActions.ingest);

  const user = useUser();

  const [file, setFile] = useState<File | null>();
  const [loading, setLoading] = useState(false);
  const [fileName, setFileName] = useState<string | undefined>();
  const [open, setOpen] = useState(false);

  const onFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      setFile(event.target.files[0]);
    }
  };

  const onUpload = async () => {
    setLoading(true);
    // // Step 1: Get a short-lived upload URL
    const postUrl = await generateUploadUrl();

    // // Step 2: POST the file to the URL
    const result = await fetch(postUrl, {
      method: "POST",
      headers: { "Content-Type": file?.type! },
      body: file,
    });
    const { storageId } = await result.json();
    console.log("storageid", storageId);
    const fileId = uuid4();
    const fileUrl =
      (await getFileUrl({ storageId: storageId })) ?? "defaultFileUrl";
    // // Step 3: Save the newly allocated storage id to the database
    const resp = await insertFileEntry({
      fileId: fileId,
      storageId: storageId,
      fileName: fileName ?? "Untitle",
      fileUrl: fileUrl,
      createdBy: user?.user?.primaryEmailAddress?.emailAddress || "unknown",
    });
    console.log(resp);

    //api call
    const apiResponse = await axios.get("/api/pdf-loader?pdfUrl=" + fileUrl);
    console.log(apiResponse.data.result);
    await embeddDocument({
      splitText: apiResponse.data.result,
      fileId: fileId,
    });
    // console.log(embeddedResult);
    setLoading(false);
    setOpen(false);
    toast.success("File Uploaded Successfully.");
  };

  return (
    <div>
      <Dialog open={open}>
        <DialogTrigger asChild>
          <Button
            onClick={() => setOpen(true)}
            variant="outline"
            className="w-full">
            + Upload PDF file
          </Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="">Upload PDF File</DialogTitle>
            <DialogDescription asChild>
              <div className="">
                <div className="mt-2">
                  <h1>Select PDF File</h1>
                  <Input
                    type="file"
                    accept="application/pdf"
                    className="w-52 mt-1"
                    onChange={(event) => onFileSelect(event)}
                  />
                </div>
                <div className="mt-3">
                  <label htmlFor="">File name*</label>
                  <Input
                    placeholder="file name"
                    className="mt-1"
                    onChange={(e) => setFileName(e.target.value)}
                  />
                </div>
              </div>
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <DialogClose asChild>
              <Button
                type="button"
                variant="secondary"
                onClick={() => setOpen(false)}>
                Cancel
              </Button>
            </DialogClose>
            <Button
              disabled={loading}
              onClick={onUpload}
              className="flex gap-2">
              {loading ? (
                <Loader className="animate-spin" />
              ) : (
                <Upload className="" />
              )}
              Upload
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default UploadPdf;
