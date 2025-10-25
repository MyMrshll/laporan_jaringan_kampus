import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { AlertCircle, CheckCircle2, Clock, MessageSquare, Zap, TrendingUp } from "lucide-react"

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <nav className="border-b border-border bg-card">
        <div className="mx-auto max-w-6xl px-4 py-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="h-8 w-8 rounded-lg bg-primary"></div>
              <span className="text-xl font-bold text-foreground">CIRS</span>
            </div>
            <div className="flex items-center gap-4">
              <Link href="/status" className="text-sm text-muted-foreground hover:text-foreground">
                Status
              </Link>
              <Link href="/login" className="text-sm text-muted-foreground hover:text-foreground">
                Login
              </Link>
              <Link href="/register">
                <Button size="sm">Register</Button>
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="border-b border-border bg-gradient-to-b from-secondary to-background py-20 sm:py-32">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-balance text-4xl font-bold tracking-tight text-foreground sm:text-5xl lg:text-6xl">
              Report Outages Instantly
            </h1>
            <p className="mt-6 text-balance text-lg text-muted-foreground sm:text-xl">
              Help us keep your campus connected. Report network issues and track resolution status in real-time.
            </p>
            <p className="mt-2 text-sm text-muted-foreground">
              💡 Tip: Use the floating button in the bottom-right corner for quick reporting
            </p>
            <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:justify-center">
              <Link href="/report">
                <Button size="lg" className="w-full sm:w-auto">
                  Report an Outage
                </Button>
              </Link>
              <Link href="/status">
                <Button size="lg" variant="outline" className="w-full sm:w-auto bg-transparent">
                  View Network Status
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section - Applied Similarity principle: consistent card styling and icon treatment */}
      <section className="py-20 sm:py-32">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-foreground sm:text-4xl">How It Works</h2>
            <p className="mt-4 text-muted-foreground">Simple steps to report and track internet issues</p>
          </div>

          <div className="mt-16 space-y-12">
            {/* Reporting Phase */}
            <div>
              <h3 className="mb-6 text-center text-lg font-semibold text-foreground">Reporting Phase</h3>
              <div className="grid gap-8 sm:grid-cols-2">
                {[
                  {
                    icon: AlertCircle,
                    title: "Report Issue",
                    description: "Quickly report internet outages with location and details",
                  },
                  {
                    icon: Zap,
                    title: "Quick Submit",
                    description: "Use floating button for instant reporting from anywhere",
                  },
                ].map((feature, idx) => {
                  const Icon = feature.icon
                  return (
                    <Card key={idx} className="p-6 transition-all hover:shadow-md">
                      <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                        <Icon className="h-6 w-6 text-primary" />
                      </div>
                      <h4 className="mt-4 font-semibold text-foreground">{feature.title}</h4>
                      <p className="mt-2 text-sm text-muted-foreground">{feature.description}</p>
                    </Card>
                  )
                })}
              </div>
            </div>

            {/* Tracking Phase */}
            <div>
              <h3 className="mb-6 text-center text-lg font-semibold text-foreground">Tracking Phase</h3>
              <div className="grid gap-8 sm:grid-cols-2">
                {[
                  {
                    icon: Clock,
                    title: "Real-time Updates",
                    description: "Get instant notifications about issue status changes",
                  },
                  {
                    icon: MessageSquare,
                    title: "IT Support",
                    description: "Receive updates from IT team on resolution progress",
                  },
                ].map((feature, idx) => {
                  const Icon = feature.icon
                  return (
                    <Card key={idx} className="p-6 transition-all hover:shadow-md">
                      <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                        <Icon className="h-6 w-6 text-primary" />
                      </div>
                      <h4 className="mt-4 font-semibold text-foreground">{feature.title}</h4>
                      <p className="mt-2 text-sm text-muted-foreground">{feature.description}</p>
                    </Card>
                  )
                })}
              </div>
            </div>

            {/* Resolution Phase */}
            <div>
              <h3 className="mb-6 text-center text-lg font-semibold text-foreground">Resolution Phase</h3>
              <div className="grid gap-8 sm:grid-cols-2">
                {[
                  {
                    icon: CheckCircle2,
                    title: "Track Resolution",
                    description: "Monitor when your issue has been resolved",
                  },
                  {
                    icon: TrendingUp,
                    title: "System Health",
                    description: "View overall campus network status and history",
                  },
                ].map((feature, idx) => {
                  const Icon = feature.icon
                  return (
                    <Card key={idx} className="p-6 transition-all hover:shadow-md">
                      <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                        <Icon className="h-6 w-6 text-primary" />
                      </div>
                      <h4 className="mt-4 font-semibold text-foreground">{feature.title}</h4>
                      <p className="mt-2 text-sm text-muted-foreground">{feature.description}</p>
                    </Card>
                  )
                })}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="border-t border-border bg-primary py-16 sm:py-24">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-primary-foreground sm:text-4xl">Ready to Report an Issue?</h2>
            <p className="mt-4 text-primary-foreground/90">
              Help us maintain reliable internet connectivity across campus
            </p>
            <div className="mt-8">
              <Link href="/report">
                <Button size="lg" variant="secondary">
                  Start Reporting Now
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border bg-card py-12">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-8 sm:grid-cols-3">
            <div>
              <h3 className="font-semibold text-foreground">CIRS</h3>
              <p className="mt-2 text-sm text-muted-foreground">Campus Internet Reporting System</p>
            </div>
            <div>
              <h4 className="font-semibold text-foreground">Quick Links</h4>
              <ul className="mt-2 space-y-2 text-sm">
                <li>
                  <Link href="/report" className="text-muted-foreground hover:text-foreground">
                    Report Issue
                  </Link>
                </li>
                <li>
                  <Link href="/history" className="text-muted-foreground hover:text-foreground">
                    View Reports
                  </Link>
                </li>
                <li>
                  <Link href="/faq" className="text-muted-foreground hover:text-foreground">
                    FAQ
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-foreground">Support</h4>
              <ul className="mt-2 space-y-2 text-sm">
                <li>
                  <a href="mailto:support@campus.edu" className="text-muted-foreground hover:text-foreground">
                    Email Support
                  </a>
                </li>
                <li>
                  <a href="tel:+1234567890" className="text-muted-foreground hover:text-foreground">
                    Call IT Help
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div className="mt-8 border-t border-border pt-8 text-center text-sm text-muted-foreground">
            <p>&copy; 2025 CIRS. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
