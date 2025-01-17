import { Loader2Icon } from "lucide-react";
import React, { useState, useEffect } from "react";
import toast from "react-hot-toast";

interface PdfViewerProps {
  fileUrl: string | undefined;
}

const PdfViewer: React.FC<PdfViewerProps> = ({ fileUrl }) => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Reset loading state when the fileUrl changes
    if (fileUrl) {
      setLoading(true);
    } else {
      setLoading(false);
    }
  }, [fileUrl]);

  const handleLoad = () => {
    setLoading(false);
  };

  return (
    <div className="shadow-sm bg--400 shadow-black rounded-md p-1 my-5">
      {loading ? (
        <div className="flex justify-center items-center">
          <p className="flex gap-2">
            <Loader2Icon className="animate-spin" />
            Loading...
          </p>
        </div>
      ) : null}
      {fileUrl && (
        <iframe
          src={`${fileUrl}#toolbar=0`}
          height="90vh"
          width="100%"
          className={`h-[90vh] my-2 ${loading ? "hidden" : ""}`}
          onLoad={handleLoad}
        />
      )}
    </div>
  );
};

export default PdfViewer;

// 'use client'

// import React, { useState, useEffect } from "react";
// import { Loader2 } from 'lucide-react';

// interface PdfViewerProps {
//   fileUrl: string | undefined;
// }

// const PdfViewer: React.FC<PdfViewerProps> = ({ fileUrl }) => {
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState<string | null>(null);

//   useEffect(() => {
//     if (fileUrl) {
//       setLoading(true);
//       setError(null);
//     }
//   }, [fileUrl]);

//   const handleLoad = () => {
//     setLoading(false);
//   };

//   const handleError = () => {
//     setLoading(false);
//     setError("Failed to load PDF. Please try again later.");
//   };

//   if (!fileUrl) {
//     return null;
//   }

//   return (
//     <div className="relative h-[90vh] w-full">
//       {loading && (
//         <div className="absolute inset-0 flex justify-center items-center bg-gray-100">
//           <Loader2 className="h-8 w-8 animate-spin text-gray-500" />
//           <span className="sr-only">Loading PDF...</span>
//         </div>
//       )}
//       {error && (
//         <div className="absolute inset-0 flex justify-center items-center bg-red-100 text-red-600">
//           {error}
//         </div>
//       )}
//       <iframe
//         src={`${fileUrl}#toolbar=0`}
//         className="h-full w-full"
//         onLoad={handleLoad}
//         onError={handleError}
//         title="PDF Viewer"
//         aria-label="PDF Document Viewer"
//       />
//     </div>
//   );
// };

// export default PdfViewer;
