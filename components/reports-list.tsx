import Link from "next/link"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ChevronRight, Clock, CheckCircle2, AlertCircle } from "lucide-react"

interface Report {
  id: string
  location: string
  building: string
  severity: "low" | "medium" | "high"
  status: "pending" | "in-progress" | "resolved"
  description: string
  affectedAreas: string[]
  submittedAt: Date
  resolvedAt?: Date | null
  contactEmail: string
}

interface ReportsListProps {
  reports: Report[]
}

const statusConfig = {
  pending: {
    label: "Pending",
    icon: AlertCircle,
    color: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-100",
  },
  "in-progress": {
    label: "In Progress",
    icon: Clock,
    color: "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-100",
  },
  resolved: {
    label: "Resolved",
    icon: CheckCircle2,
    color: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100",
  },
}

const severityConfig = {
  low: "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-100",
  medium: "bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-100",
  high: "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-100",
}

export function ReportsList({ reports }: ReportsListProps) {
  const formatDate = (date: Date) => {
    const now = new Date()
    const diffMs = now.getTime() - date.getTime()
    const diffMins = Math.floor(diffMs / 60000)
    const diffHours = Math.floor(diffMs / 3600000)
    const diffDays = Math.floor(diffMs / 86400000)

    if (diffMins < 60) return `${diffMins}m ago`
    if (diffHours < 24) return `${diffHours}h ago`
    if (diffDays < 7) return `${diffDays}d ago`
    return date.toLocaleDateString()
  }

  return (
    <div className="space-y-4">
      {reports.map((report) => {
        const StatusIcon = statusConfig[report.status].icon
        return (
          <Link key={report.id} href={`/report/${report.id}`}>
            <Card className="p-4 transition-all hover:border-primary hover:shadow-md sm:p-6">
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1 min-w-0">
                  <div className="flex flex-wrap items-center gap-2 mb-2">
                    <h3 className="font-semibold text-foreground truncate">{report.building}</h3>
                    <Badge variant="outline" className={severityConfig[report.severity]}>
                      {report.severity.charAt(0).toUpperCase() + report.severity.slice(1)}
                    </Badge>
                    <Badge className={statusConfig[report.status].color}>
                      <StatusIcon className="mr-1 h-3 w-3" />
                      {statusConfig[report.status].label}
                    </Badge>
                  </div>
                  <p className="text-sm text-muted-foreground mb-2">{report.location}</p>
                  <p className="text-sm text-foreground line-clamp-2">{report.description}</p>
                  <div className="mt-3 flex flex-wrap gap-1">
                    {report.affectedAreas.map((area) => (
                      <span
                        key={area}
                        className="inline-block rounded bg-secondary px-2 py-1 text-xs text-muted-foreground"
                      >
                        {area}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="flex flex-col items-end gap-2">
                  <span className="text-xs text-muted-foreground whitespace-nowrap">
                    {formatDate(report.submittedAt)}
                  </span>
                  <ChevronRight className="h-5 w-5 text-muted-foreground" />
                </div>
              </div>
            </Card>
          </Link>
        )
      })}
    </div>
  )
}
