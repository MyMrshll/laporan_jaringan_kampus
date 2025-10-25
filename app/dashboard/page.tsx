"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { LogOut, AlertCircle, FileText, HelpCircle } from "lucide-react"

export default function DashboardPage() {
  const router = useRouter()
  const [user, setUser] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const currentUser = localStorage.getItem("currentUser")
    if (!currentUser) {
      router.push("/login")
      return
    }
    setUser(JSON.parse(currentUser))
    setLoading(false)
  }, [router])

  const handleLogout = () => {
    localStorage.removeItem("currentUser")
    router.push("/")
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <p className="text-muted-foreground">Loading...</p>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <nav className="border-b border-border bg-card">
        <div className="mx-auto max-w-6xl px-4 py-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="h-8 w-8 rounded-lg bg-primary"></div>
              <span className="text-xl font-bold text-foreground">Campus Internet</span>
            </div>
            <div className="flex items-center gap-4">
              <span className="text-sm text-muted-foreground">Welcome, {user?.email}</span>
              <Button variant="outline" size="sm" onClick={handleLogout} className="gap-2 bg-transparent">
                <LogOut className="h-4 w-4" />
                Logout
              </Button>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground">Dashboard</h1>
          <p className="text-muted-foreground mt-2">Manage your internet outage reports</p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {/* Report New Issue Card */}
          <Card className="p-6 hover:shadow-lg transition-shadow">
            <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 mb-4">
              <AlertCircle className="h-6 w-6 text-primary" />
            </div>
            <h3 className="text-lg font-semibold text-foreground">Report New Issue</h3>
            <p className="text-sm text-muted-foreground mt-2">Report a new internet outage or connectivity problem</p>
            <Link href="/report">
              <Button className="w-full mt-4">Report Issue</Button>
            </Link>
          </Card>

          {/* View Reports Card */}
          <Card className="p-6 hover:shadow-lg transition-shadow">
            <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-accent/10 mb-4">
              <FileText className="h-6 w-6 text-accent" />
            </div>
            <h3 className="text-lg font-semibold text-foreground">View My Reports</h3>
            <p className="text-sm text-muted-foreground mt-2">Check the status of your submitted reports</p>
            <Link href="/history">
              <Button variant="outline" className="w-full mt-4 bg-transparent">
                View Reports
              </Button>
            </Link>
          </Card>

          {/* FAQ Card */}
          <Card className="p-6 hover:shadow-lg transition-shadow">
            <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-secondary/50 mb-4">
              <HelpCircle className="h-6 w-6 text-primary" />
            </div>
            <h3 className="text-lg font-semibold text-foreground">FAQ</h3>
            <p className="text-sm text-muted-foreground mt-2">
              Find answers to common questions about the reporting system
            </p>
            <Link href="/faq">
              <Button variant="outline" className="w-full mt-4 bg-transparent">
                View FAQ
              </Button>
            </Link>
          </Card>
        </div>

        {/* Quick Stats */}
        <div className="mt-12 grid gap-6 sm:grid-cols-3">
          <Card className="p-6">
            <p className="text-sm text-muted-foreground">Total Reports</p>
            <p className="text-3xl font-bold text-foreground mt-2">0</p>
          </Card>
          <Card className="p-6">
            <p className="text-sm text-muted-foreground">Pending Issues</p>
            <p className="text-3xl font-bold text-foreground mt-2">0</p>
          </Card>
          <Card className="p-6">
            <p className="text-sm text-muted-foreground">Resolved Issues</p>
            <p className="text-3xl font-bold text-foreground mt-2">0</p>
          </Card>
        </div>
      </main>
    </div>
  )
}
