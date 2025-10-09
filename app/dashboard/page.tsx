"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Badge } from "@/components/ui/badge"
import { BottomNav } from "@/components/bottom-nav"
import { PWAInstall } from "@/components/pwa-install"
import { Fish, Camera, Loader2, Volume2, TrendingUp, DollarSign } from "lucide-react"
import { AuthManager } from "@/lib/auth"
import { apiService, type FishCatchRequest, type AnalysisResponse, type UserStatsResponse } from "@/lib/api"

const fishTypes = ["tilapia", "catfish", "sardine", "tuna", "mackerel", "snapper", "grouper", "kingfish"]

const locations = ["Mwanza", "Dar es Salaam", "Mtwara", "Tanga", "Kilifi", "Zanzibar", "Pemba", "Lindi"]

export default function DashboardPage() {
  const [user, setUser] = useState(AuthManager.getUser())
  const [formData, setFormData] = useState<FishCatchRequest>({
    fish_type: "",
    quantity_kg: 0,
    location: "",
    user_id: user?.id || "",
    image_data: undefined,
  })
  const [result, setResult] = useState<AnalysisResponse | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const [imagePreview, setImagePreview] = useState<string>("")
  const [stats, setStats] = useState<UserStatsResponse | null>(null)
  const [statsLoading, setStatsLoading] = useState<boolean>(false)
  const router = useRouter()

  // Render helpers to avoid passing objects directly to React nodes
  const renderText = (value: unknown): string => {
    try {
      if (value == null) return ""
      if (typeof value === "string" || typeof value === "number" || typeof value === "boolean") {
        return String(value)
      }
      // For objects/arrays, stringify to a compact human-readable string
      return JSON.stringify(value)
    } catch {
      return ""
    }
  }

  // Normalize market_insights from various backend formats
  const normalizeMarketInsights = (raw: unknown): any | null => {
    try {
      if (!raw) return null

      // If backend returned OpenAI-style envelope
      if (
        typeof raw === "object" && raw !== null &&
        (raw as any).choices && Array.isArray((raw as any).choices)
      ) {
        const content = (raw as any).choices?.[0]?.message?.content
        if (typeof content === "string") {
          try {
            return JSON.parse(content)
          } catch {
            return { text: content }
          }
        }
      }

      // If backend returned a JSON string
      if (typeof raw === "string") {
        try {
          return JSON.parse(raw)
        } catch {
          return { text: raw }
        }
      }

      // If backend returned plain object already
      if (typeof raw === "object") return raw as any
      return { text: String(raw) }
    } catch {
      return null
    }
  }

  useEffect(() => {
    if (!AuthManager.isAuthenticated()) {
      router.push("/login")
    }
  }, [router])

  useEffect(() => {
    const fetchStats = async () => {
      if (!user?.id) return
      setStatsLoading(true)
      try {
        const data = await apiService.getUserStats(user.id)
        setStats(data)
      } catch (e) {
        // ignore; UI will show dashes
      } finally {
        setStatsLoading(false)
      }
    }
    fetchStats()
  }, [user?.id])

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (event) => {
        const base64 = event.target?.result as string
        setImagePreview(base64)
        setFormData((prev) => ({ ...prev, image_data: base64.split(",")[1] }))
      }
      reader.readAsDataURL(file)
    }
  }

  const handleAnalyze = async () => {
    if (!formData.fish_type || !formData.quantity_kg || !formData.location) {
      setError("Please fill in all required fields")
      return
    }

    setLoading(true)
    setError("")

    try {
      const response = await apiService.analyzeCatch(formData)
      setResult(response)
    } catch (err) {
      setError(err instanceof Error ? err.message : "Analysis failed. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  const playAudio = (filename: string) => {
    const audio = new Audio(apiService.getAudioUrl(filename))
    audio.play().catch(console.error)
  }

  if (!user) {
    return null // Will redirect to login
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-green-50 pb-20">
      <PWAInstall />

      {/* Header */}
      <div className="bg-card border-b border-border">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-foreground">Welcome back!</h1>
              <p className="text-muted-foreground">{user.email}</p>
            </div>
            <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center">
              <Fish className="w-6 h-6 text-primary-foreground" />
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-6 space-y-6">
        {/* Quick Stats - Will be populated with real data from API */}
        <div className="grid grid-cols-2 gap-4">
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center space-x-2">
                <TrendingUp className="w-5 h-5 text-primary" />
                <div>
                  <p className="text-2xl font-bold">{statsLoading ? "…" : stats?.total_catches ?? "-"}</p>
                  <p className="text-xs text-muted-foreground">Total Catches</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center space-x-2">
                <DollarSign className="w-5 h-5 text-secondary" />
                <div>
                  <p className="text-2xl font-bold">
                    {statsLoading
                      ? "…"
                      : stats?.average_price_per_kg
                      ? `TSh ${Math.round(stats.average_price_per_kg).toLocaleString()}`
                      : "-"}
                  </p>
                  <p className="text-xs text-muted-foreground">Average Price/kg</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Catch Analysis Form */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Fish className="w-5 h-5" />
              Analyze New Catch
            </CardTitle>
            <CardDescription>Upload details of your catch to get AI-powered market insights</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="fish-type">Fish Type</Label>
                <Select
                  value={formData.fish_type}
                  onValueChange={(value) => setFormData((prev) => ({ ...prev, fish_type: value }))}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select fish type" />
                  </SelectTrigger>
                  <SelectContent>
                    {fishTypes.map((fish) => (
                      <SelectItem key={fish} value={fish}>
                        {fish.charAt(0).toUpperCase() + fish.slice(1)}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="quantity">Quantity (kg)</Label>
                <Input
                  id="quantity"
                  type="number"
                  placeholder="Enter weight in kg"
                  value={formData.quantity_kg || ""}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      quantity_kg: Number.parseFloat(e.target.value) || 0,
                    }))
                  }
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="location">Location</Label>
              <Select
                value={formData.location}
                onValueChange={(value) => setFormData((prev) => ({ ...prev, location: value }))}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select fishing location" />
                </SelectTrigger>
                <SelectContent>
                  {locations.map((location) => (
                    <SelectItem key={location} value={location}>
                      {location}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="image">Fish Photo (Optional)</Label>
              <div className="flex items-center gap-4">
                <Input id="image" type="file" accept="image/*" onChange={handleImageUpload} className="flex-1" />
                <Camera className="w-5 h-5 text-muted-foreground" />
              </div>
              {imagePreview && (
                <div className="mt-2">
                  <img
                    src={imagePreview || "/placeholder.svg"}
                    alt="Fish preview"
                    className="w-32 h-32 object-cover rounded-lg border"
                  />
                </div>
              )}
            </div>

            {error && (
              <Alert variant="destructive">
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}

            <Button onClick={handleAnalyze} disabled={loading} className="w-full" size="lg">
              {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              {loading ? "Analyzing..." : "Analyze Catch"}
            </Button>
          </CardContent>
        </Card>

        {/* Analysis Results */}
        {result && (
          <Card className="border-primary/20 bg-primary/5">
            <CardHeader>
              <CardTitle className="text-primary">Analysis Results</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Price Analysis */}
              <div className="bg-card rounded-lg p-4 border">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-semibold">Recommended Price</h3>
                  <Badge variant="secondary">
                    {Math.round(result.price_analysis.confidence_score * 100)}% Confidence
                  </Badge>
                </div>
                <div className="text-3xl font-bold text-primary mb-2">
                  {result.price_analysis.fair_price} {result.price_analysis.currency}/kg
                </div>
                <p className="text-sm text-muted-foreground">{renderText(result.price_analysis.reasoning)}</p>
              </div>

              {/* Voice Message */}
              {result.voice_message_url && !result.voice_message_url.includes("error") && (
                <div className="bg-card rounded-lg p-4 border">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-semibold mb-1">Voice Insights</h3>
                      <p className="text-sm text-muted-foreground">Listen to detailed market analysis</p>
                    </div>
                    <Button variant="outline" size="sm" onClick={() => playAudio(result.voice_message_url)}>
                      <Volume2 className="w-4 h-4 mr-2" />
                      Play
                    </Button>
                  </div>
                </div>
              )}

              {/* Recommendation */}
              {result.recommendation && (
                <div className="bg-card rounded-lg p-4 border">
                  <h3 className="font-semibold mb-2">Market Recommendation</h3>
                  <p className="text-sm">{renderText(result.recommendation)}</p>
                </div>
              )}

              {/* Market Insights */}
              {result.market_insights && (
                <div className="bg-card rounded-lg p-4 border">
                  <h3 className="font-semibold mb-2">Market Insights</h3>
                  {(() => {
                    const insights = normalizeMarketInsights(result.market_insights)
                    if (!insights) return <p className="text-sm text-muted-foreground">No insights available</p>

                    // Structured rendering when common keys are present
                    const trend = insights.market_trend
                    const competitor = insights.competitor_analysis
                    const recommendation = insights.recommendation

                    if (trend || competitor || recommendation) {
                      return (
                        <div className="space-y-3 text-sm">
                          {trend && (
                            <div>
                              <p className="font-medium">Market Trend</p>
                              <p className="text-muted-foreground">
                                {renderText(trend?.demand_trends ?? trend?.summary ?? trend)}
                              </p>
                            </div>
                          )}
                          {competitor && (
                            <div>
                              <p className="font-medium">Competitor Analysis</p>
                              <p className="text-muted-foreground">
                                {renderText(competitor?.competitor_prices ?? competitor?.summary ?? competitor)}
                              </p>
                            </div>
                          )}
                          {recommendation && (
                            <div>
                              <p className="font-medium">Recommendation</p>
                              <p className="text-muted-foreground">
                                {renderText(recommendation?.strategies ?? recommendation?.summary ?? recommendation)}
                              </p>
                            </div>
                          )}
                        </div>
                      )
                    }

                    // Fallback: user-friendly rendering without showing raw code
                    return (
                      <div className="space-y-2 text-sm">
                        {typeof insights === "string" ? (
                          <p className="text-muted-foreground">{insights}</p>
                        ) : Array.isArray(insights) ? (
                          <ul className="list-disc pl-5">
                            {insights.slice(0, 10).map((item, idx) => (
                              <li key={idx} className="text-muted-foreground">{renderText(item)}</li>
                            ))}
                          </ul>
                        ) : (
                          <div className="space-y-1">
                            {Object.entries(insights as Record<string, unknown>).slice(0, 8).map(([k, v]) => (
                              <p key={k} className="text-muted-foreground">
                                <span className="font-medium">{k.replace(/_/g, " ")}: </span>
                                {renderText(v)}
                              </p>
                            ))}
                          </div>
                        )}
                      </div>
                    )
                  })()}
                </div>
              )}
            </CardContent>
          </Card>
        )}

        {/* Quick Actions */}
        <div className="grid grid-cols-2 gap-4">
          <Card className="cursor-pointer hover:bg-card/80 transition-colors" onClick={() => router.push("/credit")}>
            <CardContent className="pt-6 text-center">
              <div className="w-12 h-12 bg-secondary/10 rounded-full flex items-center justify-center mx-auto mb-3">
                <TrendingUp className="w-6 h-6 text-secondary" />
              </div>
              <h3 className="font-semibold mb-1">Check Credit</h3>
              <p className="text-xs text-muted-foreground">View your credit score</p>
            </CardContent>
          </Card>

          <Card className="cursor-pointer hover:bg-card/80 transition-colors" onClick={() => router.push("/insurance")}>
            <CardContent className="pt-6 text-center">
              <div className="w-12 h-12 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-3">
                <Fish className="w-6 h-6 text-accent" />
              </div>
              <h3 className="font-semibold mb-1">Get Insurance</h3>
              <p className="text-xs text-muted-foreground">Protect your catch</p>
            </CardContent>
          </Card>
        </div>
      </div>

      <BottomNav />
    </div>
  )
}
