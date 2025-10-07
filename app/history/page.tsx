"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { BottomNav } from "@/components/bottom-nav"
import { CatchHistory } from "@/components/catch-history"
import { apiService } from "@/lib/api"
import { MarketTrends } from "@/components/market-trends"
import { Fish, TrendingUp, CreditCard, Shield, ArrowLeft, Calendar, MapPin, DollarSign } from "lucide-react"
import { AuthManager } from "@/lib/auth"

interface Transaction {
  id: string
  type: "catch" | "credit" | "insurance" | "loan"
  title: string
  description: string
  amount?: number
  currency?: string
  date: string
  status: "completed" | "pending" | "failed"
}

// Mock data removed - will be replaced with API calls

export default function HistoryPage() {
  const [user, setUser] = useState(AuthManager.getUser())
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [transactions, setTransactions] = useState<any[]>([])

  useEffect(() => {
    if (!AuthManager.isAuthenticated()) {
      router.push("/login")
    }
  }, [router])

  useEffect(() => {
    const load = async () => {
      if (!user?.id) return
      setLoading(true)
      try {
        const data = await apiService.getUserTransactions(user.id)
        setTransactions(data?.transactions || [])
      } catch (e) {
        setTransactions([])
      } finally {
        setLoading(false)
      }
    }
    load()
  }, [user?.id])

  const getTransactionIcon = (type: string) => {
    switch (type) {
      case "catch":
        return <Fish className="w-4 h-4 text-primary" />
      case "credit":
        return <TrendingUp className="w-4 h-4 text-secondary" />
      case "insurance":
        return <Shield className="w-4 h-4 text-accent" />
      case "loan":
        return <CreditCard className="w-4 h-4 text-green-600" />
      default:
        return <DollarSign className="w-4 h-4 text-muted-foreground" />
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed":
        return "bg-green-100 text-green-800"
      case "pending":
        return "bg-yellow-100 text-yellow-800"
      case "failed":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
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
              <h1 className="text-2xl font-bold text-foreground">History</h1>
              <p className="text-muted-foreground">Your activity and transactions</p>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-6">
        <Tabs defaultValue="transactions" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="transactions">Transactions</TabsTrigger>
            <TabsTrigger value="catches">Catches</TabsTrigger>
            <TabsTrigger value="trends">Market Trends</TabsTrigger>
          </TabsList>

          <TabsContent value="transactions" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Recent Transactions</CardTitle>
                <CardDescription>All your platform activities and financial transactions</CardDescription>
              </CardHeader>
              <CardContent>
                {loading ? (
                  <div className="text-center py-8 text-muted-foreground">Loading…</div>
                ) : transactions.length === 0 ? (
                  <div className="text-center py-8">
                    <DollarSign className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                    <h3 className="text-lg font-semibold mb-2">No transactions yet</h3>
                    <p className="text-muted-foreground">
                      Your transaction history will appear here once you start using the platform
                    </p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {transactions.map((transaction: any) => (
                      <div key={transaction.id} className="flex items-center justify-between p-4 border rounded-lg">
                        <div className="flex items-center space-x-3">
                          <div className="w-10 h-10 bg-muted rounded-full flex items-center justify-center">
                            {getTransactionIcon(transaction.type)}
                          </div>
                          <div>
                            <h3 className="font-semibold">{transaction.title}</h3>
                            <p className="text-sm text-muted-foreground">{transaction.description}</p>
                            <div className="flex items-center space-x-2 mt-1">
                              <Calendar className="w-3 h-3 text-muted-foreground" />
                              <span className="text-xs text-muted-foreground">
                                {new Date(transaction.transaction_date || transaction.date).toLocaleDateString()}
                              </span>
                            </div>
                          </div>
                        </div>
                        <div className="text-right">
                          {transaction.amount && (
                            <p className="font-semibold">
                              {(transaction.currency || "TZS")} {Number(transaction.amount).toLocaleString()}
                            </p>
                          )}
                          <Badge className={getStatusColor(transaction.status)}>{transaction.status}</Badge>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="catches" className="space-y-4">
            <CatchHistory />
          </TabsContent>

          <TabsContent value="trends" className="space-y-4">
            <MarketTrends />

            {/* Market Insights - Will be populated with real data from API */}
            <Card>
              <CardHeader>
                <CardTitle>Market Analysis</CardTitle>
                <CardDescription>Insights based on your fishing locations and catch types</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center py-8">
                  <TrendingUp className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-lg font-semibold mb-2">No market data yet</h3>
                  <p className="text-muted-foreground">
                    Market insights will appear here once you start analyzing catches
                  </p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>

      <BottomNav />
    </div>
  )
}
