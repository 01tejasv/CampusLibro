
"use client"

import { useState } from "react"
import { SidebarProvider, SidebarInset, SidebarTrigger } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/nav/Sidebar"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { 
  Search, 
  Filter, 
  BookOpen, 
  Info,
  ChevronDown
} from "lucide-react"
import { BOOKS, Book } from "@/app/lib/books"
import Image from "next/image"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

export default function BookCatalog() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedSubject, setSelectedSubject] = useState<string | null>(null)

  const subjects = Array.from(new Set(BOOKS.map(b => b.subject)))

  const filteredBooks = BOOKS.filter(book => {
    const matchesSearch = 
      book.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      book.author.toLowerCase().includes(searchQuery.toLowerCase()) ||
      book.isbn.includes(searchQuery)
    
    const matchesSubject = !selectedSubject || book.subject === selectedSubject
    
    return matchesSearch && matchesSubject
  })

  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center gap-2 border-b px-6">
          <SidebarTrigger />
          <h1 className="text-xl font-headline font-bold text-primary">Book Catalog</h1>
        </header>

        <main className="flex-1 overflow-auto p-6 space-y-6">
          {/* Search and Filters */}
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground w-4 h-4" />
              <Input 
                placeholder="Search by title, author, or ISBN..." 
                className="pl-10"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <div className="flex gap-2">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" className="gap-2">
                    <Filter className="w-4 h-4" />
                    {selectedSubject || "All Subjects"}
                    <ChevronDown className="w-4 h-4 opacity-50" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem onClick={() => setSelectedSubject(null)}>
                    All Subjects
                  </DropdownMenuItem>
                  {subjects.map(subject => (
                    <DropdownMenuItem key={subject} onClick={() => setSelectedSubject(subject)}>
                      {subject}
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>

          {/* Results Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredBooks.length > 0 ? (
              filteredBooks.map((book) => (
                <Card key={book.id} className="flex flex-col h-full overflow-hidden group hover:shadow-md transition-shadow">
                  <div className="aspect-[3/4] relative bg-muted">
                    <Image 
                      src={`https://picsum.photos/seed/${book.coverId}/400/600`}
                      alt={book.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                      data-ai-hint="book cover"
                    />
                    <div className="absolute top-2 right-2">
                      <Badge 
                        variant={book.availability === 'Available' ? 'secondary' : 'outline'}
                        className={book.availability === 'Available' ? 'bg-green-100 text-green-700 hover:bg-green-100' : ''}
                      >
                        {book.availability}
                      </Badge>
                    </div>
                  </div>
                  <CardHeader className="p-4 pb-2">
                    <div className="text-xs text-primary font-semibold tracking-wider uppercase">{book.subject}</div>
                    <CardTitle className="text-lg leading-tight group-hover:text-primary transition-colors">{book.title}</CardTitle>
                    <div className="text-sm text-muted-foreground">{book.author}</div>
                  </CardHeader>
                  <CardContent className="p-4 pt-0 flex-1">
                    <p className="text-xs text-muted-foreground">ISBN: {book.isbn}</p>
                    <p className="text-xs text-muted-foreground">Year: {book.yearPublished}</p>
                  </CardContent>
                  <CardFooter className="p-4 pt-0 gap-2">
                    <Button variant="default" className="w-full gap-2" disabled={book.availability !== 'Available'}>
                      <BookOpen className="w-4 h-4" /> Borrow
                    </Button>
                    <Button variant="outline" size="icon" title="View details">
                      <Info className="w-4 h-4" />
                    </Button>
                  </CardFooter>
                </Card>
              ))
            ) : (
              <div className="col-span-full py-20 text-center space-y-4">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-muted">
                  <Search className="w-8 h-8 text-muted-foreground" />
                </div>
                <h3 className="text-xl font-semibold">No books found</h3>
                <p className="text-muted-foreground max-w-sm mx-auto">
                  We couldn't find any books matching your search. Try adjusting your filters or checking the spelling.
                </p>
                <Button variant="outline" onClick={() => { setSearchQuery(""); setSelectedSubject(null); }}>
                  Clear all filters
                </Button>
              </div>
            )}
          </div>
        </main>
      </SidebarInset>
    </SidebarProvider>
  )
}
