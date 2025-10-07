export interface User {
  id: string
  email: string
  userType: string
}

// Super user credentials removed - use proper authentication

export class AuthManager {
  private static readonly TOKEN_KEY = "samakicash_token"
  private static readonly USER_KEY = "samakicash_user"

  static setAuth(token: string, user: User): void {
    if (typeof window !== "undefined") {
      localStorage.setItem(this.TOKEN_KEY, token)
      localStorage.setItem(this.USER_KEY, JSON.stringify(user))
    }
  }

  static getToken(): string | null {
    if (typeof window !== "undefined") {
      return localStorage.getItem(this.TOKEN_KEY)
    }
    return null
  }

  static getUser(): User | null {
    if (typeof window !== "undefined") {
      const userStr = localStorage.getItem(this.USER_KEY)
      return userStr ? JSON.parse(userStr) : null
    }
    return null
  }

  static clearAuth(): void {
    if (typeof window !== "undefined") {
      localStorage.removeItem(this.TOKEN_KEY)
      localStorage.removeItem(this.USER_KEY)
    }
  }

  static isAuthenticated(): boolean {
    return this.getToken() !== null
  }

  static async authenticateUser(email: string, password: string): Promise<User | null> {
    // Authentication should be handled by the API service
    // This method is kept for compatibility but should not be used directly
    console.warn("authenticateUser should not be used directly. Use apiService.login instead.")
    return null
  }

  static isSuperUser(): boolean {
    const user = this.getUser()
    return user?.userType === "super_admin"
  }
}
