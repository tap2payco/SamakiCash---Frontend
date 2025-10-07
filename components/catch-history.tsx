"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Fish, MapPin, Calendar } from "lucide-react"

interface CatchRecord {
  id: string
  fishType: string
  quantity: number
  location: string
  price: number
  currency: string
  date: string
  confidence: number
}

// Mock data removed - will be replaced with API calls

export function CatchHistory() {
  // TODO: Replace with API call to fetch user's catch history
  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold">Recent Catches</h2>
      <Card>
        <CardContent className="pt-4">
          <div className="text-center py-8">
            <Fish className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2">No catches yet</h3>
            <p className="text-muted-foreground">
              Start analyzing your fish catches to see them here
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
