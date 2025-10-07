const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:8000"

export interface FishCatchRequest {
  fish_type: string
  quantity_kg: number
  location: string
  user_id: string
  image_data?: string
}

export interface AuthResponse {
  user_id: string
  user_type: string
  message: string
  access_token?: string
}

export interface AnalysisResponse {
  status: string
  price_analysis: {
    fair_price: number
    currency: string
    reasoning: string
    confidence_score: number
  }
  market_insights: {
    market_trend: string
    competitor_analysis: string
    recommendation: string
  }
  image_analysis?: {
    quality_assessment: string
    freshness: string
    confidence: number
  }
  voice_message_url: string | null
  analysis_summary: string
  recommendation: string
}

export interface CreditScoreResponse {
  user_id: string
  credit_score: number
  loan_eligible: boolean
  max_loan_amount: number
  catch_count: number
  score_components?: {
    base_score: number
    activity_bonus: number
    total_catches: number
  }
}

export interface InsuranceQuoteResponse {
  user_id: string
  coverage_type: string
  coverage_amount: number
  annual_premium: number
  message: string
}

export interface MatchRequest {
  fish_type: string
  quantity_kg: number
  location: string
  user_id?: string
}

export interface MatchResponse {
  status: string
  matches: Array<{
    buyer_id: string
    buyer_contact: string
    buyer_name?: string
    buyer_organization?: string
    buyer_location?: string
    match_score: number
    estimated_price_per_kg: number
    estimated_total_value: number
    reason?: string
    note?: string
  }>
  price_analysis: any
  market_insights: any
  analysis_summary: string
}

export interface LoanApplicationRequest {
  user_id: string
  amount: number
  purpose: string
}

export interface LoanApplicationResponse {
  status: string
  user_id: string
  amount: number
  purpose: string
  credit_score: number
  message: string
}

export interface UserStatsResponse {
  total_catches: number
  total_quantity_kg: number
  average_price_per_kg: number
}

export interface UserCatchesResponse {
  count: number
  catches: any[]
}

export interface UserTransactionsResponse {
  count: number
  transactions: any[]
}

export interface UserMarketInsightsResponse {
  top_fish_types: [string, number][]
  insight: string
}

class APIService {
  private baseURL: string

  constructor() {
    this.baseURL = API_BASE_URL
  }

  private async fetchAPI(endpoint: string, options: RequestInit = {}) {
    const url = `${this.baseURL}${endpoint}`
    const response = await fetch(url, {
      headers: {
        "Content-Type": "application/json",
        ...options.headers,
      },
      ...options,
    })

    if (!response.ok) {
      throw new Error(`API error: ${response.status} - ${response.statusText}`)
    }

    return response.json()
  }

  // Auth endpoints
  async register(
    email: string | null,
    password: string,
    userType: string,
    additionalData?: { name?: string; phone?: string; organization?: string; location?: string }
  ): Promise<AuthResponse> {
    return this.fetchAPI("/api/auth/register", {
      method: "POST",
      body: JSON.stringify({ 
        email: email || undefined,
        phone: additionalData?.phone || undefined,
        password, 
        user_type: userType,
        ...additionalData 
      }),
    })
  }

  async login(identifier: { email?: string; phone?: string }, password: string): Promise<AuthResponse> {
    return this.fetchAPI("/api/auth/login", {
      method: "POST",
      body: JSON.stringify({ ...identifier, password }),
    })
  }

  // Fish analysis
  async analyzeCatch(data: FishCatchRequest): Promise<AnalysisResponse> {
    return this.fetchAPI("/api/analyze-catch", {
      method: "POST",
      body: JSON.stringify(data),
    })
  }

  // Credit score
  async getCreditScore(userId: string): Promise<CreditScoreResponse> {
    return this.fetchAPI("/api/credit-score", {
      method: "POST",
      body: JSON.stringify({ user_id: userId }),
    })
  }

  // Insurance quote
  async getInsuranceQuote(userId: string, coverageType = "equipment", coverageAmount = 1000000): Promise<InsuranceQuoteResponse> {
    return this.fetchAPI("/api/insurance-quote", {
      method: "POST",
      body: JSON.stringify({
        user_id: userId,
        coverage_type: coverageType,
        coverage_amount: coverageAmount,
      }),
    })
  }

  // Matchmaking
  async findMatches(data: MatchRequest): Promise<MatchResponse> {
    return this.fetchAPI("/api/match", {
      method: "POST",
      body: JSON.stringify(data),
    })
  }

  // Loan application
  async applyForLoan(data: LoanApplicationRequest): Promise<LoanApplicationResponse> {
    return this.fetchAPI("/api/loan-application", {
      method: "POST",
      body: JSON.stringify(data),
    })
  }

  // User management
  async getBuyers(): Promise<{ count: number; buyers: any[] }> {
    return this.fetchAPI("/api/users/buyers", {
      method: "GET",
    })
  }

  async getSellers(): Promise<{ count: number; sellers: any[] }> {
    return this.fetchAPI("/api/users/sellers", {
      method: "GET",
    })
  }

  // Health check
  async healthCheck(): Promise<{ message: string; status: string; version?: string; database?: string }> {
    return this.fetchAPI("/", {
      method: "GET",
    })
  }

  // Audio playback
  getAudioUrl(filename: string): string {
    return `${this.baseURL}/audio/${filename}`
  }

  // New user data endpoints
  async getUserStats(userId: string): Promise<UserStatsResponse> {
    return this.fetchAPI(`/api/users/${userId}/stats`, { method: "GET" })
  }

  async getUserCatches(userId: string): Promise<UserCatchesResponse> {
    return this.fetchAPI(`/api/users/${userId}/catches`, { method: "GET" })
  }

  async getUserTransactions(userId: string): Promise<UserTransactionsResponse> {
    return this.fetchAPI(`/api/users/${userId}/transactions`, { method: "GET" })
  }

  async getUserMarketInsights(userId: string): Promise<UserMarketInsightsResponse> {
    return this.fetchAPI(`/api/users/${userId}/market-insights`, { method: "GET" })
  }
}

export const apiService = new APIService()
