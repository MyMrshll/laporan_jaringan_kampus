import type React from "react"
import type { Metadata, Viewport } from "next"
import { Geist, Geist_Mono } from "next/font/google"
import "./globals.css"
import { QuickReportModal } from "@/components/quick-report-modal"
import { NotificationContainer } from "@/components/notification-container"

const _geist = Geist({ subsets: ["latin"] })
const _geistMono = Geist_Mono({ subsets: ["latin"] })
const _geistSans = _geist

export const metadata: Metadata = {
  title: "CIRS - Campus Internet Reporting",
  description: "Report and track internet outages on campus",
  generator: "v0.app",
}

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={`${_geistSans.className} antialiased`}>
        {children}
        <QuickReportModal />
        <NotificationContainer />
      </body>
    </html>
  )
}
