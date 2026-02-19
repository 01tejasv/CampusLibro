
"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { 
  BookOpen, 
  LayoutDashboard, 
  Library, 
  Search, 
  Bell, 
  ClipboardList, 
  LogOut,
  User,
  Sparkles
} from "lucide-react"
import { cn } from "@/lib/utils"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarSeparator,
} from "@/components/ui/sidebar"

const NAV_ITEMS = [
  { name: "Dashboard", href: "/", icon: LayoutDashboard },
  { name: "Book Catalog", href: "/catalog", icon: Library },
  { name: "AI Assistant", href: "/ai-assistant", icon: Sparkles },
  { name: "My Loans", href: "/loans", icon: BookOpen },
  { name: "Inventory", href: "/inventory", icon: ClipboardList },
  { name: "Notifications", href: "/notifications", icon: Bell },
]

export function AppSidebar() {
  const pathname = usePathname()

  return (
    <Sidebar variant="inset" collapsible="icon">
      <SidebarHeader className="flex items-center justify-center py-6">
        <div className="flex items-center gap-2">
          <div className="bg-primary text-primary-foreground p-2 rounded-lg">
            <BookOpen className="w-6 h-6" />
          </div>
          <span className="font-headline font-bold text-xl group-data-[collapsible=icon]:hidden">CampusLibro</span>
        </div>
      </SidebarHeader>
      <SidebarSeparator />
      <SidebarContent>
        <SidebarMenu className="px-3 py-2">
          {NAV_ITEMS.map((item) => (
            <SidebarMenuItem key={item.name}>
              <SidebarMenuButton
                asChild
                isActive={pathname === item.href}
                tooltip={item.name}
              >
                <Link href={item.href} className="flex items-center gap-3 py-6">
                  <item.icon className="w-5 h-5" />
                  <span className="font-medium">{item.name}</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarContent>
      <SidebarFooter className="p-4">
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton className="w-full justify-start gap-3 py-6" tooltip="Profile">
              <User className="w-5 h-5" />
              <div className="flex flex-col text-left group-data-[collapsible=icon]:hidden">
                <span className="text-sm font-semibold">Tejasv</span>
                <span className="text-xs text-muted-foreground">Student</span>
              </div>
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuButton className="w-full justify-start gap-3 text-destructive hover:text-destructive py-6" tooltip="Logout">
              <LogOut className="w-5 h-5" />
              <span className="group-data-[collapsible=icon]:hidden">Logout</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  )
}
