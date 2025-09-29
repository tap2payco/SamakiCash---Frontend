"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { BottomNav } from "@/components/bottom-nav"
import {
  CreditCard,
  TrendingUp,
  CheckCircle,
  AlertCircle,
  Loader2,
  ArrowLeft,
  Building2,
  Calendar,
  Fish,
} from "lucide-react"
import { AuthManager } from "@/lib/auth"
import { apiService, type CreditScoreResponse } from "@/lib/api"

export default function CreditPage() {
  const [user, setUser] = useState(AuthManager.getUser())
  const [creditData, setCreditData] = useState<CreditScoreResponse | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const [applyingLoan, setApplyingLoan] = useState(false)
  const router = useRouter()

  useEffect(() => {
    if (!AuthManager.isAuthenticated()) {
      router.push("/login")
      return
    }
    fetchCreditScore()
  }, [router])

  const fetchCreditScore = async () => {
    if (!user?.id) return

    setLoading(true)
    setError("")

    try {
      const response = await apiService.getCreditScore(user.id)
      setCreditData(response)
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to fetch credit score")
    } finally {
      setLoading(false)
    }
  }

  const handleApplyLoan = async () => {
    setApplyingLoan(true)

    // Simulate loan application
    setTimeout(() => {
      setApplyingLoan(false)
      alert("Loan application submitted successfully! You will be contacted by our partner bank within 24 hours.")
    }, 2000)
  }

  const getCreditScoreColor = (score: number) => {
    if (score >= 750) return "text-green-600"
    if (score >= 650) return "text-yellow-600"
    return "text-red-600"
  }

  const getCreditScoreLabel = (score: number) => {
    if (score >= 750) return "Excellent"
    if (score >= 700) return "Good"
    if (score >= 650) return "Fair"
    return "Poor"
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
              <h1 className="text-2xl font-bold text-foreground">Credit Score</h1>
              <p className="text-muted-foreground">Your financial profile</p>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-6 space-y-6">
        {loading ? (
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-center py-8">
                <Loader2 className="w-8 h-8 animate-spin text-primary" />
                <span className="ml-2">Loading your credit score...</span>
              </div>
            </CardContent>
          </Card>
        ) : error ? (
          <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        ) : creditData ? (
          <>
            {/* Credit Score Display */}
            <Card className="border-primary/20 bg-primary/5">
              <CardHeader className="text-center">
                <CardTitle className="text-primary">Your Credit Score</CardTitle>
                <CardDescription>Based on your fishing activity and payment history</CardDescription>
              </CardHeader>
              <CardContent className="text-center space-y-6">
                <div>
                  <div className={`text-6xl font-bold ${getCreditScoreColor(creditData.credit_score)}`}>
                    {creditData.credit_score}
                  </div>
                  <div className="text-lg text-muted-foreground mt-2">
                    {getCreditScoreLabel(creditData.credit_score)}
                  </div>
                </div>

                <div className="space-y-2">
                  <Progress value={(creditData.credit_score / 850) * 100} className="h-3" />
                  <div className="flex justify-between text-xs text-muted-foreground">
                    <span>300</span>
                    <span>850</span>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4 mt-6">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-foreground">{creditData.catch_count}</div>
                    <div className="text-sm text-muted-foreground">Catches Recorded</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-foreground">{creditData.loan_eligible ? "Yes" : "No"}</div>
                    <div className="text-sm text-muted-foreground">Loan Eligible</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Loan Eligibility */}
            {creditData.loan_eligible && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <CheckCircle className="w-5 h-5 text-green-600" />
                    Loan Pre-Approval
                  </CardTitle>
                  <CardDescription>You're pre-approved for a loan with our partner banks</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-semibold text-green-800">Maximum Loan Amount</p>
                        <p className="text-2xl font-bold text-green-600">
                          TSh {creditData.max_loan_amount.toLocaleString()}
                        </p>
                      </div>
                      <Building2 className="w-8 h-8 text-green-600" />
                    </div>
                  </div>

                  <div className="space-y-3">
                    <h4 className="font-semibold">Loan Features:</h4>
                    <ul className="space-y-2 text-sm">
                      <li className="flex items-center gap-2">
                        <CheckCircle className="w-4 h-4 text-green-600" />
                        Competitive interest rates (12-18% APR)
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle className="w-4 h-4 text-green-600" />
                        Flexible repayment terms (6-24 months)
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle className="w-4 h-4 text-green-600" />
                        No collateral required
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle className="w-4 h-4 text-green-600" />
                        Quick approval process
                      </li>
                    </ul>
                  </div>

                  <Button onClick={handleApplyLoan} disabled={applyingLoan} className="w-full" size="lg">
                    {applyingLoan && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                    {applyingLoan ? "Submitting Application..." : "Apply for Loan"}
                  </Button>
                </CardContent>
              </Card>
            )}

            {/* Credit Building Tips */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="w-5 h-5 text-primary" />
                  Improve Your Credit Score
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <Fish className="w-5 h-5 text-primary mt-0.5" />
                    <div>
                      <h4 className="font-semibold">Record More Catches</h4>
                      <p className="text-sm text-muted-foreground">
                        Regular catch recording shows consistent fishing activity
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <Calendar className="w-5 h-5 text-primary mt-0.5" />
                    <div>
                      <h4 className="font-semibold">Maintain Regular Activity</h4>
                      <p className="text-sm text-muted-foreground">
                        Consistent platform usage demonstrates reliability
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <CreditCard className="w-5 h-5 text-primary mt-0.5" />
                    <div>
                      <h4 className="font-semibold">Use Financial Services</h4>
                      <p className="text-sm text-muted-foreground">
                        Engage with insurance and other financial products
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Credit History */}
            <Card>
              <CardHeader>
                <CardTitle>Credit History</CardTitle>
                <CardDescription>Your recent credit activities</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between py-2 border-b">
                    <div>
                      <p className="font-medium">Account Opened</p>
                      <p className="text-sm text-muted-foreground">SamakiCash Platform</p>
                    </div>
                    <Badge variant="secondary">Jan 2024</Badge>
                  </div>

                  <div className="flex items-center justify-between py-2 border-b">
                    <div>
                      <p className="font-medium">First Catch Recorded</p>
                      <p className="text-sm text-muted-foreground">Credit building started</p>
                    </div>
                    <Badge variant="secondary">Jan 2024</Badge>
                  </div>

                  <div className="flex items-center justify-between py-2">
                    <div>
                      <p className="font-medium">Credit Score Updated</p>
                      <p className="text-sm text-muted-foreground">Latest assessment</p>
                    </div>
                    <Badge variant="secondary">Today</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          </>
        ) : null}

        {/* Refresh Button */}
        <Button variant="outline" onClick={fetchCreditScore} disabled={loading} className="w-full bg-transparent">
          {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
          Refresh Credit Score
        </Button>
      </div>

      <BottomNav />
    </div>
  )
}
