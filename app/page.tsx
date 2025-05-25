"use client"

import { HeroSection } from "@/components/sections/hero-section"
import { FeaturedGames } from "@/components/sections/featured-games"
import { PopularServices } from "@/components/sections/popular-services"
import { WhyChooseUs } from "@/components/sections/why-choose-us"
import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { useLoading } from "@/components/providers/loading-provider"
import { useEffect } from "react"

export default function HomePage() {
  const { setIsLoading } = useLoading()

  useEffect(() => {
    // Ensure loading screen shows on page load
    setIsLoading(true)
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 100)

    return () => clearTimeout(timer)
  }, [setIsLoading])

  return (
    <div className="min-h-screen bg-black">
      <Header />
      <main>
        <HeroSection />
        <div className="bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 relative">
          <FeaturedGames />
          <PopularServices />
          <WhyChooseUs />
        </div>
      </main>
      <Footer />
    </div>
  )
}
