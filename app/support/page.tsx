import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { SupportHero } from "@/components/support/support-hero"
import { SupportCategories } from "@/components/support/support-categories"
import { SupportTicket } from "@/components/support/support-ticket"
import { SupportKnowledge } from "@/components/support/support-knowledge"

export default function SupportPage() {
  return (
    <div className="min-h-screen bg-black">
      <Header />
      <main className="pt-16">
        <SupportHero />
        <div className="bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
          <SupportCategories />
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-0">
            <SupportTicket />
            <SupportKnowledge />
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
