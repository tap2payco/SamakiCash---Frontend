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
}

export interface AnalysisResponse {
  status: string
  price_analysis: {
    fair_price: number
    currency: string
    reasoning: string
    confidence_score: number
  }
  market_insights: any
  voice_message_url: string
  recommendation: string
}

export interface CreditScoreResponse {
  user_id: string
  credit_score: number
  loan_eligible: boolean
  max_loan_amount: number
  catch_count: number
}

export interface InsuranceQuoteResponse {
  user_id: string
  coverage_amount: number
  premium_amount: number
  coverage_details: string
  quote_valid_until: string
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
  async register(email: string, password: string, userType: string, additionalData?: { name?: string; phone?: string; organization?: string; location?: string }): Promise<AuthResponse> {
    return this.fetchAPI("/api/auth/register", {
      method: "POST",
      body: JSON.stringify({ 
        email, 
        password, 
        user_type: userType,
        ...additionalData 
      }),
    })
  }

  async login(email: string, password: string): Promise<AuthResponse> {
    return this.fetchAPI("/api/auth/login", {
      method: "POST",
      body: JSON.stringify({ email, password }),
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
  async getInsuranceQuote(userId: string, coverageAmount = 1000000): Promise<InsuranceQuoteResponse> {
    return this.fetchAPI("/api/insurance-quote", {
      method: "POST",
      body: JSON.stringify({
        user_id: userId,
        coverage_amount: coverageAmount,
      }),
    })
  }

  // Audio playback
  getAudioUrl(filename: string): string {
    return `${this.baseURL}/audio/${filename}`
  }
}

export const apiService = new APIService()
