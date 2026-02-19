
"use client"

import { SidebarProvider, SidebarInset, SidebarTrigger } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/nav/Sidebar"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { 
  History, 
  Calendar, 
  RotateCcw, 
  ExternalLink,
  BookOpen
} from "lucide-react"
import { BOOKS, LOANS } from "@/app/lib/books"
import Image from "next/image"

export default function MyLoans() {
  const activeLoans = LOANS.filter(l => l.status !== 'Returned')
  const loanHistory = [
    { id: 'h1', title: 'Introduction to Algorithms', returnedDate: '2023-12-15' },
    { id: 'h2', title: 'Sapiens', returnedDate: '2023-11-01' }
  ]

  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center gap-2 border-b px-6">
          <SidebarTrigger />
          <h1 className="text-xl font-headline font-bold text-primary">My Book Loans</h1>
        </header>

        <main className="flex-1 overflow-auto p-6 space-y-8">
          <section className="space-y-4">
            <h2 className="text-2xl font-bold flex items-center gap-2">
              <Calendar className="text-primary w-6 h-6" /> Active Loans
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {activeLoans.map((loan) => {
                const book = BOOKS.find(b => b.id === loan.bookId)
                return (
                  <Card key={loan.id} className="overflow-hidden">
                    <div className="flex h-full">
                      <div className="w-1/3 relative bg-muted">
                        <Image 
                          src={`https://picsum.photos/seed/${book?.coverId || 'x'}/200/300`} 
                          alt={book?.title || 'Book'} 
                          fill 
                          className="object-cover"
                          data-ai-hint="book cover"
                        />
                      </div>
                      <div className="w-2/3 p-4 flex flex-col justify-between">
                        <div className="space-y-2">
                          <div className="flex justify-between items-start">
                            <Badge variant={loan.status === 'Overdue' ? 'destructive' : 'secondary'}>
                              {loan.status}
                            </Badge>
                          </div>
                          <h3 className="font-bold leading-tight">{book?.title}</h3>
                          <p className="text-sm text-muted-foreground">{book?.author}</p>
                          <div className="pt-2 text-xs text-muted-foreground space-y-1">
                            <p>Borrowed: {loan.borrowDate}</p>
                            <p className="font-semibold text-foreground">Due Date: {loan.dueDate}</p>
                          </div>
                        </div>
                        <div className="flex gap-2 pt-4">
                          <Button size="sm" variant="outline" className="flex-1 gap-2">
                            <RotateCcw className="w-3 h-3" /> Renew
                          </Button>
                          <Button size="sm" className="flex-1">Return</Button>
                        </div>
                      </div>
                    </div>
                  </Card>
                )
              })}
            </div>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-bold flex items-center gap-2">
              <History className="text-accent w-6 h-6" /> Loan History
            </h2>
            <Card>
              <CardContent className="p-0">
                <div className="divide-y">
                  {loanHistory.map((item) => (
                    <div key={item.id} className="p-4 flex items-center justify-between hover:bg-muted/30 transition-colors">
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-14 relative bg-muted rounded overflow-hidden">
                          <Image src={`https://picsum.photos/seed/hist${item.id}/40/60`} alt={item.title} fill className="object-cover" />
                        </div>
                        <div>
                          <p className="font-medium">{item.title}</p>
                          <p className="text-xs text-muted-foreground">Returned on {item.returnedDate}</p>
                        </div>
                      </div>
                      <Button variant="ghost" size="sm" className="gap-2">
                        View Details <ExternalLink className="w-3 h-3" />
                      </Button>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </section>
        </main>
      </SidebarInset>
    </SidebarProvider>
  )
}
