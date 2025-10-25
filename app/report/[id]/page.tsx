"use client"

import type React from "react"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ArrowLeft, CheckCircle2, Clock, AlertCircle, MessageSquare } from "lucide-react"
import { ReportTimeline } from "@/components/report-timeline"
import { ReportUpdates } from "@/components/report-updates"

// Mock data - replace with actual API call
const MOCK_REPORTS: Record<string, any> = {
  "1": {
    id: "1",
    location: "Room 201, Floor 3",
    building: "Science Building",
    severity: "high",
    status: "resolved",
    description:
      "WiFi network completely down in the entire floor. Students unable to access online resources and submit assignments.",
    affectedAreas: ["WiFi Network"],
    submittedAt: new Date(Date.now() - 2 * 60 * 60 * 1000),
    resolvedAt: new Date(Date.now() - 30 * 60 * 1000),
    contactEmail: "student@campus.edu",
    contactPhone: "(555) 123-4567",
    updates: [
      {
        timestamp: new Date(Date.now() - 30 * 60 * 1000),
        status: "resolved",
        message: "Issue has been resolved. WiFi network is now fully operational on Floor 3.",
      },
      {
        timestamp: new Date(Date.now() - 1 * 60 * 60 * 1000),
        status: "in-progress",
        message: "Our IT team is investigating the WiFi issue. We've identified a router malfunction.",
      },
      {
        timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000),
        status: "pending",
        message: "Report received and assigned to IT support team.",
      },
    ],
  },
  "2": {
    id: "2",
    location: "Main Floor",
    building: "Library",
    severity: "medium",
    status: "in-progress",
    description: "Ethernet connections are intermittently dropping, affecting study areas.",
    affectedAreas: ["Ethernet Connection"],
    submittedAt: new Date(Date.now() - 4 * 60 * 60 * 1000),
    resolvedAt: null,
    contactEmail: "user@campus.edu",
    contactPhone: "(555) 234-5678",
    updates: [
      {
        timestamp: new Date(Date.now() - 1 * 60 * 60 * 1000),
        status: "in-progress",
        message: "Technician on-site. Replacing faulty network cables in the main floor.",
      },
      {
        timestamp: new Date(Date.now() - 3 * 60 * 60 * 1000),
        status: "in-progress",
        message: "Issue confirmed. Multiple ethernet ports showing intermittent connectivity.",
      },
      {
        timestamp: new Date(Date.now() - 4 * 60 * 60 * 1000),
        status: "pending",
        message: "Report received and queued for investigation.",
      },
    ],
  },
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

