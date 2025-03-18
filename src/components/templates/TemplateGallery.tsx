
import React from "react";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Edit, Eye, Archive, Trash, RotateCcw } from "lucide-react";
import { WhatsAppTemplate } from "@/lib/types/whatsapp-template";
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import TemplatePreview from "./TemplatePreview";

interface TemplateGalleryProps {
  templates: WhatsAppTemplate[];
}

const TemplateGallery: React.FC<TemplateGalleryProps> = ({ templates }) => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case "Approved":
        return "bg-green-100 text-green-800 hover:bg-green-100";
      case "Pending":
        return "bg-yellow-100 text-yellow-800 hover:bg-yellow-100";
      case "Rejected":
        return "bg-red-100 text-red-800 hover:bg-red-100";
      default:
        return "bg-gray-100 text-gray-800 hover:bg-gray-100";
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case "Text":
        return "bg-blue-100 text-blue-800 hover:bg-blue-100";
      case "Media":
        return "bg-purple-100 text-purple-800 hover:bg-purple-100";
      case "Carousel":
        return "bg-indigo-100 text-indigo-800 hover:bg-indigo-100";
      case "Catalogue":
        return "bg-teal-100 text-teal-800 hover:bg-teal-100";
      case "Multi-Product":
        return "bg-cyan-100 text-cyan-800 hover:bg-cyan-100";
      case "Order Details":
        return "bg-emerald-100 text-emerald-800 hover:bg-emerald-100";
      case "Order Status":
        return "bg-amber-100 text-amber-800 hover:bg-amber-100";
      default:
        return "bg-gray-100 text-gray-800 hover:bg-gray-100";
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {templates.length === 0 ? (
        <div className="col-span-full text-center py-12">
          <p className="text-muted-foreground text-lg">No templates found</p>
        </div>
      ) : (
        templates.map((template) => (
          <Card key={template.id} className="overflow-hidden hover:shadow-md transition-shadow">
            <CardHeader className="p-4 pb-2 space-y-2">
              <div className="flex justify-between items-start">
                <h3 className="font-medium text-lg line-clamp-1">{template.name}</h3>
                <Badge variant="outline" className={getStatusColor(template.status)}>
                  {template.status}
                </Badge>
              </div>
              <Badge variant="outline" className={getCategoryColor(template.category)}>
                {template.category}
              </Badge>
            </CardHeader>
            
            <CardContent className="p-4 pt-2">
              <div className="text-sm text-muted-foreground mb-2">
                {Object.keys(template.languages).length} language(s)
              </div>
              
              <p className="text-sm line-clamp-3">
                {template.languages.English?.body || "No content available"}
              </p>
            </CardContent>
            
            <CardFooter className="p-4 pt-2 flex justify-between gap-2">
              <Dialog>
                <DialogTrigger asChild>
                  <Button variant="outline" size="sm">
                    <Eye className="h-4 w-4 mr-1" /> Preview
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[425px]">
                  <DialogHeader>
                    <DialogTitle>{template.name}</DialogTitle>
                    <DialogDescription>Template Preview</DialogDescription>
                  </DialogHeader>
                  <TemplatePreview template={template} />
                </DialogContent>
              </Dialog>
              
              <div className="flex gap-2">
                <Button variant="outline" size="sm">
                  <Edit className="h-4 w-4" />
                </Button>
                {template.isArchived ? (
                  <Button variant="outline" size="sm">
                    <RotateCcw className="h-4 w-4" />
                  </Button>
                ) : (
                  <Button variant="outline" size="sm">
                    <Archive className="h-4 w-4" />
                  </Button>
                )}
              </div>
            </CardFooter>
          </Card>
        ))
      )}
    </div>
  );
};

export default TemplateGallery;
