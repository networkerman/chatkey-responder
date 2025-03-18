
import React from "react";

interface PreviewHeaderProps {
  header?: string;
  mediaUrl?: string;
  mediaType?: "image" | "video" | "document";
}

const PreviewHeader: React.FC<PreviewHeaderProps> = ({ header, mediaUrl, mediaType }) => {
  if (!header && !mediaUrl) return null;
  
  return (
    <div className="space-y-2">
      {mediaUrl && (
        <div className="rounded-lg overflow-hidden">
          {mediaType === "image" && (
            <img 
              src={mediaUrl || "/placeholder.svg"} 
              alt="Template header"
              className="w-full h-48 object-cover"
            />
          )}
          {mediaType === "video" && (
            <div className="w-full h-48 bg-gray-200 flex items-center justify-center">
              <span className="text-sm text-gray-600">Video preview</span>
            </div>
          )}
          {mediaType === "document" && (
            <div className="w-full h-20 bg-gray-200 flex items-center justify-center">
              <span className="text-sm text-gray-600">Document preview</span>
            </div>
          )}
        </div>
      )}
      
      {header && (
        <h4 className="font-medium">{header}</h4>
      )}
    </div>
  );
};

export default PreviewHeader;
