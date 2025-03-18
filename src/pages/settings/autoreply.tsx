
import React, { useState, useEffect } from "react";
import { SidebarNav } from "@/components/layout/sidebar-nav";
import { TopNav } from "@/components/layout/top-nav";
import { KeywordTable } from "@/components/autoreply/keyword-table";
import { KeywordForm } from "@/components/autoreply/keyword-form";
import { KeywordConfig } from "@/lib/types";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { v4 as uuidv4 } from "uuid";
import { ArrowLeft, Info } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { toast } from "@/hooks/use-toast";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

// Default keywords configuration
const DEFAULT_KEYWORDS: KeywordConfig[] = [
  {
    id: "default-stop",
    keyword: "stop",
    variations: [
      { id: uuidv4(), text: "unsubscribe" },
      { id: uuidv4(), text: "end" },
      { id: uuidv4(), text: "quit" },
    ],
    responses: [
      {
        id: uuidv4(),
        text: "You've opted out! You won't receive any more messages from us.",
        language: "English",
        quickReplyButtons: [
          {
            id: uuidv4(),
            text: "Opt-in",
            action: "optin",
          },
        ],
      },
      {
        id: uuidv4(),
        text: "आपने ऑप्ट-आउट कर लिया है! आपको हमारी ओर से कोई और संदेश नहीं मिलेंगे।",
        language: "Hindi",
        quickReplyButtons: [
          {
            id: uuidv4(),
            text: "ऑप्ट-इन",
            action: "optin",
          },
        ],
      },
    ],
    isDefault: true,
  },
  {
    id: "default-start",
    keyword: "start",
    variations: [
      { id: uuidv4(), text: "subscribe" },
      { id: uuidv4(), text: "begin" },
      { id: uuidv4(), text: "resume" },
    ],
    responses: [
      {
        id: uuidv4(),
        text: "Welcome back! You've been opted in to receive messages from us again.",
        language: "English",
        quickReplyButtons: [
          {
            id: uuidv4(),
            text: "Continue",
            action: "custom",
          },
        ],
      },
      {
        id: uuidv4(),
        text: "वापसी पर स्वागत है! आपने हमसे फिर से संदेश प्राप्त करने के लिए ऑप्ट-इन किया है।",
        language: "Hindi",
        quickReplyButtons: [
          {
            id: uuidv4(),
            text: "जारी रखें",
            action: "custom",
          },
        ],
      },
    ],
    isDefault: true,
  },
];

const AutoreplySettings = () => {
  const [isEnabled, setIsEnabled] = useState(true);
  const [keywords, setKeywords] = useState<KeywordConfig[]>(DEFAULT_KEYWORDS);
  const [editingKeywordId, setEditingKeywordId] = useState<string | null>(null);
  const [isFormVisible, setIsFormVisible] = useState(false);
  const navigate = useNavigate();

  const toggleAutoreply = (enabled: boolean) => {
    setIsEnabled(enabled);
    
    toast({
      title: enabled ? "Autoreply enabled" : "Autoreply disabled",
      description: enabled
        ? "Keyword-based responses are now active"
        : "Keyword-based responses have been deactivated",
    });
  };

  const handleAddKeyword = () => {
    setEditingKeywordId(null);
    setIsFormVisible(true);
  };

  const handleEditKeyword = (keywordId: string) => {
    setEditingKeywordId(keywordId);
    setIsFormVisible(true);
  };

  const handleDeleteKeyword = (keywordId: string) => {
    setKeywords(keywords.filter((k) => k.id !== keywordId));
  };

  const handleSaveKeyword = (config: KeywordConfig) => {
    if (editingKeywordId) {
      // Update existing keyword
      setKeywords(
        keywords.map((k) => (k.id === editingKeywordId ? config : k))
      );
      
      toast({
        title: "Keyword updated",
        description: `The "${config.keyword}" keyword configuration has been updated.`,
      });
    } else {
      // Add new keyword
      setKeywords([...keywords, config]);
      
      toast({
        title: "Keyword added",
        description: `The "${config.keyword}" keyword has been added.`,
      });
    }
    
    setIsFormVisible(false);
    setEditingKeywordId(null);
  };

  const handleCancelForm = () => {
    setIsFormVisible(false);
    setEditingKeywordId(null);
  };

  // Get the keyword being edited, if any
  const editingKeyword = keywords.find((k) => k.id === editingKeywordId);

  return (
    <div className="flex h-screen bg-gray-50">
      <SidebarNav />
      <div className="flex-1 flex flex-col overflow-hidden">
        <TopNav />
        <main className="flex-1 overflow-y-auto p-6">
          <div className="max-w-6xl mx-auto">
            <div className="mb-6">
              <Button
                variant="ghost"
                className="mb-2"
                onClick={() => navigate("/settings")}
              >
                <ArrowLeft className="h-4 w-4 mr-2" /> Back to Settings
              </Button>
              <h1 className="text-3xl font-bold tracking-tight">
                Autoreply Settings
              </h1>
              <p className="text-muted-foreground">
                Configure automated responses based on keywords
              </p>
            </div>

            <Card className="glass-card mb-8 animate-fade-in">
              <CardHeader>
                <CardTitle>Enable Autoreply</CardTitle>
                <CardDescription>
                  Automatically respond to user messages based on keywords
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Switch
                      id="autoreply-toggle"
                      checked={isEnabled}
                      onCheckedChange={toggleAutoreply}
                    />
                    <Label htmlFor="autoreply-toggle">
                      {isEnabled ? "Enabled" : "Disabled"}
                    </Label>
                  </div>
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <div className="flex items-center text-sm text-muted-foreground">
                          <Info className="h-4 w-4 mr-1" /> Need advanced flows?
                        </div>
                      </TooltipTrigger>
                      <TooltipContent className="max-w-sm">
                        <p>
                          For advanced multi-flow chatbot use cases, consider
                          purchasing a Chatbot subscription by writing to{" "}
                          <a
                            href="mailto:help@netcorecloud.com"
                            className="text-primary underline"
                          >
                            help@netcorecloud.com
                          </a>
                        </p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </div>
              </CardContent>
            </Card>

            {isFormVisible ? (
              <div className="animate-slide-in">
                <h2 className="text-xl font-semibold mb-4">
                  {editingKeywordId ? "Edit Keyword" : "Add New Keyword"}
                </h2>
                <KeywordForm
                  initialConfig={editingKeyword}
                  onSave={handleSaveKeyword}
                  onCancel={handleCancelForm}
                />
              </div>
            ) : (
              <div className="animate-slide-in">
                <h2 className="text-xl font-semibold mb-4">
                  Configured Keywords
                </h2>
                <KeywordTable
                  keywords={keywords}
                  onAdd={handleAddKeyword}
                  onEdit={handleEditKeyword}
                  onDelete={handleDeleteKeyword}
                />
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
};

export default AutoreplySettings;
