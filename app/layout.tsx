import type React from "react"
import type { Metadata } from "next"
import { GeistSans } from "geist/font/sans"
import { GeistMono } from "geist/font/mono"
import { Analytics } from "@vercel/analytics/next"
import { Suspense } from "react"
import { FloatingHelpButton } from "@/components/floating-help-button"
import "./globals.css"

export const metadata: Metadata = {
  title: "SamakiCash - Fisher Platform",
  description: "AI-powered platform for Tanzanian fishers with market insights and financial services",
  generator: "SamakiCash",
  manifest: "/manifest.json",
  themeColor: "#2ab8a3",
  viewport: "width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no",
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "SamakiCash",
  },
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
        <Analytics />
      </body>
    </html>
  )
}
