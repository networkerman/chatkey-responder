
import React, { useState } from "react";
import { SidebarNav } from "@/components/layout/sidebar-nav";
import { TopNav } from "@/components/layout/top-nav";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Calendar as CalendarIcon, Download, MessageSquare, RefreshCw, Search } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

type MessageStatus = "delivered" | "read" | "failed" | "pending";

interface TemplateMessage {
  id: string;
  senderId: string;
  recipient: string;
  template: string;
  type: string;
  content: string;
  dateTime: string;
  status: MessageStatus;
}

interface ConversationMessage {
  id: string;
  sender: string;
  recipient: string;
  message: string;
  dateTime: string;
  status: MessageStatus;
}

const LiveFeed = () => {
  const [activeTab, setActiveTab] = useState<"templates" | "conversations">("templates");
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<MessageStatus | "all">("all");
  
  // Sample data - in a real app this would come from an API
  const templateMessages: TemplateMessage[] = [
    {
      id: "tm1",
      senderId: "WA-12345",
      recipient: "+91 98765 43210",
      template: "Welcome Message",
      type: "Text",
      content: "Welcome to Netcore CPaaS! We're glad to have you onboard.",
      dateTime: "2023-06-12 14:30:25",
      status: "delivered",
    },
    {
      id: "tm2",
      senderId: "WA-12345",
      recipient: "+91 98765 43211",
      template: "Order Confirmation",
      type: "Text",
      content: "Your order #12345 has been confirmed and will be shipped soon.",
      dateTime: "2023-06-12 14:35:12",
      status: "read",
    },
    {
      id: "tm3",
      senderId: "WA-12345",
      recipient: "+91 98765 43212",
      template: "Payment Reminder",
      type: "Text",
      content: "Your payment for invoice #INV-001 is due tomorrow.",
      dateTime: "2023-06-12 14:40:05",
      status: "failed",
    },
    {
      id: "tm4",
      senderId: "WA-12346",
      recipient: "+91 98765 43213",
      template: "Delivery Update",
      type: "Text",
      content: "Your order #12346 has been shipped and will be delivered tomorrow.",
      dateTime: "2023-06-12 15:10:45",
      status: "pending",
    },
    {
      id: "tm5",
      senderId: "WA-12346",
      recipient: "+91 98765 43214",
      template: "Feedback Request",
      type: "Text",
      content: "Thank you for your recent purchase. Please share your feedback.",
      dateTime: "2023-06-12 15:25:30",
      status: "delivered",
    },
  ];

  const conversationMessages: ConversationMessage[] = [
    {
      id: "cm1",
      sender: "+91 98765 43210",
      recipient: "WA-12345",
      message: "Hi, I need help with my order.",
      dateTime: "2023-06-12 14:32:15",
      status: "delivered",
    },
    {
      id: "cm2",
      sender: "WA-12345",
      recipient: "+91 98765 43210",
      message: "Sure, I'd be happy to help. Could you please provide your order number?",
      dateTime: "2023-06-12 14:33:10",
      status: "read",
    },
    {
      id: "cm3",
      sender: "+91 98765 43210",
      recipient: "WA-12345",
      message: "It's ORD-9876",
      dateTime: "2023-06-12 14:34:20",
      status: "delivered",
    },
    {
      id: "cm4",
      sender: "WA-12345",
      recipient: "+91 98765 43210",
      message: "Thank you. I can see your order is being processed. It will be shipped tomorrow.",
      dateTime: "2023-06-12 14:35:45",
      status: "pending",
    },
    {
      id: "cm5",
      sender: "+91 98765 43211",
      recipient: "WA-12345",
      message: "When will my order be delivered?",
      dateTime: "2023-06-12 15:10:22",
      status: "delivered",
    },
  ];

  const getStatusColor = (status: MessageStatus) => {
    switch (status) {
      case "delivered":
        return "text-netcore-green";
      case "read":
        return "text-netcore-blue";
      case "failed":
        return "text-netcore-red";
      case "pending":
        return "text-netcore-yellow";
      default:
        return "text-gray-500";
    }
  };

  const filteredTemplateMessages = templateMessages.filter((message) => {
    const matchesSearch = 
      searchQuery === "" || 
      message.senderId.toLowerCase().includes(searchQuery.toLowerCase()) ||
      message.recipient.toLowerCase().includes(searchQuery.toLowerCase()) ||
      message.template.toLowerCase().includes(searchQuery.toLowerCase()) ||
      message.content.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesStatus = statusFilter === "all" || message.status === statusFilter;
    
    return matchesSearch && matchesStatus;
  });

  const filteredConversationMessages = conversationMessages.filter((message) => {
    const matchesSearch = 
      searchQuery === "" || 
      message.sender.toLowerCase().includes(searchQuery.toLowerCase()) ||
      message.recipient.toLowerCase().includes(searchQuery.toLowerCase()) ||
      message.message.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesStatus = statusFilter === "all" || message.status === statusFilter;
    
    return matchesSearch && matchesStatus;
  });

  const handleOpenReplyModal = (messageId: string) => {
    console.log("Opening reply modal for message:", messageId);
    // In a real application, you would show a modal here
  };

  const handleRefresh = () => {
    console.log("Refreshing messages");
    // In a real application, you would fetch new messages here
  };

  const handleDownload = () => {
    console.log("Downloading messages");
    // In a real application, you would generate and download a report here
  };

  return (
    <div className="flex h-screen bg-gray-50">
      <SidebarNav />
      <div className="flex-1 flex flex-col overflow-hidden">
        <TopNav />
        <main className="flex-1 overflow-y-auto p-6">
          <div className="grid gap-6">
            <div className="flex justify-between items-center">
              <div>
                <h1 className="text-3xl font-bold tracking-tight">Live Feed</h1>
                <p className="text-muted-foreground">
                  Real-time view of your WhatsApp message activity
                </p>
              </div>
              <div className="flex gap-2">
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={handleRefresh}
                  className="flex items-center gap-1"
                >
                  <RefreshCw className="h-4 w-4" />
                  Refresh
                </Button>
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={handleDownload}
                  className="flex items-center gap-1"
                >
                  <Download className="h-4 w-4" />
                  Download
                </Button>
              </div>
            </div>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle>Message Filters</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-col md:flex-row gap-4">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 flex-1">
                    <div>
                      <label htmlFor="businessNumber" className="block text-sm font-medium text-gray-700 mb-1">
                        Business Number
                      </label>
                      <Select defaultValue="all">
                        <SelectTrigger>
                          <SelectValue placeholder="Select business number" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="all">All Numbers</SelectItem>
                          <SelectItem value="wa-12345">WA-12345</SelectItem>
                          <SelectItem value="wa-12346">WA-12346</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <label htmlFor="dateRange" className="block text-sm font-medium text-gray-700 mb-1">
                        Date Range
                      </label>
                      <Select defaultValue="today">
                        <SelectTrigger>
                          <SelectValue placeholder="Select date range" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="today">Today</SelectItem>
                          <SelectItem value="yesterday">Yesterday</SelectItem>
                          <SelectItem value="7days">Last 7 Days</SelectItem>
                          <SelectItem value="30days">Last 30 Days</SelectItem>
                          <SelectItem value="custom">Custom Range</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <label htmlFor="status" className="block text-sm font-medium text-gray-700 mb-1">
                        Status
                      </label>
                      <Select 
                        defaultValue="all"
                        onValueChange={(value) => setStatusFilter(value as MessageStatus | "all")}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select status" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="all">All Statuses</SelectItem>
                          <SelectItem value="delivered">Delivered</SelectItem>
                          <SelectItem value="read">Read</SelectItem>
                          <SelectItem value="failed">Failed</SelectItem>
                          <SelectItem value="pending">Pending</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  <div className="flex-1 md:max-w-xs">
                    <label htmlFor="search" className="block text-sm font-medium text-gray-700 mb-1">
                      Search Messages
                    </label>
                    <div className="relative">
                      <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                      <Input
                        id="search"
                        placeholder="Search by sender, recipient, content..."
                        className="pl-8"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                      />
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <Tabs 
                defaultValue="templates" 
                onValueChange={(value) => setActiveTab(value as "templates" | "conversations")}
              >
                <CardHeader className="pb-0">
                  <TabsList className="grid w-full grid-cols-2 max-w-md">
                    <TabsTrigger value="templates">Template Messages</TabsTrigger>
                    <TabsTrigger value="conversations">Conversation Log</TabsTrigger>
                  </TabsList>
                </CardHeader>
                <CardContent className="pt-6">
                  <TabsContent value="templates" className="m-0">
                    <div className="rounded-md border">
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead>Sender ID</TableHead>
                            <TableHead>Recipient</TableHead>
                            <TableHead>Template</TableHead>
                            <TableHead>Type</TableHead>
                            <TableHead>Content</TableHead>
                            <TableHead>Date & Time</TableHead>
                            <TableHead>Status</TableHead>
                            <TableHead>Action</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {filteredTemplateMessages.length === 0 ? (
                            <TableRow>
                              <TableCell colSpan={8} className="text-center py-4">
                                No messages found matching your criteria
                              </TableCell>
                            </TableRow>
                          ) : (
                            filteredTemplateMessages.map((message) => (
                              <TableRow key={message.id}>
                                <TableCell>{message.senderId}</TableCell>
                                <TableCell>{message.recipient}</TableCell>
                                <TableCell>{message.template}</TableCell>
                                <TableCell>{message.type}</TableCell>
                                <TableCell className="max-w-xs truncate" title={message.content}>
                                  {message.content}
                                </TableCell>
                                <TableCell>{message.dateTime}</TableCell>
                                <TableCell>
                                  <span className={`font-medium ${getStatusColor(message.status)}`}>
                                    {message.status.charAt(0).toUpperCase() + message.status.slice(1)}
                                  </span>
                                </TableCell>
                                <TableCell>
                                  <Button
                                    variant="ghost"
                                    size="sm"
                                    onClick={() => handleOpenReplyModal(message.id)}
                                    className="flex items-center gap-1"
                                  >
                                    <MessageSquare className="h-4 w-4" />
                                    Reply
                                  </Button>
                                </TableCell>
                              </TableRow>
                            ))
                          )}
                        </TableBody>
                      </Table>
                    </div>
                  </TabsContent>
                  <TabsContent value="conversations" className="m-0">
                    <div className="rounded-md border">
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead>Sender</TableHead>
                            <TableHead>Recipient</TableHead>
                            <TableHead>Message</TableHead>
                            <TableHead>Date & Time</TableHead>
                            <TableHead>Status</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {filteredConversationMessages.length === 0 ? (
                            <TableRow>
                              <TableCell colSpan={5} className="text-center py-4">
                                No messages found matching your criteria
                              </TableCell>
                            </TableRow>
                          ) : (
                            filteredConversationMessages.map((message) => (
                              <TableRow key={message.id}>
                                <TableCell>{message.sender}</TableCell>
                                <TableCell>{message.recipient}</TableCell>
                                <TableCell className="max-w-xs truncate" title={message.message}>
                                  {message.message}
                                </TableCell>
                                <TableCell>{message.dateTime}</TableCell>
                                <TableCell>
                                  <span className={`font-medium ${getStatusColor(message.status)}`}>
                                    {message.status.charAt(0).toUpperCase() + message.status.slice(1)}
                                  </span>
                                </TableCell>
                              </TableRow>
                            ))
                          )}
                        </TableBody>
                      </Table>
                    </div>
                  </TabsContent>
                </CardContent>
              </Tabs>
            </Card>
          </div>
        </main>
      </div>
    </div>
  );
};

export default LiveFeed;
