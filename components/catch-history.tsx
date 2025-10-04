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

const mockCatches: CatchRecord[] = [
  {
    id: "1",
    fishType: "Tilapia",
    quantity: 25,
    location: "Mwanza",
    price: 4500,
    currency: "TSh",
    date: "2024-01-15",
    confidence: 92,
  },
  {
    id: "2",
    fishType: "Catfish",
    quantity: 18,
    location: "Dar es Salaam",
    price: 3800,
    currency: "TSh",
    date: "2024-01-12",
    confidence: 88,
  },
  {
    id: "3",
    fishType: "Sardine",
    quantity: 45,
    location: "Tanga",
    price: 2200,
    currency: "TSh",
    date: "2024-01-10",
    confidence: 95,
  },
]

export function CatchHistory() {
  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold">Recent Catches</h2>
      {mockCatches.map((catch_record) => (
        <Card key={catch_record.id}>
          <CardContent className="pt-4">
            <div className="flex items-start justify-between">
              <div className="flex items-start space-x-3">
                <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                  <Fish className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold">{catch_record.fishType}</h3>
                  <div className="flex items-center space-x-4 text-sm text-muted-foreground mt-1">
                    <span className="flex items-center">
                      <MapPin className="w-3 h-3 mr-1" />
                      {catch_record.location}
                    </span>
                    <span className="flex items-center">
                      <Calendar className="w-3 h-3 mr-1" />
                      {new Date(catch_record.date).toLocaleDateString()}
                    </span>
                  </div>
                  <p className="text-sm mt-1">
                    {catch_record.quantity}kg at {catch_record.price} {catch_record.currency}/kg
                  </p>
                </div>
              </div>
              <Badge variant="secondary">{catch_record.confidence}% confidence</Badge>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
