
import React, { useState } from "react";
import { SidebarNav } from "@/components/layout/sidebar-nav";
import { TopNav } from "@/components/layout/top-nav";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  BarChart3, 
  MessageSquare, 
  Users, 
  ArrowUpRight,
  Send,
  CheckCheck,
  Eye,
  MousePointerClick,
  XCircle,
  Clock,
  Download
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { DatePickerWithRange } from "@/components/dashboard/date-range-picker";
import { PerformanceChart } from "@/components/dashboard/performance-chart";
import { toast } from "@/hooks/use-toast";

const Index = () => {
  const navigate = useNavigate();
  const [businessNumber, setBusinessNumber] = useState<string>("all");
  const [dateRange, setDateRange] = useState({ from: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000), to: new Date() });

  const handleDownloadReport = () => {
    toast({
      title: "Download started",
      description: "Your report is being generated and will download shortly."
    });
    // In a real implementation, this would trigger an API call to generate and download the report
  };

  return (
    <div className="flex h-screen bg-gray-50">
      <SidebarNav />
      <div className="flex-1 flex flex-col overflow-hidden">
        <TopNav />
        <main className="flex-1 overflow-y-auto p-6">
          <div className="grid gap-6">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div>
                <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
                <p className="text-muted-foreground">
                  Overview of your WhatsApp messaging performance
                </p>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-3">
                <div className="w-full sm:w-48">
                  <Select value={businessNumber} onValueChange={setBusinessNumber}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select business number" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Business Numbers</SelectItem>
                      <SelectItem value="+919876543210">+91 98765 43210</SelectItem>
                      <SelectItem value="+911234567890">+91 12345 67890</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <DatePickerWithRange dateRange={dateRange} setDateRange={setDateRange} />
                
                <Button 
                  variant="outline" 
                  className="gap-2"
                  onClick={handleDownloadReport}
                >
                  <Download className="h-4 w-4" />
                  Download Report
                </Button>
              </div>
            </div>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
              <Card className="glass-card animate-fade-in stagger-1">
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <CardTitle className="text-sm font-medium">
                    Total Requests
                  </CardTitle>
                  <BarChart3 className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">15,231</div>
                  <p className="text-xs text-muted-foreground">
                    +12.5% from last month
                  </p>
                </CardContent>
              </Card>
              
              <Card className="glass-card animate-fade-in stagger-2">
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <CardTitle className="text-sm font-medium">
                    Sent
                  </CardTitle>
                  <Send className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">14,892</div>
                  <p className="text-xs text-muted-foreground">
                    97.8% success rate
                  </p>
                </CardContent>
              </Card>
              
              <Card className="glass-card animate-fade-in stagger-2">
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <CardTitle className="text-sm font-medium">
                    Delivered
                  </CardTitle>
                  <CheckCheck className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">14,521</div>
                  <p className="text-xs text-muted-foreground">
                    97.5% delivery rate
                  </p>
                </CardContent>
              </Card>
              
              <Card className="glass-card animate-fade-in stagger-2">
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <CardTitle className="text-sm font-medium">
                    Read
                  </CardTitle>
                  <Eye className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">12,345</div>
                  <p className="text-xs text-muted-foreground">
                    82.9% read rate
                  </p>
                </CardContent>
              </Card>
              
              <Card className="glass-card animate-fade-in stagger-3">
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <CardTitle className="text-sm font-medium">Clicked</CardTitle>
                  <MousePointerClick className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">3,428</div>
                  <p className="text-xs text-muted-foreground">
                    23.6% click rate
                  </p>
                </CardContent>
              </Card>
              
              <Card className="glass-card animate-fade-in stagger-3">
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <CardTitle className="text-sm font-medium">Failed</CardTitle>
                  <XCircle className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">339</div>
                  <p className="text-xs text-muted-foreground">
                    2.2% failure rate
                  </p>
                </CardContent>
              </Card>
              
              <Card className="glass-card animate-fade-in stagger-3">
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <CardTitle className="text-sm font-medium">DLR Pending</CardTitle>
                  <Clock className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">32</div>
                  <p className="text-xs text-muted-foreground">
                    0.2% pending
                  </p>
                </CardContent>
              </Card>
              
              <Card className="glass-card animate-fade-in stagger-3">
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <CardTitle className="text-sm font-medium">Not Sent</CardTitle>
                  <Users className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">0</div>
                  <p className="text-xs text-muted-foreground">
                    0% not sent
                  </p>
                </CardContent>
              </Card>
            </div>

            <Card className="glass-card animate-scale-in stagger-4">
              <CardHeader>
                <CardTitle>Performance Overview</CardTitle>
              </CardHeader>
              <CardContent>
                <PerformanceChart dateRange={dateRange} businessNumber={businessNumber} />
              </CardContent>
            </Card>

            <Card className="col-span-full glass-card animate-scale-in stagger-5">
              <CardHeader>
                <CardTitle>Recent Updates</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="rounded-lg border bg-card p-6">
                  <div className="flex items-start gap-4">
                    <div className="rounded-full bg-primary/10 p-2">
                      <MessageSquare className="h-6 w-6 text-primary" />
                    </div>
                    <div className="grid gap-1">
                      <h3 className="font-semibold">New Feature: Autoreply</h3>
                      <p className="text-sm text-muted-foreground">
                        Configure keyword-based automated responses for your WhatsApp messages. Set up default keywords like "Stop" and "Start" for opt-out and opt-in functionality.
                      </p>
                      <div className="mt-2">
                        <Button 
                          size="sm" 
                          className="gap-1"
                          onClick={() => navigate("/settings/autoreply")}
                        >
                          Configure Autoreply
                          <ArrowUpRight className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Index;
