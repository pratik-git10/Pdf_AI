import React, { ReactNode } from "react";
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
import { Upload } from "lucide-react";

interface UploadPdfProps {
  children: ReactNode;
}
const UploadPdf: React.FC<UploadPdfProps> = ({ children }) => {
  return (
    <div>
      <Dialog>
        <DialogTrigger asChild>{children}</DialogTrigger>
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
                  />
                </div>
                <div className="mt-3">
                  <label htmlFor="">File name*</label>
                  <Input placeholder="file name" className="mt-1" />
                </div>
              </div>
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <DialogClose asChild>
              <Button type="button" variant="secondary">
                Cancel
              </Button>
            </DialogClose>
            <Button className="flex gap-2">
              <Upload />
              Upload
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default UploadPdf;
