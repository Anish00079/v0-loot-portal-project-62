"use client"

import type React from "react"

import { createContext, useContext, useState, useEffect } from "react"
import { LoadingScreen } from "@/components/ui/loading-screen"

interface LoadingContextType {
  isLoading: boolean
  setIsLoading: (loading: boolean) => void
}

const LoadingContext = createContext<LoadingContextType | undefined>(undefined)

export function LoadingProvider({ children }: { children: React.ReactNode }) {
  const [isLoading, setIsLoading] = useState(true)
  const [showContent, setShowContent] = useState(false)

  useEffect(() => {
    // Simulate initial app loading
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 100) // Small delay to ensure smooth transition

    return () => clearTimeout(timer)
  }, [])

  const handleLoadingComplete = () => {
    setShowContent(true)
  }

  return (
    <LoadingContext.Provider value={{ isLoading, setIsLoading }}>
      {isLoading && <LoadingScreen onComplete={handleLoadingComplete} duration={3000} />}
      {(showContent || !isLoading) && children}
    </LoadingContext.Provider>
  )
}

export function useLoading() {
  const context = useContext(LoadingContext)
  if (context === undefined) {
    throw new Error("useLoading must be used within a LoadingProvider")
  }
  return context
}
