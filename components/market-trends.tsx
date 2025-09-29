"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { TrendingUp, TrendingDown, Minus } from "lucide-react"

interface MarketTrend {
  fishType: string
  currentPrice: number
  previousPrice: number
  trend: "up" | "down" | "stable"
  change: number
}

const marketData: MarketTrend[] = [
  {
    fishType: "Tilapia",
    currentPrice: 4500,
    previousPrice: 4200,
    trend: "up",
    change: 7.1,
  },
  {
    fishType: "Catfish",
    currentPrice: 3800,
    previousPrice: 4000,
    trend: "down",
    change: -5.0,
  },
  {
    fishType: "Sardine",
    currentPrice: 2200,
    previousPrice: 2200,
    trend: "stable",
    change: 0,
  },
  {
    fishType: "Tuna",
    currentPrice: 8500,
    previousPrice: 7800,
    trend: "up",
    change: 9.0,
  },
]

export function MarketTrends() {
  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case "up":
        return <TrendingUp className="w-4 h-4 text-green-600" />
      case "down":
        return <TrendingDown className="w-4 h-4 text-red-600" />
      default:
        return <Minus className="w-4 h-4 text-gray-600" />
    }
  }

  const getTrendColor = (trend: string) => {
    switch (trend) {
      case "up":
        return "text-green-600"
      case "down":
        return "text-red-600"
      default:
        return "text-gray-600"
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Market Trends</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {marketData.map((item) => (
            <div key={item.fishType} className="flex items-center justify-between">
              <div>
                <p className="font-medium">{item.fishType}</p>
                <p className="text-sm text-muted-foreground">TSh {item.currentPrice.toLocaleString()}/kg</p>
              </div>
              <div className="flex items-center space-x-2">
                {getTrendIcon(item.trend)}
                <span className={`text-sm font-medium ${getTrendColor(item.trend)}`}>
                  {item.change > 0 ? "+" : ""}
                  {item.change}%
                </span>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
