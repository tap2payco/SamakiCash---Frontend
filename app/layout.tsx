import type React from "react"
import type { Metadata } from "next"
import { GeistSans } from "geist/font/sans"
import { GeistMono } from "geist/font/mono"
import { Suspense } from "react"
import { FloatingHelpButton } from "@/components/floating-help-button"
import { GoogleAnalytics } from "@/components/google-analytics"
import "./globals.css"

export const metadata: Metadata = {
  title: "SamakiCash - Fisher Platform",
  description: "AI-powered platform for Tanzanian fishers with market insights and financial services",
  generator: "SamakiCash",
  manifest: "/manifest.json",
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "SamakiCash",
  },
}

export const viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  themeColor: "#2ab8a3",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body
        className={`font-sans ${GeistSans.variable} ${GeistMono.variable} bg-gradient-to-br from-blue-50 to-green-50`}
      >
        <Suspense fallback={null}>{children}</Suspense>
        <FloatingHelpButton />
        <GoogleAnalytics measurementId={process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID || ""} />
      </body>
    </html>
  )
}
