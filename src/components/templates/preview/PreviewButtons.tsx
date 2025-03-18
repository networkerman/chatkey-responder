
import React from "react";
import { TemplateButton } from "@/lib/types/whatsapp-template";
import { Button } from "@/components/ui/button";

interface PreviewButtonsProps {
  buttons: TemplateButton[];
}

const PreviewButtons: React.FC<PreviewButtonsProps> = ({ buttons }) => {
  const renderButton = (button: TemplateButton) => {
    const buttonClasses = "w-full text-sm font-normal justify-center";
    
    switch (button.type) {
      case "url":
        return (
          <Button 
            key={button.id}
            variant="outline" 
            className={buttonClasses}
          >
            {button.text}
          </Button>
        );
      case "phone":
        return (
          <Button 
            key={button.id}
            variant="outline" 
            className={buttonClasses}
          >
            {button.text}
          </Button>
        );
      case "quick_reply":
        return (
          <Button 
            key={button.id}
            variant="outline" 
            className={buttonClasses}
          >
            {button.text}
          </Button>
        );
      default:
        return null;
    }
  };

  return (
    <div className="space-y-2">
      {buttons.map(renderButton)}
    </div>
  );
};

export default PreviewButtons;
