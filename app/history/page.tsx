"use client"

import { useState, useMemo } from "react"
import Link from "next/link"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ArrowLeft, Search, Filter } from "lucide-react"
import { ReportsList } from "@/components/reports-list"
import { ReportFilters } from "@/components/report-filters"

// Mock data - replace with actual API call
const MOCK_REPORTS = [
  {
    id: "1",
    location: "Room 201, Floor 3",
    building: "Science Building",
    severity: "high",
    status: "resolved",
    description: "WiFi network completely down in the entire floor",
    affectedAreas: ["WiFi Network"],
    submittedAt: new Date(Date.now() - 2 * 60 * 60 * 1000),
    resolvedAt: new Date(Date.now() - 30 * 60 * 1000),
    contactEmail: "student@campus.edu",
  },
  {
    id: "2",
    location: "Main Floor",
    building: "Library",
    severity: "medium",
    status: "in-progress",
    description: "Ethernet connections are intermittently dropping",
    affectedAreas: ["Ethernet Connection"],
    submittedAt: new Date(Date.now() - 4 * 60 * 60 * 1000),
    resolvedAt: null,
    contactEmail: "user@campus.edu",
  },
  {
    id: "3",
    location: "Room 105",
    building: "Engineering Hall",
    severity: "low",
    status: "pending",
    description: "VPN access is slow and timing out frequently",
    affectedAreas: ["VPN Access"],
    submittedAt: new Date(Date.now() - 1 * 60 * 60 * 1000),
    resolvedAt: null,
    contactEmail: "engineer@campus.edu",
  },
  {
    id: "4",
    location: "Computer Lab",
    building: "Student Center",
    severity: "high",
    status: "resolved",
    description: "Email service completely unavailable for all users",
    affectedAreas: ["Email Service"],
    submittedAt: new Date(Date.now() - 24 * 60 * 60 * 1000),
    resolvedAt: new Date(Date.now() - 20 * 60 * 60 * 1000),
    contactEmail: "admin@campus.edu",
  },
  {
    id: "5",
    location: "Auditorium",
    building: "Administration Building",
    severity: "medium",
    status: "in-progress",
    description: "Video conferencing platform experiencing lag and disconnections",
    affectedAreas: ["Video Conferencing"],
    submittedAt: new Date(Date.now() - 6 * 60 * 60 * 1000),
    resolvedAt: null,
    contactEmail: "faculty@campus.edu",
  },
]

export default function HistoryPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [filters, setFilters] = useState({
    severity: "all",
    status: "all",
    building: "all",
  })
  const [sortBy, setSortBy] = useState("recent")

  const filteredReports = useMemo(() => {
    let results = MOCK_REPORTS

    // Search filter
    if (searchTerm) {
      results = results.filter(
        (report) =>
          report.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
          report.building.toLowerCase().includes(searchTerm.toLowerCase()) ||
          report.description.toLowerCase().includes(searchTerm.toLowerCase()),
      )
    }

    // Severity filter
    if (filters.severity !== "all") {
      results = results.filter((report) => report.severity === filters.severity)
    }

    // Status filter
    if (filters.status !== "all") {
      results = results.filter((report) => report.status === filters.status)
    }

    // Building filter
    if (filters.building !== "all") {
      results = results.filter((report) => report.building === filters.building)
    }

    // Sorting
    if (sortBy === "recent") {
      results.sort((a, b) => b.submittedAt.getTime() - a.submittedAt.getTime())
    } else if (sortBy === "oldest") {
      results.sort((a, b) => a.submittedAt.getTime() - b.submittedAt.getTime())
    } else if (sortBy === "severity") {
      const severityOrder = { high: 0, medium: 1, low: 2 }
      results.sort(
        (a, b) =>
          severityOrder[a.severity as keyof typeof severityOrder] -
          severityOrder[b.severity as keyof typeof severityOrder],
      )
    }

    return results
  }, [searchTerm, filters, sortBy])

  const uniqueBuildings = Array.from(new Set(MOCK_REPORTS.map((r) => r.building)))

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card">
        <div className="mx-auto max-w-6xl px-4 py-4 sm:px-6 lg:px-8">
          <Link href="/" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground">
            <ArrowLeft className="h-4 w-4" />
            Back to Home
          </Link>
        </div>
      </header>

      {/* Main Content */}
      <main className="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground sm:text-4xl">Report History</h1>
          <p className="mt-2 text-muted-foreground">
            View all submitted internet outage reports and their current status.
          </p>
        </div>

        {/* Search and Filters */}
        <div className="mb-8 space-y-4">
          {/* Search Bar */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search by location, building, or description..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full rounded-lg border border-input bg-background pl-10 pr-4 py-2 text-foreground placeholder-muted-foreground focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
            />
          </div>

          {/* Filters and Sort */}
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <ReportFilters filters={filters} setFilters={setFilters} buildings={uniqueBuildings} />

            <div className="flex items-center gap-2">
              <Filter className="h-4 w-4 text-muted-foreground" />
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="rounded-lg border border-input bg-background px-3 py-2 text-sm text-foreground focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
              >
                <option value="recent">Most Recent</option>
                <option value="oldest">Oldest First</option>
                <option value="severity">By Severity</option>
              </select>
            </div>
          </div>
        </div>

        {/* Results Summary */}
        <div className="mb-6 text-sm text-muted-foreground">
          Showing {filteredReports.length} of {MOCK_REPORTS.length} reports
        </div>

        {/* Reports List */}
        {filteredReports.length > 0 ? (
          <ReportsList reports={filteredReports} />
        ) : (
          <Card className="p-12 text-center">
            <p className="text-muted-foreground">No reports found matching your filters.</p>
            <Button
              variant="outline"
              onClick={() => {
                setSearchTerm("")
                setFilters({ severity: "all", status: "all", building: "all" })
              }}
              className="mt-4"
            >
              Clear Filters
            </Button>
          </Card>
        )}

        {/* CTA Section */}
        <div className="mt-12 rounded-lg bg-secondary p-8 text-center">
          <h2 className="text-xl font-semibold text-foreground">Experiencing an Issue?</h2>
          <p className="mt-2 text-muted-foreground">Report a new internet outage to help us resolve it faster.</p>
          <Link href="/report">
            <Button className="mt-4">Report New Issue</Button>
          </Link>
        </div>
      </main>
    </div>
  )
}
