import React from "react";
import {
  Sidebar,
  SidebarHeader,
  SidebarContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenuSub,
  SidebarMenuSubItem,
  SidebarMenuSubButton,
  SidebarFooter,
} from "@/components/ui/sidebar";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";

import { getMenuList } from "@/lib/menu-list";

import { GalleryVerticalEnd, ChevronRight } from "lucide-react";
import Link from "next/link";
import AppSidebarFooter from "./app-sidebar-footer";

const AppSidebar = () => {
  const menuList = getMenuList();

  //   Dummy User
  const user = {
    name: "John Doe",
    email: "john.doe@example.com",
    image: "https://github.com/shadcn.png",
  };

  //   Dummy isMobile
  const isMobile = false;

  return (
    <Sidebar
      variant="inset"
      collapsible="icon"
      side="left"
      className="border-r"
    >
      {/* Sidebar Header */}
      <div className="border-b">
        <SidebarHeader>
          <SidebarMenu className="gap-2 border-sidebar-accent-foreground">
            <SidebarMenuItem>
              <SidebarMenuButton
                size="lg"
                className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
                asChild
              >
                <Link href="/">
                  <div className="flex justify-center items-center rounded-lg aspect-square size-8 bg-sidebar-primary text-sidebar-primary-foreground">
                    <GalleryVerticalEnd />
                  </div>
                  <div className="grid flex-1 text-sm leading-tight text-left">
                    <span className="font-semibold truncate">
                      Smart Turn Holidays
                    </span>
                    <span className="text-xs truncate">Admin Dashboard</span>
                  </div>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarHeader>
      </div>
      {/* Sidebar Content */}
      <SidebarContent>
        {menuList.map((menuListItem, index) => (
          <SidebarGroup key={menuListItem.groupLabel + index} className="py-1">
            {menuListItem.groupLabel && (
              <SidebarGroupLabel className="text-xs">
                {menuListItem.groupLabel}
              </SidebarGroupLabel>
            )}

            <SidebarMenu className="gap-0">
              {menuListItem.menus.map((listItem) => (
                <React.Fragment key={listItem.label}>
                  {listItem.submenus && listItem.submenus.length !== 0 ? (
                    <Collapsible
                      key={listItem.label + index}
                      asChild
                      className="group/collapsible"
                    >
                      <SidebarMenuItem>
                        <CollapsibleTrigger asChild>
                          <SidebarMenuButton tooltip={listItem.label}>
                            {listItem.icon && <listItem.icon />}
                            <span>{listItem.label}</span>
                            <ChevronRight className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
                          </SidebarMenuButton>
                        </CollapsibleTrigger>

                        <CollapsibleContent>
                          <SidebarMenuSub>
                            {listItem.submenus?.map((item, index) => (
                              <SidebarMenuSubItem key={item.label + index}>
                                <SidebarMenuSubButton asChild>
                                  <Link
                                    href={item.href}
                                    className="flex gap-2 items-center"
                                  >
                                    {item.icon && <item.icon />}
                                    <span className="">{item.label}</span>
                                  </Link>
                                </SidebarMenuSubButton>
                              </SidebarMenuSubItem>
                            ))}
                          </SidebarMenuSub>
                        </CollapsibleContent>
                      </SidebarMenuItem>
                    </Collapsible>
                  ) : (
                    <SidebarMenuItem>
                      <SidebarMenuButton tooltip={listItem.label}>
                        {listItem.icon && <listItem.icon />}
                        <Link href={listItem.href}>{listItem.label}</Link>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  )}
                </React.Fragment>
              ))}
            </SidebarMenu>
          </SidebarGroup>
        ))}
      </SidebarContent>

      {/* Sidebar Footer */}
      <SidebarFooter>
        <AppSidebarFooter user={user} isMobile={isMobile} onLogout={() => {}} />
      </SidebarFooter>
    </Sidebar>
  );
};

export default AppSidebar;
