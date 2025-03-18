
import React from "react";
import { NavLink } from "react-router-dom";
import { cn } from "@/lib/utils";
import {
  LayoutDashboard,
  Activity,
  BarChart3,
  Megaphone,
  MessagesSquare,
  UserCheck,
  CreditCard,
  Settings,
} from "lucide-react";

interface SidebarNavItemProps {
  href: string;
  icon: React.ReactNode;
  label: string;
  isActive?: boolean;
}

const SidebarNavItem: React.FC<SidebarNavItemProps> = ({
  href,
  icon,
  label,
  isActive,
}) => (
  <NavLink
    to={href}
    className={({ isActive }) =>
      cn(
        "flex items-center gap-3 rounded-md px-3 py-2 text-sm transition-all",
        isActive
          ? "bg-netcore-blue text-white"
          : "text-gray-600 hover:bg-gray-100"
      )
    }
  >
    {icon}
    <span>{label}</span>
  </NavLink>
);

export const SidebarNav: React.FC = () => {
  return (
    <div className="flex flex-col h-full w-56 bg-white border-r">
      <div className="flex items-center h-16 px-6 border-b">
        <h1 className="text-xl font-bold text-netcore-blue">Netcore CPaaS</h1>
      </div>
      <div className="flex-1 py-6 px-4">
        <nav className="space-y-1">
          <SidebarNavItem
            href="/"
            icon={<LayoutDashboard className="h-5 w-5" />}
            label="Dashboard"
          />
          <SidebarNavItem
            href="/live-feed"
            icon={<Activity className="h-5 w-5" />}
            label="Live Feed"
          />
          <SidebarNavItem
            href="/reports"
            icon={<BarChart3 className="h-5 w-5" />}
            label="Reports"
          />
          <SidebarNavItem
            href="/campaigns"
            icon={<Megaphone className="h-5 w-5" />}
            label="Campaigns"
          />
          <SidebarNavItem
            href="/templates"
            icon={<MessagesSquare className="h-5 w-5" />}
            label="Templates"
          />
          <SidebarNavItem
            href="/consent"
            icon={<UserCheck className="h-5 w-5" />}
            label="Consent Management"
          />
          <SidebarNavItem
            href="/billing"
            icon={<CreditCard className="h-5 w-5" />}
            label="Billing"
          />
          <SidebarNavItem
            href="/settings"
            icon={<Settings className="h-5 w-5" />}
            label="Settings"
          />
        </nav>
      </div>
    </div>
  );
};
