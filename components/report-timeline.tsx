import { CheckCircle2, Clock, AlertCircle } from "lucide-react"

interface Update {
  timestamp: Date
  status: "pending" | "in-progress" | "resolved"
  message: string
}

interface ReportTimelineProps {
  updates: Update[]
}

const statusConfig = {
  pending: {
    icon: AlertCircle,
    color: "text-yellow-600 dark:text-yellow-400",
    bgColor: "bg-yellow-100 dark:bg-yellow-900",
  },
  "in-progress": {
    icon: Clock,
    color: "text-blue-600 dark:text-blue-400",
    bgColor: "bg-blue-100 dark:bg-blue-900",
  },
  resolved: {
    icon: CheckCircle2,
    color: "text-green-600 dark:text-green-400",
    bgColor: "bg-green-100 dark:bg-green-900",
  },
}

export function ReportTimeline({ updates }: ReportTimelineProps) {
  return (
    <div className="space-y-6">
      {updates.map((update, index) => {
        const config = statusConfig[update.status]
        const Icon = config.icon
        const isLast = index === updates.length - 1

        return (
          <div key={index} className="flex gap-4">
            {/* Timeline dot and line */}
            <div className="flex flex-col items-center">
              <div className={`rounded-full p-2 ${config.bgColor}`}>
                <Icon className={`h-5 w-5 ${config.color}`} />
              </div>
              {!isLast && <div className="mt-2 h-12 w-0.5 bg-border" />}
            </div>

            {/* Content */}
            <div className="flex-1 pt-1">
              <p className="text-sm font-medium text-foreground capitalize">{update.status.replace("-", " ")}</p>
              <p className="mt-1 text-sm text-muted-foreground">{update.timestamp.toLocaleString()}</p>
              <p className="mt-2 text-foreground">{update.message}</p>
            </div>
          </div>
        )
      })}
    </div>
  )
}
