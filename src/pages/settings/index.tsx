
import React from "react";
import { SidebarNav } from "@/components/layout/sidebar-nav";
import { TopNav } from "@/components/layout/top-nav";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { NavLink, useNavigate } from "react-router-dom";
import {
  Users,
  Building,
  Globe,
  Mail,
  CreditCard,
  MessageSquare,
  ChevronRight,
} from "lucide-react";

const SettingsIndex = () => {
  const navigate = useNavigate();

  const settingsCards = [
    {
      title: "Manage User",
      description: "Add and manage users with access to your account",
      icon: <Users className="h-6 w-6" />,
      href: "/settings/users",
    },
    {
      title: "General Settings",
      description: "Configure your WhatsApp Business profile and templates",
      icon: <Building className="h-6 w-6" />,
      href: "/settings/general",
    },
    {
      title: "Account Settings",
      description: "Manage your business number settings",
      icon: <Globe className="h-6 w-6" />,
      href: "/settings/account",
    },
    {
      title: "Mail Alert",
      description: "Configure email notifications for important events",
      icon: <Mail className="h-6 w-6" />,
      href: "/settings/mail",
    },
    {
      title: "Integrations",
      description: "Connect to payment gateways and other services",
      icon: <CreditCard className="h-6 w-6" />,
      href: "/settings/integrations",
    },
    {
      title: "Autoreply",
      description: "Configure keyword-based automated responses",
      icon: <MessageSquare className="h-6 w-6" />,
      href: "/settings/autoreply",
      isNew: true,
    },
  ];

  return (
    <div className="flex h-screen bg-gray-50">
      <SidebarNav />
      <div className="flex-1 flex flex-col overflow-hidden">
        <TopNav />
        <main className="flex-1 overflow-y-auto p-6">
          <div className="grid gap-6">
            <div>
              <h1 className="text-3xl font-bold tracking-tight">Settings</h1>
              <p className="text-muted-foreground">
                Manage your account settings and preferences
              </p>
            </div>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {settingsCards.map((card, index) => (
                <Card
                  key={card.title}
                  className="glass-card hover:shadow-lg transition-all duration-300 cursor-pointer relative overflow-hidden animate-fade-in"
                  style={{ animationDelay: `${index * 100}ms` }}
                  onClick={() => navigate(card.href)}
                >
                  {card.isNew && (
                    <div className="absolute top-0 right-0">
                      <span className="inline-flex items-center rounded-bl-lg bg-netcore-blue px-2 py-1 text-xs font-medium text-white">
                        New
                      </span>
                    </div>
                  )}
                  <CardHeader className="flex flex-row items-center justify-between">
                    <div className="flex items-center">
                      <div className="mr-4 rounded-full bg-primary/10 p-2">
                        {card.icon}
                      </div>
                      <div>
                        <CardTitle>{card.title}</CardTitle>
                        <CardDescription className="mt-1">
                          {card.description}
                        </CardDescription>
                      </div>
                    </div>
                    <ChevronRight className="h-5 w-5 text-muted-foreground" />
                  </CardHeader>
                </Card>
              ))}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default SettingsIndex;
