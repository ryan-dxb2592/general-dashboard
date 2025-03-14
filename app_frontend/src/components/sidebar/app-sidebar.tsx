"use client";

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
import { useIsMobile } from "@/hooks/use-mobile";

import { getMenuList } from "@/lib/menu-list";

import { GalleryVerticalEnd, ChevronRight } from "lucide-react";
import Link from "next/link";
import AppSidebarFooter from "./app-sidebar-footer";

const AppSidebar = () => {
  const menuList = getMenuList();
  const isMobile = useIsMobile();

  //   Dummy User
  const user = {
    name: "John Doe",
    email: "john.doe@example.com",
    image: "https://github.com/shadcn.png",
  };

  return (
    <Sidebar
      variant="inset"
      collapsible="icon"
      side="left"
      className="border-r py-0"
    >
      {/* Sidebar Header */}
      <div className="h-screen max-h-screen flex flex-col">
        <div className="border-b">
          <SidebarHeader>
            <SidebarMenu className="border-sidebar-accent-foreground">
              <SidebarMenuItem>
                <SidebarMenuButton size="lg" asChild>
                  <Link
                    href="/"
                    className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground flex flex-row items-center gap-2.5"
                  >
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
        <SidebarContent className="gap-0">
          {menuList.map((menuListItem, index) => (
            <SidebarGroup key={menuListItem.groupLabel + index}>
              {menuListItem.groupLabel && (
                <SidebarGroupLabel className="text-xs text-muted-foreground">
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
                            <SidebarMenuButton
                              tooltip={listItem.label}
                              className="cursor-pointer"
                            >
                              {listItem.icon && <listItem.icon />}
                              <span>{listItem.label}</span>
                              <ChevronRight className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90 " />
                            </SidebarMenuButton>
                          </CollapsibleTrigger>

                          <CollapsibleContent>
                            <SidebarMenuSub>
                              {listItem.submenus?.map((item, index) => (
                                <SidebarMenuSubItem key={item.label + index}>
                                  <SidebarMenuSubButton asChild>
                                    <Link
                                      href={item.href}
                                      className="flex gap-2 items-center cursor-pointer"
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
                        <SidebarMenuButton tooltip={listItem.label} asChild>
                          <Link href={listItem.href}>
                            {listItem.icon && <listItem.icon />}
                            <span>{listItem.label}</span>
                          </Link>
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
          <AppSidebarFooter
            user={user}
            isMobile={isMobile}
            onLogout={() => {}}
          />
        </SidebarFooter>
      </div>
    </Sidebar>
  );
};

export default AppSidebar;
