"use client"

import type React from "react"

import { createContext, useContext, useEffect, useState } from "react"

interface User {
  id: string
  email: string
  name: string
  role: "user" | "admin"
}

interface AuthContextType {
  user: User | null
  login: (email: string, password: string) => Promise<void>
  logout: () => void
  loading: boolean
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Check for existing session
    const checkAuth = async () => {
      try {
        // In production, check with Firebase Auth or NextAuth
        const token = localStorage.getItem("auth-token")
        if (token) {
          // Validate token and get user data
          // For demo purposes, using mock data
          setUser({
            id: "1",
            email: "user@example.com",
            name: "Demo User",
            role: "user",
          })
        }
      } catch (error) {
        console.error("Auth check failed:", error)
      } finally {
        setLoading(false)
      }
    }

    checkAuth()
  }, [])

  const login = async (email: string, password: string) => {
    try {
      // In production, implement Firebase Auth or NextAuth login
      // For demo purposes, using mock authentication
      if (email && password) {
        const mockUser = {
          id: "1",
          email,
          name: "Demo User",
          role: "user" as const,
        }
        setUser(mockUser)
        localStorage.setItem("auth-token", "mock-token")
      }
    } catch (error) {
      console.error("Login failed:", error)
      throw error
    }
  }

  const logout = () => {
    setUser(null)
    localStorage.removeItem("auth-token")
  }

  return <AuthContext.Provider value={{ user, login, logout, loading }}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}
