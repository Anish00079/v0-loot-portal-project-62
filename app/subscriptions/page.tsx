import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { SubscriptionCatalog } from "@/components/subscriptions/subscription-catalog"

export default function SubscriptionsPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      <Header />
      <main className="pt-20">
        <div className="container mx-auto px-4 py-12">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">Premium Subscriptions</h1>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              Get premium access to your favorite apps and services with instant activation
            </p>
          </div>
          <SubscriptionCatalog />
        </div>
      </main>
      <Footer />
    </div>
  )
}
