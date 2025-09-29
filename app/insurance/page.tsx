"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { BottomNav } from "@/components/bottom-nav"
import {
  Shield,
  CheckCircle,
  AlertCircle,
  Loader2,
  ArrowLeft,
  Calendar,
  DollarSign,
  Umbrella,
  Fish,
} from "lucide-react"
import { AuthManager } from "@/lib/auth"
import { apiService, type InsuranceQuoteResponse } from "@/lib/api"

const coverageOptions = [
  { value: 500000, label: "TSh 500,000 - Basic Coverage" },
  { value: 1000000, label: "TSh 1,000,000 - Standard Coverage" },
  { value: 2000000, label: "TSh 2,000,000 - Premium Coverage" },
  { value: 5000000, label: "TSh 5,000,000 - Comprehensive Coverage" },
]

export default function InsurancePage() {
  const [user, setUser] = useState(AuthManager.getUser())
  const [selectedCoverage, setSelectedCoverage] = useState<number>(1000000)
  const [quote, setQuote] = useState<InsuranceQuoteResponse | null>(null)
  const [loading, setLoading] = useState(false)
  const [purchasing, setPurchasing] = useState(false)
  const [error, setError] = useState("")
  const router = useRouter()

  useEffect(() => {
    if (!AuthManager.isAuthenticated()) {
      router.push("/login")
    }
  }, [router])

  const getQuote = async () => {
    if (!user?.id) return

    setLoading(true)
    setError("")

    try {
      const response = await apiService.getInsuranceQuote(user.id, selectedCoverage)
      setQuote(response)
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to get insurance quote")
    } finally {
      setLoading(false)
    }
  }

  const handlePurchase = async () => {
    setPurchasing(true)

    // Simulate insurance purchase
    setTimeout(() => {
      setPurchasing(false)
      alert("Insurance policy purchased successfully! Your policy documents will be sent to your email.")
    }, 2000)
  }

  if (!user) {
    return null
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-green-50 pb-20">
      {/* Header */}
      <div className="bg-card border-b border-border">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="sm" onClick={() => router.back()}>
              <ArrowLeft className="w-4 h-4" />
            </Button>
            <div>
              <h1 className="text-2xl font-bold text-foreground">Insurance</h1>
              <p className="text-muted-foreground">Protect your fishing business</p>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-6 space-y-6">
        {/* Insurance Benefits */}
        <Card className="border-secondary/20 bg-secondary/5">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-secondary">
              <Shield className="w-5 h-5" />
              Fisher Insurance Protection
            </CardTitle>
            <CardDescription>Comprehensive coverage designed specifically for fishing professionals</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-3">
                <div className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-green-600 mt-0.5" />
                  <div>
                    <p className="font-medium text-sm">Equipment Protection</p>
                    <p className="text-xs text-muted-foreground">Boats, nets, and fishing gear</p>
                  </div>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-green-600 mt-0.5" />
                  <div>
                    <p className="font-medium text-sm">Catch Loss Coverage</p>
                    <p className="text-xs text-muted-foreground">Weather and market risks</p>
                  </div>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-green-600 mt-0.5" />
                  <div>
                    <p className="font-medium text-sm">Personal Accident</p>
                    <p className="text-xs text-muted-foreground">Medical and disability coverage</p>
                  </div>
                </div>
              </div>
              <div className="space-y-3">
                <div className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-green-600 mt-0.5" />
                  <div>
                    <p className="font-medium text-sm">Business Interruption</p>
                    <p className="text-xs text-muted-foreground">Income protection during downtime</p>
                  </div>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-green-600 mt-0.5" />
                  <div>
                    <p className="font-medium text-sm">Third Party Liability</p>
                    <p className="text-xs text-muted-foreground">Legal protection coverage</p>
                  </div>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-green-600 mt-0.5" />
                  <div>
                    <p className="font-medium text-sm">24/7 Support</p>
                    <p className="text-xs text-muted-foreground">Emergency assistance hotline</p>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Get Quote Form */}
        <Card>
          <CardHeader>
            <CardTitle>Get Your Quote</CardTitle>
            <CardDescription>Select your coverage amount to see premium pricing</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="coverage">Coverage Amount</Label>
              <Select
                value={selectedCoverage.toString()}
                onValueChange={(value) => setSelectedCoverage(Number.parseInt(value))}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select coverage amount" />
                </SelectTrigger>
                <SelectContent>
                  {coverageOptions.map((option) => (
                    <SelectItem key={option.value} value={option.value.toString()}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {error && (
              <Alert variant="destructive">
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}

            <Button onClick={getQuote} disabled={loading} className="w-full" size="lg">
              {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              {loading ? "Getting Quote..." : "Get Quote"}
            </Button>
          </CardContent>
        </Card>

        {/* Quote Results */}
        {quote && (
          <Card className="border-primary/20 bg-primary/5">
            <CardHeader>
              <CardTitle className="text-primary">Your Insurance Quote</CardTitle>
              <CardDescription>
                Quote valid until {new Date(quote.quote_valid_until).toLocaleDateString()}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Premium Display */}
              <div className="text-center bg-card rounded-lg p-6 border">
                <div className="flex items-center justify-center gap-2 mb-2">
                  <DollarSign className="w-6 h-6 text-primary" />
                  <span className="text-sm text-muted-foreground">Monthly Premium</span>
                </div>
                <div className="text-4xl font-bold text-primary mb-2">TSh {quote.premium_amount.toLocaleString()}</div>
                <div className="text-sm text-muted-foreground">
                  For TSh {quote.coverage_amount.toLocaleString()} coverage
                </div>
              </div>

              {/* Coverage Details */}
              <div className="bg-card rounded-lg p-4 border">
                <h3 className="font-semibold mb-3 flex items-center gap-2">
                  <Umbrella className="w-4 h-4" />
                  Coverage Details
                </h3>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span>Total Coverage Amount:</span>
                    <span className="font-medium">TSh {quote.coverage_amount.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Policy Term:</span>
                    <span className="font-medium">12 months</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Deductible:</span>
                    <span className="font-medium">TSh 50,000</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Payment Frequency:</span>
                    <span className="font-medium">Monthly</span>
                  </div>
                </div>
              </div>

              {/* Coverage Breakdown */}
              <div className="bg-card rounded-lg p-4 border">
                <h3 className="font-semibold mb-3">What's Covered</h3>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <p className="font-medium">Equipment</p>
                    <p className="text-muted-foreground">Up to 80% of coverage</p>
                  </div>
                  <div>
                    <p className="font-medium">Catch Loss</p>
                    <p className="text-muted-foreground">Up to 60% of coverage</p>
                  </div>
                  <div>
                    <p className="font-medium">Personal Accident</p>
                    <p className="text-muted-foreground">Up to 40% of coverage</p>
                  </div>
                  <div>
                    <p className="font-medium">Business Interruption</p>
                    <p className="text-muted-foreground">Up to 30% of coverage</p>
                  </div>
                </div>
              </div>

              {/* Additional Benefits */}
              <div className="bg-card rounded-lg p-4 border">
                <h3 className="font-semibold mb-3">Additional Benefits</h3>
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-green-600" />
                    <span className="text-sm">Free annual equipment inspection</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-green-600" />
                    <span className="text-sm">Emergency towing service</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-green-600" />
                    <span className="text-sm">Weather alert notifications</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-green-600" />
                    <span className="text-sm">Legal consultation hotline</span>
                  </div>
                </div>
              </div>

              <Button onClick={handlePurchase} disabled={purchasing} className="w-full" size="lg">
                {purchasing && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                {purchasing ? "Processing Purchase..." : "Buy Now"}
              </Button>
            </CardContent>
          </Card>
        )}

        {/* Why Choose Our Insurance */}
        <Card>
          <CardHeader>
            <CardTitle>Why Choose Fisher Insurance?</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <Fish className="w-5 h-5 text-primary mt-0.5" />
                <div>
                  <h4 className="font-semibold">Industry Expertise</h4>
                  <p className="text-sm text-muted-foreground">
                    Designed specifically for Tanzanian fishing professionals with deep understanding of local
                    challenges
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Calendar className="w-5 h-5 text-primary mt-0.5" />
                <div>
                  <h4 className="font-semibold">Flexible Payments</h4>
                  <p className="text-sm text-muted-foreground">
                    Monthly payment options aligned with fishing seasons and income patterns
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Shield className="w-5 h-5 text-primary mt-0.5" />
                <div>
                  <h4 className="font-semibold">Quick Claims</h4>
                  <p className="text-sm text-muted-foreground">
                    Fast claim processing with local agents who understand your business
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Contact Information */}
        <Card>
          <CardHeader>
            <CardTitle>Need Help?</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3 text-sm">
              <div>
                <p className="font-medium">Customer Service</p>
                <p className="text-muted-foreground">+255 123 456 789</p>
              </div>
              <div>
                <p className="font-medium">Claims Hotline</p>
                <p className="text-muted-foreground">+255 987 654 321 (24/7)</p>
              </div>
              <div>
                <p className="font-medium">Email Support</p>
                <p className="text-muted-foreground">insurance@samakicash.com</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <BottomNav />
    </div>
  )
}
