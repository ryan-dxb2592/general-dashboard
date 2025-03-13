"use client";
import { useSidebar } from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";
import { Menu } from "lucide-react";
import ThemeToggle from "@/components/common/theme-toggle";
import NotificationDropdown from "./notification-dropdown";
import MessagesDropdown from "./messages-dropdown";
import QuickAddDropdown from "./quick-add-dropdown";

const DashboardHeader: React.FC = () => {
  const { toggleSidebar } = useSidebar();
  return (
    <header className="flex items-center justify-between h-10 ">
      <div className="flex flex-1 items-center gap-2 justify-between ">
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon" onClick={toggleSidebar}>
            <Menu />
          </Button>
        </div>
        <div className="flex items-center gap-2">
          <QuickAddDropdown />
          <div className="h-7 w-px bg-border mx-2" />
          <MessagesDropdown />
          <NotificationDropdown />
          <div className="h-7 w-px bg-border mx-2" />

          <ThemeToggle />
        </div>
      </div>
    </header>
  );
};

export default DashboardHeader;
