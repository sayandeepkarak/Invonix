"use client";

import * as React from "react";
import {
  LayoutDashboard,
  LogOut,
  Package,
  Settings,
  ShoppingCart,
  Truck,
} from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from "@/components/ui/sidebar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  DropdownMenuGroup,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { logoutRequest } from "@/features/auth/store";

const navItems = [
  { title: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
  { title: "Inventory", href: "/dashboard/inventory", icon: Package },
  { title: "Orders", href: "/dashboard/orders", icon: ShoppingCart },
  { title: "Delivery Agents", href: "/dashboard/agents", icon: Truck },
];

const userMenuItems = [
  { title: "Settings", href: "/dashboard/settings", icon: Settings },
];

export function LayoutSidebar() {
  const pathname = usePathname();
  const { user } = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();

  const handleLogout = () => {
    dispatch(logoutRequest());
  };

  const initials = user?.name
    ? user.name
        .split(" ")
        .map((n: string) => {
          return n[0];
        })
        .join("")
        .toUpperCase()
    : "U";

  return (
    <Sidebar collapsible="icon">
      <SidebarHeader className="flex h-12 items-center px-4">
        <div className="flex items-center gap-2 font-bold">
          <div className="flex h-6 w-6 items-center justify-center rounded bg-primary text-primary-foreground">
            <LayoutDashboard className="h-4 w-4" />
          </div>
          <span className="truncate group-data-[collapsible=icon]:hidden">
            {user?.businessName || "Invonix"}
          </span>
        </div>
      </SidebarHeader>
      <SidebarContent>
        <SidebarMenu className="px-2">
          {navItems.map((item) => (
            <SidebarMenuItem key={item.href}>
              <SidebarMenuButton
                render={(props) => {
                  return <Link {...props} href={item.href} />;
                }}
                isActive={pathname === item.href}
                tooltip={item.title}
              >
                <item.icon />
                <span>{item.title}</span>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarContent>
      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <DropdownMenu>
              <DropdownMenuTrigger
                render={(props: React.HTMLAttributes<HTMLElement>) => {
                  return (
                    <SidebarMenuButton
                      {...props}
                      size="lg"
                      className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
                    >
                      <Avatar className="h-8 w-8 rounded-lg">
                        <AvatarFallback className="rounded-lg bg-primary/10 text-primary">
                          {initials}
                        </AvatarFallback>
                      </Avatar>
                      <div className="grid flex-1 text-left text-sm leading-tight group-data-[collapsible=icon]:hidden">
                        <span className="truncate font-semibold">
                          {user?.name || "User"}
                        </span>
                        <span className="truncate text-xs text-muted-foreground">
                          {user?.email || "user@example.com"}
                        </span>
                      </div>
                    </SidebarMenuButton>
                  );
                }}
              />
              <DropdownMenuContent
                className="w-56 rounded-lg"
                side="bottom"
                align="end"
                sideOffset={4}
              >
                <DropdownMenuGroup>
                  {userMenuItems.map((item) => (
                    <DropdownMenuItem key={item.href} className="p-0">
                      <Link
                        href={item.href}
                        className="flex items-center gap-2 w-full px-1.5 py-1"
                      >
                        <item.icon className="h-4 w-4" />
                        {item.title}
                      </Link>
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuGroup>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                  onClick={handleLogout}
                  className="gap-2 text-destructive"
                >
                  <LogOut className="h-4 w-4" />
                  <span>Logout</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
