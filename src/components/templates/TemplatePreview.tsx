
import React, { useState } from "react";
import { WhatsAppTemplate } from "@/lib/types/whatsapp-template";
import { Language } from "@/lib/types";
import { Card, CardContent } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import PreviewHeader from "./preview/PreviewHeader";
import PreviewBody from "./preview/PreviewBody";
import PreviewFooter from "./preview/PreviewFooter";
import PreviewButtons from "./preview/PreviewButtons";
import PreviewCarousel from "./preview/PreviewCarousel";

interface TemplatePreviewProps {
  template: WhatsAppTemplate;
}

const TemplatePreview: React.FC<TemplatePreviewProps> = ({ template }) => {
  const availableLanguages = Object.keys(template.languages) as Language[];
  const [selectedLanguage, setSelectedLanguage] = useState<Language>(availableLanguages[0]);

  const content = template.languages[selectedLanguage];
  
  if (!content) {
    return <div className="text-center text-muted-foreground">No content available for the selected language</div>;
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h3 className="text-sm font-medium">Preview</h3>
        <Select value={selectedLanguage} onValueChange={(val) => setSelectedLanguage(val as Language)}>
          <SelectTrigger className="w-[140px]">
            <SelectValue placeholder="Select language" />
          </SelectTrigger>
          <SelectContent>
            {availableLanguages.map((language) => (
              <SelectItem key={language} value={language}>
                {language}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      
      <Card className="max-w-sm mx-auto bg-netcore-chat-bg">
        <CardContent className="p-4 space-y-3">
          {/* Header */}
          {content.mediaUrl || content.header ? (
            <PreviewHeader 
              header={content.header} 
              mediaUrl={content.mediaUrl} 
              mediaType={content.mediaType} 
            />
          ) : null}
          
          {/* Body */}
          <PreviewBody body={content.body} />
          
          {/* Footer */}
          {content.footer && <PreviewFooter footer={content.footer} />}
          
          {/* Buttons */}
          {content.buttons && content.buttons.length > 0 && (
            <PreviewButtons buttons={content.buttons} />
          )}
          
          {/* Carousel */}
          {content.carouselItems && content.carouselItems.length > 0 && (
            <PreviewCarousel items={content.carouselItems} />
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default TemplatePreview;
