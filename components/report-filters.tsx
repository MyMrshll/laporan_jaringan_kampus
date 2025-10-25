"use client"

interface ReportFiltersProps {
  filters: {
    severity: string
    status: string
    building: string
  }
  setFilters: (filters: any) => void
  buildings: string[]
}

export function ReportFilters({ filters, setFilters, buildings }: ReportFiltersProps) {
  return (
    <div className="flex flex-wrap gap-2">
      <select
        value={filters.severity}
        onChange={(e) => setFilters({ ...filters, severity: e.target.value })}
        className="rounded-lg border border-input bg-background px-3 py-2 text-sm text-foreground focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
      >
        <option value="all">All Severities</option>
        <option value="low">Low</option>
        <option value="medium">Medium</option>
        <option value="high">High</option>
      </select>

      <select
        value={filters.status}
        onChange={(e) => setFilters({ ...filters, status: e.target.value })}
        className="rounded-lg border border-input bg-background px-3 py-2 text-sm text-foreground focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
      >
        <option value="all">All Statuses</option>
        <option value="pending">Pending</option>
        <option value="in-progress">In Progress</option>
        <option value="resolved">Resolved</option>
      </select>

      <select
        value={filters.building}
        onChange={(e) => setFilters({ ...filters, building: e.target.value })}
        className="rounded-lg border border-input bg-background px-3 py-2 text-sm text-foreground focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
      >
        <option value="all">All Buildings</option>
        {buildings.map((building) => (
          <option key={building} value={building}>
            {building}
          </option>
        ))}
      </select>
    </div>
  )
}
