
"use client"

import { SidebarProvider, SidebarInset, SidebarTrigger } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/nav/Sidebar"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Bell, Mail, Send, Clock, CheckCircle, AlertCircle } from "lucide-react"
import { useState } from "react"
import { useToast } from "@/hooks/use-toast"

export default function Notifications() {
  const { toast } = useToast()
  const [reminders, setReminders] = useState([
    { id: 1, type: 'Overdue', user: 'Alice Smith', book: 'The Great Gatsby', days: 12, sent: false },
    { id: 2, type: 'Reminder', user: 'Bob Johnson', book: 'Modern Operating Systems', days: 2, sent: false },
    { id: 3, type: 'Overdue', user: 'Charlie Brown', book: 'Design Patterns', days: 5, sent: true },
  ])

  const handleSendAll = () => {
    setReminders(prev => prev.map(r => ({ ...r, sent: true })))
    toast({
      title: "Reminders Sent",
      description: "Email notifications have been dispatched to all recipients."
    })
  }

  const handleSendOne = (id: number) => {
    setReminders(prev => prev.map(r => r.id === id ? { ...r, sent: true } : r))
    toast({
      title: "Notification Dispatched",
      description: "Email reminder sent successfully."
    })
  }

  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center gap-2 border-b px-6">
          <SidebarTrigger />
          <h1 className="text-xl font-headline font-bold text-primary">Notifications & Reminders</h1>
        </header>

        <main className="flex-1 overflow-auto p-6 space-y-8">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div>
              <h2 className="text-2xl font-bold">Pending Reminders</h2>
              <p className="text-muted-foreground">Automated email alerts for overdue books and upcoming due dates.</p>
            </div>
            <Button onClick={handleSendAll} className="gap-2" disabled={reminders.every(r => r.sent)}>
              <Send className="w-4 h-4" /> Send All Reminders
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {reminders.map((reminder) => (
              <Card key={reminder.id} className={reminder.sent ? 'opacity-70 bg-secondary/20' : ''}>
                <CardHeader className="pb-2">
                  <div className="flex justify-between items-start">
                    <Badge variant={reminder.type === 'Overdue' ? 'destructive' : 'outline'}>
                      {reminder.type}
                    </Badge>
                    <span className="text-xs text-muted-foreground flex items-center gap-1">
                      <Clock className="w-3 h-3" /> {reminder.days} days
                    </span>
                  </div>
                  <CardTitle className="text-lg mt-2">{reminder.user}</CardTitle>
                  <CardDescription className="text-sm italic">{reminder.book}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Mail className="w-4 h-4" />
                    <span>{reminder.user.toLowerCase().replace(' ', '.')}@campus.edu</span>
                  </div>
                  <div className="flex items-center justify-between pt-2">
                    {reminder.sent ? (
                      <div className="flex items-center gap-2 text-green-600 font-semibold text-sm">
                        <CheckCircle className="w-4 h-4" /> Email Dispatched
                      </div>
                    ) : (
                      <div className="flex items-center gap-2 text-orange-500 font-semibold text-sm">
                        <AlertCircle className="w-4 h-4" /> Pending Action
                      </div>
                    )}
                    {!reminder.sent && (
                      <Button size="sm" variant="ghost" className="gap-2" onClick={() => handleSendOne(reminder.id)}>
                        <Send className="w-3 h-3" /> Send
                      </Button>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <Card className="bg-primary/5 border-primary/20">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Bell className="w-5 h-5" /> Automation Rules
              </CardTitle>
              <CardDescription>System-wide settings for library alerts.</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  { label: "Reminder 1", desc: "Send 3 days before due date", active: true },
                  { label: "Overdue Alert", desc: "Send immediately when a book is overdue", active: true },
                  { label: "Weekly Digest", desc: "Send a summary of books due this week", active: false },
                ].map((rule, idx) => (
                  <div key={idx} className="flex items-center justify-between p-4 bg-background border rounded-lg">
                    <div>
                      <h4 className="font-semibold text-sm">{rule.label}</h4>
                      <p className="text-xs text-muted-foreground">{rule.desc}</p>
                    </div>
                    <Badge variant={rule.active ? 'default' : 'secondary'}>
                      {rule.active ? 'Active' : 'Disabled'}
                    </Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </main>
      </SidebarInset>
    </SidebarProvider>
  )
}
