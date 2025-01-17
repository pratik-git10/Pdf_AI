import { Button } from "@/components/ui/button";
import React from "react";
import { Layout, Shield } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import UploadPdf from "./UploadPdf";
import Link from "next/link";

const Sidebar = () => {
  return (
    <div className="shadow-sm shadow-black h-screen px-4 py-2 ml-2 mr-2 rounded-md border-t">
      <h2 className="text-2xl font-extrabold text-red-400 flex justify-center items-center">
        <Link href="/dashboard">PdfAI</Link>
      </h2>

      <div className="mt-5">
        <UploadPdf>
          <Button variant="outline" className="w-full">
            + Upload Pdf
          </Button>
        </UploadPdf>

        {/* Harcoded url */}
        <Link href={`/workspace/3b0bc94f-268c-48d9-bdd8-9b04dbdac8c2`}>
          <div className="flex gap-2 items-center mt-5 p-2 hover:bg-slate-400 rounded-md cursor-pointer transition-all">
            <Layout />

            <h2>Workspace</h2>
          </div>
        </Link>
      </div>
      <div className="absolute bottom-8 w-[80%]">
        <div className="flex gap-2 items-center p-2 mt-2 bg-neutral-200 hover:bg-neutral-400 rounded-md cursor-pointer transition-all mb-4">
          <Shield />
          <h2>Upgrade</h2>
        </div>
        <Progress value={40} />
        <h2 className="text-sm mt-1">2 out of 5 pdf uploaded</h2>
        <p className="mt-2 text-sm text-blue-800">Upgrade to Upload More Pdf</p>
      </div>
    </div>
  );
};

export default Sidebar;
