import { MessageCircle } from "lucide-react"

interface Update {
  timestamp: Date
  status: "pending" | "in-progress" | "resolved"
  message: string
}

interface ReportUpdatesProps {
  updates: Update[]
}

export function ReportUpdates({ updates }: ReportUpdatesProps) {
  return (
    <div className="space-y-4">
      {updates.map((update, index) => (
        <div key={index} className="flex gap-3 rounded-lg bg-secondary p-4">
          <MessageCircle className="h-5 w-5 flex-shrink-0 text-primary mt-0.5" />
          <div className="flex-1 min-w-0">
            <div className="flex items-center justify-between gap-2 mb-1">
              <p className="text-sm font-medium text-foreground capitalize">{update.status.replace("-", " ")}</p>
              <span className="text-xs text-muted-foreground whitespace-nowrap">
                {update.timestamp.toLocaleString()}
              </span>
            </div>
            <p className="text-sm text-foreground">{update.message}</p>
          </div>
        </div>
      ))}
    </div>
  )
}
