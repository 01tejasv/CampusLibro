
"use client"

import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { 
  BookOpen, 
  LayoutDashboard, 
  Library, 
  Bell, 
  ClipboardList, 
  LogOut,
  User,
  Sparkles,
  ShieldCheck
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
import { useUser, useAuth, useDoc, useMemoFirebase } from "@/firebase"
import { doc } from "firebase/firestore"
import { getFirestore } from "firebase/firestore"

const NAV_ITEMS = [
  { name: "Dashboard", href: "/", icon: LayoutDashboard },
  { name: "Book Catalog", href: "/catalog", icon: Library },
  { name: "AI Assistant", href: "/ai-assistant", icon: Sparkles },
  { name: "My Loans", href: "/loans", icon: BookOpen },
]

const ADMIN_ITEMS = [
  { name: "Inventory", href: "/inventory", icon: ClipboardList },
  { name: "Notifications", href: "/notifications", icon: Bell },
]

export function AppSidebar() {
  const pathname = usePathname()
  const router = useRouter()
  const auth = useAuth()
  const { user, isUserLoading } = useUser()
  const db = getFirestore()

  // Check for admin/librarian roles
  const adminDocRef = useMemoFirebase(() => {
    if (!db || !user?.uid) return null;
    return doc(db, 'roles_admin', user.uid);
  }, [db, user?.uid]);
  
  const librarianDocRef = useMemoFirebase(() => {
    if (!db || !user?.uid) return null;
    return doc(db, 'roles_librarian', user.uid);
  }, [db, user?.uid]);

  const { data: adminData } = useDoc(adminDocRef);
  const { data: librarianData } = useDoc(librarianDocRef);
  
  const isStaff = !!adminData || !!librarianData;

  const handleLogout = async () => {
    await auth.signOut();
    router.push('/login');
  }

  return (
    <Sidebar variant="inset" collapsible="icon">
      <SidebarHeader className="flex items-center justify-center py-6">
        <div className="flex items-center gap-2">
          <div className="bg-primary text-primary-foreground p-2 rounded-lg">
            <BookOpen className="w-6 h-6" />
          </div>
          <span className="font-headline font-bold text-xl group-data-[collapsible=icon]:hidden text-primary">CampusLibro</span>
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
                <Link href={item.href} className="flex items-center gap-3">
                  <item.icon className="w-5 h-5" />
                  <span className="font-medium">{item.name}</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}

          {isStaff && (
            <>
              <div className="px-3 py-4 mt-2">
                <span className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground group-data-[collapsible=icon]:hidden">
                  Staff Management
                </span>
              </div>
              {ADMIN_ITEMS.map((item) => (
                <SidebarMenuItem key={item.name}>
                  <SidebarMenuButton
                    asChild
                    isActive={pathname === item.href}
                    tooltip={item.name}
                  >
                    <Link href={item.href} className="flex items-center gap-3">
                      <item.icon className="w-5 h-5" />
                      <span className="font-medium">{item.name}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </>
          )}
        </SidebarMenu>
      </SidebarContent>
      <SidebarFooter className="p-4">
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton className="w-full justify-start gap-3 py-8" tooltip="Profile">
              <div className="w-8 h-8 rounded-full bg-accent flex items-center justify-center text-accent-foreground font-bold shrink-0">
                {user?.displayName?.[0] || user?.email?.[0] || 'T'}
              </div>
              <div className="flex flex-col text-left group-data-[collapsible=icon]:hidden overflow-hidden">
                <span className="text-sm font-semibold truncate">{user?.displayName || 'Tejasv'}</span>
                <span className="text-[10px] text-muted-foreground flex items-center gap-1">
                  {isStaff ? <ShieldCheck className="w-3 h-3 text-primary" /> : <User className="w-3 h-3" />}
                  {isStaff ? 'Librarian/Admin' : 'Student'}
                </span>
              </div>
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuButton 
              className="w-full justify-start gap-3 text-destructive hover:text-destructive hover:bg-destructive/5 py-6" 
              tooltip="Logout"
              onClick={handleLogout}
            >
              <LogOut className="w-5 h-5" />
              <span className="group-data-[collapsible=icon]:hidden">Logout</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  )
}
