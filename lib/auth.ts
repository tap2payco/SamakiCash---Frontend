export interface User {
  id: string
  email: string
  userType: string
}

export const SUPER_USER = {
  email: "elespius1,0@gmail.com",
  password: "Piuspe@9702",
  id: "super-admin-001",
  userType: "super_admin",
}

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
    // Check super user credentials
    if (email === SUPER_USER.email && password === SUPER_USER.password) {
      const user: User = {
        id: SUPER_USER.id,
        email: SUPER_USER.email,
        userType: SUPER_USER.userType,
      }
      return user
    }

    // Add other authentication logic here
    return null
  }

  static isSuperUser(): boolean {
    const user = this.getUser()
    return user?.userType === "super_admin"
  }
}
