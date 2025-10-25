"use client"

import Link from "next/link"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ArrowLeft, HelpCircle, MessageSquare } from "lucide-react"
import { FAQAccordion } from "@/components/faq-accordion"

const FAQ_ITEMS = [
  {
    category: "Getting Started",
    questions: [
      {
        id: "q1",
        question: "How do I report an internet outage?",
        answer:
          "Click the 'Report an Outage' button on the homepage or navigate to the Report page. Fill out the form with your location, building, severity level, and a detailed description of the issue. Include which services are affected and your contact information. Submit the form and you'll receive a confirmation email.",
      },
      {
        id: "q2",
        question: "What information do I need to provide?",
        answer:
          "You'll need to provide: your specific location (room number/floor), building name, severity level (low/medium/high), affected services, a detailed description of the problem, and your contact email. A phone number is optional but helpful for urgent issues.",
      },
      {
        id: "q3",
        question: "Can I report an issue anonymously?",
        answer:
          "No, we require contact information so our IT team can follow up with you about the issue and provide updates. However, your information is kept confidential and only used for support purposes.",
      },
    ],
  },
  {
    category: "Tracking & Status",
    questions: [
      {
        id: "q4",
        question: "How do I check the status of my report?",
        answer:
          "Visit the 'View Reports' page to see all submitted reports. You can search by location, building, or use filters to find your specific report. Click on any report to view detailed status updates and timeline.",
      },
      {
        id: "q5",
        question: "How often are reports updated?",
        answer:
          "Reports are updated as our IT team investigates and resolves issues. Critical issues (high severity) are prioritized and typically receive updates within 30 minutes. You'll receive email notifications when your report status changes.",
      },
      {
        id: "q6",
        question: "What do the different status levels mean?",
        answer:
          "Pending: Report received and queued for investigation. In Progress: IT team is actively working on the issue. Resolved: Issue has been fixed and services are restored.",
      },
    ],
  },
  {
    category: "Severity Levels",
    questions: [
      {
        id: "q7",
        question: "How do I determine the severity level?",
        answer:
          "Low: Minor issues affecting one user or small area. Medium: Issues affecting multiple users or departments. High: Campus-wide outages or critical service failures affecting many users.",
      },
      {
        id: "q8",
        question: "Does severity affect response time?",
        answer:
          "Yes, high severity issues are prioritized and receive faster response times. Critical outages may be addressed within 15-30 minutes, while low severity issues may take several hours.",
      },
    ],
  },
  {
    category: "Services & Connectivity",
    questions: [
      {
        id: "q9",
        question: "What services can I report issues for?",
        answer:
          "You can report issues for: WiFi Network, Ethernet Connection, VPN Access, Email Service, Learning Management System, Video Conferencing, and other network-related services.",
      },
      {
        id: "q10",
        question: "What should I do if I can't connect to the internet at all?",
        answer:
          "If you have no internet connectivity, try: 1) Restart your device, 2) Move closer to a WiFi router, 3) Try a different network if available, 4) Contact IT support directly at support@campus.edu or call the IT Help Desk. You can also use a mobile device to submit a report.",
      },
      {
        id: "q11",
        question: "Is the VPN required for off-campus access?",
        answer:
          "Yes, the VPN is required to securely access campus resources from off-campus. If you're experiencing VPN issues, report them through this system and our IT team will prioritize your case.",
      },
    ],
  },
  {
    category: "Technical Issues",
    questions: [
      {
        id: "q12",
        question: "What if my report doesn't submit?",
        answer:
          "Ensure all required fields are filled out correctly. Check your internet connection and try again. If the problem persists, contact IT support directly at support@campus.edu with details about the error you're seeing.",
      },
      {
        id: "q13",
        question: "Can I edit my report after submitting?",
        answer:
          "Currently, you cannot edit submitted reports. If you need to add information or correct details, contact IT support directly with your report ID and the additional information.",
      },
      {
        id: "q14",
        question: "How long are reports kept in the system?",
        answer:
          "Reports are kept for 90 days. After that, they are archived. If you need information about older issues, contact IT support.",
      },
    ],
  },
  {
    category: "Support & Contact",
    questions: [
      {
        id: "q15",
        question: "How do I contact IT support?",
        answer:
          "You can reach IT support through: Email: support@campus.edu, Phone: (555) 123-4567, In-person: IT Help Desk in the Administration Building, Room 101. Hours: Monday-Friday, 8 AM - 6 PM.",
      },
      {
        id: "q16",
        question: "What if my issue is urgent?",
        answer:
          "For urgent issues, mark the severity as 'High' in your report and call the IT Help Desk directly at (555) 123-4567. They can prioritize your case and provide immediate assistance.",
      },
      {
        id: "q17",
        question: "Can I get a status update via phone?",
        answer:
          "Yes, you can call the IT Help Desk with your report ID to get a status update. Email updates are sent automatically when your report status changes.",
      },
    ],
  },
]

export default function FAQPage() {
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
      <main className="mx-auto max-w-4xl px-4 py-12 sm:px-6 lg:px-8">
        {/* Page Header */}
        <div className="mb-12 text-center">
          <div className="flex justify-center mb-4">
            <div className="rounded-lg bg-primary/10 p-3">
              <HelpCircle className="h-8 w-8 text-primary" />
            </div>
          </div>
          <h1 className="text-4xl font-bold text-foreground">Frequently Asked Questions</h1>
          <p className="mt-4 text-lg text-muted-foreground">
            Find answers to common questions about reporting internet outages and tracking their status.
          </p>
        </div>

        {/* FAQ Sections */}
        <div className="space-y-8">
          {FAQ_ITEMS.map((section, idx) => (
            <div key={idx}>
              <h2 className="mb-4 text-2xl font-bold text-foreground">{section.category}</h2>
              <FAQAccordion items={section.questions} />
            </div>
          ))}
        </div>

        {/* Still Need Help Section */}
        <Card className="mt-12 bg-secondary p-8">
          <div className="text-center">
            <MessageSquare className="mx-auto h-8 w-8 text-primary mb-4" />
            <h2 className="text-2xl font-bold text-foreground">Still Need Help?</h2>
            <p className="mt-3 text-muted-foreground">
              Can't find the answer you're looking for? Contact our IT support team directly.
            </p>
            <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:justify-center">
              <a href="mailto:support@campus.edu">
                <Button variant="outline" className="w-full sm:w-auto bg-transparent">
                  Email Support
                </Button>
              </a>
              <a href="tel:+15551234567">
                <Button className="w-full sm:w-auto">Call IT Help Desk</Button>
              </a>
            </div>
          </div>
        </Card>

        {/* Quick Links */}
        <div className="mt-12 grid gap-4 sm:grid-cols-2">
          <Link href="/report">
            <Card className="p-6 transition-all hover:border-primary hover:shadow-md cursor-pointer">
              <h3 className="font-semibold text-foreground">Report an Issue</h3>
              <p className="mt-2 text-sm text-muted-foreground">Submit a new internet outage report</p>
            </Card>
          </Link>
          <Link href="/history">
            <Card className="p-6 transition-all hover:border-primary hover:shadow-md cursor-pointer">
              <h3 className="font-semibold text-foreground">View Reports</h3>
              <p className="mt-2 text-sm text-muted-foreground">Check status of all submitted reports</p>
            </Card>
          </Link>
        </div>
      </main>
    </div>
  )
}
