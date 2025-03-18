
import React from "react";

interface PreviewFooterProps {
  footer: string;
}

const PreviewFooter: React.FC<PreviewFooterProps> = ({ footer }) => {
  return (
    <div className="text-xs text-gray-500 italic">
      {footer}
    </div>
  );
};

export default PreviewFooter;
