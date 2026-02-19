
"use client"

import { useState } from "react"
import { SidebarProvider, SidebarInset, SidebarTrigger } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/nav/Sidebar"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Sparkles, Loader2, Search, Book, User, Calendar, Tag } from "lucide-react"
import { aiSearchAssistant, type AiSearchAssistantOutput } from "@/ai/flows/ai-search-assistant"

export default function AiAssistant() {
  const [query, setQuery] = useState("")
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState<AiSearchAssistantOutput | null>(null)

  const handleSearch = async () => {
    if (!query.trim()) return
    setLoading(true)
    try {
      const output = await aiSearchAssistant({ query })
      setResult(output)
    } catch (error) {
      console.error("AI Search Error:", error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center gap-2 border-b px-6">
          <SidebarTrigger />
          <h1 className="text-xl font-headline font-bold text-primary">AI Search Assistant</h1>
        </header>

        <main className="flex-1 overflow-auto p-6 max-w-4xl mx-auto w-full space-y-8">
          <section className="space-y-4">
            <div className="space-y-2 text-center">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-semibold">
                <Sparkles className="w-4 h-4" />
                Powered by Gemini 2.0 Flash
              </div>
              <h2 className="text-3xl font-headline font-bold">Find your next read</h2>
              <p className="text-muted-foreground">
                Describe the topic, plot, or characteristics of the book you're looking for.
              </p>
            </div>

            <Card className="border-2 border-primary/20 shadow-lg">
              <CardContent className="p-6 space-y-4">
                <Textarea 
                  placeholder="e.g., I'm looking for a book about the history of computer operating systems, specifically focusing on UNIX and modern kernels."
                  className="min-h-[120px] text-lg resize-none focus-visible:ring-primary"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                />
                <div className="flex justify-end">
                  <Button 
                    size="lg" 
                    className="gap-2 px-8" 
                    onClick={handleSearch}
                    disabled={loading || !query.trim()}
                  >
                    {loading ? (
                      <>
                        <Loader2 className="w-5 h-5 animate-spin" />
                        Analyzing...
                      </>
                    ) : (
                      <>
                        <Sparkles className="w-5 h-5" />
                        Search Assistant
                      </>
                    )}
                  </Button>
                </div>
              </CardContent>
            </Card>
          </section>

          {result && (
            <section className="animate-in fade-in slide-in-from-bottom-4 duration-500 space-y-6">
              <h3 className="text-xl font-bold flex items-center gap-2">
                <Search className="w-5 h-5 text-primary" />
                Generated Search Criteria
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm flex items-center gap-2 text-muted-foreground">
                      <Book className="w-4 h-4" /> Title Keywords
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="flex flex-wrap gap-2">
                    {result.titleKeywords && result.titleKeywords.length > 0 ? (
                      result.titleKeywords.map((kw, i) => (
                        <Badge key={i} variant="secondary">{kw}</Badge>
                      ))
                    ) : <span className="text-sm italic text-muted-foreground">No keywords extracted</span>}
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm flex items-center gap-2 text-muted-foreground">
                      <User className="w-4 h-4" /> Author Keywords
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="flex flex-wrap gap-2">
                    {result.authorKeywords && result.authorKeywords.length > 0 ? (
                      result.authorKeywords.map((kw, i) => (
                        <Badge key={i} variant="secondary">{kw}</Badge>
                      ))
                    ) : <span className="text-sm italic text-muted-foreground">Any author</span>}
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm flex items-center gap-2 text-muted-foreground">
                      <Tag className="w-4 h-4" /> Subject & Topics
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="flex flex-wrap gap-2">
                    {result.subjectKeywords && result.subjectKeywords.length > 0 ? (
                      result.subjectKeywords.map((kw, i) => (
                        <Badge key={i} variant="accent">{kw}</Badge>
                      ))
                    ) : <span className="text-sm italic text-muted-foreground">No topics extracted</span>}
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm flex items-center gap-2 text-muted-foreground">
                      <Calendar className="w-4 h-4" /> Other Details
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Genre:</span>
                      <span className="font-medium">{result.genre || "N/A"}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Year:</span>
                      <span className="font-medium">{result.yearPublished || "Any"}</span>
                    </div>
                  </CardContent>
                </Card>
              </div>

              <div className="flex justify-center pt-4">
                <Button size="lg" variant="default" className="gap-2">
                  View Matching Catalog Items
                </Button>
              </div>
            </section>
          )}

          {!result && !loading && (
            <div className="text-center py-12 opacity-40">
              <Book className="w-16 h-16 mx-auto mb-4 text-muted-foreground" />
              <p>Your search results will appear here</p>
            </div>
          )}
        </main>
      </SidebarInset>
    </SidebarProvider>
  )
}
