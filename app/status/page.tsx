import { Card } from "@/components/ui/card"
import { AlertCircle, CheckCircle2, Clock, MapPin } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function StatusPage() {
  // Mock data - dalam aplikasi real, ini akan dari database
  const activeIssues = [
    {
      id: 1,
      location: "Building A",
      issue: "Slow Connection",
      severity: "high",
      reportedAt: "2 hours ago",
      estimatedResolution: "30 minutes",
      affectedUsers: 45,
      status: "investigating",
    },
    {
      id: 2,
      location: "Lab 3 - Engineering",
      issue: "No Internet",
      severity: "critical",
      reportedAt: "1 hour ago",
      estimatedResolution: "15 minutes",
      affectedUsers: 28,
      status: "in-progress",
    },
    {
      id: 3,
      location: "Dormitory B",
      issue: "Intermittent Connection",
      severity: "medium",
      reportedAt: "45 minutes ago",
      estimatedResolution: "1 hour",
      affectedUsers: 12,
      status: "investigating",
    },
  ]

  const resolvedIssues = [
    {
      id: 4,
      location: "Library",
      issue: "WiFi Down",
      resolvedAt: "30 minutes ago",
    },
    {
      id: 5,
      location: "Cafeteria",
      issue: "Slow Speed",
      resolvedAt: "1 hour ago",
    },
  ]

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case "critical":
        return "bg-red-100 text-red-800 border-red-300"
      case "high":
        return "bg-orange-100 text-orange-800 border-orange-300"
      case "medium":
        return "bg-yellow-100 text-yellow-800 border-yellow-300"
      default:
        return "bg-blue-100 text-blue-800 border-blue-300"
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "investigating":
        return <Clock className="h-5 w-5" />
      case "in-progress":
        return <AlertCircle className="h-5 w-5" />
      default:
        return <CheckCircle2 className="h-5 w-5" />
    }
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <nav className="border-b border-border bg-card sticky top-0 z-10">
        <div className="mx-auto max-w-6xl px-4 py-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between gap-4">
            <Link href="/" className="flex items-center gap-2 flex-shrink-0">
              <div className="h-8 w-8 rounded-lg bg-primary"></div>
              <span className="text-lg sm:text-xl font-bold text-foreground hidden sm:inline">Campus Internet</span>
            </Link>
            <div className="flex items-center gap-2 sm:gap-4 text-xs sm:text-sm">
              <Link href="/history" className="text-muted-foreground hover:text-foreground">
                All Reports
              </Link>
              <Link href="/faq" className="text-muted-foreground hover:text-foreground">
                FAQ
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="mx-auto max-w-6xl px-4 py-6 sm:py-8 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-6 sm:mb-8">
          <h1 className="text-2xl sm:text-3xl font-bold text-foreground">Network Status</h1>
          <p className="mt-2 text-sm text-muted-foreground">Real-time view of internet issues across campus</p>
        </div>

        {/* Active Issues */}
        <div className="mb-8 sm:mb-12">
          <h2 className="mb-4 text-lg sm:text-xl font-semibold text-foreground">Active Issues</h2>
          <div className="grid gap-3 sm:gap-4">
            {activeIssues.map((issue) => (
              <Card key={issue.id} className="p-4 sm:p-6 border-l-4 border-l-primary">
                <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-2 flex-wrap">
                      <div className="flex items-center gap-2">
                        {getStatusIcon(issue.status)}
                        <span
                          className={`inline-block px-2 sm:px-3 py-1 rounded-full text-xs font-semibold border ${getSeverityColor(issue.severity)}`}
                        >
                          {issue.severity.toUpperCase()}
                        </span>
                      </div>
                    </div>
                    <h3 className="text-base sm:text-lg font-semibold text-foreground">{issue.issue}</h3>
                    <div className="mt-3 space-y-1 sm:space-y-2 text-xs sm:text-sm text-muted-foreground">
                      <div className="flex items-center gap-2">
                        <MapPin className="h-4 w-4 flex-shrink-0" />
                        <span className="truncate">{issue.location}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Clock className="h-4 w-4 flex-shrink-0" />
                        Reported {issue.reportedAt}
                      </div>
                      <div className="text-xs">Affecting {issue.affectedUsers} users</div>
                    </div>
                  </div>
                  <div className="text-right flex-shrink-0">
                    <div className="text-xs sm:text-sm font-medium text-foreground mb-2">Est. Resolution</div>
                    <div className="text-lg sm:text-xl font-bold text-primary mb-3">{issue.estimatedResolution}</div>
                    <div>
                      <Link href={`/report/${issue.id}`}>
                        <Button size="sm" variant="outline" className="text-xs sm:text-sm bg-transparent">
                          View Details
                        </Button>
                      </Link>
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>

        {/* Resolved Issues */}
        <div>
          <h2 className="mb-4 text-lg sm:text-xl font-semibold text-foreground">Recently Resolved</h2>
          <div className="grid gap-3 sm:gap-4">
            {resolvedIssues.map((issue) => (
              <Card key={issue.id} className="p-4 sm:p-6 opacity-75">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 sm:gap-4">
                  <div className="flex items-center gap-3 min-w-0">
                    <CheckCircle2 className="h-5 w-5 text-green-600 flex-shrink-0" />
                    <div className="min-w-0">
                      <h3 className="font-medium text-foreground text-sm sm:text-base">{issue.issue}</h3>
                      <p className="text-xs sm:text-sm text-muted-foreground truncate">{issue.location}</p>
                    </div>
                  </div>
                  <p className="text-xs sm:text-sm text-muted-foreground flex-shrink-0">Resolved {issue.resolvedAt}</p>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </main>
    </div>
  )
}
