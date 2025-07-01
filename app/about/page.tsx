import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { AboutHero } from "@/components/about/about-hero"
import { AboutStory } from "@/components/about/about-story"
import { AboutTeam } from "@/components/about/about-team"
import { AboutValues } from "@/components/about/about-values"
import { AboutStats } from "@/components/about/about-stats"

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-black">
      <Header />
      <main className="pt-16">
        <AboutHero />
        <div className="bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
          <AboutStory />
          <AboutValues />
          <AboutStats />
          <AboutTeam />
        </div>
      </main>
      <Footer />
    </div>
  )
}
