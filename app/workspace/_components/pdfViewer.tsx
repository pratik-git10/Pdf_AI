import React from "react";

interface pdfViewerProps {
  fileUrl: string | undefined;
}

const PdfViewer: React.FC<pdfViewerProps> = ({ fileUrl }) => {
  console.log("fileurl", fileUrl);
  return (
    <div>
      <iframe
        src={fileUrl + "#toolbar=0"}
        height="90vh"
        width="100%"
        className="h-[90vh]"
      />
    </div>
  );
};

export default PdfViewer;
