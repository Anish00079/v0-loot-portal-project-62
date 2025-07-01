import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { CartCheckout } from "@/components/cart/cart-checkout"
import { Suspense } from "react"

export default function CartCheckoutPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      <Header />
      <main className="pt-20">
        <div className="container mx-auto px-4 py-12">
          <div className="text-center mb-8">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">Checkout</h1>
            <p className="text-xl text-gray-300">Complete your order with secure QR payment</p>
          </div>
          <Suspense fallback={<div className="text-center text-white">Loading checkout...</div>}>
            <CartCheckout />
          </Suspense>
        </div>
      </main>
      <Footer />
    </div>
  )
}
