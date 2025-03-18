
import React from "react";

interface PreviewBodyProps {
  body: string;
}

const PreviewBody: React.FC<PreviewBodyProps> = ({ body }) => {
  // Function to detect variables in the body text (format: {{variable_name}})
  const parseBodyText = (text: string) => {
    const parts = text.split(/(\{\{[^}]+\}\})/g);
    
    return parts.map((part, index) => {
      if (part.match(/^\{\{[^}]+\}\}$/)) {
        // This is a variable
        const variableName = part.slice(2, -2); // Remove {{ and }}
        return (
          <span key={index} className="bg-gray-200 text-gray-700 px-1 rounded">
            {variableName}
          </span>
        );
      }
      // Regular text
      return <span key={index}>{part}</span>;
    });
  };

  return (
    <div className="text-sm">
      {parseBodyText(body)}
    </div>
  );
};

export default PreviewBody;
