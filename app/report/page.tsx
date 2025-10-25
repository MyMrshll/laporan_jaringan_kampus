"use client"

import { useState } from "react"
import Link from "next/link"
import { Card } from "@/components/ui/card"
import { ArrowLeft, AlertCircle } from "lucide-react"
import { ReportForm } from "@/components/report-form"

export default function ReportPage() {
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (data: any) => {
    // TODO: Send data to backend
    console.log("Report submitted:", data)
    setSubmitted(true)
    setTimeout(() => {
      setSubmitted(false)
    }, 5000)
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card sticky top-0 z-10">
        <div className="mx-auto max-w-4xl px-4 py-4 sm:px-6 lg:px-8">
          <Link href="/" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground">
            <ArrowLeft className="h-4 w-4" />
            Back to Home
          </Link>
        </div>
      </header>

      {/* Main Content */}
      <main className="mx-auto max-w-4xl px-4 py-8 sm:py-12 sm:px-6 lg:px-8">
        <div className="mb-6 sm:mb-8">
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-foreground">Report an Outage</h1>
          <p className="mt-2 text-sm sm:text-base text-muted-foreground">
            Help us resolve connectivity issues faster by providing detailed information about the problem.
          </p>
        </div>

        {/* Success Message */}
        {submitted && (
          <Card className="mb-6 sm:mb-8 border-green-200 bg-green-50 p-4 dark:border-green-900 dark:bg-green-950">
            <div className="flex items-start gap-3">
              <AlertCircle className="h-5 w-5 text-green-600 dark:text-green-400 flex-shrink-0" />
              <div>
                <h3 className="font-semibold text-green-900 dark:text-green-100 text-sm sm:text-base">
                  Report Submitted Successfully
                </h3>
                <p className="mt-1 text-xs sm:text-sm text-green-800 dark:text-green-200">
                  Thank you for reporting this issue. Our IT team has been notified and will investigate shortly.
                </p>
              </div>
            </div>
          </Card>
        )}

        {/* Form Card */}
        <Card className="p-4 sm:p-6 lg:p-8 mb-8">
          <ReportForm onSubmit={handleSubmit} />
        </Card>

        {/* Help Section */}
        <div className="grid gap-4 sm:gap-6 sm:grid-cols-2">
          <Card className="p-4 sm:p-6">
            <h3 className="font-semibold text-foreground text-sm sm:text-base">Need Help?</h3>
            <p className="mt-2 text-xs sm:text-sm text-muted-foreground">
              If you're having trouble submitting a report, contact IT support directly.
            </p>
            <a
              href="mailto:support@campus.edu"
              className="mt-4 inline-block text-xs sm:text-sm font-medium text-primary hover:underline"
            >
              Email Support →
            </a>
          </Card>
          <Card className="p-4 sm:p-6">
            <h3 className="font-semibold text-foreground text-sm sm:text-base">Check Status</h3>
            <p className="mt-2 text-xs sm:text-sm text-muted-foreground">
              View all reported issues and their current resolution status.
            </p>
            <Link
              href="/history"
              className="mt-4 inline-block text-xs sm:text-sm font-medium text-primary hover:underline"
            >
              View Reports →
            </Link>
          </Card>
        </div>
      </main>
    </div>
  )
}
