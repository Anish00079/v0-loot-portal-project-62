import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { GameCatalog } from "@/components/topup/game-catalog"

export default function TopUpPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      <Header />
      <main className="pt-20">
        <div className="container mx-auto px-4 py-12">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">Game Top-Up Center</h1>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              Choose your favorite game and top-up instantly with secure payments
            </p>
          </div>
          <GameCatalog />
        </div>
      </main>
      <Footer />
    </div>
  )
}
