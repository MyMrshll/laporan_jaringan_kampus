import { AlertCircle, Users } from "lucide-react"
import { Card } from "@/components/ui/card"

interface SimilarReport {
  id: number
  location: string
  building: string
  issue: string
  reportedAt: string
  affectedUsers: number
  status: string
}

interface DuplicateDetectionProps {
  building: string
  affectedAreas: string[]
}

export function DuplicateDetection({ building, affectedAreas }: DuplicateDetectionProps) {
  // Mock data - dalam aplikasi real, ini akan dari database
  const allReports: SimilarReport[] = [
    {
      id: 1,
      location: "Building A, Floor 2",
      building: "Science Building",
      issue: "WiFi Network",
      reportedAt: "2 hours ago",
      affectedUsers: 45,
      status: "investigating",
    },
    {
      id: 2,
      location: "Building A, Lab 3",
      building: "Science Building",
      issue: "Ethernet Connection",
      reportedAt: "1 hour ago",
      affectedUsers: 12,
      status: "in-progress",
    },
    {
      id: 3,
      location: "Engineering Hall, Room 101",
      building: "Engineering Hall",
      issue: "WiFi Network",
      reportedAt: "30 minutes ago",
      affectedUsers: 28,
      status: "investigating",
    },
    {
      id: 4,
      location: "Library, 3rd Floor",
      building: "Library",
      issue: "VPN Access",
      reportedAt: "45 minutes ago",
      affectedUsers: 8,
      status: "investigating",
    },
  ]

  // Filter similar reports based on building and affected areas
  const similarReports = allReports.filter((report) => {
    const sameBuilding = report.building === building
    const sameService = affectedAreas.some((area) => report.issue.includes(area) || area.includes(report.issue))
    return sameBuilding && sameService && affectedAreas.length > 0
  })

  if (similarReports.length === 0) {
    return null
  }

  return (
    <Card className="border-l-4 border-l-orange-500 bg-orange-50 p-4">
      <div className="flex gap-3">
        <AlertCircle className="h-5 w-5 flex-shrink-0 text-orange-600 mt-0.5" />
        <div className="flex-1">
          <h3 className="font-semibold text-orange-900">Similar Reports Found</h3>
          <p className="mt-1 text-sm text-orange-800">
            {similarReports.length} similar {similarReports.length === 1 ? "report" : "reports"} already submitted for
            this location and service. Consider adding your voice to an existing report instead of creating a duplicate.
          </p>
          <div className="mt-3 space-y-2">
            {similarReports.map((report) => (
              <div key={report.id} className="rounded-lg bg-white p-3 text-sm">
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <p className="font-medium text-gray-900">{report.issue}</p>
                    <p className="text-xs text-gray-600">{report.location}</p>
                    <p className="text-xs text-gray-500 mt-1">Reported {report.reportedAt}</p>
                  </div>
                  <div className="flex items-center gap-1 text-xs text-gray-600 flex-shrink-0">
                    <Users className="h-3 w-3" />
                    {report.affectedUsers}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Card>
  )
}
