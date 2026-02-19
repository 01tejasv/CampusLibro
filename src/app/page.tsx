
"use client"

import { SidebarProvider, SidebarInset, SidebarTrigger } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/nav/Sidebar"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { 
  BookOpen, 
  Clock, 
  AlertCircle,
  ArrowRight,
  Loader2
} from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { useUser } from "@/firebase"
import { useRouter } from "next/navigation"
import { useEffect } from "react"

export default function Dashboard() {
  const { user, isUserLoading } = useUser();
  const router = useRouter();

  useEffect(() => {
    if (!isUserLoading && !user) {
      router.push('/login');
    }
  }, [user, isUserLoading, router]);

  if (isUserLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  if (!user) return null;

  // Use Tejasv as the default name for the user
  const displayName = user.displayName || user.email?.split('@')[0] || "Tejasv";

  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center gap-2 border-b px-6">
          <SidebarTrigger />
          <h1 className="text-xl font-headline font-bold text-primary">Dashboard</h1>
        </header>
        
        <main className="flex-1 overflow-auto p-6 space-y-8">
          {/* Welcome Section */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="col-span-1 md:col-span-2 overflow-hidden bg-primary/5 border-primary/10">
              <div className="flex flex-col md:flex-row h-full">
                <div className="p-8 flex-1 flex flex-col justify-center space-y-4">
                  <h2 className="text-3xl font-headline font-bold">Welcome back, {displayName}!</h2>
                  <p className="text-muted-foreground">
                    You have 2 books currently borrowed. One is due in 3 days. 
                    Explore our new collection of computer science journals.
                  </p>
                  <div className="flex gap-4 pt-2">
                    <Button asChild>
                      <Link href="/catalog">Browse Catalog</Link>
                    </Button>
                    <Button variant="outline" asChild>
                      <Link href="/loans">My Loans</Link>
                    </Button>
                  </div>
                </div>
                <div className="relative w-full md:w-1/3 h-48 md:h-auto overflow-hidden">
                  <Image 
                    src="https://picsum.photos/seed/dash1/600/400" 
                    alt="Library" 
                    fill 
                    className="object-cover"
                    data-ai-hint="library interior"
                  />
                </div>
              </div>
            </Card>

            <Card className="flex flex-col justify-between">
              <CardHeader>
                <CardTitle className="text-lg">Quick Stats</CardTitle>
                <CardDescription>Academic Year 2024-25</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between p-3 bg-background rounded-lg border">
                  <div className="flex items-center gap-3">
                    <BookOpen className="text-primary w-5 h-5" />
                    <span className="text-sm font-medium">Books Read</span>
                  </div>
                  <span className="text-xl font-bold">12</span>
                </div>
                <div className="flex items-center justify-between p-3 bg-background rounded-lg border">
                  <div className="flex items-center gap-3">
                    <Clock className="text-accent w-5 h-5" />
                    <span className="text-sm font-medium">Hours Studied</span>
                  </div>
                  <span className="text-xl font-bold">124</span>
                </div>
                <div className="flex items-center justify-between p-3 bg-background rounded-lg border">
                  <div className="flex items-center gap-3">
                    <AlertCircle className="text-destructive w-5 h-5" />
                    <span className="text-sm font-medium">Overdue Books</span>
                  </div>
                  <span className="text-xl font-bold text-destructive">1</span>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Activity Section */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <div>
                  <CardTitle>Current Loans</CardTitle>
                  <CardDescription>Books you have checked out</CardDescription>
                </div>
                <Button variant="ghost" size="sm" asChild>
                  <Link href="/loans">View All <ArrowRight className="ml-2 w-4 h-4" /></Link>
                </Button>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    { title: "Modern Operating Systems", due: "Feb 15, 2024", status: "Active" },
                    { title: "The Great Gatsby", due: "Oct 15, 2023", status: "Overdue" }
                  ].map((loan, idx) => (
                    <div key={idx} className="flex items-center justify-between border-b pb-4 last:border-0 last:pb-0">
                      <div className="space-y-1">
                        <p className="font-medium">{loan.title}</p>
                        <p className="text-xs text-muted-foreground flex items-center gap-1">
                          <Clock className="w-3 h-3" /> Due: {loan.due}
                        </p>
                      </div>
                      <Badge variant={loan.status === 'Overdue' ? 'destructive' : 'secondary'}>
                        {loan.status}
                      </Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <div>
                  <CardTitle>Recommended for You</CardTitle>
                  <CardDescription>Based on your reading history</CardDescription>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-4">
                  {[
                    { title: "Clean Code", author: "Robert Martin", imgId: "201" },
                    { title: "Design Patterns", author: "Gang of Four", imgId: "202" }
                  ].map((rec, idx) => (
                    <div key={idx} className="space-y-2 group cursor-pointer">
                      <div className="aspect-[3/4] relative rounded-md overflow-hidden bg-muted">
                        <Image 
                          src={`https://picsum.photos/seed/${rec.imgId}/200/300`} 
                          alt={rec.title} 
                          fill 
                          className="object-cover transition-transform group-hover:scale-105"
                          data-ai-hint="book cover"
                        />
                      </div>
                      <div>
                        <p className="text-sm font-semibold truncate">{rec.title}</p>
                        <p className="text-xs text-muted-foreground">{rec.author}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </main>
      </SidebarInset>
    </SidebarProvider>
  )
}
