"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { X, AlertCircle, Zap, Wifi } from "lucide-react"

export function QuickReportModal() {
  const [isOpen, setIsOpen] = useState(false)
  const [selectedIssue, setSelectedIssue] = useState<string | null>(null)
  const [location, setLocation] = useState("")
  const [submitted, setSubmitted] = useState(false)

  const commonIssues = [
    { id: "slow", label: "Slow Connection", icon: Zap },
    { id: "down", label: "No Internet", icon: Wifi },
    { id: "intermittent", label: "Intermittent Connection", icon: AlertCircle },
  ]

  const handleSubmit = () => {
    if (selectedIssue && location) {
      console.log("[v0] Quick report submitted:", { issue: selectedIssue, location })
      setSubmitted(true)
      setTimeout(() => {
        setIsOpen(false)
        setSelectedIssue(null)
        setLocation("")
        setSubmitted(false)
      }, 2000)
    }
  }

  return (
    <>
      {/* Floating Action Button - Mobile optimized */}
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 z-40 flex h-14 w-14 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-lg hover:bg-primary/90 transition-colors sm:h-16 sm:w-16"
        aria-label="Quick report"
      >
        <AlertCircle className="h-6 w-6 sm:h-7 sm:w-7" />
      </button>

      {/* Modal Backdrop */}
      {isOpen && <div className="fixed inset-0 z-50 bg-black/50" onClick={() => setIsOpen(false)} />}

      {/* Modal - Mobile optimized */}
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4">
          <Card className="w-full sm:max-w-md rounded-b-none sm:rounded-lg max-h-[90vh] overflow-y-auto">
            <div className="p-4 sm:p-6">
              {/* Header */}
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg sm:text-xl font-bold text-foreground">Quick Report</h2>
                <button onClick={() => setIsOpen(false)} className="text-muted-foreground hover:text-foreground">
                  <X className="h-5 w-5" />
                </button>
              </div>

              {!submitted ? (
                <>
                  {/* Issue Selection */}
                  <div className="mb-6">
                    <label className="block text-sm font-medium text-foreground mb-3">What's the issue?</label>
                    <div className="grid gap-2">
                      {commonIssues.map((issue) => {
                        const Icon = issue.icon
                        return (
                          <button
                            key={issue.id}
                            onClick={() => setSelectedIssue(issue.id)}
                            className={`flex items-center gap-3 p-3 sm:p-4 rounded-lg border-2 transition-colors touch-target ${
                              selectedIssue === issue.id
                                ? "border-primary bg-primary/10"
                                : "border-border hover:border-primary/50"
                            }`}
                          >
                            <Icon className="h-5 w-5 text-primary flex-shrink-0" />
                            <span className="text-sm sm:text-base font-medium text-foreground text-left">
                              {issue.label}
                            </span>
                          </button>
                        )
                      })}
                    </div>
                  </div>

                  {/* Location Input */}
                  <div className="mb-6">
                    <label className="block text-sm font-medium text-foreground mb-2">Location</label>
                    <input
                      type="text"
                      placeholder="e.g., Building A, Room 101"
                      value={location}
                      onChange={(e) => setLocation(e.target.value)}
                      className="w-full px-3 py-3 sm:py-2 rounded-lg border border-border bg-input text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary text-base sm:text-sm"
                    />
                  </div>

                  {/* Submit Button */}
                  <Button
                    onClick={handleSubmit}
                    disabled={!selectedIssue || !location}
                    className="w-full py-3 sm:py-2 text-base sm:text-sm"
                  >
                    Submit Report
                  </Button>
                </>
              ) : (
                <div className="text-center py-8">
                  <div className="flex justify-center mb-4">
                    <div className="h-12 w-12 rounded-full bg-green-100 flex items-center justify-center">
                      <svg className="h-6 w-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                  </div>
                  <h3 className="font-semibold text-foreground mb-2">Report Submitted!</h3>
                  <p className="text-sm text-muted-foreground">
                    Thank you for reporting. Our IT team will investigate shortly.
                  </p>
                </div>
              )}
            </div>
          </Card>
        </div>
      )}
    </>
  )
}
