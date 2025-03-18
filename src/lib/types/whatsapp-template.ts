
import { Language } from "@/lib/types";

export type TemplateCategory = 
  | "Text" 
  | "Media" 
  | "Carousel" 
  | "Catalogue" 
  | "Multi-Product" 
  | "Order Details" 
  | "Order Status";

export type TemplateStatus = 
  | "Approved" 
  | "Pending" 
  | "Rejected";

export type TemplateComponent = {
  type: "header" | "body" | "footer";
  text?: string;
  format?: "text" | "image" | "video" | "document";
  mediaUrl?: string;
};

export type TemplateButton = {
  id: string;
  type: "url" | "phone" | "quick_reply";
  text: string;
  url?: string;
  phone?: string;
};

export type CarouselItem = {
  id: string;
  title: string;
  description: string;
  imageUrl?: string;
  buttons?: TemplateButton[];
};

export interface TemplateLanguageContent {
  header?: string;
  body: string;
  footer?: string;
  buttons?: TemplateButton[];
  carouselItems?: CarouselItem[];
  mediaUrl?: string;
  mediaType?: "image" | "video" | "document";
}

export interface WhatsAppTemplate {
  id: string;
  name: string;
  category: TemplateCategory;
  status: TemplateStatus;
  createdAt: string;
  updatedAt: string;
  languages: Partial<Record<Language, TemplateLanguageContent>>;
  isArchived?: boolean;
}