export default function ReportDetailPage({ params }: { params: { id: string } }) {
  const report = MOCK_REPORTS[params.id]
  const [showContactForm, setShowContactForm] = useState(false)

  useEffect(() => {
    if (report && typeof window !== "undefined" && (window as any).showNotification) {
      const statusMessage = {
        pending: "Your report is pending review",
        "in-progress": "Your issue is being investigated",
        resolved: "Your issue has been resolved",
      }
      ;(window as any).showNotification({
        type: report.status === "resolved" ? "success" : "info",
        title: `Report Status: ${statusConfig[report.status].label}`,
        message: statusMessage[report.status as keyof typeof statusMessage],
        duration: 6000,
      })
    }
  }, [report])

  if (!report) {
    return (
      <div className="min-h-screen bg-background">
        <header className="border-b border-border bg-card">
          <div className="mx-auto max-w-4xl px-4 py-4 sm:px-6 lg:px-8">
            <Link
              href="/history"
              className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to Reports
            </Link>
          </div>
        </header>
        <main className="mx-auto max-w-4xl px-4 py-12 sm:px-6 lg:px-8">
          <Card className="p-8 text-center">
            <p className="text-muted-foreground">Report not found.</p>
            <Link href="/history">
              <Button className="mt-4">Back to Reports</Button>
            </Link>
          </Card>
        </main>
      </div>
    )
  }

  const StatusIcon = statusConfig[report.status].icon

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (typeof window !== "undefined" && (window as any).showNotification) {
      ;(window as any).showNotification({
        type: "success",
        title: "Message Sent",
        message: "Your message has been sent to IT support. We'll get back to you soon.",
        duration: 5000,
      })
    }
    setShowContactForm(false)
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card sticky top-0 z-10">
        <div className="mx-auto max-w-4xl px-4 py-4 sm:px-6 lg:px-8">
          <Link
            href="/history"
            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Reports
          </Link>
        </div>
      </header>

      {/* Main Content */}
      <main className="mx-auto max-w-4xl px-4 py-8 sm:py-12 sm:px-6 lg:px-8">
        {/* Report Header */}
        <div className="mb-6 sm:mb-8">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold text-foreground">{report.building}</h1>
              <p className="mt-2 text-sm sm:text-base text-muted-foreground">{report.location}</p>
            </div>
            <div className="flex flex-wrap gap-2">
              <Badge className={severityConfig[report.severity]}>
                {report.severity.charAt(0).toUpperCase() + report.severity.slice(1)} Severity
              </Badge>
              <Badge className={statusConfig[report.status].color}>
                <StatusIcon className="mr-1 h-3 w-3" />
                {statusConfig[report.status].label}
              </Badge>
            </div>
          </div>
        </div>

        {/* Main Info Cards */}
        <div className="mb-6 sm:mb-8 grid gap-3 sm:gap-4 sm:grid-cols-2">
          <Card className="p-4 sm:p-6">
            <h3 className="text-xs sm:text-sm font-medium text-muted-foreground">Submitted</h3>
            <p className="mt-2 text-base sm:text-lg font-semibold text-foreground">
              {report.submittedAt.toLocaleString()}
            </p>
          </Card>
          {report.resolvedAt && (
            <Card className="p-4 sm:p-6">
              <h3 className="text-xs sm:text-sm font-medium text-muted-foreground">Resolved</h3>
              <p className="mt-2 text-base sm:text-lg font-semibold text-foreground">
                {report.resolvedAt.toLocaleString()}
              </p>
            </Card>
          )}
        </div>

        {/* Description */}
        <Card className="mb-6 sm:mb-8 p-4 sm:p-6">
          <h2 className="text-base sm:text-lg font-semibold text-foreground">Issue Description</h2>
          <p className="mt-4 text-sm sm:text-base text-foreground">{report.description}</p>

          <div className="mt-6">
            <h3 className="text-xs sm:text-sm font-medium text-muted-foreground">Affected Services</h3>
            <div className="mt-3 flex flex-wrap gap-2">
              {report.affectedAreas.map((area: string) => (
                <Badge key={area} variant="outline">
                  {area}
                </Badge>
              ))}
            </div>
          </div>
        </Card>

        {/* Contact Information */}
        <Card className="mb-6 sm:mb-8 p-4 sm:p-6">
          <h2 className="text-base sm:text-lg font-semibold text-foreground">Contact Information</h2>
          <div className="mt-4 space-y-3">
            <div>
              <p className="text-xs sm:text-sm text-muted-foreground">Email</p>
              <a href={`mailto:${report.contactEmail}`} className="text-sm sm:text-base text-primary hover:underline">
                {report.contactEmail}
              </a>
            </div>
            {report.contactPhone && (
              <div>
                <p className="text-xs sm:text-sm text-muted-foreground">Phone</p>
                <a href={`tel:${report.contactPhone}`} className="text-sm sm:text-base text-primary hover:underline">
                  {report.contactPhone}
                </a>
              </div>
            )}
          </div>
        </Card>

        {/* Timeline */}
        <Card className="mb-6 sm:mb-8 p-4 sm:p-6">
          <h2 className="text-base sm:text-lg font-semibold text-foreground mb-6">Status Timeline</h2>
          <ReportTimeline updates={report.updates} />
        </Card>

        {/* Updates Section */}
        <Card className="mb-6 sm:mb-8 p-4 sm:p-6">
          <div className="flex items-center justify-between mb-6 flex-wrap gap-2">
            <h2 className="text-base sm:text-lg font-semibold text-foreground flex items-center gap-2">
              <MessageSquare className="h-5 w-5" />
              Updates
            </h2>
            <span className="text-xs sm:text-sm text-muted-foreground">{report.updates.length} updates</span>
          </div>
          <ReportUpdates updates={report.updates} />
        </Card>

        {/* Action Buttons */}
        <div className="flex flex-col gap-3 sm:flex-row">
          <Button
            onClick={() => setShowContactForm(!showContactForm)}
            variant="outline"
            className="flex-1 text-sm sm:text-base"
          >
            Contact IT Support
          </Button>
          <Link href="/report" className="flex-1">
            <Button className="w-full text-sm sm:text-base">Report Another Issue</Button>
          </Link>
        </div>

        {/* Contact Form */}
        {showContactForm && (
          <Card className="mt-6 sm:mt-8 p-4 sm:p-6">
            <h3 className="text-base sm:text-lg font-semibold text-foreground mb-4">Contact IT Support</h3>
            <form onSubmit={handleContactSubmit} className="space-y-4">
              <div>
                <label htmlFor="message" className="block text-xs sm:text-sm font-medium text-foreground">
                  Message
                </label>
                <textarea
                  id="message"
                  placeholder="Describe your question or concern..."
                  rows={4}
                  className="mt-2 w-full rounded-lg border border-input bg-background px-3 sm:px-4 py-2 sm:py-3 text-sm text-foreground placeholder-muted-foreground focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
                />
              </div>
              <div className="flex gap-3">
                <Button type="submit" className="flex-1 text-sm sm:text-base">
                  Send Message
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setShowContactForm(false)}
                  className="flex-1 text-sm sm:text-base"
                >
                  Cancel
                </Button>
              </div>
            </form>
          </Card>
        )}
      </main>
    </div>
  )
}
