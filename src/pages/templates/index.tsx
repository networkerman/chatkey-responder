
import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, Plus, Filter } from "lucide-react";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import TemplateGallery from "@/components/templates/TemplateGallery";
import { SidebarNav } from "@/components/layout/sidebar-nav";
import { TopNav } from "@/components/layout/top-nav";
import { WhatsAppTemplate, TemplateCategory, TemplateStatus } from "@/lib/types/whatsapp-template";
import { mockTemplates } from "@/lib/mock/templates";

export default function TemplatesPage() {
  const [templates, setTemplates] = useState<WhatsAppTemplate[]>(mockTemplates);
  const [searchQuery, setSearchQuery] = useState("");
  const [categoryFilter, setCategoryFilter] = useState<string>("all");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [activeTab, setActiveTab] = useState("saved");

  const filteredTemplates = templates.filter((template) => {
    const matchesSearch = template.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = categoryFilter === "all" || template.category === categoryFilter;
    const matchesStatus = statusFilter === "all" || template.status === statusFilter;
    const matchesTab = (activeTab === "saved" && !template.isArchived) || 
                       (activeTab === "archived" && template.isArchived);
    
    return matchesSearch && matchesCategory && matchesStatus && matchesTab;
  });

  return (
    <div className="flex min-h-screen bg-background">
      <SidebarNav />
      
      <div className="flex-1">
        <TopNav />
        
        <main className="container mx-auto py-6 px-6">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-3xl font-bold">Templates</h1>
            <Button className="bg-netcore-green hover:bg-netcore-green/90">
              <Plus className="mr-2 h-4 w-4" /> CREATE TEMPLATE
            </Button>
          </div>
          
          <Card className="mb-6">
            <CardContent className="p-4">
              <div className="flex flex-wrap gap-4">
                <div className="relative flex-1 min-w-[240px]">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search templates..."
                    className="pl-8"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
                
                <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                  <SelectTrigger className="w-[180px]">
                    <Filter className="mr-2 h-4 w-4" />
                    <SelectValue placeholder="Template Type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Types</SelectItem>
                    <SelectItem value="Text">Text</SelectItem>
                    <SelectItem value="Media">Media</SelectItem>
                    <SelectItem value="Carousel">Carousel</SelectItem>
                    <SelectItem value="Catalogue">Catalogue</SelectItem>
                    <SelectItem value="Multi-Product">Multi-Product</SelectItem>
                    <SelectItem value="Order Details">Order Details</SelectItem>
                    <SelectItem value="Order Status">Order Status</SelectItem>
                  </SelectContent>
                </Select>
                
                <Select value={statusFilter} onValueChange={setStatusFilter}>
                  <SelectTrigger className="w-[180px]">
                    <Filter className="mr-2 h-4 w-4" />
                    <SelectValue placeholder="Status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Status</SelectItem>
                    <SelectItem value="Approved">Approved</SelectItem>
                    <SelectItem value="Pending">Pending</SelectItem>
                    <SelectItem value="Rejected">Rejected</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>
          
          <Tabs defaultValue="saved" className="w-full" onValueChange={setActiveTab}>
            <TabsList className="mb-6">
              <TabsTrigger value="saved">Saved Templates</TabsTrigger>
              <TabsTrigger value="archived">Archived Templates</TabsTrigger>
            </TabsList>
            
            <TabsContent value="saved" className="mt-0">
              <TemplateGallery templates={filteredTemplates} />
            </TabsContent>
            
            <TabsContent value="archived" className="mt-0">
              <TemplateGallery templates={filteredTemplates} />
            </TabsContent>
          </Tabs>
        </main>
      </div>
    </div>
  );
}
