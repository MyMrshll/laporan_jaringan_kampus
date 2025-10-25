"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { AlertCircle } from "lucide-react"
import { DuplicateDetection } from "./duplicate-detection"

interface ReportFormProps {
  onSubmit: (data: ReportData) => void
}

interface ReportData {
  location: string
  building: string
  severity: "low" | "medium" | "high"
  description: string
  affectedAreas: string[]
  contactEmail: string
  contactPhone?: string
}

const BUILDINGS = [
  "Science Building",
  "Engineering Hall",
  "Library",
  "Student Center",
  "Dormitory A",
  "Dormitory B",
  "Administration Building",
  "Athletic Center",
  "Other",
]

const AFFECTED_AREAS = [
  "WiFi Network",
  "Ethernet Connection",
  "VPN Access",
  "Email Service",
  "Learning Management System",
  "Video Conferencing",
  "Other",
]

export function ReportForm({ onSubmit }: ReportFormProps) {
  const [formData, setFormData] = useState<ReportData>({
    location: "",
    building: "",
    severity: "medium",
    description: "",
    affectedAreas: [],
    contactEmail: "",
    contactPhone: "",
  })

  const [errors, setErrors] = useState<Record<string, string>>({})
  const [isSubmitting, setIsSubmitting] = useState(false)

  const validateForm = () => {
    const newErrors: Record<string, string> = {}

    if (!formData.location.trim()) {
      newErrors.location = "Location is required"
    }
    if (!formData.building) {
      newErrors.building = "Building is required"
    }
    if (!formData.description.trim()) {
      newErrors.description = "Description is required"
    }
    if (formData.description.trim().length < 10) {
      newErrors.description = "Description must be at least 10 characters"
    }
    if (formData.affectedAreas.length === 0) {
      newErrors.affectedAreas = "Select at least one affected area"
    }
    if (!formData.contactEmail.trim()) {
      newErrors.contactEmail = "Email is required"
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.contactEmail)) {
      newErrors.contactEmail = "Invalid email address"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!validateForm()) {
      return
    }

    setIsSubmitting(true)
    try {
      await new Promise((resolve) => setTimeout(resolve, 500))
      onSubmit(formData)
      setFormData({
        location: "",
        building: "",
        severity: "medium",
        description: "",
        affectedAreas: [],
        contactEmail: "",
        contactPhone: "",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  const toggleAffectedArea = (area: string) => {
    setFormData((prev) => ({
      ...prev,
      affectedAreas: prev.affectedAreas.includes(area)
        ? prev.affectedAreas.filter((a) => a !== area)
        : [...prev.affectedAreas, area],
    }))
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      <div className="space-y-6 rounded-lg border border-border bg-card p-6">
        <div>
          <h3 className="text-lg font-semibold text-foreground">Issue Details</h3>
          <p className="mt-1 text-sm text-muted-foreground">Tell us about the network problem you're experiencing</p>
        </div>

        {/* Location */}
        <div>
          <label htmlFor="location" className="block text-sm font-medium text-foreground">
            Specific Location <span className="text-destructive">*</span>
          </label>
          <input
            type="text"
            id="location"
            placeholder="e.g., Room 201, Floor 3"
            value={formData.location}
            onChange={(e) => setFormData((prev) => ({ ...prev, location: e.target.value }))}
            className="mt-2 w-full rounded-lg border border-input bg-background px-4 py-2 text-foreground placeholder-muted-foreground focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
          />
          {errors.location && <p className="mt-1 text-sm text-destructive">{errors.location}</p>}
        </div>

        {/* Building */}
        <div>
          <label htmlFor="building" className="block text-sm font-medium text-foreground">
            Building <span className="text-destructive">*</span>
          </label>
          <select
            id="building"
            value={formData.building}
            onChange={(e) => setFormData((prev) => ({ ...prev, building: e.target.value }))}
            className="mt-2 w-full rounded-lg border border-input bg-background px-4 py-2 text-foreground focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
          >
            <option value="">Select a building</option>
            {BUILDINGS.map((building) => (
              <option key={building} value={building}>
                {building}
              </option>
            ))}
          </select>
          {errors.building && <p className="mt-1 text-sm text-destructive">{errors.building}</p>}
        </div>

        {/* Severity */}
        <div>
          <label className="block text-sm font-medium text-foreground">
            Severity Level <span className="text-destructive">*</span>
          </label>
          <div className="mt-3 space-y-2">
            {(["low", "medium", "high"] as const).map((level) => (
              <label key={level} className="flex items-center gap-3">
                <input
                  type="radio"
                  name="severity"
                  value={level}
                  checked={formData.severity === level}
                  onChange={(e) => setFormData((prev) => ({ ...prev, severity: e.target.value as any }))}
                  className="h-4 w-4 border-input text-primary focus:ring-primary"
                />
                <span className="text-sm text-foreground capitalize">
                  {level}
                  {level === "low" && " - Minor connectivity issues"}
                  {level === "medium" && " - Affecting multiple users"}
                  {level === "high" && " - Campus-wide outage"}
                </span>
              </label>
            ))}
          </div>
        </div>

        {/* Affected Areas */}
        <div>
          <label className="block text-sm font-medium text-foreground">
            Affected Services <span className="text-destructive">*</span>
          </label>
          <div className="mt-3 space-y-2">
            {AFFECTED_AREAS.map((area) => (
              <label key={area} className="flex items-center gap-3">
                <input
                  type="checkbox"
                  checked={formData.affectedAreas.includes(area)}
                  onChange={() => toggleAffectedArea(area)}
                  className="h-4 w-4 rounded border-input text-primary focus:ring-primary"
                />
                <span className="text-sm text-foreground">{area}</span>
              </label>
            ))}
          </div>
          {errors.affectedAreas && <p className="mt-1 text-sm text-destructive">{errors.affectedAreas}</p>}
        </div>

        {/* Description */}
        <div>
          <label htmlFor="description" className="block text-sm font-medium text-foreground">
            Description <span className="text-destructive">*</span>
          </label>
          <textarea
            id="description"
            placeholder="Describe the issue in detail. What were you trying to do? When did it start?"
            value={formData.description}
            onChange={(e) => setFormData((prev) => ({ ...prev, description: e.target.value }))}
            rows={5}
            className="mt-2 w-full rounded-lg border border-input bg-background px-4 py-2 text-foreground placeholder-muted-foreground focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
          />
          {errors.description && <p className="mt-1 text-sm text-destructive">{errors.description}</p>}
        </div>
      </div>

      {/* Duplicate Detection */}
      {formData.building && formData.affectedAreas.length > 0 && (
        <DuplicateDetection building={formData.building} affectedAreas={formData.affectedAreas} />
      )}

      <div className="space-y-4 rounded-lg border border-border bg-card p-6">
        <div>
          <h3 className="text-lg font-semibold text-foreground">Contact Information</h3>
          <p className="mt-1 text-sm text-muted-foreground">How can we reach you with updates?</p>
        </div>

        <div>
          <label htmlFor="contactEmail" className="block text-sm font-medium text-foreground">
            Email <span className="text-destructive">*</span>
          </label>
          <input
            type="email"
            id="contactEmail"
            placeholder="your.email@campus.edu"
            value={formData.contactEmail}
            onChange={(e) => setFormData((prev) => ({ ...prev, contactEmail: e.target.value }))}
            className="mt-2 w-full rounded-lg border border-input bg-background px-4 py-2 text-foreground placeholder-muted-foreground focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
          />
          {errors.contactEmail && <p className="mt-1 text-sm text-destructive">{errors.contactEmail}</p>}
        </div>

        <div>
          <label htmlFor="contactPhone" className="block text-sm font-medium text-foreground">
            Phone (Optional)
          </label>
          <input
            type="tel"
            id="contactPhone"
            placeholder="(555) 123-4567"
            value={formData.contactPhone}
            onChange={(e) => setFormData((prev) => ({ ...prev, contactPhone: e.target.value }))}
            className="mt-2 w-full rounded-lg border border-input bg-background px-4 py-2 text-foreground placeholder-muted-foreground focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
          />
        </div>
      </div>

      {/* Info Box */}
      <div className="flex gap-3 rounded-lg bg-secondary p-4">
        <AlertCircle className="h-5 w-5 flex-shrink-0 text-primary" />
        <p className="text-sm text-muted-foreground">
          Your report will be reviewed by our IT team. You'll receive updates via email about the status of your report.
        </p>
      </div>

      <div className="flex gap-3 pt-4">
        <Button type="submit" disabled={isSubmitting} className="flex-1">
          {isSubmitting ? "Submitting..." : "Submit Report"}
        </Button>
        <Button type="button" variant="outline" onClick={() => window.history.back()} className="flex-1">
          Cancel
        </Button>
      </div>
    </form>
  )
}
